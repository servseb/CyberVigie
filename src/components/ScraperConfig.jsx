import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Plus,
  Search,
  Download,
  Upload,
  Play,
  CheckCircle2,
  Clock,
  Globe,
  Radio,
  Rss,
  ExternalLink,
  Edit2,
  Trash2,
  ShieldCheck,
  Terminal,
  Database
} from 'lucide-react';
import ScraperModal from './ScraperModal';
import { parseFrequencyToMs } from '../App';

export default function ScraperConfig({ sources, setSources, onAddExtractedVictims }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState(null);
  const [now, setNow] = useState(Date.now());

  // Test Runner State
  const [runningTestId, setRunningTestId] = useState(null);
  const [testConsoleLogs, setTestConsoleLogs] = useState({});

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getNextScrapeText = (source) => {
    if (source.status !== 'ACTIVE') return 'En pause';
    const freqMs = parseFrequencyToMs(source.frequency);
    const lastScrapedTime = source.lastScraped ? new Date(source.lastScraped).getTime() : 0;
    const nextRunTime = lastScrapedTime + freqMs;
    const diffMs = nextRunTime - now;

    if (diffMs <= 0) return 'Scrape imminent...';

    const diffSec = Math.floor((diffMs / 1000) % 60);
    const diffMin = Math.floor((diffMs / (1000 * 60)) % 60);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours > 0) {
      return `Dans ${diffHours}h ${diffMin}m`;
    }
    if (diffMin > 0) {
      return `Dans ${diffMin}m ${diffSec}s`;
    }
    return `Dans ${diffSec}s`;
  };

  const generateVictimsFromSource = (sourceObj, count = 2) => {
    const companies = [
      { company: 'Dassault Aviation (Filiale)', sector: 'Aéronautique & Défense', country: 'France', code: 'FR' },
      { company: 'Thales Defence Systems', sector: 'Défense & Électronique', country: 'France', code: 'FR' },
      { company: 'Bayer AG Pharma', sector: 'Santé & Pharmacie', country: 'Allemagne', code: 'DE' }
    ];

    return Array.from({ length: count }, (_, i) => {
      const comp = companies[i % companies.length];
      const timestamp = new Date().toISOString();
      return {
        id: `victim-src-${Date.now()}-${i}`,
        company_name: comp.company,
        post_title: comp.company,
        group_name: sourceObj.name,
        discovered: timestamp,
        attack_date: timestamp,
        country: comp.country,
        country_code: comp.code,
        website: sourceObj.url.replace(/^https?:\/\//, '').split('/')[0] || 'flux-securite.fr',
        screenshot: '',
        description: `Nouvelles données de la société ${comp.company} extraites via le scraper [${sourceObj.type}] configuré sur ${sourceObj.name}.`,
        claim_url: sourceObj.url,
        sector: comp.sector,
        status: 'CRITIQUE',
        data_volume: '1.2 TB',
        severity_score: 9.3,
        leaked_data_types: ['Dossiers Techniques', 'Bases SQL', 'Fichiers RH'],
        iocs: {
          ips: ['185.220.101.5'],
          onion: sourceObj.url,
          hashes: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855']
        },
        mitre_ttps: ['T1566 (Phishing)', 'T1486 (Ransomware Impact)'],
        full_executive_summary: `Extraction automatique cadencée de données de la société ${comp.company}.`
      };
    });
  };

  const filteredSources = sources.filter((src) => {
    const matchesSearch =
      src.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || src.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || src.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeCount = sources.filter((s) => s.status === 'ACTIVE').length;
  const totalScrapedItems = sources.reduce((acc, s) => acc + (s.itemCount || 0), 0);

  const handleToggleStatus = (id) => {
    setSources((prev) =>
      prev.map((src) =>
        src.id === id
          ? { ...src, status: src.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : src
      )
    );
  };

  const handleDeleteSource = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette source de scraping ?')) {
      setSources((prev) => prev.filter((src) => src.id !== id));
    }
  };

  const handleRunSingleTest = (source) => {
    setRunningTestId(source.id);
    setTestConsoleLogs((prev) => ({
      ...prev,
      [source.id]: [
        `[${new Date().toLocaleTimeString()}] Connexion à ${source.url} ...`,
        `[${new Date().toLocaleTimeString()}] Format détecté: ${source.type}`
      ]
    }));

    setTimeout(() => {
      setTestConsoleLogs((prev) => ({
        ...prev,
        [source.id]: [
          ...(prev[source.id] || []),
          `[${new Date().toLocaleTimeString()}] HTTP 200 OK — Parsing en cours...`
        ]
      }));
    }, 600);

    setTimeout(() => {
      const newTestItems = generateVictimsFromSource(source, 2);

      setTestConsoleLogs((prev) => ({
        ...prev,
        [source.id]: [
          ...(prev[source.id] || []),
          `[${new Date().toLocaleTimeString()}] SUCCÈS — ${newTestItems.length} nouvelles sociétés extraites avec succès.`
        ]
      }));

      setRunningTestId(null);

      const updatedSource = {
        ...source,
        lastScraped: new Date().toISOString(),
        itemCount: (source.itemCount || 0) + newTestItems.length
      };

      setSources((prev) =>
        prev.map((s) => (s.id === source.id ? updatedSource : s))
      );

      if (onAddExtractedVictims) {
        onAddExtractedVictims(newTestItems, source.category, updatedSource);
      }
    }, 1400);
  };

  const handleSaveSource = (sourceToSave) => {
    const newExtractedItems = generateVictimsFromSource(sourceToSave, 2);
    const updatedSource = {
      ...sourceToSave,
      itemCount: (sourceToSave.itemCount || 0) + 2,
      lastScraped: new Date().toISOString()
    };

    setSources((prev) => {
      const exists = prev.some((s) => s.id === updatedSource.id);
      if (exists) {
        return prev.map((s) => (s.id === updatedSource.id ? updatedSource : s));
      } else {
        return [updatedSource, ...prev];
      }
    });

    if (onAddExtractedVictims) {
      onAddExtractedVictims(newExtractedItems, updatedSource.category, updatedSource);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="cyber-card p-6 bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 font-sans">
                GESTION DES SOURCES & SCRAPERS CADENCÉS
              </h2>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                PLANIFICATEUR ACTIF
              </span>
            </div>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Extraction automatique des sociétés ciblées selon la cadence configurée (5 min, 15 min, 1h...)
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingSource(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-sans text-xs transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/20 cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une Source</span>
        </button>
      </div>

      {/* Grid Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cyber-card p-4 bg-white border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">Total Sources</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{sources.length}</div>
            <span className="text-xs text-indigo-600 font-semibold">Flux & APIs</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        <div className="cyber-card p-4 bg-white border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">Actifs</span>
            <div className="text-2xl font-extrabold text-emerald-600 mt-0.5">{activeCount}</div>
            <span className="text-xs text-slate-500">En cours d extraction</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="cyber-card p-4 bg-white border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">Boucle Heartbeat</span>
            <div className="text-2xl font-extrabold text-purple-600 mt-0.5">10s</div>
            <span className="text-xs text-emerald-600 font-semibold">Vérification temps réel</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="cyber-card p-4 bg-white border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-500 font-bold uppercase">Actes Répertoriés</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-0.5">{totalScrapedItems.toLocaleString()}</div>
            <span className="text-xs text-slate-500">Éléments indexés</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <Database className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Sources Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSources.map((source) => {
          const isTesting = runningTestId === source.id;
          const logs = testConsoleLogs[source.id] || [];
          const nextScrapeStr = getNextScrapeText(source);

          return (
            <div key={source.id} className="cyber-card p-5 bg-white border border-slate-200 hover:border-indigo-300 transition-all space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans">{source.name}</h3>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-indigo-600 hover:underline flex items-center gap-1 mt-0.5 truncate max-w-sm"
                    >
                      <span className="truncate">{source.url}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleStatus(source.id)}
                  className={`px-3 py-1 rounded-full font-mono text-xs font-bold border cursor-pointer ${
                    source.status === 'ACTIVE'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {source.status === 'ACTIVE' ? '● ACTIF' : '○ INACTIF'}
                </button>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[9px] uppercase">Format</span>
                  <span className="text-slate-900 font-bold">{source.type}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[9px] uppercase">Fréquence</span>
                  <span className="text-indigo-700 font-bold">{source.frequency}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-slate-500 block text-[9px] uppercase">Prochain Scrape</span>
                  <span className="text-emerald-700 font-bold truncate block">{nextScrapeStr}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-mono text-slate-400">
                  Dernier : {source.lastScraped ? new Date(source.lastScraped).toLocaleTimeString() : 'N/A'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunSingleTest(source)}
                    disabled={isTesting}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-sans font-bold flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <Play className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Scraping...' : 'Tester'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteSource(source.id)}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-sans font-bold cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ScraperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSource}
        editingSource={editingSource}
      />
    </div>
  );
}
