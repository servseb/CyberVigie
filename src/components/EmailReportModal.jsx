import React, { useState } from 'react';
import { X, Mail, Check, Copy, Send, ShieldAlert, Sparkles } from 'lucide-react';

export default function EmailReportModal({ isOpen, onClose, victimCount }) {
  const [recipient, setRecipient] = useState('soc-cert@organisation.fr');
  const [subject, setSubject] = useState(`[Rapport Threat Intel] CYBERVIGIE - Synthèse du ${new Date().toLocaleDateString('fr-FR')}`);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const emailBody = `RAPPORT SYNTHÈSE CYBER INTEL — CYBERVIGIE
--------------------------------------------------
Date d'exportation : ${new Date().toLocaleString('fr-FR')}
Source : CYBERVIGIE (Plateforme de Vigilance Cyber)

RÉSUMÉ ÉXÉCUTIF :
- Victimes totales enregistrées : ${victimCount}
- Top Groupe actif : Qilin (19%), Direwolf (7%), Incransom (6%)
- Pays les plus ciblés : États-Unis (49), Italie (18), Allemagne (17), France (7)

ALERTE CERT-FR RARE :
- Vulnérabilités critiques Microsoft Sharepoint (CVE-2026-50522) et WordPress.

Consulter le tableau de bord interactif en direct pour réclamer et analyser les preuves d'exfiltration.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0d1220] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                Générateur de Rapport Email
              </h3>
              <p className="text-xs text-slate-400">Transmettre une synthèse d'intelligence par courriel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSend} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Destinataire (Email SOC / CERT) :</label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">Objet du message :</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Prévisualisation du Rapport :
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier le texte'}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows="7"
              value={emailBody}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 resize-none focus:outline-none"
            ></textarea>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ouvrir dans votre client Mail</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
