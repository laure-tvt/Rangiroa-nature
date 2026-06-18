import { useEffect, useRef } from 'react'
import { Clock, Globe, MapPin, ChevronRight } from 'lucide-react'

const stops = [
  {
    num: '01',
    name: 'Le quai d\'Avatoru',
    desc: 'Point de départ emblématique, découverte du port et de la vie maritime de l\'atoll.',
    theme: 'Peuplement de l\'île',
  },
  {
    num: '02',
    name: 'L\'église d\'Avatoru',
    desc: 'Histoire de l\'évangélisation en Polynésie et impact de la chrétienté sur la culture locale.',
    theme: 'Culture & Histoire',
  },
  {
    num: '03',
    name: 'Le village d\'Avatoru',
    desc: 'Immersion dans l\'ancien village, ses traditions, son architecture et son mode de vie authentique.',
    theme: 'Village traditionnel',
  },
  {
    num: '04',
    name: 'La plage publique',
    desc: 'Une pause sur l\'une des plus belles plages de l\'atoll, entre lagon turquoise et sable blanc.',
    theme: 'Nature & Détente',
  },
  {
    num: '05',
    name: 'Le platier de récif',
    desc: 'Face à l\'hôtel le Kia Ora — découverte de la formation corallienne et de sa protection naturelle.',
    theme: 'Écosystème corallien',
  },
  {
    num: '06',
    name: 'La passe de Tiputa',
    desc: 'La passe la plus célèbre de Rangiroa, théâtre de légendes locales et d\'histoires de guerres ancestrales.',
    theme: 'Légendes & Faune',
  },
]

const prices = [
  { label: 'Adulte', price: '5 000 XPF', sub: '≈ 42 €', note: '' },
  { label: 'Enfant (- 11 ans)', price: '2 500 XPF', sub: '≈ 21 €', note: '' },
  { label: 'Bébé (- 3 ans)', price: 'Gratuit', sub: '', note: '' },
]

export default function Tours() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleBook = () => {
    const el = document.querySelector('#reservation')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="visites" ref={sectionRef} className="py-24 px-6" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium tracking-widest uppercase"
            style={{ color: '#D4AF37' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
            Notre Circuit
            <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
          </div>
          <h2 className="section-title mb-4">
            Tour de l'Île —{' '}
            <span className="gold-accent">Visite Guidée</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: '1.7' }}>
            Une immersion unique dans l'histoire, la culture et les paysages de Rangiroa
            en 6 arrêts soigneusement sélectionnés. Visite privée, en français et en anglais.
          </p>
        </div>

        {/* Tour card principale */}
        <div className="reveal bg-white rounded-2xl overflow-hidden shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-72 lg:h-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80"
                alt="Tour de l'île de Rangiroa"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(61,40,23,0.7) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-6 left-6">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white mb-2 inline-block"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Circuit exclusif
                </span>
                <div className="text-white text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Tour de l'Île
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} style={{ color: '#D4AF37' }} />
                    2h30 (pick-up + boisson inclus)
                  </span>
                  <span className="flex items-center gap-2 text-sm text-gray-600">
                    <Globe size={16} style={{ color: '#D4AF37' }} />
                    Français & Anglais
                  </span>
                  <span className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} style={{ color: '#D4AF37' }} />
                    6 arrêts
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  La visite se déroule en deux parties : les trois premiers arrêts explorent
                  le peuplement de l'île, l'ancien village et l'impact de la chrétienté sur
                  la culture polynésienne. Les trois derniers plongent dans les histoires de
                  guerres, la protection corallienne, la formation de l'atoll et ses légendes locales.
                </p>

                {/* Inclus */}
                <div className="space-y-2 mb-6">
                  {['Pick-up à votre hôtel / pension', 'Boisson offerte', 'Guide bilingue FR/EN', 'Groupes privés uniquement'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleBook} className="btn-primary justify-center">
                Réserver cette visite
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Les 6 arrêts */}
        <div className="reveal mb-12">
          <h3
            className="text-center text-2xl font-bold mb-8"
            style={{ fontFamily: 'Playfair Display, serif', color: '#3D2817' }}
          >
            Les 6 arrêts du circuit
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stops.map((stop, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm card-hover"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-3xl font-bold flex-shrink-0 leading-none"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37', opacity: 0.5 }}
                  >
                    {stop.num}
                  </span>
                  <div>
                    <span
                      className="text-xs font-medium tracking-wide uppercase mb-1 block"
                      style={{ color: '#D4AF37' }}
                    >
                      {stop.theme}
                    </span>
                    <h4
                      className="font-bold text-sm mb-2"
                      style={{ color: '#3D2817', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {stop.name}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{stop.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                {p.sub && (
                  <div className="text-xs mt-1" style={{ color: '#D4AF37' }}>{p.sub}</div>
                )}
              </div>
            ))}
          </div>
          <button onClick={handleBook} className="btn-outline">
            Réserver maintenant
          </button>
        </div>

      </div>
    </section>
  )
}
