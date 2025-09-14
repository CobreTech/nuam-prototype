'use client'

/**
 * Página de Inicio de Sesión (Login)
 * 
 * Este componente presenta un formulario para que los usuarios ingresen sus credenciales.
 * Incluye validación básica y una simulación de proceso de autenticación.
 * 
 * Funcionalidades:
 * - Formulario con campos para email y contraseña.
 * - Opción para mostrar/ocultar la contraseña.
 * - Simulación de una llamada a API con un estado de carga.
 * - Redirección al dashboard principal tras un inicio de sesión exitoso (simulado).
 * - Interfaz con fondo animado y diseño responsivo.
 */

import { useState } from 'react' // Hook de React para gestionar el estado.
import { useRouter } from 'next/navigation' // Hook de Next.js para la navegación.
import Link from 'next/link' // Componente de Next.js para enlaces de navegación.
import Image from 'next/image' // Componente de Next.js para optimización de imágenes.

// Componente principal de la página de Login.
export default function Login() {
  const router = useRouter() // Hook para manejar el enrutamiento.

  // --- ESTADOS DEL FORMULARIO ---
  const [email, setEmail] = useState('') // Estado para el campo de correo electrónico.
  const [password, setPassword] = useState('') // Estado para el campo de contraseña.
  const [loading, setLoading] = useState(false) // Estado para controlar la visualización de carga.
  const [showPassword, setShowPassword] = useState(false) // Estado para mostrar u ocultar la contraseña.

  // --- MANEJADOR DEL ENVÍO DEL FORMULARIO ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault() // Previene el comportamiento por defecto de recarga de la página.
    setLoading(true) // Activa el estado de carga.
    
    // Simula una petición de inicio de sesión asíncrona (ej. a una API).
    // Acepta cualquier credencial para fines de demostración.
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirige al usuario al dashboard después de la simulación.
    router.push('/dashboard')
  }

  return (
    // Contenedor principal de la página con fondo degradado y centrado de contenido.
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 text-white flex items-center justify-center p-4">
      {/* Fondo animado con blobs de colores. */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-red-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>

      {/* Contenedor del formulario de login. */}
      <div className="relative z-10 w-full max-w-md">
        {/* Encabezado con el logo y título. */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center p-1 animate-glow">
              <Image 
                src="/images/NuamLogo.jpg" 
                alt="NUAM" 
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              NUAM
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Bienvenido de vuelta</h1>
          <p className="text-gray-400">Ingresa a tu cuenta para continuar</p>
        </div>

        {/* Formulario de inicio de sesión. */}
        <form onSubmit={handleLogin} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              placeholder="corredor@nuam.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded" />
              <span className="text-sm text-gray-300">Recordarme</span>
            </label>
            <Link href="#" className="text-sm text-orange-400 hover:text-orange-300">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de envío del formulario. */}
          <button
            type="submit"
            disabled={loading} // Se deshabilita mientras está en estado de carga.
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {/* Muestra un spinner y texto diferente durante la carga. */}
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Ingresando...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>

          <div className="text-center pt-4 border-t border-white/10">
            <span className="text-gray-400">¿No tienes cuenta? </span>
            <Link href="#" className="text-orange-400 hover:text-orange-300">
              Contacta al administrador
            </Link>
          </div>
        </form>

        {/* Back to home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
          33% { transform: translate(30px, -50px) scale(1.1) rotate(120deg); }
          66% { transform: translate(-20px, 20px) scale(0.9) rotate(240deg); }
          100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.5); }
          50% { box-shadow: 0 0 30px rgba(251, 146, 60, 0.8); }
        }
        
        .animate-blob {
          animation: blob 20s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}