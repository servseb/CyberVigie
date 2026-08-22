import React, { useState } from 'react';
import { Globe, Radar, Radio, Sparkles } from 'lucide-react';

export default function WorldMap({ selectedCountry, onSelectCountry, topCountries }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const pins = [
    { name: 'États-Unis', code: 'US', x: 23, y: 35, count: 49 },
    { name: 'France', code: 'FR', x: 48, y: 31, count: 7 },
    { name: 'Royaume-Uni', code: 'GB', x: 46.5, y: 27, count: 10 },
    { name: 'Allemagne', code: 'DE', x: 50.5, y: 28, count: 17 },
    { name: 'Italie', code: 'IT', x: 52, y: 34, count: 18 },
    { name: 'Espagne', code: 'ES', x: 46, y: 35, count: 4 },
    { name: 'Thaïlande', code: 'TH', x: 79, y: 48, count: 5 },
    { name: 'Canada', code: 'CA', x: 24, y: 25, count: 4 },
    { name: 'Brésil', code: 'BR', x: 34, y: 68, count: 4 },
    { name: 'Australie', code: 'AU', x: 86, y: 72, count: 4 },
    { name: 'Inde', code: 'IN', x: 71, y: 43, count: 3 }
  ];

  return (
    <div className="pixar-card relative w-full h-[390px] p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-sky-50 to-white">
      {/* Light Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div>
          <h3 className="text-xs font-sans font-black tracking-wider text-sky-900 uppercase flex items-center gap-2">
            <Radar className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: '8s' }} />
            CARTE INTERACTIVE PIXAR 3D DES SOCIÉTÉS 🗺️
          </h3>
          <p className="text-xs text-sky-700 font-sans font-bold mt-0.5">Explorez les zones ciblées par les pirates cyber</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-sans font-extrabold text-sky-900 bg-white border-2 border-sky-200 px-3.5 py-1 rounded-full shadow-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>45 PAYS IMPACTÉS 🌍</span>
        </div>
      </div>

      {/* SVG Map */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-1 overflow-hidden">
        {/* Radar Sweep Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
          <div className="w-[360px] h-[360px] rounded-full border-2 border-sky-400 relative animate-radar-sweep bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(56,189,248,0.5)_360deg)]"></div>
        </div>

        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full max-h-[290px] object-contain relative z-10 drop-shadow-md"
        >
          {/* Rings */}
          <g stroke="#bae6fd" strokeWidth="1.5" fill="none" strokeDasharray="4 4">
            <circle cx="500" cy="250" r="120" />
            <circle cx="500" cy="250" r="220" />
            <circle cx="500" cy="250" r="340" />
          </g>

          {/* Continents Vectors */}
          <g fill="#bae6fd" stroke="#38bdf8" strokeWidth="2">
            {/* North America */}
            <path
              d="M150,120 L280,100 L320,180 L280,240 L210,230 L160,190 Z"
              className={`transition-all cursor-pointer hover:fill-sky-300 ${selectedCountry === 'US' || selectedCountry === 'CA' ? 'fill-sky-400 stroke-sky-600' : ''}`}
              onClick={() => onSelectCountry('US')}
              onMouseEnter={() => setHoveredCountry('Amérique du Nord (49 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* South America */}
            <path
              d="M300,260 L360,270 L380,360 L330,440 L290,380 Z"
              className={`transition-all cursor-pointer hover:fill-sky-300 ${selectedCountry === 'BR' ? 'fill-sky-400 stroke-sky-600' : ''}`}
              onClick={() => onSelectCountry('BR')}
              onMouseEnter={() => setHoveredCountry('Amérique du Sud (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Europe */}
            <path
              d="M450,110 L540,100 L560,160 L490,190 L460,150 Z"
              className={`transition-all cursor-pointer hover:fill-sky-300 ${selectedCountry === 'FR' || selectedCountry === 'DE' || selectedCountry === 'IT' || selectedCountry === 'GB' || selectedCountry === 'ES' ? 'fill-sky-400 stroke-sky-600' : ''}`}
              onClick={() => onSelectCountry('FR')}
              onMouseEnter={() => setHoveredCountry('Europe / France, Espagne, Italie (50+ victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Africa */}
            <path
              d="M470,200 L560,200 L580,320 L510,380 L460,270 Z"
              className="transition-all cursor-pointer hover:fill-sky-300"
              onMouseEnter={() => setHoveredCountry('Afrique (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Asia */}
            <path
              d="M570,90 L850,80 L880,240 L720,270 L570,180 Z"
              className={`transition-all cursor-pointer hover:fill-sky-300 ${selectedCountry === 'TH' || selectedCountry === 'IN' ? 'fill-sky-400 stroke-sky-600' : ''}`}
              onClick={() => onSelectCountry('TH')}
              onMouseEnter={() => setHoveredCountry('Asie (28 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Australia */}
            <path
              d="M800,320 L910,320 L890,410 L810,400 Z"
              className={`transition-all cursor-pointer hover:fill-sky-300 ${selectedCountry === 'AU' ? 'fill-sky-400 stroke-sky-600' : ''}`}
              onClick={() => onSelectCountry('AU')}
              onMouseEnter={() => setHoveredCountry('Australie (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
          </g>

          {/* Pins */}
          {pins.map((pin, i) => (
            <g
              key={i}
              transform={`translate(${pin.x * 10}, ${pin.y * 5})`}
              className="cursor-pointer group/pin"
              onClick={() => onSelectCountry(pin.code)}
              onMouseEnter={() => setHoveredCountry(`${pin.name} (${pin.count} entreprises)`)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <circle r="14" className="fill-amber-400/40 animate-ping" />
              <circle r="6" className="fill-rose-500 stroke-2 stroke-white shadow-lg" />
            </g>
          ))}
        </svg>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t-2 border-sky-100 text-xs font-sans font-bold">
        <div className="flex items-center gap-2 text-sky-800">
          <Radio className="w-4 h-4 text-sky-600 animate-pulse" />
          <span>Filtrez les entreprises en cliquant sur une région de la carte 🗺️</span>
        </div>
        {hoveredCountry && (
          <div className="px-3.5 py-1 bg-amber-100 border-2 border-amber-300 rounded-full text-amber-900 font-extrabold text-xs animate-fade-in shadow-md">
            🎯 {hoveredCountry}
          </div>
        )}
      </div>
    </div>
  );
}
