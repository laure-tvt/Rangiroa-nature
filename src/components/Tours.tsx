import { useState } from 'react'
import { Heart, Bed, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react'

const properties = [
  {
    id: 1, type: 'Villa', status: 'Vente',
    price: '95 000 000 XPF', priceEur: '795 000 €',
    title: 'Villa contemporaine vue lagon',
    location: 'Bora Bora, Iles Sous-le-Vent',
    beds: 4, baths: 3, surface: 320, featured: true,
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  },
  {
    id: 2, type: 'Bungalow', status: 'Vente',
    price: '42 000 000 XPF', priceEur: '352 000 €',
    title: 'Bungalow sur pilotis — accès lagon',
    location: 'Moorea, Iles du Vent',
    beds: 2, baths: 2, surface: 95, featured: false,
    img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  },
  {
    id: 3, type: 'Maison', status: 'Location',
    price: '280 000 XPF/mois', priceEur: '2 350 €/mois',
    title: 'Maison familiale avec jardin tropical',
    location: 'Papeete, Tahiti',
    beds: 3, baths: 2, surface: 180, featured: false,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    id: 4, type: 'Terrain', status: 'Vente',
    price: '12 500 000 XPF', priceEur: '105 000 €',
    title: 'Terrain vue mer — 1 200 m²',
    location: 'Rangiroa, Tuamotu',
    beds: 0, baths: 0, surface: 1200, featured: false,
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    id: 5, type: 'Villa', status: 'Vente',
    price: '128 000 000 XPF', priceEur: '1 072 000 €',
    title: 'Villa de prestige — piscine à débordement',
    location: 'Arue, Tahiti',
    beds: 5, baths: 4, surface: 450, featured: true,
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    id: 6, type: 'Appartement', status: 'Location',
    price: '150 000 XPF/mois', priceEur: '1 260 €/mois',
    title: 'Appartement moderne centre-ville',
    location: 'Papeete, Tahiti',
    beds: 2, baths: 1, surface: 75, featured: false,
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  },
]

type FilterTab = 'Tous' | 'Vente' | 'Location'

export default function Tours() {
  const [activeTab, setActiveTab] = useState<FilterTab>('Tous')
  const [liked, setLiked] = useState<number[]>([])

  const filtered = activeTab === 'Tous' ? properties : properties.filter((p) => p.status === activeTab)
  const toggleLike = (id: number) =>
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <section id="biens" className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div data-reveal className="section-label">Annonces immobilières</div>
            <h2
              data-reveal
              data-delay="100"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}
            >
              Biens en <span style={{ color: '#6F4F28' }}>vedette</span>
            </h2>
          </div>
          <div data-reveal data-delay="150" className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(111,79,40,0.2)' }}>
            {(['Tous', 'Vente', 'Location'] as FilterTab[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 600,
                  backgroundColor: activeTab === tab ? '#6F4F28' : 'transparent',
                  color: activeTab === tab ? '#ffffff' : 'rgba(255,255,255,0.45)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((p, idx) => (
            <div
              key={p.id}
              className="card-dark overflow-hidden group cursor-pointer"
              data-reveal="scale"
              data-delay={String(idx * 100)}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: p.status === 'Vente' ? '#6F4F28' : '#2a2a2a', color: '#fff' }}>
                    {p.status}
                  </span>
                  {p.featured && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#6F4F28', border: '1px solid rgba(111,79,40,0.5)' }}>
                      Coup de cœur
                    </span>
                  )}
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleLike(p.id) }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: 'none', cursor: 'pointer' }}>
                  <Heart size={14} fill={liked.includes(p.id) ? '#6F4F28' : 'none'}
                    style={{ color: liked.includes(p.id) ? '#6F4F28' : 'rgba(255,255,255,0.7)' }} />
                </button>
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-xs font-medium"
                  style={{ backgroundColor: 'rgba(0,0,0,0.65)', color: 'rgba(255,255,255,0.75)' }}>
                  {p.type}
                </span>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '15px', color: '#ffffff', lineHeight: 1.3, marginBottom: '6px' }}>
                  {p.title}
                </h3>
                <div className="flex items-center gap-1 mb-4">
                  <MapPin size={12} style={{ color: '#6F4F28', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{p.location}</span>
                </div>
                <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {p.beds > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Bed size={13} style={{ color: 'rgba(255,255,255,0.35)' }} />
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{p.beds} ch.</span>
                    </div>
                  )}
                  {p.baths > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Bath size={13} style={{ color: 'rgba(255,255,255,0.35)' }} />
                      <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{p.baths} sdb.</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Maximize2 size={13} style={{ color: 'rgba(255,255,255,0.35)' }} />
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{p.surface} m²</span>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '17px', color: '#6F4F28' }}>{p.price}</div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{p.priceEur}</div>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#6F4F28')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)')}>
                    Voir <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" data-reveal data-delay="200">
          <button className="btn-outline px-10 py-4 text-base">Voir tous les biens</button>
        </div>
      </div>
    </section>
  )
}
