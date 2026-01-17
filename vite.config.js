import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Make sure your image file is in the public folder
      includeAssets: ['favicon.ico', 'logotrans.png'], 
      manifest: {
        name: 'HearMe',
        short_name: 'HearMe',
        description: 'Secure Voice Verification Using Signal Processing',
        theme_color: '#373a36',
        
        // 1. MATCH THE BACKGROUND COLOR
        background_color: '#373a36', 
        
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'logotrans.png',
            sizes: '192x192',
            type: 'image/png',
            // 2. ALLOW MASKING (Fills the icon shape)
            purpose: 'any maskable' 
          },
          {
            src: 'logotrans.png',
            sizes: '512x512',
            type: 'image/png',
            // 2. ALLOW MASKING (Fills the icon shape)
            purpose: 'any maskable' 
          }
        ]
      }
    })
  ],
})