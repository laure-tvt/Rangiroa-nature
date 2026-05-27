import React from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, {
  Rect, Path, Circle, Text, G, Polygon, Defs, LinearGradient, Stop,
} from 'react-native-svg';

const C = {
  oceanDeep:  '#0d3a52',
  ocean:      '#1a6a8a',
  oceanLight: '#2899c0',
  lagoon:     '#28b4b0',
  lagoonMid:  '#3dcfcb',
  lagoonLight:'#6de0db',
  land:       '#dfc06a',
  landLight:  '#f0d898',
  landEdge:   '#c09840',
  reef:       '#20a0a0',
  compass:    '#7a5e10',
  text:       '#12243a',
};

function Compass({ x, y }: { x: number; y: number }) {
  return (
    <G transform={`translate(${x},${y})`}>
      <Circle r={26} fill="rgba(255,255,255,0.88)" stroke={C.compass} strokeWidth={1.5} />
      <Polygon points="0,-18 -4,-6 4,-6" fill={C.compass} />
      <Polygon points="0,18 -4,6 4,6" fill={C.compass} fillOpacity={0.35} />
      <Polygon points="18,0 6,-4 6,4" fill={C.compass} fillOpacity={0.35} />
      <Polygon points="-18,0 -6,-4 -6,4" fill={C.compass} fillOpacity={0.35} />
      <Circle r={3.5} fill={C.compass} />
      <Text x={0} y={-22} textAnchor="middle" fill={C.compass} fontSize={9} fontWeight="bold">N</Text>
    </G>
  );
}

export default function MapIllustration() {
  const { width: W, height: H } = useWindowDimensions();

  // ── Key y positions
  const rimOuter = H * 0.19;  // ocean-side edge of the rim
  const rimInner = H * 0.30;  // lagoon-side edge of the rim

  // ── Pass positions (geography-based)
  // Avatoru (west pass): x 42-49%
  // Tiputa  (east pass): x 70-77%
  const avW = W * 0.43, avE = W * 0.50;
  const tiW = W * 0.70, tiE = W * 0.77;

  // ── Rim outer-edge curve (left side curves down to simulate west end of atoll)
  const rimPath = `
    M 0,${H * 0.38}
    C ${W * 0.04},${H * 0.28} ${W * 0.08},${H * 0.22} ${W * 0.18},${rimOuter}
    C ${W * 0.30},${H * 0.16} ${W * 0.56},${H * 0.16} ${W * 0.73},${rimOuter}
    C ${W * 0.86},${H * 0.20} ${W * 0.94},${H * 0.22} ${W},${H * 0.22}
    L ${W},${rimInner}
    C ${W * 0.86},${rimInner} ${W * 0.56},${rimInner} ${W * 0.30},${rimInner}
    C ${W * 0.12},${rimInner} ${W * 0.05},${rimInner + H * 0.025} 0,${H * 0.38}
    Z
  `;

  return (
    <Svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
    >
      <Defs>
        <LinearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%"   stopColor={C.oceanDeep} />
          <Stop offset="100%" stopColor={C.oceanLight} />
        </LinearGradient>
        <LinearGradient id="lagoon" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%"   stopColor={C.lagoon} />
          <Stop offset="60%"  stopColor={C.lagoonMid} />
          <Stop offset="100%" stopColor={C.lagoonLight} />
        </LinearGradient>
        <LinearGradient id="land" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%"   stopColor={C.landLight} />
          <Stop offset="100%" stopColor={C.land} />
        </LinearGradient>
        {/* Pass uses same lagoon gradient (water flowing through) */}
        <LinearGradient id="pass" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%"   stopColor={C.ocean}  stopOpacity={0.85} />
          <Stop offset="50%"  stopColor={C.lagoon} stopOpacity={0.90} />
          <Stop offset="100%" stopColor={C.lagoon} stopOpacity={1} />
        </LinearGradient>
      </Defs>

      {/* ── Ocean ── */}
      <Rect x={0} y={0} width={W} height={H} fill="url(#ocean)" />

      {/* Wave lines in ocean */}
      {([H * 0.05, H * 0.09, H * 0.13] as number[]).map((wy, i) => (
        <Path
          key={i}
          d={`M 0,${wy} C ${W*0.3},${wy - 4} ${W*0.65},${wy + 4} ${W},${wy}`}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={1.2}
          fill="none"
        />
      ))}

      {/* ── Lagoon ── */}
      <Rect x={0} y={rimInner} width={W} height={H - rimInner} fill="url(#lagoon)" />

      {/* ── Land/reef rim ── */}
      <Path d={rimPath} fill="url(#land)" />

      {/* Subtle reef stripe on lagoon edge */}
      <Path
        d={`
          M 0,${H * 0.38}
          C ${W * 0.05},${rimInner + H * 0.01} ${W * 0.12},${rimInner}
            ${W * 0.30},${rimInner}
          C ${W * 0.56},${rimInner} ${W * 0.86},${rimInner} ${W},${rimInner}
        `}
        stroke={C.reef}
        strokeWidth={3}
        strokeOpacity={0.55}
        fill="none"
      />

      {/* ── Passe Avatoru — water channel through the rim ──
          Drawn on TOP of the rim as water-colored path (no hard-edged rect) */}
      <Path
        d={`
          M ${avW},${H * 0.10}
          C ${avW + (avE - avW) * 0.2},${rimOuter - 4} ${avW},${rimOuter + 2} ${avW},${rimInner}
          L ${avE},${rimInner}
          C ${avE},${rimOuter + 2} ${avE - (avE - avW) * 0.2},${rimOuter - 4} ${avE},${H * 0.10}
          Z
        `}
        fill="url(#pass)"
      />
      {/* Soft edge lines for the pass */}
      <Path
        d={`M ${avW},${H * 0.10} C ${avW},${rimOuter} ${avW},${rimOuter} ${avW},${rimInner}`}
        stroke={C.landEdge} strokeWidth={0.8} strokeOpacity={0.5} fill="none"
      />
      <Path
        d={`M ${avE},${H * 0.10} C ${avE},${rimOuter} ${avE},${rimOuter} ${avE},${rimInner}`}
        stroke={C.landEdge} strokeWidth={0.8} strokeOpacity={0.5} fill="none"
      />

      {/* ── Passe Tiputa ── */}
      <Path
        d={`
          M ${tiW},${H * 0.10}
          C ${tiW + (tiE - tiW) * 0.2},${rimOuter - 4} ${tiW},${rimOuter + 2} ${tiW},${rimInner}
          L ${tiE},${rimInner}
          C ${tiE},${rimOuter + 2} ${tiE - (tiE - tiW) * 0.2},${rimOuter - 4} ${tiE},${H * 0.10}
          Z
        `}
        fill="url(#pass)"
      />
      <Path
        d={`M ${tiW},${H * 0.10} C ${tiW},${rimOuter} ${tiW},${rimOuter} ${tiW},${rimInner}`}
        stroke={C.landEdge} strokeWidth={0.8} strokeOpacity={0.5} fill="none"
      />
      <Path
        d={`M ${tiE},${H * 0.10} C ${tiE},${rimOuter} ${tiE},${rimOuter} ${tiE},${rimInner}`}
        stroke={C.landEdge} strokeWidth={0.8} strokeOpacity={0.5} fill="none"
      />

      {/* ── Coral spots in lagoon ── */}
      {([
        { cx: W*0.22, cy: H*0.40, r: 18 },
        { cx: W*0.45, cy: H*0.56, r: 12 },
        { cx: W*0.60, cy: H*0.47, r: 14 },
        { cx: W*0.76, cy: H*0.62, r: 10 },
        { cx: W*0.12, cy: H*0.65, r: 10 },
        { cx: W*0.55, cy: H*0.76, r: 15 },
        { cx: W*0.84, cy: H*0.74, r: 9  },
        { cx: W*0.32, cy: H*0.70, r: 11 },
      ] as { cx: number; cy: number; r: number }[]).map((d, i) => (
        <Circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={C.reef} fillOpacity={0.15} />
      ))}

      {/* Lagoon shimmer lines */}
      {([H*0.45, H*0.58, H*0.70] as number[]).map((ly, i) => (
        <Path
          key={i}
          d={`M ${W*0.1},${ly} C ${W*0.35},${ly-3} ${W*0.65},${ly+3} ${W*0.9},${ly}`}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={1}
          fill="none"
        />
      ))}

      {/* ── Title ── */}
      <Text
        x={W * 0.06} y={H * 0.070}
        fill="white"
        fontSize={Math.min(W * 0.058, 24)}
        fontWeight="bold"
        fontStyle="italic"
        fillOpacity={0.90}
      >
        Rangiroa
      </Text>
      <Text
        x={W * 0.06} y={H * 0.097}
        fill="white"
        fontSize={Math.min(W * 0.022, 10)}
        fillOpacity={0.55}
        letterSpacing={1.6}
      >
        POLYNÉSIE FRANÇAISE
      </Text>

      {/* Pass micro-labels (on the ocean side, above the rim) */}
      <Text x={(avW + avE) / 2} y={H * 0.145} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize={8}>Avatoru</Text>
      <Text x={(tiW + tiE) / 2} y={H * 0.145} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize={8}>Tiputa</Text>

      {/* ── Compass (above tab bar) ── */}
      <Compass x={W * 0.88} y={H * 0.82} />
    </Svg>
  );
}
