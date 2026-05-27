import { supabase } from '../lib/supabase';
import type { Favorite } from '../types';

export async function fetchFavorites(userId: string): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('*, species(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Favorite[];
}

export async function addFavorite(userId: string, speciesId: string): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .insert({ user_id: userId, species_id: speciesId });
  if (error) throw error;
}

export async function removeFavorite(userId: string, speciesId: string): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('species_id', speciesId);
  if (error) throw error;
}

export async function isFavorite(userId: string, speciesId: string): Promise<boolean> {
  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('species_id', speciesId)
    .single();
  return !!data;
}
