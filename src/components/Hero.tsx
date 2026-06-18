import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const vhRef = useRef(typeof window !== 'undefined' ? window.innerHeight : 700)

  useEffect(() => {
    vhRef.current = window.innerHeight
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const progress = Math.min(1, Math.max(0, scrollY / vhRef.current))

  const titleOpacity = Math.max(0, 1 - progress * 3.2)
  const titleY       = -progress * 70

  const logoOpacity = Math.max(0, Math.min(1, (progress - 0.22) / 0.38))
  const logoScale   = 0.68 + logoOpacity * 0.32

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

        {/* Cloud 1 — background, top 15% */}
        <img
          src="/cloud-1.svg"
          alt=""
          aria-hidden="true"
          className="cloud-float-50"
          style={{
            position: 'absolute',
            top: '15%',
            left: 0,
            width: '45vw',
            zIndex: 1,
            opacity: 0.65,
            animationDelay: '-12s',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />

        {/* Cloud 2 — background, top 22% */}
        <img
          src="/cloud-3.svg"
          alt=""
          aria-hidden="true"
          className="cloud-float-48"
          style={{
            position: 'absolute',
            top: '22%',
            left: 0,
            width: '38vw',
            zIndex: 1,
            opacity: 0.50,
            animationDelay: '-28s',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />

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

        {/* Cloud 3 — foreground, top 35% */}
        <img
          src="/cloud-2.svg"
          alt=""
          aria-hidden="true"
          className="cloud-float-55"
          style={{
            position: 'absolute',
            top: '35%',
            left: 0,
            width: '52vw',
            zIndex: 4,
            opacity: 0.45,
            animationDelay: '-5s',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />

        {/* Cloud 4 — foreground, top 55% */}
        <img
          src="/cloud-4.svg"
          alt=""
          aria-hidden="true"
          className="cloud-float-60"
          style={{
            position: 'absolute',
            top: '55%',
            left: 0,
            width: '32vw',
            zIndex: 4,
            opacity: 0.30,
            animationDelay: '-40s',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          draggable={false}
        />

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
