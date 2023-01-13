import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const TARGET = "http://127.0.0.1:10500";

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        proxy: {
            "/blogapi": {
                target: TARGET,
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
