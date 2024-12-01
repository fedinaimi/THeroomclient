import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://theroomback.onrender.com',
                changeOrigin: true, // Needed for CORS
                secure: true, // Set this to false if your backend uses self-signed certificates
            },
        },
    },
});
