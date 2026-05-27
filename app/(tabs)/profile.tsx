import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from '../../src/hooks/useColorScheme';

const DEMO_STATS = { identifications: 12, favorites: 4, species_seen: 8, joined: 'Mai 2024' };

export default function ProfileScreen() {
  const { colors, colorScheme } = useColorScheme();
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>👤 Profil</Text>
        </View>
        <View style={styles.guestContainer}>
          <Text style={styles.guestEmoji}>🌊</Text>
          <Text style={[styles.guestTitle, { color: colors.text }]}>Rejoignez la communauté</Text>
          <Text style={[styles.guestText, { color: colors.textSecondary }]}>Créez un compte pour sauvegarder vos identifications et suivre votre exploration de Rangiroa.</Text>
          <TouchableOpacity style={[styles.loginBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/(auth)/login')} activeOpacity={0.85}>
            <Text style={styles.loginBtnText}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.registerBtn, { borderColor: colors.primary }]} onPress={() => router.push('/(auth)/register')} activeOpacity={0.85}>
            <Text style={[styles.registerBtnText, { color: colors.primary }]}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.profileHeader, { backgroundColor: colors.primary }]}>
          <View style={styles.avatar}><Text style={styles.avatarText}>L</Text></View>
          <Text style={styles.profileName}>Laure</Text>
          <Text style={styles.profileEmail}>laure@example.com</Text>
          <Text style={styles.profileJoined}>Membre depuis {DEMO_STATS.joined}</Text>
        </View>
        <View style={[styles.statsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {[
            { label: 'Identifications', value: DEMO_STATS.identifications, emoji: '📸' },
            { label: 'Espèces', value: DEMO_STATS.species_seen, emoji: '🌊' },
            { label: 'Favoris', value: DEMO_STATS.favorites, emoji: '❤️' },
          ].map((stat, i) => (
            <View key={i} style={[styles.statItem, i < 2 && { borderRightColor: colors.border, borderRightWidth: 1 }]}>
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>🏆 Badges</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.badgesRow}>
            {[{ emoji: '🐬', label: 'Première ID' }, { emoji: '🦈', label: 'Chasseur de requins' }, { emoji: '🌴', label: 'Explorateur' }, { emoji: '🪸', label: 'Ami des coraux' }].map((badge, i) => (
              <View key={i} style={[styles.badge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                <Text style={[styles.badgeLabel, { color: colors.textSecondary }]}>{badge.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>⚙️ Réglages</Text>
          <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {[
              { label: 'Thème', value: colorScheme === 'dark' ? '🌙 Sombre' : '☀️ Clair' },
              { label: 'Notifications', value: 'Activées' },
              { label: 'Langue', value: 'Français' },
            ].map((item, i) => (
              <View key={i} style={[styles.settingRow, i < 2 && { borderBottomColor: colors.border, borderBottomWidth: 1 }]}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>{item.label}</Text>
                <Text style={[styles.settingValue, { color: colors.textSecondary }]}>{item.value} ›</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={[styles.logoutBtn, { borderColor: colors.error }]}
          onPress={() => Alert.alert('Déconnexion', 'Voulez-vous vous déconnecter ?', [{ text: 'Annuler', style: 'cancel' }, { text: 'Déconnecter', style: 'destructive', onPress: () => {} }])}
          activeOpacity={0.8}
        >
          <Text style={[styles.logoutText, { color: colors.error }]}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  guestContainer: { flex: 1, padding: 32, alignItems: 'center', justifyContent: 'center', gap: 16 },
  guestEmoji: { fontSize: 72 },
  guestTitle: { fontSize: 24, fontWeight: '800' },
  guestText: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  loginBtn: { width: '100%', paddingVertical: 15, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  registerBtn: { width: '100%', paddingVertical: 15, borderRadius: 14, alignItems: 'center', borderWidth: 2 },
  registerBtnText: { fontSize: 16, fontWeight: '700' },
  profileHeader: { alignItems: 'center', paddingTop: 24, paddingBottom: 32, paddingHorizontal: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 32, color: '#FFF', fontWeight: '700' },
  profileName: { fontSize: 22, fontWeight: '800', color: '#FFF' },
  profileEmail: { fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  profileJoined: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 },
  statsCard: { flexDirection: 'row', marginHorizontal: 16, marginTop: -16, borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 16, gap: 4 },
  statEmoji: { fontSize: 20 },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 11, fontWeight: '500' },
  section: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  badgesRow: { gap: 10 },
  badge: { alignItems: 'center', padding: 14, borderRadius: 16, borderWidth: 1, width: 90, gap: 6 },
  badgeEmoji: { fontSize: 28 },
  badgeLabel: { fontSize: 10, fontWeight: '600', textAlign: 'center' },
  settingsCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  settingLabel: { fontSize: 15, fontWeight: '500' },
  settingValue: { fontSize: 14 },
  logoutBtn: { marginHorizontal: 16, marginTop: 24, marginBottom: 32, paddingVertical: 14, borderRadius: 14, alignItems: 'center', borderWidth: 1.5 },
  logoutText: { fontSize: 15, fontWeight: '700' },
});
