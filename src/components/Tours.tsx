const stops = [
  {
    num: '01',
    name: 'Le quai d\'AVATORU',
    desc: 'Point de départ sur le lagon de Rangiroa. Découverte de la vie maritime de l\'atoll et de son histoire portuaire.',
    theme: 'Peuplement',
  },
  {
    num: '02',
    name: 'L\'église d\'AVATORU',
    desc: 'L\'arrivée du christianisme et son empreinte profonde sur la culture, l\'architecture et les traditions polynésiennes.',
    theme: 'Chrétienté',
  },
  {
    num: '03',
    name: 'Le village d\'AVATORU',
    desc: 'Exploration de l\'ancien village et du peuplement ancestral des Tuamotu. L\'histoire vivante de l\'atoll.',
    theme: 'Village historique',
  },
  {
    num: '04',
    name: 'La plage publique',
    desc: 'Panorama sur le lagon turquoise, les motu et la faune marine. La beauté brute de Rangiroa à portée de regard.',
    theme: 'Lagon & nature',
  },
  {
    num: '05',
    name: 'Le platier de récif',
    desc: 'Face à l\'hôtel Le Kiaora. La barrière corallienne, sa protection millénaire et la formation d\'un atoll expliquées.',
    theme: 'Récif corallien',
  },
  {
    num: '06',
    name: 'La passe de TIPUTA',
    desc: 'La mythique passe où nagent les dauphins. Histoires de guerres ancestrales et légendes locales de l\'archipel.',
    theme: 'Légendes & guerres',
  },
]

export default function Tours() {
  return (
    <section id="arrets" className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <div data-reveal className="flex justify-center mb-4">
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

          <div data-reveal data-delay="60" className="flex justify-center mb-6">
            <div style={{ display: 'inline-flex', borderBottom: '1px solid rgba(111,79,40,0.25)' }}>
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                color: '#6F4F28',
                padding: '8px 18px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                borderBottom: '2px solid #6F4F28',
                marginBottom: '-1px',
              }}>
                Le déroulé
              </span>
            </div>
          </div>

          <h2
            data-reveal
            data-delay="100"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}
          >
            6 arrêts, <span style={{ color: '#6F4F28' }}>900 ans d'histoire.</span>
          </h2>
          <p
            data-reveal
            data-delay="180"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginTop: '14px', maxWidth: '520px', margin: '14px auto 0' }}
          >
            Découverte de l'atoll en 6 arrêts soigneusement choisis pour vous faire vivre Rangiroa sous toutes ses facettes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stops.map((s, idx) => (
            <div
              key={s.num}
              className="card-dark p-7"
              data-reveal="scale"
              data-delay={String(idx * 90)}
            >
              <div className="flex items-start justify-between mb-5">
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '36px', fontWeight: 900, color: 'rgba(111,79,40,0.18)', lineHeight: 1 }}>
                  {s.num}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(111,79,40,0.12)', color: '#6F4F28', border: '1px solid rgba(111,79,40,0.3)', flexShrink: 0 }}
                >
                  {s.theme}
                </span>
              </div>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '17px', color: '#ffffff', lineHeight: 1.3, marginBottom: '10px' }}>
                {s.name}
              </h3>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
