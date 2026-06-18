import { useEffect, useRef, useState } from 'react'

const phrases = [
  'Pas un groupe de 40. Un guide. Une île.',
  'Pas des photos Instagram. Des histoires à emporter.',
  'Pas du temps. De la compréhension.',
]

export default function ValueProp() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [strikeActive, setStrikeActive] = useState(false)
  const [phrasesActive, setPhrasesActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStrikeActive(true)
          setTimeout(() => setPhrasesActive(true), 900)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="comprendre"
      ref={sectionRef}
      className="py-28 px-6"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Label */}
        <div
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium tracking-widest uppercase"
          style={{ color: '#8B6B42', fontFamily: 'Montserrat, sans-serif' }}
        >
          <span className="w-8 h-px" style={{ backgroundColor: '#8B6B42' }} />
          La visite
          <span className="w-8 h-px" style={{ backgroundColor: '#8B6B42' }} />
        </div>

        {/* Section title */}
        <h2
          className="mb-16"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(22px, 3.5vw, 42px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.25,
            letterSpacing: '0.03em',
          }}
        >
          Comprendre Rangiroa<br />
          pour la visiter réellement
        </h2>

        {/* Big statement with strikethrough on "générique" */}
        <div
          className="mb-16"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(22px, 4.5vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#ffffff',
          }}
        >
          Tourisme{' '}
          <span className="relative inline-block">
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>générique</span>

            {/* SVG stroke-dashoffset strikethrough */}
            <svg
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '-3%',
                width: '106%',
                height: '4px',
                transform: 'translateY(-50%)',
                overflow: 'visible',
              }}
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="0.5"
                x2="100"
                y2="0.5"
                stroke="#00ffff"
                vectorEffect="non-scaling-stroke"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="110"
                strokeDashoffset={strikeActive ? 0 : 110}
                style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
              />
            </svg>
          </span>
          .{' '}
          <span style={{ color: '#8B6B42' }}>Rangiroa</span> mérite mieux.
        </div>

        {/* 3 contrast phrases with fade-in + slide-up */}
        <div className="space-y-5 max-w-2xl mx-auto">
          {phrases.map((phrase, i) => (
            <p
              key={i}
              style={{
                opacity: phrasesActive ? 1 : 0,
                transform: phrasesActive ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s ease ${i * 220}ms, transform 0.6s ease ${i * 220}ms`,
                fontSize: 'clamp(15px, 2vw, 18px)',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                lineHeight: 1.65,
              }}
            >
              {phrase}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
