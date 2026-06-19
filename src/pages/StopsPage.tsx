import { useEffect } from 'react'
import { ChevronRight } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import Header from '../components/Header'
import Stops from '../components/Stops'
import Footer from '../components/Footer'

const parts = [
  {
    num: '1',
    title: 'Peuplement & héritage',
    stops: 'Arrêts 01 · 02 · 03',
    desc: "Les trois premiers arrêts se focalisent sur le peuplement de l'île, l'ancien village d'Avatoru et l'impact de la chrétienté sur la culture polynésienne.",
    points: ["Le quai d'Avatoru", "L'église d'Avatoru", 'Le village historique'],
  },
  {
    num: '2',
    title: 'Nature & légendes',
    stops: 'Arrêts 04 · 05 · 06',
    desc: "Les trois derniers explorent en détails les histoires de guerres, la protection corallienne, la formation d'un atoll et les légendes locales de Rangiroa.",
    points: ['La plage publique', 'Le platier de récif', 'La passe de Tiputa'],
  },
]

export default function StopsPage() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>

        {/* La visite en deux parties */}
        <section className="px-6" data-reveal="fade" style={{ backgroundColor: '#000000', paddingTop: '140px', paddingBottom: '80px' }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <div data-reveal className="flex justify-center mb-6">
                <span style={{
                  display: 'inline-block', padding: '8px 20px', borderRadius: '999px',
                  backgroundColor: '#ffffff', color: '#6F4F28',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  Le circuit
                </span>
              </div>
              <h2
                data-reveal
                data-delay="100"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.04em', marginBottom: '16px' }}
              >
                La visite se déroule<br />
                <span style={{ color: '#6F4F28' }}>en deux parties.</span>
              </h2>
              <p
                data-reveal
                data-delay="180"
                style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.7 }}
              >
                La promesse d'une immersion et d'une découverte inédite de Rangiroa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {parts.map((p, i) => (
                <div
                  key={i}
                  className="card-dark p-9"
                  data-reveal="up"
                  data-delay={String(i * 150)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-2xl flex-shrink-0"
                      style={{ backgroundColor: 'rgba(111,79,40,0.22)', border: '1px solid rgba(111,79,40,0.55)', boxShadow: '0 0 14px rgba(111,79,40,0.45)' }}
                    >
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '20px', color: '#C8894A' }}>{p.num}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 800, color: '#C8894A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px', textShadow: '0 0 12px rgba(200,137,74,0.7)' }}>
                        Partie {p.num} · {p.stops}
                      </div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '24px', color: '#C8894A', letterSpacing: '0.04em' }}>{p.title}</h3>
                    </div>
                  </div>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: '20px' }}>
                    {p.desc}
                  </p>
                  <ul className="space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3">
                        <ChevronRight size={14} style={{ color: '#6F4F28', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Stops />
      </main>
      <Footer />
    </div>
  )
}
