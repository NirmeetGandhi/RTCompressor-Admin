import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
