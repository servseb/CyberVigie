import React, { useState } from 'react';
import {
  X,
  Shield,
  Globe,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Database,
  FileText,
  Lock,
  Cpu,
  Building2,
  HardDrive,
  Star,
  Bot
} from 'lucide-react';

export default function VictimDetailModal({ victim, onClose }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [copiedField, setCopiedField] = useState('');

  if (!victim) return null;

  const handleCopyText = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const companyName = victim.company_name || victim.post_title || 'Société Impactée';
  const sectorName = victim.sector || 'Secteur Non Spécifié';
  const severityScore = victim.severity_score || 9.2;
  const isCritique = severityScore >= 9.0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/50 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border-4 border-sky-300 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Banner */}
        <div className="p-6 border-b-4 border-sky-100 bg-gradient-to-r from-sky-100 to-indigo-100 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className={`w-14 h-14 rounded-3xl flex items-center justify-center border-2 shrink-0 shadow-md ${
              isCritique
                ? 'bg-rose-500 text-white border-rose-300'
                : 'bg-amber-400 text-slate-900 border-amber-300'
            }`}>
              <Building2 className="w-7 h-7" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-sans font-bold text-sky-900 bg-white border-2 border-sky-200 px-3 py-1 rounded-full shadow-sm">
                  🍬 {sectorName}
                </span>
                <span className={`text-xs font-sans font-extrabold px-3 py-1 rounded-full border-2 shadow-sm flex items-center gap-1 ${
                  isCritique
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  GRAVITÉ : {severityScore} / 10
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 font-sans truncate">
                {companyName}
              </h2>
              <p className="text-xs font-sans font-semibold text-slate-600 truncate mt-0.5">
                Groupe piraterie : <strong className="text-indigo-600 font-extrabold">{victim.group_name}</strong> • Site : <span className="text-slate-700">{victim.website}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-white text-slate-700 hover:text-slate-900 border-2 border-sky-200 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Bar */}
        <div className="flex items-center gap-2 px-6 py-3 bg-sky-50 border-b-2 border-sky-100 text-xs font-sans font-bold">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2 px-4 rounded-2xl cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'summary'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105 border-2 border-sky-300'
                : 'bg-white text-slate-700 hover:bg-sky-100 border-2 border-sky-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Synthèse Aventure 🤖</span>
          </button>

          <button
            onClick={() => setActiveTab('iocs')}
            className={`py-2 px-4 rounded-2xl cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'iocs'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105 border-2 border-sky-300'
                : 'bg-white text-slate-700 hover:bg-sky-100 border-2 border-sky-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>IOCs & MITRE 🛡️</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`py-2 px-4 rounded-2xl cursor-pointer transition-all flex items-center gap-2 ${
              activeTab === 'json'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105 border-2 border-sky-300'
                : 'bg-white text-slate-700 hover:bg-sky-100 border-2 border-sky-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Payload JSON 💻</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-white">
          
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-5 animate-fade-in">
              
              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
                <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-100 shadow-sm">
                  <span className="text-[10px] text-sky-700 uppercase font-extrabold flex items-center gap-1">
                    🎈 Vol. Exfiltré
                  </span>
                  <span className="text-base font-black text-rose-600 mt-1 block">{victim.data_volume || '1.2 TB'}</span>
                </div>

                <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-100 shadow-sm">
                  <span className="text-[10px] text-sky-700 uppercase font-extrabold flex items-center gap-1">
                    🌍 Pays Cible
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 mt-1 block truncate">{victim.country} ({victim.country_code})</span>
                </div>

                <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-100 shadow-sm">
                  <span className="text-[10px] text-sky-700 uppercase font-extrabold flex items-center gap-1">
                    📅 Découverte
                  </span>
                  <span className="text-xs font-bold text-slate-900 mt-1 block truncate">
                    {new Date(victim.discovered).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-100 shadow-sm">
                  <span className="text-[10px] text-sky-700 uppercase font-extrabold flex items-center gap-1">
                    🏢 Secteur
                  </span>
                  <span className="text-xs font-extrabold text-indigo-700 mt-1 block truncate">{sectorName}</span>
                </div>
              </div>

              {/* Proof Screenshot */}
              {victim.screenshot && (
                <div className="w-full h-52 rounded-3xl border-4 border-sky-200 overflow-hidden bg-sky-100 relative shadow-md">
                  <img src={victim.screenshot} alt={companyName} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-sans font-bold text-white bg-sky-900/90 px-3 py-1.5 rounded-xl border border-sky-600 shadow-sm">
                      📸 Preuve d'exfiltration publiée sur le portail de {victim.group_name}
                    </span>
                  </div>
                </div>
              )}

              {/* Narrative Summary */}
              <div className="p-5 bg-sky-50 rounded-3xl border-2 border-sky-100 space-y-2 shadow-sm">
                <h4 className="text-xs font-sans font-black text-slate-900 uppercase flex items-center gap-2">
                  <Bot className="w-5 h-5 text-sky-500" /> Rapport d'impact exécutif 🤖 :
                </h4>
                <p className="text-xs font-sans text-slate-700 leading-relaxed font-semibold">
                  {victim.full_executive_summary || victim.description}
                </p>
              </div>

              {/* Data Types */}
              <div className="p-5 bg-sky-50 rounded-3xl border-2 border-sky-100 space-y-2 shadow-sm">
                <h4 className="text-xs font-sans font-black text-slate-900 uppercase flex items-center gap-2">
                  <Database className="w-5 h-5 text-rose-500" /> Données Sensibles Exfiltrées 💥 :
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(victim.leaked_data_types || ['Bases SQL', 'Dossiers RH', 'Secrets d Infrastructure', 'Audits Financiers']).map((type, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-sans font-bold px-3 py-1.5 rounded-2xl bg-rose-100 text-rose-800 border-2 border-rose-200 shadow-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IOCS */}
          {activeTab === 'iocs' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-5 bg-sky-50 rounded-3xl border-2 border-sky-100 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-sans font-black text-slate-900 uppercase flex items-center gap-2">
                    <Globe className="w-5 h-5 text-sky-500" /> Adresses IP Malveillantes C2 🌐 :
                  </h4>
                  <button
                    onClick={() => handleCopyText((victim.iocs?.ips || ['185.220.101.5', '194.165.16.42']).join('\n'), 'ips')}
                    className="text-xs font-sans text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {copiedField === 'ips' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedField === 'ips' ? 'IPs Copiées !' : 'Copier IPs'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(victim.iocs?.ips || ['185.220.101.5', '194.165.16.42', '45.142.214.88']).map((ip, idx) => (
                    <span key={idx} className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-white text-slate-800 border-2 border-sky-200 font-extrabold shadow-sm">
                      {ip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-sky-50 rounded-3xl border-2 border-sky-100 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-sans font-black text-slate-900 uppercase flex items-center gap-2">
                    <Lock className="w-5 h-5 text-purple-500" /> Portail Tor (.onion) 🔒 :
                  </h4>
                  <button
                    onClick={() => handleCopyText(victim.iocs?.onion || victim.claim_url, 'onion')}
                    className="text-xs font-sans text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {copiedField === 'onion' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedField === 'onion' ? 'Lien Copié !' : 'Copier Lien'}</span>
                  </button>
                </div>
                <div className="p-3 bg-white rounded-2xl border-2 border-sky-200 text-xs font-mono text-slate-800 font-bold truncate shadow-sm">
                  {victim.iocs?.onion || victim.claim_url}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RAW JSON */}
          {activeTab === 'json' && (
            <div className="relative animate-fade-in">
              <button
                onClick={() => handleCopyText(JSON.stringify(victim, null, 2), 'json')}
                className="absolute right-4 top-4 px-3.5 py-1.5 rounded-xl bg-sky-200 hover:bg-sky-300 text-xs font-mono text-slate-900 flex items-center gap-1 cursor-pointer font-bold shadow-sm"
              >
                {copiedField === 'json' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedField === 'json' ? 'Copier JSON !' : 'Copier JSON'}</span>
              </button>
              <pre className="p-5 rounded-3xl bg-slate-900 text-sky-300 text-xs font-mono overflow-x-auto max-h-96 shadow-md border-4 border-sky-200">
                {JSON.stringify(victim, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t-4 border-sky-100 bg-sky-50 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500 font-bold">DOSSIER 🚀 #INC-{victim.id}</span>

          <a
            href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pixar-btn-3d px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-extrabold font-sans text-xs flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Voir la Fuite Originale 🚀</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
