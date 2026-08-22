import React from 'react';
import { Shield, Globe, Clock, Calendar, ExternalLink, Eye, AlertOctagon, Building2, HardDrive, Flame } from 'lucide-react';

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

  const companyName = victim.company_name || victim.post_title || 'Société Impactée';
  const sectorName = victim.sector || 'Secteur Non Spécifié';
  const score = victim.severity_score || 9.2;
  const isCritique = score >= 9.0;
  const volume = victim.data_volume || '850 GB';

  return (
    <div className="cyber-card group flex flex-col justify-between overflow-hidden bg-white rounded-2xl transition-all duration-300 border border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-md">
      
      {/* Top Header Sector Badge & Gravity */}
      <div className="p-3.5 pb-2.5 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/70">
        <span className="text-[11px] font-sans font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 truncate max-w-[170px]">
          <Building2 className="w-3 h-3 text-indigo-600 shrink-0" />
          {sectorName}
        </span>

        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
          isCritique
            ? 'text-rose-700 bg-rose-50 border-rose-200'
            : 'text-amber-700 bg-amber-50 border-amber-200'
        }`}>
          {score} / 10
        </span>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Prominent Company Name */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-0.5 uppercase tracking-wider">
            <span>SOCIÉTÉ IMPACTÉE :</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 font-sans">
            {companyName}
          </h3>
          <p className="text-xs font-mono text-slate-500 truncate mt-0.5">{victim.website}</p>
        </div>

        {/* Tactical Key Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-700 bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/80">
          <div>
            <span className="text-[9px] text-slate-500 uppercase flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-indigo-600" /> Groupe
            </span>
            <span className="font-bold text-indigo-900 truncate text-[11px] block mt-0.5">
              {victim.group_name}
            </span>
          </div>

          <div>
            <span className="text-[9px] text-slate-500 uppercase flex items-center gap-1">
              <Globe className="w-2.5 h-2.5 text-sky-600" /> Pays
            </span>
            <span className="font-bold text-slate-900 truncate text-[11px] block mt-0.5">
              {victim.country}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[9px] text-slate-500 uppercase flex items-center gap-1">
              <HardDrive className="w-2.5 h-2.5 text-emerald-600" /> Vol. Volé
            </span>
            <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
              {volume}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[9px] text-slate-500 uppercase flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-amber-600" /> Date Fuite
            </span>
            <span className="text-[11px] text-slate-900 font-semibold block mt-0.5">
              {formatDate(victim.attack_date)} ({getRelativeTime(victim.attack_date)})
            </span>
          </div>
        </div>

        {/* Proof / Screenshot Preview */}
        <div className="relative w-full h-28 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center group/img">
          {victim.screenshot ? (
            <img
              src={victim.screenshot}
              alt={companyName}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className={`w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-50 text-slate-500 ${
              victim.screenshot ? 'hidden' : 'flex'
            }`}
          >
            <Shield className="w-6 h-6 text-slate-400 mb-1" />
            <span className="text-xs font-sans text-slate-600 line-clamp-2">
              {victim.description || `Preuves d exfiltration de la société ${companyName} publiées sur le réseau Tor.`}
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => onSelectVictim(victim)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-sans font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-sm cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-white" />
            <span>Voir le Dossier</span>
          </button>

          <a
            href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl text-xs font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer flex items-center justify-center"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
          </a>
        </div>
      </div>
    </div>
  );
}
