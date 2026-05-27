import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { useAuth } from '../../src/hooks/useAuth';

export default function LoginScreen() {
  const { colors } = useColorScheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { Alert.alert('Erreur', 'Veuillez remplir tous les champs.'); return; }
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Connexion impossible', error.message ?? 'Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>‹ Retour</Text>
          </TouchableOpacity>
          <View style={styles.heroSection}>
            <Text style={styles.heroEmoji}>🌊</Text>
            <Text style={[styles.title, { color: colors.text }]}>Connexion</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Accédez à votre espace Rangiroa Nature</Text>
          </View>
          <View style={styles.form}>
            <View>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <TextInput style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} value={email} onChangeText={setEmail} placeholder="votre@email.com" placeholderTextColor={colors.textTertiary} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
            </View>
            <View>
              <Text style={[styles.label, { color: colors.text }]}>Mot de passe</Text>
              <TextInput style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} value={password} onChangeText={setPassword} placeholder="••••••••" placeholderTextColor={colors.textTertiary} secureTextEntry />
            </View>
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }, loading && styles.disabled]} onPress={handleLogin} disabled={loading} activeOpacity={0.85}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitBtnText}>Se connecter</Text>}
            </TouchableOpacity>
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.textTertiary }]}>ou</Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>
            <TouchableOpacity style={[styles.registerBtn, { borderColor: colors.primary }]} onPress={() => router.push('/(auth)/register')} activeOpacity={0.85}>
              <Text style={[styles.registerBtnText, { color: colors.primary }]}>Créer un compte</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  scroll: { padding: 24, flexGrow: 1 },
  backBtn: { marginBottom: 24 },
  backText: { fontSize: 17, fontWeight: '600' },
  heroSection: { alignItems: 'center', marginBottom: 40, gap: 8 },
  heroEmoji: { fontSize: 60, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, textAlign: 'center' },
  form: { gap: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1.5, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  submitBtn: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  disabled: { opacity: 0.6 },
  submitBtnText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13 },
  registerBtn: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', borderWidth: 2 },
  registerBtnText: { fontSize: 17, fontWeight: '700' },
});
