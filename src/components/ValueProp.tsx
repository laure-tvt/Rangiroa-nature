const facts = [
  { n: '900', label: "ans d'histoire", sub: "Peuplement de l'atoll" },
  { n: '6', label: 'arrêts essentiels', sub: 'Histoire, culture, nature' },
  { n: '2h30', label: 'de visite privée', sub: 'Pick-up et boisson inclus' },
]

export default function ValueProp() {
  return (
    <section id="comprendre" className="py-24 px-6" style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: bold headline */}
          <div>
            <div
              className="inline-flex items-center gap-2 mb-6 text-sm font-medium tracking-widest uppercase"
              style={{ color: '#C46926' }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: '#C46926' }} />
              La visite
            </div>
            <h2
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.15,
              }}
            >
              Comprendre Rangiroa<br />
              <span style={{ color: '#C46926' }}>pour la visiter</span><br />
              vraiment.
            </h2>
          </div>

          {/* Right: explanation + stats */}
          <div>
            <p
              className="text-white/70 leading-relaxed mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 400 }}
            >
              Rangiroa n'est pas une destination ordinaire. C'est l'un des plus grands atolls
              du monde — une bande de terre corallienne encerclant un lagon immense. Pour
              vraiment la comprendre, il faut s'arrêter, regarder, et écouter.
            </p>
            <p
              className="text-white/70 leading-relaxed mb-10"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', fontWeight: 400 }}
            >
              Tevaiti Van Tours vous propose une visite guidée en van privé climatisé, en
              6 arrêts soigneusement choisis pour révéler l'histoire, la culture et les
              paysages de l'atoll.
            </p>

            <div className="space-y-1">
              {facts.map((item) => (
                <div
                  key={item.n}
                  className="flex items-center gap-5 py-4"
                  style={{ borderBottom: '1px solid rgba(196,105,38,0.15)' }}
                >
                  <span
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '36px',
                      fontWeight: 800,
                      color: '#C46926',
                      minWidth: '88px',
                      lineHeight: 1,
                    }}
                  >
                    {item.n}
                  </span>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.label}</div>
                    <div className="text-white/50 text-xs mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
