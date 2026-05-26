import { supabase } from '@/lib/supabase';
import { Favorite } from '@/types';

export const favoritesService = {
  async getByUser(userId: string): Promise<Favorite[]> {
    const { data, error } = await supabase
      .from('favorites')
      .select('*, species(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async add(userId: string, speciesId: string): Promise<Favorite> {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, species_id: speciesId })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async remove(userId: string, speciesId: string): Promise<void> {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('species_id', speciesId);

    if (error) throw error;
  },

  async isFavorite(userId: string, speciesId: string): Promise<boolean> {
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('species_id', speciesId)
      .single();

    return !!data;
  },
};
