import React from 'react';
import { Shield, Globe, Clock, Calendar, ExternalLink, Eye, AlertOctagon, Building } from 'lucide-react';

export default function VictimCard({ victim, index, onSelectVictim }) {
  // Format relative time (e.g., "il y a 2h")
  const getRelativeTime = (dateStr) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = Math.abs(now - date);
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours < 1) return "moins d'1h";
      if (diffHours < 24) return `${diffHours}h`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}j`;
    } catch {
      return '2h';
    }
  };

  // Format readable date
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="cyber-card group flex flex-col justify-between overflow-hidden bg-slate-900/40 hover:bg-slate-900/80 rounded-xl transition-all duration-300 border border-white/[0.07] hover:border-cyan-500/30">
      {/* Top Badges */}
      <div className="p-3.5 pb-2 border-b border-white/[0.05] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-bold tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
            <AlertOctagon className="w-3 h-3 text-rose-400" />
            {victim.status || 'RANSOMWARE'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-white/[0.06] truncate max-w-[130px]">
          {victim.sector || 'Secteur Inconnu'}
        </span>
      </div>

      {/* Body Info */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 font-sans">
            {victim.post_title}
          </h3>
          <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">{victim.website}</p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-white/[0.04]">
          <div>
            <span className="text-[9px] text-slate-500 uppercase flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-cyan-400" /> Groupe
            </span>
            <span className="font-semibold text-cyan-300 truncate text-[11px] block mt-0.5">
              {victim.group_name}
            </span>
          </div>

          <div>
            <span className="text-[9px] text-slate-500 uppercase flex items-center gap-1">
              <Globe className="w-2.5 h-2.5 text-purple-400" /> Pays
            </span>
            <span className="font-semibold text-purple-300 truncate text-[11px] block mt-0.5">
              {victim.country}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[9px] text-slate-500 uppercase flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-emerald-400" /> Attaque
            </span>
            <span className="text-[10px] text-slate-300 block mt-0.5">
              {formatDate(victim.attack_date)}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[9px] text-slate-500 uppercase flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-amber-400" /> Il y a
            </span>
            <span className="text-[10px] text-emerald-400 font-sans font-semibold block mt-0.5">
              {getRelativeTime(victim.attack_date)}
            </span>
          </div>
        </div>

        {/* Screenshot / Leak Preview */}
        <div className="relative w-full h-28 bg-slate-950/80 rounded-lg border border-white/[0.06] overflow-hidden flex items-center justify-center group/img">
          {victim.screenshot ? (
            <img
              src={victim.screenshot}
              alt={victim.post_title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 opacity-75 group-hover/img:opacity-100"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-950/90 text-slate-500 ${
              victim.screenshot ? 'hidden' : 'flex'
            }`}
          >
            <Shield className="w-6 h-6 text-cyan-500/20 mb-1" />
            <span className="text-[10px] font-mono text-slate-400 line-clamp-2">
              {victim.description || 'Preuve de fuite référencée sur le portail underground.'}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.05]">
          <button
            onClick={() => onSelectVictim(victim)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 bg-slate-950/60 border border-white/10 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
          >
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>Détails</span>
          </button>

          <a
            href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-400 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3 h-3 text-amber-400" />
            <span>Source</span>
          </a>
        </div>
      </div>
    </div>
  );
}
