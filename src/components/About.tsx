import { useEffect, useRef } from 'react'
import { Heart, Shield, Leaf, Award } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Passion locale',
    description:
      'Né et élevé à Rangiroa, votre guide partage une connaissance intime et profonde de l\'atoll — ses secrets, ses légendes, ses endroits magiques.',
  },
  {
    icon: Shield,
    title: 'Sécurité & Confort',
    description:
      'Véhicule climatisé, équipements de snorkeling fournis, assurances complètes. Votre sécurité est notre priorité absolue.',
  },
  {
    icon: Leaf,
    title: 'Tourisme responsable',
    description:
      'Nous respectons les écosystèmes fragiles de l\'atoll et travaillons avec les communautés locales pour un tourisme durable et bénéfique.',
  },
  {
    icon: Award,
    title: 'Expériences exclusives',
    description:
      'Groupes limités, circuits privés, accès à des sites hors des sentiers battus. Une expérience que vous ne trouverez nulle part ailleurs.',
  },
]

export default function About() {
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

  return (
    <section id="apropos" ref={sectionRef} className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images collage */}
          <div className="reveal relative">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-2xl overflow-hidden h-80 w-full">
                <img
                  src="https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80"
                  alt="Guide touristique à Rangiroa"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Overlay card */}
              <div
                className="absolute -bottom-6 -right-6 w-40 h-40 rounded-xl overflow-hidden border-4 border-white shadow-lg hidden sm:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1559828291-15e4bd0ba21f?w=400&q=80"
                  alt="Lagon de Rangiroa"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Stats card */}
              <div
                className="absolute -top-4 -left-4 p-4 rounded-xl shadow-lg text-white hidden sm:block"
                style={{ backgroundColor: '#3D2817' }}
              >
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#D4AF37' }}
                >
                  +200
                </div>
                <div className="text-xs text-white/80 mt-1">clients satisfaits<br />en 2024</div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="reveal" style={{ transitionDelay: '200ms' }}>
            <div
              className="inline-flex items-center gap-2 mb-4 text-sm font-medium tracking-widest uppercase"
              style={{ color: '#D4AF37' }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
              Notre histoire
            </div>

            <h2 className="section-title mb-6">
              Une passion pour Rangiroa,{' '}
              <span className="gold-accent">partagée avec vous</span>
            </h2>

            <p
              className="text-gray-600 leading-relaxed mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
            >
              Rangiroa Nature est née d'un amour profond pour cet atoll unique au monde. Fondée
              par Maeva, guide certifiée et enfant du pays, notre entreprise propose des visites
              guidées authentiques depuis plus de 10 ans.
            </p>
            <p
              className="text-gray-600 leading-relaxed mb-8"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}
            >
              Plus qu'une simple visite touristique, nous vous offrons une rencontre avec l'âme
              de Rangiroa — ses paysages époustouflants, sa faune marine exceptionnelle, sa culture
              polynésienne vivante et ses habitants chaleureux.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((value, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#F5F5F5' }}
                  >
                    <value.icon size={20} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-sm mb-1"
                      style={{ color: '#3D2817', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {value.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial banner */}
        <div
          className="mt-20 reveal rounded-2xl p-8 md:p-12 text-center"
          style={{ backgroundColor: '#3D2817' }}
        >
          <div className="flex justify-center gap-1 mb-4">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} className="w-5 h-5" fill="#D4AF37" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote
            className="text-white text-xl md:text-2xl font-light italic max-w-3xl mx-auto mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            "Une journée inoubliable avec Maeva. Elle nous a fait découvrir des endroits
            que jamais un guide ordinaire n'aurait trouvé. Rangiroa vue de l'intérieur,
            c'est une magie totale."
          </blockquote>
          <div>
            <div className="text-white font-semibold text-sm">Sophie & Pierre L.</div>
            <div className="text-xs mt-1" style={{ color: '#D4AF37' }}>Paris · Circuit Motus Secrets · Juin 2025</div>
          </div>
        </div>
      </div>
    </section>
  )
}
