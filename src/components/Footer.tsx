import { Heart } from 'lucide-react'

const links = {
  'Acheter': ['Villas', 'Maisons', 'Appartements', 'Terrains', 'Bungalows'],
  'Destinations': ['Tahiti', 'Moorea', 'Bora Bora', 'Rangiroa', 'Huahine'],
  'Informations': ["Guide de l'acheteur", 'Financement', 'Mentions légales', 'Confidentialité', 'FAQ'],
  'Contact': ['+689 40 50 60 70', 'contact@find-polynesie.pf', 'Papeete, Tahiti', 'Polynésie française'],
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(111,79,40,0.12)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1" data-reveal>
            <div className="flex items-baseline gap-1.5 mb-4">
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: '22px', color: '#6F4F28', letterSpacing: '0.06em' }}>FIND</span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '18px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em' }}>POLYNÉSIE</span>
            </div>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, marginBottom: '20px' }}>
              Le premier portail immobilier de Polynésie française. Villas, bungalows, terrains et appartements dans tout l'archipel.
            </p>
            <button
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#6F4F28', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '50px', fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '12px', cursor: 'pointer', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#8B6535')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = '#6F4F28')}
            >
              Publier une annonce
            </button>
          </div>

          {/* Links */}
          {Object.entries(links).map(([cat, items], i) => (
            <div key={cat} data-reveal data-delay={String((i + 1) * 80)}>
              <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px', color: '#ffffff', marginBottom: '14px', letterSpacing: '0.04em' }}>
                {cat}
              </h5>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.38)', cursor: 'default', transition: 'color 0.2s' }}
                      className="hover:text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px mb-8" style={{ backgroundColor: 'rgba(111,79,40,0.1)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)' }}>
            © {new Date().getFullYear()} FIND Polynésie. Tous droits réservés.
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Fait avec <Heart size={11} fill="#6F4F28" style={{ color: '#6F4F28' }} /> en Polynésie française
          </p>
          <div className="flex gap-5">
            {['Mentions légales', 'Confidentialité', 'CGU'].map((l) => (
              <span key={l} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)', cursor: 'pointer' }}
                className="hover:text-white transition-colors">{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
