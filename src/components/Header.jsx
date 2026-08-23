import React, { useState, useEffect } from 'react';
import { Rocket, Mail, Sparkles, RefreshCw, ShieldAlert } from 'lucide-react';

export default function Header({ onOpenEmailModal, onManualRefresh, isRefreshing, isLive, victimCount }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(`${d.toLocaleTimeString('fr-FR')} CET`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b-4 border-sky-200 shadow-md">
      {/* SOC Live Ticker Bar */}
      <div className="w-full bg-sky-900 border-b-2 border-sky-800 py-1 px-3 sm:px-4 overflow-hidden flex items-center text-[11px] sm:text-xs font-mono text-sky-100">
        <div className="flex items-center gap-1.5 shrink-0 pr-2.5 border-r border-sky-700 z-10 bg-sky-900 font-bold text-amber-300 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="hidden sm:inline">ALERTES CYBER EN DIRECT 🚀 :</span>
          <span className="sm:hidden">ALERTES 🚀 :</span>
        </div>

        <div className="overflow-hidden flex-1 relative">
          <div className="animate-ticker flex items-center gap-6 sm:gap-8 pl-3">
            <span className="flex items-center gap-1.5 text-white font-sans font-semibold">
              🚗 <strong className="text-amber-300">Renault Group (Espagne)</strong> • ⚡ Secteur Auto (1.8 TB exfiltrés par Qilin)
            </span>
            <span className="flex items-center gap-1.5 text-white font-sans font-semibold">
              💉 <strong className="text-rose-300">Sanofi Pasteur (France)</strong> • 🏥 Secteur Santé (2.4 TB ciblés par LockBit)
            </span>
            <span className="flex items-center gap-1.5 text-white font-sans font-semibold">
              🏦 <strong className="text-sky-300">BNP Paribas PF (France)</strong> • 💳 Banque & Finance (1.1 TB compromis par Akira)
            </span>
            <span className="flex items-center gap-1.5 text-white font-sans font-semibold">
              ✈️ <strong className="text-emerald-300">Air France-KLM Cargo</strong> • 📦 Aéronautique (920 GB par BlackCat)
            </span>
            <span className="flex items-center gap-1.5 text-white font-sans font-semibold">
              🎧 <strong className="text-purple-300">Logitech International</strong> • 💻 Technologie (2.1 TB par Qilin)
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0 pl-3 border-l border-sky-700 z-10 bg-sky-900 text-sky-200 font-mono">
          <ClockIcon className="w-4 h-4 text-amber-300" />
          <span>{timeStr}</span>
        </div>
      </div>

      {/* Main SOC Header Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Mascot */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex items-center justify-center cursor-pointer group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 border-2 border-sky-300 flex items-center justify-center text-white shadow-md shadow-sky-500/30 group-hover:scale-105 transition-transform animate-bounce-soft shrink-0">
              <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 items-center justify-center text-[9px] font-bold text-slate-900">⭐</span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 font-sans uppercase flex items-center gap-1.5">
                CYBERVIGIE <span className="text-sky-500 font-black text-[11px] sm:text-sm bg-sky-100 px-2 py-0.5 rounded-full border border-sky-200">SOC 3D 🛡️</span>
              </h1>
              <span className="text-[10px] sm:text-xs font-sans font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-1">
                <span>🔥</span> DEFCON 2
              </span>
              {isLive ? (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-sans text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  LIVE ACTIVE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-sans text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full font-bold">
                  CACHE ENREGISTRÉ
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-sky-700 hidden sm:block font-sans font-bold mt-0.5">
              Plateforme Souveraine de Traçabilité des Sociétés & Threat Intelligence
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Manual Refresh Button */}
          <button
            onClick={onManualRefresh}
            disabled={isRefreshing}
            className="pixar-btn-3d px-3 sm:px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-extrabold font-sans text-xs flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Mise à jour...' : 'Rafraîchir 🔄'}</span>
          </button>

          <button
            onClick={onOpenEmailModal}
            className="pixar-btn-rose-3d px-3 sm:px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold font-sans text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            <span className="hidden sm:inline">Rapport 3D 🚀</span>
            <span className="sm:hidden">Rapport 🚀</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function ClockIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
