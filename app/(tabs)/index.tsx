import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  downloadTiles,
  isTileCacheReady,
  localTileTemplate,
} from '@/services/tileCache';

const RANGIROA = {
  latitude:      -14.9754,
  longitude:     -147.6508,
  latitudeDelta:  0.40,
  longitudeDelta: 0.58,
};

// ── Compass component ──────────────────────────────────────────────
function Compass({ rotAnim }: { rotAnim: Animated.Value }) {
  const spin = rotAnim.interpolate({
    inputRange: [-7200, 7200],
    outputRange: ['-7200deg', '7200deg'],
  });

  return (
    <View style={compassStyles.shell}>
      <BlurView
        intensity={Platform.OS === 'ios' ? 55 : 0}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: 38 }]}
      />
      <View style={[StyleSheet.absoluteFill, compassStyles.bg]} />

      {/* Fixed "N" chip at top of the outer ring */}
      <View style={compassStyles.nChip}>
        <Text style={compassStyles.nText}>N</Text>
      </View>

      {/* Rotating compass rose */}
      <Animated.View style={[compassStyles.rose, { transform: [{ rotate: spin }] }]}>
        {/* North needle — red */}
        <View style={compassStyles.needleNorth} />
        {/* South needle — white/gray */}
        <View style={compassStyles.needleSouth} />
        {/* Tick marks at 45° intervals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <View
            key={deg}
            style={[
              compassStyles.tick,
              {
                transform: [
                  { rotate: `${deg}deg` },
                  { translateY: -24 },
                ],
                height: deg % 90 === 0 ? 6 : 4,
                opacity: deg % 90 === 0 ? 0.7 : 0.35,
              },
            ]}
          />
        ))}
        {/* Cardinal labels rotating with the rose */}
        <Text style={[compassStyles.cardinal, { top: 6 }]}>N</Text>
        <Text style={[compassStyles.cardinal, { bottom: 6 }]}>S</Text>
        <Text style={[compassStyles.cardinal, { right: 6, top: '50%' }]}>E</Text>
        <Text style={[compassStyles.cardinal, { left: 6, top: '50%' }]}>O</Text>
      </Animated.View>

      {/* Center dot */}
      <View style={compassStyles.center} />
    </View>
  );
}

const compassStyles = StyleSheet.create({
  shell: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 12,
  },
  bg: {
    borderRadius: 38,
    backgroundColor: Platform.OS === 'android' ? 'rgba(10,20,30,0.82)' : 'rgba(10,20,30,0.40)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  nChip: {
    position: 'absolute',
    top: 4,
    paddingHorizontal: 5,
    paddingVertical: 1,
    backgroundColor: '#ef4444',
    borderRadius: 4,
    zIndex: 10,
  },
  nText: { color: 'white', fontSize: 9, fontWeight: '800' },

  rose: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  needleNorth: {
    position: 'absolute',
    top: 0,
    width: 0, height: 0,
    borderLeftWidth: 5, borderRightWidth: 5, borderBottomWidth: 24,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderBottomColor: '#ef4444',
  },
  needleSouth: {
    position: 'absolute',
    bottom: 0,
    width: 0, height: 0,
    borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 24,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderTopColor: 'rgba(255,255,255,0.55)',
  },
  tick: {
    position: 'absolute',
    width: 1.5,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  cardinal: {
    position: 'absolute',
    color: 'rgba(255,255,255,0.0)', // invisible — just for spacing; N/S/E/O via tick marks
    fontSize: 7,
  },
  center: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

// ── Main screen ────────────────────────────────────────────────────
type CacheState = 'checking' | 'uncached' | 'downloading' | 'cached';

const ZOOM_MIN = 10;
const ZOOM_MAX = 14;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [locationGranted, setLocationGranted] = useState(false);
  const [cacheState, setCacheState] = useState<CacheState>('checking');
  const [dlDone,  setDlDone]  = useState(0);
  const [dlTotal, setDlTotal] = useState(1);

  const prevHeading = useRef(0);
  const accumulated = useRef(0);
  const compassAnim = useRef(new Animated.Value(0)).current;

  // Location & heading
  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      setLocationGranted(true);

      sub = await Location.watchHeadingAsync((h) => {
        const heading = h.trueHeading >= 0 ? h.trueHeading : h.magHeading;
        if (heading < 0) return;

        let delta = heading - prevHeading.current;
        if (delta >  180) delta -= 360;
        if (delta < -180) delta += 360;

        accumulated.current -= delta;
        prevHeading.current  = heading;

        Animated.spring(compassAnim, {
          toValue: accumulated.current,
          useNativeDriver: true,
          damping: 22, stiffness: 160, mass: 0.8,
        }).start();
      });
    })();
    return () => { sub?.remove(); };
  }, []);

  // Check tile cache on mount
  useEffect(() => {
    isTileCacheReady().then((ready) =>
      setCacheState(ready ? 'cached' : 'uncached'),
    );
  }, []);

  const handleDownload = useCallback(async () => {
    setCacheState('downloading');
    setDlDone(0);
    setDlTotal(1);
    await downloadTiles((done, total) => {
      setDlDone(done);
      setDlTotal(total);
    });
    setCacheState('cached');
  }, []);

  const tilesCached = cacheState === 'cached';
  const pct = dlTotal > 0 ? Math.round((dlDone / dlTotal) * 100) : 0;

  return (
    <View style={styles.root}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        mapType={tilesCached ? 'none' : 'satellite'}
        initialRegion={RANGIROA}
        showsUserLocation={locationGranted}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
        rotateEnabled
        pitchEnabled={false}
        zoomEnabled
        scrollEnabled
      >
        {tilesCached && (
          <UrlTile
            urlTemplate={localTileTemplate()}
            minimumZ={ZOOM_MIN}
            maximumZ={ZOOM_MAX}
            flipY={false}
            zIndex={1}
          />
        )}
      </MapView>

      {/* Offline download card */}
      {(cacheState === 'uncached' || cacheState === 'downloading') && (
        <View style={[styles.offlineCard, { bottom: insets.bottom + 106 }]}>
          <BlurView
            intensity={Platform.OS === 'ios' ? 65 : 0}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View style={[StyleSheet.absoluteFill, styles.offlineCardBg]} />

          {cacheState === 'uncached' ? (
            <TouchableOpacity style={styles.dlRow} onPress={handleDownload} activeOpacity={0.8}>
              <Ionicons name="cloud-download-outline" size={16} color="white" />
              <Text style={styles.dlLabel}>Télécharger hors-ligne</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.dlRow}>
              <ActivityIndicator size="small" color="white" style={{ marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.dlLabel}>Téléchargement… {pct}%</Text>
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, { width: `${pct}%` }]} />
                </View>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Compass — bottom-right above tab bar */}
      <View style={[styles.compassPos, { bottom: insets.bottom + 96 }]}>
        <Compass rotAnim={compassAnim} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  compassPos: { position: 'absolute', right: 20 },

  offlineCard: {
    position: 'absolute',
    left: 20,
    right: 104, // stop before the compass
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30, shadowRadius: 12, elevation: 8,
  },
  offlineCardBg: {
    borderRadius: 16,
    backgroundColor: Platform.OS === 'android' ? 'rgba(10,20,30,0.85)' : 'rgba(10,20,30,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  dlRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12, gap: 8,
  },
  dlLabel: { color: 'white', fontSize: 13, fontWeight: '600', flex: 1 },
  progressBg: {
    height: 3, backgroundColor: 'rgba(255,255,255,0.20)',
    borderRadius: 2, marginTop: 5, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#22d3ee', borderRadius: 2 },
});
