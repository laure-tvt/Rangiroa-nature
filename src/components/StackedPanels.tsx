import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const panels = [
  {
    label: 'Les 6 arrêts',
    tag: 'Le circuit complet',
    desc: "Quai, église, village, plage, récif et passe de Tiputa — chaque arrêt raconte 900 ans d'histoire.",
    to: '/arrets',
    img: '/stop-04-plage.jpg',
  },
  {
    label: 'Les tarifs',
    tag: 'Pick-up & boisson inclus',
    desc: 'À partir de 5 000 XFP par adulte. Confirmé par WhatsApp, sans paiement en ligne.',
    to: '/tarifs',
    img: '/stop-05-platier.jpg',
  },
]

function Panel({ panel, index }: { panel: typeof panels[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  return (
    <Link
      ref={ref}
      to={panel.to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '42vh',
        padding: '48px 60px',
        textDecoration: 'none',
        borderBottom: index === 0 ? '1px solid rgba(111,79,40,0.2)' : 'none',
        cursor: 'pointer',
      }}
    >
      {/* Photo background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${panel.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: hovered ? 'rgba(0,0,0,0.62)' : 'rgba(0,0,0,0.72)',
          transition: 'background-color 0.6s ease',
        }}
      />
      {/* Left: tag + description */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '360px' }}>
        <div style={{
          display: 'inline-block',
          padding: '5px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(200,137,74,0.45)',
          backgroundColor: 'rgba(111,79,40,0.15)',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          color: '#C8894A',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          {panel.tag}
        </div>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.80)',
          lineHeight: 1.7,
        }}>
          {panel.desc}
        </p>
      </div>

      {/* Right: large label + arrow */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexShrink: 0,
        paddingLeft: '40px',
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '0.04em',
          lineHeight: 1,
          transform: hovered ? 'translateX(-8px)' : 'translateX(0)',
          transition: 'transform 0.4s ease, color 0.3s ease',
          ...(hovered ? { color: '#C8894A' } : {}),
        }}>
          {panel.label}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '1px solid rgba(200,137,74,0.5)',
          backgroundColor: hovered ? 'rgba(111,79,40,0.35)' : 'rgba(111,79,40,0.12)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.35s ease',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          flexShrink: 0,
        }}>
          <ArrowRight size={20} style={{ color: '#C8894A' }} />
        </div>
      </div>
    </Link>
  )
}

export default function StackedPanels() {
  return (
    <div style={{ borderTop: '1px solid rgba(111,79,40,0.2)', borderBottom: '1px solid rgba(111,79,40,0.2)' }}>
      {panels.map((panel, i) => (
        <Panel key={panel.to} panel={panel} index={i} />
      ))}
    </div>
  )
}
