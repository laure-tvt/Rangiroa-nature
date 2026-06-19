import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const panels = [
  {
    label: 'Les 6 arrêts',
    tag: 'Le circuit complet',
    desc: "Quai, église, village, plage, récif et passe de Tiputa.",
    to: '/arrets',
  },
  {
    label: 'Les tarifs',
    tag: 'Pick-up & boisson inclus',
    desc: 'À partir de 5 000 XFP par adulte. Sans paiement en ligne.',
    to: '/tarifs',
  },
]

function Panel({ panel, index }: { panel: typeof panels[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={panel.to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '28px 60px',
        textDecoration: 'none',
        borderBottom: index === 0 ? '1px solid rgba(111,79,40,0.15)' : 'none',
        backgroundColor: hovered ? 'rgba(111,79,40,0.06)' : 'transparent',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
      }}
    >
      {/* Left: tag + description */}
      <div style={{ maxWidth: '340px' }}>
        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          borderRadius: '999px',
          border: '1px solid rgba(200,137,74,0.35)',
          backgroundColor: 'rgba(111,79,40,0.12)',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          color: '#C8894A',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          {panel.tag}
        </div>
        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.6,
          margin: 0,
        }}>
          {panel.desc}
        </p>
      </div>

      {/* Right: label + arrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexShrink: 0,
        paddingLeft: '32px',
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(28px, 3.5vw, 46px)',
          fontWeight: 700,
          color: hovered ? '#C8894A' : '#ffffff',
          letterSpacing: '0.04em',
          lineHeight: 1,
          transform: hovered ? 'translateX(-6px)' : 'translateX(0)',
          transition: 'transform 0.35s ease, color 0.3s ease',
        }}>
          {panel.label}
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(200,137,74,0.4)',
          backgroundColor: hovered ? 'rgba(111,79,40,0.3)' : 'rgba(111,79,40,0.08)',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'background-color 0.3s ease, transform 0.35s ease',
          flexShrink: 0,
        }}>
          <ArrowRight size={17} style={{ color: '#C8894A' }} />
        </div>
      </div>
    </Link>
  )
}

export default function StackedPanels() {
  return (
    <div style={{ borderTop: '1px solid rgba(111,79,40,0.18)', borderBottom: '1px solid rgba(111,79,40,0.18)' }}>
      {panels.map((panel, i) => (
        <Panel key={panel.to} panel={panel} index={i} />
      ))}
    </div>
  )
}
