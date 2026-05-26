import { supabase } from '@/lib/supabase';
import { Identification } from '@/types';

export const identificationsService = {
  async getByUser(userId: string): Promise<Identification[]> {
    const { data, error } = await supabase
      .from('identifications')
      .select('*, species(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  },

  async create(payload: {
    userId: string;
    speciesId: string;
    imageUrl: string;
    confidence: number;
    locationLat?: number;
    locationLng?: number;
    notes?: string;
  }): Promise<Identification> {
    const { data, error } = await supabase
      .from('identifications')
      .insert({
        user_id: payload.userId,
        species_id: payload.speciesId,
        image_url: payload.imageUrl,
        confidence: payload.confidence,
        location_lat: payload.locationLat,
        location_lng: payload.locationLng,
        notes: payload.notes,
      })
      .select('*, species(*)')
      .single();

    if (error) throw error;
    return data;
  },
};
