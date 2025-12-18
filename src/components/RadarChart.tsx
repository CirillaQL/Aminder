import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import { Point } from '@visx/point';
import { Line, LineRadial } from '@visx/shape';

const orange = '#8c7b70';
const silver = '#d9d0c7';
const background = 'transparent';

// Colors for each of the Big Five traits
const traitColors = [
  '#546e7a', // Openness (Blue-grey)
  '#4e6e5d', // Conscientiousness (Olive)
  '#8e5a5a', // Extraversion (Terra cotta)
  '#9e8e5a', // Agreeableness (Ochre)
  '#6b5a8e', // Neuroticism (Deep mauve)
];

const degrees = 360;

export interface RadarData {
  label: string;
  value: number;
}

const y = (d: RadarData) => d.value;

const genAngles = (length: number) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: i * (degrees / length) + (length % 2 === 0 ? 0 : degrees / length / 2),
  }));

const genPoints = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length;
  return [...new Array(length)].map((_, i) => ({
    x: radius * Math.sin(i * step),
    y: radius * Math.cos(i * step),
  }));
};

function genPolygonPoints<Datum>(
  dataArray: Datum[],
  scale: (n: number) => number,
  getValue: (d: Datum) => number,
) {
  const step = (Math.PI * 2) / dataArray.length;
  const points: { x: number; y: number }[] = new Array(dataArray.length).fill({ x: 0, y: 0 });
  const pointString: string = new Array(dataArray.length).fill('').reduce((res, _, i) => {
    const xVal = scale(getValue(dataArray[i])) * Math.sin(i * step);
    const yVal = scale(getValue(dataArray[i])) * Math.cos(i * step);
    points[i] = { x: xVal, y: yVal };
    res += `${xVal},${yVal} `;
    return res;
  }, '');

  return { points, pointString };
}

const defaultMargin = { top: 40, left: 40, right: 40, bottom: 40 };

export type RadarProps = {
  width: number;
  height: number;
  data: RadarData[];
  margin?: { top: number; right: number; bottom: number; left: number };
  levels?: number;
};

export default function RadarChart({ width, height, data, levels = 5, margin = defaultMargin }: RadarProps) {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radius = Math.min(xMax, yMax) / 2;

  const radialScale = scaleLinear<number>({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  const yScale = scaleLinear<number>({
    range: [0, radius],
    domain: [0, 1], // Values are 0 to 1
  });

  const webs = genAngles(data.length);
  const points = genPoints(data.length, radius);
  const polygonPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0, y);
  const zeroPoint = new Point({ x: 0, y: 0 });

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect fill={background} width={width} height={height} rx={14} />
      <Group top={height / 2} left={width / 2}>
        {[...new Array(levels)].map((_, i) => (
          <LineRadial
            key={`web-${i}`}
            data={webs}
            angle={(d) => radialScale(d.angle) ?? 0}
            radius={((i + 1) * radius) / levels}
            fill="none"
            stroke={silver}
            strokeWidth={1}
            strokeOpacity={0.8}
            strokeLinecap="round"
          />
        ))}
        {[...new Array(data.length)].map((_, i) => (
          <Line key={`radar-line-${i}`} from={zeroPoint} to={points[i]} stroke={silver} />
        ))}
        <polygon
          points={polygonPoints.pointString}
          fill={orange}
          fillOpacity={0.2}
          stroke={orange}
          strokeWidth={1}
        />
        {polygonPoints.points.map((point, i) => (
          <circle 
            key={`radar-point-${i}`} 
            cx={point.x} 
            cy={point.y} 
            r={4} 
            fill={traitColors[i % traitColors.length]} 
          />
        ))}
        
        {/* Labels */}
        {points.map((point, i) => {
           const labelX = point.x * 1.25;
           const labelY = point.y * 1.25;
           const color = traitColors[i % traitColors.length];
           return (
             <text
               key={`radar-label-${i}`}
               x={labelX}
               y={labelY}
               dy=".35em"
               fontSize={12}
               fill={color}
               textAnchor="middle"
               fontFamily="serif"
               fontWeight="bold"
             >
               {data[i].label}
             </text>
           );
        })}
      </Group>
    </svg>
  );
}
