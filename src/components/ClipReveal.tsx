import { useEffect, useRef } from 'react'

export default function ClipReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'scale(1)'
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const clipStyle: React.CSSProperties = {
    backgroundImage: "url('/hero-bg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
    display: 'block',
    lineHeight: 0.88,
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(56px, 11vw, 160px)',
  }

  return (
    <section
      style={{ backgroundColor: '#000', height: '100vh' }}
      className="flex items-center justify-center overflow-hidden"
    >
      <div
        ref={sectionRef}
        className="text-center"
        style={{
          opacity: 0,
          transform: 'scale(0.95)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* TEVAITI */}
        <span
          className="clip-brand-fixed"
          style={{
            ...clipStyle,
            letterSpacing: '0.12em',
          }}
        >
          TEVAITI
        </span>

        {/* VAN TOURS */}
        <span
          className="clip-brand-fixed"
          style={{
            ...clipStyle,
            letterSpacing: '0.04em',
          }}
        >
          VAN TOURS
        </span>

        {/* Subtitle */}
        <p
          style={{
            marginTop: '2rem',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Visite Guidée · Polynésie Française
        </p>
      </div>
    </section>
  )
}
