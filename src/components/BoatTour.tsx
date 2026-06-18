import { useEffect, useRef } from 'react'
import { Anchor } from 'lucide-react'

export default function BoatTour() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToBooking = () => {
    const el = document.querySelector('#reservation')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80')`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(61, 40, 23, 0.82)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center reveal">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 mx-auto"
          style={{
            backgroundColor: 'rgba(212,175,55,0.15)',
            border: '1.5px solid rgba(212,175,55,0.4)',
          }}
        >
          <Anchor size={26} style={{ color: '#D4AF37' }} />
        </div>

        <div
          className="inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{
            backgroundColor: 'rgba(212,175,55,0.15)',
            color: '#D4AF37',
            border: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          Bientôt disponible
        </div>

        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}
        >
          Un tour en bateau ?
        </h2>

        <p
          className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px' }}
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
