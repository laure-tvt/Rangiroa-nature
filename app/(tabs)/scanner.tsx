import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@/components/ui/Button';

const { width, height } = Dimensions.get('window');
const FRAME_SIZE = width * 0.72;

export default function ScannerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission requise',
        'Nous avons besoin d\'accéder à votre galerie pour identifier les espèces.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission requise',
        'Nous avons besoin d\'accéder à la caméra pour identifier les espèces.'
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    startPulse();

    // Placeholder — l'analyse IA sera branchée ici
    await new Promise((r) => setTimeout(r, 2000));

    setIsAnalyzing(false);
    Alert.alert(
      'Fonctionnalité à venir',
      'L\'identification IA sera disponible dans la prochaine version !',
      [{ text: 'OK', onPress: () => setSelectedImage(null) }]
    );
  };

  const handleReset = () => {
    setSelectedImage(null);
    setIsAnalyzing(false);
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <LinearGradient
        colors={isDark ? ['#0c4a6e', '#0f172a'] : ['#0ea5e9', '#bae6fd']}
        style={{ height: 120 }}
      >
        <SafeAreaView edges={['top']} className="px-5 pt-2">
          <Text className="text-white text-2xl font-bold">Scanner</Text>
          <Text className="text-white/70 text-sm">Identifie la faune & flore de Rangiroa</Text>
        </SafeAreaView>
      </LinearGradient>

      <View className="flex-1 items-center px-5 -mt-4">
        {/* Viewfinder */}
        <View
          className="relative items-center justify-center"
          style={{ width: FRAME_SIZE, height: FRAME_SIZE }}
        >
          <Animated.View
            style={{ transform: [{ scale: isAnalyzing ? pulseAnim : 1 }] }}
            className={`w-full h-full rounded-3xl overflow-hidden ${
              selectedImage ? '' : (isDark ? 'bg-slate-800 border-2 border-dashed border-slate-600' : 'bg-ocean-50 border-2 border-dashed border-ocean-200')
            }`}
          >
            {selectedImage ? (
              <>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#bae6fd',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="image" size={60} color="#0ea5e9" />
                  <Text className="text-ocean-700 font-medium mt-2">Photo sélectionnée</Text>
                </View>
                {/* Corner markers */}
                {['tl', 'tr', 'bl', 'br'].map((pos) => (
                  <View
                    key={pos}
                    className="absolute w-6 h-6 border-ocean-400"
                    style={{
                      top: pos.startsWith('t') ? 8 : undefined,
                      bottom: pos.startsWith('b') ? 8 : undefined,
                      left: pos.endsWith('l') ? 8 : undefined,
                      right: pos.endsWith('r') ? 8 : undefined,
                      borderTopWidth: pos.startsWith('t') ? 3 : 0,
                      borderBottomWidth: pos.startsWith('b') ? 3 : 0,
                      borderLeftWidth: pos.endsWith('l') ? 3 : 0,
                      borderRightWidth: pos.endsWith('r') ? 3 : 0,
                      borderColor: '#0ea5e9',
                    }}
                  />
                ))}
              </>
            ) : (
              <View className="flex-1 items-center justify-center gap-4 p-6">
                <View className="w-20 h-20 rounded-full bg-ocean-100 items-center justify-center">
                  <Ionicons name="scan" size={40} color="#0ea5e9" />
                </View>
                <View className="items-center gap-1">
                  <Text className={`font-bold text-base ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Aucune photo sélectionnée
                  </Text>
                  <Text className={`text-sm text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Prends une photo ou choisis depuis ta galerie
                  </Text>
                </View>
              </View>
            )}
          </Animated.View>

          {selectedImage && (
            <TouchableOpacity
              onPress={handleReset}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-coral-500 items-center justify-center shadow"
            >
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {isAnalyzing && (
          <View className="items-center gap-1 mt-4">
            <Text className="text-ocean-500 font-semibold">Analyse en cours...</Text>
            <Text className="text-slate-400 text-xs">Identification de l'espèce</Text>
          </View>
        )}

        {/* Actions */}
        <View className="w-full mt-6 gap-3">
          {!selectedImage ? (
            <>
              <Button
                label="Prendre une photo"
                icon={<Ionicons name="camera-outline" size={20} color="white" />}
                onPress={handleTakePhoto}
                fullWidth
                size="lg"
              />
              <Button
                label="Choisir depuis la galerie"
                icon={<Ionicons name="images-outline" size={20} color="#0ea5e9" />}
                variant="outline"
                onPress={handlePickImage}
                fullWidth
                size="lg"
              />
            </>
          ) : (
            <>
              <Button
                label={isAnalyzing ? 'Analyse en cours...' : 'Identifier cette espèce'}
                icon={!isAnalyzing ? <Ionicons name="search-outline" size={20} color="white" /> : undefined}
                onPress={handleAnalyze}
                loading={isAnalyzing}
                fullWidth
                size="lg"
              />
              <Button
                label="Changer de photo"
                variant="ghost"
                onPress={handleReset}
                fullWidth
              />
            </>
          )}
        </View>

        {/* Tips */}
        <View className={`mt-6 p-4 rounded-2xl w-full ${isDark ? 'bg-slate-800' : 'bg-ocean-50'}`}>
          <Text className={`font-semibold text-sm mb-2 ${isDark ? 'text-slate-300' : 'text-ocean-800'}`}>
            💡 Conseils pour une bonne identification
          </Text>
          {[
            'Prends la photo de face ou de profil',
            'Assure-toi que l\'espèce est bien visible',
            'Évite les reflets et le contre-jour',
          ].map((tip, i) => (
            <Text key={i} className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-ocean-700'}`}>
              • {tip}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
