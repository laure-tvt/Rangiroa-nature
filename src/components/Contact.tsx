import { useEffect, useRef } from 'react'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'

const infos = [
  {
    icon: Phone,
    title: 'Téléphone / WhatsApp',
    lines: ['+689 87 65 43 21', 'Disponible 7j/7, 7h–19h'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['contact@rangiroa-nature.pf', 'Réponse sous 24h'],
  },
  {
    icon: MapPin,
    title: 'Localisation',
    lines: ['Avatoru, Rangiroa', 'Archipel des Tuamotu, Polynésie française'],
  },
  {
    icon: Clock,
    title: 'Horaires',
    lines: ['Lundi – Samedi : 7h – 19h', 'Dimanche : sur rendez-vous'],
  },
]

export default function Contact() {
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

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 mb-4 text-sm font-medium tracking-widest uppercase"
            style={{ color: '#D4AF37' }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
            Nous contacter
            <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
          </div>
          <h2 className="section-title mb-4">
            Une question ?{' '}
            <span className="gold-accent">Écrivez-nous</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Notre équipe est disponible pour répondre à toutes vos questions et vous aider
            à préparer le voyage idéal à Rangiroa.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {infos.map((info, i) => (
            <div
              key={i}
              className="reveal card-hover bg-white border rounded-2xl p-6 text-center"
              style={{ borderColor: '#F0EBE5', transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#3D2817' }}
              >
                <info.icon size={22} style={{ color: '#D4AF37' }} />
              </div>
              <h4
                className="font-semibold text-sm mb-2"
                style={{ color: '#3D2817', fontFamily: 'Montserrat, sans-serif' }}
              >
                {info.title}
              </h4>
              {info.lines.map((line, j) => (
                <p key={j} className={`text-sm ${j === 0 ? 'text-gray-700 font-medium' : 'text-gray-400 text-xs mt-1'}`}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Map placeholder + social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal">
          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden h-64" style={{ backgroundColor: '#F5F5F5' }}>
            <iframe
              title="Carte Rangiroa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-147.7,-15.2,-147.5,-14.9&layer=mapnik"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          {/* Social + follow */}
          <div
            className="rounded-2xl p-8 flex flex-col justify-center"
            style={{ backgroundColor: '#3D2817' }}
          >
            <h4
              className="text-white text-xl font-bold mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Suivez-nous
            </h4>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Découvrez nos photos, vidéos et témoignages sur les réseaux sociaux.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4AF37' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
              >
                <Instagram size={18} />
                Instagram
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4AF37' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)' }}
              >
                <Facebook size={18} />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
