import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const panels = [
  {
    label: 'Le circuit',
    tag: 'Le circuit complet',
    to: '/arrets',
  },
  {
    label: 'À propos',
    tag: 'Le guide & le véhicule',
    to: '/a-propos',
  },
  {
    label: 'Les tarifs',
    tag: 'Pick-up & boisson inclus',
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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px 28px',
        textDecoration: 'none',
        borderRight: index < panels.length - 1 ? '1px solid rgba(111,79,40,0.15)' : 'none',
        backgroundColor: hovered ? 'rgba(111,79,40,0.06)' : 'transparent',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        minHeight: '130px',
      }}
    >
      {/* Haut : badge tag */}
      <div style={{
        display: 'inline-block',
        alignSelf: 'flex-start',
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
      }}>
        {panel.tag}
      </div>

      {/* Bas : label + flèche */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(18px, 2.2vw, 30px)',
          fontWeight: 700,
          color: hovered ? '#C8894A' : '#ffffff',
          letterSpacing: '0.04em',
          lineHeight: 1,
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'transform 0.35s ease, color 0.3s ease',
        }}>
          {panel.label}
        </span>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
          border: '1px solid rgba(200,137,74,0.4)',
          backgroundColor: hovered ? 'rgba(111,79,40,0.3)' : 'rgba(111,79,40,0.08)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'background-color 0.3s ease, transform 0.35s ease',
          marginLeft: '12px',
        }}>
          <ArrowRight size={15} style={{ color: '#C8894A' }} />
        </div>
      </div>
    </Link>
  )
}

export default function StackedPanels() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      border: '1.5px solid rgba(255,255,255,0.55)',
      borderRadius: '20px',
      overflow: 'hidden',
      maxWidth: '960px',
      margin: '0 auto',
    }}>
      {panels.map((panel, i) => (
        <Panel key={panel.to} panel={panel} index={i} />
      ))}
    </div>
  )
}
