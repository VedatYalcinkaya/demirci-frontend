import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Daha iyi performans için React refresh'i optimize et
      fastRefresh: true,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      overlay: false, // HMR hata katmanını devre dışı bırak (yavaşlık yaratabiliyor)
    },
    watch: {
      usePolling: false, // Dosya değişikliklerini izlerken polling kullanma (CPU'yu yoruyor)
    },
  },
  build: {
    target: 'es2015', // Daha iyi tarayıcı uyumluluğu
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Konsolları kaldır (prod için)
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
      },
    },
    chunkSizeWarningLimit: 1000, // Chunk boyutu uyarı limitini artır
    sourcemap: false, // Üretim için sourcemap devre dışı
    // Tarayıcı performansını iyileştirmek için chunklama stratejisini optimize et
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Temel React kütüphaneleri
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // TinyMCE ve ilgili editörler için ayrı chunk
          if (id.includes('tinymce') || id.includes('quill')) {
            return 'editor-vendor';
          }
          
          // Kod vurgulama (syntax highlighting) kütüphaneleri
          if (id.includes('highlight.js') || id.includes('prismjs')) {
            return 'syntax-highlight-vendor';
          }
          
          // Animasyon kütüphaneleri
          if (id.includes('framer-motion')) {
            return 'animation-vendor';
          }
          
          // Üçüncü parti UI kütüphaneleri
          if (id.includes('primereact') || id.includes('tabler')) {
            return 'ui-vendor';
          }
          
          // Redux, router, i18n gibi core kütüphaneler
          if (id.includes('redux') || id.includes('router') || id.includes('i18n')) {
            return 'core-vendor';
          }
          
          // Diğer tüm kütüphaneler
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['@tinymce/tinymce-react'], // Sorun çıkaran ağır paketleri önceden işleme
  },
  // Bellek sınırını artır
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
