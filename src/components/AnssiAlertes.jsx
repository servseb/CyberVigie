import React from 'react';
import { AlertTriangle, ExternalLink, ShieldAlert, Calendar, FileText } from 'lucide-react';

export default function AnssiAlertes({ alerts }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="cyber-card p-5 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              ALERTES OFFICIELLES ANSSI & CERT-FR
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Bulletin des bulletins de sécurité et alertes critiques émises par l'ANSSI.
          </p>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          SOURCE OFFICIELLE
        </span>
      </div>

      {/* Alert Feed List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="cyber-card p-4 flex flex-col md:flex-row md:items-start justify-between gap-4 group hover:border-amber-500/30 transition-all"
          >
            <div className="flex-1 space-y-2">
              {/* Date & Severity Tags */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {alert.date}
                </span>

                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md uppercase border ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/20'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/20'
                  }`}
                >
                  {alert.severity || 'CRITICAL'}
                </span>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors font-sans flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 shrink-0" />
                  {alert.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                  {alert.summary}
                </p>
              </div>

              {/* CVE Tags */}
              {alert.cve && alert.cve.length > 0 && (
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-500">CVE :</span>
                  {alert.cve.map((cveCode, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/20 px-1.5 py-0.2 rounded"
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
              className="self-start md:self-center px-3 py-1.5 rounded-lg bg-slate-950 border border-white/[0.08] hover:border-amber-500/50 hover:bg-slate-800 text-slate-300 hover:text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>CERT-FR</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
