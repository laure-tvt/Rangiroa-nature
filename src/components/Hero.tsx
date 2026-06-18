import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const vhRef   = useRef(typeof window !== 'undefined' ? window.innerHeight : 700)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    vhRef.current = window.innerHeight
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Force play as soon as possible — required on some mobile browsers
    const vid = videoRef.current
    if (vid) {
      vid.play().catch(() => {
        // Retry once on first user interaction if autoplay was blocked
        const resume = () => { vid.play(); document.removeEventListener('touchstart', resume); document.removeEventListener('click', resume) }
        document.addEventListener('touchstart', resume, { once: true })
        document.addEventListener('click', resume, { once: true })
      })
    }

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const progress = Math.min(1, Math.max(0, scrollY / vhRef.current))

  const titleOpacity = Math.max(0, 1 - progress * 3.2)
  const titleY       = -progress * 70

  const logoOpacity = Math.max(0, Math.min(1, (progress - 0.22) / 0.38))
  const logoScale   = 0.68 + logoOpacity * 0.32

  const overlayOpacity = progress * 0.55

  // Video drifts downward as user scrolls (parallax)
  const videoY = scrollY * 0.4

  return (
    <section id="accueil" style={{ height: '200vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Video background — starts above viewport, drifts down on scroll */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          style={{
            position: 'absolute',
            top: '-18%',
            left: 0,
            width: '100%',
            height: '136%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            transform: `translateY(${videoY}px)`,
            willChange: 'transform',
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay builds on scroll */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundColor: '#000000',
          opacity: overlayOpacity,
          pointerEvents: 'none',
        }}/>

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
            color: '#ffffff',
            textAlign: 'center',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            textShadow: '0 2px 32px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.35)',
            padding: '0 24px',
            maxWidth: '820px',
          }}>
            6 arrêts,<br />
            <span style={{ color: '#dfa45a' }}>900 ans d'histoire.</span>
          </h1>
          <div style={{ width: '52px', height: '2px', backgroundColor: 'rgba(223,164,90,0.7)', marginTop: '28px' }}/>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(11px, 1.3vw, 15px)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            marginTop: '18px',
            textAlign: 'center',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textShadow: '0 1px 10px rgba(0,0,0,0.5)',
          }}>
            Visite guidée de Rangiroa · 2h30
          </p>
        </div>

        {/* Logo — circular, appears as title fades */}
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
