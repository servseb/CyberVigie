import React, { useState } from 'react';
import { X, Shield, Globe, Clock, Calendar, ExternalLink, Copy, Check, AlertOctagon, Terminal } from 'lucide-react';

export default function VictimDetailModal({ victim, onClose }) {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!victim) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(victim, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#090d16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-white/[0.06] bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <AlertOctagon className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                CYBER INCIDENT DETAIL
              </span>
              <h3 className="text-sm font-bold text-white font-sans mt-0.5 line-clamp-1">
                {victim.post_title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/[0.06]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950 border-b border-white/[0.05] text-xs font-mono">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`py-1 px-3 rounded-lg cursor-pointer transition-all ${
              activeSubTab === 'overview'
                ? 'bg-slate-800 text-white font-bold border border-white/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Aperçu de la fuite
          </button>
          <button
            onClick={() => setActiveSubTab('json')}
            className={`py-1 px-3 rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeSubTab === 'json'
                ? 'bg-slate-800 text-cyan-400 font-bold border border-white/10'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Payload JSON
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeSubTab === 'overview' ? (
            <>
              {/* Screenshot Preview */}
              {victim.screenshot && (
                <div className="w-full h-44 rounded-xl border border-white/[0.08] overflow-hidden bg-slate-950">
                  <img src={victim.screenshot} alt={victim.post_title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.05]">
                  <span className="text-[9px] text-slate-500 block uppercase">Groupe Attaquant</span>
                  <span className="text-xs font-bold text-cyan-400 mt-0.5 block">{victim.group_name}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.05]">
                  <span className="text-[9px] text-slate-500 block uppercase">Pays d'origine</span>
                  <span className="text-xs font-bold text-purple-400 mt-0.5 block">{victim.country} ({victim.country_code})</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.05]">
                  <span className="text-[9px] text-slate-500 block uppercase">Date d'attaque</span>
                  <span className="text-xs text-slate-300 mt-0.5 block">{victim.attack_date}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-white/[0.05]">
                  <span className="text-[9px] text-slate-500 block uppercase">Secteur</span>
                  <span className="text-xs text-amber-300 mt-0.5 block">{victim.sector}</span>
                </div>
              </div>

              {/* Description */}
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-white/[0.05] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Description de l'attaque :</span>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">
                  {victim.description || "Preuves d'exfiltration et fichiers sensibles publiés sur le portail underground."}
                </p>
              </div>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={handleCopyJson}
                className="absolute right-3 top-3 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-400 border border-white/10 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
              <pre className="p-4 rounded-xl bg-slate-950 border border-white/[0.08] text-xs font-mono text-cyan-300 overflow-x-auto">
                {JSON.stringify(victim, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] bg-slate-950/60 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500">ID: {victim.id}</span>
          <a
            href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Consulter la source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
