import { useState, useRef } from 'react';
import { Play, Pause, Radio, Mail, Phone, MapPin, MessageCircle, Facebook, Youtube, Instagram, DollarSign } from 'lucide-react';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/30 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Radio className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-white">Tropical 990 AM</h1>
                <p className="text-[10px] sm:text-xs text-gray-400 italic">¡La Radio Retro!</p>
              </div>
            </div>

            <div className="flex space-x-4 sm:space-x-8">
              <a
                href="#home"
                className="text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                INICIO
              </a>
              <button
                onClick={scrollToContact}
                className="text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                CONTACTO
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 border border-red-500/30 rounded-full">
                <span className="text-red-400 text-xs sm:text-sm font-semibold">85 AÑOS EN VIVO</span>
              </div>

              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                ¡La Radio
                <span className="block text-red-500">Retro!</span>
              </h2>

              <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
                Desde 1940, llevando música clásica y nostalgia a cada hogar venezolano.
                La emisora que marcó generaciones.
              </p>

              {/* Play Button */}
              <div className="pt-4 sm:pt-6">
                <button
                  onClick={togglePlay}
                  className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-red-600 to-red-500 rounded-full shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center space-x-3 sm:space-x-4">
                    {isPlaying ? (
                      <Pause className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="white" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="white" />
                    )}
                    <span className="text-base sm:text-xl font-bold text-white">
                      {isPlaying ? 'PAUSAR' : 'ESCUCHAR EN VIVO'}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                </button>
                {/* Reemplaza la URL del stream con la URL de transmisión en vivo de la Radio*/}
                <audio ref={audioRef} src="https://stream.zeno.fm/z9vfnrbfg48uv" preload="none" />
              </div>

              {isPlaying && (
                <div className="flex items-center justify-center sm:justify-start space-x-3 animate-pulse">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-red-500 rounded-full"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animation: `pulse ${Math.random() * 0.5 + 0.5}s infinite`
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-red-400 text-xs sm:text-sm font-medium">EN VIVO AHORA</span>
                </div>
              )}
            </div>

            {/* Right Content - Programming */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 sm:mr-3 animate-pulse" />
                NUESTRA PROGRAMACIÓN
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {[
                  'Amaneciendo con Severiano',
                  'Dossier Radio con Walter Martínez',
                  'Música al atadecer',
                  'Noches de Corazón',
                  'Tu Música Retro',
                  'Tropical Contigo, Servicio Público'
                ].map((program, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-2 h-2 bg-red-500/50 rounded-full group-hover:bg-red-500 transition-colors flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-300 group-hover:text-white transition-colors">
                      {program}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3 sm:mb-4">Contáctenos</h2>
            <p className="text-gray-400 text-base sm:text-lg">Estamos aquí para escucharte</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
            {/* WhatsApp */}
            <a
              href="https://wa.me/584166082788"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-3 text-gray-300 hover:text-green-500 transition-colors group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span className="text-sm sm:text-base font-medium text-center">+58 416-6082788</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+582124821161"
              className="flex flex-col items-center space-y-3 text-gray-300 hover:text-blue-400 transition-colors group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span className="text-sm sm:text-base font-medium text-center">0212-482-11-61 y 65</span>
            </a>

            {/* Email */}
            <a
              href="mailto:radiotropical990@gmail.com"
              className="flex flex-col items-center space-y-3 text-gray-300 hover:text-red-400 transition-colors group"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/20 rounded-full flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span className="text-sm sm:text-base font-medium text-center">radiotropical990@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Social Media Icons */}
          <div className="flex justify-center items-center gap-4 sm:gap-6 mb-8">
            {/* Instagram - Reemplaza con la URL de Instagram de Radio Tropical */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-yellow-500 rounded-full flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>

            {/* Facebook - Reemplaza con la URL de Facebook de Radio Tropical */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-yellow-500 rounded-full flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
            >
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>

            {/* YouTube - Reemplaza con la URL de YouTube de Radio Tropical */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-yellow-500 rounded-full flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
            >
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Copyright © 2025 Radio Tropical - YVRT 990 AM. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;