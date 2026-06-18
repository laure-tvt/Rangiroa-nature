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
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&q=80')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border text-sm font-medium tracking-widest uppercase"
          style={{ borderColor: '#6F4F28', color: '#6F4F28' }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#6F4F28' }} />
          Polynésie Française · Rangiroa
        </div>

        <h1 className="text-white mb-6" style={{ lineHeight: 1.0 }}>
          <span
            className="block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              textShadow: '0 2px 30px rgba(0,0,0,0.4)',
            }}
          >
            6 arrêts,
          </span>
          <span
            className="block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              color: '#6F4F28',
              textShadow: '0 2px 30px rgba(0,0,0,0.4)',
            }}
          >
            900 ans
          </span>
          <span
            className="block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 900,
              textShadow: '0 2px 30px rgba(0,0,0,0.4)',
            }}
          >
            d'histoire.
          </span>
        </h1>

        <p
          className="text-white/80 mb-10 max-w-2xl mx-auto"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: '1.7',
            fontWeight: 400,
            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
          }}
        >
          Visite guidée privée de l'atoll de Rangiroa en van climatisé.
          2h30 d'histoire, de culture polynésienne et de paysages époustouflants.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToBooking} className="btn-primary text-base px-8 py-4">
            Réserver maintenant
          </button>
          <button onClick={scrollToTours} className="btn-outline text-base px-8 py-4">
            Découvrir le circuit
          </button>
        </div>

        <div className="flex items-center justify-center gap-12 mt-16 flex-wrap">
          {[
            { value: '2h30', label: 'Durée de la visite' },
            { value: '6', label: 'Arrêts incontournables' },
            { value: 'FR / EN', label: 'Langues disponibles' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ fontFamily: 'Montserrat, sans-serif', color: '#6F4F28', fontWeight: 800 }}
              >
                {stat.value}
              </div>
              <div className="text-white/60 text-xs tracking-widest mt-1 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollToTours}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
        aria-label="Défiler vers le bas"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown size={20} />
      </button>
    </section>
  )
}
