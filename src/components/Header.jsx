import React from 'react';
import { Shield, Mail, Activity, Radio, Sparkles } from 'lucide-react';

export default function Header({ onOpenEmailModal, isLive, victimCount }) {
  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/5 group">
              <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-105 transition-transform" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white font-mono text-gradient-white">
                CYBERVIGIE
              </h1>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 tracking-wider uppercase">
                v2.4
              </span>
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE API
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  CACHE HORS-LIGNE
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Vigilance Cyber & Traçabilité des Menaces en temps réel
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/[0.06] text-xs font-mono text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Flux actif : <strong className="text-cyan-300">{victimCount}</strong> actes répertoriés</span>
          </div>

          <button
            onClick={onOpenEmailModal}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono text-slate-200 bg-slate-900/90 border border-white/10 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-slate-800 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rapport Email</span>
          </button>
        </div>
      </div>
    </header>
  );
}
