import React, { useState } from 'react';
import { Calendar, Download, Globe, TrendingUp, BarChart3, ShieldAlert, Sparkles, Filter, FileSpreadsheet, HardDrive, Building2, Eye, Star, Flame, X, ChevronRight, Layers } from 'lucide-react';

export default function MonthlyCountrySynthesis({ victims = [], onSelectVictim }) {
  const [selectedMonth, setSelectedMonth] = useState('2026-08'); // Default August 2026
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('ALL');
  
  // POPUP MODAL STATE
  const [popupData, setPopupData] = useState(null); // { monthKey, monthLabel, countryName, countryCode, flag, count, volume, group }

  // Months array from Jan 2026 to Aug 2026
  const months = [
    { key: '2026-01', label: 'Jan 2026', fullName: 'Janvier 2026' },
    { key: '2026-02', label: 'Fév 2026', fullName: 'Février 2026' },
    { key: '2026-03', label: 'Mar 2026', fullName: 'Mars 2026' },
    { key: '2026-04', label: 'Avr 2026', fullName: 'Avril 2026' },
    { key: '2026-05', label: 'Mai 2026', fullName: 'Mai 2026' },
    { key: '2026-06', label: 'Juin 2026', fullName: 'Juin 2026' },
    { key: '2026-07', label: 'Juil 2026', fullName: 'Juillet 2026' },
    { key: '2026-08', label: 'Août 2026', fullName: 'Août 2026' }
  ];

  // Comprehensive Country Matrix Dataset (Jan 2026 - Aug 2026)
  const synthesisData = [
    {
      country: 'France',
      flag: '🇫🇷',
      code: 'FR',
      monthlyStats: {
        '2026-01': { count: 3, volume: '450 GB', dominantGroup: 'LockBit 3.0' },
        '2026-02': { count: 5, volume: '820 GB', dominantGroup: 'Akira' },
        '2026-03': { count: 4, volume: '610 GB', dominantGroup: 'Qilin' },
        '2026-04': { count: 6, volume: '1.2 TB', dominantGroup: 'BlackCat' },
        '2026-05': { count: 8, volume: '1.9 TB', dominantGroup: 'LockBit 3.0' },
        '2026-06': { count: 7, volume: '1.4 TB', dominantGroup: 'Cactus' },
        '2026-07': { count: 9, volume: '2.1 TB', dominantGroup: 'Qilin' },
        '2026-08': { count: 7, volume: '1.8 TB', dominantGroup: 'LockBit 3.0' }
      },
      totalCount: 49,
      totalVolume: '11.3 TB'
    },
    {
      country: 'États-Unis',
      flag: '🇺🇸',
      code: 'US',
      monthlyStats: {
        '2026-01': { count: 18, volume: '4.2 TB', dominantGroup: 'ALPHV' },
        '2026-02': { count: 22, volume: '5.8 TB', dominantGroup: 'LockBit 3.0' },
        '2026-03': { count: 25, volume: '6.4 TB', dominantGroup: 'Qilin' },
        '2026-04': { count: 28, volume: '7.1 TB', dominantGroup: 'Akira' },
        '2026-05': { count: 31, volume: '8.5 TB', dominantGroup: 'SilentRansom' },
        '2026-06': { count: 29, volume: '7.8 TB', dominantGroup: 'Qilin' },
        '2026-07': { count: 34, volume: '9.2 TB', dominantGroup: 'LockBit 3.0' },
        '2026-08': { count: 27, volume: '6.9 TB', dominantGroup: 'BlackCat' }
      },
      totalCount: 214,
      totalVolume: '55.9 TB'
    },
    {
      country: 'Italie',
      flag: '🇮🇹',
      code: 'IT',
      monthlyStats: {
        '2026-01': { count: 4, volume: '750 GB', dominantGroup: 'xpl0itrs' },
        '2026-02': { count: 6, volume: '1.1 TB', dominantGroup: 'LockBit 3.0' },
        '2026-03': { count: 5, volume: '920 GB', dominantGroup: 'Akira' },
        '2026-04': { count: 7, volume: '1.3 TB', dominantGroup: 'Qilin' },
        '2026-05': { count: 6, volume: '1.0 TB', dominantGroup: 'xpl0itrs' },
        '2026-06': { count: 8, volume: '1.6 TB', dominantGroup: 'BlackCat' },
        '2026-07': { count: 9, volume: '1.9 TB', dominantGroup: 'LockBit 3.0' },
        '2026-08': { count: 8, volume: '1.7 TB', dominantGroup: 'xpl0itrs' }
      },
      totalCount: 53,
      totalVolume: '10.27 TB'
    },
    {
      country: 'Allemagne',
      flag: '🇩🇪',
      code: 'DE',
      monthlyStats: {
        '2026-01': { count: 5, volume: '980 GB', dominantGroup: 'LockBit 3.0' },
        '2026-02': { count: 7, volume: '1.4 TB', dominantGroup: 'Qilin' },
        '2026-03': { count: 6, volume: '1.1 TB', dominantGroup: 'BlackCat' },
        '2026-04': { count: 8, volume: '1.7 TB', dominantGroup: 'Akira' },
        '2026-05': { count: 9, volume: '2.1 TB', dominantGroup: 'LockBit 3.0' },
        '2026-06': { count: 8, volume: '1.8 TB', dominantGroup: 'Cactus' },
        '2026-07': { count: 10, volume: '2.4 TB', dominantGroup: 'Qilin' },
        '2026-08': { count: 8, volume: '1.9 TB', dominantGroup: 'LockBit 3.0' }
      },
      totalCount: 61,
      totalVolume: '13.38 TB'
    },
    {
      country: 'Royaume-Uni',
      flag: '🇬🇧',
      code: 'GB',
      monthlyStats: {
        '2026-01': { count: 3, volume: '620 GB', dominantGroup: 'Akira' },
        '2026-02': { count: 4, volume: '890 GB', dominantGroup: 'LockBit 3.0' },
        '2026-03': { count: 5, volume: '1.1 TB', dominantGroup: 'Qilin' },
        '2026-04': { count: 4, volume: '780 GB', dominantGroup: 'ALPHV' },
        '2026-05': { count: 6, volume: '1.3 TB', dominantGroup: 'BlackCat' },
        '2026-06': { count: 5, volume: '950 GB', dominantGroup: 'LockBit 3.0' },
        '2026-07': { count: 7, volume: '1.6 TB', dominantGroup: 'Qilin' },
        '2026-08': { count: 6, volume: '1.4 TB', dominantGroup: 'Akira' }
      },
      totalCount: 40,
      totalVolume: '8.64 TB'
    },
    {
      country: 'Espagne',
      flag: '🇪🇸',
      code: 'ES',
      monthlyStats: {
        '2026-01': { count: 2, volume: '340 GB', dominantGroup: 'Kairos' },
        '2026-02': { count: 3, volume: '510 GB', dominantGroup: 'LockBit 3.0' },
        '2026-03': { count: 4, volume: '720 GB', dominantGroup: 'Qilin' },
        '2026-04': { count: 3, volume: '490 GB', dominantGroup: 'Akira' },
        '2026-05': { count: 5, volume: '980 GB', dominantGroup: 'Kairos' },
        '2026-06': { count: 4, volume: '810 GB', dominantGroup: 'Qilin' },
        '2026-07': { count: 5, volume: '1.1 TB', dominantGroup: 'LockBit 3.0' },
        '2026-08': { count: 4, volume: '920 GB', dominantGroup: 'Qilin' }
      },
      totalCount: 30,
      totalVolume: '5.88 TB'
    },
    {
      country: 'Suisse',
      flag: '🇨🇭',
      code: 'CH',
      monthlyStats: {
        '2026-01': { count: 1, volume: '250 GB', dominantGroup: 'Qilin' },
        '2026-02': { count: 2, volume: '480 GB', dominantGroup: 'LockBit 3.0' },
        '2026-03': { count: 1, volume: '310 GB', dominantGroup: 'Akira' },
        '2026-04': { count: 2, volume: '520 GB', dominantGroup: 'Qilin' },
        '2026-05': { count: 3, volume: '890 GB', dominantGroup: 'ALPHV' },
        '2026-06': { count: 2, volume: '610 GB', dominantGroup: 'Qilin' },
        '2026-07': { count: 3, volume: '1.2 TB', dominantGroup: 'LockBit 3.0' },
        '2026-08': { count: 2, volume: '780 GB', dominantGroup: 'Qilin' }
      },
      totalCount: 16,
      totalVolume: '5.04 TB'
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      code: 'CA',
      monthlyStats: {
        '2026-01': { count: 2, volume: '410 GB', dominantGroup: 'LockBit 3.0' },
        '2026-02': { count: 3, volume: '620 GB', dominantGroup: 'BlackCat' },
        '2026-03': { count: 3, volume: '580 GB', dominantGroup: 'Qilin' },
        '2026-04': { count: 4, volume: '890 GB', dominantGroup: 'Akira' },
        '2026-05': { count: 4, volume: '950 GB', dominantGroup: 'LockBit 3.0' },
        '2026-06': { count: 3, volume: '710 GB', dominantGroup: 'ALPHV' },
        '2026-07': { count: 5, volume: '1.3 TB', dominantGroup: 'Qilin' },
        '2026-08': { count: 4, volume: '1.0 TB', dominantGroup: 'BlackCat' }
      },
      totalCount: 28,
      totalVolume: '6.46 TB'
    }
  ];

  // Helper for heatmap cell color intensity based on count
  const getCellColor = (count) => {
    if (!count || count === 0) return 'bg-sky-50 text-slate-400';
    if (count <= 3) return 'bg-emerald-100 text-emerald-900 border-2 border-emerald-200';
    if (count <= 6) return 'bg-amber-100 text-amber-900 border-2 border-amber-300';
    if (count <= 10) return 'bg-rose-100 text-rose-900 border-2 border-rose-300 font-extrabold';
    return 'bg-rose-500 text-white font-black shadow-md border-2 border-rose-600';
  };

  // Open Popup Modal for a specific Month & Country cell
  const handleOpenCellPopup = (row, monthObj) => {
    const stats = row.monthlyStats[monthObj.key];
    setPopupData({
      monthKey: monthObj.key,
      monthLabel: monthObj.fullName,
      countryName: row.country,
      countryCode: row.code,
      flag: row.flag,
      count: stats?.count || 0,
      volume: stats?.volume || '0 GB',
      dominantGroup: stats?.dominantGroup || 'N/A'
    });
  };

  // Open Popup Modal for a Month Card (all countries or current filtered country)
  const handleOpenMonthPopup = (monthObj) => {
    let countryName = 'Tous les Pays';
    let countryCode = 'ALL';
    let flag = '🌍';

    if (selectedCountryFilter !== 'ALL') {
      const match = synthesisData.find((r) => r.code === selectedCountryFilter);
      if (match) {
        countryName = match.country;
        countryCode = match.code;
        flag = match.flag;
      }
    }

    // Calculate attacks count for that month & country
    const count = monthlyTotals[monthObj.key] || 0;

    setPopupData({
      monthKey: monthObj.key,
      monthLabel: monthObj.fullName,
      countryName,
      countryCode,
      flag,
      count,
      volume: '14.8 TB',
      dominantGroup: 'Qilin & LockBit 3.0'
    });
  };

  // Export dataset to CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Pays,Code,' + months.map((m) => m.label).join(',') + ',Total Attaques,Total Volume\n';

    synthesisData.forEach((row) => {
      const monthCounts = months.map((m) => row.monthlyStats[m.key]?.count || 0).join(',');
      csvContent += `"${row.country}","${row.code}",${monthCounts},${row.totalCount},"${row.totalVolume}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cybervigie_synthese_mensuelle_2026.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Filtered rows
  const filteredData = synthesisData.filter((row) =>
    selectedCountryFilter === 'ALL' || row.code === selectedCountryFilter
  );

  // Compute column totals per month
  const monthlyTotals = {};
  months.forEach((m) => {
    monthlyTotals[m.key] = synthesisData.reduce((acc, row) => acc + (row.monthlyStats[m.key]?.count || 0), 0);
  });
  const grandTotal = synthesisData.reduce((acc, row) => acc + row.totalCount, 0);

  // Get victims list filtered for popup modal
  const popupVictimsList = popupData
    ? victims.filter((v) => {
        const dateStr = v.attack_date || v.discovered || '';
        const matchesMonth = dateStr.startsWith(popupData.monthKey);

        let matchesCountry = true;
        if (popupData.countryCode !== 'ALL') {
          matchesCountry =
            v.country_code?.toUpperCase() === popupData.countryCode ||
            v.country?.toUpperCase() === popupData.countryCode;
        }

        return matchesMonth && matchesCountry;
      })
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Banner */}
      <div className="pixar-card p-6 bg-gradient-to-r from-sky-50 via-indigo-50 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-3xl bg-sky-500 text-white border-2 border-sky-300 flex items-center justify-center font-bold text-xl shadow-md">
            📊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 font-sans uppercase">
                SYNTHÈSE MENSUELLE & PAR PAYS (JANVIER 2026 - AOÛT 2026) 🚀
              </h2>
              <span className="text-xs font-sans font-bold text-sky-900 bg-sky-100 border-2 border-sky-300 px-3 py-1 rounded-full">
                POPUP DE DÉTAILS PAR MOIS & PAYS
              </span>
            </div>
            <p className="text-xs text-sky-800 font-sans font-bold mt-0.5">
              Cliquez sur n'importe quel mois ou cellule pour ouvrir la POPUP interactive du résumé des attaques
            </p>
          </div>
        </div>

        <button
          onClick={handleExportCSV}
          className="pixar-btn-3d px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold font-sans text-xs flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
        >
          <FileSpreadsheet className="w-4 h-4 text-white" />
          <span>Exporter CSV / Excel 📄</span>
        </button>
      </div>

      {/* Monthly Trend Cards (Clickable to open POPUP) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-sans font-black text-slate-900 uppercase flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-500" /> CLIQUER SUR UN MOIS POUR OUVRIR LA POPUP DU RÉSUMÉ :
          </span>
          <span className="text-xs font-sans font-bold text-sky-700">
            Astuce : Cliquez sur une cellule du tableau pour cibler un pays précis !
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {months.map((m) => {
            const count = monthlyTotals[m.key];
            const isCurrentMonth = m.key === '2026-08';
            return (
              <div
                key={m.key}
                onClick={() => handleOpenMonthPopup(m)}
                className={`p-3.5 rounded-3xl border-2 transition-all cursor-pointer text-center relative hover:scale-105 ${
                  isCurrentMonth
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-md ring-2 ring-amber-300'
                    : 'bg-white text-slate-800 border-sky-100 hover:border-sky-300'
                }`}
              >
                <span className="text-[10px] font-mono font-extrabold uppercase block">{m.label}</span>
                <span className="text-lg font-black font-sans block mt-1">{count}</span>
                <span className="text-[9px] font-sans font-bold text-sky-600 block">Ouvrir Popup 🚀</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Heatmap Matrix Table */}
      <div className="pixar-card p-6 bg-white space-y-4">
        
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-sky-100 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-sans font-black text-slate-900 uppercase">FILTRER PAR PAYS :</span>
            <select
              value={selectedCountryFilter}
              onChange={(e) => setSelectedCountryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-sky-50 border-2 border-sky-200 text-xs font-sans font-bold text-slate-900 focus:outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value="ALL">Tous les Pays (8)</option>
              <option value="FR">🇫🇷 France</option>
              <option value="US">🇺🇸 États-Unis</option>
              <option value="IT">🇮🇹 Italie</option>
              <option value="DE">🇩🇪 Allemagne</option>
              <option value="GB">🇬🇧 Royaume-Uni</option>
              <option value="ES">🇪🇸 Espagne</option>
              <option value="CH">🇨🇭 Suisse</option>
              <option value="CA">🇨🇦 Canada</option>
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs font-sans font-bold">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-3 h-3 rounded-full bg-emerald-200 border border-emerald-400"></span> 1-3 (Faible)
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <span className="w-3 h-3 rounded-full bg-amber-200 border border-amber-400"></span> 4-6 (Modéré)
            </span>
            <span className="flex items-center gap-1 text-rose-700">
              <span className="w-3 h-3 rounded-full bg-rose-200 border border-rose-400"></span> 7+ (Élevé)
            </span>
          </div>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-sky-200 bg-sky-50/80 text-xs font-sans font-black text-sky-900 uppercase">
                <th className="py-3.5 px-4 rounded-l-2xl">Territoire Cible</th>
                {months.map((m) => (
                  <th
                    key={m.key}
                    onClick={() => handleOpenMonthPopup(m)}
                    className="py-3.5 px-3 text-center cursor-pointer hover:bg-sky-200 transition-colors"
                  >
                    {m.label}
                  </th>
                ))}
                <th className="py-3.5 px-4 text-center">Total Attaques</th>
                <th className="py-3.5 px-4 text-right rounded-r-2xl">Volume Volé</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-sky-100 text-xs font-sans">
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-sky-50/60 transition-colors">
                  {/* Country Name */}
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span className="text-lg">{row.flag}</span>
                    <span className="text-sm">{row.country}</span>
                  </td>

                  {/* Monthly Cells (Clicking Opens Popup for that Month & Country!) */}
                  {months.map((m) => {
                    const cell = row.monthlyStats[m.key];
                    const count = cell?.count || 0;
                    return (
                      <td key={m.key} className="py-3 px-2 text-center">
                        <div
                          onClick={() => handleOpenCellPopup(row, m)}
                          title={`Cliquer pour ouvrir la Popup : ${row.country} - ${m.fullName}`}
                          className={`inline-flex flex-col items-center justify-center w-11 h-11 rounded-2xl cursor-pointer transition-all hover:scale-115 shadow-xs ${getCellColor(count)}`}
                        >
                          <span className="font-extrabold text-xs">{count}</span>
                          <span className="text-[8px] opacity-75 font-mono leading-none">{cell?.volume || ''}</span>
                        </div>
                      </td>
                    );
                  })}

                  {/* Total Count */}
                  <td className="py-3.5 px-4 text-center font-black text-slate-900 text-sm">
                    {row.totalCount}
                  </td>

                  {/* Total Volume */}
                  <td className="py-3.5 px-4 text-right font-black text-rose-600 text-sm font-mono">
                    {row.totalVolume}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Total Footer Row */}
            <tfoot>
              <tr className="border-t-4 border-sky-200 bg-sky-100/90 font-black text-slate-900 text-xs uppercase">
                <td className="py-4 px-4 rounded-l-2xl">TOTAL CUMULÉ (MONDE)</td>
                {months.map((m) => (
                  <td
                    key={m.key}
                    onClick={() => handleOpenMonthPopup(m)}
                    className="py-4 px-2 text-center text-sky-900 font-extrabold text-sm cursor-pointer hover:bg-sky-200"
                  >
                    {monthlyTotals[m.key]}
                  </td>
                ))}
                <td className="py-4 px-4 text-center text-indigo-700 text-base">{grandTotal}</td>
                <td className="py-4 px-4 text-right text-rose-700 text-base font-mono rounded-r-2xl">120.9 TB</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* POPUP MODAL: RÉSUMÉ DES ATTAQUES DU MOIS ET PAYS SÉLECTIONNÉ */}
      {/* ========================================================================= */}
      {popupData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-white border-4 border-sky-300 rounded-[2.5rem] p-6 shadow-2xl space-y-5 max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b-4 border-sky-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-3xl bg-rose-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
                  {popupData.flag}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-sans font-bold text-sky-900 bg-sky-100 border border-sky-300 px-3 py-1 rounded-full">
                      POPUP SYNTHÈSE ATTAQUES
                    </span>
                    <span className="text-xs font-sans font-extrabold text-rose-700 bg-rose-100 border border-rose-300 px-3 py-1 rounded-full">
                      {popupData.count} Attaque(s) Recensée(s)
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-sans uppercase mt-1">
                    RÉSUMÉ DU MOIS : <span className="text-rose-600">{popupData.monthLabel}</span> ({popupData.countryName})
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setPopupData(null)}
                className="w-10 h-10 rounded-2xl bg-sky-100 text-slate-700 font-bold flex items-center justify-center hover:bg-sky-200 cursor-pointer transition-transform hover:scale-110 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Summary KPI Badges */}
            <div className="grid grid-cols-3 gap-3 text-xs font-sans">
              <div className="p-3.5 bg-sky-50 rounded-2xl border-2 border-sky-100 shadow-sm text-center">
                <span className="text-[10px] text-sky-700 font-bold uppercase block">📍 Territoire</span>
                <span className="text-sm font-extrabold text-slate-900 mt-0.5 block">{popupData.flag} {popupData.countryName}</span>
              </div>
              <div className="p-3.5 bg-sky-50 rounded-2xl border-2 border-sky-100 shadow-sm text-center">
                <span className="text-[10px] text-sky-700 font-bold uppercase block">🎈 Vol. Total Volé</span>
                <span className="text-sm font-black text-rose-600 mt-0.5 block">{popupData.volume}</span>
              </div>
              <div className="p-3.5 bg-sky-50 rounded-2xl border-2 border-sky-100 shadow-sm text-center">
                <span className="text-[10px] text-sky-700 font-bold uppercase block">🏴‍☠️ Groupe Principal</span>
                <span className="text-sm font-extrabold text-indigo-700 mt-0.5 block">{popupData.dominantGroup}</span>
              </div>
            </div>

            {/* Modal Scrollable Attack Cards */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <span className="text-xs font-mono font-bold text-sky-900 uppercase block">
                Dossiers d exfiltration & entreprises touchées en {popupData.monthLabel} :
              </span>

              {popupVictimsList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popupVictimsList.map((victim) => {
                    const companyName = victim.company_name || victim.post_title || 'Société Impactée';
                    const sectorName = victim.sector || 'Secteur Non Spécifié';
                    const score = victim.severity_score || 9.2;
                    const volume = victim.data_volume || '1.2 TB';

                    return (
                      <div key={victim.id} className="p-4 rounded-3xl bg-sky-50/70 border-2 border-sky-200 hover:border-sky-400 transition-all space-y-3 shadow-sm flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-sans font-bold text-sky-900 bg-white border border-sky-200 px-2.5 py-0.5 rounded-full truncate max-w-[150px]">
                              🏢 {sectorName}
                            </span>
                            <span className="text-xs font-sans font-extrabold text-rose-700 bg-rose-100 border border-rose-300 px-2 py-0.5 rounded-full">
                              ⭐ {score} / 10
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-black text-slate-900 font-sans line-clamp-1">{companyName}</h4>
                            <p className="text-xs font-mono text-slate-500 truncate">{victim.website}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs font-sans bg-white p-2.5 rounded-2xl border border-sky-100 shadow-xs">
                            <div>
                              <span className="text-[9px] font-mono text-sky-700 font-bold uppercase block">🏴‍☠️ Groupe</span>
                              <span className="font-extrabold text-indigo-900 truncate block mt-0.5">{victim.group_name}</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-mono text-sky-700 font-bold uppercase block">🌍 Pays</span>
                              <span className="font-extrabold text-slate-900 truncate block mt-0.5">{victim.country}</span>
                            </div>
                            <div className="mt-1">
                              <span className="text-[9px] font-mono text-sky-700 font-bold uppercase block">🎈 Volume</span>
                              <span className="font-extrabold text-rose-600 block mt-0.5">{volume}</span>
                            </div>
                            <div className="mt-1">
                              <span className="text-[9px] font-mono text-sky-700 font-bold uppercase block">📅 Date</span>
                              <span className="font-extrabold text-slate-900 block mt-0.5">
                                {new Date(victim.attack_date || victim.discovered).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-sky-200 flex items-center justify-end">
                          <button
                            onClick={() => {
                              if (onSelectVictim) onSelectVictim(victim);
                              setPopupData(null);
                            }}
                            className="pixar-btn-3d w-full py-2 bg-sky-500 hover:bg-sky-600 text-white font-extrabold font-sans text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <Eye className="w-4 h-4 text-white" />
                            <span>Inspecter le Dossier 🚀</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center bg-sky-50 rounded-3xl border-2 border-sky-200">
                  <Building2 className="w-10 h-10 text-sky-400 mx-auto mb-1 animate-bounce" />
                  <h4 className="text-sm font-extrabold text-slate-800 font-sans">Aucune attaque détaillée sous cette cellule</h4>
                  <p className="text-xs text-sky-700 font-bold mt-0.5">Les attaques générales sont comptabilisées dans le tableau principal.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t-2 border-sky-100 flex items-center justify-end">
              <button
                onClick={() => setPopupData(null)}
                className="pixar-btn-3d px-6 py-2.5 bg-slate-900 text-white font-extrabold font-sans text-xs cursor-pointer shadow-md"
              >
                Fermer la Popup ✖️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
