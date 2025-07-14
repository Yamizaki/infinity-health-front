import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Carga las variables de entorno según el modo (development/production)
  const env = loadEnv(mode, process.cwd())
  
  // Configuración base que funciona para todos los entornos
  const config: any = {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      // Hace que import.meta.env esté disponible en el cliente
      // No es necesario usar __APP_ENV__ ya que Vite expone las variables automáticamente
    }
  }
  
  // Solo configura el proxy en desarrollo
  if (command === 'serve') {
    config.server = {
      proxy: {
        // todas las peticiones que empiecen con /api
        '/api': {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: false,
          // No reescribimos la ruta para mantener /api en la URL
          rewrite: (path: string) => path,
        },
      },
    }
  }
  
  return config
})
