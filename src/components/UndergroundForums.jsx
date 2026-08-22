import React, { useState } from 'react';
import { Globe, Search, ExternalLink, Lock } from 'lucide-react';

export default function UndergroundForums({ forums }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredForums = forums.filter((forum) =>
    forum.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    forum.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pixar-card p-6 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 font-sans uppercase">
              FORUMS UNDERGROUND & HACKING 🏴‍☠️
            </h2>
            <span className="text-xs font-sans font-bold text-sky-800 bg-sky-100 border-2 border-sky-200 px-3 py-1 rounded-full">
              DARKNET & UNDERGROUND
            </span>
          </div>
          <p className="text-xs text-sky-700 font-sans font-bold mt-1">
            Surveillance des canaux de vente d accès initiaux et de bases de données volées
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-sky-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un forum..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-sky-50 border-2 border-sky-200 text-xs font-sans text-slate-900 font-bold placeholder-sky-400 focus:outline-none focus:border-sky-500 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredForums.map((forum) => (
          <div key={forum.id} className="pixar-card p-6 bg-white flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-sans font-bold px-3 py-1 rounded-full border-2 ${
                  forum.status === 'ONLINE'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}>
                  ● {forum.status}
                </span>

                {forum.is_onion && (
                  <span className="text-xs font-sans text-purple-800 bg-purple-100 border-2 border-purple-300 px-3 py-1 rounded-full flex items-center gap-1 font-bold">
                    <Lock className="w-3.5 h-3.5 text-purple-600" /> TOR .ONION
                  </span>
                )}
              </div>

              <h3 className="text-base font-black text-slate-900 font-sans">{forum.name}</h3>
              <p className="text-xs text-slate-600 font-sans font-semibold leading-relaxed">{forum.description}</p>
            </div>

            <div className="pt-3 border-t-2 border-sky-100 flex items-center justify-between">
              <span className="text-xs font-mono text-sky-700 font-bold truncate max-w-[170px]">{forum.url}</span>
              <a
                href={forum.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pixar-btn-3d px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-sans text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Accéder 🚀</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
