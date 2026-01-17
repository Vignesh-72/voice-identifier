import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useVoiceModel } from './useVoiceModel';

// --- CONFIG ---
const IMG_MALE = "/Male.png";
const IMG_FEMALE = "/female.png";

// --- ICONS ---
const Icons = {
  Mic: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" /></svg>),
  Fingerprint: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.03-.64-.29-.49-1.31-.73-2.43-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z" /></svg>),
  Wave: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M3 12h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V6H3v2zm16 4h2v-2h-2v2zm0 4h2v-2h-2v2zm0-8h2V6h-2v2zm-4 4h2V8h-2v4zm0 4h2v-4h-2v4zm0-8h2V4h-2v4zM7 12h2V8H7v4zm0 4h2v-4H7v4zm0-8h2V4H7v4zm4 8h2V4h-2v16zm0 0h2v-4h-2v4z" /></svg>),
  Lock: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></svg>),
  Shield: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" /></svg>),
  Eye: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>),
  Circuit: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M20 4h-5V2h-2v2H7V2H5v2H2v16h3v2h2v-2h10v2h2v-2h3V4h-2zm0 14H4V6h16v12zM7 16h2V8H7v8zm4 0h2V8h-2v8zm4 0h2V8h-2v8z"/></svg>),
  DNA: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M14.78 13.89l-1.41-1.41 2.83-2.83-2.83-2.83 1.41-1.41 2.83 2.83 1.42-1.42L20.44 8.4l-1.42 1.42 2.83 2.83-1.42 1.42-2.83-2.83-1.41 1.41 2.83 2.83-1.41 1.41-2.83-2.83zM9.22 10.11l1.41 1.41L7.8 14.35l2.83 2.83-1.41 1.41-2.83-2.83-1.42 1.42-1.41-1.42 1.42-1.42L3.56 11.6l1.42-1.42 2.83 2.83 1.41-1.41-2.83-2.83 1.41-1.41 2.83 2.83z"/></svg>),
  Server: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M2 20h20v4H2v-4zm2 1h2v2H4v-2zm16 0h-2v2h2v-2zM2 2h20v4H2V2zm2 1h2v2H4V3zm16 0h-2v2h2V3zM2 11h20v4H2v-4zm2 1h2v2H4v-2zm16 0h-2v2h2v-2z"/></svg>),
  Network: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14zM8 15h8v2H8v-2zm0-4h8v2H8v-2zm0-4h8v2H8V7z"/></svg>),
  Database: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 4c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zM4 11.5c0 1.66 3.58 3 8 3s8-1.34 8-3v-2.5c-1.85 1.1-4.75 1.75-8 1.75s-6.15-.65-8-1.75v2.5zm0 4.5c0 1.66 3.58 3 8 3s8-1.34 8-3v-2.5c-1.85 1.1-4.75 1.75-8 1.75s-6.15-.65-8-1.75v2.5z"/></svg>),
  Keypad: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M7 11h10v2H7zM7 7h10v2H7zM7 15h10v2H7zM4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 14h16V6H4v12z"/></svg>),
  Key: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>),
  Code: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>),
  Info: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>),
  Home: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>),
  Github: (props) => (<svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>),
};

const BackgroundPattern = () => {
  const iconsList = [
    { Cmp: Icons.Fingerprint, top: '4%', left: '2%', rot: '15deg', size: '70px' },
    { Cmp: Icons.Eye, top: '8%', left: '35%', rot: '-10deg', size: '55px' },
    { Cmp: Icons.Circuit, top: '5%', left: '75%', rot: '25deg', size: '75px' },
    { Cmp: Icons.Network, top: '25%', left: '15%', rot: '-20deg', size: '50px' },
    { Cmp: Icons.DNA, top: '22%', left: '55%', rot: '45deg', size: '60px' },
    { Cmp: Icons.Server, top: '30%', left: '85%', rot: '-5deg', size: '65px' },
    { Cmp: Icons.Lock, top: '45%', left: '5%', rot: '10deg', size: '60px' },
    { Cmp: Icons.Shield, top: '50%', left: '65%', rot: '-15deg', size: '70px' },
    { Cmp: Icons.Mic, top: '65%', left: '25%', rot: '30deg', size: '55px' },
    { Cmp: Icons.Database, top: '60%', left: '80%', rot: '-25deg', size: '75px' },
    { Cmp: Icons.Wave, top: '85%', left: '10%', rot: '5deg', size: '80px' },
    { Cmp: Icons.Keypad, top: '80%', left: '45%', rot: '-10deg', size: '50px' },
    { Cmp: Icons.Key, top: '82%', left: '75%', rot: '20deg', size: '65px' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {iconsList.map((item, i) => (
        <div key={i} className="absolute text-white opacity-[0.07]" style={{ top: item.top, left: item.left, transform: `rotate(${item.rot})`, width: item.size, height: item.size }}>
          <item.Cmp className="w-full h-full" />
        </div>
      ))}
      <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
    </div>
  );
};

// --- BRANDING COMPONENT (Mobile: Horizontal with hidden tagline. Desktop: Horizontal fixed with tagline) ---
const Branding = () => (
  <div className="relative z-40 mb-6 flex flex-row items-center gap-4 md:fixed md:top-8 md:left-8 md:mb-0 md:flex-row md:items-start md:gap-4">
     <div className="w-12 h-12 md:w-16 md:h-16 bg-[#e6e2dd] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-[3px] border-[#d1cec9] flex items-center justify-center text-[#373a36]">
        <Icons.Fingerprint className="w-7 h-7 md:w-9 md:h-9"/>
     </div>
     <div className="flex flex-col justify-center md:items-start pt-1">
        <h1 className="text-2xl md:text-3xl font-black text-[#e6e2dd] tracking-tighter leading-none">HearMe</h1>
        <p className="hidden md:block text-[#e6e2dd]/60 text-[10px] font-mono font-bold tracking-wide max-w-[150px] leading-tight mt-1">
          VOICE IDENTIFICATION SYSTEM USING SIGNAL PROCESSING
        </p>
     </div>
  </div>
);

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const location = useLocation();
  const getBtnClass = (path) => `
    flex flex-col items-center justify-center gap-1 
    w-16 h-14 md:w-16 md:h-16 
    rounded-xl text-[9px] md:text-[10px] font-bold font-mono tracking-widest transition-all
    ${location.pathname === path 
      ? 'bg-[#373a36] text-[#e6e2dd] shadow-inner border border-transparent translate-y-[1px]' 
      : 'bg-[#d0cdc8] text-[#373a36]/60 hover:bg-[#c0beb9] shadow-[0_2px_0_#b0aeaa] active:shadow-none active:translate-y-[2px] border-x border-t border-[#e6e2dd]'}
  `;

  return (
    <div className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:left-8 md:top-1/2 md:translate-x-0 md:-translate-y-1/2">
      <div className="flex flex-row md:flex-col gap-3 md:gap-4 bg-[#e6e2dd] p-2.5 md:p-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-[3px] border-[#d1cec9] relative items-center">
        <div className="absolute -top-1.5 -left-1.5 w-2 h-2 rounded-full bg-[#bfbcb7] shadow-sm border border-[#a6a39f]"></div>
        <div className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-[#bfbcb7] shadow-sm border border-[#a6a39f]"></div>
        <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 rounded-full bg-[#bfbcb7] shadow-sm border border-[#a6a39f]"></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 rounded-full bg-[#bfbcb7] shadow-sm border border-[#a6a39f]"></div>
        <Link to="/" className={getBtnClass("/")}><Icons.Home className="w-5 h-5"/><span>HOME</span></Link>
        <Link to="/info" className={getBtnClass("/info")}><Icons.Code className="w-5 h-5"/><span>INFO</span></Link>
        <Link to="/about" className={getBtnClass("/about")}><Icons.Info className="w-5 h-5"/><span>ABOUT</span></Link>
        <div className="hidden md:flex w-full h-1 bg-[#d1cec9]/50 items-center justify-center my-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div></div>
      </div>
    </div>
  );
};

// --- DISPLAY SCREEN ---
const DisplayScreen = ({ bars, isProcessing, activePerson, identifiedPerson }) => {
  const showMale = identifiedPerson === 1 || activePerson === 1;
  const showFemale = identifiedPerson === 2 || activePerson === 2;
  const showImage = showMale || showFemale;

  return (
    <div className="relative h-48 bg-[#d0cdc8] rounded-lg shadow-inner border border-[#b8b5b0] overflow-hidden mb-6 flex flex-col items-center justify-center">
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#373a36]/30"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#373a36]/30"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#373a36]/30"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#373a36]/30"></div>

      {showImage ? (
         <div className="absolute inset-0 flex items-center justify-center animate-fade-in z-10 p-4">
            <div className={`relative w-32 h-32 rounded-full border-4 shadow-lg overflow-hidden bg-white
              ${identifiedPerson ? 'border-emerald-600 scale-105' : 'border-orange-500 animate-pulse'}
              transition-all duration-300
            `}>
              <img src={showMale ? IMG_MALE : IMG_FEMALE} alt="Subject" className="w-full h-full object-cover" />
            </div>
            {identifiedPerson && <div className="absolute bottom-3 bg-emerald-600 text-white text-[10px] font-mono font-bold px-3 py-1 rounded shadow-md animate-bounce">MATCH CONFIRMED</div>}
            {activePerson && <div className="absolute top-3 text-orange-600 text-[10px] font-mono font-bold tracking-widest animate-pulse">RECORDING STREAM...</div>}
         </div>
      ) : (
        <div className="w-full flex items-end justify-center gap-1.5 h-12 pb-2">
           {isProcessing ? bars.map((h, i) => (<div key={i} style={{ height: `${Math.max(20, h)}%` }} className="w-3 bg-[#373a36] rounded-sm transition-all duration-100 ease-in-out opacity-80"></div>)) : <div className="text-[#373a36]/40 text-xs font-mono tracking-widest animate-pulse">SYSTEM READY</div>}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent h-2 w-full animate-[scan_4s_linear_infinite] pointer-events-none opacity-40"></div>
    </div>
  );
}

// --- PAGE: HOME (The Scanner) ---
const Home = () => {
  const { status, recordVoice, identifyVoice, isProcessing, person1Data, person2Data, voiceBars, activePerson, identifiedPerson } = useVoiceModel();
  return (
    <div className="w-full max-w-sm md:max-w-[460px] bg-[#e6e2dd] rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] overflow-hidden relative border-4 border-[#d1cec9] animate-fade-in">
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#bfbcb7] shadow-inner flex items-center justify-center"><div className="w-full h-px bg-[#a6a39f] rotate-45"></div></div>
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#bfbcb7] shadow-inner flex items-center justify-center"><div className="w-full h-px bg-[#a6a39f] rotate-45"></div></div>
      <div className="bg-[#373a36] px-6 py-3 flex justify-between items-center"><span className="text-[#e6e2dd] text-[10px] font-mono tracking-widest opacity-60">ID-TERM-01</span><div className="flex gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30"></div></div></div>
      <div className="p-5">
        <DisplayScreen bars={voiceBars} isProcessing={isProcessing} activePerson={activePerson} identifiedPerson={identifiedPerson} />
        <div className="grid grid-cols-2 gap-4 mb-5">
          <button onClick={() => recordVoice(1)} disabled={isProcessing} className={`group relative h-20 bg-[#d9d5d0] rounded-xl border-2 border-[#b8b5b0] border-b-[5px] active:border-b-2 active:translate-y-[3px] transition-all ${person1Data ? 'bg-emerald-100/50 border-emerald-200/50' : 'hover:bg-[#e0dcd7]'}`}>
            <div className="absolute top-2 left-3 text-[10px] font-bold text-[#373a36]/40 font-mono">SUB-A</div>
            <div className="flex flex-col items-center justify-center h-full pt-2"><Icons.Mic className={`w-6 h-6 mb-1 transition-colors ${person1Data ? 'text-emerald-600' : 'text-[#373a36]'}`} /><span className="text-xs font-bold text-[#373a36]">REC Person 1</span></div>
            {person1Data && <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full shadow"></div>}
          </button>
          <button onClick={() => recordVoice(2)} disabled={isProcessing} className={`group relative h-20 bg-[#d9d5d0] rounded-xl border-2 border-[#b8b5b0] border-b-[5px] active:border-b-2 active:translate-y-[3px] transition-all ${person2Data ? 'bg-emerald-100/50 border-emerald-200/50' : 'hover:bg-[#e0dcd7]'}`}>
            <div className="absolute top-2 left-3 text-[10px] font-bold text-[#373a36]/40 font-mono">SUB-B</div>
            <div className="flex flex-col items-center justify-center h-full pt-2"><Icons.Mic className={`w-6 h-6 mb-1 transition-colors ${person2Data ? 'text-emerald-600' : 'text-[#373a36]'}`} /><span className="text-xs font-bold text-[#373a36]">REC Person 2</span></div>
            {person2Data && <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full shadow"></div>}
          </button>
        </div>
        <button onClick={identifyVoice} disabled={isProcessing || (!person1Data || !person2Data)} className="w-full py-4 bg-[#373a36] text-[#e6e2dd] rounded-xl font-bold text-sm tracking-widest shadow-lg border-b-[6px] border-black/30 active:border-b-0 active:translate-y-[6px] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3">
          {isProcessing && !activePerson ? <span className="flex items-center gap-2"><Icons.Circuit className="w-5 h-5 animate-spin" /> PROCESSING</span> : <>IDENTIFY VOICE <Icons.Fingerprint className="w-5 h-5 opacity-50" /></>}
        </button>
        <div className="mt-6 bg-[#d0cdc8] rounded px-4 py-2 text-center border border-black/5 shadow-inner flex justify-between items-center"><span className="text-[9px] font-mono text-[#373a36]/50">STATUS:</span><span className={`text-xs font-mono font-bold uppercase ${status.includes('Found') ? 'text-emerald-700' : status.includes('Acquiring') ? 'text-orange-600' : 'text-[#373a36]'}`}>{status}</span></div>
      </div>
    </div>
  );
};

// --- PAGE: ABOUT ---
const About = () => (
  <div className="w-full max-w-sm bg-[#e6e2dd] rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] overflow-hidden border-4 border-[#d1cec9] animate-fade-in p-6 md:p-8">
     <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-[#373a36] rounded-full flex items-center justify-center mb-4 shadow-lg text-[#e6e2dd]"><Icons.Fingerprint className="w-10 h-10"/></div>
        <h2 className="text-2xl font-black text-[#373a36] uppercase tracking-widest mb-2">HearMe</h2>
        <p className="text-sm font-mono text-[#373a36]/70 mb-6">VOICE IDENTIFICATION SYSTEM </p>
        <div className="w-full bg-[#d0cdc8] rounded-xl p-6 border border-[#b8b5b0] text-left mb-6 shadow-inner">
           <p className="text-[#373a36] text-sm leading-relaxed mb-4">This application serves as a demonstration of browser-based voice identification system. It captures audio frequencies, creates a unique voiceprint, and compares them using Euclidean distance algorithms to verify identity.</p>
           <div className="border-t border-[#373a36]/10 pt-4 mt-4"><p className="text-xs font-bold text-[#373a36]/50 uppercase tracking-widest mb-1">Developer</p><p className="text-lg font-bold text-[#373a36]">Umar Farooq V H</p></div>
        </div>
        <a href="https://github.com/farooq-25/voice-identifier" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#373a36] text-[#e6e2dd] rounded-xl font-bold text-xs tracking-widest hover:bg-black transition-colors shadow-lg"><Icons.Github className="w-5 h-5"/> VIEW REPOSITORY</a>
     </div>
  </div>
);

// --- PAGE: INFO ---
const Info = () => (
  <div className="w-full max-w-sm bg-[#e6e2dd] rounded-3xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] overflow-hidden border-4 border-[#d1cec9] animate-fade-in p-6 md:p-8">
    <h2 className="text-xl font-black text-[#373a36] uppercase tracking-widest mb-6 border-b-2 border-[#373a36]/10 pb-4">System Architecture</h2>
    <div className="space-y-4">
      <div className="bg-[#d0cdc8] p-4 rounded-xl border border-[#b8b5b0] shadow-sm">
         <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-[#373a36] rounded-lg text-[#e6e2dd]"><Icons.Wave className="w-4 h-4"/></div><h3 className="font-bold text-[#373a36] text-sm uppercase">1. Spectral Analysis</h3></div>
         <p className="text-xs text-[#373a36]/80 leading-relaxed">The app uses the Web Audio API's <span className="font-mono bg-white/50 px-1 rounded">AnalyserNode</span> to perform a Fast Fourier Transform (FFT). This converts the raw audio waveform into frequency data (bins), effectively creating a "fingerprint" of the pitch and tone.</p>
      </div>
      <div className="bg-[#d0cdc8] p-4 rounded-xl border border-[#b8b5b0] shadow-sm">
         <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-[#373a36] rounded-lg text-[#e6e2dd]"><Icons.Database className="w-4 h-4"/></div><h3 className="font-bold text-[#373a36] text-sm uppercase">2. Vector Normalization</h3></div>
         <p className="text-xs text-[#373a36]/80 leading-relaxed">Raw frequency data is noisy. We normalize the array values to a 0-1 range and filter out background noise (low frequencies) and high-pitch interference, resulting in a clean "Voice Vector".</p>
      </div>
      <div className="bg-[#d0cdc8] p-4 rounded-xl border border-[#b8b5b0] shadow-sm">
         <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-[#373a36] rounded-lg text-[#e6e2dd]"><Icons.Circuit className="w-4 h-4"/></div><h3 className="font-bold text-[#373a36] text-sm uppercase">3. Euclidean Comparison</h3></div>
         <p className="text-xs text-[#373a36]/80 leading-relaxed">To identify a speaker, we calculate the <span className="font-mono bg-white/50 px-1 rounded">Euclidean Distance</span> between the new voice sample and the stored profiles. The profile with the shortest distance (smallest difference) is the match.</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#373a36] overflow-hidden text-[#373a36] font-sans">
        <BackgroundPattern />
        <Branding />
        <Navbar />
        {/* Container for content - Centers the component horizontally */}
        <div className="relative z-10 w-full flex justify-center mb-24 md:mb-0">
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
             <Route path="/info" element={<Info />} />
           </Routes>
        </div>
        <div className="mt-8 text-center text-[#e6e2dd]/20 text-xs font-medium uppercase tracking-widest relative z-10 hidden md:block">Developed by Umar Farooq</div>
        <style>{`@keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } } @keyframes fade-in { 0% { opacity: 0; transform: scale(0.98); } 100% { opacity: 1; transform: scale(1); } } .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }`}</style>
      </div>
    </Router>
  );
}

export default App;