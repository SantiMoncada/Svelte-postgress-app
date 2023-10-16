import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';


export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [sveltekit()],
    server: {
      port: 3000,
      host: `${loadEnv(mode, process.cwd()).VITE_HOST || 'localhost'}`,
    }
  })
}