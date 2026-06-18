import { useState } from 'react'
import { Phone, Mail, CheckCircle, MessageCircle } from 'lucide-react'

type FormData = { name: string; email: string; phone: string; date: string; adults: string; children: string; message: string }

export default function Reservation() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', date: '', adults: '1', children: '0', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%', padding: '12px 16px', borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.04)',
    border: `1px solid ${focused === name ? '#6F4F28' : 'rgba(111,79,40,0.18)'}`,
    color: '#ffffff', fontFamily: 'Montserrat, sans-serif', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s',
  })

  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 600,
    color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px',
  }

  return (
    <section id="contact" className="py-24 px-6" style={{ backgroundColor: '#0D0D0D' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">

          {/* Left */}
          <div className="lg:col-span-2">
            <div data-reveal className="section-label">Réservation</div>
            <h2
              data-reveal
              data-delay="100"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}
            >
              Réservez<br /><span style={{ color: '#6F4F28' }}>votre visite.</span>
            </h2>
            <p
              data-reveal
              data-delay="180"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginBottom: '32px' }}
            >
              Remplissez le formulaire ou contactez-nous directement par WhatsApp. Pick-up à votre hébergement inclus.
            </p>

            <div className="space-y-5">
              {[
                { icon: MessageCircle, title: 'WhatsApp', val: '+689 87 36 32 13' },
                { icon: Mail, title: 'Email', val: 'tevaiti.van.tours@gmail.com' },
                { icon: Phone, title: 'Téléphone', val: '+689 87 36 32 13' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4" data-reveal data-delay={String(260 + i * 100)}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(111,79,40,0.1)', border: '1px solid rgba(111,79,40,0.25)' }}>
                    <c.icon size={17} style={{ color: '#6F4F28' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.title}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tarif reminder */}
            <div
              data-reveal
              data-delay="560"
              className="mt-8 p-5 rounded-2xl"
              style={{ backgroundColor: 'rgba(111,79,40,0.08)', border: '1px solid rgba(111,79,40,0.2)' }}
            >
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, color: '#6F4F28', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
                Tarifs
              </div>
              {[
                { l: 'Adulte', p: '5 000 XFP', e: '42 €' },
                { l: 'Enfant (−11 ans)', p: '2 500 XFP', e: '21 €' },
                { l: 'Bébé (−3 ans)', p: 'Gratuit', e: '' },
              ].map((t) => (
                <div key={t.l} className="flex justify-between items-center py-1.5">
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{t.l}</span>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                    {t.p}{t.e ? <span style={{ color: 'rgba(255,255,255,0.68)', fontWeight: 400 }}> · {t.e}</span> : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-3" data-reveal="right" data-delay="150">
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#111111', border: '1px solid rgba(111,79,40,0.14)' }}>
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle size={52} className="mx-auto mb-4" style={{ color: '#6F4F28' }} />
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '22px', color: '#ffffff', marginBottom: '10px' }}>Demande envoyée !</h3>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>
                    Merci {form.name}. Nous vous confirmerons votre visite par WhatsApp ou email très prochainement.
                  </p>
                  <button onClick={() => setSubmitted(false)}
                    style={{ marginTop: '20px', color: '#6F4F28', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    Nouvelle demande
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', color: '#ffffff', marginBottom: '20px' }}>
                    Demande de réservation
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Téléphone / WhatsApp</label>
                      <input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+689 87 00 00 00"
                        style={inputStyle('phone')} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
                    </div>
                    <div>
                      <label style={labelStyle}>Date souhaitée *</label>
                      <input type="date" name="date" required value={form.date} onChange={onChange}
                        style={{ ...inputStyle('date'), colorScheme: 'dark' }}
                        onFocus={() => setFocused('date')} onBlur={() => setFocused(null)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={labelStyle}>Adultes *</label>
                      <select name="adults" required value={form.adults} onChange={onChange}
                        style={{ ...inputStyle('adults'), cursor: 'pointer' }}
                        onFocus={() => setFocused('adults')} onBlur={() => setFocused(null)}>
                        {['1','2','3','4','5','6','7','8'].map((n) => (
                          <option key={n} value={n} style={{ backgroundColor: '#111', color: '#fff' }}>{n} adulte{+n > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Enfants (−11 ans)</label>
                      <select name="children" value={form.children} onChange={onChange}
                        style={{ ...inputStyle('children'), cursor: 'pointer' }}
                        onFocus={() => setFocused('children')} onBlur={() => setFocused(null)}>
                        {['0','1','2','3','4','5'].map((n) => (
                          <option key={n} value={n} style={{ backgroundColor: '#111', color: '#fff' }}>{n} enfant{+n > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Message (hébergement, questions…)</label>
                    <textarea name="message" value={form.message} onChange={onChange} rows={3}
                      placeholder="Nom de votre hébergement pour le pick-up, questions particulières…"
                      style={{ ...inputStyle('message'), resize: 'none' }}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-4 text-base font-bold" style={{ borderRadius: '12px' }}>
                    Envoyer ma demande
                  </button>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.60)', textAlign: 'center', marginTop: '8px' }}>
                    Confirmation rapide par WhatsApp · Aucun paiement en ligne
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
