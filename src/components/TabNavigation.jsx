import React from 'react';
import { ShieldAlert, Radio, Globe, Send, AlertTriangle, Cpu } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab, scraperCount = 7 }) {
  const tabs = [
    {
      id: 'victims',
      label: 'Victimes',
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
    <nav className="border-b border-white/[0.06] bg-[#07090e]/70 backdrop-blur-md sticky top-[57px] z-30 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-slate-800/90 text-white border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'bg-slate-900 text-slate-500'
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
