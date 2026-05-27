import * as FileSystem from 'expo-file-system';

const ZOOM_MIN = 10;
const ZOOM_MAX = 14;

// Bounding box covering Rangiroa + surrounding ocean buffer
const BOUNDS = {
  minLat: -15.18,
  maxLat: -14.78,
  minLon: -148.05,
  maxLon: -147.35,
};

const TILE_DIR = `${FileSystem.cacheDirectory}rangiroa-tiles/`;

// ArcGIS World Imagery — free for display (note: URL order is z/y/x)
const arcgisUrl = (z: number, y: number, x: number) =>
  `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;

function lon2x(lon: number, z: number): number {
  return Math.floor(((lon + 180) / 360) * 2 ** z);
}

function lat2y(lat: number, z: number): number {
  const rad = (lat * Math.PI) / 180;
  return Math.floor(
    ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 2 ** z,
  );
}

function collectTiles(): { z: number; x: number; y: number }[] {
  const tiles: { z: number; x: number; y: number }[] = [];
  for (let z = ZOOM_MIN; z <= ZOOM_MAX; z++) {
    const x1 = lon2x(BOUNDS.minLon, z);
    const x2 = lon2x(BOUNDS.maxLon, z);
    const y1 = lat2y(BOUNDS.maxLat, z); // higher lat → smaller y in TMS
    const y2 = lat2y(BOUNDS.minLat, z);
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        tiles.push({ z, x, y });
      }
    }
  }
  return tiles;
}

export async function isTileCacheReady(): Promise<boolean> {
  const z = 12;
  const cx = lon2x(-147.65, z);
  const cy = lat2y(-14.975, z);
  const info = await FileSystem.getInfoAsync(`${TILE_DIR}${z}/${cx}/${cy}.png`);
  return info.exists;
}

export async function downloadTiles(
  onProgress: (done: number, total: number) => void,
): Promise<void> {
  await FileSystem.makeDirectoryAsync(TILE_DIR, { intermediates: true });

  const tiles = collectTiles();
  const total = tiles.length;
  let done = 0;

  // 6 concurrent downloads at a time
  for (let i = 0; i < tiles.length; i += 6) {
    const batch = tiles.slice(i, i + 6);
    await Promise.all(
      batch.map(async ({ z, x, y }) => {
        const dir = `${TILE_DIR}${z}/${x}/`;
        const path = `${dir}${y}.png`;
        const info = await FileSystem.getInfoAsync(path);
        if (!info.exists) {
          await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
          try {
            await FileSystem.downloadAsync(arcgisUrl(z, y, x), path);
          } catch {
            // Missing or unreachable tile — skip silently
          }
        }
        onProgress(++done, total);
      }),
    );
  }
}

// Returns the file:// URL template used by MapView's UrlTile
export function localTileTemplate(): string {
  return `${TILE_DIR}{z}/{x}/{y}.png`;
}

export async function clearTileCache(): Promise<void> {
  const info = await FileSystem.getInfoAsync(TILE_DIR);
  if (info.exists) {
    await FileSystem.deleteAsync(TILE_DIR, { idempotent: true });
  }
}
