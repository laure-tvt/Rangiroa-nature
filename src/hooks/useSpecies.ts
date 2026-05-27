import { useQuery } from '@tanstack/react-query';
import { speciesService } from '@/services/species';
import { QUERY_KEYS } from '@/constants';
import { SpeciesCategory } from '@/types';

export function useSpecies(category?: SpeciesCategory) {
  return useQuery({
    queryKey: category ? [...QUERY_KEYS.species, category] : QUERY_KEYS.species,
    queryFn: () => speciesService.getAll(category),
  });
}

export function useSpeciesById(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.speciesById(id),
    queryFn: () => speciesService.getById(id),
    enabled: !!id,
  });
}

export function useSpeciesSearch(query: string) {
  return useQuery({
    queryKey: [...QUERY_KEYS.species, 'search', query],
    queryFn: () => speciesService.search(query),
    enabled: query.length >= 2,
  });
}
