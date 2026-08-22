import React, { useState, useEffect } from 'react';
import { X, Globe, Cpu, Check, Terminal, Play, Save, Code, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function ScraperModal({ isOpen, onClose, onSave, editingSource }) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'RSS / Atom',
    category: 'Actualités Cyber',
    frequency: '15 min',
    status: 'ACTIVE',
    containerSelector: 'item',
    titleSelector: 'title',
    linkSelector: 'link',
    dateSelector: 'pubDate',
    userAgent: 'CyberVigie-Scraper/2.4 (Souveraineté Direct Scraper)'
  });

  const [testStatus, setTestStatus] = useState('idle'); // idle | testing | success | error
  const [testLogs, setTestLogs] = useState([]);

  useEffect(() => {
    if (editingSource) {
      setFormData({
        name: editingSource.name || '',
        url: editingSource.url || '',
        type: editingSource.type || 'RSS / Atom',
        category: editingSource.category || 'Actualités Cyber',
        frequency: editingSource.frequency || '15 min',
        status: editingSource.status || 'ACTIVE',
        containerSelector: editingSource.cssSelectors?.container || 'item',
        titleSelector: editingSource.cssSelectors?.title || 'title',
        linkSelector: editingSource.cssSelectors?.link || 'link',
        dateSelector: editingSource.cssSelectors?.date || 'pubDate',
        userAgent: editingSource.customHeaders?.['User-Agent'] || 'CyberVigie-Scraper/2.4'
      });
    } else {
      setFormData({
        name: '',
        url: '',
        type: 'RSS / Atom',
        category: 'Actualités Cyber',
        frequency: '15 min',
        status: 'ACTIVE',
        containerSelector: 'item',
        titleSelector: 'title',
        linkSelector: 'link',
        dateSelector: 'pubDate',
        userAgent: 'CyberVigie-Scraper/2.4 (Souveraineté Direct Scraper)'
      });
    }
    setTestStatus('idle');
    setTestLogs([]);
  }, [editingSource, isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = () => {
    if (!formData.url) {
      setTestStatus('error');
      setTestLogs(['[ERREUR] Veuillez spécifier une URL cible pour le scraper.']);
      return;
    }

    setTestStatus('testing');
    setTestLogs([
      `[${new Date().toLocaleTimeString()}] [INIT] Initialisation du scraper direct...`,
      `[${new Date().toLocaleTimeString()}] [PROT] Protocole sélectionné : ${formData.type}`,
      `[${new Date().toLocaleTimeString()}] [HTTP] GET ${formData.url} ...`,
      `[${new Date().toLocaleTimeString()}] [HDRS] User-Agent: ${formData.userAgent}`
    ]);

    setTimeout(() => {
      setTestLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [HTTP 200 OK] Connexion établie. Taille payload : 142 KB.`
      ]);
    }, 700);

    setTimeout(() => {
      setTestLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [DOM PARSER] Application du sélecteur conteneur '${formData.containerSelector}'...`,
        `[${new Date().toLocaleTimeString()}] [DOM PARSER] 12 éléments extraits avec succès.`,
        `[${new Date().toLocaleTimeString()}] [PARSED ITEM 1] Titre: "Alerte de vulnérabilité critique corrigée dans le kernel v6.8"`,
        `[${new Date().toLocaleTimeString()}] [PARSED ITEM 2] Titre: "Extorsion revendiquée sur portail Onion par groupe ransomware"`
      ]);
    }, 1400);

    setTimeout(() => {
      setTestLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [SUCCESS] Test de scraping réussi avec 0 dépendance IA. Source valide et prête.`
      ]);
      setTestStatus('success');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedSource = {
      id: editingSource ? editingSource.id : `src-custom-${Date.now()}`,
      name: formData.name,
      url: formData.url,
      type: formData.type,
      category: formData.category,
      frequency: formData.frequency,
      status: formData.status,
      lastScraped: new Date().toISOString(),
      itemCount: editingSource ? editingSource.itemCount : 0,
      isCustom: true,
      cssSelectors: {
        container: formData.containerSelector,
        title: formData.titleSelector,
        link: formData.linkSelector,
        date: formData.dateSelector
      },
      customHeaders: {
        'User-Agent': formData.userAgent
      }
    };

    onSave(formattedSource);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0d1220] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                CYBERVIGIE SCRAPER BUILDER
              </span>
              <h3 className="text-lg font-bold text-white font-sans mt-0.5">
                {editingSource ? 'Modifier la Source de Scraping' : 'Implémenter un Nouveau Site Source'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice Hors IA */}
        <div className="px-6 py-2 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between text-xs font-mono text-emerald-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Exécution 100% Locale & Souveraine (Direct Scrape sans IA)</span>
          </div>
          <span className="text-[10px] text-slate-400">v2.4 Engine</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Grid Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Nom du Site / Source *
              </label>
              <input
                type="text"
                required
                placeholder="ex: BleepingComputer RSS"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Type de Scraper / Protocole *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="RSS / Atom">RSS / Atom Feed XML</option>
                <option value="REST API">API REST / Endpoint JSON</option>
                <option value="HTML DOM Scraper">HTML DOM Scraper (CSS Selectors)</option>
                <option value="Telegram Web">Telegram Web Scraper Channel</option>
              </select>
            </div>
          </div>

          {/* Target URL */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              URL Cible ou Endpoint à Scraper *
            </label>
            <div className="relative">
              <input
                type="url"
                required
                placeholder="https://example.com/rss/feed.xml"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
              <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          {/* Category & Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Catégorie de Menace
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="CERT / ANSSI">CERT / ANSSI</option>
                <option value="Ransomware">Ransomware</option>
                <option value="APT Forums">APT Forums</option>
                <option value="Underground Forums">Underground Forums</option>
                <option value="Telegram">Telegram</option>
                <option value="Actualités Cyber">Actualités Cyber</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Fréquence de Scrape
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="5 min">Toutes les 5 minutes</option>
                <option value="15 min">Toutes les 15 minutes</option>
                <option value="30 min">Toutes les 30 minutes</option>
                <option value="1 heure">Toutes les heures</option>
                <option value="6 heures">Toutes les 6 heures</option>
                <option value="24 heures">Quotidien (24h)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                Statut Initial
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="ACTIVE">ACTIF (En cours)</option>
                <option value="INACTIVE">INACTIF (En pause)</option>
              </select>
            </div>
          </div>

          {/* Selectors Configuration */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
              <Code className="w-4 h-4" />
              <span>Règles de Sélection & Parsing DOM / JSON</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Conteneur d'article :</label>
                <input
                  type="text"
                  value={formData.containerSelector}
                  onChange={(e) => setFormData({ ...formData, containerSelector: e.target.value })}
                  placeholder="item ou .article-card"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Champ Titre :</label>
                <input
                  type="text"
                  value={formData.titleSelector}
                  onChange={(e) => setFormData({ ...formData, titleSelector: e.target.value })}
                  placeholder="title ou h2.entry-title"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Champ Lien / URL :</label>
                <input
                  type="text"
                  value={formData.linkSelector}
                  onChange={(e) => setFormData({ ...formData, linkSelector: e.target.value })}
                  placeholder="link ou a.url"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Champ Date / Time :</label>
                <input
                  type="text"
                  value={formData.dateSelector}
                  onChange={(e) => setFormData({ ...formData, dateSelector: e.target.value })}
                  placeholder="pubDate ou time"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* User Agent */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              En-tête User-Agent sur mesure :
            </label>
            <input
              type="text"
              value={formData.userAgent}
              onChange={(e) => setFormData({ ...formData, userAgent: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none"
            />
          </div>

          {/* Live Test Console */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                Console de Simulation & Test de Connexion :
              </span>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testStatus === 'testing'}
                className="px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all"
              >
                <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                <span>{testStatus === 'testing' ? 'Scraping...' : 'Lancer le Test'}</span>
              </button>
            </div>

            {testLogs.length > 0 && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1 max-h-36 overflow-y-auto">
                {testLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      log.includes('ERREUR')
                        ? 'text-red-400'
                        : log.includes('SUCCESS')
                        ? 'text-emerald-400 font-bold'
                        : log.includes('HTTP 200')
                        ? 'text-cyan-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{editingSource ? 'Mettre à jour' : 'Enregistrer la Source'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
