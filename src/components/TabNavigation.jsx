import React from 'react';
import { ShieldAlert, Radio, Globe, Send, AlertTriangle, Cpu } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab, scraperCount = 7 }) {
  const tabs = [
    {
      id: 'victims',
      label: 'Sociétés Impactées',
      icon: ShieldAlert,
      count: 200,
    },
    {
      id: 'apt-forums',
      label: 'Forums APT',
      icon: Radio,
      count: 683,
    },
    {
      id: 'underground',
      label: 'Underground',
      icon: Globe,
      count: 346,
    },
    {
      id: 'telegram',
      label: 'Canaux Telegram',
      icon: Send,
      count: 132,
    },
    {
      id: 'anssi',
      label: 'Alertes ANSSI',
      icon: AlertTriangle,
      count: 5,
    },
    {
      id: 'scraper-config',
      label: 'Sources & Scrapers',
      icon: Cpu,
      count: scraperCount,
    }
  ];

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-[69px] z-30 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold font-sans transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  isActive
                    ? 'bg-indigo-700 text-indigo-100 font-bold'
                    : 'bg-slate-200 text-slate-700 font-semibold'
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
