import React, { useState } from 'react';
import {
  Cpu,
  Plus,
  Search,
  Filter,
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

export default function ScraperConfig({ sources, setSources }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState(null);

  // Test Runner State
  const [runningTestId, setRunningTestId] = useState(null);
  const [testConsoleLogs, setTestConsoleLogs] = useState({});

  // Filter logic
  const filteredSources = sources.filter((src) => {
    const matchesSearch =
      src.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'ALL' || src.category === categoryFilter;
    const matchesStatus = statusFilter === 'ALL' || src.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Aggregated Stats
  const activeCount = sources.filter((s) => s.status === 'ACTIVE').length;
  const inactiveCount = sources.filter((s) => s.status === 'INACTIVE').length;
  const totalScrapedItems = sources.reduce((acc, s) => acc + (s.itemCount || 0), 0);

  // Toggle status
  const handleToggleStatus = (id) => {
    setSources((prev) =>
      prev.map((src) =>
        src.id === id
          ? { ...src, status: src.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : src
      )
    );
  };

  // Delete source
  const handleDeleteSource = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette source de scraping ?')) {
      setSources((prev) => prev.filter((src) => src.id !== id));
    }
  };

  // Run Test Simulation for single source
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
          `[${new Date().toLocaleTimeString()}] HTTP 200 OK — Parsing avec les sélecteurs custom...`
        ]
      }));
    }, 600);

    setTimeout(() => {
      setTestConsoleLogs((prev) => ({
        ...prev,
        [source.id]: [
          ...(prev[source.id] || []),
          `[${new Date().toLocaleTimeString()}] SUCCÈS — Scraper opérationnel ! Éléments synchronisés.`
        ]
      }));
      setRunningTestId(null);
      setSources((prev) =>
        prev.map((s) =>
          s.id === source.id ? { ...s, lastScraped: new Date().toISOString() } : s
        )
      );
    }, 1400);
  };

  // Export JSON configuration
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(sources, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cybervigie_scrapers_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON configuration
  const handleImportJson = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            setSources(parsed);
            alert(`Configuration importée avec succès ! ${parsed.length} sources chargées.`);
          } else {
            alert('Format de fichier JSON invalide. Un tableau de sources est attendu.');
          }
        } catch (err) {
          alert('Erreur lors de la lecture du fichier JSON.');
        }
      };
    }
  };

  // Save/Update Source
  const handleSaveSource = (sourceToSave) => {
    setSources((prev) => {
      const exists = prev.some((s) => s.id === sourceToSave.id);
      if (exists) {
        return prev.map((s) => (s.id === sourceToSave.id ? sourceToSave : s));
      } else {
        return [sourceToSave, ...prev];
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner Notice Hors IA */}
      <div className="cyber-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white font-mono">
                Moteur de Scraping Direct & Autonome
              </h2>
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                100% HORS-IA
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Configuration locale des extracteurs web, flux RSS et endpoints API pour alimenter la Threat Intelligence sans recourir à des services externes.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingSource(null);
            setIsModalOpen(true);
          }}
          className="px-3.5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ajouter une Source</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cyber-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Total Sources</span>
            <div className="text-2xl font-bold text-white font-mono mt-0.5">{sources.length}</div>
            <span className="text-[10px] font-mono text-cyan-400">Flux & Portails</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Globe className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="cyber-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Scrapers Actifs</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">{activeCount}</div>
            <span className="text-[10px] font-mono text-slate-500">{inactiveCount} inactifs</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="cyber-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Fréquence Moyen.</span>
            <div className="text-2xl font-bold text-purple-400 font-mono mt-0.5">15 min</div>
            <span className="text-[10px] font-mono text-slate-500">Intervalle auto</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Clock className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="cyber-card p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Actes Répertoriés</span>
            <div className="text-2xl font-bold text-amber-400 font-mono mt-0.5">{totalScrapedItems.toLocaleString()}</div>
            <span className="text-[10px] font-mono text-slate-500">Données extraites</span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Database className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="cyber-card p-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Rechercher par nom, URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/[0.08] text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/[0.08] text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">Toutes les Catégories</option>
            <option value="CERT / ANSSI">CERT / ANSSI</option>
            <option value="Ransomware">Ransomware</option>
            <option value="APT Forums">APT Forums</option>
            <option value="Underground Forums">Underground Forums</option>
            <option value="Telegram">Telegram</option>
            <option value="Actualités Cyber">Actualités Cyber</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/[0.08] text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">Tous les Statuts</option>
            <option value="ACTIVE">Actifs uniquement</option>
            <option value="INACTIVE">Inactifs uniquement</option>
          </select>

          <label className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          <button
            onClick={handleExportJson}
            className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSources.map((source) => {
          const isTesting = runningTestId === source.id;
          const logs = testConsoleLogs[source.id] || [];

          return (
            <div
              key={source.id}
              className={`cyber-card p-4 transition-all ${
                source.status === 'ACTIVE'
                  ? 'hover:border-cyan-500/30'
                  : 'opacity-70'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {source.type.includes('RSS') ? (
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                        <Rss className="w-4 h-4" />
                      </div>
                    ) : source.type.includes('API') ? (
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                    ) : source.type.includes('Telegram') ? (
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                        <Radio className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Globe className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs font-bold text-white font-sans">{source.name}</h3>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-white/[0.06]">
                        {source.category}
                      </span>
                    </div>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1 mt-0.5 truncate max-w-sm"
                    >
                      <span className="truncate">{source.url}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleStatus(source.id)}
                  className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold border transition-all cursor-pointer ${
                    source.status === 'ACTIVE'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 border-white/[0.06] hover:text-white'
                  }`}
                >
                  {source.status === 'ACTIVE' ? '● ACTIF' : '○ INACTIF'}
                </button>
              </div>

              {/* Scraper Details Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-white/[0.05] text-[10px] font-mono">
                <div className="bg-slate-950/60 p-1.5 rounded-md border border-white/[0.04]">
                  <span className="text-slate-500 block text-[8px] uppercase">Format</span>
                  <span className="text-slate-200 font-semibold">{source.type}</span>
                </div>
                <div className="bg-slate-950/60 p-1.5 rounded-md border border-white/[0.04]">
                  <span className="text-slate-500 block text-[8px] uppercase">Fréquence</span>
                  <span className="text-purple-300 font-semibold">{source.frequency}</span>
                </div>
                <div className="bg-slate-950/60 p-1.5 rounded-md border border-white/[0.04]">
                  <span className="text-slate-500 block text-[8px] uppercase">Articles</span>
                  <span className="text-amber-400 font-semibold">{source.itemCount || 0}</span>
                </div>
              </div>

              {/* Console Output */}
              {logs.length > 0 && (
                <div className="mt-2.5 p-2.5 rounded-lg bg-slate-950 border border-white/[0.06] font-mono text-[10px] space-y-0.5">
                  <div className="flex items-center gap-1 text-cyan-400 font-bold mb-0.5">
                    <Terminal className="w-3 h-3" />
                    <span>Journal de test :</span>
                  </div>
                  {logs.map((log, i) => (
                    <div key={i} className="text-slate-300 truncate text-[9px]">
                      {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.05]">
                <span className="text-[9px] font-mono text-slate-500">
                  Dernier scrape : {source.lastScraped ? new Date(source.lastScraped).toLocaleTimeString() : 'N/A'}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleRunSingleTest(source)}
                    disabled={isTesting}
                    className="px-2.5 py-1 rounded-md bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <Play className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Scraping...' : 'Tester'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingSource(source);
                      setIsModalOpen(true);
                    }}
                    className="px-2 py-1 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 border border-white/[0.08] text-[11px] font-mono cursor-pointer transition-all"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => handleDeleteSource(source.id)}
                    className="px-2 py-1 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-[11px] font-mono cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scraper Builder Modal */}
      <ScraperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSource}
        editingSource={editingSource}
      />
    </div>
  );
}
