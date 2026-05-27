# 🌊 Rangiroa Nature

Application mobile iOS/Android pour identifier la faune et la flore de l'atoll de Rangiroa (Polynésie française), comme Shazam le fait pour la musique.

## Stack technique

- **React Native** avec Expo SDK 56
- **TypeScript strict**
- **Expo Router v3** (navigation par fichiers)
- **NativeWind v4** (Tailwind CSS)
- **Supabase** (auth, database, storage)
- **React Query v5**
- **EAS Build** (publication App Store)

## Features

| Feature | Statut |
|---------|--------|
| 📸 Scanner IA (caméra + galerie) | ✅ |
| 🗺️ Carte des points d'observation | ✅ |
| ❤️ Favoris | ✅ |
| 👤 Profil & historique | ✅ |
| 🔐 Auth (Supabase) | ✅ |
| 🌙 Thème clair/sombre | ✅ |
| 20 espèces Rangiroa pré-chargées | ✅ |

## Lancement rapide

### Prérequis

- Node.js 18+
- Expo CLI : `npm install -g expo-cli`
- Application Expo Go sur votre iPhone/Android

### Installation

```bash
git clone <repo>
cd rangiroa-nature
npm install
cp .env.example .env
```

### Variables d'environnement

Créez un projet sur [supabase.com](https://supabase.com) et remplissez `.env` :

```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### Base de données Supabase

Exécutez `supabase/schema.sql` dans l'éditeur SQL de votre projet Supabase.
Ce script crée les tables, active le RLS, configure le storage et insère les 20 espèces.

### Démarrer l'application

```bash
npm start
# Scannez le QR code avec Expo Go
```

## Structure du projet

```
app/
├── _layout.tsx           # Root layout (QueryClient, StatusBar)
├── (tabs)/
│   ├── _layout.tsx       # Tab bar configuration
│   ├── index.tsx         # Accueil — liste des espèces
│   ├── scanner.tsx       # Scanner IA
│   ├── map.tsx           # Carte des observations
│   ├── favorites.tsx     # Espèces favorites
│   └── profile.tsx       # Profil utilisateur
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
└── species/[id].tsx      # Fiche détail espèce

src/
├── components/ui/        # SpeciesCard, Button, SearchBar, CategoryPill
├── constants/
│   ├── species.ts        # 20 espèces de Rangiroa + labels
│   └── theme.ts          # Palette de couleurs clair/sombre
├── hooks/
│   ├── useAuth.ts        # Supabase auth
│   └── useColorScheme.ts
├── lib/
│   ├── supabase.ts       # Client Supabase
│   └── queryClient.ts    # React Query config
├── services/
│   ├── species.ts
│   ├── favorites.ts
│   └── identifications.ts
└── types/index.ts        # Types TypeScript complets
```

## Build App Store (EAS)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform ios
```

## Identification des espèces

L'identification utilise actuellement un mock. Pour la production, connecter l'API iNaturalist Vision :

```
POST https://api.inaturalist.org/v1/computervision/score_image
```

Avec l'image encodée en base64 et le paramètre `lat`/`lng` pour filtrer sur Rangiroa.

## Données

Les 20 espèces représentatives couvrent :
- **Faune marine** : dauphins, 3 espèces de requins, 2 raies, tortue verte, murène, barracuda, napoléon, poisson-coffre, baliste, poisson-clown, bénitier
- **Faune terrestre** : crabe de cocotier, frégate superbe, noddi brun
- **Flore** : cocotier, pandanus
- **Coraux** : corail cerveau
