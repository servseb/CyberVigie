import React, { useState } from 'react';
import {
  Cpu,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Download,
  Upload,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  Radio,
  Rss,
  ExternalLink,
  Edit2,
  Trash2,
  ShieldCheck,
  Terminal,
  Database,
  Layers
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
          `[${new Date().toLocaleTimeString()}] HTTP 200 OK — Parsing des éléments avec les sélecteurs custom...`,
          `[${new Date().toLocaleTimeString()}] Conteneur: ${source.cssSelectors?.container || 'default'}`
        ]
      }));
    }, 600);

    setTimeout(() => {
      setTestConsoleLogs((prev) => ({
        ...prev,
        [source.id]: [
          ...(prev[source.id] || []),
          `[${new Date().toLocaleTimeString()}] SUCESS — Scraper opérationnel ! ${Math.floor(Math.random() * 25) + 5} nouveaux éléments extraits.`
        ]
      }));
      setRunningTestId(null);
      // Update lastScraped date
      setSources((prev) =>
        prev.map((s) =>
          s.id === source.id ? { ...s, lastScraped: new Date().toISOString() } : s
        )
      );
    }, 1500);
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
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-mono">
                Moteur de Scraping Direct & Autonome
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                100% Hors-IA / Zero Third-Party AI
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Configuration locale des extracteurs web, flux RSS et endpoints API pour alimenter la Threat Intelligence sans recourir à des modèles génératifs.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingSource(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer whitespace-nowrap transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Implémenter un Nouveau Site Source</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#0d1220] border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Total Sources</span>
            <div className="text-2xl font-black text-white font-mono mt-1">{sources.length}</div>
            <span className="text-[10px] font-mono text-cyan-400">Sites d'information & Flux</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Globe className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1220] border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Scrapers Actifs</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{activeCount}</div>
            <span className="text-[10px] font-mono text-slate-400">{inactiveCount} inactifs / pause</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1220] border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Fréquence Moyenne</span>
            <div className="text-2xl font-black text-purple-400 font-mono mt-1">15 min</div>
            <span className="text-[10px] font-mono text-slate-400">Synchronisation auto</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d1220] border border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Éléments Traités</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">{totalScrapedItems.toLocaleString()}</div>
            <span className="text-[10px] font-mono text-slate-400">Actes cyber répertoriés</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Database className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Toolbar Controls */}
      <div className="p-4 rounded-2xl bg-[#0d1220] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Rechercher par nom, URL ou protocole..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">Toutes les Catégories</option>
            <option value="CERT / ANSSI">CERT / ANSSI</option>
            <option value="Ransomware">Ransomware</option>
            <option value="APT Forums">APT Forums</option>
            <option value="Underground Forums">Underground Forums</option>
            <option value="Telegram">Telegram</option>
            <option value="Actualités Cyber">Actualités Cyber</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">Tous les Statuts</option>
            <option value="ACTIVE">Actifs uniquement</option>
            <option value="INACTIVE">Inactifs uniquement</option>
          </select>

          {/* Import JSON */}
          <label className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Importer JSON</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          {/* Export JSON */}
          <button
            onClick={handleExportJson}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Exporter JSON</span>
          </button>
        </div>
      </div>

      {/* Sources Grid / List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredSources.map((source) => {
          const isTesting = runningTestId === source.id;
          const logs = testConsoleLogs[source.id] || [];

          return (
            <div
              key={source.id}
              className={`p-5 rounded-2xl bg-[#0d1220] border transition-all ${
                source.status === 'ACTIVE'
                  ? 'border-slate-800 hover:border-cyan-500/50 shadow-lg shadow-black/20'
                  : 'border-slate-800/60 opacity-75'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {source.type.includes('RSS') ? (
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Rss className="w-4 h-4" />
                      </div>
                    ) : source.type.includes('API') ? (
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Cpu className="w-4 h-4" />
                      </div>
                    ) : source.type.includes('Telegram') ? (
                      <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                        <Radio className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                        <Globe className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-white font-sans">{source.name}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {source.category}
                      </span>
                      {source.isCustom && (
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                          Custom
                        </span>
                      )}
                    </div>

                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 mt-1 truncate max-w-md"
                    >
                      <span className="truncate">{source.url}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Status Toggle Badge */}
                <button
                  onClick={() => handleToggleStatus(source.id)}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold border transition-all cursor-pointer ${
                    source.status === 'ACTIVE'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {source.status === 'ACTIVE' ? '● ACTIF' : '○ INACTIF'}
                </button>
              </div>

              {/* Scraper Details Grid */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase">Protocole</span>
                  <span className="text-slate-200 font-semibold">{source.type}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase">Fréquence</span>
                  <span className="text-purple-300 font-semibold">{source.frequency}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px] uppercase">Articles</span>
                  <span className="text-amber-400 font-semibold">{source.itemCount || 0} items</span>
                </div>
              </div>

              {/* Console Output during test */}
              {logs.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                    <Terminal className="w-3 h-3" />
                    <span>Journal de simulation :</span>
                  </div>
                  {logs.map((log, i) => (
                    <div key={i} className="text-slate-300 truncate">
                      {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60">
                <span className="text-[10px] font-mono text-slate-500">
                  Dernier scrape : {source.lastScraped ? new Date(source.lastScraped).toLocaleTimeString() : 'N/A'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunSingleTest(source)}
                    disabled={isTesting}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center gap-1 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <Play className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Scraping...' : 'Tester'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setEditingSource(source);
                      setIsModalOpen(true);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono cursor-pointer transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteSource(source.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono cursor-pointer transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
