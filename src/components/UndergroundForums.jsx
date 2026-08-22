import React, { useState } from 'react';
import { Globe, Search, ExternalLink, Shield, Lock } from 'lucide-react';

export default function UndergroundForums({ forums }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredForums = forums.filter((forum) =>
    forum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forum.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="cyber-card p-6 bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 font-sans">
              FORUMS UNDERGROUND & HACKING
            </h2>
            <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
              DARKNET & UNDERGROUND
            </span>
          </div>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Surveillance des canaux de vente d accès initiaux et de bases de données volées
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredForums.map((forum) => (
          <div key={forum.id} className="cyber-card p-5 bg-white border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  forum.status === 'ONLINE'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  ● {forum.status}
                </span>

                {forum.is_onion && (
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                    <Lock className="w-3 h-3 text-purple-600" /> TOR .ONION
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900 font-sans">{forum.name}</h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">{forum.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">{forum.url}</span>
              <a
                href={forum.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-sans font-bold flex items-center gap-1 cursor-pointer transition-all"
              >
                <span>Accéder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
