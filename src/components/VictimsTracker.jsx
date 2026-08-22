import React, { useState } from 'react';
import { Users, Shield, Globe, Search, X, PieChart, BarChart3, Filter, RefreshCw, Layers, Building2, HardDrive, Flame } from 'lucide-react';
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

  // Country filters list
  const countryFilters = [
    { code: 'ALL', label: 'Tous les Pays' },
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

  // Filter logic for victims (Company Name, Sector, Country & Local Search)
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
      
      {/* Light Theme KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Impacted Companies */}
        <div className="cyber-card p-5 flex items-center justify-between bg-white border border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              SOCIÉTÉS IMPACTÉES
            </span>
            <div className="text-3xl font-extrabold font-sans text-slate-900 mt-1">{victims.length}</div>
            <span className="text-xs font-sans text-indigo-600 font-semibold">Entreprises identifiées</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Active Cyber Groups */}
        <div className="cyber-card p-5 flex items-center justify-between bg-white border border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              GROUPES CYBERCRIMINELS
            </span>
            <div className="text-3xl font-extrabold font-sans text-slate-900 mt-1">43</div>
            <span className="text-xs font-sans text-rose-600 font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-500" /> Principal : Qilin (19%)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Sectors Count */}
        <div className="cyber-card p-5 flex items-center justify-between bg-white border border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              SECTEURS D'ACTIVITÉ
            </span>
            <div className="text-3xl font-extrabold font-sans text-slate-900 mt-1">9</div>
            <span className="text-xs font-sans text-sky-600 font-semibold">Santé, Banque, Auto...</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm">
            <Layers className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: Total Volume */}
        <div className="cyber-card p-5 flex items-center justify-between bg-white border border-slate-200">
          <div>
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
              DONNÉES EXFILTRÉES
            </span>
            <div className="text-3xl font-extrabold font-sans text-slate-900 mt-1">14.8 TB</div>
            <span className="text-xs font-sans text-emerald-600 font-semibold">Volume total identifié</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
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
        <div className="cyber-card p-5 flex flex-col justify-between bg-white border border-slate-200">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-900 uppercase flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" /> TOP PAYS TOUCHÉS
              </h3>
              <span className="text-xs font-mono text-slate-500">Entreprises</span>
            </div>

            <div className="space-y-1.5">
              {topCountries.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCountry(c.code)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-sans transition-all cursor-pointer ${
                    selectedCountry === c.code
                      ? 'bg-indigo-600 text-white font-bold shadow-sm'
                      : 'bg-slate-50 border border-slate-200/60 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${selectedCountry === c.code ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {i + 1}
                    </span>
                    <span>{c.country}</span>
                  </div>
                  <span className="font-bold text-xs">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedCountry !== 'ALL' && (
            <button
              onClick={() => setSelectedCountry('ALL')}
              className="mt-3 w-full py-2 bg-slate-100 hover:bg-slate-200 text-xs font-sans font-semibold text-slate-700 rounded-xl transition-colors border border-slate-200 cursor-pointer"
            >
              Tous les pays
            </button>
          )}
        </div>
      </div>

      {/* Directory Filter Panel & Sector Selector */}
      <div className="cyber-card p-6 bg-white border border-slate-200 space-y-5">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 font-sans flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              RÉPERTOIRE DES SOCIÉTÉS IMPACTÉES PAR SECTEUR
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Sélectionnez un secteur d'activité ou recherchez le nom d'une entreprise
            </p>
          </div>

          <div className="text-xs font-mono text-slate-600">
            Résultats : <span className="text-indigo-600 font-bold text-sm">{filteredVictims.length}</span> société(s)
          </div>
        </div>

        {/* 1. SECTOR FILTERS CAROUSEL (Mise en valeur explicite des secteurs d'activité) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" /> FILTRER PAR SECTEUR D'ACTIVITÉ :
            </span>
            {selectedSector !== 'ALL' && (
              <button
                onClick={() => setSelectedSector('ALL')}
                className="text-xs font-sans text-indigo-600 hover:underline font-semibold cursor-pointer"
              >
                Réinitialiser secteur
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-sans font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md shadow-indigo-500/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span>{sec.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. COUNTRY FILTERS & SEARCH INPUT */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input for Company Name */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Rechercher une société (ex: Renault, Sanofi, Air France, Logitech...)"
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
              />
              {localSearch && (
                <button
                  onClick={() => setLocalSearch('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
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
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all"
              />
              <button
                onClick={() => onApiSearch(searchQuery)}
                disabled={isSearching}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-sans text-xs transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer whitespace-nowrap shadow-md shadow-indigo-500/20"
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

          {/* Country Pills Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase mr-1">Pays:</span>
            {countryFilters.map((cf) => (
              <button
                key={cf.code}
                onClick={() => setSelectedCountry(cf.code)}
                className={`px-3 py-1 rounded-lg text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                  selectedCountry === cf.code
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {cf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Company Cards Grid */}
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
          <div className="py-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800 font-sans">Aucune société ne correspond à votre filtre</h4>
            <p className="text-xs text-slate-500 mt-1">
              Essayez de réinitialiser le filtre de secteur d'activité ou le nom de l'entreprise recherchée.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
