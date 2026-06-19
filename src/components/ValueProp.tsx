import { MapPin, Clock, Globe, Tag } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const stats = [
  { icon: MapPin, value: '6', label: 'arrêts incontournables', desc: "De l'église d'Avatoru à la passe de Tiputa, chaque arrêt raconte Rangiroa." },
  { icon: Clock, value: '2h30', label: 'de visite guidée', desc: "Pick-up à votre hébergement et boisson fraîche inclus dans la durée." },
  { icon: Globe, value: 'FR / EN', label: 'langues disponibles', desc: "Visite commentée en français et en anglais selon vos préférences." },
  { icon: Tag, value: 'Dès 42€', label: 'par adulte', desc: "5 000 XFP adulte · 2 500 XFP enfant (−11 ans) · Gratuit bébé (−3 ans)." },
]

// Toutes les 4 flèches identiques : V-encoche gauche + pointe droite
const CHEVRON = 'polygon(0 0, 78% 0, 100% 50%, 78% 100%, 0 100%, 22% 50%)'

function ChevronSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* 4 flèches identiques, fines, centrées */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          height: 'clamp(80px, 9vw, 120px)',
          marginTop: '48px',
          maxWidth: '820px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: '100%',
              backgroundColor: 'rgba(255,255,255,0.78)',
              clipPath: CHEVRON,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-60px)',
              transition: 'opacity 0.75s ease, transform 0.75s ease',
              transitionDelay: `${i * 320}ms`,
            }}
          />
        ))}
      </div>

      {/* Halo doux + texte apparu après la 4e flèche */}
      <div
        style={{
          position: 'relative',
          maxWidth: '620px',
          margin: '48px auto 0',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          transitionDelay: '1300ms',
        }}
      >
        {/* Halo radial ambré derrière le texte */}
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '180%', height: '500%',
          background: 'radial-gradient(ellipse at center, rgba(200,137,74,0.20) 0%, transparent 58%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        <p
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(14px, 1.4vw, 17px)',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.9,
            textAlign: 'center',
            margin: 0,
          }}
        >
          C'est comprendre le cœur de Rangiroa, l'histoire de ses habitants,<br />
          et la richesse d'une culture millénaire.
        </p>
      </div>
    </div>
  )
}

export default function ValueProp() {
  return (
    <section className="px-6" data-reveal="fade" style={{ backgroundColor: '#0D0D0D', paddingTop: '96px', paddingBottom: '96px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Statement plein largeur */}
        <div className="text-center mb-0">
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
        <div style={{ height: '1px', backgroundColor: 'rgba(111,79,40,0.15)', margin: '80px 0' }} />

        <div>
          <h2
            data-reveal
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 4.2vw, 54px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, letterSpacing: '0.04em', marginBottom: '40px' }}
          >
            Une immersion authentique —{' '}
            <span style={{ color: '#6F4F28' }}>au cœur de Rangiroa.</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <div
                key={i}
                className="card-dark p-6 text-center"
                data-reveal="scale"
                data-delay={String(i * 120)}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-xl mx-auto mb-3"
                  style={{ backgroundColor: 'rgba(111,79,40,0.22)', border: '1px solid rgba(111,79,40,0.55)', boxShadow: '0 0 10px rgba(111,79,40,0.45)' }}
                >
                  <s.icon size={16} style={{ color: '#C8894A' }} />
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 700, color: '#C8894A', lineHeight: 1.1, letterSpacing: '0.04em' }}>{s.value}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{s.label}</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', fontWeight: 400, color: '#ffffff', marginTop: '6px', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
