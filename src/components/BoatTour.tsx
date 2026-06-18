import { Search, Eye, FileCheck } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Recherchez',
    desc: 'Explorez des milliers de biens en vente et en location à travers tous les archipels de Polynésie française.',
  },
  {
    num: '02',
    icon: Eye,
    title: 'Visitez',
    desc: "Prenez contact avec notre réseau d'agents locaux et organisez vos visites rapidement et facilement.",
  },
  {
    num: '03',
    icon: FileCheck,
    title: 'Signez',
    desc: 'Finalisez votre acquisition en toute sécurité avec l\'accompagnement de nos conseillers juridiques certifiés.',
  },
]

const areas = [
  {
    name: 'Tahiti',
    sub: 'Iles du Vent',
    count: '482 biens',
    img: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=600&q=80',
  },
  {
    name: 'Moorea',
    sub: 'Iles du Vent',
    count: '218 biens',
    img: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80',
  },
  {
    name: 'Bora Bora',
    sub: 'Iles Sous-le-Vent',
    count: '176 biens',
    img: 'https://images.unsplash.com/photo-1583418855168-26fb64b8fe47?w=600&q=80',
  },
  {
    name: 'Rangiroa',
    sub: 'Tuamotu',
    count: '94 biens',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  },
]

export default function BoatTour() {
  return (
    <>
      {/* How it works */}
      <section id="comment-ca-marche" className="py-24 px-6" style={{ backgroundColor: '#0D0D0D' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label justify-center mx-auto">
              Comment ça marche
            </div>
            <h2 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
            }}>
              Votre projet immobilier<br />
              <span style={{ color: '#6F4F28' }}>en 3 étapes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="card-dark p-8 text-center">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
                  style={{ backgroundColor: 'rgba(111,79,40,0.1)', border: '1.5px solid rgba(111,79,40,0.3)' }}
                >
                  <s.icon size={24} style={{ color: '#6F4F28' }} />
                </div>
                <div style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'rgba(111,79,40,0.65)',
                  letterSpacing: '0.14em',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>
                  Étape {s.num}
                </div>
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', color: '#ffffff', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular areas */}
      <section id="secteurs" className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="section-label">Destinations</div>
              <h2 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
              }}>
                Explorez par <span style={{ color: '#6F4F28' }}>secteur</span>
              </h2>
            </div>
            <button
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                color: '#6F4F28',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                fontWeight: 600,
              }}
            >
              Voir tous les secteurs →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {areas.map((a, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl cursor-pointer group" style={{ height: '260px' }}>
                <img
                  src={a.img}
                  alt={a.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)' }} />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ border: '2px solid rgba(111,79,40,0.5)', borderRadius: '16px' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '20px', color: '#ffffff', marginBottom: '3px' }}>{a.name}</h3>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>{a.sub}</div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: 'rgba(111,79,40,0.2)', color: '#6F4F28', border: '1px solid rgba(111,79,40,0.4)' }}
                  >
                    {a.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
