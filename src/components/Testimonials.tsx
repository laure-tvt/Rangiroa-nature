import { useEffect, useRef } from 'react'

const reviews = [
  {
    name: 'Claire & Thomas M.',
    from: 'Lyon · Juin 2025',
    text: "Une visite absolument magique. Le guide connaît chaque recoin de l'île et partage des anecdotes qu'on ne trouve dans aucun guide de voyage. Indispensable !",
    stars: 5,
  },
  {
    name: 'Sophie & Pierre L.',
    from: 'Paris · Mars 2025',
    text: "Nous avons découvert des endroits que jamais on n'aurait trouvés seuls. La passe de Tiputa au coucher du soleil... inoubliable. Merci pour cette journée parfaite !",
    stars: 5,
  },
  {
    name: 'David K.',
    from: 'Genève · Août 2024',
    text: "Van climatisé, guide passionné, arrêts bien choisis. On repart avec une vraie compréhension de Rangiroa. À faire absolument avant de reprendre l'avion.",
    stars: 5,
  },
]

const Star = () => (
  <svg className="w-4 h-4" fill="#D4AF37" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="avis" ref={sectionRef} className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium tracking-widest uppercase"
            style={{ color: '#D4AF37' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
            Avis clients
            <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              color: '#3D2817',
              lineHeight: 1.15,
            }}
          >
            Ce qu'ils <span style={{ color: '#D4AF37' }}>disent de nous</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed mt-4">
            Des voyageurs du monde entier partagent leur expérience avec Tevaiti Van Tours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="reveal card-hover rounded-2xl p-7 border"
              style={{ borderColor: '#F0EBE5', transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(r.stars)].map((_, s) => <Star key={s} />)}
              </div>
              <blockquote
                className="text-gray-700 text-sm leading-relaxed mb-5 italic"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                "{r.text}"
              </blockquote>
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: '#3D2817', fontFamily: 'Montserrat, sans-serif' }}
                >
                  {r.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#D4AF37' }}>{r.from}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
