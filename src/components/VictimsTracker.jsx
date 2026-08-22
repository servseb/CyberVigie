import React, { useState } from 'react';
import { Users, Shield, Globe, Building2, Search, X, PieChart, BarChart3, Filter, RefreshCw, Layers } from 'lucide-react';
import WorldMap from './WorldMap';
import VictimCard from './VictimCard';

export default function VictimsTracker({
  victims,
  topGroups,
  continents,
  topCountries,
  onSelectVictim,
  onApiSearch,
  onResetSearch,
  isSearching,
  searchQuery,
  setSearchQuery
}) {
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [localSearch, setLocalSearch] = useState('');

  // Country filter code mapping
  const countryFilters = [
    { code: 'ALL', label: 'Tous (200)' },
    { code: 'US', label: 'US (49)' },
    { code: 'N/A', label: 'N/A (24)' },
    { code: 'IT', label: 'IT (18)' },
    { code: 'DE', label: 'DE (17)' },
    { code: 'GB', label: 'GB (10)' },
    { code: 'FR', label: 'FR (7)' },
    { code: 'TH', label: 'TH (5)' },
    { code: 'ES', label: 'ES (4)' },
    { code: 'CA', label: 'CA (4)' },
    { code: 'BR', label: 'BR (4)' },
    { code: 'AU', label: 'AU (4)' },
    { code: 'IN', label: 'IN (3)' },
    { code: 'ZA', label: 'ZA (3)' },
    { code: 'TW', label: 'TW (3)' },
    { code: 'MY', label: 'MY (3)' },
    { code: 'MX', label: 'MX (3)' },
    { code: 'SE', label: 'SE (3)' },
    { code: 'CH', label: 'CH (2)' },
    { code: 'ID', label: 'ID (2)' },
    { code: 'JP', label: 'JP (2)' }
  ];

  // Filtered victims list
  const filteredVictims = victims.filter((v) => {
    const matchesCountry =
      selectedCountry === 'ALL' ||
      v.country_code?.toUpperCase() === selectedCountry ||
      v.country?.toUpperCase() === selectedCountry;

    const query = localSearch.toLowerCase().trim();
    const matchesLocal =
      !query ||
      v.post_title?.toLowerCase().includes(query) ||
      v.group_name?.toLowerCase().includes(query) ||
      v.country?.toLowerCase().includes(query) ||
      v.website?.toLowerCase().includes(query);

    return matchesCountry && matchesLocal;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Metrics Summary Cards (4 KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="cyber-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase">
              DERNIÈRES VICTIMES
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-0.5">200</div>
            <span className="text-[11px] text-cyan-400">Les 200 derniers actes</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-sm">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="cyber-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase">
              GROUPES ACTIFS
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-0.5">43</div>
            <span className="text-[11px] text-rose-400">Groupes identifiés</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-sm">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="cyber-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase">
              PAYS TOUCHÉS
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-0.5">45</div>
            <span className="text-[11px] text-emerald-400">Territoires impactés</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-sm">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="cyber-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-slate-400 uppercase">
              SECTEURS VISÉS
            </span>
            <div className="text-2xl font-bold font-mono text-white mt-0.5">12</div>
            <span className="text-[11px] text-amber-400">Secteurs surveillés</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Map & Top Countries Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Map SVG Container */}
        <div className="lg:col-span-2">
          <WorldMap
            selectedCountry={selectedCountry}
            onSelectCountry={(code) => setSelectedCountry(code)}
            topCountries={topCountries}
          />
        </div>

        {/* Top 10 Pays Touchés Card */}
        <div className="cyber-card p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/[0.06] pb-2">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-purple-400" /> TOP 10 PAYS TOUCHÉS
              </h3>
              <span className="text-[10px] font-mono text-slate-500">Victimes</span>
            </div>

            <div className="space-y-1.5">
              {topCountries.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCountry(c.code)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedCountry === c.code
                      ? 'bg-purple-500/20 border border-purple-500/50 text-white font-bold'
                      : 'bg-slate-950/40 border border-white/[0.04] text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-[9px] flex items-center justify-center text-slate-400 border border-slate-700">
                      {i + 1}
                    </span>
                    <span>{c.country}</span>
                  </div>
                  <span className="font-bold text-purple-300 text-[11px]">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedCountry !== 'ALL' && (
            <button
              onClick={() => setSelectedCountry('ALL')}
              className="mt-3 w-full py-1.5 bg-slate-800/80 hover:bg-slate-700 text-xs font-mono text-slate-300 rounded-lg transition-colors border border-slate-700"
            >
              Réinitialiser filtre pays
            </button>
          )}
        </div>
      </div>

      {/* Analytics Section: Top 5 Groups & Continents Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Groupes d'Attaquants */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-3 border-b border-white/[0.06] pb-2">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-cyan-400" /> TOP 5 GROUPES D'ATTAQUANTS
              </h3>
              <p className="text-[11px] text-slate-400">Groupes les plus actifs</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
              RANSOMWARE.LIVE
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {topGroups.map((group, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-200 font-semibold flex items-center gap-2">
                    <span className="text-slate-500">{i + 1}.</span> {group.name}
                  </span>
                  <span className="text-cyan-400 font-bold">{group.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/[0.05]">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${group.percentage * 4}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition par Continent */}
        <div className="cyber-card p-4">
          <div className="flex items-center justify-between mb-3 border-b border-white/[0.06] pb-2">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-purple-400" /> RÉPARTITION PAR CONTINENT
              </h3>
              <p className="text-[11px] text-slate-400">Part des victimes enregistrées</p>
            </div>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
              GLOBAL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
            {/* Donut Chart Simulator */}
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="38" stroke="#1e293b" strokeWidth="14" fill="transparent" />
                <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="14" strokeDasharray="83 155" strokeDashoffset="0" fill="transparent" />
                <circle cx="50" cy="50" r="38" stroke="#ef4444" strokeWidth="14" strokeDasharray="69 169" strokeDashoffset="-83" fill="transparent" />
                <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="14" strokeDasharray="33 205" strokeDashoffset="-152" fill="transparent" />
                <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="14" strokeDasharray="13 225" strokeDashoffset="-185" fill="transparent" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold font-mono text-white">200</span>
                <span className="text-[8px] text-slate-400 uppercase font-mono">Victimes</span>
              </div>
            </div>

            {/* Continent List */}
            <div className="space-y-1.5 text-xs font-mono">
              {continents.map((cont, i) => (
                <div key={i} className="flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cont.color }}></span>
                    <span className="text-[11px] truncate">{cont.name}</span>
                  </div>
                  <span className="font-semibold text-white">{cont.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Directory Search & Victim List Header */}
      <div className="cyber-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
          <div>
            <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Répertoire des Victimes
            </h2>
            <p className="text-xs text-slate-400">Suivi en direct des fuites et cyberattaques</p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span className="text-cyan-300 font-bold">{filteredVictims.length}</span> / {victims.length} affiché(e)s
          </div>
        </div>

        {/* Integrated Filter & Search Bar */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Main Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Filtrer la liste (ex: Logitech, LockBit, France...)"
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Live API Search Button / Trigger */}
            <div className="md:col-span-4 flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onApiSearch(searchQuery)}
                placeholder="Recherche API..."
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
              <button
                onClick={() => onApiSearch(searchQuery)}
                disabled={isSearching}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 font-bold font-mono text-xs transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {isSearching ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>API</span>
              </button>
            </div>
          </div>

          {/* Country Filter Pills Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3 text-cyan-400" /> Pays:
            </span>
            {countryFilters.map((cf) => (
              <button
                key={cf.code}
                onClick={() => setSelectedCountry(cf.code)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedCountry === cf.code
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950/60 border border-white/[0.06] text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Victim Cards Grid */}
        {filteredVictims.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
            {filteredVictims.map((victim, idx) => (
              <VictimCard
                key={victim.id}
                victim={victim}
                index={idx}
                onSelectVictim={onSelectVictim}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-slate-950/50 rounded-xl border border-white/[0.06]">
            <Shield className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-slate-300 font-mono">Aucune victime ne correspond aux filtres</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Essayez de modifier votre recherche ou de réinitialiser le filtre par pays.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
