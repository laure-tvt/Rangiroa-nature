import { Anchor } from 'lucide-react'

export default function BoatTour() {
  const scrollToBooking = () => {
    const el = document.querySelector('#reservation')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.82)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 mx-auto"
          style={{
            backgroundColor: 'rgba(139,107,66,0.1)',
            border: '1.5px solid rgba(139,107,66,0.4)',
          }}
        >
          <Anchor size={26} style={{ color: '#8B6B42' }} />
        </div>

        <div
          className="inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{
            backgroundColor: 'rgba(139,107,66,0.1)',
            color: '#8B6B42',
            border: '1px solid rgba(139,107,66,0.3)',
          }}
        >
          Bientôt disponible
        </div>

        <h2
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          Un tour en bateau ?
        </h2>

        <p
          className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '17px', fontWeight: 400 }}
        >
          Après la route, l'eau. Nous préparons une expérience en bateau sur le lagon de
          Rangiroa — dauphins, coraux, îlots perdus. Signalez votre intérêt lors de votre
          réservation.
        </p>

        <button onClick={scrollToBooking} className="btn-outline text-base px-8 py-4">
          Me tenir informé(e)
        </button>
      </div>
    </section>
  )
}
