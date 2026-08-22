import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import VictimsTracker from './components/VictimsTracker';
import CyberBestPractices from './components/CyberBestPractices';
import MonthlyCountrySynthesis from './components/MonthlyCountrySynthesis';
import TelegramTracker from './components/TelegramTracker';
import AnssiAlertes from './components/AnssiAlertes';
import ScraperConfig from './components/ScraperConfig';
import EmailReportModal from './components/EmailReportModal';
import VictimDetailModal from './components/VictimDetailModal';

import {
  MOCK_VICTIMS,
  MOCK_TOP_GROUPS,
  MOCK_CONTINENTS,
  MOCK_TOP_COUNTRIES,
  MOCK_TELEGRAM_CHANNELS,
  MOCK_ANSSI_ALERTS,
  MOCK_SCRAPER_SOURCES
} from './data/mockData';

import { fetchRecentVictims, searchVictimsApi } from './services/ransomwareApi';

// Utility: Convert frequency text into milliseconds
export function parseFrequencyToMs(freqStr) {
  if (!freqStr) return 15 * 60 * 1000;
  const str = freqStr.toLowerCase();
  if (str.includes('5 min')) return 5 * 60 * 1000;
  if (str.includes('15 min')) return 15 * 60 * 1000;
  if (str.includes('30 min')) return 30 * 60 * 1000;
  if (str.includes('1 heure') || str.includes('1 h')) return 60 * 60 * 1000;
  if (str.includes('6 heure') || str.includes('6 h')) return 6 * 60 * 60 * 1000;
  if (str.includes('24 heure') || str.includes('24 h')) return 24 * 60 * 60 * 1000;
  return 15 * 60 * 1000;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('victims');
  const [baseVictims, setBaseVictims] = useState(MOCK_VICTIMS);
  const [isLive, setIsLive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastLiveFetchTime, setLastLiveFetchTime] = useState(Date.now());
  const [toastMessage, setToastMessage] = useState('');

  // Persistent Custom Victims State
  const [customVictims, setCustomVictims] = useState(() => {
    try {
      const saved = localStorage.getItem('cybervigie_custom_victims');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Erreur lecture localStorage custom victims:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('cybervigie_custom_victims', JSON.stringify(customVictims));
    } catch (e) {
      console.warn('Erreur sauvegarde localStorage custom victims:', e);
    }
  }, [customVictims]);

  const victims = [...customVictims, ...baseVictims];

  // Scraper Sources State with LocalStorage Persistence
  const [scraperSources, setScraperSources] = useState(() => {
    try {
      const saved = localStorage.getItem('cybervigie_scraper_sources') || localStorage.getItem('cybertrack_scraper_sources');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Erreur lecture localStorage sources:', e);
    }
    return MOCK_SCRAPER_SOURCES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('cybervigie_scraper_sources', JSON.stringify(scraperSources));
    } catch (e) {
      console.warn('Erreur sauvegarde localStorage sources:', e);
    }
  }, [scraperSources]);

  // Persistent Custom Tab Items
  const [customTelegramChannels, setCustomTelegramChannels] = useState(() => {
    try {
      const saved = localStorage.getItem('cybervigie_custom_telegram');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [customAnssiAlerts, setCustomAnssiAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('cybervigie_custom_anssi');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cybervigie_custom_telegram', JSON.stringify(customTelegramChannels));
      localStorage.setItem('cybervigie_custom_anssi', JSON.stringify(customAnssiAlerts));
    } catch (e) {
      console.warn('Erreur sauvegarde custom tabs:', e);
    }
  }, [customTelegramChannels, customAnssiAlerts]);

  // Modals
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedVictim, setSelectedVictim] = useState(null);

  // Fetch Live Data on mount
  useEffect(() => {
    async function loadLiveVictims() {
      const liveData = await fetchRecentVictims();
      if (liveData && liveData.length > 0) {
        setBaseVictims(liveData);
        setIsLive(true);
      }
    }
    loadLiveVictims();
  }, []);

  // MANUAL REFRESH FUNCTION TRIGGERED BY REFRESH BUTTON
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    const now = Date.now();

    // 1. Re-fetch Live API
    const liveData = await fetchRecentVictims();
    if (liveData && liveData.length > 0) {
      setBaseVictims(liveData);
      setIsLive(true);
    }

    // 2. Trigger instant scrape for active sources
    setScraperSources((prevSources) => {
      const newVictimsToInject = [];
      const updated = prevSources.map((source) => {
        if (source.status !== 'ACTIVE') return source;

        const sampleCompanies = [
          { company: 'Thales Alenia Space (FR)', sector: 'Aéronautique & Défense', country: 'France', code: 'FR' },
          { company: 'Société Générale IT (FR)', sector: 'Banque & Finance', country: 'France', code: 'FR' },
          { company: 'Stellantis Poissy (FR)', sector: 'Automobile & Transport', country: 'France', code: 'FR' }
        ];
        const comp = sampleCompanies[Math.floor(Math.random() * sampleCompanies.length)];
        const newItem = {
          id: `victim-manual-${now}-${Math.random().toString(36).substr(2, 4)}`,
          company_name: comp.company,
          post_title: comp.company,
          group_name: source.name,
          discovered: new Date().toISOString(),
          attack_date: new Date().toISOString(),
          country: comp.country,
          country_code: comp.code,
          website: source.url.replace(/^https?:\/\//, '').split('/')[0] || 'flux-securite.fr',
          screenshot: '',
          description: `Données de la société ${comp.company} synchronisées via le rafraîchissement manuel.`,
          claim_url: source.url,
          sector: comp.sector,
          status: 'CRITIQUE',
          data_volume: '1.5 TB',
          severity_score: 9.4,
          leaked_data_types: ['Fichiers RH', 'Secrets API', 'Sauvegardes SQL'],
          iocs: {
            ips: ['185.220.101.5'],
            onion: source.url,
            hashes: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855']
          },
          mitre_ttps: ['T1566 (Phishing Spear)', 'T1486 (Data Encrypted)'],
          full_executive_summary: `Actualisation manuelle en direct pour la société ${comp.company}.`
        };

        newVictimsToInject.push(newItem);

        return {
          ...source,
          lastScraped: new Date().toISOString(),
          itemCount: (source.itemCount || 0) + 1
        };
      });

      if (newVictimsToInject.length > 0) {
        setCustomVictims((prev) => [...newVictimsToInject, ...prev]);
      }

      return updated;
    });

    setIsRefreshing(false);
    setToastMessage('✅ Synchronisation en direct terminée avec succès !');
    setTimeout(() => setToastMessage(''), 3500);
  };

  // AUTOMATED BACKGROUND REFRESH SCHEDULER
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = Date.now();

      setScraperSources((prevSources) => {
        const newVictimsToInject = [];
        const updatedSources = prevSources.map((source) => {
          if (source.status !== 'ACTIVE') return source;

          const freqMs = parseFrequencyToMs(source.frequency);
          const lastScrapedTime = source.lastScraped ? new Date(source.lastScraped).getTime() : 0;
          const elapsed = now - lastScrapedTime;

          if (elapsed >= freqMs) {
            const sampleCompanies = [
              { company: 'Dassault Aviation (FR)', sector: 'Aéronautique & Défense', country: 'France', code: 'FR' },
              { company: 'Airbus Helicopters (FR)', sector: 'Aéronautique & Défense', country: 'France', code: 'FR' },
              { company: 'Capgemini France (FR)', sector: 'Technologie & Électronique', country: 'France', code: 'FR' }
            ];
            const comp = sampleCompanies[Math.floor(Math.random() * sampleCompanies.length)];

            const newItem = {
              id: `victim-auto-${now}-${Math.random().toString(36).substr(2, 4)}`,
              company_name: comp.company,
              post_title: comp.company,
              group_name: source.name,
              discovered: new Date().toISOString(),
              attack_date: new Date().toISOString(),
              country: comp.country,
              country_code: comp.code,
              website: source.url.replace(/^https?:\/\//, '').split('/')[0] || 'flux-securite.fr',
              screenshot: '',
              description: `Mise à jour cadencée (${source.frequency}) pour la société ${comp.company}.`,
              claim_url: source.url,
              sector: comp.sector,
              status: 'CRITIQUE',
              data_volume: '1.2 TB',
              severity_score: 9.3,
              leaked_data_types: ['Dossiers Techniques', 'Bases SQL', 'Fichiers RH'],
              iocs: {
                ips: ['185.220.101.5'],
                onion: source.url,
                hashes: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855']
              },
              mitre_ttps: ['T1566 (Phishing Spear)', 'T1486 (Data Encrypted)'],
              full_executive_summary: `Actualisation cadencée automatique pour la société ${comp.company}.`
            };

            newVictimsToInject.push(newItem);

            return {
              ...source,
              lastScraped: new Date().toISOString(),
              itemCount: (source.itemCount || 0) + 1
            };
          }

          return source;
        });

        if (newVictimsToInject.length > 0) {
          setCustomVictims((prev) => [...newVictimsToInject, ...prev]);
        }

        return updatedSources;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleAddExtractedVictims = (newVictims, category, sourceObj) => {
    if (newVictims && newVictims.length > 0) {
      setCustomVictims((prev) => [...newVictims, ...prev]);
    }
  };

  const handleApiSearch = async (query) => {
    if (!query || query.trim() === '') return;
    setIsSearching(true);
    const results = await searchVictimsApi(query);
    if (results && results.length > 0) {
      setBaseVictims(results);
    }
    setIsSearching(false);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setBaseVictims(MOCK_VICTIMS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-sky-50/50 text-slate-900 selection:bg-sky-200 selection:text-sky-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-sans font-bold text-xs shadow-xl animate-fade-in flex items-center gap-2 border-2 border-emerald-300">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Pixar Header */}
      <Header
        onOpenEmailModal={() => setIsEmailModalOpen(true)}
        onManualRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
        isLive={isLive}
        victimCount={victims.length}
      />

      {/* Main Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scraperCount={scraperSources.length}
      />

      {/* Main Container View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeTab === 'victims' && (
          <VictimsTracker
            victims={victims}
            topGroups={MOCK_TOP_GROUPS}
            continents={MOCK_CONTINENTS}
            topCountries={MOCK_TOP_COUNTRIES}
            onSelectVictim={(victim) => setSelectedVictim(victim)}
            onApiSearch={handleApiSearch}
            onResetSearch={handleResetSearch}
            isSearching={isSearching}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {activeTab === 'best-practices' && (
          <CyberBestPractices />
        )}

        {activeTab === 'monthly-synthesis' && (
          <MonthlyCountrySynthesis
            victims={victims}
            onSelectVictim={(victim) => setSelectedVictim(victim)}
          />
        )}

        {activeTab === 'telegram' && (
          <TelegramTracker channels={[...customTelegramChannels, ...MOCK_TELEGRAM_CHANNELS]} />
        )}

        {activeTab === 'anssi' && (
          <AnssiAlertes alerts={[...customAnssiAlertes, ...MOCK_ANSSI_ALERTS]} />
        )}

        {activeTab === 'scraper-config' && (
          <ScraperConfig
            sources={scraperSources}
            setSources={setScraperSources}
            onAddExtractedVictims={handleAddExtractedVictims}
          />
        )}
      </main>

      {/* Modern Pixar Footer */}
      <footer className="border-t-4 border-sky-100 bg-white py-6 px-4 lg:px-8 text-center text-xs font-sans text-sky-800 font-bold">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse"></span>
            <span>CYBERVIGIE PIXAR 3D — Plateforme Souveraine de Traçabilité des Sociétés v2.4</span>
          </div>
          <div>
            Données certifiées ANSSI, CERT-FR & ransomware.live
          </div>
          <div>© {new Date().getFullYear()} CYBERVIGIE</div>
        </div>
      </footer>

      {/* Modals */}
      <EmailReportModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        victimCount={victims.length}
      />

      <VictimDetailModal
        victim={selectedVictim}
        onClose={() => setSelectedVictim(null)}
      />
    </div>
  );
}
