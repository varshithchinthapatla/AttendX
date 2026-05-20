import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'AttendX',

        short_name: 'AttendX',

        description:
          'Smart Attendance Tracking Platform',

        theme_color: '#000000',

        background_color: '#000000',

        display: 'standalone',

        start_url: '/',

        icons: [
          {
            src: '/192 x 192.png',

            sizes: '192x192',

            type: 'image/png',
          },

          {
            src: '/512x512.png',

            sizes: '512x512',

            type: 'image/png',
          },
        ],
      },
    }),
  ],
})