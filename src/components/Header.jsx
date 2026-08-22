import React from 'react';
import { Shield, Mail, Activity, Radio, ShieldCheck } from 'lucide-react';

export default function Header({ onOpenEmailModal, isLive, victimCount }) {
  return (
    <header className="sticky top-0 z-40 bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative group cursor-pointer">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 transition-all">
              <Shield className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#080c14] animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                Cyber Intelligence
              </span>
              {isLive ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  LIVE API
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  OFFLINE CACHE
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-bold">
                <ShieldCheck className="w-3 h-3 text-purple-400" />
                HORS-IA / DIRECT SCRAPE
              </span>
            </div>
            <h1 className="text-xl font-black tracking-wider text-white font-mono flex items-center gap-2">
              CYBERVIGIE <span className="text-xs font-normal text-slate-400 font-sans">v2.4</span>
            </h1>
            <p className="text-xs text-slate-400">Vigilance Cyber & Traçabilité des Menaces</p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Flux de menace : <strong className="text-white">{victimCount}</strong> actes répertoriés</span>
          </div>

          <button
            onClick={onOpenEmailModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono text-cyan-200 bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/25 transition-all shadow-lg shadow-cyan-500/5 active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Envoyer par email</span>
          </button>
        </div>
      </div>
    </header>
  );
}
