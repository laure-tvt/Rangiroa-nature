import { Tabs } from 'expo-router';
import { Platform, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

type IconName = keyof typeof Ionicons.glyphMap;

const TABS = [
  { name: 'index',    title: 'Accueil', icon: 'home-outline'   as IconName, iconFocused: 'home'   as IconName },
  { name: 'scanner', title: 'Scanner', icon: 'scan-outline'   as IconName, iconFocused: 'scan'   as IconName },
  { name: 'map',     title: 'Carte',   icon: 'map-outline'    as IconName, iconFocused: 'map'    as IconName },
  { name: 'favorites',title:'Favoris', icon: 'heart-outline'  as IconName, iconFocused: 'heart'  as IconName },
  { name: 'profile', title: 'Profil',  icon: 'person-outline' as IconName, iconFocused: 'person' as IconName },
] as const;

// Active dot indicator above icon
function TabIcon({ name, focused, color }: { name: IconName; focused: boolean; color: string }) {
  return (
    <View style={tabStyles.iconWrap}>
      {focused && <View style={tabStyles.dot} />}
      <Ionicons name={focused ? name.replace('-outline', '') as IconName : name} size={24} color={color} />
    </View>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: { alignItems: 'center', gap: 3, paddingTop: 2 },
  dot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: '#0891b2',
    position: 'absolute',
    top: -1,
  },
});

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0891b2',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255,255,255,0.94)',
          borderTopWidth: 0,
          height: 84,
          paddingBottom: 20,
          paddingTop: 10,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 0,
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} tint="light" style={{ flex: 1 }} />
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
              <TabIcon name={focused ? tab.iconFocused : tab.icon} focused={focused} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
