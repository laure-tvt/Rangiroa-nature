import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // useAuth().signInWithEmail(email, password) ici
      await new Promise((r) => setTimeout(r, 1000));
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e.message ?? 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <LinearGradient
        colors={['#0c4a6e', '#0ea5e9']}
        style={{ height: 220 }}
      >
        <SafeAreaView edges={['top']} className="flex-1 px-5 justify-end pb-8">
          <Text className="text-white text-3xl font-bold">Bonjour 👋</Text>
          <Text className="text-white/70 mt-1">Connecte-toi pour explorer Rangiroa</Text>
        </SafeAreaView>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-5 pt-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-4">
            <Input
              label="Email"
              placeholder="ton@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon="mail-outline"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Mot de passe"
              placeholder="••••••••"
              secureTextEntry
              leftIcon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
            />

            {error ? (
              <Text className="text-coral-500 text-sm">{error}</Text>
            ) : null}

            <Button
              label="Se connecter"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              size="lg"
            />

            <View className="flex-row items-center gap-3 my-2">
              <View className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
              <Text className="text-slate-400 text-sm">ou</Text>
              <View className={`flex-1 h-px ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            </View>

            <Button
              label="Créer un compte"
              variant="outline"
              onPress={() => router.push('/(auth)/register')}
              fullWidth
              size="lg"
            />

            <Text className="text-center text-slate-400 text-xs mt-4">
              En continuant, tu acceptes nos conditions d'utilisation et notre politique de confidentialité.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
