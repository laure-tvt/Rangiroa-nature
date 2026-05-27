export type SpeciesCategory = 'fish' | 'shark' | 'ray' | 'mammal' | 'bird' | 'invertebrate' | 'plant' | 'coral';
export type SpeciesHabitat = 'lagoon' | 'ocean' | 'reef' | 'land' | 'coastal';
export type ConservationStatus = 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX' | 'DD';

export interface Species {
  id: string;
  name_common_fr: string;
  name_common_en: string;
  name_scientific: string;
  category: SpeciesCategory;
  habitat: SpeciesHabitat[];
  description: string;
  image_url: string;
  thumbnail_url: string;
  conservation_status: ConservationStatus;
  is_endemic: boolean;
  fun_fact: string;
  locations: SpeciesLocation[];
  inaturalist_id?: number;
  created_at: string;
}

export interface SpeciesLocation {
  id: string;
  species_id: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface Identification {
  id: string;
  user_id: string;
  species_id: string;
  species?: Species;
  photo_url: string;
  confidence: number;
  latitude?: number;
  longitude?: number;
  notes?: string;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  species_id: string;
  species?: Species;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  total_identifications: number;
  total_favorites: number;
  joined_at: string;
}

export interface ScanResult {
  species: Species;
  confidence: number;
  alternatives: Array<{ species: Species; confidence: number }>;
}

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  species: Species;
  count: number;
}
