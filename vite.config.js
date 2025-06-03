import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
    name: 'user-ui',
    filename: 'remoteEntry.js',
    exposes: {
      './User': './src/user/User.jsx'
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
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['X-Requested-With', 'content-type', 'Authorization']
    },
    allowedHosts: ['user-ui', 'user-ui.davidcamelo.com']
  }
})
