import { ChevronDown, ArrowRight } from 'lucide-react'

export default function Hero() {
  const scrollToTours = () => {
    const el = document.querySelector('#visites')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToBooking = () => {
    const el = document.querySelector('#reservation')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="accueil"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background: filao + lagon */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      />
      {/* Overlay léger — photo bien visible, style FIND */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.58) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto">

        {/* Badge */}
        <div
          className="hero-badge inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{
            border: '1px solid rgba(139,107,66,0.55)',
            color: '#8B6B42',
            backgroundColor: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8B6B42' }} />
          Polynésie Française · Rangiroa
        </div>

        {/* Brand name — le FIND de TVT : massif, dominant */}
        <div className="hero-title-anim" style={{ lineHeight: 0.92, marginBottom: '28px' }}>
          <span
            className="block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(46px, 7.5vw, 108px)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textShadow: '0 4px 48px rgba(0,0,0,0.35)',
            }}
          >
            Tevaiti
          </span>
          <span
            className="block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(46px, 7.5vw, 108px)',
              fontWeight: 900,
              color: '#8B6B42',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 4px 48px rgba(0,0,0,0.35)',
            }}
          >
            Van Tours
          </span>
        </div>

        {/* Séparateur */}
        <div
          className="mx-auto mb-7"
          style={{ width: '56px', height: '2px', backgroundColor: 'rgba(255,255,255,0.35)' }}
        />

        {/* Tagline — le « Find What Moves You » de TVT */}
        <p
          className="hero-subtitle-anim text-white mb-3"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(22px, 3vw, 42px)',
            fontWeight: 700,
            letterSpacing: '0.01em',
            lineHeight: 1.2,
            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
          }}
        >
          6 arrêts, 900 ans d'histoire.
        </p>

        {/* Sous-titre */}
        <p
          className="text-white/65 mb-10 max-w-md mx-auto"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(13px, 1.4vw, 16px)',
            fontWeight: 400,
            lineHeight: '1.7',
          }}
        >
          Visite guidée privée en van climatisé · 2h30 · Polynésie Française
        </p>

        {/* CTAs — style pill sombre inspiré FIND */}
        <div className="hero-cta-anim flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToBooking}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(10,10,10,0.75)',
              color: '#ffffff',
              border: '1.5px solid rgba(255,255,255,0.3)',
              padding: '15px 38px',
              borderRadius: '50px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#8B6B42'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#8B6B42'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(10,10,10,0.75)'
              ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)'
            }}
          >
            Réserver maintenant <ArrowRight size={16} />
          </button>

          <button
            onClick={scrollToTours}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              border: 'none',
              padding: '15px 12px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '15px',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'rgba(255,255,255,0.35)',
              transition: 'color 0.2s',
            }}
          >
            Découvrir le circuit
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats-anim flex items-center justify-center gap-10 mt-16 flex-wrap">
          {[
            { value: '2h30', label: 'Durée de la visite' },
            { value: '6', label: 'Arrêts incontournables' },
            { value: 'FR / EN', label: 'Langues disponibles' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#8B6B42',
                  fontWeight: 800,
                  fontSize: '26px',
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs tracking-widest mt-1 uppercase"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToTours}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors"
        style={{ color: 'rgba(255,255,255,0.45)' }}
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown size={20} className="hero-bounce" />
      </button>
    </section>
  )
}
