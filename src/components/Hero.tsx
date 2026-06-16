import { ChevronDown } from 'lucide-react'

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
      {/* Background image via CSS gradient + unsplash image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80')`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(212,175,55,0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-sm font-medium tracking-widest uppercase"
          style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D4AF37' }} />
          Polynésie Française · Rangiroa
        </div>

        {/* Main heading */}
        <h1
          className="text-white mb-6 leading-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: '700',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}
        >
          Découvrez Rangiroa
          <br />
          <span style={{ color: '#D4AF37' }}>en voiture</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/90 mb-10 max-w-2xl mx-auto"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            lineHeight: '1.7',
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          Circuits privés, expériences authentiques. Partez à la découverte
          du plus grand atoll du monde avec un guide local passionné.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToTours} className="btn-outline text-base px-8 py-4">
            Explorer les visites
          </button>
          <button onClick={scrollToBooking} className="btn-primary text-base px-8 py-4">
            Réserver maintenant
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-16 flex-wrap">
          {[
            { value: '4+', label: 'Circuits exclusifs' },
            { value: '100%', label: 'Privé & personnalisé' },
            { value: '10 ans', label: "d'expérience locale" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}
              >
                {stat.value}
              </div>
              <div className="text-white/70 text-xs tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToTours}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown size={20} className="arrow-bounce" />
      </button>
    </section>
  )
}
