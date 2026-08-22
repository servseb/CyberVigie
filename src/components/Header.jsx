import React, { useState, useEffect } from 'react';
import { Shield, Mail, Activity, Flame, Building2 } from 'lucide-react';

export default function Header({ onOpenEmailModal, isLive, victimCount }) {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Ticker of Impacted Companies */}
      <div className="w-full bg-slate-900 border-b border-slate-800 py-1.5 px-4 overflow-hidden flex items-center text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-slate-700 z-10 bg-slate-900 font-bold text-rose-400 uppercase">
          <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span>DERNIÈRES SOCIÉTÉS IMPACTÉES :</span>
        </div>

        <div className="overflow-hidden flex-1 relative">
          <div className="animate-ticker flex items-center gap-8 pl-4">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Building2 className="w-3 h-3 text-cyan-400" />
              <strong className="text-white">Renault Group (ES)</strong> • <span className="text-cyan-300 font-bold">Automobile</span> (1.8 TB)
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Building2 className="w-3 h-3 text-rose-400" />
              <strong className="text-white">Sanofi Pasteur (FR)</strong> • <span className="text-rose-300 font-bold">Santé & Pharma</span> (2.4 TB)
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Building2 className="w-3 h-3 text-indigo-400" />
              <strong className="text-white">BNP Paribas PF (FR)</strong> • <span className="text-indigo-300 font-bold">Banque & Finance</span> (1.1 TB)
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Building2 className="w-3 h-3 text-emerald-400" />
              <strong className="text-white">Air France-KLM Cargo (FR)</strong> • <span className="text-emerald-300 font-bold">Aéronautique</span> (920 GB)
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Building2 className="w-3 h-3 text-amber-400" />
              <strong className="text-white">Logitech International (CH)</strong> • <span className="text-amber-300 font-bold">Technologie</span> (2.1 TB)
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0 pl-3 border-l border-slate-700 z-10 bg-slate-900 text-slate-400 font-mono">
          <ClockIcon className="w-3.5 h-3.5 text-indigo-400" />
          <span>{timeStr}</span>
        </div>
      </div>

      {/* Main Clean Header Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 border border-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 font-mono uppercase">
                CYBERVIGIE <span className="text-indigo-600 text-xs font-bold">ENTREPRISES</span>
              </h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                VIGILANCE ACTIVES
              </span>
              {isLive ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                  API FLUX EN DIRECT
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                  DONNÉES HORS-LIGNE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 hidden sm:block font-sans mt-0.5">
              Plateforme Souveraine de Traçabilité des Attaques Cyber par Société & Secteur
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
            <Activity className="w-3.5 h-3.5 text-indigo-600" />
            <span>Sociétés impactées : <strong className="text-slate-900 font-bold">{victimCount}</strong></span>
          </div>

          <button
            onClick={onOpenEmailModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-500/20 active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>Exporter Rapport</span>
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
