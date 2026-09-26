import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // すべての npm ライブラリを vendor にまとめ安定したキャッシュを確保
          // ルートコンポーネントは React.lazy で自動的に個別チャンクになる
          vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
        },
      },
    },
  },
})
