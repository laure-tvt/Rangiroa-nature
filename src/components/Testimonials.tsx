const reviews = [
  {
    name: 'Marie-Cécile D.', from: 'Paris → Papeete · 2025',
    text: "Grâce à FIND Polynésie, j'ai trouvé ma villa à Arue en moins de 3 semaines. L'agent était réactif, professionnel, et la transaction s'est faite sans accroc. Je recommande vivement !",
    stars: 5, type: 'Acheteuse — Villa 4 chambres',
  },
  {
    name: 'Jean-Pierre & Hina M.', from: 'Moorea · 2024',
    text: "Nous voulions vendre notre bungalow rapidement avant notre départ en Métropole. Le bien a été vendu en 6 semaines au prix demandé. Service impeccable, communication au top.",
    stars: 5, type: 'Vendeurs — Bungalow 2 chambres',
  },
  {
    name: 'Thomas K.', from: 'Genève → Bora Bora · 2025',
    text: "Investisseur depuis 10 ans, FIND Polynésie est la première agence à m'avoir fourni une analyse de marché aussi complète. Un vrai partenaire pour investir aux antipodes.",
    stars: 5, type: 'Investisseur — Terrain + Villa',
  },
]

const Star = () => (
  <svg className="w-4 h-4" fill="#6F4F28" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function Testimonials() {
  return (
    <section id="avis" className="py-24 px-6" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div data-reveal className="section-label justify-center mx-auto">
            Témoignages clients
          </div>
          <h2
            data-reveal
            data-delay="100"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15 }}
          >
            Ce que nos clients<br />
            <span style={{ color: '#6F4F28' }}>disent de nous</span>
          </h2>
          <p
            data-reveal
            data-delay="200"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.45)', marginTop: '14px', maxWidth: '460px', margin: '14px auto 0' }}
          >
            Plus de 8 500 transactions réalisées depuis 2004 en Polynésie française.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="card-dark p-7 flex flex-col"
              data-reveal="up"
              data-delay={String(i * 140)}
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(r.stars)].map((_, s) => <Star key={s} />)}
              </div>
              <blockquote style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, fontStyle: 'italic', flexGrow: 1, marginBottom: '20px' }}>
                "{r.text}"
              </blockquote>
              <div style={{ borderTop: '1px solid rgba(111,79,40,0.12)', paddingTop: '16px' }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '14px', color: '#ffffff' }}>{r.name}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#6F4F28', marginTop: '2px' }}>{r.from}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.28)', marginTop: '4px' }}>{r.type}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center text-center" data-reveal data-delay="100">
          <div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '52px', color: '#6F4F28', lineHeight: 1 }}>4.9</div>
            <div className="flex justify-center gap-0.5 mt-2">{[...Array(5)].map((_, i) => <Star key={i} />)}</div>
            <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>Note moyenne · 1 240 avis vérifiés</div>
          </div>
        </div>
      </div>
    </section>
  )
}
