import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Icons({ autoInstall: true, compiler: 'jsx', jsx: 'react', }), viteStaticCopy({
    targets: [
      {
        src: 'node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js',
        dest: '.'
      },
      {
        src: 'node_modules/@ricky0123/vad-web/dist/silero_vad.onnx',
        dest: '.'
      },
      {
        src: 'node_modules/onnxruntime-web/dist/*.wasm',
        dest: '.'
      }, 
      {
        src: 'node_modules/onnxruntime-web/dist/*',
        dest: 'assets'
      }
    ]
  })],
  build: {
    rollupOptions: {
      external: ['@xenova/transformers'],
    },
  },
  optimizeDeps: {
    exclude: ['@xenova/transformers', 'onnxruntime-web']
  },
  assetsInclude: ['**/*.onnx', '**/*.wasm'],
})
