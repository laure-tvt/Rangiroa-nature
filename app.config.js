import 'dotenv/config';

export default {
  expo: {
    name: 'Rangiroa',
    slug: 'rangiroa-explorer',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'rangiroa-explorer',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.rangiroaexplorer.app',
      infoPlist: {
        NSCameraUsageDescription: 'Pour identifier la faune et la flore de Rangiroa',
        NSPhotoLibraryUsageDescription: 'Pour sélectionner une photo à identifier',
        NSLocationWhenInUseUsageDescription: 'Pour afficher votre position sur la carte',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#0c4a6e',
      },
      package: 'com.rangiroaexplorer.app',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-font',
      ['expo-camera', { cameraPermission: 'Autoriser Rangiroa à accéder à la caméra' }],
      ['expo-location', { locationWhenInUsePermission: 'Autoriser Rangiroa à accéder à votre position' }],
      ['expo-image-picker', { photosPermission: 'Autoriser Rangiroa à accéder à vos photos' }],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
};
