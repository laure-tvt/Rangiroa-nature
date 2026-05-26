import { supabase } from '@/lib/supabase';
import { Species, SpeciesCategory } from '@/types';

export const speciesService = {
  async getAll(category?: SpeciesCategory): Promise<Species[]> {
    let query = supabase
      .from('species')
      .select('*')
      .order('name_fr');

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
  },

  async getById(id: string): Promise<Species> {
    const { data, error } = await supabase
      .from('species')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async search(query: string): Promise<Species[]> {
    const { data, error } = await supabase
      .from('species')
      .select('*')
      .or(
        `name_fr.ilike.%${query}%,name_scientific.ilike.%${query}%,name_local.ilike.%${query}%`
      )
      .limit(20);

    if (error) throw error;
    return data ?? [];
  },

  async getWithLocation(): Promise<Species[]> {
    const { data, error } = await supabase
      .from('species')
      .select('*')
      .not('location_lat', 'is', null)
      .not('location_lng', 'is', null);

    if (error) throw error;
    return data ?? [];
  },
};
