import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Badge } from '@/components/ui/Badge';

type MenuSection = {
  title: string;
  items: MenuItem[];
};

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress: () => void;
  danger?: boolean;
};

const MOCK_PROFILE = {
  username: 'Explorateur',
  email: 'utilisateur@exemple.com',
  bio: 'Passionné de nature et de plongée à Rangiroa 🌊',
  identifications_count: 12,
  favorites_count: 8,
  member_since: 'Janvier 2025',
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSignOut = () => {
    Alert.alert('Se déconnecter', 'Es-tu sûr de vouloir te déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Se déconnecter', style: 'destructive', onPress: () => {} },
    ]);
  };

  const MENU_SECTIONS: MenuSection[] = [
    {
      title: 'Mon compte',
      items: [
        {
          icon: 'person-outline',
          label: 'Modifier le profil',
          onPress: () => {},
        },
        {
          icon: 'notifications-outline',
          label: 'Notifications',
          onPress: () => {},
        },
        {
          icon: 'lock-closed-outline',
          label: 'Confidentialité',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Application',
      items: [
        {
          icon: 'moon-outline',
          label: 'Thème',
          value: isDark ? 'Sombre' : 'Clair',
          onPress: () => {},
        },
        {
          icon: 'language-outline',
          label: 'Langue',
          value: 'Français',
          onPress: () => {},
        },
        {
          icon: 'cloud-download-outline',
          label: 'Données hors-ligne',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'À propos',
      items: [
        {
          icon: 'information-circle-outline',
          label: 'À propos de l\'app',
          value: 'v1.0.0',
          onPress: () => {},
        },
        {
          icon: 'document-text-outline',
          label: 'Conditions d\'utilisation',
          onPress: () => {},
        },
        {
          icon: 'shield-outline',
          label: 'Politique de confidentialité',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <LinearGradient
        colors={isDark ? ['#1e3a5f', '#0f172a'] : ['#0369a1', '#38bdf8']}
        style={{ paddingBottom: 30 }}
      >
        <SafeAreaView edges={['top']} className="px-5 pt-2">
          <Text className="text-white text-2xl font-bold mb-6">Profil</Text>

          {/* Avatar + info */}
          <View className="flex-row items-center gap-4 mb-6">
            <TouchableOpacity>
              <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center border-2 border-white/30">
                <Text className="text-4xl">🤿</Text>
              </View>
              <View className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-ocean-400 items-center justify-center border-2 border-white">
                <Ionicons name="camera" size={12} color="white" />
              </View>
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold">{MOCK_PROFILE.username}</Text>
              <Text className="text-white/60 text-sm">{MOCK_PROFILE.email}</Text>
              <Text className="text-white/70 text-xs mt-1">{MOCK_PROFILE.bio}</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row gap-3">
            {[
              { label: 'Identifications', value: MOCK_PROFILE.identifications_count, icon: '🔍' },
              { label: 'Favoris', value: MOCK_PROFILE.favorites_count, icon: '❤️' },
              { label: 'Membre depuis', value: MOCK_PROFILE.member_since, icon: '📅', small: true },
            ].map((stat, i) => (
              <View
                key={i}
                className="flex-1 bg-white/15 rounded-xl p-3 items-center gap-1"
              >
                <Text className="text-xl">{stat.icon}</Text>
                <Text className={`text-white font-bold ${stat.small ? 'text-xs' : 'text-xl'}`}>
                  {stat.value}
                </Text>
                <Text className="text-white/60 text-xs text-center">{stat.label}</Text>
              </View>
            ))}
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {MENU_SECTIONS.map((section) => (
          <View key={section.title} className="mb-5">
            <Text className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {section.title}
            </Text>
            <View className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'}`}
              style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 }}
            >
              {section.items.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    activeOpacity={0.7}
                    className="flex-row items-center px-4 py-3.5 gap-3"
                  >
                    <View className={`w-9 h-9 rounded-xl items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <Ionicons
                        name={item.icon}
                        size={18}
                        color={item.danger ? '#ef4444' : '#0ea5e9'}
                      />
                    </View>
                    <Text
                      className={`flex-1 text-sm font-medium ${
                        item.danger
                          ? 'text-coral-500'
                          : isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      {item.label}
                    </Text>
                    {item.value && (
                      <Text className="text-slate-400 text-sm">{item.value}</Text>
                    )}
                    <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                  </TouchableOpacity>
                  {idx < section.items.length - 1 && (
                    <View className={`h-px mx-4 ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Sign out */}
        <TouchableOpacity
          onPress={handleSignOut}
          className={`rounded-2xl p-4 flex-row items-center justify-center gap-2 mb-8 ${isDark ? 'bg-slate-800' : 'bg-white'}`}
          style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 }}
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-coral-500 font-semibold">Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
