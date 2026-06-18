import { MapPin, Clock, Globe, Tag } from 'lucide-react'

const stats = [
  { icon: MapPin, value: '6', label: 'arrêts incontournables', desc: "De l'église d'Avatoru à la passe de Tiputa, chaque arrêt raconte Rangiroa." },
  { icon: Clock, value: '2h30', label: 'de visite guidée', desc: "Pick-up à votre hébergement et boisson fraîche inclus dans la durée." },
  { icon: Globe, value: 'FR / EN', label: 'langues disponibles', desc: "Visite commentée en français et en anglais selon vos préférences." },
  { icon: Tag, value: 'Dès 42€', label: 'par adulte', desc: "5 000 XFP adulte · 2 500 XFP enfant (−11 ans) · Gratuit bébé (−3 ans)." },
]

export default function ValueProp() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">

          {/* Label en forme de bouton/badge */}
          <div data-reveal className="flex justify-center mb-4">
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

          <h2
            data-reveal
            data-delay="100"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15 }}
          >
            Une immersion authentique<br />
            <span style={{ color: '#6F4F28' }}>au cœur de Rangiroa.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: 800, color: '#6F4F28', lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>{s.label}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.72)', marginTop: '6px', lineHeight: 1.55 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
