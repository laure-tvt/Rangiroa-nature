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
  <svg className="w-4 h-4" fill="#00ffff" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function Testimonials() {
  return (
    <section id="avis" className="py-24 px-6" style={{ backgroundColor: '#0f1c2a' }}>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium tracking-widest uppercase"
            style={{ color: '#00ffff' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#00ffff' }} />
            Avis clients
            <span className="w-8 h-px" style={{ backgroundColor: '#00ffff' }} />
          </div>
          <h2
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
            }}
          >
            Ce qu'ils <span style={{ color: '#00ffff' }}>disent de nous</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed mt-4">
            Des voyageurs du monde entier partagent leur expérience avec Tevaiti Van Tours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="card-navy p-7">
              <div className="flex gap-1 mb-4">
                {[...Array(r.stars)].map((_, s) => <Star key={s} />)}
              </div>
              <blockquote
                className="text-white/80 text-sm leading-relaxed mb-5 italic"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
              >
                "{r.text}"
              </blockquote>
              <div>
                <div
                  className="font-semibold text-sm text-white"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                >
                  {r.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#00ffff' }}>{r.from}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
