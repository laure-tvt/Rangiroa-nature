import { supabase } from '../lib/supabase';
import type { Identification, ScanResult } from '../types';
import { RANGIROA_SPECIES } from '../constants/species';

export async function fetchIdentifications(userId: string): Promise<Identification[]> {
  const { data, error } = await supabase
    .from('identifications')
    .select('*, species(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Identification[];
}

export async function saveIdentification(params: {
  userId: string;
  speciesId: string;
  photoUrl: string;
  confidence: number;
  latitude?: number;
  longitude?: number;
  notes?: string;
}): Promise<void> {
  const { error } = await supabase.from('identifications').insert({
    user_id: params.userId,
    species_id: params.speciesId,
    photo_url: params.photoUrl,
    confidence: params.confidence,
    latitude: params.latitude,
    longitude: params.longitude,
    notes: params.notes,
  });
  if (error) throw error;
}

export async function uploadIdentificationPhoto(
  userId: string,
  uri: string
): Promise<string> {
  const fileName = `${userId}/${Date.now()}.jpg`;
  const response = await fetch(uri);
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from('identification-photos')
    .upload(fileName, blob, { contentType: 'image/jpeg' });

  if (error) throw error;

  const { data } = supabase.storage
    .from('identification-photos')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function identifySpecies(imageUri: string): Promise<ScanResult> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const shuffled = [...RANGIROA_SPECIES].sort(() => Math.random() - 0.5);
  const primary = shuffled[0];
  const alternatives = shuffled.slice(1, 4).map((species, i) => ({
    species,
    confidence: Math.max(0.05, 0.7 - i * 0.2 - Math.random() * 0.1),
  }));

  return {
    species: primary,
    confidence: 0.85 + Math.random() * 0.1,
    alternatives,
  };
}
