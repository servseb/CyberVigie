import React from 'react';
import { Shield, Globe, Clock, Calendar, ExternalLink, Eye, AlertOctagon, HardDrive, Flame } from 'lucide-react';

export default function VictimCard({ victim, index, onSelectVictim }) {
  // Format relative time
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
        month: 'short'
      });
    } catch {
      return dateStr;
    }
  };

  const score = victim.severity_score || 9.2;
  const isCritique = score >= 9.0;
  const volume = victim.data_volume || '850 GB';

  return (
    <div className="cyber-card cyber-hud-card group flex flex-col justify-between overflow-hidden bg-[#070b14]/90 hover:bg-[#0b1120] rounded-xl transition-all duration-300 border border-cyan-500/20 hover:border-cyan-400 shadow-lg">
      
      {/* Card Top Banner Badges */}
      <div className="p-3 pb-2 border-b border-white/[0.06] flex items-center justify-between gap-2 bg-[#090e1a]/60">
        <div className="flex items-center gap-1.5">
          <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase flex items-center gap-1 border ${
            isCritique
              ? 'text-rose-400 bg-rose-500/15 border-rose-500/30'
              : 'text-amber-400 bg-amber-500/15 border-amber-500/30'
          }`}>
            <Flame className={`w-3 h-3 ${isCritique ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
            {score} / 10
          </span>
          
          <span className="text-[9px] font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded flex items-center gap-1">
            <HardDrive className="w-2.5 h-2.5 text-cyan-400" />
            {volume}
          </span>
        </div>

        <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/[0.06] truncate max-w-[110px]">
          {victim.sector || 'Secteur Inconnu'}
        </span>
      </div>

      {/* Card Body Information */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 font-mono">
            {victim.post_title}
          </h3>
          <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">{victim.website}</p>
        </div>

        {/* Tactical Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-white/[0.05]">
          <div>
            <span className="text-[8px] text-slate-500 uppercase flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-cyan-400" /> Groupe
            </span>
            <span className="font-bold text-cyan-300 truncate text-[11px] block mt-0.5">
              {victim.group_name}
            </span>
          </div>

          <div>
            <span className="text-[8px] text-slate-500 uppercase flex items-center gap-1">
              <Globe className="w-2.5 h-2.5 text-purple-400" /> Pays
            </span>
            <span className="font-bold text-purple-300 truncate text-[11px] block mt-0.5">
              {victim.country}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[8px] text-slate-500 uppercase flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-emerald-400" /> Date Fuite
            </span>
            <span className="text-[10px] text-slate-300 block mt-0.5">
              {formatDate(victim.attack_date)}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[8px] text-slate-500 uppercase flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-amber-400" /> Récence
            </span>
            <span className="text-[10px] text-emerald-400 font-sans font-bold block mt-0.5">
              {getRelativeTime(victim.attack_date)}
            </span>
          </div>
        </div>

        {/* Screenshot / Evidence Preview */}
        <div className="relative w-full h-28 bg-slate-950 rounded-lg border border-white/[0.08] overflow-hidden flex items-center justify-center group/img">
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
            className={`w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-950/95 text-slate-500 ${
              victim.screenshot ? 'hidden' : 'flex'
            }`}
          >
            <Shield className="w-5 h-5 text-cyan-400/30 mb-1" />
            <span className="text-[10px] font-mono text-slate-300 line-clamp-2">
              {victim.description || 'Dossier d exfiltration disponible sur le réseau Tor.'}
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
          <button
            onClick={() => onSelectVictim(victim)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-mono font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-sm cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-950" />
            <span>Dossier</span>
          </button>

          <a
            href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-400 transition-all cursor-pointer flex items-center justify-center"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
