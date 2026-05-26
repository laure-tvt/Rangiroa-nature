import { SpeciesCategory, ConservationStatus } from '@/types';

export const RANGIROA_COORDS = {
  latitude: -14.9667,
  longitude: -147.6333,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export const CATEGORY_LABELS: Record<SpeciesCategory, string> = {
  fish: 'Poisson',
  coral: 'Corail',
  mammal: 'Mammifère',
  bird: 'Oiseau',
  reptile: 'Reptile',
  invertebrate: 'Invertébré',
  plant: 'Plante',
  algae: 'Algue',
};

export const CATEGORY_ICONS: Record<SpeciesCategory, string> = {
  fish: '🐠',
  coral: '🪸',
  mammal: '🐬',
  bird: '🦅',
  reptile: '🦎',
  invertebrate: '🦀',
  plant: '🌿',
  algae: '🌊',
};

export const CONSERVATION_LABELS: Record<ConservationStatus, string> = {
  LC: 'Préoccupation mineure',
  NT: 'Quasi menacé',
  VU: 'Vulnérable',
  EN: 'En danger',
  CR: 'En danger critique',
  EW: 'Éteint à l\'état sauvage',
  EX: 'Éteint',
};

export const CONSERVATION_COLORS: Record<ConservationStatus, string> = {
  LC: '#22c55e',
  NT: '#84cc16',
  VU: '#eab308',
  EN: '#f97316',
  CR: '#ef4444',
  EW: '#7c3aed',
  EX: '#1f2937',
};

export const QUERY_KEYS = {
  species: ['species'] as const,
  speciesById: (id: string) => ['species', id] as const,
  identifications: (userId: string) => ['identifications', userId] as const,
  favorites: (userId: string) => ['favorites', userId] as const,
  profile: (userId: string) => ['profile', userId] as const,
};
