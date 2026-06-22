import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const stops = [
  {
    num: '01',
    name: "Le quai d'AVATORU",
    desc: "Point de départ du circuit. L'arrivée des premiers Polynésiens sur l'atoll de Rangiroa et les origines du peuplement des Tuamotu.",
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
    desc: "Exploration du village et du peuplement ancestral des Tuamotu. L'histoire vivante de l'atoll.",
    theme: 'Village historique',
    img: '/stop-03-village.jpg',
  },
  {
    num: '04',
    name: 'La plage publique',
    desc: "Panorama sur le lagon turquoise. Histoire des guerres avec les Parata et de l'exil de la population de Rangiroa sur Tahiti.",
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
    desc: "La mythique passe où nagent les dauphins. Légendes locales et récits de l'archipel des Tuamotu.",
    theme: 'Légendes & guerres',
    img: null,
  },
]

type Stop = typeof stops[0]

const CARD_DURATION = 500
const STEP_INTERVAL = 600

function StopCard({ s, visible }: { s: Stop; visible: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const hasPhoto = !!s.img

  return (
    <div
      onClick={() => hasPhoto && setFlipped(f => !f)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity ${CARD_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${CARD_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        perspective: '1000px',
        height: '280px',
        cursor: hasPhoto ? 'pointer' : 'default',
      }}
    >
      {/* Élément qui tourne */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>

        {/* RECTO — texte */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          backgroundColor: '#111111',
          border: '1px solid rgba(111,79,40,0.12)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px',
          overflow: 'hidden',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  backgroundColor: 'rgba(111,79,40,0.22)', border: '1px solid rgba(111,79,40,0.55)',
                  boxShadow: '0 0 14px rgba(111,79,40,0.45)',
                }}
              >
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '15px', color: '#C8894A' }}>
                  {s.num}
                </span>
              </div>
              <span style={{
                padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, flexShrink: 0,
                backgroundColor: 'rgba(111,79,40,0.12)', color: '#6F4F28', border: '1px solid rgba(111,79,40,0.3)',
                fontFamily: 'Montserrat, sans-serif',
              }}>
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

          {hasPhoto && (
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: 'rgba(200,137,74,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '12px' }}>
              Appuyer pour voir la photo →
            </p>
          )}
        </div>

        {/* VERSO — photo */}
        {hasPhoto && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(111,79,40,0.25)',
          }}>
            <img
              src={s.img!}
              alt={s.name}
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
            {/* Gradient + nom en bas */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '20px 24px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0, letterSpacing: '0.04em' }}>
                {s.name}
              </p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                Appuyer pour retourner
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Stops() {
  const [revealedCount, setRevealedCount] = useState(0)
  const [buttonVisible, setButtonVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const timers: ReturnType<typeof setTimeout>[] = []

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        stops.forEach((_, i) => {
          const t = setTimeout(() => setRevealedCount(i + 1), 300 + i * STEP_INTERVAL)
          timers.push(t)
        })
        const btnTimer = setTimeout(() => setButtonVisible(true), 300 + 5 * STEP_INTERVAL + CARD_DURATION + 200)
        timers.push(btnTimer)
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
    <section className="px-6" data-reveal="fade" style={{ backgroundColor: '#000000', paddingTop: '60px', paddingBottom: '96px' }}>
      <div className="max-w-7xl mx-auto">

        <div className="mb-12 text-center">
          <div data-reveal className="flex justify-center mb-4">
            <span style={{
              display: 'inline-block', padding: '8px 20px', borderRadius: '999px',
              backgroundColor: '#ffffff', color: '#6F4F28',
              fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Le circuit
            </span>
          </div>
          <h1
            data-reveal
            data-delay="100"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1, letterSpacing: '0.05em', marginBottom: '16px', textAlign: 'center' }}
          >
            6 arrêts,<br /><span style={{ color: '#6F4F28' }}>900 ans d'histoire.</span>
          </h1>
          <p
            data-reveal
            data-delay="180"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.7, textAlign: 'center' }}
          >
            Cliquez sur une carte pour découvrir la photo de l'arrêt.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stops.map((s, idx) => (
            <StopCard key={s.num} s={s} visible={idx < revealedCount} />
          ))}
        </div>

        <div style={{
          marginTop: '48px',
          textAlign: 'center',
          opacity: buttonVisible ? 1 : 0,
          transform: buttonVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}>
          <Link
            to="/#contact"
            onClick={() => setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="btn-primary px-10 py-4 text-base font-bold"
            style={{ textDecoration: 'none', borderRadius: '50px' }}
          >
            Réserver ma visite guidée
          </Link>
        </div>

      </div>
    </section>
  )
}
