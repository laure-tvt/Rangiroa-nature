import { useEffect, useRef, useState } from 'react'
import { TrendingUp, Shield, Clock, Award } from 'lucide-react'

const stats = [
  { icon: TrendingUp, value: '20 ans', label: "d'expertise locale", desc: "Une équipe implantée en Polynésie depuis 2004" },
  { icon: Shield, value: '100%', label: 'sécurisé', desc: "Transactions vérifiées, agents certifiés" },
  { icon: Clock, value: '48h', label: 'délai de réponse', desc: "Un conseiller vous rappelle sous 48h max" },
  { icon: Award, value: '#1', label: 'portail immo', desc: "Premier portail immobilier de Polynésie" },
]

export default function ValueProp() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 px-6" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label justify-center mx-auto">
            Pourquoi FIND Polynésie
          </div>
          <h2 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(26px, 3.5vw, 42px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
          }}>
            L'immobilier en Polynésie,{' '}
            <span style={{ color: '#6F4F28' }}>simplifié.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="card-dark p-7 text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.5s ease ${i * 120}ms, transform 0.5s ease ${i * 120}ms`,
              }}
            >
              <div
                className="flex items-center justify-center w-11 h-11 rounded-xl mx-auto mb-4"
                style={{ backgroundColor: 'rgba(111,79,40,0.1)', border: '1px solid rgba(111,79,40,0.25)' }}
              >
                <s.icon size={20} style={{ color: '#6F4F28' }} />
              </div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: 800, color: '#6F4F28', lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>{s.label}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '6px', lineHeight: 1.55 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
