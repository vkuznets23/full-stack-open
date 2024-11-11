import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // Import react plugin

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_'); // Load environment variables with 'VITE_' prefix
  console.log('Loaded environment variables:', env); // Log to check if env variables are loaded
  return {
    plugins: [react()], // Add react plugin
  };
});