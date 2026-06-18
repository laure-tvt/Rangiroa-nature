import { useRef } from 'react'
import { ArrowRight, Clock, Globe, MapPin } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const stops = [
  {
    num: '01',
    name: "Quai d'Avatoru",
    theme: 'Peuplement',
    desc: "Le port, porte d'entrée sur la vie maritime de l'atoll.",
    img: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200&q=80',
  },
  {
    num: '02',
    name: "Église d'Avatoru",
    theme: 'Culture & Foi',
    desc: "L'impact de la chrétienté sur la culture polynésienne.",
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  },
  {
    num: '03',
    name: "Village d'Avatoru",
    theme: 'Vie locale',
    desc: "L'ancien village, ses traditions et son architecture.",
    img: 'https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=1200&q=80',
  },
  {
    num: '04',
    name: 'Plage publique',
    theme: 'Nature',
    desc: 'Le lagon turquoise à portée de main, sable blanc immaculé.',
    img: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=1200&q=80',
  },
  {
    num: '05',
    name: 'Platier de récif',
    theme: 'Écosystème',
    desc: "Formation corallienne face à l'hôtel Kia Ora.",
    img: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1200&q=80',
  },
  {
    num: '06',
    name: 'Passe de Tiputa',
    theme: 'Légendes',
    desc: 'La passe mythique, théâtre de guerres et de légendes locales.',
    img: 'https://images.unsplash.com/photo-1559828291-15e4bd0ba21f?w=1200&q=80',
  },
]

const prices = [
  { label: 'Adulte', price: '5 000', currency: 'XPF', euro: '≈ 42 €' },
  { label: 'Enfant (−11 ans)', price: '2 500', currency: 'XPF', euro: '≈ 21 €' },
  { label: 'Bébé (−3 ans)', price: 'Gratuit', currency: '', euro: '' },
]

export default function Tours() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  useScrollReveal(ref1)
  useScrollReveal(ref2)

  const book = () => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div id="visites">

      {/* ── LIGHT — présentation du circuit ── */}
      <section ref={ref1} className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="reveal mb-16 max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="teal-line" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase teal-accent">Notre circuit</span>
            </div>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(38px, 6vw, 64px)',
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
            }}>
              Tour de l&apos;Île,<br />
              <span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>réinventé.</span>
            </h2>
          </div>

          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-gray-500 leading-relaxed mb-8" style={{ fontSize: '17px', lineHeight: 1.8 }}>
                La visite se déroule en deux actes. Les trois premiers arrêts explorent
                le peuplement de l&apos;île, l&apos;ancien village et l&apos;héritage polynésien.
                Les trois suivants plongent dans la géologie de l&apos;atoll, la faune marine
                et les légendes ancestrales.
              </p>
              <div className="flex flex-wrap gap-5 mb-8">
                {[
                  { icon: Clock, text: '2h30 · Pick-up inclus' },
                  { icon: Globe, text: 'Français & Anglais' },
                  { icon: MapPin, text: '6 arrêts exclusifs' },
                ].map(({ icon: Icon, text }) => (
                  <span key={text} className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon size={15} style={{ color: 'var(--teal)' }} />
                    {text}
                  </span>
                ))}
              </div>
              <button
                onClick={book}
                className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
                style={{ color: 'var(--brown-dark)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--teal)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--brown-dark)' }}
              >
                Réserver cette visite
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden" style={{ height: '380px' }}>
              <img
                src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=900&q=85"
                alt="Lagon de Rangiroa"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: 'var(--teal)' }}>
                Circuit exclusif
              </div>
            </div>
          </div>

          <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Pick-up hôtel', 'Boisson offerte', 'Guide bilingue', 'Groupe privé'].map((item) => (
              <div key={item} className="flex items-center gap-2 p-4 rounded-xl bg-neutral-50">
                <span style={{ color: 'var(--teal)', fontSize: '16px' }}>✓</span>
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK — accordion stops + tarifs ── */}
      <section ref={ref2} className="py-24 px-6" style={{ backgroundColor: '#111' }}>
        <div className="max-w-6xl mx-auto">

          <div className="reveal mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="teal-line" />
                <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--teal)' }}>
                  Le parcours
                </span>
              </div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                6 arrêts.<br />6 histoires.
              </h3>
            </div>
            <button onClick={book} className="btn-teal self-start sm:self-auto">
              Réserver <ArrowRight size={15} />
            </button>
          </div>

          {/* ── ACCORDION ROWS ── */}
          <div className="reveal mb-14" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {stops.map((stop) => (
              <div
                key={stop.num}
                className="accordion-row"
              >
                {/* Background image — fades in on hover */}
                <div
                  className="accordion-row-bg"
                  style={{ backgroundImage: `url(${stop.img})` }}
                />

                {/* Row content — always visible at 80px height */}
                <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-8">
                  {/* Top bar: number + name + arrow */}
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(20px, 3vw, 28px)',
                        fontWeight: 700,
                        color: 'var(--teal)',
                        opacity: 0.5,
                        minWidth: '2.5rem',
                        lineHeight: 1,
                      }}
                    >
                      {stop.num}
                    </span>
                    <span
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(16px, 2.5vw, 22px)',
                        fontWeight: 600,
                        color: '#fff',
                        flex: 1,
                        lineHeight: 1.2,
                      }}
                    >
                      {stop.name}
                    </span>
                    <span
                      className="hidden sm:block text-xs font-semibold tracking-widest uppercase px-2 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(30,205,196,0.12)', color: 'var(--teal)' }}
                    >
                      {stop.theme}
                    </span>
                    <ArrowRight
                      size={18}
                      style={{ color: 'var(--teal)', flexShrink: 0 }}
                    />
                  </div>

                  {/* Description — slides up on hover */}
                  <div className="accordion-row-desc mt-3 pl-14 sm:pl-20">
                    <p
                      className="text-sm leading-relaxed max-w-xl"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {stop.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal pt-14 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <h4 className="text-white text-center mb-8 text-base font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Tarifs · Pick-up &amp; boisson inclus
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              {prices.map((p) => (
                <div key={p.label} className="price-card text-center rounded-2xl p-6"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {p.label}
                  </div>
                  <div className="font-bold text-white" style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', lineHeight: 1 }}>
                    {p.price}
                  </div>
                  {p.currency && (
                    <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {p.currency} · {p.euro}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <button onClick={book} className="btn-teal">
                Réserver maintenant <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
