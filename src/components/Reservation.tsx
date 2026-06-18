import { useState } from 'react'
import { CalendarDays, Users, MapPin, CheckCircle } from 'lucide-react'

const circuits = [
  "Tour de l'Île — Visite Guidée (2h30)",
  'Demande spéciale / Sur mesure',
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

const inputBase: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.8)',
  borderColor: 'rgba(196,105,38,0.2)',
  color: '#ffffff',
  fontFamily: 'Montserrat, sans-serif',
}

const inputFocused: React.CSSProperties = {
  backgroundColor: 'rgba(0,0,0,0.8)',
  borderColor: '#C46926',
  color: '#ffffff',
  fontFamily: 'Montserrat, sans-serif',
}

function useFieldFocus() {
  const [focused, setFocused] = useState<string | null>(null)
  const bind = (name: string) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
    style: focused === name ? inputFocused : inputBase,
  })
  return bind
}

export default function Reservation() {
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

  const bind = useFieldFocus()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const labelStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
  }

  return (
    <section
      id="reservation"
      className="py-24 px-6"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <div
              className="inline-flex items-center gap-2 mb-4 text-sm font-medium tracking-widest uppercase"
              style={{ color: '#C46926' }}
            >
              <span className="w-8 h-px" style={{ backgroundColor: '#C46926' }} />
              Réservation
            </div>
            <h2 className="section-title mb-6">
              Réservez votre{' '}
              <span className="cyan-accent">visite</span>
            </h2>
            <p
              className="text-white/70 leading-relaxed mb-10"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}
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
                  text: "Annulation gratuite jusqu'à 48h avant la visite. Paiement sur place.",
                },
                {
                  icon: Users,
                  title: 'Groupes privés uniquement',
                  text: "Vos circuits sont réservés exclusivement à votre groupe. Aucun mélange avec d'autres voyageurs.",
                },
                {
                  icon: MapPin,
                  title: "Prise en charge à l'hôtel",
                  text: 'Nous venons vous chercher à votre hôtel ou pension sur Rangiroa. Aucune organisation de votre côté.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#0d0d0d' }}
                  >
                    <item.icon size={20} style={{ color: '#C46926' }} />
                  </div>
                  <div>
                    <h4
                      className="font-semibold mb-1 text-white"
                      style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 600 }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact direct */}
            <div
              className="mt-10 p-5 rounded-xl"
              style={{ border: '1.5px solid #C46926' }}
            >
              <p className="text-sm font-semibold mb-2 text-white">
                Préférez-vous nous contacter directement ?
              </p>
              <p className="text-sm text-white/70">
                WhatsApp :{' '}
                <a href="tel:+68987363213" className="font-semibold" style={{ color: '#C46926' }}>
                  +689 87 36 32 13
                </a>
              </p>
              <p className="text-sm text-white/70">
                Email :{' '}
                <a href="mailto:tevaiti.van.tours@gmail.com" className="font-semibold" style={{ color: '#C46926' }}>
                  tevaiti.van.tours@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#1a1208' }}>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="mx-auto mb-4" style={{ color: '#C46926' }} />
                  <h3
                    className="text-2xl font-bold mb-3 text-white"
                    style={{ fontFamily: 'Cinzel, serif', fontWeight: 700 }}
                  >
                    Demande envoyée !
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Merci {form.name} ! Nous vous répondrons sous 24h pour confirmer votre
                    réservation et vous fournir tous les détails pratiques.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium underline"
                    style={{ color: '#C46926' }}
                  >
                    Faire une nouvelle demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3
                    className="text-xl font-bold mb-6 text-white"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                  >
                    Demande de réservation
                  </h3>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={labelStyle}>
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
                        {...bind('name')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={labelStyle}>
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
                        {...bind('email')}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={labelStyle}>
                      Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                      {...bind('phone')}
                    />
                  </div>

                  {/* Circuit */}
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={labelStyle}>
                      Circuit souhaité *
                    </label>
                    <select
                      name="circuit"
                      required
                      value={form.circuit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                      {...bind('circuit')}
                    >
                      <option value="" disabled style={{ backgroundColor: '#0d0d0d', color: '#9CA3AF' }}>Sélectionner un circuit</option>
                      {circuits.map((c) => (
                        <option key={c} value={c} style={{ backgroundColor: '#0d0d0d', color: '#ffffff' }}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date + Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={labelStyle}>
                        Date souhaitée *
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                        {...bind('date')}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={labelStyle}>
                        Nombre de personnes *
                      </label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                        {...bind('guests')}
                      >
                        {[1,2,3,4,5,6,7,8].map((n) => (
                          <option key={n} value={n} style={{ backgroundColor: '#0d0d0d', color: '#ffffff' }}>{n} {n === 1 ? 'personne' : 'personnes'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={labelStyle}>
                      Message / demandes spéciales
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Anniversaire, allergie alimentaire, enfants en bas âge..."
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 resize-none"
                      {...bind('message')}
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                    Envoyer ma demande
                  </button>

                  <p className="text-center text-xs text-white/40">
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
