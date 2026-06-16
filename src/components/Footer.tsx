import { Heart } from 'lucide-react'

const links = {
  Visites: ['Tour du Grand Lagon', 'Motus Secrets', 'Coucher de Soleil', 'Découverte Complète'],
  Informations: ['À propos de nous', 'Comment ça marche', 'Politique d\'annulation', 'FAQ'],
  Contact: ['contact@rangiroa-nature.pf', '+689 87 65 43 21', 'Avatoru, Rangiroa', 'Polynésie française'],
}

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: '#D4AF37' }}
              >
                R
              </div>
              <div>
                <div
                  className="text-white font-bold leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px' }}
                >
                  Rangiroa Nature
                </div>
                <div className="text-xs tracking-widest uppercase" style={{ color: '#D4AF37', opacity: 0.8 }}>
                  Visites Guidées
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Découvrez l'atoll de Rangiroa avec un guide local passionné.
              Circuits privés, expériences authentiques depuis 2014.
            </p>
            <button
              onClick={() => handleNav('#reservation')}
              className="btn-primary text-sm"
            >
              Réserver maintenant
            </button>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h5
                className="text-white font-semibold text-sm mb-4 tracking-wide"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {category}
              </h5>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-default">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div
          className="h-px mb-8 opacity-20"
          style={{ backgroundColor: '#D4AF37' }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Rangiroa Nature. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            Fait avec <Heart size={12} fill="#D4AF37" style={{ color: '#D4AF37' }} /> en Polynésie française
          </p>
          <div className="flex gap-4">
            {['Mentions légales', 'Confidentialité'].map((link) => (
              <span key={link} className="text-gray-500 text-xs hover:text-white transition-colors cursor-pointer">
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
