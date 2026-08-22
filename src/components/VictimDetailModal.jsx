import React, { useState } from 'react';
import {
  X,
  Shield,
  Globe,
  Clock,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  AlertOctagon,
  Terminal,
  Database,
  FileText,
  Lock,
  Layers,
  Cpu,
  Building2,
  HardDrive
} from 'lucide-react';

export default function VictimDetailModal({ victim, onClose }) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'iocs' | 'json'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Banner */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/90 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 ${
              isCritique
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-amber-50 border-amber-200 text-amber-600'
            }`}>
              <Building2 className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-sans font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                  {sectorName}
                </span>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  isCritique
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  GRAVITÉ : {severityScore} / 10 ({victim.status || 'CRITIQUE'})
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 font-sans truncate">
                {companyName}
              </h2>
              <p className="text-xs font-mono text-slate-500 truncate mt-0.5">
                Groupe attaquant : <strong className="text-indigo-600 font-bold">{victim.group_name}</strong> • Site officiel : <span className="text-slate-700">{victim.website}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Navigation Bar */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-white border-b border-slate-100 text-xs font-sans font-semibold">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-1.5 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'summary'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Synthèse Société & Périmètre</span>
          </button>

          <button
            onClick={() => setActiveTab('iocs')}
            className={`py-1.5 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'iocs'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>IOCs & MITRE ATT&CK</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`py-1.5 px-4 rounded-xl cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Payload JSON</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/50">
          
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-5 animate-fade-in">
              
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5 text-indigo-600" /> Vol. Exfiltré
                  </span>
                  <span className="text-sm font-extrabold text-slate-900 mt-1 block">{victim.data_volume || '1.2 TB'}</span>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-sky-600" /> Pays
                  </span>
                  <span className="text-xs font-bold text-slate-900 mt-1 block truncate">{victim.country} ({victim.country_code})</span>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" /> Découverte
                  </span>
                  <span className="text-xs font-semibold text-slate-900 mt-1 block truncate">
                    {new Date(victim.discovered).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] text-slate-500 block uppercase font-semibold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-purple-600" /> Secteur
                  </span>
                  <span className="text-xs font-bold text-indigo-700 mt-1 block truncate">{sectorName}</span>
                </div>
              </div>

              {/* Screenshot Proof */}
              {victim.screenshot && (
                <div className="w-full h-48 rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 relative group shadow-sm">
                  <img src={victim.screenshot} alt={companyName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-mono text-white bg-slate-900/90 px-3 py-1 rounded-lg border border-slate-700">
                      Preuve d'exfiltration publiée sur le portail Tor de {victim.group_name}
                    </span>
                  </div>
                </div>
              )}

              {/* Executive Summary Narrative */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <h4 className="text-xs font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" /> Synthèse d'Impact pour la Société :
                </h4>
                <p className="text-xs font-sans text-slate-700 leading-relaxed">
                  {victim.full_executive_summary || victim.description}
                </p>
              </div>

              {/* Leaked Data Categories */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <h4 className="text-xs font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
                  <Database className="w-4 h-4 text-rose-600" /> Fichiers & Données Sensibles Volées :
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(victim.leaked_data_types || ['Bases de données SQL', 'Dossiers RH', 'Secrets d Infrastructure', 'Audits Financiers']).map((type, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-sans font-medium px-3 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200"
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
              {/* Malicious IPs */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-600" /> Adresses IP Malveillantes C2 :
                  </h4>
                  <button
                    onClick={() => handleCopyText((victim.iocs?.ips || ['185.220.101.5', '194.165.16.42']).join('\n'), 'ips')}
                    className="text-xs font-mono text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {copiedField === 'ips' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'ips' ? 'IPs Copiées !' : 'Copier IPs'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(victim.iocs?.ips || ['185.220.101.5', '194.165.16.42', '45.142.214.88']).map((ip, idx) => (
                    <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                      {ip}
                    </span>
                  ))}
                </div>
              </div>

              {/* TOR Onion Link */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-600" /> Lien du Portail Tor (.onion) :
                  </h4>
                  <button
                    onClick={() => handleCopyText(victim.iocs?.onion || victim.claim_url, 'onion')}
                    className="text-xs font-mono text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {copiedField === 'onion' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'onion' ? 'Lien Copié !' : 'Copier Lien'}</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 truncate">
                  {victim.iocs?.onion || victim.claim_url}
                </div>
              </div>

              {/* MITRE TTPs */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <h4 className="text-xs font-mono font-bold text-slate-900 uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-600" /> Tactiques & Techniques MITRE ATT&CK :
                </h4>
                <div className="space-y-1.5 pt-1">
                  {(victim.mitre_ttps || [
                    'T1566 (Phishing Spear)',
                    'T1059 (Command and Scripting Interpreter)',
                    'T1486 (Data Encrypted for Impact)',
                    'T1071 (Application Layer Protocol)'
                  ]).map((ttp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{ttp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RAW JSON */}
          {activeTab === 'json' && (
            <div className="relative animate-fade-in">
              <button
                onClick={() => handleCopyText(JSON.stringify(victim, null, 2), 'json')}
                className="absolute right-3 top-3 px-3 py-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-mono text-slate-800 flex items-center gap-1 cursor-pointer font-bold"
              >
                {copiedField === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'json' ? 'JSON Copié !' : 'Copier JSON'}</span>
              </button>
              <pre className="p-4 rounded-2xl bg-slate-900 text-cyan-300 text-xs font-mono overflow-x-auto max-h-96 shadow-sm">
                {JSON.stringify(victim, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">ID DOSSIER : #INC-{victim.id}</span>

          <a
            href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-sans text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <span>Accéder à la Revendication</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
