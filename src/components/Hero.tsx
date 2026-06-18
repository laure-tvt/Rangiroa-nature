import { useRef, useState } from 'react'
import { ArrowRight, Volume2, VolumeX } from 'lucide-react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="accueil" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* VIDEO / POSTER */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover hero-video-wrap"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80"
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source src="/hero.mov" type="video/quicktime" />
        </video>
      </div>

      {/* Overlay — minimal, laisse respirer le visuel */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.2) 45%, rgba(10,10,10,0.7) 100%)'
      }} />

      {/* ── CONTENU CENTRÉ ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">

        {/* Badge */}
        <div className="hero-eyebrow flex items-center gap-2 mb-8">
          <span className="w-8 h-px" style={{ backgroundColor: 'var(--teal)' }} />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
            Rangiroa · Polynésie Française
          </span>
          <span className="w-8 h-px" style={{ backgroundColor: 'var(--teal)' }} />
        </div>

        {/* Titre XXL éditorial */}
        <h1 className="hero-title text-white mb-6"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(52px, 9vw, 96px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}>
          Découvrez<br />
          <span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Rangiroa</span>
        </h1>

        {/* Sous-titre épuré */}
        <p className="hero-sub mb-10 text-white/75 max-w-lg"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7 }}>
          Visite guidée privée en van · 6 arrêts · 2h30<br />
          Français & Anglais · Pick-up inclus
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-3 items-center">
          <button
            onClick={() => scrollTo('#reservation')}
            className="group flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{ background: 'var(--teal)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal-bright)'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Réserver ma visite
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            onClick={() => scrollTo('#visites')}
            className="flex items-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-white transition-all duration-300"
            style={{ border: '1.5px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.transform = 'scale(1.04)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            Voir le circuit
          </button>
        </div>

        {/* Stats minimalistes */}
        <div className="hero-stats flex items-center gap-8 mt-14 flex-wrap justify-center">
          {[
            { value: '2h30', label: 'de visite' },
            { value: '6', label: 'arrêts' },
            { value: 'FR/EN', label: 'bilingue' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-white font-bold" style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', lineHeight: 1 }}>
                {s.value}
              </div>
              <div className="text-white/50 text-xs tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Son / Mute */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-6 flex items-center gap-2 px-3 py-2 rounded-full text-xs text-white/70 hover:text-white transition-colors"
        style={{ border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.2)' }}
        aria-label="Activer/couper le son"
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        <span>{muted ? 'Son' : 'Mute'}</span>
      </button>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo('#visites')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
      >
        <div className="w-px h-10 arrow-bounce" style={{ background: 'linear-gradient(to bottom, transparent, var(--teal))' }} />
      </button>
    </section>
  )
}
