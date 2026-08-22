import React, { useState } from 'react';
import { AlertTriangle, Search, ExternalLink, Calendar } from 'lucide-react';

export default function AnssiAlertes({ alerts }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((alert) =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pixar-card p-6 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 font-sans uppercase">
              ALERTES CERT-FR & AVIS ANSSI 💥
            </h2>
            <span className="text-xs font-sans font-bold text-amber-800 bg-amber-100 border-2 border-amber-300 px-3 py-1 rounded-full">
              SÉCURITÉ NATIONALE
            </span>
          </div>
          <p className="text-xs text-sky-700 font-sans font-bold mt-1">
            Bulletins de sécurité et avis de vulnérabilités critiques publiés par l Agence Nationale de la Sécurité des Systèmes d Information
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-sky-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une alerte..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-sky-50 border-2 border-sky-200 text-xs font-sans text-slate-900 font-bold placeholder-sky-400 focus:outline-none focus:border-sky-500 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="pixar-card p-6 bg-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-sky-100 pb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-sans font-extrabold px-3 py-1 rounded-full border-2 ${
                  alert.severity === 'CRITICAL'
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  NIVEAU : {alert.severity}
                </span>

                {(alert.cve || []).map((cve, i) => (
                  <span key={i} className="text-xs font-mono text-indigo-900 bg-indigo-100 border-2 border-indigo-200 px-3 py-0.5 rounded-full font-extrabold">
                    {cve}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-sky-800">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>{alert.date}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 font-sans">{alert.title}</h3>
              <p className="text-xs text-slate-700 font-sans font-semibold leading-relaxed mt-1">{alert.summary}</p>
            </div>

            <div className="pt-2 flex items-center justify-end">
              <a
                href={alert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pixar-btn-rose-3d px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-sans text-xs font-extrabold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Consulter le Bulletin CERT-FR 🚀</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
