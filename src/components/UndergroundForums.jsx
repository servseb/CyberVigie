import React, { useState } from 'react';
import { Globe, Search, ExternalLink, ShieldCheck, ShieldAlert, Filter, Lock } from 'lucide-react';

export default function UndergroundForums({ forums }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = forums.filter((item) => {
    const matchesStatus =
      statusFilter === 'ALL' ||
      item.status.toUpperCase() === statusFilter.toUpperCase();
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.url.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="cyber-card p-6 border border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-5 h-5 text-purple-400 animate-pulse" />
            <h2 className="text-xl font-black tracking-wider text-white font-mono uppercase">
              FORUMS UNDERGROUND
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Référentiel Fastfire · surveillance des marchés noirs & réseaux darknet
          </p>
        </div>

        {/* Header Stats */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-center">
            <div className="text-xl font-bold font-mono text-white">346</div>
            <div className="text-[10px] text-slate-400 font-mono">Références</div>
          </div>
          <div className="px-4 py-2 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-center">
            <div className="text-xl font-bold font-mono text-emerald-400">233</div>
            <div className="text-[10px] text-emerald-300/80 font-mono">Actifs</div>
          </div>
          <div className="px-4 py-2 bg-red-950/40 border border-red-800/40 rounded-xl text-center">
            <div className="text-xl font-bold font-mono text-red-400">107</div>
            <div className="text-[10px] text-red-300/80 font-mono">Inactifs</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="cyber-card p-4 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un forum underground, un nom ou une URL..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="ONLINE">En ligne (ONLINE)</option>
            <option value="OFFLINE">Hors ligne (OFFLINE)</option>
          </select>
        </div>
      </div>

      {/* Forums List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isOnline = item.status === 'ONLINE';
          return (
            <div
              key={item.id}
              className="cyber-card p-4 border border-slate-800/90 bg-[#0c101c]/90 hover:bg-[#101526] flex items-center justify-between gap-4 transition-all duration-200"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                    isOnline
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {isOnline ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white font-mono truncate">{item.name}</h4>
                    {item.is_onion && (
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded">
                        .onion
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-slate-400 truncate">{item.url}</p>
                  {item.description && (
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Pill & Link */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-mono font-bold px-3 py-1 rounded-lg border ${
                    isOnline
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-red-500/15 text-red-400 border-red-500/30'
                  }`}
                >
                  {item.status}
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800 text-slate-400 hover:text-purple-400 flex items-center justify-center transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
