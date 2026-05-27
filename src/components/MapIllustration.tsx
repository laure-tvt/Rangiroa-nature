import React from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, {
  Rect, Path, Circle, Text, G, Polygon, Defs, LinearGradient, Stop, Line,
} from 'react-native-svg';

const C = {
  ocean:     '#1e6a8a',
  oceanMid:  '#2d8aaa',
  lagoon:    '#35b8b4',
  lagoonMid: '#50ceca',
  lagoonLight:'#78e0dc',
  land:      '#dfc878',
  landEdge:  '#b09040',
  reef:      '#30a8a4',
  compass:   '#7a5e10',
  text:      '#1e2a38',
};

function Compass({ x, y }: { x: number; y: number }) {
  return (
    <G transform={`translate(${x},${y})`}>
      <Circle r={26} fill="rgba(255,255,255,0.82)" stroke={C.compass} strokeWidth={1.5} />
      <Polygon points="0,-18 -4,-6 4,-6" fill={C.compass} />
      <Polygon points="0,18 -4,6 4,6" fill={C.compass} fillOpacity={0.4} />
      <Polygon points="18,0 6,-4 6,4" fill={C.compass} fillOpacity={0.4} />
      <Polygon points="-18,0 -6,-4 -6,4" fill={C.compass} fillOpacity={0.4} />
      <Circle r={3} fill={C.compass} />
      <Text x={0} y={-22} textAnchor="middle" fill={C.compass} fontSize={9} fontWeight="bold">N</Text>
      <Text x={0} y={28} textAnchor="middle" fill={C.compass} fontSize={7} fillOpacity={0.65}>S</Text>
      <Text x={24} y={4} textAnchor="middle" fill={C.compass} fontSize={7} fillOpacity={0.65}>E</Text>
      <Text x={-24} y={4} textAnchor="middle" fill={C.compass} fontSize={7} fillOpacity={0.65}>O</Text>
    </G>
  );
}

export default function MapIllustration() {
  const { width: W, height: H } = useWindowDimensions();

  // Rim (récif/terre) — band crossing the screen horizontally
  // Outer (ocean-side) edge curves from y≈37% at left to y≈16% in middle then y≈22% at right
  // Inner (lagoon-side) edge is roughly at rimS across the full width
  const rimS = H * 0.31;   // lagoon-side edge of rim

  // Pass positions (Passe Avatoru west side, Passe Tiputa east side)
  // Geographic: Avatoru at ~46%, Tiputa at ~72% of the visible east-west range
  const avW = W * 0.43;    // Avatoru pass west boundary
  const avE = W * 0.50;    // Avatoru pass east boundary
  const tiW = W * 0.70;    // Tiputa pass west boundary
  const tiE = W * 0.77;    // Tiputa pass east boundary
  const passTop = H * 0.11; // passes connect up into the ocean section

  // Rim outer-edge path (ocean side), curves gently
  const rimOuterPath = `
    M 0,${H * 0.38}
    C ${W * 0.04},${H * 0.29} ${W * 0.07},${H * 0.23} ${W * 0.17},${H * 0.19}
    C ${W * 0.28},${H * 0.16} ${W * 0.38},${H * 0.16} ${avW},${H * 0.17}
    L ${avW},${H * 0.17}
    M ${avE},${H * 0.17}
    C ${W * 0.56},${H * 0.16} ${W * 0.63},${H * 0.16} ${tiW},${H * 0.18}
    M ${tiE},${H * 0.18}
    C ${W * 0.84},${H * 0.19} ${W * 0.93},${H * 0.21} ${W},${H * 0.22}
  `;

  return (
    <Svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
    >
      <Defs>
        <LinearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%"   stopColor="#1a5c7a" />
          <Stop offset="100%" stopColor="#3498be" />
        </LinearGradient>
        <LinearGradient id="lagoonGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%"   stopColor="#2aacaa" />
          <Stop offset="50%"  stopColor="#48c8c4" />
          <Stop offset="100%" stopColor="#7adcd8" />
        </LinearGradient>
        <LinearGradient id="passGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%"   stopColor="#3498be" />
          <Stop offset="100%" stopColor="#2aacaa" />
        </LinearGradient>
      </Defs>

      {/* ── Ocean background ── */}
      <Rect x={0} y={0} width={W} height={H} fill="url(#oceanGrad)" />

      {/* Ocean wave lines */}
      {([H*0.05, H*0.09, H*0.13] as number[]).map((wy, i) => (
        <Path
          key={i}
          d={`M 0,${wy} C ${W*0.25},${wy-5} ${W*0.60},${wy+5} ${W},${wy}`}
          stroke="rgba(255,255,255,0.30)"
          strokeWidth={1.5}
          fill="none"
        />
      ))}

      {/* ── Lagoon ── */}
      <Rect x={0} y={rimS} width={W} height={H - rimS} fill="url(#lagoonGrad)" />

      {/* ── Rim / récif (land strip) ── */}
      {/*
        Drawn as a filled path.
        Outer (north/ocean) edge: curves from bottom-left, rises, runs E–W,
        then drops slightly to the right.
        Inner (south/lagoon) edge: roughly constant at rimS.
        The pass rects will be drawn ON TOP to cut holes through it.
      */}
      <Path
        d={`
          M 0,${H * 0.38}
          C ${W * 0.04},${H * 0.29} ${W * 0.07},${H * 0.23} ${W * 0.17},${H * 0.19}
          C ${W * 0.30},${H * 0.16} ${W * 0.56},${H * 0.16} ${W * 0.72},${H * 0.18}
          C ${W * 0.85},${H * 0.19} ${W * 0.93},${H * 0.21} ${W},${H * 0.22}
          L ${W},${rimS}
          C ${W * 0.85},${rimS} ${W * 0.56},${rimS} ${W * 0.30},${rimS}
          C ${W * 0.12},${rimS} ${W * 0.05},${rimS + H * 0.02} 0,${H * 0.38}
          Z
        `}
        fill={C.land}
        stroke={C.landEdge}
        strokeWidth={1}
      />

      {/* Reef edge stripe on lagoon side */}
      <Path
        d={`
          M 0,${H * 0.38}
          C ${W * 0.05},${rimS + H * 0.015} ${W * 0.12},${rimS}
            ${W * 0.30},${rimS}
          C ${W * 0.56},${rimS} ${W * 0.85},${rimS} ${W},${rimS}
        `}
        stroke={C.reef}
        strokeWidth={3.5}
        strokeOpacity={0.6}
        fill="none"
      />

      {/* ── Passe Avatoru (water channel) ── */}
      <Rect
        x={avW} y={passTop}
        width={avE - avW} height={rimS - passTop}
        fill="url(#passGrad)"
      />
      <Line x1={avW} y1={passTop} x2={avW} y2={rimS} stroke={C.landEdge} strokeWidth={1} strokeOpacity={0.5} />
      <Line x1={avE} y1={passTop} x2={avE} y2={rimS} stroke={C.landEdge} strokeWidth={1} strokeOpacity={0.5} />

      {/* ── Passe Tiputa (water channel) ── */}
      <Rect
        x={tiW} y={passTop}
        width={tiE - tiW} height={rimS - passTop}
        fill="url(#passGrad)"
      />
      <Line x1={tiW} y1={passTop} x2={tiW} y2={rimS} stroke={C.landEdge} strokeWidth={1} strokeOpacity={0.5} />
      <Line x1={tiE} y1={passTop} x2={tiE} y2={rimS} stroke={C.landEdge} strokeWidth={1} strokeOpacity={0.5} />

      {/* ── Coral / lagoon decoration ── */}
      {([
        { cx: W*0.22, cy: H*0.42, r: 14 },
        { cx: W*0.45, cy: H*0.56, r: 10 },
        { cx: W*0.60, cy: H*0.48, r: 11 },
        { cx: W*0.78, cy: H*0.60, r: 9  },
        { cx: W*0.12, cy: H*0.63, r: 8  },
        { cx: W*0.55, cy: H*0.74, r: 13 },
        { cx: W*0.85, cy: H*0.75, r: 7  },
      ] as { cx: number; cy: number; r: number }[]).map((d, i) => (
        <Circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={C.reef} fillOpacity={0.18} />
      ))}

      {/* Fish silhouettes in lagoon */}
      <Path d={`M ${W*0.35},${H*0.46} C ${W*0.37},${H*0.455} ${W*0.39},${H*0.458} ${W*0.38},${H*0.46} C ${W*0.39},${H*0.462} ${W*0.37},${H*0.465} ${W*0.35},${H*0.46} Z`}
        fill={C.reef} fillOpacity={0.45} />
      <Path d={`M ${W*0.63},${H*0.54} C ${W*0.65},${H*0.535} ${W*0.67},${H*0.538} ${W*0.66},${H*0.54} C ${W*0.67},${H*0.542} ${W*0.65},${H*0.545} ${W*0.63},${H*0.54} Z`}
        fill={C.reef} fillOpacity={0.40} />

      {/* ── Title (top-left, in ocean area) ── */}
      <Text
        x={W * 0.07} y={H * 0.068}
        fill="white" fontSize={Math.min(W * 0.06, 26)}
        fontWeight="bold" fontStyle="italic" fillOpacity={0.92}
      >
        Rangiroa
      </Text>
      <Text
        x={W * 0.07} y={H * 0.095}
        fill="white" fontSize={Math.min(W * 0.025, 11)}
        fillOpacity={0.65} letterSpacing={1.8}
      >
        POLYNÉSIE FRANÇAISE
      </Text>

      {/* Pass micro-labels */}
      <Text x={(avW + avE) / 2} y={H * 0.145} textAnchor="middle" fill="white" fontSize={8} fillOpacity={0.75}>Avatoru</Text>
      <Text x={(tiW + tiE) / 2} y={H * 0.145} textAnchor="middle" fill="white" fontSize={8} fillOpacity={0.75}>Tiputa</Text>

      {/* ── Compass ── */}
      <Compass x={W * 0.88} y={H * 0.86} />

      {/* ── Legend ── */}
      <G transform={`translate(${W * 0.04},${H * 0.91})`}>
        <Rect x={0} y={0} width={110} height={38} rx={7} fill="rgba(255,255,255,0.55)" />
        <Circle cx={12} cy={12} r={5} fill={C.land} stroke={C.landEdge} strokeWidth={1} />
        <Text x={22} y={16} fill={C.text} fontSize={9}>Récif corallien</Text>
        <Circle cx={12} cy={26} r={5} fill={C.lagoon} stroke={C.reef} strokeWidth={1} />
        <Text x={22} y={30} fill={C.text} fontSize={9}>Lagon</Text>
      </G>
    </Svg>
  );
}
