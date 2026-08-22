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
      if (diffHours < 1) return "il y a moins d'1h";
      if (diffHours < 24) return `il y a ${diffHours}h`;
      const diffDays = Math.floor(diffHours / 24);
      return `il y a ${diffDays}j`;
    } catch {
      return 'il y a 2h';
    }
  };

  // Format readable date
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="cyber-card group flex flex-col justify-between overflow-hidden border border-slate-800/90 bg-[#0d121f]/90 hover:bg-[#111728] rounded-xl transition-all duration-300">
      {/* Card Header Badges */}
      <div className="p-4 pb-2 border-b border-slate-800/50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold tracking-wider text-red-400 bg-red-950/60 border border-red-800/50 px-2 py-0.5 rounded uppercase flex items-center gap-1">
            <AlertOctagon className="w-3 h-3 text-red-400" />
            {victim.status || 'RANSOMWARE'}
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
            #{index + 1}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded truncate max-w-[120px]">
          {victim.sector || 'Not Found'}
        </span>
      </div>

      {/* Card Body Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 font-sans">
            {victim.post_title}
          </h3>
          <p className="text-[11px] font-mono text-slate-400 mb-3">{victim.website}</p>

          {/* Details Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/60 mb-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase">
                <Shield className="w-3 h-3 text-cyan-400" /> Groupe
              </span>
              <span className="font-semibold text-cyan-300 truncate">{victim.group_name}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase">
                <Globe className="w-3 h-3 text-purple-400" /> Pays
              </span>
              <span className="font-semibold text-purple-300 truncate">{victim.country}</span>
            </div>

            <div className="flex flex-col mt-1">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase">
                <Clock className="w-3 h-3 text-emerald-400" /> Attaque
              </span>
              <span className="text-[11px] text-slate-300 truncate">{formatDate(victim.attack_date)}</span>
              <span className="text-[9px] text-emerald-400 font-sans">{getRelativeTime(victim.attack_date)}</span>
            </div>

            <div className="flex flex-col mt-1">
              <span className="text-[10px] text-slate-500 flex items-center gap-1 uppercase">
                <Calendar className="w-3 h-3 text-amber-400" /> Découverte
              </span>
              <span className="text-[11px] text-slate-300 truncate">{formatDate(victim.discovered)}</span>
            </div>
          </div>
        </div>

        {/* Screenshot / Leak Preview Container */}
        <div className="relative w-full h-32 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden mb-3 flex items-center justify-center group/img">
          {victim.screenshot ? (
            <img
              src={victim.screenshot}
              alt={victim.post_title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 opacity-80 group-hover/img:opacity-100"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-slate-900 to-slate-950 text-slate-500 ${
              victim.screenshot ? 'hidden' : 'flex'
            }`}
          >
            <Shield className="w-8 h-8 text-cyan-500/30 mb-1 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-400 line-clamp-2">
              {victim.description || 'Preuve de fuite disponible sur le portail onion.'}
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
          <button
            onClick={() => onSelectVictim(victim)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Détails</span>
          </button>

          <a
            href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 hover:border-amber-400 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span>Reclaim</span>
          </a>
        </div>
      </div>
    </div>
  );
}
