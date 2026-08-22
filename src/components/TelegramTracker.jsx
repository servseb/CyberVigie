import React, { useState } from 'react';
import { Send, Search, ExternalLink, ShieldCheck } from 'lucide-react';

export default function TelegramTracker({ channels }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter((ch) =>
    ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="cyber-card p-6 bg-white border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 font-sans">
              CANAUX TELEGRAM & BOTNET LOGS
            </h2>
            <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
              CANAUX ACTIFS (55)
            </span>
          </div>
          <p className="text-xs text-slate-500 font-sans mt-1">
            Écoute automatisée des réseaux de distribution de logs RedLine, Raccoon et MetaStealer
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un canal..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-sans text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChannels.map((channel) => (
          <div key={channel.id} className="cyber-card p-5 bg-white border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  channel.status === 'VALID' || channel.status === 'ONLINE'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  ● {channel.status}
                </span>

                <span className="text-[10px] font-mono text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Send className="w-3 h-3 text-sky-600" /> TELEGRAM
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 font-sans">{channel.name}</h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">{channel.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">{channel.url}</span>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-sans font-bold flex items-center gap-1 cursor-pointer transition-all"
              >
                <span>Rejoindre</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
