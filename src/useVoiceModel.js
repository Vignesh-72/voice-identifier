import { useState, useRef } from 'react';

export const useVoiceModel = () => {
    const [status, setStatus] = useState("System Idle");
    const [person1Data, setPerson1Data] = useState(null);
    const [person2Data, setPerson2Data] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // NEW: To track exactly who we are interacting with
    const [activePerson, setActivePerson] = useState(null); // 1 (Male), 2 (Female), or null
    const [identifiedPerson, setIdentifiedPerson] = useState(null); // Result of identification

    const [voiceBars, setVoiceBars] = useState([10, 10, 10, 10, 10]);
    
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);

    const initAudio = async () => {
        if (audioContextRef.current) return;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const microphone = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 512;
        microphone.connect(analyser);
        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
    };

    const normalizeAndFilter = (data) => {
        const filtered = [];
        const minIndex = 5;   
        const maxIndex = 100;  
        let max = 0;
        for (let i = minIndex; i < maxIndex; i++) if (data[i] > max) max = data[i];
        for (let i = minIndex; i < maxIndex; i++) filtered.push(max === 0 ? 0 : data[i] / max);
        return filtered;
    };

    const captureSample = (durationMs = 3000) => {
        return new Promise(resolve => {
            const analyser = analyserRef.current;
            const bufferLength = analyser.frequencyBinCount;
            const tempData = new Uint8Array(bufferLength);
            const frames = [];

            const interval = setInterval(() => {
                analyser.getByteFrequencyData(tempData);
                frames.push([...tempData]);

                // Visualizer Logic
                let sum = 0;
                for(let i = 0; i < 50; i++) sum += tempData[i];
                const average = sum / 50; 
                const v = Math.min(100, average * 1.5);
                
                setVoiceBars([
                    Math.max(10, v * 0.8),
                    Math.max(10, v * 1.2),
                    Math.max(10, v * 1.0),
                    Math.max(10, v * 0.9),
                    Math.max(10, v * 0.6)
                ]);
            }, 50);

            setTimeout(() => {
                clearInterval(interval);
                setVoiceBars([10, 10, 10, 10, 10]);
                const avg = new Array(bufferLength).fill(0);
                frames.forEach(frame => frame.forEach((value, i) => avg[i] += value));
                for (let i = 0; i < avg.length; i++) avg[i] /= frames.length;
                resolve(normalizeAndFilter(avg));
            }, durationMs);
        });
    };

    const calculateDistance = (a, b) => {
        let sum = 0;
        for (let i = 0; i < a.length; i++) sum += Math.pow(a[i] - b[i], 2);
        return Math.sqrt(sum);
    };

    const recordVoice = async (personId) => {
        try {
            setIsProcessing(true);
            setActivePerson(personId); // Show the person's image while recording
            setIdentifiedPerson(null); // Reset previous results
            setStatus(`Acquiring Subject ${personId === 1 ? 'A' : 'B'}...`);
            
            await initAudio();
            if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume();
            
            const data = await captureSample();
            if (personId === 1) setPerson1Data(data);
            else setPerson2Data(data);
            
            setStatus("Voiceprint Stored.");
        } catch (err) {
            console.error(err);
            setStatus("Input Error.");
        } finally {
            setIsProcessing(false);
            setActivePerson(null); // Hide image after recording
        }
    };

    const identifyVoice = async () => {
        if (!person1Data || !person2Data) {
            setStatus("Database Empty.");
            return;
        }
        try {
            setIsProcessing(true);
            setIdentifiedPerson(null);
            setStatus("Analyzing Input...");
            
            await initAudio();
            if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume();

            const sample = await captureSample();
            const d1 = calculateDistance(sample, person1Data);
            const d2 = calculateDistance(sample, person2Data);
            
            // Logic to determine winner
            if (d1 < d2) {
                setStatus("Match Found: Subject A");
                setIdentifiedPerson(1);
            } else {
                setStatus("Match Found: Subject B");
                setIdentifiedPerson(2);
            }
        } catch (err) {
            setStatus("Analysis Failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    return { 
        status, 
        recordVoice, 
        identifyVoice, 
        isProcessing, 
        person1Data, 
        person2Data, 
        voiceBars, 
        activePerson,     // Who is being recorded
        identifiedPerson  // Who was identified
    };
};