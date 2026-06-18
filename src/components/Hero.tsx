import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Play, Pause } from 'lucide-react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.addEventListener('canplaythrough', () => setLoaded(true))
    return () => v.removeEventListener('canplaythrough', () => setLoaded(true))
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="accueil" className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      {/* VIDEO — cinematic intro */}
      <div className="absolute inset-0 hero-video-wrap">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/hero.mov"
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80"
        />
        {/* Fallback image si vidéo pas chargée */}
        {!loaded && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80')` }}
          />
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Dot pattern subtil */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(30,205,196,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── CONTENU ── */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Eyebrow */}
        <div className="hero-eyebrow inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-sm font-medium tracking-widest uppercase"
          style={{ borderColor: 'var(--teal)', color: 'var(--teal)' }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--teal)' }} />
          Polynésie Française · Rangiroa
        </div>

        {/* Titre principal */}
        <h1 className="hero-title text-white mb-6 leading-tight"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          Découvrez Rangiroa
          <br />
          <span style={{ color: 'var(--teal)' }}>en van privé</span>
        </h1>

        {/* Sous-titre */}
        <p className="hero-sub text-white/90 mb-10 max-w-2xl mx-auto"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(16px, 2.5vw, 20px)', lineHeight: 1.7, textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
          Visite guidée privée de l'atoll en 6 arrêts incontournables.
          Histoire, culture polynésienne et paysages époustouflants.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => scrollTo('#visites')} className="btn-outline text-base px-8 py-4">
            <span>Découvrir la visite</span>
          </button>
          <button onClick={() => scrollTo('#reservation')} className="btn-teal text-base px-8 py-4">
            <span>Réserver maintenant</span>
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats flex items-center justify-center gap-8 mt-16 flex-wrap">
          {[
            { value: '2h30', label: 'Durée de la visite' },
            { value: '6', label: 'Arrêts incontournables' },
            { value: 'FR / EN', label: 'Langues disponibles' },
          ].map((stat) => (
            <div key={stat.label} className="text-center counter-animate">
              <div className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--teal)' }}>
                {stat.value}
              </div>
              <div className="text-white/70 text-xs tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton play/pause vidéo */}
      <button
        onClick={togglePlay}
        className="play-btn absolute bottom-20 right-6 sm:right-10 w-12 h-12 rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: 'var(--teal)' }}
        aria-label={playing ? 'Pause vidéo' : 'Lancer la vidéo'}
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#visites')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown size={20} className="arrow-bounce" />
      </button>
    </section>
  )
}
