import React, { useState } from 'react';
import { MapPin, Globe, Sparkles } from 'lucide-react';

export default function WorldMap({ selectedCountry, onSelectCountry, topCountries }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Geographic pulse points for top breach hubs
  const pins = [
    { name: 'États-Unis', code: 'US', x: 23, y: 35, count: 49 },
    { name: 'France', code: 'FR', x: 48, y: 31, count: 7 },
    { name: 'Royaume-Uni', code: 'GB', x: 46.5, y: 27, count: 10 },
    { name: 'Allemagne', code: 'DE', x: 50.5, y: 28, count: 17 },
    { name: 'Italie', code: 'IT', x: 52, y: 34, count: 18 },
    { name: 'Thaïlande', code: 'TH', x: 79, y: 48, count: 5 },
    { name: 'Canada', code: 'CA', x: 24, y: 25, count: 4 },
    { name: 'Brésil', code: 'BR', x: 34, y: 68, count: 4 },
    { name: 'Australie', code: 'AU', x: 86, y: 72, count: 4 },
    { name: 'Inde', code: 'IN', x: 71, y: 43, count: 3 }
  ];

  return (
    <div className="relative w-full h-[380px] bg-[#0c0f1c] rounded-xl border border-slate-800/80 p-4 overflow-hidden flex flex-col justify-between group">
      {/* Background Cyber Grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

      {/* Header Info */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div>
          <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" /> ATTAQUES PAR PAYS
          </h3>
          <p className="text-[11px] text-slate-400">Visualisation géographique & points d'impacts</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
          <span>Niveau de menace global : ÉLEVÉ</span>
        </div>
      </div>

      {/* Map SVG Container */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-2">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full max-h-[300px] object-contain drop-shadow-[0_0_20px_rgba(157,78,221,0.15)]"
        >
          <g fill="#1a1a36" stroke="#2c2c54" strokeWidth="0.8">
            {/* North America */}
            <path
              d="M150,120 L280,100 L320,180 L280,240 L210,230 L160,190 Z"
              className={`transition-colors cursor-pointer hover:fill-purple-600/80 ${selectedCountry === 'US' || selectedCountry === 'CA' ? 'fill-purple-600' : 'fill-purple-900/40'}`}
              onClick={() => onSelectCountry('US')}
              onMouseEnter={() => setHoveredCountry('États-Unis (49 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* South America */}
            <path
              d="M300,260 L360,270 L380,360 L330,440 L290,380 Z"
              className={`transition-colors cursor-pointer hover:fill-purple-600/80 ${selectedCountry === 'BR' ? 'fill-purple-600' : 'fill-purple-900/40'}`}
              onClick={() => onSelectCountry('BR')}
              onMouseEnter={() => setHoveredCountry('Amérique du Sud / Brésil (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Europe */}
            <path
              d="M450,110 L540,100 L560,160 L490,190 L460,150 Z"
              className={`transition-colors cursor-pointer hover:fill-purple-600/80 ${selectedCountry === 'FR' || selectedCountry === 'DE' || selectedCountry === 'IT' || selectedCountry === 'GB' ? 'fill-purple-500' : 'fill-purple-800/60'}`}
              onClick={() => onSelectCountry('FR')}
              onMouseEnter={() => setHoveredCountry('Europe / France, Italie, All (50+ victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Africa */}
            <path
              d="M470,200 L560,200 L580,320 L510,380 L460,270 Z"
              className="transition-colors cursor-pointer fill-purple-950/40 hover:fill-purple-700/60"
              onMouseEnter={() => setHoveredCountry('Afrique (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Asia */}
            <path
              d="M570,90 L850,80 L880,240 L720,270 L570,180 Z"
              className={`transition-colors cursor-pointer hover:fill-purple-600/80 ${selectedCountry === 'TH' || selectedCountry === 'IN' ? 'fill-purple-600' : 'fill-purple-900/50'}`}
              onClick={() => onSelectCountry('TH')}
              onMouseEnter={() => setHoveredCountry('Asie (28 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Australia */}
            <path
              d="M800,320 L910,320 L890,410 L810,400 Z"
              className={`transition-colors cursor-pointer hover:fill-purple-600/80 ${selectedCountry === 'AU' ? 'fill-purple-600' : 'fill-purple-900/40'}`}
              onClick={() => onSelectCountry('AU')}
              onMouseEnter={() => setHoveredCountry('Australie (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
          </g>

          {/* Glowing Animated Pulse Pins */}
          {pins.map((pin, i) => (
            <g
              key={i}
              transform={`translate(${pin.x * 10}, ${pin.y * 5})`}
              className="cursor-pointer group/pin"
              onClick={() => onSelectCountry(pin.code)}
              onMouseEnter={() => setHoveredCountry(`${pin.name} (${pin.count} victimes)`)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <circle r="12" className="fill-purple-500/20 animate-ping" />
              <circle r="5" className="fill-cyan-400 stroke-2 stroke-slate-900 drop-shadow-[0_0_8px_#00f2fe]" />
            </g>
          ))}
        </svg>
      </div>

      {/* Map Footer & Hover Tooltip */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Survoler un continent ou cliquer sur un point pour filtrer</span>
        </div>
        {hoveredCountry && (
          <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-200 font-semibold animate-fade-in">
            📍 {hoveredCountry}
          </div>
        )}
      </div>
    </div>
  );
}
