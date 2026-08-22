import React, { useState } from 'react';
import { AlertTriangle, Search, ExternalLink, ShieldCheck, Calendar, FileText } from 'lucide-react';

export default function AnssiAlertes({ alerts }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((alert) =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="cyber-card p-6 bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 font-sans">
              ALERTES CERT-FR & AVIS ANSSI
            </h2>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              SÉCURITÉ NATIONALE
            </span>
          </div>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Bulletins de sécurité et avis de vulnérabilités critiques publiés par l Agence Nationale de la Sécurité des Systèmes d Information
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une alerte ANSSI..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="cyber-card p-5 bg-white border border-slate-200 hover:border-amber-400 transition-all space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  NIVEAU : {alert.severity}
                </span>

                {(alert.cve || []).map((cve, i) => (
                  <span key={i} className="text-[10px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full font-bold">
                    {cve}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{alert.date}</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 font-sans">{alert.title}</h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed mt-1">{alert.summary}</p>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <a
                href={alert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-sans font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Consulter le Bulletin Officiel CERT-FR</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
