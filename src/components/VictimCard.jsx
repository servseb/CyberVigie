import React from 'react';
import { Shield, Globe, Clock, Calendar, ExternalLink, Eye, Building2, HardDrive, Sparkles, Star } from 'lucide-react';

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
    <div className="pixar-card group flex flex-col justify-between overflow-hidden bg-white p-5 space-y-4">
      
      {/* Top Sector & Star Score Header */}
      <div className="flex items-center justify-between gap-2 border-b-2 border-sky-100 pb-3">
        <span className="text-xs font-sans font-bold text-sky-900 bg-sky-100 border-2 border-sky-200 px-3 py-1 rounded-2xl flex items-center gap-1.5 truncate max-w-[170px] shadow-sm">
          <Building2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          {sectorName}
        </span>

        <span className={`text-xs font-sans font-extrabold px-3 py-1 rounded-2xl border-2 flex items-center gap-1 shadow-sm ${
          isCritique
            ? 'text-rose-700 bg-rose-100 border-rose-300'
            : 'text-amber-700 bg-amber-100 border-amber-300'
        }`}>
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          {score} / 10
        </span>
      </div>

      {/* Main Body */}
      <div className="space-y-3">
        <div>
          <span className="text-[10px] font-mono text-sky-600 font-extrabold tracking-wider uppercase block">
            🏢 SOCIÉTÉ IMPACTÉE :
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1 font-sans">
            {companyName}
          </h3>
          <p className="text-xs font-mono text-slate-400 truncate mt-0.5">{victim.website}</p>
        </div>

        {/* Pixar Toy Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-sans text-slate-800 bg-sky-50/90 p-3 rounded-2xl border-2 border-sky-100 shadow-inner">
          <div>
            <span className="text-[10px] font-mono text-sky-700 font-bold uppercase flex items-center gap-1">
              🏴‍☠️ Groupe Attaquant
            </span>
            <span className="font-extrabold text-indigo-900 truncate text-xs block mt-0.5">
              {victim.group_name}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-sky-700 font-bold uppercase flex items-center gap-1">
              🌍 Pays Cible
            </span>
            <span className="font-extrabold text-slate-900 truncate text-xs block mt-0.5">
              {victim.country}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[10px] font-mono text-sky-700 font-bold uppercase flex items-center gap-1">
              🎈 Vol. Volé
            </span>
            <span className="text-xs text-rose-600 font-extrabold block mt-0.5">
              {volume}
            </span>
          </div>

          <div className="mt-1">
            <span className="text-[10px] font-mono text-sky-700 font-bold uppercase flex items-center gap-1">
              📅 Date Récence
            </span>
            <span className="text-xs text-emerald-700 font-extrabold block mt-0.5">
              {formatDate(victim.attack_date)} ({getRelativeTime(victim.attack_date)})
            </span>
          </div>
        </div>

        {/* Screenshot Proof */}
        <div className="relative w-full h-32 bg-sky-100 rounded-2xl border-2 border-sky-200 overflow-hidden flex items-center justify-center group/img shadow-sm">
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
            className={`w-full h-full flex flex-col items-center justify-center p-3 text-center bg-sky-50 text-slate-600 ${
              victim.screenshot ? 'hidden' : 'flex'
            }`}
          >
            <Shield className="w-7 h-7 text-sky-400 mb-1" />
            <span className="text-xs font-sans font-semibold text-sky-900 line-clamp-2">
              {victim.description || `Preuves d exfiltration de la société ${companyName} disponibles.`}
            </span>
          </div>
        </div>
      </div>

      {/* Card 3D Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t-2 border-sky-100">
        <button
          onClick={() => onSelectVictim(victim)}
          className="pixar-btn-3d flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-extrabold font-sans text-xs cursor-pointer shadow-md"
        >
          <Eye className="w-4 h-4 text-white" />
          <span>Inspecter 🚀</span>
        </button>

        <a
          href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2.5 rounded-2xl text-xs font-mono font-bold text-sky-800 bg-sky-100 hover:bg-sky-200 border-2 border-sky-200 transition-all cursor-pointer flex items-center justify-center"
        >
          <ExternalLink className="w-4 h-4 text-sky-700" />
        </a>
      </div>
    </div>
  );
}
