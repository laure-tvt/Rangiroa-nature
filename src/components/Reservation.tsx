import { useEffect, useRef, useState } from 'react'
import { CalendarDays, Users, MapPin, CheckCircle } from 'lucide-react'

const circuits = [
  'Tour du Grand Lagon (4h)',
  'Motus Secrets (8h)',
  'Coucher de Soleil aux Avatoru (2h)',
  'Découverte Complète (10h)',
  'Circuit sur mesure',
]

type FormState = {
  name: string
  email: string
  phone: string
  circuit: string
  date: string
  guests: string
  message: string
}

export default function Reservation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    circuit: '',
    date: '',
    guests: '2',
    message: '',
  })

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="reveal">
            <div
              className="inline-flex items-center gap-2 mb-4 text-sm font-medium tracking-widest uppercase"
              style={{ color: '#D4AF37' }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: '#D4AF37' }} />
              Réservation
            </div>
            <h2 className="section-title mb-6">
              Planifiez votre{' '}
              <span className="gold-accent">aventure</span>
            </h2>
            <p
              className="text-gray-600 leading-relaxed mb-10"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Remplissez le formulaire et nous vous contacterons sous 24h pour confirmer
              votre réservation et personnaliser votre expérience.
            </p>

            {/* Info blocks */}
            <div className="space-y-6">
              {[
                {
                  icon: CalendarDays,
                  title: 'Réservation flexible',
                  text: 'Annulation gratuite jusqu\'à 48h avant la visite. Paiement sur place.',
                },
                {
                  icon: Users,
                  title: 'Groupes privés uniquement',
                  text: 'Vos circuits sont réservés exclusivement à votre groupe. Aucun mélange avec d\'autres voyageurs.',
                },
                {
                  icon: MapPin,
                  title: 'Prise en charge à l\'hôtel',
                  text: 'Nous venons vous chercher à votre hôtel ou pension sur Rangiroa. Aucune organisation de votre côté.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#3D2817' }}
                  >
                    <item.icon size={20} style={{ color: '#D4AF37' }} />
                  </div>
                  <div>
                    <h4
                      className="font-semibold mb-1"
                      style={{ color: '#3D2817', fontFamily: 'Montserrat, sans-serif', fontSize: '14px' }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact direct */}
            <div
              className="mt-10 p-5 rounded-xl border"
              style={{ borderColor: '#D4AF37', borderWidth: '1.5px' }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: '#3D2817' }}>
                Préférez-vous nous contacter directement ?
              </p>
              <p className="text-sm text-gray-600">
                WhatsApp :{' '}
                <a href="tel:+68987654321" className="font-semibold" style={{ color: '#3D2817' }}>
                  +689 87 65 43 21
                </a>
              </p>
              <p className="text-sm text-gray-600">
                Email :{' '}
                <a href="mailto:contact@rangiroa-nature.pf" className="font-semibold" style={{ color: '#3D2817' }}>
                  contact@rangiroa-nature.pf
                </a>
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="mx-auto mb-4" style={{ color: '#D4AF37' }} />
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#3D2817' }}
                  >
                    Demande envoyée !
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Merci {form.name} ! Nous vous répondrons sous 24h pour confirmer votre
                    réservation et vous fournir tous les détails pratiques.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium underline"
                    style={{ color: '#3D2817' }}
                  >
                    Faire une nouvelle demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3
                    className="text-xl font-bold mb-6"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#3D2817' }}
                  >
                    Demande de réservation
                  </h3>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#5C4033' }}>
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jean Dupont"
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', fontFamily: 'Inter, sans-serif' }}
                        onFocus={(e) => { e.target.style.borderColor = '#D4AF37' }}
                        onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#5C4033' }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jean@email.com"
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', fontFamily: 'Inter, sans-serif' }}
                        onFocus={(e) => { e.target.style.borderColor = '#D4AF37' }}
                        onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#5C4033' }}>
                      Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                      style={{ borderColor: '#E5E7EB', fontFamily: 'Inter, sans-serif' }}
                      onFocus={(e) => { e.target.style.borderColor = '#D4AF37' }}
                      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                    />
                  </div>

                  {/* Circuit */}
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#5C4033' }}>
                      Circuit souhaité *
                    </label>
                    <select
                      name="circuit"
                      required
                      value={form.circuit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 bg-white"
                      style={{ borderColor: '#E5E7EB', fontFamily: 'Inter, sans-serif', color: form.circuit ? '#1A1A1A' : '#9CA3AF' }}
                      onFocus={(e) => { e.target.style.borderColor = '#D4AF37' }}
                      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                    >
                      <option value="" disabled>Sélectionner un circuit</option>
                      {circuits.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date + Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#5C4033' }}>
                        Date souhaitée *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                        style={{ borderColor: '#E5E7EB', fontFamily: 'Inter, sans-serif' }}
                        onFocus={(e) => { e.target.style.borderColor = '#D4AF37' }}
                        onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#5C4033' }}>
                        Nombre de personnes *
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 bg-white"
                        style={{ borderColor: '#E5E7EB', fontFamily: 'Inter, sans-serif' }}
                        onFocus={(e) => { e.target.style.borderColor = '#D4AF37' }}
                        onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                      >
                        {[1,2,3,4,5,6,7,8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? 'personne' : 'personnes'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: '#5C4033' }}>
                      Message / demandes spéciales
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Anniversaire, allergie alimentaire, enfants en bas âge..."
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 resize-none"
                      style={{ borderColor: '#E5E7EB', fontFamily: 'Inter, sans-serif' }}
                      onFocus={(e) => { e.target.style.borderColor = '#D4AF37' }}
                      onBlur={(e) => { e.target.style.borderColor = '#E5E7EB' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    Envoyer ma demande
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Réponse garantie sous 24h · Aucun paiement requis maintenant
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
