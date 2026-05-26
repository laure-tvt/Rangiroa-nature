import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !username) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // useAuth().signUpWithEmail(email, password) ici
      await new Promise((r) => setTimeout(r, 1000));
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e.message ?? 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <LinearGradient
        colors={['#0c4a6e', '#0ea5e9']}
        style={{ height: 180 }}
      >
        <SafeAreaView edges={['top']} className="flex-1 px-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mt-2"
          >
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <View className="mt-4">
            <Text className="text-white text-3xl font-bold">Créer un compte</Text>
            <Text className="text-white/70 mt-1">Rejoins la communauté des explorateurs</Text>
          </View>
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
              label="Nom d'utilisateur"
              placeholder="MonPseudo"
              autoCapitalize="none"
              leftIcon="person-outline"
              value={username}
              onChangeText={setUsername}
            />
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
              placeholder="Min. 8 caractères"
              secureTextEntry
              leftIcon="lock-closed-outline"
              value={password}
              onChangeText={setPassword}
            />

            {error ? (
              <Text className="text-coral-500 text-sm">{error}</Text>
            ) : null}

            <Button
              label="Créer mon compte"
              onPress={handleRegister}
              loading={loading}
              fullWidth
              size="lg"
            />

            <TouchableOpacity onPress={() => router.back()} className="items-center mt-2">
              <Text className="text-slate-400 text-sm">
                Déjà un compte ?{' '}
                <Text className="text-ocean-500 font-semibold">Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
