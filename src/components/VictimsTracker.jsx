import React, { useState } from 'react';
import { Users, Shield, Globe, Search, X, PieChart, BarChart3, Filter, RefreshCw, Layers, Building2, HardDrive, Flame, Sparkles } from 'lucide-react';
import WorldMap from './WorldMap';
import VictimCard from './VictimCard';
import { MOCK_SECTORS } from '../data/mockData';

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
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [localSearch, setLocalSearch] = useState('');

  const countryFilters = [
    { code: 'ALL', label: 'Tous les Pays 🌐' },
    { code: 'FR', label: '🇫🇷 France (7)' },
    { code: 'US', label: '🇺🇸 États-Unis (49)' },
    { code: 'ES', label: '🇪🇸 Espagne (4)' },
    { code: 'IT', label: '🇮🇹 Italie (18)' },
    { code: 'DE', label: '🇩🇪 Allemagne (17)' },
    { code: 'GB', label: '🇬🇧 Royaume-Uni (10)' },
    { code: 'CH', label: '🇨🇭 Suisse (2)' },
    { code: 'CA', label: '🇨🇦 Canada (4)' },
    { code: 'BR', label: '🇧🇷 Brésil (4)' },
    { code: 'TH', label: '🇹🇭 Thaïlande (5)' }
  ];

  const filteredVictims = victims.filter((v) => {
    const matchesCountry =
      selectedCountry === 'ALL' ||
      v.country_code?.toUpperCase() === selectedCountry ||
      v.country?.toUpperCase() === selectedCountry;

    const matchesSector =
      selectedSector === 'ALL' ||
      (v.sector && v.sector.toLowerCase().includes(selectedSector.toLowerCase()));

    const query = localSearch.toLowerCase().trim();
    const company = (v.company_name || v.post_title || '').toLowerCase();
    const matchesLocal =
      !query ||
      company.includes(query) ||
      v.group_name?.toLowerCase().includes(query) ||
      v.sector?.toLowerCase().includes(query) ||
      v.country?.toLowerCase().includes(query);

    return matchesCountry && matchesSector && matchesLocal;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Pixar 3D KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="pixar-card p-5 flex items-center justify-between bg-gradient-to-br from-white to-sky-50">
          <div>
            <span className="text-xs font-mono font-black text-sky-800 uppercase tracking-wider">
              🏢 SOCIÉTÉS IMPACTÉES
            </span>
            <div className="text-3xl font-black font-sans text-slate-900 mt-1">{victims.length}</div>
            <span className="text-xs font-sans text-sky-600 font-bold">Entreprises répertoriées</span>
          </div>
          <div className="w-12 h-12 rounded-3xl bg-sky-400 text-white border-2 border-sky-300 flex items-center justify-center shadow-md shadow-sky-500/20">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="pixar-card p-5 flex items-center justify-between bg-gradient-to-br from-white to-rose-50">
          <div>
            <span className="text-xs font-mono font-black text-rose-800 uppercase tracking-wider">
              🏴‍☠️ GROUPES PIRATES
            </span>
            <div className="text-3xl font-black font-sans text-slate-900 mt-1">43</div>
            <span className="text-xs font-sans text-rose-600 font-bold flex items-center gap-1">
              <Flame className="w-4 h-4 text-rose-500 animate-pulse" /> Top : Qilin (19%)
            </span>
          </div>
          <div className="w-12 h-12 rounded-3xl bg-rose-500 text-white border-2 border-rose-300 flex items-center justify-center shadow-md shadow-rose-500/20">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="pixar-card p-5 flex items-center justify-between bg-gradient-to-br from-white to-amber-50">
          <div>
            <span className="text-xs font-mono font-black text-amber-800 uppercase tracking-wider">
              🍬 SECTEURS TOUCHÉS
            </span>
            <div className="text-3xl font-black font-sans text-slate-900 mt-1">9</div>
            <span className="text-xs font-sans text-amber-700 font-bold">Santé, Banque, Auto...</span>
          </div>
          <div className="w-12 h-12 rounded-3xl bg-amber-400 text-slate-900 border-2 border-amber-300 flex items-center justify-center shadow-md shadow-amber-500/20">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="pixar-card p-5 flex items-center justify-between bg-gradient-to-br from-white to-emerald-50">
          <div>
            <span className="text-xs font-mono font-black text-emerald-800 uppercase tracking-wider">
              🎈 DONNÉES VOLÉES
            </span>
            <div className="text-3xl font-black font-sans text-slate-900 mt-1">14.8 TB</div>
            <span className="text-xs font-sans text-emerald-600 font-bold">Volume confidentiel</span>
          </div>
          <div className="w-12 h-12 rounded-3xl bg-emerald-500 text-white border-2 border-emerald-300 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <HardDrive className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Map & Top Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WorldMap
            selectedCountry={selectedCountry}
            onSelectCountry={(code) => setSelectedCountry(code)}
            topCountries={topCountries}
          />
        </div>

        {/* Top 10 Countries Table */}
        <div className="pixar-card p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between mb-4 border-b-2 border-sky-100 pb-3">
              <h3 className="text-xs font-mono font-black tracking-wider text-sky-900 uppercase flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-600" /> TOP PAYS IMPACTÉS 🏆
              </h3>
              <span className="text-xs font-sans font-bold text-sky-700">Entreprises</span>
            </div>

            <div className="space-y-2">
              {topCountries.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCountry(c.code)}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-sans font-bold transition-all cursor-pointer ${
                    selectedCountry === c.code
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105 border-2 border-sky-300'
                      : 'bg-sky-50 text-slate-800 border-2 border-sky-100 hover:bg-sky-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-mono font-bold ${selectedCountry === c.code ? 'bg-sky-700 text-white' : 'bg-sky-200 text-sky-900'}`}>
                      {i + 1}
                    </span>
                    <span>{c.country}</span>
                  </div>
                  <span className="font-extrabold text-sm">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedCountry !== 'ALL' && (
            <button
              onClick={() => setSelectedCountry('ALL')}
              className="mt-4 w-full py-2.5 bg-sky-100 hover:bg-sky-200 text-xs font-sans font-bold text-sky-800 rounded-2xl transition-colors border-2 border-sky-200 cursor-pointer shadow-sm"
            >
              Réinitialiser filtre pays 🌐
            </button>
          )}
        </div>
      </div>

      {/* Directory Filter & Sector Candy Pills */}
      <div className="pixar-card p-6 space-y-5 bg-white">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-sky-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 font-sans flex items-center gap-2">
              <Building2 className="w-6 h-6 text-sky-500" />
              AVENTURE DES SOCIÉTÉS PAR SECTEUR 🚀
            </h2>
            <p className="text-xs text-sky-700 font-sans font-bold mt-0.5">
              Sélectionnez un secteur d'activité ou tapez le nom d'une entreprise dans la recherche
            </p>
          </div>

          <div className="text-xs font-sans font-bold text-slate-700 bg-sky-50 border-2 border-sky-200 px-3.5 py-1.5 rounded-full">
            Sociétés trouvées : <span className="text-rose-600 font-extrabold text-sm">{filteredVictims.length}</span>
          </div>
        </div>

        {/* 1. SECTOR FILTERS CAROUSEL */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans font-black text-sky-900 uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-500" /> SECTEURS D'ACTIVITÉ :
            </span>
            {selectedSector !== 'ALL' && (
              <button
                onClick={() => setSelectedSector('ALL')}
                className="text-xs font-sans text-sky-600 hover:underline font-bold cursor-pointer"
              >
                Tous les secteurs 🍬
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
            {MOCK_SECTORS.map((sec, idx) => {
              const isActive = selectedSector === sec.name || (sec.name === 'Tous les secteurs' && selectedSector === 'ALL');
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedSector(sec.name === 'Tous les secteurs' ? 'ALL' : sec.name)}
                  className={`px-4 py-2 rounded-2xl text-xs font-sans font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border-2 ${
                    isActive
                      ? 'bg-sky-500 text-white border-sky-300 shadow-md shadow-sky-500/30 scale-105'
                      : 'bg-sky-50 text-sky-900 border-sky-100 hover:bg-sky-100'
                  }`}
                >
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. COUNTRY FILTERS & SEARCH INPUT */}
        <div className="space-y-3 pt-3 border-t-2 border-sky-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-sky-400 absolute left-4 top-3.5" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Rechercher une société (ex: Renault, Sanofi, Air France, Logitech...)"
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-sky-50 border-2 border-sky-200 text-xs font-sans font-bold text-slate-900 placeholder-sky-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3.5 top-3.5 text-sky-400 hover:text-sky-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Live API Search Button */}
            <div className="md:col-span-4 flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onApiSearch(searchQuery)}
                placeholder="Recherche API..."
                className="flex-1 px-3.5 py-3 rounded-2xl bg-sky-50 border-2 border-sky-200 text-xs font-sans font-bold text-slate-900 placeholder-sky-400 focus:outline-none focus:border-sky-500 transition-all shadow-inner"
              />
              <button
                onClick={() => onApiSearch(searchQuery)}
                disabled={isSearching}
                className="pixar-btn-3d px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white font-extrabold font-sans text-xs transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap shadow-md"
              >
                {isSearching ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>API 🚀</span>
              </button>
            </div>
          </div>

          {/* Country Pills Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
            <span className="text-xs font-sans font-black text-sky-800 uppercase mr-1">Pays :</span>
            {countryFilters.map((cf) => (
              <button
                key={cf.code}
                onClick={() => setSelectedCountry(cf.code)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCountry === cf.code
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-sky-100 text-sky-800 border-2 border-sky-200 hover:bg-sky-200'
                }`}
              >
                {cf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Company Cards Grid */}
        {filteredVictims.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 pt-3">
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
          <div className="py-14 text-center bg-sky-50 rounded-3xl border-4 border-sky-200">
            <Building2 className="w-12 h-12 text-sky-400 mx-auto mb-2 animate-bounce" />
            <h4 className="text-base font-extrabold text-slate-800 font-sans">Aucune société ne correspond à la recherche</h4>
            <p className="text-xs text-sky-700 font-bold mt-1">
              Essayez de réinitialiser le filtre de secteur ou le nom de l'entreprise recherchée.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
