import React, { useState, useEffect } from 'react';
import { Shield, Mail, Activity, Radio, AlertTriangle, Terminal, Lock, Flame } from 'lucide-react';

export default function Header({ onOpenEmailModal, isLive, victimCount }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(`${d.toLocaleTimeString('fr-FR')} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#04060a]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl">
      {/* Top Disruptive Live Threat Ticker */}
      <div className="w-full bg-[#070b14] border-b border-cyan-500/10 py-1 px-4 overflow-hidden flex items-center text-[10px] font-mono text-cyan-300/90">
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-cyan-500/20 z-10 bg-[#070b14] font-bold text-rose-400 uppercase">
          <Flame className="w-3 h-3 text-rose-500 animate-pulse" />
          <span>FLUX MENACES DIRECT :</span>
        </div>

        <div className="overflow-hidden flex-1 relative">
          <div className="animate-ticker flex items-center gap-8 pl-4">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-rose-400 font-bold">[CRITIQUE]</span> Qilin revendique 2.1 TB chez Logitech (CH)
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-amber-400 font-bold">[ALERTE CERT-FR]</span> Vulnérabilité critique SharePoint CVE-2026-50522
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-cyan-400 font-bold">[UNDERGROUND]</span> SilentRansomGroup exfiltre 1.4 TB de données juridiques
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-purple-400 font-bold">[TELEGRAM]</span> Stealer Logs Botnet actif (55 canaux surveillés)
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-rose-400 font-bold">[CRITIQUE]</span> LockBit 3.0 cible le secteur santé CHR France (850 GB)
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0 pl-3 border-l border-cyan-500/20 z-10 bg-[#070b14] text-slate-400 font-mono">
          <ClockIcon className="w-3 h-3 text-cyan-400" />
          <span>{timeStr}</span>
        </div>
      </div>

      {/* Main SOC Header Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & SOC Command Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/20 group-hover:border-cyan-400 transition-all cyber-hud-card">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-black tracking-wider text-white font-mono text-gradient-cyan uppercase">
                CYBERVIGIE <span className="text-cyan-400 text-xs font-normal">SOC</span>
              </h1>
              <span className="text-[9px] font-mono font-bold px-2 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                DEFCON 2
              </span>
              {isLive ? (
                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.2 rounded">
                  LIVE API ACTIVE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.2 rounded">
                  CACHE HORS-LIGNE
                </span>
              )}
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              Tactical Threat Intelligence Platform & Cyber Incident Surveillance
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-cyan-500/20 text-xs font-mono text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Menaces actives : <strong className="text-cyan-300 font-bold">{victimCount}</strong></span>
          </div>

          <button
            onClick={onOpenEmailModal}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-slate-950" />
            <span>Rapport SOC</span>
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
