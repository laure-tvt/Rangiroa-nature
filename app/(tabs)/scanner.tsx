import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  ActivityIndicator, ScrollView, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useColorScheme } from '../../src/hooks/useColorScheme';
import { identifySpecies } from '../../src/services/identifications';
import type { ScanResult } from '../../src/types';

type ScanState = 'idle' | 'scanning' | 'result';

export default function ScannerScreen() {
  const { colors } = useColorScheme();
  const [state, setState] = useState<ScanState>('idle');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);

  const pickImage = async (source: 'camera' | 'gallery') => {
    try {
      let pickerResult;
      if (source === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission requise', 'Autorisez l\'accès à la caméra.');
          return;
        }
        pickerResult = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.85,
          allowsEditing: true,
          aspect: [4, 3],
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission requise', 'Autorisez l\'accès à la galerie.');
          return;
        }
        pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.85,
          allowsEditing: true,
          aspect: [4, 3],
        });
      }
      if (!pickerResult.canceled && pickerResult.assets[0]) {
        const uri = pickerResult.assets[0].uri;
        setImageUri(uri);
        setState('scanning');
        const scanResult = await identifySpecies(uri);
        setResult(scanResult);
        setState('result');
      }
    } catch {
      Alert.alert('Erreur', 'Impossible d\'analyser l\'image.');
      setState('idle');
    }
  };

  const reset = () => { setState('idle'); setImageUri(null); setResult(null); };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>📸 Scanner IA</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Identifiez la faune et flore de Rangiroa</Text>
      </View>

      {state === 'idle' && (
        <View style={styles.idleContainer}>
          <View style={[styles.scanArea, { borderColor: colors.primary }]}>
            <Text style={styles.scanEmoji}>🌊</Text>
            <Text style={[styles.scanHint, { color: colors.textSecondary }]}>Prenez une photo ou importez depuis votre galerie</Text>
          </View>
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary }]} onPress={() => pickImage('camera')} activeOpacity={0.85}>
              <Text style={styles.actionBtnEmoji}>📷</Text>
              <Text style={styles.actionBtnText}>Caméra</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.surface, borderColor: colors.primary, borderWidth: 2 }]} onPress={() => pickImage('gallery')} activeOpacity={0.85}>
              <Text style={styles.actionBtnEmoji}>🖼️</Text>
              <Text style={[styles.actionBtnText, { color: colors.primary }]}>Galerie</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.tipCard, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
            <Text style={[styles.tipTitle, { color: colors.text }]}>💡 Conseils pour une bonne identification</Text>
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>• Photo nette, bien éclairée</Text>
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>• Sujet centré et visible en entier</Text>
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>• Évitez les contre-jours</Text>
          </View>
        </View>
      )}

      {state === 'scanning' && (
        <View style={styles.scanningContainer}>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />}
          <View style={[styles.scanningOverlay, { backgroundColor: colors.surface }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.scanningText, { color: colors.text }]}>Analyse en cours...</Text>
            <Text style={[styles.scanningSubText, { color: colors.textSecondary }]}>Identification par intelligence artificielle</Text>
          </View>
        </View>
      )}

      {state === 'result' && result && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.resultImage} resizeMode="cover" />}
          <View style={[styles.resultMain, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.confidenceText, { color: colors.primary }]}>{Math.round(result.confidence * 100)}% de confiance</Text>
            <TouchableOpacity onPress={() => router.push(`/species/${result.species.id}`)} activeOpacity={0.85}>
              <Text style={[styles.resultName, { color: colors.text }]}>{result.species.name_common_fr}</Text>
              <Text style={[styles.resultScientific, { color: colors.textSecondary }]}>{result.species.name_scientific}</Text>
            </TouchableOpacity>
            <Text style={[styles.resultDescription, { color: colors.textSecondary }]} numberOfLines={3}>{result.species.description}</Text>
            <TouchableOpacity style={[styles.detailBtn, { backgroundColor: colors.primary }]} onPress={() => router.push(`/species/${result.species.id}`)} activeOpacity={0.85}>
              <Text style={styles.detailBtnText}>Voir la fiche complète →</Text>
            </TouchableOpacity>
          </View>
          {result.alternatives.length > 0 && (
            <View style={styles.alternativesSection}>
              <Text style={[styles.altTitle, { color: colors.text }]}>Autres possibilités</Text>
              {result.alternatives.map((alt, i) => (
                <TouchableOpacity key={i} style={[styles.altCard, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => router.push(`/species/${alt.species.id}`)} activeOpacity={0.85}>
                  <Image source={{ uri: alt.species.thumbnail_url }} style={styles.altImage} resizeMode="cover" />
                  <View style={styles.altContent}>
                    <Text style={[styles.altName, { color: colors.text }]}>{alt.species.name_common_fr}</Text>
                    <Text style={[styles.altScientific, { color: colors.textSecondary }]}>{alt.species.name_scientific}</Text>
                  </View>
                  <Text style={[styles.altConfidence, { color: colors.primary }]}>{Math.round(alt.confidence * 100)}%</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity style={[styles.resetBtn, { borderColor: colors.primary }]} onPress={reset} activeOpacity={0.8}>
            <Text style={[styles.resetBtnText, { color: colors.primary }]}>📸 Nouvelle identification</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, marginTop: 2 },
  idleContainer: { flex: 1, padding: 20, gap: 20 },
  scanArea: { flex: 1, borderWidth: 2, borderStyle: 'dashed', borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 220 },
  scanEmoji: { fontSize: 64 },
  scanHint: { fontSize: 15, textAlign: 'center', paddingHorizontal: 32 },
  buttonsRow: { flexDirection: 'row', gap: 12 },
  actionBtn: { flex: 1, paddingVertical: 16, borderRadius: 16, alignItems: 'center', gap: 8 },
  actionBtnEmoji: { fontSize: 28 },
  actionBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
  tipCard: { padding: 16, borderRadius: 16, borderWidth: 1, gap: 6 },
  tipTitle: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  tipText: { fontSize: 13 },
  scanningContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, padding: 20 },
  previewImage: { width: 240, height: 180, borderRadius: 20 },
  scanningOverlay: { padding: 28, borderRadius: 20, alignItems: 'center', gap: 12, width: '100%' },
  scanningText: { fontSize: 18, fontWeight: '700' },
  scanningSubText: { fontSize: 13 },
  resultImage: { width: '100%', height: 240 },
  resultMain: { margin: 16, padding: 20, borderRadius: 20, borderWidth: 1, gap: 12 },
  confidenceText: { fontSize: 13, fontWeight: '700', backgroundColor: '#0B6E6E20', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100, alignSelf: 'flex-start' },
  resultName: { fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  resultScientific: { fontSize: 14, fontStyle: 'italic' },
  resultDescription: { fontSize: 14, lineHeight: 21 },
  detailBtn: { paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 4 },
  detailBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  alternativesSection: { paddingHorizontal: 16, gap: 10, marginBottom: 8 },
  altTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  altCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, overflow: 'hidden', gap: 12 },
  altImage: { width: 64, height: 64 },
  altContent: { flex: 1, paddingVertical: 8 },
  altName: { fontSize: 14, fontWeight: '700' },
  altScientific: { fontSize: 12, fontStyle: 'italic' },
  altConfidence: { fontSize: 14, fontWeight: '800', paddingRight: 14 },
  resetBtn: { margin: 16, paddingVertical: 14, borderRadius: 14, alignItems: 'center', borderWidth: 2 },
  resetBtnText: { fontSize: 15, fontWeight: '700' },
});
