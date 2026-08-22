import React, { useState } from 'react';
import { X, Mail, Check, Copy, Send, Sparkles } from 'lucide-react';

export default function EmailReportModal({ isOpen, onClose, victimCount }) {
  const [recipient, setRecipient] = useState('soc-cert@organisation.fr');
  const [subject, setSubject] = useState(`[Rapport Threat Intel] CYBERVIGIE - Synthèse du ${new Date().toLocaleDateString('fr-FR')}`);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const emailBody = `RAPPORT SYNTHÈSE CYBER INTEL — CYBERVIGIE
--------------------------------------------------
Date d'exportation : ${new Date().toLocaleString('fr-FR')}
Source : CYBERVIGIE (Plateforme de Vigilance Cyber)

RÉSUMÉ EXÉCUTIF :
- Actes cyber enregistrés : ${victimCount}
- Top Groupes actifs : Qilin (19%), Direwolf (7%), Incransom (6%)
- Pays ciblés principaux : États-Unis, Italie, Allemagne, France

ALERTES ANSSI RARE :
- Recommandations critiques publiées sur le bulletin de sécurité ANSSI/CERT-FR.

Consulter le tableau de bord en direct pour la traçabilité des fuites.`;

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
      <div className="relative w-full max-w-xl bg-[#090d16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06] bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono">
                Générateur de Rapport Email
              </h3>
              <p className="text-xs text-slate-400">Transmettre une synthèse d'intelligence par courriel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors border border-white/[0.06]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSend} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Destinataire (Email SOC / CERT) :</label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Objet du message :</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-slate-950/80 border border-white/[0.08] text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Prévisualisation du Rapport :
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows="6"
              value={emailBody}
              className="w-full p-3 rounded-lg bg-slate-950/80 border border-white/[0.08] text-[11px] font-mono text-slate-300 resize-none focus:outline-none"
            ></textarea>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.05]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 border border-white/[0.06] transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ouvrir client Mail</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
