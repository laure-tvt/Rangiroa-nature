import { useEffect, useRef } from 'react'
import { Clock, Users, Star, ChevronRight } from 'lucide-react'

const tours = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
    badge: 'Bestseller',
    title: 'Tour du Grand Lagon',
    subtitle: 'Demi-journée · Matin',
    description:
      'Explorez les passes mythiques de Tiputa et Avatoru, observez les raies manta et les requins dans leur habitat naturel. Un circuit inoubliable pour découvrir la vie marine de Rangiroa.',
    duration: '4h',
    group: '2 à 6 personnes',
    rating: 4.9,
    reviews: 87,
    price: '8 500',
    highlights: ['Passe de Tiputa', 'Snorkeling inclus', 'Pique-nique local'],
    color: '#5C4033',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    badge: 'Nature',
    title: 'Motus Secrets',
    subtitle: 'Journée complète',
    description:
      "Partez à la découverte des îlots (motus) isolés de l'atoll. Forêts de cocotiers, plages immaculées, oiseaux tropicaux rares — un voyage hors du temps dans la Polynésie sauvage.",
    duration: '8h',
    group: '2 à 4 personnes',
    rating: 4.8,
    reviews: 52,
    price: '15 000',
    highlights: ['Motus isolés', 'Observation oiseaux', 'Déjeuner traditionnel'],
    color: '#3D2817',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?w=800&q=80',
    badge: 'Romantique',
    title: 'Coucher de Soleil aux Avatoru',
    subtitle: 'Soirée · 2h',
    description:
      "Un circuit intimiste au crépuscule le long de la côte nord. Le soleil se couche sur le lagon et révèle des palettes de couleurs uniques. Idéal pour les couples en voyage de noces.",
    duration: '2h',
    group: '2 personnes',
    rating: 5.0,
    reviews: 34,
    price: '6 000',
    highlights: ['Vue panoramique', 'Champagne offert', 'Photos souvenirs'],
    color: '#5C4033',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    badge: 'Famille',
    title: 'Découverte Complète',
    subtitle: 'Journée complète · Sur mesure',
    description:
      "Le grand tour de Rangiroa : passes, motus, village d'Avatoru, ferme perlière, lagon bleu. Tout ce que l'atoll a à offrir en une seule journée inoubliable pour toute la famille.",
    duration: '10h',
    group: '2 à 8 personnes',
    rating: 4.9,
    reviews: 61,
    price: '18 000',
    highlights: ['Ferme perlière', 'Lagon Bleu', 'Repas gastronomique'],
    color: '#3D2817',
  },
]

const badgeColors: Record<string, string> = {
  Bestseller: '#D4AF37',
  Nature: '#2d7a4f',
  Romantique: '#c0446b',
  Famille: '#2563eb',
}

export default function Tours() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
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
            Nos Circuits
            <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
          </div>
          <h2 className="section-title mb-4">
            Choisissez votre{' '}
            <span className="gold-accent">aventure</span>
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: '1.7' }}
          >
            Chaque circuit est conçu pour vous offrir une immersion authentique dans la nature
            et la culture polynésienne. Toutes les visites sont privées et adaptées à vos envies.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="reveal card-hover bg-white rounded-2xl overflow-hidden shadow-sm"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(61,40,23,0.7) 0%, transparent 60%)',
                  }}
                />
                {/* Badge */}
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: badgeColors[tour.badge] || '#3D2817' }}
                >
                  {tour.badge}
                </span>
                {/* Price */}
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="text-white/70 text-xs">À partir de</div>
                  <div
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {tour.price} XPF
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title row */}
                <div className="mb-3">
                  <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: '#D4AF37' }}>
                    {tour.subtitle}
                  </p>
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#3D2817' }}
                  >
                    {tour.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">{tour.description}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {tour.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: '#F5F5F5', color: '#5C4033' }}
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>

                {/* Meta + CTA */}
                <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: '#F5F5F5' }}>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={14} style={{ color: '#D4AF37' }} />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} style={{ color: '#D4AF37' }} />
                      {tour.group}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={14} fill="#D4AF37" style={{ color: '#D4AF37' }} />
                      {tour.rating} ({tour.reviews})
                    </span>
                  </div>
                  <button
                    onClick={handleBook}
                    className="flex items-center gap-1 text-sm font-semibold transition-all duration-200"
                    style={{ color: '#3D2817' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#D4AF37'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#3D2817'
                    }}
                  >
                    Réserver
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 reveal">
          <p className="text-gray-500 mb-4 text-sm">Vous avez une demande particulière ?</p>
          <button
            onClick={handleBook}
            className="btn-primary"
          >
            Créer un circuit sur mesure
          </button>
        </div>
      </div>
    </section>
  )
}
