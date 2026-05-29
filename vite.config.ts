import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // 무거운 서드파티 라이브러리를 vendor 청크로 분리해 캐싱·병렬 로딩 최적화
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/ogl')) return 'ogl'
        },
      },
    },
  },
})
