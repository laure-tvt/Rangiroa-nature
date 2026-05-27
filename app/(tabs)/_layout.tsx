import { Tabs } from 'expo-router';
import { useColorScheme, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

type IconName = keyof typeof Ionicons.glyphMap;

type TabConfig = {
  name: string;
  title: string;
  icon: IconName;
  iconFocused: IconName;
};

const TABS: TabConfig[] = [
  { name: 'index',     title: 'Accueil', icon: 'home-outline',   iconFocused: 'home'   },
  { name: 'scanner',  title: 'Scanner', icon: 'scan-outline',   iconFocused: 'scan'   },
  { name: 'map',      title: 'Carte',   icon: 'map-outline',    iconFocused: 'map'    },
  { name: 'favorites',title: 'Favoris', icon: 'heart-outline',  iconFocused: 'heart'  },
  { name: 'profile',  title: 'Profil',  icon: 'person-outline', iconFocused: 'person' },
];

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const activeTint   = '#0891b2';
  const inactiveTint = isDark ? '#64748b' : '#94a3b8';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeTint,
        tabBarInactiveTintColor: inactiveTint,
        /* Tab bar flottante semi-transparente style iOS */
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Platform.OS === 'ios'
            ? 'transparent'
            : 'rgba(255,255,255,0.88)',
          borderTopWidth: 0,
          height: 84,
          paddingBottom: 24,
          paddingTop: 8,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
        },
        /* Fond blur natif iOS */
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={75}
              tint={isDark ? 'dark' : 'light'}
              style={{ flex: 1 }}
            />
          ) : null,
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
