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

  // ── Entrance: each element fades in as user scrolls ──────────
  const fadeIn = (from: number, to: number) =>
    Math.min(1, Math.max(0, (progress - from) / (to - from)))

  const line1In    = fadeIn(0.00, 0.08)   // "6 arrêts,"
  const line2In    = fadeIn(0.08, 0.16)   // "900 ans d'histoire."
  const dividerIn  = fadeIn(0.15, 0.21)   // barre
  const subtitleIn = fadeIn(0.19, 0.26)   // sous-titre

  // ── Exit: tout disparaît ensemble au scroll avancé ───────────
  const exit = Math.max(0, 1 - progress * 3.2)
  const exitY = -progress * 70

  // ── Logo ─────────────────────────────────────────────────────
  const logoOpacity = Math.max(0, Math.min(1, (progress - 0.22) / 0.38))
  const logoScale   = 0.68 + logoOpacity * 0.32

  const overlayOpacity = progress * 0.55

  const slideY = (t: number) => `${(1 - t) * 28}px`

  return (
    <section id="accueil" style={{ height: '200vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Photo background */}
        <img
          src="/hero-plage.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="sync"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            zIndex: 0, pointerEvents: 'none',
          }}
          draggable={false}
        />

        {/* Dark overlay builds on scroll */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundColor: '#000', opacity: overlayOpacity, pointerEvents: 'none',
        }}/>

        {/* Texts — global exit container */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: exit,
          transform: `translateY(${exitY}px)`,
          pointerEvents: exit < 0.05 ? 'none' : 'auto',
        }}>

          {/* "6 arrêts," */}
          <div style={{
            opacity: line1In,
            transform: `translateY(${slideY(line1In)})`,
            transition: 'none',
          }}>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(30px, 5.5vw, 74px)',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              textShadow: '0 2px 32px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.35)',
              display: 'block',
              textAlign: 'center',
              padding: '0 24px',
            }}>
              6 arrêts,
            </span>
          </div>

          {/* "900 ans d'histoire." */}
          <div style={{
            opacity: line2In,
            transform: `translateY(${slideY(line2In)})`,
            transition: 'none',
          }}>
            <span style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(30px, 5.5vw, 74px)',
              fontWeight: 900,
              color: '#dfa45a',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              textShadow: '0 2px 32px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.35)',
              display: 'block',
              textAlign: 'center',
              padding: '0 24px',
            }}>
              900 ans d'histoire.
            </span>
          </div>

          {/* Divider */}
          <div style={{
            opacity: dividerIn,
            transform: `translateY(${slideY(dividerIn)})`,
            transition: 'none',
            width: '52px', height: '2px',
            backgroundColor: 'rgba(223,164,90,0.7)',
            marginTop: '28px',
          }}/>

          {/* Subtitle */}
          <div style={{
            opacity: subtitleIn,
            transform: `translateY(${slideY(subtitleIn)})`,
            transition: 'none',
            marginTop: '18px',
          }}>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(11px, 1.3vw, 15px)',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.85)',
              textAlign: 'center',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textShadow: '0 1px 10px rgba(0,0,0,0.5)',
              margin: 0,
            }}>
              Visite guidée de Rangiroa · 2h30
            </p>
          </div>
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
              width: 'clamp(240px, 38vw, 460px)',
              height: 'auto',
              borderRadius: '50%',
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
            color: 'rgba(255,255,255,0.7)',
          }}>
            Défiler
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" className="hero-bounce">
            <path d="M9 2v14M4 11l5 5 5-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
