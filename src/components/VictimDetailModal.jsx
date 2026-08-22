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
  Share2,
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

  const severityScore = victim.severity_score || 9.2;
  const isCritique = severityScore >= 9.0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#060912] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] cyber-hud-card">
        
        {/* Top Header Banner */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#090e1c] flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5 flex-1 min-w-0">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${
              isCritique
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 glow-crimson'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              <AlertOctagon className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold uppercase tracking-wider">
                  DOSSIER D'INVESTIGATION CYBER #INC-{victim.id}
                </span>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                  isCritique
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}>
                  GRAVITÉ : {severityScore} / 10 ({victim.status || 'CRITIQUE'})
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-white font-mono mt-1 truncate">
                {victim.post_title}
              </h2>
              <p className="text-xs font-mono text-slate-400 truncate">
                Groupe : <strong className="text-cyan-300">{victim.group_name}</strong> • Domaine : <span className="text-slate-300">{victim.website}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/[0.08]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Navigation Bar */}
        <div className="flex items-center gap-2 px-5 py-2 bg-slate-950 border-b border-white/[0.06] text-xs font-mono">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-1.5 px-3.5 rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'summary'
                ? 'bg-slate-800 text-white font-bold border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Synthèse Executrice</span>
          </button>

          <button
            onClick={() => setActiveTab('iocs')}
            className={`py-1.5 px-3.5 rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'iocs'
                ? 'bg-slate-800 text-purple-400 font-bold border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>IOCs & MITRE ATT&CK</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`py-1.5 px-3.5 rounded-lg cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'bg-slate-800 text-emerald-400 font-bold border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Payload JSON</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* TAB 1: EXECUTIVE SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Top Key Metrics Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06]">
                  <span className="text-[9px] text-slate-500 block uppercase flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-cyan-400" /> Vol. Exfiltré
                  </span>
                  <span className="text-sm font-bold text-cyan-300 mt-0.5 block">{victim.data_volume || '1.2 TB'}</span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06]">
                  <span className="text-[9px] text-slate-500 block uppercase flex items-center gap-1">
                    <Globe className="w-3 h-3 text-purple-400" /> Territoire
                  </span>
                  <span className="text-xs font-bold text-purple-300 mt-0.5 block truncate">{victim.country} ({victim.country_code})</span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06]">
                  <span className="text-[9px] text-slate-500 block uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" /> Découverte
                  </span>
                  <span className="text-xs text-slate-200 mt-0.5 block truncate">
                    {new Date(victim.discovered).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/[0.06]">
                  <span className="text-[9px] text-slate-500 block uppercase flex items-center gap-1">
                    <Layers className="w-3 h-3 text-amber-400" /> Secteur
                  </span>
                  <span className="text-xs text-amber-300 mt-0.5 block truncate">{victim.sector}</span>
                </div>
              </div>

              {/* Screenshot Proof */}
              {victim.screenshot && (
                <div className="w-full h-48 rounded-xl border border-white/[0.08] overflow-hidden bg-slate-950 relative group">
                  <img src={victim.screenshot} alt={victim.post_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-mono text-cyan-300 bg-slate-950/80 px-2 py-1 rounded border border-cyan-500/30">
                      Capture de preuve publiée sur le portail onion
                    </span>
                  </div>
                </div>
              )}

              {/* Executive Summary Narrative */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-200 uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" /> Rapport d'incident exécutif :
                </h4>
                <p className="text-xs font-sans text-slate-300 leading-relaxed">
                  {victim.full_executive_summary || victim.description}
                </p>
              </div>

              {/* Leaked Data Categories Tags */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-200 uppercase flex items-center gap-2">
                  <Database className="w-4 h-4 text-rose-400" /> Catégories de fichiers sensibles exfiltrés :
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(victim.leaked_data_types || ['Bases de données SQL', 'Fichiers Comptables', 'Dossiers RH', 'Secrets API']).map((type, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IOCS & MITRE ATT&CK */}
          {activeTab === 'iocs' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Malicious IPs */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-200 uppercase flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" /> Adresses IP Malveillantes C2 (Command & Control) :
                  </h4>
                  <button
                    onClick={() => handleCopyText((victim.iocs?.ips || ['185.220.101.5', '194.165.16.42']).join('\n'), 'ips')}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === 'ips' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'ips' ? 'IPs Copiées !' : 'Copier IPs'}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(victim.iocs?.ips || ['185.220.101.5', '194.165.16.42', '45.142.214.88']).map((ip, idx) => (
                    <span key={idx} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/20">
                      {ip}
                    </span>
                  ))}
                </div>
              </div>

              {/* TOR Onion Link */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-slate-200 uppercase flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-400" /> Lien du Portail d'Extorsion Tor (.onion) :
                  </h4>
                  <button
                    onClick={() => handleCopyText(victim.iocs?.onion || victim.claim_url, 'onion')}
                    className="text-[10px] font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedField === 'onion' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'onion' ? 'Lien Copié !' : 'Copier Lien'}</span>
                  </button>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-purple-300 truncate">
                  {victim.iocs?.onion || victim.claim_url}
                </div>
              </div>

              {/* MITRE ATT&CK Matrix TTPs */}
              <div className="p-4 bg-slate-950/80 rounded-xl border border-white/[0.06] space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-200 uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" /> Tactiques & Techniques MITRE ATT&CK :
                </h4>
                <div className="space-y-1.5 pt-1">
                  {(victim.mitre_ttps || [
                    'T1566 (Phishing Spear)',
                    'T1059 (Command and Scripting Interpreter)',
                    'T1486 (Data Encrypted for Impact)',
                    'T1071 (Application Layer Protocol)'
                  ]).map((ttp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900 p-2 rounded-lg border border-white/[0.04]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
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
                className="absolute right-3 top-3 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-cyan-400 border border-white/10 flex items-center gap-1 cursor-pointer"
              >
                {copiedField === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'json' ? 'Payload Copié !' : 'Copier JSON'}</span>
              </button>
              <pre className="p-4 rounded-xl bg-slate-950 border border-white/[0.08] text-xs font-mono text-cyan-300 overflow-x-auto max-h-96">
                {JSON.stringify(victim, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 border-t border-white/[0.06] bg-[#090e1c] flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500">ID SYSTEM: {victim.id}</span>

          <a
            href={victim.claim_url !== '#' ? victim.claim_url : `https://ransomware.live/#/group/${encodeURIComponent(victim.group_name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <span>Accéder à la Fuite Originale</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
