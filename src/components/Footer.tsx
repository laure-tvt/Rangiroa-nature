import { Heart } from 'lucide-react'

const links = {
  'Le tour': ['Les 6 arrêts', 'Partie 1 — Peuplement', 'Partie 2 — Légendes', 'Tarifs', 'FAQ'],
  'Infos pratiques': ['Pick-up inclus', 'Boisson incluse', 'Durée 2h30', 'FR / EN', 'Accessible familles'],
  'Contact': ['+689 87 36 32 13', 'tevaiti.van.tours@gmail.com', 'Rangiroa, Tuamotu', 'Polynésie française'],
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(111,79,40,0.12)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-3 gap-6 mb-12">

          {/* Links */}
          {Object.entries(links).map(([cat, items], i) => (
            <div key={cat} data-reveal data-delay={String((i + 1) * 80)}>
              <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', color: '#ffffff', marginBottom: '14px', letterSpacing: '0.04em' }}>
                {cat}
              </h5>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.70)', cursor: 'default', transition: 'color 0.2s' }}
                      className="hover:text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px mb-8" style={{ backgroundColor: 'rgba(111,79,40,0.1)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>
            © {new Date().getFullYear()} Tevaiti Van Tours Rangiroa. Tous droits réservés.
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Fait avec <Heart size={11} fill="#6F4F28" style={{ color: '#6F4F28' }} /> à Rangiroa
          </p>
          <div className="flex gap-5">
            {['Mentions légales', 'Confidentialité'].map((l) => (
              <span key={l} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}
                className="hover:text-white transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
