import { Eye, Armchair, Volume2 } from 'lucide-react'

const vehicleFeatures = [
  {
    icon: Eye,
    title: 'Vitres teintées',
    desc: "Limitent la luminosité environnante et la sensation de chaleur, sans pour autant diminuer la vision.",
  },
  {
    icon: Armchair,
    title: 'Sièges sur mesure',
    desc: "Revêtement supplémentaire en tissu fait sur mesure, pour une assise confortable tout au long de la visite.",
  },
  {
    icon: Volume2,
    title: 'Audio Kicker',
    desc: "Haut-parleurs Kicker et speaker permettant au guide d'être audible même en temps de forte pluie.",
  },
]

export default function About() {
  return (
    <>
      {/* ── Section Guide ─────────────────────────────────── */}
      <section className="px-6" data-reveal="fade" style={{ backgroundColor: '#000000', paddingTop: '120px', paddingBottom: '96px' }}>
        <div className="max-w-4xl mx-auto">
          <div data-reveal className="flex justify-center mb-8">
            <span style={{
              display: 'inline-block', padding: '8px 20px', borderRadius: '999px',
              backgroundColor: '#ffffff', color: '#6F4F28',
              fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              À propos du guide
            </span>
          </div>

          {/* Photo + texte côte à côte */}
          <div
            data-reveal
            data-delay="100"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: '48px',
            }}
          >
            {/* Photo avec halo */}
            <div style={{ flexShrink: 0, position: 'relative', margin: '0 auto' }}>
              {/* Halo ambré derrière la photo */}
              <div style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '28px',
                background: 'radial-gradient(ellipse at center, rgba(200,137,74,0.28) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
              }} />
              <div style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(200,137,74,0.35)',
                boxShadow: '0 0 32px rgba(200,137,74,0.22), 0 0 80px rgba(111,79,40,0.18)',
                width: '220px',
              }}>
                <img
                  src="/guide-laure-eline.jpg"
                  alt="Laure-Eline, guide Tevaiti Van Tours"
                  style={{
                    width: '100%',
                    height: '340px',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'center 55%',
                  }}
                />
              </div>
              <p style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px',
                color: 'rgba(255,255,255,0.30)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginTop: '12px',
              }}>
                Guide Tevaiti Van Tours
              </p>
            </div>

            {/* Texte */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              {[
                "Je m'appelle Laure-Eline et à travers TEVAITI VAN TOURS, je souhaite vous faire découvrir Rangiroa autrement.",
                "Après 10 ans à osciller entre mon île de cœur et ma Bretagne natale, j'ai finalement rejoint mon mari sur l'atoll en 2023. Porté par un héritage familial et mon propre vécu sur Tahiti, j'ai noué années après années, une relation particulière avec la Polynésie.",
                "Des années de passion, de lecture, de discussions et d'échanges, qui m'amènent aujourd'hui à vouloir partager une histoire. Celle d'un peuple, d'une nation, d'une île. L'occasion d'explorer au-delà du lagon, vers une histoire à comprendre et à vivre pleinement.",
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 'clamp(15px, 1.4vw, 17px)',
                    color: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.80)',
                    lineHeight: 1.85,
                    marginBottom: i < 2 ? '28px' : '0',
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Séparateur ─────────────────────────────────────── */}
      <div style={{ height: '1px', backgroundColor: 'rgba(111,79,40,0.18)', maxWidth: '860px', margin: '0 auto' }} />

      {/* ── Section Véhicule ───────────────────────────────── */}
      <section className="px-6" data-reveal="fade" style={{ backgroundColor: '#000000', paddingTop: '96px', paddingBottom: '120px' }}>
        <div className="max-w-4xl mx-auto">
          <div data-reveal className="flex justify-center mb-8">
            <span style={{
              display: 'inline-block', padding: '8px 20px', borderRadius: '999px',
              backgroundColor: '#ffffff', color: '#6F4F28',
              fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Le véhicule
            </span>
          </div>

          <h2
            data-reveal
            data-delay="100"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700, color: '#ffffff',
              lineHeight: 1.1, letterSpacing: '0.04em',
              textAlign: 'center', marginBottom: '16px',
            }}
          >
            Hyundai Staria <span style={{ color: '#6F4F28' }}>· 9 places</span>
          </h2>

          <p
            data-reveal
            data-delay="160"
            style={{
              fontFamily: 'Montserrat, sans-serif', fontSize: '15px',
              color: 'rgba(255,255,255,0.70)', lineHeight: 1.7,
              textAlign: 'center', marginBottom: '56px',
            }}
          >
            Chaque option a été pensée pour maximiser le confort des passagers tout au long de la visite.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {vehicleFeatures.map((f, i) => (
              <div
                key={i}
                className="card-dark p-7"
                data-reveal="up"
                data-delay={String(i * 130)}
              >
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-2xl mb-5"
                  style={{ backgroundColor: 'rgba(111,79,40,0.22)', border: '1px solid rgba(111,79,40,0.55)', boxShadow: '0 0 14px rgba(111,79,40,0.45)' }}
                >
                  <f.icon size={20} style={{ color: '#C8894A' }} />
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 700, color: '#C8894A', letterSpacing: '0.04em', marginBottom: '10px' }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
