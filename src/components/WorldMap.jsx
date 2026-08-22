import React, { useState } from 'react';
import { Globe, Sparkles, Radar, Radio, ShieldAlert } from 'lucide-react';

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
    <div className="cyber-card cyber-hud-card relative w-full h-[390px] p-4 flex flex-col justify-between overflow-hidden bg-[#050812]">
      {/* Tactical Radar Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      {/* Header Info Bar */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div>
          <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
            <Radar className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
            RADAR DE DÉTECTION TACTIQUE (GLOBAL THREAT RADAR)
          </h3>
          <p className="text-[11px] font-mono text-slate-400">Balayage en temps réel des zones sous ciblage ransomware</p>
        </div>
        
        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          <span>45 TERRITOIRES IMPLIQUÉS</span>
        </div>
      </div>

      {/* Map & Radar SVG Overlay */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-1 overflow-hidden">
        {/* Radar Sweep Rotator Beam Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-[360px] h-[360px] rounded-full border border-cyan-500/20 relative animate-radar-sweep bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,242,254,0.3)_360deg)]"></div>
        </div>

        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full max-h-[290px] object-contain relative z-10 drop-shadow-[0_0_15px_rgba(0,242,254,0.15)]"
        >
          {/* Radar Concentric Rings */}
          <g stroke="rgba(0, 242, 254, 0.15)" strokeWidth="0.8" fill="none" strokeDasharray="3 3">
            <circle cx="500" cy="250" r="120" />
            <circle cx="500" cy="250" r="220" />
            <circle cx="500" cy="250" r="340" />
            <line x1="0" y1="250" x2="1000" y2="250" />
            <line x1="500" y1="0" x2="500" y2="500" />
          </g>

          {/* Continents Vectors */}
          <g fill="#0e172a" stroke="#1e293b" strokeWidth="1">
            {/* North America */}
            <path
              d="M150,120 L280,100 L320,180 L280,240 L210,230 L160,190 Z"
              className={`transition-all cursor-pointer hover:fill-cyan-500/40 ${selectedCountry === 'US' || selectedCountry === 'CA' ? 'fill-cyan-500/40 stroke-cyan-400' : ''}`}
              onClick={() => onSelectCountry('US')}
              onMouseEnter={() => setHoveredCountry('Amérique du Nord (49 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* South America */}
            <path
              d="M300,260 L360,270 L380,360 L330,440 L290,380 Z"
              className={`transition-all cursor-pointer hover:fill-cyan-500/40 ${selectedCountry === 'BR' ? 'fill-cyan-500/40 stroke-cyan-400' : ''}`}
              onClick={() => onSelectCountry('BR')}
              onMouseEnter={() => setHoveredCountry('Amérique du Sud / Brésil (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Europe */}
            <path
              d="M450,110 L540,100 L560,160 L490,190 L460,150 Z"
              className={`transition-all cursor-pointer hover:fill-cyan-500/40 ${selectedCountry === 'FR' || selectedCountry === 'DE' || selectedCountry === 'IT' || selectedCountry === 'GB' ? 'fill-cyan-500/40 stroke-cyan-400' : ''}`}
              onClick={() => onSelectCountry('FR')}
              onMouseEnter={() => setHoveredCountry('Europe / France, Italie, All (50+ victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Africa */}
            <path
              d="M470,200 L560,200 L580,320 L510,380 L460,270 Z"
              className="transition-all cursor-pointer hover:fill-cyan-500/40"
              onMouseEnter={() => setHoveredCountry('Afrique (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Asia */}
            <path
              d="M570,90 L850,80 L880,240 L720,270 L570,180 Z"
              className={`transition-all cursor-pointer hover:fill-cyan-500/40 ${selectedCountry === 'TH' || selectedCountry === 'IN' ? 'fill-cyan-500/40 stroke-cyan-400' : ''}`}
              onClick={() => onSelectCountry('TH')}
              onMouseEnter={() => setHoveredCountry('Asie (28 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
            {/* Australia */}
            <path
              d="M800,320 L910,320 L890,410 L810,400 Z"
              className={`transition-all cursor-pointer hover:fill-cyan-500/40 ${selectedCountry === 'AU' ? 'fill-cyan-500/40 stroke-cyan-400' : ''}`}
              onClick={() => onSelectCountry('AU')}
              onMouseEnter={() => setHoveredCountry('Australie (4 victimes)')}
              onMouseLeave={() => setHoveredCountry(null)}
            />
          </g>

          {/* Tactical Target Nodes Pins */}
          {pins.map((pin, i) => (
            <g
              key={i}
              transform={`translate(${pin.x * 10}, ${pin.y * 5})`}
              className="cursor-pointer group/pin"
              onClick={() => onSelectCountry(pin.code)}
              onMouseEnter={() => setHoveredCountry(`${pin.name} (${pin.count} victimes)`)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <circle r="12" className="fill-cyan-400/20 animate-ping" />
              <circle r="4.5" className="fill-cyan-400 stroke-2 stroke-slate-950 shadow-lg" />
            </g>
          ))}
        </svg>
      </div>

      {/* Map Footer & Hover Tooltip */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Faisceau radar actif : Clic sur une cible pour appliquer le filtre d'investigation</span>
        </div>
        {hoveredCountry && (
          <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-300 font-bold text-xs animate-fade-in shadow-md">
            🎯 {hoveredCountry}
          </div>
        )}
      </div>
    </div>
  );
}
