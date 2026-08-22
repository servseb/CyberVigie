import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import VictimsTracker from './components/VictimsTracker';
import AptForumTracker from './components/AptForumTracker';
import UndergroundForums from './components/UndergroundForums';
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
  MOCK_APT_FORUMS,
  MOCK_UNDERGROUND_FORUMS,
  MOCK_TELEGRAM_CHANNELS,
  MOCK_ANSSI_ALERTS,
  MOCK_SCRAPER_SOURCES
} from './data/mockData';

import { fetchRecentVictims, searchVictimsApi } from './services/ransomwareApi';

export default function App() {
  const [activeTab, setActiveTab] = useState('victims');
  const [baseVictims, setBaseVictims] = useState(MOCK_VICTIMS);
  const [isLive, setIsLive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Combined Victims List (Custom items + Live/Mock victims)
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
  const [customAptForums, setCustomAptForums] = useState(() => {
    try {
      const saved = localStorage.getItem('cybervigie_custom_apt_forums');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [customUndergroundForums, setCustomUndergroundForums] = useState(() => {
    try {
      const saved = localStorage.getItem('cybervigie_custom_underground');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

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

  // Save custom tabs
  useEffect(() => {
    try {
      localStorage.setItem('cybervigie_custom_apt_forums', JSON.stringify(customAptForums));
      localStorage.setItem('cybervigie_custom_underground', JSON.stringify(customUndergroundForums));
      localStorage.setItem('cybervigie_custom_telegram', JSON.stringify(customTelegramChannels));
      localStorage.setItem('cybervigie_custom_anssi', JSON.stringify(customAnssiAlerts));
    } catch (e) {
      console.warn('Erreur sauvegarde custom tabs:', e);
    }
  }, [customAptForums, customUndergroundForums, customTelegramChannels, customAnssiAlerts]);

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

  // Handler to add newly extracted victims from scrapers
  const handleAddExtractedVictims = (newVictims, category, sourceObj) => {
    if (newVictims && newVictims.length > 0) {
      setCustomVictims((prev) => [...newVictims, ...prev]);
    }

    // Also populate dedicated tab if category matches
    if (sourceObj) {
      const categoryName = sourceObj.category;
      if (categoryName === 'APT Forums') {
        const item = {
          id: `custom-apt-${Date.now()}`,
          name: sourceObj.name,
          url: sourceObj.url,
          status: 'ONLINE',
          is_onion: sourceObj.url.includes('.onion'),
          description: `Source custom ajoutée : ${sourceObj.name}`
        };
        setCustomAptForums((prev) => [item, ...prev]);
      } else if (categoryName === 'Underground Forums') {
        const item = {
          id: `custom-ug-${Date.now()}`,
          name: sourceObj.name,
          url: sourceObj.url,
          status: 'ONLINE',
          is_onion: sourceObj.url.includes('.onion'),
          description: `Source custom ajoutée : ${sourceObj.name}`
        };
        setCustomUndergroundForums((prev) => [item, ...prev]);
      } else if (categoryName === 'Telegram') {
        const item = {
          id: `custom-tg-${Date.now()}`,
          name: sourceObj.name,
          url: sourceObj.url,
          status: 'VALID',
          description: `Canal Telegram custom : ${sourceObj.name}`
        };
        setCustomTelegramChannels((prev) => [item, ...prev]);
      } else if (categoryName === 'CERT / ANSSI') {
        const item = {
          id: `custom-anssi-${Date.now()}`,
          title: `[ALERTE SOURCE] ${sourceObj.name} - Bulletin de vigilance`,
          date: new Date().toLocaleDateString('fr-FR'),
          severity: 'CRITICAL',
          summary: `Indicateurs de compromission synchronisés depuis la source ${sourceObj.name}`,
          url: sourceObj.url,
          cve: ['CVE-2026-VIGIE']
        };
        setCustomAnssiAlerts((prev) => [item, ...prev]);
      }
    }
  };

  // API Search Trigger
  const handleApiSearch = async (query) => {
    if (!query || query.trim() === '') return;
    setIsSearching(true);
    const results = await searchVictimsApi(query);
    if (results && results.length > 0) {
      setBaseVictims(results);
    }
    setIsSearching(false);
  };

  // Reset Search
  const handleResetSearch = () => {
    setSearchQuery('');
    setBaseVictims(MOCK_VICTIMS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        onOpenEmailModal={() => setIsEmailModalOpen(true)}
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

        {activeTab === 'apt-forums' && (
          <AptForumTracker forums={[...customAptForums, ...MOCK_APT_FORUMS]} />
        )}

        {activeTab === 'underground' && (
          <UndergroundForums forums={[...customUndergroundForums, ...MOCK_UNDERGROUND_FORUMS]} />
        )}

        {activeTab === 'telegram' && (
          <TelegramTracker channels={[...customTelegramChannels, ...MOCK_TELEGRAM_CHANNELS]} />
        )}

        {activeTab === 'anssi' && (
          <AnssiAlertes alerts={[...customAnssiAlerts, ...MOCK_ANSSI_ALERTS]} />
        )}

        {activeTab === 'scraper-config' && (
          <ScraperConfig
            sources={scraperSources}
            setSources={setScraperSources}
            onAddExtractedVictims={handleAddExtractedVictims}
          />
        )}
      </main>

      {/* Modern Cyber Footer */}
      <footer className="border-t border-white/[0.06] bg-[#05070a] py-5 px-4 lg:px-8 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>CYBERVIGIE — Vigilance Cyber & Traçabilité v2.4</span>
          </div>
          <div>
            Données de <a href="https://ransomware.live" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">ransomware.live</a> & CERT-FR
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
