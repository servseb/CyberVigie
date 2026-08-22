import React, { useState } from 'react';
import { Globe, Radar, Radio, ShieldAlert } from 'lucide-react';

export default function WorldMap({ selectedCountry, onSelectCountry, topCountries }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Geographic pins
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
    <div className="cyber-card relative w-full h-[390px] p-5 flex flex-col justify-between overflow-hidden bg-white border border-slate-200">
      {/* Light Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div>
          <h3 className="text-xs font-mono font-bold tracking-wider text-indigo-700 uppercase flex items-center gap-2">
            <Radar className="w-4 h-4 text-indigo-600 animate-spin" style={{ animationDuration: '10s' }} />
            CARTE TACTIQUE D'IMPACT MONDIAL DES SOCIÉTÉS
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">Localisation géographique des sièges et usines ciblés</p>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          <span>45 PAYS TOUCHÉS</span>
        </div>
      </div>

      {/* Map SVG */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-1 overflow-hidden">
        {/* Radar Sweep Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[360px] h-[360px] rounded-full border border-indigo-400 relative animate-radar-sweep bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(79,70,229,0.4)_360deg)]"></div>
        </div>

        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full max-h-[290px] object-contain relative z-10 drop-shadow-sm"
        >
          {/* Concentric Rings */}
          <g stroke="#cbd5e1" strokeWidth="0.8" fill="none" strokeDasharray="3 3">
            <circle cx="500" cy="250" r="120" />
            <circle cx="500" cy="250" r="220" />
            <circle cx="500" cy="250" r="340" />
            <line x1="0" y1="250" x2="1000" y2="250" />
            <line x1="500" y1="0" x2="500" y2="500" />
          </g>

          {/* Continents Vectors */}
          <g fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1">
            {/* North America */}
            <path
              d="M150,120 L280,100 L320,180 L280,240 L210,230 L160,190 Z"
              className={`transition-all cursor-pointer hover:fill-indigo-100 ${selectedCountry === 'US' || selectedCountry === 'CA' ? 'fill-indigo-200 stroke-indigo-500' : ''}`}
              onClick={() => onSelectCountry('US')}
              onMouseEnter={() => setHoveredCountry('Amérique du Nord (49 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* South America */}
            <path
              d="M300,260 L360,270 L380,360 L330,440 L290,380 Z"
              className={`transition-all cursor-pointer hover:fill-indigo-100 ${selectedCountry === 'BR' ? 'fill-indigo-200 stroke-indigo-500' : ''}`}
              onClick={() => onSelectCountry('BR')}
              onMouseEnter={() => setHoveredCountry('Amérique du Sud / Brésil (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Europe */}
            <path
              d="M450,110 L540,100 L560,160 L490,190 L460,150 Z"
              className={`transition-all cursor-pointer hover:fill-indigo-100 ${selectedCountry === 'FR' || selectedCountry === 'DE' || selectedCountry === 'IT' || selectedCountry === 'GB' || selectedCountry === 'ES' ? 'fill-indigo-200 stroke-indigo-500' : ''}`}
              onClick={() => onSelectCountry('FR')}
              onMouseEnter={() => setHoveredCountry('Europe / France, Espagne, Italie, Allemagne (50+ victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Africa */}
            <path
              d="M470,200 L560,200 L580,320 L510,380 L460,270 Z"
              className="transition-all cursor-pointer hover:fill-indigo-100"
              onMouseEnter={() => setHoveredCountry('Afrique (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Asia */}
            <path
              d="M570,90 L850,80 L880,240 L720,270 L570,180 Z"
              className={`transition-all cursor-pointer hover:fill-indigo-100 ${selectedCountry === 'TH' || selectedCountry === 'IN' ? 'fill-indigo-200 stroke-indigo-500' : ''}`}
              onClick={() => onSelectCountry('TH')}
              onMouseEnter={() => setHoveredCountry('Asie (28 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Australia */}
            <path
              d="M800,320 L910,320 L890,410 L810,400 Z"
              className={`transition-all cursor-pointer hover:fill-indigo-100 ${selectedCountry === 'AU' ? 'fill-indigo-200 stroke-indigo-500' : ''}`}
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
              onMouseEnter={() => setHoveredCountry(`${pin.name} (${pin.count} entreprises impactées)`)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <circle r="12" className="fill-indigo-500/20 animate-ping" />
              <circle r="5" className="fill-indigo-600 stroke-2 stroke-white shadow-md" />
            </g>
          ))}
        </svg>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-sans">
        <div className="flex items-center gap-2 text-slate-500">
          <Radio className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>Filtrez les entreprises par pays en cliquant directement sur la carte</span>
        </div>
        {hoveredCountry && (
          <div className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 font-bold text-xs animate-fade-in shadow-sm">
            🎯 {hoveredCountry}
          </div>
        )}
      </div>
    </div>
  );
}
