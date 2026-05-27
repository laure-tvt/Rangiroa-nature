import React from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, {
  Rect,
  Path,
  Ellipse,
  Circle,
  Text,
  G,
  Polygon,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';

const C = {
  ocean:      '#a8d8ea',
  oceanDark:  '#7ab8d4',
  lagoon:     '#b8ecec',
  lagoonInner:'#d0f8f8',
  land:       '#f5e6c8',
  landShade:  '#ddc898',
  reef:       '#7bc8c8',
  wave:       '#ffffff',
  text:       '#3d2b1f',
  accent:     '#e8a87c',
  compass:    '#8b6b14',
};

const VW = 390;
const VH = 320;

/** Boussole vintage en bas à droite */
function Compass() {
  return (
    <G transform="translate(355,285)">
      <Circle r={22} fill="rgba(255,255,255,0.75)" stroke={C.compass} strokeWidth={1} />
      {/* N */}
      <Polygon points="0,-17 -4,-5 4,-5" fill={C.compass} />
      {/* S */}
      <Polygon points="0,17 -4,5 4,5" fill={C.compass} fillOpacity={0.45} />
      {/* E */}
      <Polygon points="17,0 5,-4 5,4" fill={C.compass} fillOpacity={0.45} />
      {/* W */}
      <Polygon points="-17,0 -5,-4 -5,4" fill={C.compass} fillOpacity={0.45} />
      <Circle r={3} fill={C.compass} />
      <Text x={0} y={-21} textAnchor="middle" fill={C.compass} fontSize={8} fontWeight="bold">N</Text>
    </G>
  );
}

/** Vagues décoratives SVG */
function Waves() {
  const waveLines = [
    { y: 50,  opacity: 0.22 },
    { y: 68,  opacity: 0.15 },
    { y: 240, opacity: 0.20 },
    { y: 258, opacity: 0.13 },
  ];
  return (
    <>
      {waveLines.map((w, i) => (
        <Path
          key={i}
          d={`M 0,${w.y} C 50,${w.y - 5} 100,${w.y + 5} 150,${w.y} C 200,${w.y - 5} 250,${w.y + 5} 300,${w.y} C 340,${w.y - 4} 370,${w.y + 4} 390,${w.y}`}
          stroke={C.wave}
          strokeWidth={1}
          strokeOpacity={w.opacity}
          fill="none"
        />
      ))}
      {/* Vagues latérales */}
      <Path d="M 8,100 C 13,110 8,120 13,130 C 8,140 13,150 8,160" stroke={C.wave} strokeWidth={1} strokeOpacity={0.18} fill="none" />
      <Path d="M 382,100 C 377,110 382,120 377,130 C 382,140 377,150 382,160" stroke={C.wave} strokeWidth={1} strokeOpacity={0.18} fill="none" />
    </>
  );
}

export default function MapIllustration() {
  const { width, height } = useWindowDimensions();

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        {/* Dégradé radial pour le lagon */}
        <RadialGradient id="lagoonGrad" cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0%"   stopColor={C.lagoonInner} stopOpacity={1} />
          <Stop offset="100%" stopColor={C.lagoon}      stopOpacity={1} />
        </RadialGradient>
        {/* Dégradé radial pour l'océan */}
        <RadialGradient id="oceanGrad" cx="50%" cy="50%" rx="70%" ry="70%">
          <Stop offset="0%"   stopColor={C.ocean}     stopOpacity={1} />
          <Stop offset="100%" stopColor={C.oceanDark} stopOpacity={1} />
        </RadialGradient>
      </Defs>

      {/* ── Fond océan ── */}
      <Rect x={0} y={0} width={VW} height={VH} fill="url(#oceanGrad)" />

      {/* ── Vagues décoratives ── */}
      <Waves />

      {/* ── Titre ── */}
      <Text
        x={VW / 2} y={30}
        textAnchor="middle"
        fill={C.text}
        fontSize={28}
        fontWeight="bold"
        fontStyle="italic"
        opacity={0.9}
      >
        Rangiroa
      </Text>
      <Text
        x={VW / 2} y={48}
        textAnchor="middle"
        fill={C.text}
        fontSize={11}
        opacity={0.6}
        letterSpacing={1.5}
      >
        POLYNÉSIE FRANÇAISE
      </Text>

      {/* ── Atoll — couche externe (terre/récif) ── */}
      {/* Forme légèrement irrégulière style croquis */}
      <Path
        d={[
          'M 22,162',
          'C 20,95  85,55  195,54',
          'C 306,53  372,95  371,162',
          'C 370,230  305,272  195,272',
          'C 85,272  24,230  22,162 Z',
        ].join(' ')}
        fill={C.land}
        stroke={C.landShade}
        strokeWidth={2}
      />

      {/* ── Lagon (enlève le centre) ── */}
      <Path
        d={[
          'M 62,162',
          'C 62,108  120,74  195,74',
          'C 270,74  328,108  328,162',
          'C 328,216  270,250  195,250',
          'C 120,250  62,216  62,162 Z',
        ].join(' ')}
        fill="url(#lagoonGrad)"
      />

      {/* Contour récif intérieur */}
      <Path
        d={[
          'M 62,162',
          'C 62,108  120,74  195,74',
          'C 270,74  328,108  328,162',
          'C 328,216  270,250  195,250',
          'C 120,250  62,216  62,162 Z',
        ].join(' ')}
        fill="none"
        stroke={C.reef}
        strokeWidth={2.5}
        strokeOpacity={0.55}
      />

      {/* ── Passes (ouvertures dans l'anneau) ── */}
      {/* Passe Tiputa — côté est */}
      <Rect x={360} y={152} width={13} height={20} fill={C.lagoon} />
      {/* Passe Avatoru — côté ouest */}
      <Rect x={17}  y={152} width={13} height={20} fill={C.lagoon} />

      {/* ── Motifs décoratifs dans le lagon ── */}
      {/* Petits fonds coralliens */}
      <Circle cx={150} cy={130} r={4} fill={C.reef} fillOpacity={0.35} />
      <Circle cx={240} cy={170} r={3} fill={C.reef} fillOpacity={0.3}  />
      <Circle cx={185} cy={200} r={3.5} fill={C.reef} fillOpacity={0.3} />
      <Circle cx={220} cy={115} r={2.5} fill={C.reef} fillOpacity={0.3} />
      <Circle cx={165} cy={175} r={2}   fill={C.reef} fillOpacity={0.25} />

      {/* Poissons stylisés (forme simple) */}
      <Path d="M 200,150 C 206,145 212,147 210,150 C 212,153 206,155 200,150 Z" fill={C.reef} fillOpacity={0.5} />
      <Path d="M 170,140 C 175,136 180,138 178,140 C 180,142 175,144 170,140 Z" fill={C.reef} fillOpacity={0.4} />

      {/* ── Boussole vintage ── */}
      <Compass />

      {/* ── Légende mini en bas gauche ── */}
      <G transform="translate(14, 278)">
        <Rect x={0} y={0} width={90} height={30} rx={5} fill="rgba(255,255,255,0.6)" />
        <Circle cx={12} cy={10} r={4} fill={C.land} stroke={C.landShade} strokeWidth={1} />
        <Text x={20} y={14} fill={C.text} fontSize={8}>Récif corallien</Text>
        <Circle cx={12} cy={22} r={4} fill={C.lagoon} stroke={C.reef} strokeWidth={1} />
        <Text x={20} y={26} fill={C.text} fontSize={8}>Lagon</Text>
      </G>
    </Svg>
  );
}
