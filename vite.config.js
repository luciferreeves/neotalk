// vite.config.js

import { defineConfig, splitVendorChunkPlugin } from 'vite'

// Do not add hsah to the file names in production
// Split into multiple chunks both JS and CSS files
// Store JS chunks in the dist/scripts folder
// Store CSS chunks in the dist/styles folder
export default defineConfig({
    build: {
        outDir: 'dist',
        assetsInlineLimit: 0,
        manifest: true,
        rollupOptions: {
            output: {
                entryFileNames: 'scripts/[name].js',
                chunkFileNames: 'scripts/[name].js',
                assetFileNames: 'styles/[name].css',
            },
        },
        minify: 'terser',
        sourcemap: false,
        emptyOutDir: true,
        target: 'esnext',
        cssCodeSplit: true,
        brotliSize: false,
        chunkSizeWarningLimit: 1000,
        terserOptions: {
            compress: {
                keep_infinity: true,
                drop_console: true,
            },
        },
    },
    plugins: [splitVendorChunkPlugin()],
})

