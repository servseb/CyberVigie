import React, { useState, useEffect } from 'react';
import { Globe, Radar, Radio, Sparkles, ShieldAlert, ArrowRight, Zap, Target, Flame, RefreshCw } from 'lucide-react';

export default function WorldMap({ selectedCountry, onSelectCountry }) {
  const [selectedTrajectory, setSelectedTrajectory] = useState(null);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Auto globe rotation effect
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isRotating]);

  // List of Live Dynamic Cyberattack Arcs (Origin Source ➔ Victim Destination)
  const attackArcs = [
    {
      id: 'arc-1',
      group: 'Qilin',
      origin: { name: 'Serveur C2 Qilin (Moscou)', country: 'Russie', x: 620, y: 130 },
      target: { name: 'Renault Group (Séville)', country: 'Espagne', code: 'ES', company: 'Renault Group', x: 455, y: 175 },
      volume: '1.8 TB',
      protocol: 'HTTPS / Tor Relay',
      color: '#ff2a5f',
      curveOffset: -40
    },
    {
      id: 'arc-2',
      group: 'LockBit 3.0',
      origin: { name: 'Relais LockBit (St-Pétersbourg)', country: 'Russie', x: 600, y: 110 },
      target: { name: 'Sanofi Pasteur (Lyon)', country: 'France', code: 'FR', company: 'Sanofi Pasteur', x: 480, y: 155 },
      volume: '2.4 TB',
      protocol: 'Encrypted TLS 1.3',
      color: '#e11d48',
      curveOffset: -50
    },
    {
      id: 'arc-3',
      group: 'Akira',
      origin: { name: 'Noeud Akira C2 (Prague)', country: 'Tchéquie', x: 520, y: 140 },
      target: { name: 'BNP Paribas PF (Paris)', country: 'France', code: 'FR', company: 'BNP Paribas PF', x: 475, y: 150 },
      volume: '1.1 TB',
      protocol: 'RDP Exploit Tunnel',
      color: '#4f46e5',
      curveOffset: -30
    },
    {
      id: 'arc-4',
      group: 'BlackCat / ALPHV',
      origin: { name: 'Serveur Exfiltration (Sofia)', country: 'Bulgarie', x: 555, y: 165 },
      target: { name: 'Air France-KLM Cargo (Paris)', country: 'France', code: 'FR', company: 'Air France-KLM', x: 475, y: 150 },
      volume: '920 GB',
      protocol: 'rclone SFTP Stream',
      color: '#059669',
      curveOffset: -45
    },
    {
      id: 'arc-5',
      group: 'Qilin',
      origin: { name: 'Serveur C2 Qilin (Moscou)', country: 'Russie', x: 620, y: 130 },
      target: { name: 'Logitech International (Lausanne)', country: 'Suisse', code: 'CH', company: 'Logitech S.A.', x: 495, y: 160 },
      volume: '2.1 TB',
      protocol: 'VPN Zero-Day Exploit',
      color: '#d97706',
      curveOffset: -35
    },
    {
      id: 'arc-6',
      group: 'SilentRansomGroup',
      origin: { name: 'Proxy Extorsion (Varsovie)', country: 'Pologne', x: 535, y: 135 },
      target: { name: 'Troutman Pepper (New York)', country: 'États-Unis', code: 'US', company: 'Troutman Pepper', x: 230, y: 175 },
      volume: '1.4 TB',
      protocol: 'Custom RAT Payload',
      color: '#7c3aed',
      curveOffset: -80
    },
    {
      id: 'arc-7',
      group: 'Cactus',
      origin: { name: 'Proxy Stealth (Bucarest)', country: 'Roumanie', x: 550, y: 160 },
      target: { name: 'Schneider Electric (Paris)', country: 'France', code: 'FR', company: 'Schneider Electric', x: 475, y: 150 },
      volume: '1.6 TB',
      protocol: 'SCADA Intercept',
      color: '#0284c7',
      curveOffset: -35
    }
  ];

  // Helper to generate smooth curved 3D Bezier path strings (d attribute)
  const calculateArcPath = (x1, y1, x2, y2, curveOffset = -40) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 + curveOffset;
    return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  };

  const activeArc = selectedTrajectory || attackArcs[0];

  return (
    <div className="pixar-card relative w-full h-[430px] p-5 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-sky-950 via-slate-900 to-sky-950 text-white border-4 border-sky-300">
      
      {/* Ambient Grid Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

      {/* Header Info */}
      <div className="relative z-20 flex items-center justify-between pointer-events-none">
        <div>
          <h3 className="text-xs font-sans font-black tracking-wider text-sky-300 uppercase flex items-center gap-2">
            <Globe className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '20s' }} />
            MAPMONDE 3D : TRAJECTOIRES D'ATTAQUES EN TEMPS RÉEL 🚀
          </h3>
          <p className="text-xs text-sky-200 font-sans font-bold mt-0.5">
            Arcs dynamiques reliant les serveurs attaquants (origines) aux entreprises cibles (destinations)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="pointer-events-auto px-3 py-1.5 rounded-full bg-sky-900/80 hover:bg-sky-800 text-sky-200 border border-sky-400 text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Pause Rotation 3D' : 'Poursuivre Rotation'}</span>
          </button>
        </div>
      </div>

      {/* 3D GLOBE SVG CANVAS WITH DYNAMIC ARCS */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-1 overflow-hidden">
        
        {/* Atmosphere Glow Aura */}
        <div className="absolute w-[340px] h-[340px] rounded-full bg-sky-500/10 border-2 border-sky-400/30 blur-sm pointer-events-none animate-pulse"></div>

        <svg viewBox="0 0 1000 500" className="w-full h-full max-h-[330px] object-contain relative z-10 drop-shadow-2xl">
          
          <defs>
            {/* Gradients for Arcs */}
            <linearGradient id="arc-gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff2a5f" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="arc-gradient-indigo" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="1" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="arc-gradient-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* 3D Sphere Wireframe & Latitude Rings */}
          <g stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.2" fill="none">
            <circle cx="500" cy="250" r="220" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="2" />
            <ellipse cx="500" cy="250" rx="220" ry="70" />
            <ellipse cx="500" cy="250" rx="220" ry="140" />
            <ellipse cx="500" cy="250" rx="110" ry="220" />
            <line x1="280" y1="250" x2="720" y2="250" strokeDasharray="4 4" />
            <line x1="500" y1="30" x2="500" y2="470" strokeDasharray="4 4" />
          </g>

          {/* Stylized Continents Shape Overlay */}
          <g fill="rgba(14, 165, 233, 0.25)" stroke="#38bdf8" strokeWidth="1.5">
            {/* North America */}
            <path d="M180,120 L300,100 L340,190 L280,240 L210,230 L180,180 Z" />
            {/* South America */}
            <path d="M310,260 L370,270 L390,370 L330,440 L290,380 Z" />
            {/* Europe */}
            <path d="M450,110 L560,100 L580,170 L490,190 L460,150 Z" />
            {/* Africa */}
            <path d="M470,200 L560,200 L580,320 L510,380 L460,270 Z" />
            {/* Asia */}
            <path d="M570,90 L850,80 L880,240 L720,270 L570,180 Z" />
          </g>

          {/* DYNAMIC DUAL ATTACK ARCS & TRAJECTORY RAYS */}
          {attackArcs.map((arc) => {
            const isSelected = activeArc.id === arc.id;
            const pathD = calculateArcPath(arc.origin.x, arc.origin.y, arc.target.x, arc.target.y, arc.curveOffset);

            return (
              <g key={arc.id} className="cursor-pointer group/arc" onClick={() => {
                setSelectedTrajectory(arc);
                if (onSelectCountry) onSelectCountry(arc.target.code);
              }}>
                {/* Background Shadow Arc */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth={isSelected ? '5' : '2.5'}
                  strokeOpacity={isSelected ? '0.9' : '0.4'}
                  className="transition-all duration-300 group-hover/arc:stroke-width-4"
                />

                {/* Animated Energy Flowing Particles along the Arc */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={isSelected ? '4' : '2.5'}
                  strokeDasharray="10 30"
                  strokeLinecap="round"
                  className="animate-radar-sweep"
                  style={{ animationDuration: '4s' }}
                />

                {/* ORIGIN SOURCE NODE (RED PULSE) */}
                <g transform={`translate(${arc.origin.x}, ${arc.origin.y})`}>
                  <circle r="10" fill="#ff2a5f" opacity="0.4" className="animate-ping" />
                  <circle r="4" fill="#ff2a5f" stroke="#ffffff" strokeWidth="1.5" />
                </g>

                {/* TARGET DESTINATION NODE (CYAN/BLUE PULSE) */}
                <g transform={`translate(${arc.target.x}, ${arc.target.y})`}>
                  <circle r="12" fill="#00f2fe" opacity="0.3" className="animate-ping" />
                  <circle r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* FOOTER INSPECTION CARD: ACTIVE SELECTED TRAJECTORY METADATA */}
      <div className="relative z-20 p-3.5 rounded-2xl bg-slate-900/90 border-2 border-sky-400/50 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
            💥
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-rose-400 bg-rose-950 border border-rose-800 px-2 py-0.5 rounded font-bold uppercase">
                TRAJECTOIRE ACTIVE : {activeArc.group}
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 border border-cyan-800 px-2 py-0.5 rounded font-bold">
                VOL : {activeArc.volume}
              </span>
            </div>
            <div className="text-xs font-sans font-bold text-white mt-1 flex items-center gap-2 flex-wrap">
              <span className="text-rose-300 font-mono">📍 {activeArc.origin.name}</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-mono">🎯 {activeArc.target.company} ({activeArc.target.country})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
            Protocole : {activeArc.protocol}
          </span>
        </div>
      </div>
    </div>
  );
}
