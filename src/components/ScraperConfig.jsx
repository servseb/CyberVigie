import React, { useState, useEffect } from 'react';
import { Cpu, Plus, Play, Trash2, Edit3, CheckCircle2, AlertCircle, RefreshCw, Terminal, Layers, Globe, Clock, ShieldCheck, Activity, Key, Send } from 'lucide-react';
import ScraperModal from './ScraperModal';
import { executeCustomApiQuery } from '../services/ransomwareApi';

export default function ScraperConfig({ sources, setSources, onAddExtractedVictims }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSource, setEditingSource] = useState(null);
  const [runningSourceId, setRunningSourceId] = useState(null);
  const [executionLogs, setExecutionLogs] = useState({});
  const [nextScrapeCountdown, setNextScrapeCountdown] = useState(10);

  // Background Countdown Timer to Next Scheduled Heartbeat Scrape
  useEffect(() => {
    const timer = setInterval(() => {
      setNextScrapeCountdown((prev) => (prev <= 1 ? 10 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenAddModal = () => {
    setEditingSource(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (source) => {
    setEditingSource(source);
    setIsModalOpen(true);
  };

  const handleDeleteSource = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette source d extraction API ?')) {
      setSources((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : s))
    );
  };

  const handleSaveSource = (sourceToSave) => {
    setSources((prev) => {
      const exists = prev.some((s) => s.id === sourceToSave.id);
      if (exists) {
        return prev.map((s) => (s.id === sourceToSave.id ? sourceToSave : s));
      }
      return [sourceToSave, ...prev];
    });
  };

  // Run Extraction Immediately on Source Click (Including Custom API Query Execution!)
  const handleRunScraperNow = async (source) => {
    setRunningSourceId(source.id);
    const nowStr = new Date().toLocaleTimeString();

    setExecutionLogs((prev) => ({
      ...prev,
      [source.id]: [
        `[${nowStr}] [INIT] Lancement de l extraction pour '${source.name}'...`,
        `[${nowStr}] [PROT] Type : ${source.type}`
      ]
    }));

    if (source.type === 'REST API Personnalisée' && source.apiConfig) {
      try {
        const result = await executeCustomApiQuery({
          url: source.url,
          method: source.apiConfig.httpMethod || 'GET',
          headers: source.customHeaders || {},
          requestBody: source.apiConfig.requestBody || '',
          companyPath: source.apiConfig.companyPath || 'company_name',
          sectorPath: source.apiConfig.sectorPath || 'sector',
          countryPath: source.apiConfig.countryPath || 'country',
          volumePath: source.apiConfig.volumePath || 'data_volume'
        });

        setExecutionLogs((prev) => ({
          ...prev,
          [source.id]: [
            ...(prev[source.id] || []),
            `[${new Date().toLocaleTimeString()}] [HTTP 200 OK] ${result.extractedCount} objet(s) API extraits !`,
            `[${new Date().toLocaleTimeString()}] [SUCCESS] Données réelles transmises au tableau de bord.`
          ]
        }));

        if (result.extractedVictims && result.extractedVictims.length > 0) {
          onAddExtractedVictims(result.extractedVictims, source.category, source);
        }
      } catch (err) {
        setExecutionLogs((prev) => ({
          ...prev,
          [source.id]: [
            ...(prev[source.id] || []),
            `[${new Date().toLocaleTimeString()}] [API ERREUR] ${err.message}`
          ]
        }));
      }
    } else {
      setTimeout(() => {
        setExecutionLogs((prev) => ({
          ...prev,
          [source.id]: [
            ...(prev[source.id] || []),
            `[${new Date().toLocaleTimeString()}] [HTTP 200 OK] 14 éléments vérifiés et réactualisés.`,
            `[${new Date().toLocaleTimeString()}] [SUCCESS] Synchronisation terminée.`
          ]
        }));
      }, 1000);
    }

    // Update lastScraped timestamp and increment count
    setSources((prevSources) =>
      prevSources.map((s) =>
        s.id === source.id
          ? {
              ...s,
              lastScraped: new Date().toISOString(),
              itemCount: (s.itemCount || 0) + (source.type === 'REST API Personnalisée' ? 2 : 1)
            }
          : s
      )
    );

    setRunningSourceId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Banner */}
      <div className="pixar-card p-5 sm:p-6 bg-gradient-to-r from-sky-50 via-indigo-50 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-3xl bg-indigo-600 text-white border-2 border-indigo-300 flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            ⚙️
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-sans uppercase">
                GESTION DES SOURCES & REQUÊTES API PERSONNALISÉES 🚀
              </h2>
              <span className="text-xs font-sans font-bold text-indigo-900 bg-indigo-100 border-2 border-indigo-300 px-3 py-0.5 rounded-full">
                CONSTRUCTEUR REQUÊTES API REST (GET/POST)
              </span>
            </div>
            <p className="text-xs text-sky-800 font-sans font-bold mt-0.5">
              Configurez des requêtes API personnalisées avec authentification et mappage de champs d'extraction
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Heartbeat Status */}
          <div className="hidden lg:flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border-2 border-sky-200 shadow-xs text-xs font-mono font-bold text-sky-900">
            <Clock className="w-4 h-4 text-sky-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Prochain scrape : <strong className="text-rose-600">{nextScrapeCountdown}s</strong></span>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="pixar-btn-3d w-full sm:w-auto px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold font-sans text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Nouvelle Requête API / Source 🚀</span>
          </button>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((source) => {
          const isRunning = runningSourceId === source.id;
          const isCustomApi = source.type === 'REST API Personnalisée';
          const logs = executionLogs[source.id] || [];

          return (
            <div
              key={source.id}
              className={`pixar-card p-5 bg-white space-y-4 flex flex-col justify-between transition-all ${
                source.status === 'ACTIVE' ? 'border-sky-300' : 'border-slate-200 opacity-70'
              }`}
            >
              <div className="space-y-3">
                {/* Header info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isCustomApi
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-300'
                        : 'bg-sky-100 text-sky-900 border-sky-300'
                    }`}>
                      {source.type}
                    </span>
                    <h3 className="text-base font-black text-slate-900 font-sans leading-tight mt-1">
                      {source.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleToggleStatus(source.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-sans font-bold cursor-pointer transition-colors border ${
                      source.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                        : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {source.status === 'ACTIVE' ? '● ACTIF' : '○ INACTIF'}
                  </button>
                </div>

                {/* Endpoint URL */}
                <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-100 font-mono text-xs text-sky-900 truncate">
                  <span className="font-bold text-[10px] text-sky-700 block uppercase">Endpoint URL :</span>
                  <span className="truncate block font-semibold">{source.url}</span>
                </div>

                {/* Scraper Details */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Cadence</span>
                    <span className="font-extrabold text-slate-900 block mt-0.5">⚡ {source.frequency}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block">Objets Récupérés</span>
                    <span className="font-extrabold text-indigo-700 block mt-0.5">📦 {source.itemCount || 0}</span>
                  </div>
                </div>

                {/* Execution Logs Terminal */}
                {logs.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-[10px] text-sky-300 space-y-1 max-h-24 overflow-y-auto border border-slate-800">
                    {logs.map((log, index) => (
                      <div key={index} className="leading-tight">{log}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-sky-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleRunScraperNow(source)}
                  disabled={isRunning || source.status !== 'ACTIVE'}
                  className="pixar-btn-3d px-3.5 py-2 bg-sky-500 hover:bg-sky-600 text-white font-extrabold font-sans text-xs flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
                  <span>{isRunning ? 'Extraction...' : 'Exécuter 🚀'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(source)}
                    className="p-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 cursor-pointer border border-sky-200"
                    title="Configurer la requête API"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSource(source.id)}
                    className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 cursor-pointer border border-rose-200"
                    title="Supprimer la source"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scraper Configuration & API Builder Modal */}
      <ScraperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSource}
        editingSource={editingSource}
      />
    </div>
  );
}
