import React from 'react';
import { ShieldAlert, Radio, Globe, Send, AlertTriangle, Cpu } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab, scraperCount = 7 }) {
  const tabs = [
    {
      id: 'victims',
      label: 'Sociétés Impactées 🏢',
      icon: ShieldAlert,
      count: 200,
    },
    {
      id: 'apt-forums',
      label: 'Forums APT 📡',
      icon: Radio,
      count: 683,
    },
    {
      id: 'underground',
      label: 'Underground 🏴‍☠️',
      icon: Globe,
      count: 346,
    },
    {
      id: 'telegram',
      label: 'Telegram Botnets 🤖',
      icon: Send,
      count: 132,
    },
    {
      id: 'anssi',
      label: 'ANSSI Alertes 💥',
      icon: AlertTriangle,
      count: 5,
    },
    {
      id: 'scraper-config',
      label: 'Scrapers ⚙️',
      icon: Cpu,
      count: scraperCount,
    }
  ];

  return (
    <nav className="border-b-4 border-sky-100 bg-white/90 backdrop-blur-md sticky top-[69px] z-30 px-4 lg:px-8 py-2">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold font-sans transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30 scale-105 border-2 border-sky-300'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border-2 border-sky-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-600'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-extrabold ${
                  isActive
                    ? 'bg-sky-700 text-white'
                    : 'bg-sky-200 text-sky-900'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
