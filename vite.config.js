import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const techRedirects = {
  '/react': 'https://react.dev',
  '/vite': 'https://vitejs.dev',
  '/framer': 'https://www.framer.com/motion',
  '/nextjs': 'https://nextjs.org',
  '/typescript': 'https://www.typescriptlang.org',
  '/postgres': 'https://www.postgresql.org',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'tech-redirects',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (techRedirects[req.url]) {
            res.writeHead(302, { Location: `/redirect.html?url=${techRedirects[req.url]}` })
            res.end()
            return
          }
          next()
        })
      },
    },
  ],
})
