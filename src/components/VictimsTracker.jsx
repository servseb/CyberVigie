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
    <div className="space-y-6">
      {/* Metrics Summary Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="cyber-card p-5 border border-cyan-500/30 bg-gradient-to-b from-cyan-950/20 via-slate-900/80 to-slate-950/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-cyan-400 uppercase">
              DERNIÈRES VICTIMES
            </span>
            <div className="text-3xl font-black font-mono text-white mt-1">200</div>
            <span className="text-xs text-slate-400">Les 200 dernières victimes</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="cyber-card p-5 border border-red-500/30 bg-gradient-to-b from-red-950/20 via-slate-900/80 to-slate-950/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-red-400 uppercase">
              GROUPES ACTIFS
            </span>
            <div className="text-3xl font-black font-mono text-white mt-1">43</div>
            <span className="text-xs text-slate-400">Groupes identifiés</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/10">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="cyber-card p-5 border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 via-slate-900/80 to-slate-950/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-emerald-400 uppercase">
              PAYS TOUCHÉS
            </span>
            <div className="text-3xl font-black font-mono text-white mt-1">45</div>
            <span className="text-xs text-slate-400">Territoires impactés</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="cyber-card p-5 border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-slate-900/80 to-slate-950/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-semibold tracking-widest text-amber-400 uppercase">
              SECTEURS VISÉS
            </span>
            <div className="text-3xl font-black font-mono text-white mt-1">12</div>
            <span className="text-xs text-slate-400">Secteurs catégorisés</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Map & Top Countries Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Map SVG Container (2 Cols) */}
        <div className="lg:col-span-2">
          <WorldMap
            selectedCountry={selectedCountry}
            onSelectCountry={(code) => setSelectedCountry(code)}
            topCountries={topCountries}
          />
        </div>

        {/* Top 10 Pays Touchés Card (1 Col) */}
        <div className="cyber-card p-5 flex flex-col justify-between border border-slate-800">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <h3 className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" /> TOP 10 PAYS TOUCHÉS
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Victimes identifiées</span>
            </div>

            <div className="space-y-2">
              {topCountries.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCountry(c.code)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedCountry === c.code
                      ? 'bg-purple-600/30 border border-purple-500 text-white font-bold'
                      : 'bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] flex items-center justify-center text-slate-400 border border-slate-700">
                      {i + 1}
                    </span>
                    <span>{c.country}</span>
                  </div>
                  <span className="font-bold text-purple-300">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedCountry !== 'ALL' && (
            <button
              onClick={() => setSelectedCountry('ALL')}
              className="mt-4 w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 rounded-lg transition-colors border border-slate-700"
            >
              Réinitialiser le filtre pays
            </button>
          )}
        </div>
      </div>

      {/* Analytics Section: Top 5 Groups & Continents Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Groupes d'Attaquants */}
        <div className="cyber-card p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> TOP 5 GROUPES D'ATTAQUANTS
              </h3>
              <p className="text-[11px] text-slate-400">Groupes les plus actifs cette semaine</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              ACTIFS
            </span>
          </div>

          <div className="space-y-4">
            {topGroups.map((group, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-200 font-semibold flex items-center gap-2">
                    <span className="text-slate-500">{i + 1}.</span> {group.name}
                  </span>
                  <span className="text-cyan-400 font-bold">{group.percentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-1000 shadow-md"
                    style={{ width: `${group.percentage * 4}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Répartition par Continent */}
        <div className="cyber-card p-5 border border-slate-800">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase flex items-center gap-1.5">
                <PieChart className="w-4 h-4" /> RÉPARTITION PAR CONTINENT
              </h3>
              <p className="text-[11px] text-slate-400">Pourcentage des victimes enregistrées</p>
            </div>
            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              200 VICTIMES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Visual Donut Chart Simulator */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="38" stroke="#1e293b" strokeWidth="16" fill="transparent" />
                {/* Europe segment */}
                <circle cx="50" cy="50" r="38" stroke="#3b82f6" strokeWidth="16" strokeDasharray="83 155" strokeDashoffset="0" fill="transparent" />
                {/* North America segment */}
                <circle cx="50" cy="50" r="38" stroke="#ef4444" strokeWidth="16" strokeDasharray="69 169" strokeDashoffset="-83" fill="transparent" />
                {/* Asia segment */}
                <circle cx="50" cy="50" r="38" stroke="#10b981" strokeWidth="16" strokeDasharray="33 205" strokeDashoffset="-152" fill="transparent" />
                {/* South America segment */}
                <circle cx="50" cy="50" r="38" stroke="#f97316" strokeWidth="16" strokeDasharray="13 225" strokeDashoffset="-185" fill="transparent" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold font-mono text-white">200</span>
                <span className="text-[9px] text-slate-400 uppercase font-mono">Victimes</span>
              </div>
            </div>

            {/* Continent Legend List */}
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

      {/* Victims Directory List Header & Filters */}
      <div className="cyber-card p-6 border border-slate-800 space-y-5">
        <div>
          <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Liste des victimes
          </h2>
          <p className="text-xs text-slate-400">Les 200 dernières fuites et attaques de ransomware référencées</p>
        </div>

        {/* Country Filter Pills */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
            <Filter className="w-3 h-3 text-cyan-400" /> PAYS :
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {countryFilters.map((cf) => (
              <button
                key={cf.code}
                onClick={() => setSelectedCountry(cf.code)}
                className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedCountry === cf.code
                    ? 'bg-cyan-500 text-slate-950 font-bold border border-cyan-400 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Local List Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Filtre local : logitech, samsung, lockbit..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-3 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* API Search Bar (ransomware.live) */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onApiSearch(searchQuery)}
                placeholder="Recherche précise sur ransomware.live (ex: logitech)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs font-mono text-cyan-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-all"
              />
            </div>
            <button
              onClick={() => onApiSearch(searchQuery)}
              disabled={isSearching}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isSearching ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Search className="w-3.5 h-3.5" />
              )}
              <span>Rechercher</span>
            </button>

            {searchQuery && (
              <button
                onClick={onResetSearch}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition-colors border border-slate-700"
              >
                Effacer
              </button>
            )}
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/60">
          <span>
            Affichage de <strong className="text-white">{filteredVictims.length}</strong> victime(s)
          </span>
          {selectedCountry !== 'ALL' && (
            <span className="text-cyan-400">Filtre pays : {selectedCountry}</span>
          )}
        </div>

        {/* Victim Cards Grid */}
        {filteredVictims.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
          <div className="py-12 text-center bg-slate-950/60 rounded-xl border border-slate-800">
            <Shield className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-300">Aucune victime trouvée</h4>
            <p className="text-xs text-slate-500 mt-1">
              Essayez de modifier votre recherche ou de réinitialiser le filtre par pays.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
