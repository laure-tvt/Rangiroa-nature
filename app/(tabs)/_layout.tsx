import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';

type IconName = keyof typeof Ionicons.glyphMap;

type TabConfig = {
  name: string;
  title: string;
  icon: IconName;
  iconFocused: IconName;
};

const TABS: TabConfig[] = [
  { name: 'index', title: 'Accueil', icon: 'home-outline', iconFocused: 'home' },
  { name: 'scanner', title: 'Scanner', icon: 'scan-outline', iconFocused: 'scan' },
  { name: 'map', title: 'Carte', icon: 'map-outline', iconFocused: 'map' },
  { name: 'favorites', title: 'Favoris', icon: 'heart-outline', iconFocused: 'heart' },
  { name: 'profile', title: 'Profil', icon: 'person-outline', iconFocused: 'person' },
];

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const activeTint = '#0ea5e9';
  const inactiveTint = isDark ? '#64748b' : '#94a3b8';
  const tabBarBg = isDark ? '#0f172a' : '#ffffff';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeTint,
        tabBarInactiveTintColor: inactiveTint,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopColor: isDark ? '#1e293b' : '#f1f5f9',
          borderTopWidth: 1,
          height: 84,
          paddingBottom: 24,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? tab.iconFocused : tab.icon}
                size={24}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
