import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-900 items-center justify-center px-6">
      <Text className="text-6xl mb-4">🌊</Text>
      <Text className="text-slate-900 dark:text-white text-2xl font-bold text-center mb-2">
        Page introuvable
      </Text>
      <Text className="text-slate-500 text-sm text-center mb-8">
        Cette page n'existe pas dans Rangiroa Explorer.
      </Text>
      <Button label="Retour à l'accueil" onPress={() => router.replace('/')} />
    </SafeAreaView>
  );
}
