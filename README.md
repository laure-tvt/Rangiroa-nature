# Rangiroa Explorer 🌊

Application mobile iOS pour identifier la faune et la flore de l'atoll de Rangiroa.

## Stack

- **React Native** avec Expo SDK 53
- **TypeScript**
- **Expo Router** (navigation)
- **NativeWind** (Tailwind CSS pour React Native)
- **Supabase** (auth, database, storage)
- **React Query** (data fetching & cache)

## Architecture

```
app/                    # Routes Expo Router
├── (tabs)/             # Navigation par onglets
│   ├── index.tsx       # Accueil
│   ├── scanner.tsx     # Scanner / identification
│   ├── map.tsx         # Carte des espèces
│   ├── favorites.tsx   # Favoris
│   └── profile.tsx     # Profil utilisateur
├── (auth)/             # Authentification
│   ├── login.tsx
│   └── register.tsx
└── species/[id].tsx    # Détail d'une espèce

src/
├── components/ui/      # Composants réutilisables
├── constants/          # Constantes (catégories, couleurs…)
├── hooks/              # Hooks React
├── lib/                # Clients (Supabase, React Query)
├── services/           # Appels API Supabase
├── types/              # Types TypeScript
└── utils/              # Fonctions utilitaires

supabase/
└── schema.sql          # Schéma base de données
```

## Installation

```bash
npm install
```

## Configuration

Copie `.env.example` en `.env` et remplis tes clés Supabase :

```bash
cp .env.example .env
```

## Lancer le projet

```bash
npm start        # Expo Go (scan QR)
npm run ios      # Simulateur iOS
```

## Supabase

Exécute `supabase/schema.sql` dans l'éditeur SQL de ton projet Supabase.
