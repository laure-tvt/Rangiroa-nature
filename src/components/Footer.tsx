import { Heart } from 'lucide-react'

const links = {
  Visite: ["Tour de l'Île (2h30)", '6 arrêts incontournables', 'Français & Anglais', 'Pick-up inclus'],
  Informations: ['À propos de nous', 'Comment ça marche', "Politique d'annulation", 'FAQ'],
  Contact: ['tevaiti.van.tours@gmail.com', '+689 87 36 32 13', 'Avatoru, Rangiroa', 'Polynésie française'],
}

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ backgroundColor: '#0d0d0d' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ backgroundColor: '#C46926', color: '#000000' }}
              >
                T
              </div>
              <div>
                <div
                  className="text-white font-bold leading-tight"
                  style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '17px', fontWeight: 700 }}
                >
                  Tevaiti Van Tours
                </div>
                <div className="text-xs tracking-widest uppercase" style={{ color: '#C46926', opacity: 0.8 }}>
                  Rangiroa · Visites Guidées
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
              Visite guidée privée de l'atoll de Rangiroa en van climatisé.
              6 arrêts, 2h30, en français et en anglais. Pick-up inclus.
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
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
              >
                {category}
              </h5>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <span className="text-gray-400 text-sm hover:text-white transition-colors cursor-default" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 400 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ backgroundColor: 'rgba(196,105,38,0.15)' }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            © {new Date().getFullYear()} Rangiroa Nature. Tous droits réservés.
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Fait avec <Heart size={12} fill="#C46926" style={{ color: '#C46926' }} /> en Polynésie française
          </p>
          <div className="flex gap-4">
            {['Mentions légales', 'Confidentialité'].map((link) => (
              <span key={link} className="text-gray-500 text-xs hover:text-white transition-colors cursor-pointer" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {link}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
