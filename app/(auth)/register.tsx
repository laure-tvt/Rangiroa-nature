import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { useAuth } from '../../src/hooks/useAuth';

export default function RegisterScreen() {
  const { colors } = useColorScheme();
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirm) { Alert.alert('Erreur', 'Veuillez remplir tous les champs.'); return; }
    if (password !== confirm) { Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.'); return; }
    if (password.length < 6) { Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.'); return; }
    setLoading(true);
    try {
      await signUp(email, password, username);
      Alert.alert('Compte créé !', 'Vérifiez votre email pour confirmer votre inscription.', [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]);
    } catch (error: any) {
      Alert.alert('Erreur', error.message ?? 'Impossible de créer le compte.');
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
            <Text style={styles.heroEmoji}>🐬</Text>
            <Text style={[styles.title, { color: colors.text }]}>Créer un compte</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Rejoignez les explorateurs de Rangiroa</Text>
          </View>
          <View style={styles.form}>
            {[
              { label: 'Pseudo', value: username, setter: setUsername, placeholder: 'Votre pseudo', options: {} },
              { label: 'Email', value: email, setter: setEmail, placeholder: 'votre@email.com', options: { keyboardType: 'email-address' as const, autoCapitalize: 'none' as const } },
              { label: 'Mot de passe', value: password, setter: setPassword, placeholder: '••••••••', options: { secureTextEntry: true } },
              { label: 'Confirmer le mot de passe', value: confirm, setter: setConfirm, placeholder: '••••••••', options: { secureTextEntry: true } },
            ].map((field) => (
              <View key={field.label}>
                <Text style={[styles.label, { color: colors.text }]}>{field.label}</Text>
                <TextInput style={[styles.input, { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text }]} value={field.value} onChangeText={field.setter} placeholder={field.placeholder} placeholderTextColor={colors.textTertiary} {...field.options} />
              </View>
            ))}
            <TouchableOpacity style={[styles.submitBtn, { backgroundColor: colors.primary }, loading && styles.disabled]} onPress={handleRegister} disabled={loading} activeOpacity={0.85}>
              {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitBtnText}>Créer mon compte</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.loginLink} activeOpacity={0.7}>
              <Text style={[styles.loginLinkText, { color: colors.textSecondary }]}>Déjà un compte ? <Text style={{ color: colors.primary, fontWeight: '700' }}>Se connecter</Text></Text>
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
  heroSection: { alignItems: 'center', marginBottom: 32, gap: 8 },
  heroEmoji: { fontSize: 60, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, textAlign: 'center' },
  form: { gap: 20 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1.5, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  submitBtn: { paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  disabled: { opacity: 0.6 },
  submitBtnText: { color: '#FFF', fontSize: 17, fontWeight: '700' },
  loginLink: { alignItems: 'center', paddingVertical: 8 },
  loginLinkText: { fontSize: 15 },
});
