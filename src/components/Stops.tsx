import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const stops = [
  {
    num: '01',
    name: "Le quai d'AVATORU",
    desc: "Point de départ sur le lagon de Rangiroa. Découverte de la vie maritime de l'atoll et de son histoire portuaire.",
    theme: 'Peuplement',
    img: '/stop-01-quai.jpg',
  },
  {
    num: '02',
    name: "L'église d'AVATORU",
    desc: "L'arrivée du christianisme et son empreinte profonde sur la culture, l'architecture et les traditions polynésiennes.",
    theme: 'Chrétienté',
    img: '/stop-02-eglise.jpg',
  },
  {
    num: '03',
    name: "Le village d'AVATORU",
    desc: "Exploration de l'ancien village et du peuplement ancestral des Tuamotu. L'histoire vivante de l'atoll.",
    theme: 'Village historique',
    img: '/stop-03-village.jpg',
  },
  {
    num: '04',
    name: 'La plage publique',
    desc: 'Panorama sur le lagon turquoise, les motu et la faune marine. La beauté brute de Rangiroa à portée de regard.',
    theme: 'Lagon & nature',
    img: '/stop-04-plage.jpg',
  },
  {
    num: '05',
    name: 'Le platier de récif',
    desc: "Face à l'hôtel Le Kiaora. La barrière corallienne, sa protection millénaire et la formation d'un atoll expliquées.",
    theme: 'Récif corallien',
    img: '/stop-05-platier.jpg',
  },
  {
    num: '06',
    name: 'La passe de TIPUTA',
    desc: "La mythique passe où nagent les dauphins. Histoires de guerres ancestrales et légendes locales de l'archipel.",
    theme: 'Légendes & guerres',
    img: null,
  },
]

type Stop = typeof stops[0]

// Durée totale d'une carte : 500ms card + 100ms délai photo + 600ms photo = 700ms
// Chaque carte démarre exactement quand la précédente est terminée
const CARD_DURATION = 500
const PHOTO_DELAY  = 100
const PHOTO_DURATION = 600
const STEP_INTERVAL = CARD_DURATION + PHOTO_DELAY + PHOTO_DURATION // 700ms

function StopCard({ s, visible }: { s: Stop; visible: boolean }) {
  return (
    <div
      className="card-dark overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity ${CARD_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${CARD_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {s.img && (
        <div style={{ height: '190px', overflow: 'hidden', flexShrink: 0 }}>
          <img
            src={s.img}
            alt={s.name}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '190px',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(90px)',
              transition: `opacity ${PHOTO_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${PHOTO_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              transitionDelay: visible ? `${PHOTO_DELAY}ms` : '0ms',
            }}
          />
        </div>
      )}
      <div className="p-7">
        <div className="flex items-center justify-between mb-5">
          <div
            className="flex items-center justify-center w-11 h-11 rounded-2xl flex-shrink-0"
            style={{ backgroundColor: 'rgba(111,79,40,0.22)', border: '1px solid rgba(111,79,40,0.55)', boxShadow: '0 0 14px rgba(111,79,40,0.45)' }}
          >
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '15px', color: '#C8894A' }}>
              {s.num}
            </span>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: 'rgba(111,79,40,0.12)', color: '#6F4F28', border: '1px solid rgba(111,79,40,0.3)', flexShrink: 0 }}
          >
            {s.theme}
          </span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '20px', color: '#C8894A', lineHeight: 1.2, letterSpacing: '0.04em', marginBottom: '10px' }}>
          {s.name}
        </h3>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
          {s.desc}
        </p>
      </div>
    </div>
  )
}

export default function Stops() {
  const [revealedCount, setRevealedCount] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const timers: ReturnType<typeof setTimeout>[] = []

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        // Chaque carte démarre exactement quand la précédente est terminée
        stops.forEach((_, i) => {
          const t = setTimeout(
            () => setRevealedCount(i + 1),
            300 + i * STEP_INTERVAL
          )
          timers.push(t)
        })
      },
      { threshold: 0.05 }
    )
    obs.observe(el)

    return () => {
      obs.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <section className="px-6" data-reveal="fade" style={{ backgroundColor: '#000000', paddingTop: '120px', paddingBottom: '96px' }}>
      <div className="max-w-7xl mx-auto">

        {/* Headline */}
        <div className="mb-12">
          <div data-reveal className="flex mb-4">
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
          <h1
            data-reveal
            data-delay="100"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.05em', marginBottom: '16px' }}
          >
            6 arrêts,<br /><span style={{ color: '#6F4F28' }}>900 ans d'histoire.</span>
          </h1>
          <p
            data-reveal
            data-delay="180"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.7, marginBottom: '32px' }}
          >
            Découverte de l'atoll en 6 arrêts soigneusement choisis pour vous faire vivre Rangiroa sous toutes ses facettes.
          </p>
          <div className="flex flex-wrap gap-3" data-reveal data-delay="260">
            <Link
              to="/#contact"
              onClick={() => setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
              className="btn-primary px-8 py-3 text-sm"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              Réserver maintenant
            </Link>
            <Link
              to="/tarifs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 28px',
                borderRadius: '50px',
                border: '1px solid rgba(111,79,40,0.4)',
                backgroundColor: 'transparent',
                color: 'rgba(255,255,255,0.80)',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Voir les tarifs
            </Link>
          </div>
        </div>

        {/* 6 stop cards — révélation strictement séquentielle 1 → 6 */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stops.map((s, idx) => (
            <StopCard key={s.num} s={s} visible={idx < revealedCount} />
          ))}
        </div>

      </div>
    </section>
  )
}
