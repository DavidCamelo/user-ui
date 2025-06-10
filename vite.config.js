import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
    name: 'user-ui',
    filename: 'remoteEntry.js',
    exposes: {
      './UsersPage': './src/pages/UsersPage.jsx'
    },
    remotes: {
      components_ui: 'https://components-ui.davidcamelo.com/assets/remoteEntry.js'
    },
    shared: ['react']
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    allowedHosts: ['user-ui']
  },
  preview: {
    cors: {
      origin: '*',
      methods: '*',
      allowedHeaders: '*'
    },
    allowedHosts: ['user-ui', 'user-ui.davidcamelo.com']
  }
})
