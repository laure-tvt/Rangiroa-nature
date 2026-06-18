import { useEffect, useRef } from 'react'
import { Clock, Globe, MapPin, ChevronRight } from 'lucide-react'

const stops = [
  {
    num: '01',
    name: "Le quai d'Avatoru",
    theme: "Peuplement de l'île",
    desc: "Point de départ emblématique, découverte du port et de la vie maritime de l'atoll.",
    img: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
  },
  {
    num: '02',
    name: "L'église catholique",
    theme: 'Culture & Histoire',
    desc: "Histoire de l'évangélisation en Polynésie et impact de la chrétienté sur la culture locale.",
    img: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80',
  },
  {
    num: '03',
    name: "Le village d'Avatoru",
    theme: 'Village traditionnel',
    desc: "Immersion dans l'ancien village, ses traditions, son architecture et son mode de vie authentique.",
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    num: '04',
    name: 'La plage publique',
    theme: 'Nature & Détente',
    desc: "Une pause sur l'une des plus belles plages de l'atoll, entre lagon turquoise et sable blanc.",
    img: 'https://images.unsplash.com/photo-1559829095-7e1a38ed7296?w=800&q=80',
  },
  {
    num: '05',
    name: 'Le platier de récif',
    theme: 'Écosystème corallien',
    desc: "Face à l'hôtel le Kia Ora — découverte de la formation corallienne et de sa protection naturelle.",
    img: 'https://images.unsplash.com/photo-1583148929897-a54c5f01ecf8?w=800&q=80',
  },
  {
    num: '06',
    name: 'La passe de Tiputa',
    theme: 'Légendes & Faune',
    desc: "La passe la plus célèbre de Rangiroa, théâtre de légendes locales et d'histoires de guerres ancestrales.",
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
]

const prices = [
  { label: 'Adulte', price: '5 000 XPF', sub: '≈ 42 €' },
  { label: 'Enfant (- 11 ans)', price: '2 500 XPF', sub: '≈ 21 €' },
  { label: 'Bébé (- 3 ans)', price: 'Gratuit', sub: '' },
]

export default function Tours() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleBook = () => {
    const el = document.querySelector('#reservation')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="visites" ref={sectionRef} className="py-24 px-6" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-7xl mx-auto">

        {/* Section header — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16 reveal">
          <div>
            <div
              className="inline-flex items-center gap-2 mb-4 text-sm font-medium tracking-widest uppercase"
              style={{ color: '#D4AF37' }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
              Le circuit
            </div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 700,
                color: '#3D2817',
                lineHeight: 1.1,
              }}
            >
              6 arrêts,<br />
              <span style={{ color: '#D4AF37' }}>un parcours unique.</span>
            </h2>
          </div>
          <div>
            <p
              className="text-gray-600 leading-relaxed mb-6"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
            >
              Une immersion unique dans l'histoire, la culture et les paysages de Rangiroa.
              Visite privée, en van climatisé, en français et en anglais.
            </p>
            <div className="flex flex-wrap gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Clock size={14} style={{ color: '#D4AF37' }} />2h30 (pick-up inclus)
              </span>
              <span className="flex items-center gap-1.5">
                <Globe size={14} style={{ color: '#D4AF37' }} />FR &amp; EN
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color: '#D4AF37' }} />6 arrêts
              </span>
            </div>
          </div>
        </div>

        {/* Stop cards — image overlay style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {stops.map((stop, i) => (
            <div
              key={i}
              className="reveal group relative overflow-hidden rounded-2xl cursor-default"
              style={{ transitionDelay: `${i * 80}ms`, height: '280px' }}
            >
              <img
                src={stop.img}
                alt={stop.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(to top, rgba(61,40,23,0.92) 0%, rgba(61,40,23,0.3) 60%, transparent 100%)',
                }}
              />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span
                    className="text-6xl font-bold leading-none"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      color: 'rgba(212,175,55,0.22)',
                    }}
                  >
                    {stop.num}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(212,175,55,0.18)',
                      color: '#D4AF37',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {stop.theme}
                  </span>
                </div>
                <div>
                  <h3
                    className="text-white font-bold text-lg mb-1.5"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {stop.name}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed">{stop.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tarifs */}
        <div
          className="reveal rounded-2xl p-8 md:p-10 text-center"
          style={{ backgroundColor: '#3D2817' }}
        >
          <h3
            className="text-white text-2xl font-bold mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Tarifs
          </h3>
          <p className="text-white/60 text-sm mb-8">Pick-up et boisson inclus dans tous les tarifs</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            {prices.map((p) => (
              <div
                key={p.label}
                className="rounded-xl p-5"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <div className="text-white/70 text-xs uppercase tracking-widest mb-2">{p.label}</div>
                <div
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {p.price}
                </div>
                {p.sub && <div className="text-xs mt-1" style={{ color: '#D4AF37' }}>{p.sub}</div>}
              </div>
            ))}
          </div>
          <button onClick={handleBook} className="btn-outline">
            Réserver maintenant <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
