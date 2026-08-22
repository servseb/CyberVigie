import React from 'react';
import { ShieldAlert, Radio, Globe, Send, AlertTriangle, Cpu } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab, scraperCount = 7 }) {
  const tabs = [
    {
      id: 'victims',
      label: 'Tracker des victimes',
      icon: ShieldAlert,
      count: 200,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    {
      id: 'apt-forums',
      label: 'Tracker de forum APT',
      icon: Radio,
      count: 683,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    },
    {
      id: 'underground',
      label: 'Forums underground',
      icon: Globe,
      count: 346,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'telegram',
      label: 'Canaux Telegram APT',
      icon: Send,
      count: 132,
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
    },
    {
      id: 'anssi',
      label: 'Alertes ANSSI',
      icon: AlertTriangle,
      count: 5,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'scraper-config',
      label: 'Configuration Sources',
      icon: Cpu,
      count: scraperCount,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    }
  ];

  return (
    <nav className="border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-sm sticky top-[69px] z-30 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium font-sans whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white border border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${tab.badgeColor}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
