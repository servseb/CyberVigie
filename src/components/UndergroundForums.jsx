import React, { useState } from 'react';
import { Lock, Search, ExternalLink, ShieldCheck, ShieldAlert, Filter } from 'lucide-react';

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
      item.description?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="cyber-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-4 h-4 text-purple-400" />
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide">
              FORUMS UNDERGROUND & DARKNET
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Surveillance des réseaux underground, marchés d'accès initiaux & canaux d'échanges.
          </p>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-slate-950/60 border border-white/[0.06] rounded-lg text-center">
            <div className="text-sm font-bold font-mono text-white">346</div>
            <div className="text-[9px] text-slate-500 font-mono uppercase">Référencés</div>
          </div>
          <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
            <div className="text-sm font-bold font-mono text-emerald-400">233</div>
            <div className="text-[9px] text-emerald-300/70 font-mono uppercase">En Ligne</div>
          </div>
          <div className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-center">
            <div className="text-sm font-bold font-mono text-rose-400">107</div>
            <div className="text-[9px] text-rose-300/70 font-mono uppercase">Hors Ligne</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="cyber-card p-3 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un forum underground, un nom ou une URL..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-white/[0.08] rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 bg-slate-950/80 border border-white/[0.08] rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="ONLINE">En ligne (ONLINE)</option>
            <option value="OFFLINE">Hors ligne (OFFLINE)</option>
          </select>
        </div>
      </div>

      {/* Forums Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((item) => {
          const isOnline = item.status === 'ONLINE';
          return (
            <div
              key={item.id}
              className="cyber-card p-4 flex items-center justify-between gap-3 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                    isOnline
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                  }`}
                >
                  {isOnline ? (
                    <ShieldCheck className="w-4 h-4" />
                  ) : (
                    <ShieldAlert className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-100 font-mono truncate">{item.name}</h4>
                    {item.is_onion && (
                      <span className="text-[9px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.2 rounded">
                        .onion
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">{item.url}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isOnline
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}
                >
                  {item.status}
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-slate-950 border border-white/[0.08] hover:border-purple-500/50 hover:bg-slate-800 text-slate-400 hover:text-purple-400 flex items-center justify-center transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
