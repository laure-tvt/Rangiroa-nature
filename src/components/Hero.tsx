import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const scrollToTours = () => {
    const el = document.querySelector('#visites')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="accueil"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        height: '100vh',
        backgroundImage: `url('/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="hero-title-anim mb-6" style={{ lineHeight: 1.05 }}>
          {/* "6 arrêts," — rempli par l'image (background-clip: text) */}
          <span
            className="hero-clip-text block"
            style={{ fontSize: 'clamp(32px, 8vw, 80px)', fontWeight: 700 }}
          >
            6 arrêts,
          </span>
          {/* "900 ans d'histoire" — blanc normal */}
          <span
            className="block text-white"
            style={{
              fontSize: 'clamp(32px, 8vw, 80px)',
              fontWeight: 700,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            900 ans d'histoire
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle-anim text-white/85 mb-10 max-w-2xl mx-auto"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.65,
            fontWeight: 400,
          }}
        >
          Une immersion de 2h30 guidée pour rencontrer l'âme de Rangiroa
        </p>

        {/* CTA */}
        <div className="hero-cta-anim flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToTours}
            className="hero-cta-btn"
          >
            Découvrir le circuit
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats-anim flex items-center justify-center gap-12 mt-16 flex-wrap">
          {[
            { value: '2h30', label: 'Durée de la visite' },
            { value: '6', label: 'Arrêts incontournables' },
            { value: 'FR / EN', label: 'Langues disponibles' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  color: '#C46926',
                  fontWeight: 800,
                  fontSize: '28px',
                }}
              >
                {stat.value}
              </div>
              <div className="text-white/60 text-xs tracking-widest mt-1 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll arrow */}
      <button
        onClick={scrollToTours}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown size={20} className="hero-bounce" />
      </button>
    </section>
  )
}
