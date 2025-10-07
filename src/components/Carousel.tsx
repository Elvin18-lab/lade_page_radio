import { useEffect, useMemo, useState } from 'react';

  // Tip: coloca tus imágenes en public/assets como img1.jpg ... img7.jpg
  // Puedes ajustar las rutas y textos según tus necesidades.
  type Slide = {
    src?: string; // opcional para que no sea obligatorio tener imágenes
    text: string;
  };

  const defaultSlides: Slide[] = [
    { text:
`Bad Bunny - Perfumito
Dime ya, ¿cuándo voy a probar tu perfumito nuevo?
La otra ve' no te la vi, papi, sé que te la debo` },

    { text:
`Tainy & Ozuna - En visto
Quiero una noche como aquella fue, como ninguna
Escribe por Telegram, ay, por WhatsApp` },

    { text:
`Tainy & Arcángel - Me Jodí
Ma yo sé lo que tu necesitas
Alguien como yo que te de duro mientras gritas` },

    { text:
`Jhayco & mora - 512
Hoy dice que llega después de las doce
Y anda en camionetas que parecen troces` },

    { text:
`Jhayco ft. Brray, Ryan Castro
Pensando como un loco que si no es tu cuerpo más ninguno toco
Lo de nosotros fue fuera de lo normal` },

    { text:
`Mora
Sigo detrás de tu alma, persiguiendo recuerdos
Recuerdos que me abrazan siempre que tengo miedo` },

    { text:
`Mora ft. C. Tangana
Baby, perdona la hora, es que el dolor no mejora
Para olvidar tus besos se necesita droga` },
  ];

  interface CarouselProps {
    slides?: Slide[];
    intervalMs?: number;
    heightClass?: string; // Tailwind height (e.g. 'h-[380px]')
    position?: 'top' | 'center';
  }

export default function Carousel({
  slides = defaultSlides,
  intervalMs = 4500,
  heightClass = 'h-[280px] sm:h-[420px] lg:h-[520px]',
  position = 'center',
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);

  const items = useMemo(() => slides.filter(Boolean), [slides]);
  
  // Avance de slide adaptativo según largo del texto
  useEffect(() => {
    if (items.length === 0) return;
    const text = items[active]?.text ?? '';
    const perCharMs = 40; // velocidad de tipeo estimada
    const bufferMs = 1200; // tiempo extra para leer
    const minMs = Math.max(intervalMs, 4000);
    const duration = Math.max(minMs, text.length * perCharMs + bufferMs);
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % items.length);
      setTypingIndex(0);
    }, duration);
    return () => clearTimeout(id);
  }, [items, active, intervalMs]);

  // Efecto de escritura simple por JS (complementa animación)
  useEffect(() => {
    if (items.length === 0) return;
    const full = items[active]?.text ?? '';
    const id = setInterval(() => {
      setTypingIndex((i) => {
        if (i >= full.length) {
          clearInterval(id);
          return i;
        }
        return i + 1;
      });
    }, 25);
    return () => clearInterval(id);
  }, [active, items]);

  if (items.length === 0) return null;

  return (
    <section className={`relative w-full ${heightClass} overflow-hidden rounded-xl border border-neutral-300 bg-white/30 backdrop-blur-md shadow-xl`}
      aria-label="Galería de imágenes de la estación">
      {/* Slides */}
      <div className="absolute inset-0">
        {items.map((s, i) => (
          s.src ? (
            <img
              key={i}
              src={s.src}
              alt={`Slide ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ) : (
            <div
              key={i}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                i === active ? 'opacity-100' : 'opacity-0'
              } bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900`}
            />
          )
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/40 to-transparent" />
      </div>

      {/* Overlay contenido */}
      <div className={`absolute left-0 right-0 px-3 sm:px-6 ${
        position === 'top' ? 'top-4 sm:top-6' : 'top-1/2 -translate-y-1/2'
      }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-red-600/90 border border-red-500 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-xs text-white tracking-wider font-semibold">LETRAS DE MÚSICA</span>
          </div>
          <h3 className="text-base sm:text-3xl lg:text-5xl font-extrabold text-white drop-shadow-2xl leading-tight sm:leading-relaxed">
            <span className="typing-caret whitespace-pre-line lyrics-text break-words">
              {items[active]?.text.slice(0, typingIndex)}
            </span>
          </h3>
        </div>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === active ? 'bg-red-600 w-6' : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
