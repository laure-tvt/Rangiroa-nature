import { MapPin, Clock, Globe, Tag } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { icon: MapPin, value: '6', label: 'arrêts incontournables', desc: "De l'église d'Avatoru à la passe de Tiputa, chaque arrêt raconte Rangiroa." },
  { icon: Clock, value: '2h30', label: 'de visite guidée', desc: "Pick-up à votre hébergement et boisson fraîche inclus dans la durée." },
  { icon: Globe, value: 'FR / EN', label: 'langues disponibles', desc: "Visite commentée en français et en anglais selon vos préférences." },
  { icon: Tag, value: 'Dès 42€', label: 'par adulte', desc: "5 000 XFP adulte · 2 500 XFP enfant (−11 ans) · Gratuit bébé (−3 ans)." },
]

// Clip-path: premier chevron sans encoche à gauche, suivants avec encoche matchant la pointe droite
const FIRST_PATH = 'polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%)'
const OTHER_PATH = 'polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%, 16% 50%)'

function ChevronSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* 4 grandes formes chevron */}
      <div style={{
        display: 'flex',
        height: 'clamp(110px, 14vw, 168px)',
        margin: '48px 0 0',
        overflow: 'hidden',
      }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: '0 0 28%',
              height: '100%',
              marginLeft: i === 0 ? '0' : '-4.5%',
              backgroundColor: 'rgba(255,255,255,0.18)',
              clipPath: i === 0 ? FIRST_PATH : OTHER_PATH,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>

      {/* Texte qui apparaît après la dernière flèche */}
      <p
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '16px',
          color: 'rgba(255,255,255,0.68)',
          lineHeight: 1.85,
          maxWidth: '580px',
          margin: '44px auto 0',
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          transitionDelay: '900ms',
        }}
      >
        C'est comprendre le cœur de Rangiroa, l'histoire de ses habitants,<br />
        et la richesse d'une culture millénaire.
      </p>
    </div>
  )
}

export default function ValueProp() {
  return (
    <section className="px-6" style={{ backgroundColor: '#0D0D0D', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Statement plein largeur */}
        <div className="text-center mb-24">
          <div data-reveal className="flex justify-center mb-8">
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
              Pourquoi choisir cette visite guidée ?
            </span>
          </div>

          <p
            data-reveal
            data-delay="120"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5.5vw, 70px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}
          >
            Ce n'est pas juste une visite guidée
          </p>

          <ChevronSection />
        </div>

        {/* Séparateur */}
        <div style={{ height: '1px', backgroundColor: 'rgba(111,79,40,0.15)', marginBottom: '80px' }} />

        {/* Layout sticky */}
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: sticky headline */}
          <div className="w-full lg:w-80 lg:flex-shrink-0" style={{ position: 'sticky', top: '90px' }}>
            <h2
              data-reveal
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.04em' }}
            >
              Une immersion<br />authentique<br />
              <span style={{ color: '#6F4F28' }}>au cœur de Rangiroa.</span>
            </h2>
          </div>

          {/* Right: 2×2 grid */}
          <div style={{ flex: 1 }}>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="card-dark p-7 text-center"
                  data-reveal="scale"
                  data-delay={String(i * 120)}
                >
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl mx-auto mb-4"
                    style={{ backgroundColor: 'rgba(111,79,40,0.22)', border: '1px solid rgba(111,79,40,0.55)', boxShadow: '0 0 14px rgba(111,79,40,0.45)' }}
                  >
                    <s.icon size={20} style={{ color: '#C8894A' }} />
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '34px', fontWeight: 700, color: '#C8894A', lineHeight: 1.1, letterSpacing: '0.04em' }}>{s.value}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{s.label}</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.72)', marginTop: '6px', lineHeight: 1.55 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
