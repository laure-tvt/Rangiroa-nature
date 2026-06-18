import { useState, useEffect, useRef } from 'react'

/* ─── Colors ─────────────────────────────────────────────────── */
const CC = 'rgba(255,252,248,0.97)'
const CS = 'rgba(210,185,150,0.3)'

/* ─── SVG Cloud shapes ───────────────────────────────────────── */
const CloudA = () => (
  <svg viewBox="0 0 560 170" className="w-full h-full" style={{ filter: 'drop-shadow(0 18px 28px rgba(180,140,90,0.18))' }}>
    <ellipse cx="280" cy="152" rx="268" ry="28" fill={CS}/>
    <ellipse cx="120" cy="118" rx="105" ry="85" fill={CC}/>
    <ellipse cx="230" cy="90"  rx="125" ry="100" fill={CC}/>
    <ellipse cx="355" cy="85"  rx="120" ry="97"  fill={CC}/>
    <ellipse cx="460" cy="108" rx="98"  ry="75"  fill={CC}/>
    <ellipse cx="520" cy="132" rx="55"  ry="40"  fill={CC}/>
    <ellipse cx="280" cy="145" rx="268" ry="32"  fill={CC}/>
  </svg>
)

const CloudB = () => (
  <svg viewBox="0 0 420 140" className="w-full h-full" style={{ filter: 'drop-shadow(0 14px 22px rgba(180,140,90,0.16))' }}>
    <ellipse cx="210" cy="122" rx="200" ry="24" fill={CS}/>
    <ellipse cx="90"  cy="95"  rx="82"  ry="68" fill={CC}/>
    <ellipse cx="195" cy="75"  rx="105" ry="82" fill={CC}/>
    <ellipse cx="320" cy="88"  rx="90"  ry="70" fill={CC}/>
    <ellipse cx="385" cy="112" rx="48"  ry="36" fill={CC}/>
    <ellipse cx="210" cy="125" rx="200" ry="26" fill={CC}/>
  </svg>
)

const CloudC = () => (
  <svg viewBox="0 0 280 110" className="w-full h-full" style={{ filter: 'drop-shadow(0 10px 16px rgba(180,140,90,0.14))' }}>
    <ellipse cx="140" cy="95"  rx="130" ry="20" fill={CS}/>
    <ellipse cx="60"  cy="72"  rx="55"  ry="48" fill={CC}/>
    <ellipse cx="138" cy="58"  rx="80"  ry="65" fill={CC}/>
    <ellipse cx="220" cy="70"  rx="62"  ry="50" fill={CC}/>
    <ellipse cx="140" cy="95"  rx="130" ry="22" fill={CC}/>
  </svg>
)

const CloudD = () => (
  <svg viewBox="0 0 500 90" className="w-full h-full" style={{ filter: 'drop-shadow(0 8px 14px rgba(180,140,90,0.12))' }}>
    <ellipse cx="250" cy="76"  rx="238" ry="18" fill={CS}/>
    <ellipse cx="80"  cy="58"  rx="72"  ry="44" fill={CC}/>
    <ellipse cx="200" cy="44"  rx="120" ry="52" fill={CC}/>
    <ellipse cx="350" cy="52"  rx="100" ry="45" fill={CC}/>
    <ellipse cx="455" cy="64"  rx="58"  ry="34" fill={CC}/>
    <ellipse cx="250" cy="76"  rx="238" ry="20" fill={CC}/>
  </svg>
)

const CloudE = () => (
  <svg viewBox="0 0 200 85" className="w-full h-full" style={{ filter: 'drop-shadow(0 8px 12px rgba(180,140,90,0.12))' }}>
    <ellipse cx="100" cy="72"  rx="92"  ry="16" fill={CS}/>
    <ellipse cx="42"  cy="55"  rx="38"  ry="35" fill={CC}/>
    <ellipse cx="100" cy="42"  rx="58"  ry="50" fill={CC}/>
    <ellipse cx="160" cy="52"  rx="42"  ry="34" fill={CC}/>
    <ellipse cx="100" cy="72"  rx="92"  ry="18" fill={CC}/>
  </svg>
)

/* ─── Cloud layer component ──────────────────────────────────── */
interface StripCloud { x: number; y: number; width: number; type: 'A'|'B'|'C'|'D'|'E' }

const SHAPES: Record<string, React.FC> = { A: CloudA, B: CloudB, C: CloudC, D: CloudD, E: CloudE }

function CloudLayer({ clouds, duration, direction, parallaxY, opacity = 1 }: {
  clouds: StripCloud[]
  duration: number
  direction: 'left'|'right'
  parallaxY: number
  opacity?: number
}) {
  // double the set for seamless loop
  const doubled = [
    ...clouds,
    ...clouds.map(c => ({ ...c, x: c.x + 100 })),
  ]

  return (
    <div
      className={direction === 'left' ? 'cloud-drift-left' : 'cloud-drift-right'}
      style={{
        position: 'absolute',
        inset: 0,
        width: '200%',
        animationDuration: `${duration}s`,
        transform: `translateY(${parallaxY}px)`,
        willChange: 'transform',
        opacity,
      }}
    >
      {doubled.map((c, i) => {
        const Comp = SHAPES[c.type]
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${c.x / 2}%`,
              top: `${c.y}%`,
              width: `${c.width}px`,
              height: `${Math.round(c.width * 0.35)}px`,
            }}
          >
            <Comp />
          </div>
        )
      })}
    </div>
  )
}

/* ─── Cloud definitions ────────────────────────────────────────── */
const BG_CLOUDS: StripCloud[] = [
  { x: 4,  y: 5,  width: 240, type: 'E' },
  { x: 22, y: 11, width: 200, type: 'C' },
  { x: 40, y: 4,  width: 255, type: 'E' },
  { x: 57, y: 9,  width: 210, type: 'C' },
  { x: 74, y: 6,  width: 230, type: 'E' },
  { x: 88, y: 13, width: 195, type: 'C' },
]

const MID_CLOUDS: StripCloud[] = [
  { x: 2,  y: 22, width: 380, type: 'D' },
  { x: 24, y: 28, width: 420, type: 'B' },
  { x: 48, y: 20, width: 360, type: 'D' },
  { x: 70, y: 30, width: 400, type: 'B' },
  { x: 90, y: 25, width: 350, type: 'D' },
]

const FG_CLOUDS: StripCloud[] = [
  { x: 0,  y: 42, width: 580, type: 'A' },
  { x: 28, y: 48, width: 540, type: 'A' },
  { x: 56, y: 44, width: 560, type: 'A' },
  { x: 82, y: 50, width: 500, type: 'B' },
]

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const vhRef = useRef(typeof window !== 'undefined' ? window.innerHeight : 700)

  useEffect(() => {
    vhRef.current = window.innerHeight
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const progress    = Math.min(1, Math.max(0, scrollY / vhRef.current))

  const titleOpacity = Math.max(0, 1 - progress * 3.2)
  const titleY       = -progress * 70

  const logoOpacity  = Math.max(0, Math.min(1, (progress - 0.22) / 0.38))
  const logoScale    = 0.68 + logoOpacity * 0.32

  const py1 = -scrollY * 0.08
  const py2 = -scrollY * 0.20
  const py3 = -scrollY * 0.38

  const skyDarken = progress * 0.78

  return (
    <section id="accueil" style={{ height: '200vh', position: 'relative' }}>
      {/* ── Sticky sky viewport ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Sky gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `linear-gradient(
            180deg,
            #0d0500 0%,
            #2a1508 4%,
            #6F4F28 14%,
            #a8712e 26%,
            #c99040 38%,
            #dfb86a 52%,
            #edd8a8 68%,
            #f5eacf 82%,
            #fdf7ec 92%,
            #fffcf7 100%
          )`,
        }}/>

        {/* Dark overlay builds on scroll */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          backgroundColor: '#000000',
          opacity: skyDarken,
          pointerEvents: 'none',
        }}/>

        {/* Cloud layer 1 — background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <CloudLayer clouds={BG_CLOUDS} duration={90} direction="left"  parallaxY={py1} opacity={0.72}/>
        </div>

        {/* Cloud layer 2 — midground */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
          <CloudLayer clouds={MID_CLOUDS} duration={58} direction="right" parallaxY={py2} opacity={0.9}/>
        </div>

        {/* Title — fades out on scroll */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          pointerEvents: titleOpacity < 0.05 ? 'none' : 'auto',
        }}>
          <h1 style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(30px, 5.5vw, 74px)',
            fontWeight: 900,
            color: '#2a1508',
            textAlign: 'center',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            textShadow: '0 2px 32px rgba(255,240,210,0.9), 0 4px 10px rgba(255,240,210,0.6)',
            padding: '0 24px',
            maxWidth: '820px',
          }}>
            6 arrêts,<br />
            <span style={{ color: '#6F4F28' }}>900 ans d'histoire.</span>
          </h1>
          <div style={{ width: '52px', height: '2px', backgroundColor: 'rgba(111,79,40,0.5)', marginTop: '28px' }}/>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(11px, 1.3vw, 15px)',
            fontWeight: 600,
            color: 'rgba(42,21,8,0.6)',
            marginTop: '18px',
            textAlign: 'center',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textShadow: '0 1px 8px rgba(255,240,210,0.8)',
          }}>
            Rangiroa · Polynésie française
          </p>
        </div>

        {/* Cloud layer 3 — foreground (in front of title) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 4 }}>
          <CloudLayer clouds={FG_CLOUDS} duration={38} direction="left"  parallaxY={py3} opacity={1}/>
        </div>

        {/* Logo — appears as title fades */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          pointerEvents: logoOpacity < 0.05 ? 'none' : 'auto',
        }}>
          <img
            src="/logo-tvt.jpg"
            alt="Tevaiti Van Tours Rangiroa"
            style={{
              width: 'clamp(180px, 30vw, 360px)',
              height: 'auto',
              mixBlendMode: 'multiply',
              userSelect: 'none',
            } as React.CSSProperties}
            draggable={false}
          />
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 7,
          opacity: Math.max(0, 1 - progress * 6),
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}>
          <span style={{
            fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(42,21,8,0.5)',
          }}>
            Défiler
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" className="hero-bounce">
            <path d="M9 2v14M4 11l5 5 5-5" stroke="rgba(42,21,8,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
