import { ChevronRight } from 'lucide-react'
import WordReveal from './WordReveal'
import StackedPanels from './StackedPanels'

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

export default function Tours() {
  return (
    <section id="circuit" className="py-24" style={{ backgroundColor: '#000000' }}>
      <div id="visite" style={{ position: 'relative', top: '-80px' }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start mb-16">

          {/* Left: sticky headline */}
          <div className="w-full lg:w-80 lg:flex-shrink-0" style={{ position: 'sticky', top: '90px' }}>
            <div data-reveal className="flex mb-6">
              <span style={{
                display: 'inline-block',
                padding: '8px 20px',
                borderRadius: '999px',
                backgroundColor: '#ffffff',
                color: '#6F4F28',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
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
            <WordReveal
              delay={180}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.7 }}
            >
              La promesse d'une immersion et d'une découverte inédite de Rangiroa.
            </WordReveal>
          </div>

          {/* Right: 2 part cards stacked */}
          <div style={{ flex: 1 }}>
            <div className="flex flex-col gap-7">
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

        </div>
      </div>

      {/* Stacked navigation panels — full width */}
      <StackedPanels />
    </section>
  )
}
