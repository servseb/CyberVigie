import React, { useState } from 'react';
import { Send, Search, ExternalLink } from 'lucide-react';

export default function TelegramTracker({ channels }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter((ch) =>
    ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="pixar-card p-6 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-900 font-sans uppercase">
              CANAUX TELEGRAM & BOTNET LOGS 🤖
            </h2>
            <span className="text-xs font-sans font-bold text-sky-800 bg-sky-100 border-2 border-sky-200 px-3 py-1 rounded-full">
              CANAUX ACTIFS (55)
            </span>
          </div>
          <p className="text-xs text-sky-700 font-sans font-bold mt-1">
            Écoute automatisée des réseaux de distribution de logs RedLine, Raccoon et MetaStealer
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-sky-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un canal..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-sky-50 border-2 border-sky-200 text-xs font-sans text-slate-900 font-bold placeholder-sky-400 focus:outline-none focus:border-sky-500 transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredChannels.map((channel) => (
          <div key={channel.id} className="pixar-card p-6 bg-white flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-sans font-bold px-3 py-1 rounded-full border-2 ${
                  channel.status === 'VALID' || channel.status === 'ONLINE'
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300'
                }`}>
                  ● {channel.status}
                </span>

                <span className="text-xs font-sans text-sky-900 bg-sky-100 border-2 border-sky-200 px-3 py-1 rounded-full font-extrabold flex items-center gap-1">
                  <Send className="w-3.5 h-3.5 text-sky-600" /> TELEGRAM
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900 font-sans">{channel.name}</h3>
              <p className="text-xs text-slate-600 font-sans font-semibold leading-relaxed">{channel.description}</p>
            </div>

            <div className="pt-3 border-t-2 border-sky-100 flex items-center justify-between">
              <span className="text-xs font-mono text-sky-700 font-bold truncate max-w-[170px]">{channel.url}</span>
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pixar-btn-3d px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-sans text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Rejoindre 🚀</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
