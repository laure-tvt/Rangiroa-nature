export type Species = {
  id: string;
  created_at: string;
  updated_at: string;
  name_fr: string;
  name_local: string;
  name_scientific: string;
  category: SpeciesCategory;
  description: string;
  habitat: string;
  conservation_status: ConservationStatus;
  images: string[];
  is_dangerous: boolean;
  fun_facts: string[];
  location_lat?: number;
  location_lng?: number;
};

export type SpeciesCategory =
  | 'fish'
  | 'coral'
  | 'mammal'
  | 'bird'
  | 'reptile'
  | 'invertebrate'
  | 'plant'
  | 'algae';

export type ConservationStatus =
  | 'LC'  // Least Concern
  | 'NT'  // Near Threatened
  | 'VU'  // Vulnerable
  | 'EN'  // Endangered
  | 'CR'  // Critically Endangered
  | 'EW'  // Extinct in the Wild
  | 'EX'; // Extinct

export type Identification = {
  id: string;
  created_at: string;
  user_id: string;
  species_id: string;
  species?: Species;
  image_url: string;
  confidence: number;
  location_lat?: number;
  location_lng?: number;
  notes?: string;
};

export type Favorite = {
  id: string;
  created_at: string;
  user_id: string;
  species_id: string;
  species?: Species;
};

export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
  avatar_url?: string;
  identifications_count: number;
  favorites_count: number;
  bio?: string;
};

export type MapMarker = {
  id: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  species: Species;
};
