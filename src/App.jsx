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
  const [victims, setVictims] = useState(MOCK_VICTIMS);
  const [isLive, setIsLive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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

  // Modals
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedVictim, setSelectedVictim] = useState(null);

  // Fetch Live Data on mount
  useEffect(() => {
    async function loadLiveVictims() {
      const liveData = await fetchRecentVictims();
      if (liveData && liveData.length > 0) {
        setVictims(liveData);
        setIsLive(true);
      }
    }
    loadLiveVictims();
  }, []);

  // API Search Trigger
  const handleApiSearch = async (query) => {
    if (!query || query.trim() === '') return;
    setIsSearching(true);
    const results = await searchVictimsApi(query);
    if (results && results.length > 0) {
      setVictims(results);
    }
    setIsSearching(false);
  };

  // Reset Search
  const handleResetSearch = () => {
    setSearchQuery('');
    setVictims(MOCK_VICTIMS);
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
          <AptForumTracker forums={MOCK_APT_FORUMS} />
        )}

        {activeTab === 'underground' && (
          <UndergroundForums forums={MOCK_UNDERGROUND_FORUMS} />
        )}

        {activeTab === 'telegram' && (
          <TelegramTracker channels={MOCK_TELEGRAM_CHANNELS} />
        )}

        {activeTab === 'anssi' && (
          <AnssiAlertes alerts={MOCK_ANSSI_ALERTS} />
        )}

        {activeTab === 'scraper-config' && (
          <ScraperConfig
            sources={scraperSources}
            setSources={setScraperSources}
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
