import React from 'react';
import { AlertTriangle, ExternalLink, ShieldAlert, Calendar, FileText } from 'lucide-react';

export default function AnssiAlertes({ alerts }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="cyber-card p-6 border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
            <h2 className="text-xl font-black tracking-wider text-white font-mono uppercase">
              ALERTES ANSSI & CERT-FR
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Les 5 dernières alertes critiques et avis de sécurité officiels du CERT-FR
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          SOURCE OFFICIELLE
        </span>
      </div>

      {/* Alert Feed List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="cyber-card p-6 border border-slate-800/90 bg-[#0d1220]/90 hover:bg-[#11182a] transition-all duration-200 flex flex-col md:flex-row md:items-start justify-between gap-4 group"
          >
            <div className="flex-1 space-y-3">
              {/* Date & Severity Tags */}
              <div className="flex items-center gap-2.5">
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {alert.date}
                </span>

                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase border ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-red-500/15 text-red-400 border-red-500/30'
                      : 'bg-orange-500/15 text-orange-400 border-orange-500/30'
                  }`}
                >
                  {alert.severity || 'CRITICAL'}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors font-sans flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                  {alert.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                  {alert.summary}
                </p>
              </div>

              {/* CVE Tags */}
              {alert.cve && alert.cve.length > 0 && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono text-slate-500">CVE Associeés :</span>
                  {alert.cve.map((cveCode, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded"
                    >
                      {cveCode}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* External Advisory Link Action */}
            <a
              href={alert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-center px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 text-slate-300 hover:text-amber-300 text-xs font-mono flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-sm"
            >
              <span>Avis CERT-FR</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
