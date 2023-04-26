// vite.config.js

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

function handlebarsOverride(options) {
    const plugin = handlebars(options);
    // Currently handleHotUpdate skips further processing, which bypasses
    // postcss and in turn tailwind doesn't pick up file changes
    delete plugin.handleHotUpdate;
    return plugin;
}


// Do not add hsah to the file names in production
// Split into multiple chunks both JS and CSS files
// Store JS chunks in the dist/scripts folder
// Store CSS chunks in the dist/styles folder
// Build multi page site
export default defineConfig({
    build: {
        outDir: 'dist',
        assetsInlineLimit: 0,
        manifest: true,
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login/index.html'),
                register: resolve(__dirname, 'register/index.html'),
            },
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
    plugins: [
        splitVendorChunkPlugin(),
        handlebarsOverride({
            partialDirectory: resolve(__dirname, 'src/partials'),
            helpers: {
                json: (context) => JSON.stringify(context),
            },
        }),
    ],
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 5173,
        rewrite: {
            auto: true,
        },
    },
})

