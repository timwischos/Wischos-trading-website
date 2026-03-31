// Coordinate system: lon 108–122, lat 20–32 → SVG 1200×375
// x = (lon - 108) / 14 * 1200
// y = (32 - lat) / 12 * 375

const cities = [
  { name: 'Yangjiang',  x: 340, y: 317, anchor: 'end' },
  { name: 'Dongguan',   x: 493, y: 281, anchor: 'start' },
  { name: 'Zhongshan',  x: 462, y: 296, anchor: 'end' },
  { name: 'Shenzhen',   x: 519, y: 296, anchor: 'start' },
  { name: 'Yiwu',       x: 1035, y: 84, anchor: 'end' },
  { name: 'Wenzhou',    x: 1086, y: 125, anchor: 'start' },
]

// Simplified province outlines (approximate polygons)
const provinces = [
  {
    id: 'guangxi',
    d: 'M 43,203 L 300,203 L 343,250 L 214,313 L 129,328 L 17,313 L 0,219 Z',
    highlight: false,
  },
  {
    id: 'guangdong',
    d: 'M 300,203 L 557,203 L 771,234 L 729,266 L 557,297 L 471,306 L 429,313 L 343,328 L 214,313 L 343,250 Z',
    highlight: true,
  },
  {
    id: 'fujian',
    d: 'M 771,125 L 1071,117 L 1029,188 L 900,234 L 771,234 Z',
    highlight: false,
  },
  {
    id: 'zhejiang',
    d: 'M 857,31 L 1157,31 L 1200,63 L 1114,125 L 1071,117 L 943,94 L 900,78 Z',
    highlight: true,
  },
  {
    id: 'jiangxi',
    d: 'M 557,63 L 814,63 L 857,94 L 814,125 L 771,156 L 643,203 L 557,203 L 514,172 L 471,125 Z',
    highlight: false,
  },
  {
    id: 'hunan',
    d: 'M 77,63 L 514,63 L 471,125 L 514,172 L 557,203 L 300,203 L 257,156 L 171,94 L 129,63 Z',
    highlight: false,
  },
]

export function ManufacturingMapSection() {
  return (
    <div style={{ borderBottom: '1px solid var(--grid-color)', background: '#0a0a0a', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1200 375"
        width="100%"
        style={{ display: 'block' }}
        aria-label="Manufacturing network across Southern China"
      >
        <defs>
          <style>{`
            @keyframes pulse {
              0%   { r: 8; opacity: 0.4; }
              100% { r: 18; opacity: 0; }
            }
            .city-pulse { animation: pulse 2.4s ease-out infinite; }
          `}</style>
        </defs>

        {/* Province fills */}
        {provinces.map((p) => (
          <path
            key={p.id}
            d={p.d}
            fill={p.highlight ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.022)'}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
          />
        ))}

        {/* City dots + labels */}
        {cities.map((c) => (
          <g key={c.name}>
            {/* Pulse ring */}
            <circle
              className="city-pulse"
              cx={c.x}
              cy={c.y}
              r={8}
              fill="none"
              stroke="#B87333"
              strokeWidth="1"
              style={{ animationDelay: `${cities.indexOf(c) * 0.4}s` }}
            />
            {/* Dot */}
            <circle cx={c.x} cy={c.y} r={3.5} fill="#B87333" />
            {/* Label */}
            <text
              x={c.anchor === 'end' ? c.x - 12 : c.x + 12}
              y={c.y - 10}
              textAnchor={c.anchor as 'end' | 'start'}
              fontSize="11"
              fill="#888"
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.06em"
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
