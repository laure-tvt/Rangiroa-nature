import { supabase } from '../lib/supabase';
import { RANGIROA_SPECIES } from '../constants/species';
import type { Species, SpeciesCategory } from '../types';

export async function fetchAllSpecies(): Promise<Species[]> {
  try {
    const { data, error } = await supabase
      .from('species')
      .select('*, locations:species_locations(*)')
      .order('name_common_fr');
    if (error || !data?.length) return RANGIROA_SPECIES;
    return data as Species[];
  } catch {
    return RANGIROA_SPECIES;
  }
}

export async function fetchSpeciesById(id: string): Promise<Species | null> {
  const local = RANGIROA_SPECIES.find(s => s.id === id);
  try {
    const { data, error } = await supabase
      .from('species')
      .select('*, locations:species_locations(*)')
      .eq('id', id)
      .single();
    if (error || !data) return local ?? null;
    return data as Species;
  } catch {
    return local ?? null;
  }
}

export async function fetchSpeciesByCategory(category: SpeciesCategory): Promise<Species[]> {
  const local = RANGIROA_SPECIES.filter(s => s.category === category);
  try {
    const { data, error } = await supabase
      .from('species')
      .select('*, locations:species_locations(*)')
      .eq('category', category);
    if (error || !data?.length) return local;
    return data as Species[];
  } catch {
    return local;
  }
}

export async function searchSpecies(query: string): Promise<Species[]> {
  const q = query.toLowerCase();
  return RANGIROA_SPECIES.filter(s =>
    s.name_common_fr.toLowerCase().includes(q) ||
    s.name_common_en.toLowerCase().includes(q) ||
    s.name_scientific.toLowerCase().includes(q)
  );
}
