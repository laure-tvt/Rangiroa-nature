import { useState } from 'react'
import { Phone, Mail, Building2, CheckCircle } from 'lucide-react'

type FormData = {
  name: string
  email: string
  phone: string
  project: string
  budget: string
  message: string
}

const projects = ['Acheter un bien', 'Louer un bien', 'Vendre mon bien', 'Investissement locatif', 'Autre']
const budgets = ['< 20M XPF', '20–50M XPF', '50–100M XPF', '100–200M XPF', '200M+ XPF']

export default function Reservation() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', project: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused === name ? '#6F4F28' : 'rgba(111,79,40,0.18)'}`,
    color: '#ffffff',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '11px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    marginBottom: '6px',
  }

  return (
    <section id="contact" className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">

          {/* Left info */}
          <div className="lg:col-span-2">
            <div className="section-label">Contact</div>
            <h2 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}>
              Parlons de<br />
              <span style={{ color: '#6F4F28' }}>votre projet.</span>
            </h2>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}>
              Remplissez le formulaire et un conseiller vous rappelle sous 48h pour vous accompagner dans votre projet immobilier en Polynésie.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, title: 'Téléphone', val: '+689 40 50 60 70' },
                { icon: Mail, title: 'Email', val: 'contact@find-polynesie.pf' },
                { icon: Building2, title: 'Agence principale', val: 'Papeete, Tahiti · Polynésie' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(111,79,40,0.1)', border: '1px solid rgba(111,79,40,0.25)' }}
                  >
                    <c.icon size={17} style={{ color: '#6F4F28' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.title}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#0D0D0D', border: '1px solid rgba(111,79,40,0.14)' }}>
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle size={52} className="mx-auto mb-4" style={{ color: '#6F4F28' }} />
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '22px', color: '#ffffff', marginBottom: '10px' }}>
                    Demande envoyée !
                  </h3>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                    Merci {form.name}. Un conseiller FIND Polynésie vous contactera sous 48h pour discuter de votre projet immobilier.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{ marginTop: '20px', color: '#6F4F28', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    Envoyer une nouvelle demande
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: '#ffffff', marginBottom: '20px' }}>
                    Demande de contact
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Nom complet *</label>
                      <input type="text" name="name" required value={form.name} onChange={onChange} placeholder="Jean Dupont"
                        style={inputStyle('name')} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" name="email" required value={form.email} onChange={onChange} placeholder="jean@email.com"
                        style={inputStyle('email')} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Téléphone / WhatsApp</label>
                    <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+689 87 00 00 00"
                      style={inputStyle('phone')} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Mon projet *</label>
                      <select name="project" required value={form.project} onChange={onChange}
                        style={{ ...inputStyle('project'), color: form.project ? '#ffffff' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
                        onFocus={() => setFocused('project')} onBlur={() => setFocused(null)}>
                        <option value="" disabled style={{ backgroundColor: '#111', color: '#666' }}>Sélectionner</option>
                        {projects.map((p) => <option key={p} value={p} style={{ backgroundColor: '#111', color: '#fff' }}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Budget</label>
                      <select name="budget" value={form.budget} onChange={onChange}
                        style={{ ...inputStyle('budget'), color: form.budget ? '#ffffff' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }}
                        onFocus={() => setFocused('budget')} onBlur={() => setFocused(null)}>
                        <option value="" style={{ backgroundColor: '#111', color: '#666' }}>Non défini</option>
                        {budgets.map((b) => <option key={b} value={b} style={{ backgroundColor: '#111', color: '#fff' }}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea name="message" value={form.message} onChange={onChange} rows={4}
                      placeholder="Décrivez votre projet, vos critères, vos questions…"
                      style={{ ...inputStyle('message'), resize: 'none' }}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center py-4 text-base font-bold"
                    style={{ borderRadius: '12px' }}
                  >
                    Envoyer ma demande
                  </button>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: '8px' }}>
                    Réponse garantie sous 48h · Aucun engagement requis
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
