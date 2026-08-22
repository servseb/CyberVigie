import React, { useState } from 'react';
import { ShieldCheck, BookOpen, FileText, Download, CheckCircle2, Lock, AlertTriangle, Cpu, Terminal, Eye, ExternalLink, Sparkles, Layers } from 'lucide-react';

export default function CyberBestPractices() {
  const [selectedReport, setSelectedReport] = useState(null);

  // 5 Fiches de Bonnes Pratiques ANSSI / NIST
  const bestPractices = [
    {
      id: 'bp-1',
      title: 'Authentification Forte (MFA) Obliagtoire',
      category: 'Gestion des Accès',
      priority: 'CRITIQUE',
      summary: 'Déploiement systématique de l authentification multi-facteurs (MFA) sur tous les accès distants (VPN, Webmail, RDP, Portails SaaS).',
      recommendations: [
        'Bannir les SMS au profit des applications d authentification (FIDO2 / TOTP).',
        'Imposer le MFA pour toute session administrateur sur l Active Directory.',
        'Bloquer les protocoles d authentification hérités (Legacy Auth).'
      ]
    },
    {
      id: 'bp-2',
      title: 'Stratégie de Sauvegarde 3-2-1 Immuable',
      category: 'Résilience & Récupération',
      priority: 'CRITIQUE',
      summary: 'Conservation de 3 copies des données sur 2 supports différents, dont 1 copie hors-ligne (Air-Gapped) et chiffrée.',
      recommendations: [
        'Isoler les serveurs de sauvegarde du domaine Active Directory principal.',
        'Tester trimestriellement la restauration complète à partir des bandes ou de l objet S3 immuable.',
        'Protéger les consoles de sauvegarde par un accès restreint sans accès Internet.'
      ]
    },
    {
      id: 'bp-3',
      title: 'Gestion des Vulnérabilités & Correctifs Sous 48h',
      category: 'Maintien en Condition de Sécurité',
      priority: 'ÉLEVÉ',
      summary: 'Mise en œuvre d un processus prioritaire d application des correctifs de sécurité pour les équipements exposés à Internet.',
      recommendations: [
        'Appliquer sous 48h les correctifs ANSSI pour les vulnérabilités de score CVSS >= 9.0.',
        'Inventorier automatiquement 100% des actifs matériels et logiciels du réseau.',
        'Désactiver les services non essentiels sur les passerelles DMZ.'
      ]
    },
    {
      id: 'bp-4',
      title: 'Architecture Zero Trust & Segmentation Réseau',
      category: 'Architecture & Cloisonnement',
      priority: 'ÉLEVÉ',
      summary: 'Cloisonnement strict du réseau en zones de confiance étanches pour empêcher la propagation latérale des ransomwares.',
      recommendations: [
        'Isoler les réseaux de production industrielle (OT) des réseaux administratifs (IT).',
        'Mettre en place la micro-segmentation basée sur les identités d équipement.',
        'Appliquer le principe du moindre privilège (PoLP) sur les partages de fichiers.'
      ]
    },
    {
      id: 'bp-5',
      title: 'Sensibilisation Anti-Phishing & Simulation',
      category: 'Facteur Humain',
      priority: 'MOYEN',
      summary: 'Formation continue des collaborateurs à la détection des e-mails d ingénierie sociale et des tentatives d usurpation d identité.',
      recommendations: [
        'Organiser des campagnes de simulation de phishing semestrielles.',
        'Mettre à disposition un bouton de signalement d e-mail suspect 1-clic.',
        'Sensibiliser les cadres dirigeants au risque de fraude au président (BEC).'
      ]
    }
  ];

  // 4 Rapports d'Analyses Avancées d'Attaques (Threat Intelligence Reports)
  const attackReports = [
    {
      id: 'rep-1',
      title: 'Rapport d Analyse 01 : Autopsie de l Attaque Qilin sur le Secteur Industriel & R&D',
      date: '20 août 2026',
      group: 'Qilin',
      severity: 'CRITIQUE',
      impact: 'Exfiltration de 2.1 TB de données d ingénierie R&D et chiffrement d usines.',
      attack_chain: [
        'Vecteur d entrée : Exploitation d une vulnérabilité N-Day sur la passerelle VPN d accès distant.',
        'Mouvement latéral : Élévation de privilèges Domain Admin via Kerberoasting (T1558).',
        'Exfiltration : Transfert furtif de 2.1 TB via l outil légitime rclone vers le stockage Mega.',
        'Impact : Déploiement du binaire ransomware Qilin (C++) chiffrant les hyperviseurs ESXi.'
      ],
      recommendations_post: [
        'Isoler immédiatement l infrastructure Active Directory et réinitialiser tous les mots de passe de compte krbtgt.',
        'Bloquer les adresses IP C2 répertoriées (185.220.101.7, 194.26.29.112).',
        'Migrer vers un modèle VPN Zero Trust (ZTNA) avec contrôle de posture du poste.'
      ]
    },
    {
      id: 'rep-2',
      title: 'Rapport d Analyse 02 : Mode Opératoire de LockBit 3.0 & Attaques sur le Secteur Santé',
      date: '19 août 2026',
      group: 'LockBit 3.0',
      severity: 'CRITIQUE',
      impact: 'Compromission de dossiers d imagerie médicale et perturbation du DPI hospitalier.',
      attack_chain: [
        'Vecteur d entrée : E-mail de Phishing ciblé contenant une pièce jointe malveillante LNK.',
        'Exécution : Exécution en mémoire de Cobalt Strike Beacon via DLL Side-Loading (T1574).',
        'Vol d identifiants : Extraction des mots de passe en mémoire avec Mimikatz.',
        'Chiffrement : Exécution du ransomware LockBit 3.0 avec suppression des clichés instantanés VSS.'
      ],
      recommendations_post: [
        'Restauration à partir des sauvegardes isolées physiquement (Air-Gap).',
        'Déploiement de règles EDR pour bloquer les comportements de suppression VSS (vssadmin delete shadows).',
        'Analyse médico-légale des journaux d événements Windows Event ID 4624.'
      ]
    },
    {
      id: 'rep-3',
      title: 'Rapport d Analyse 03 : Chaîne d Infection RedLine Stealer via les Canaux Telegram',
      date: '18 août 2026',
      group: 'Botnet RedLine',
      severity: 'ÉLEVÉ',
      impact: 'Vol d identifiants de session Webmail et tokens d authentification VPN.',
      attack_chain: [
        'Vecteur d entrée : Téléchargement de logiciels piratés piégés distribués sur Telegram.',
        'Extraction : Vol automatique des mots de passe stockés dans les navigateurs Chrome et Firefox.',
        'Exfiltration : Envoi des paquets de logs d identifiants vers des canaux Telegram fermés.'
      ],
      recommendations_post: [
        'Révocation immédiate de toutes les cookies de sessions et jetons OAuth2 actifs.',
        'Interdiction du stockage des mots de passe dans les navigateurs non sécurisés.',
        'Filtrage DNS des domaines Telegram d exfiltration d identifiants.'
      ]
    },
    {
      id: 'rep-4',
      title: 'Rapport d Analyse 04 : Plan de Continuité d Activité Post-Ransomware (Recommandations ANSSI)',
      date: '15 août 2026',
      group: 'CERT-FR / ANSSI',
      severity: 'RECOMMANDATION',
      impact: 'Guide méthodologique de gestion de crise et reprise d activité opérationnelle.',
      attack_chain: [
        'Phase 1 : Confinement d urgence et coupure des liaisons inter-sites.',
        'Phase 2 : Investigation numérique et identification du patient zéro.',
        'Phase 3 : Reconstruction propre d un domaine AD d assainissement (Clean Room).',
        'Phase 4 : Redémarrage progressif des applications métiers critiques.'
      ],
      recommendations_post: [
        'Maintenir une cellule de crise entraînée avec des exercices d alerte semestriels.',
        'Déclarer tout incident majeur auprès de la CNIL et de l ANSSI sous 72h.',
        'Conserver une copie papier mise à jour du Plan de Continuité d Activité (PCA).'
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="pixar-card p-6 bg-gradient-to-r from-sky-50 via-indigo-50 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-3xl bg-indigo-500 text-white border-2 border-indigo-300 flex items-center justify-center font-bold text-xl shadow-md">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 font-sans uppercase">
                BONNES PRATIQUES CYBER & RAPPORTS D'ANALYSES 🚀
              </h2>
              <span className="text-xs font-sans font-bold text-indigo-900 bg-indigo-100 border-2 border-indigo-300 px-3 py-1 rounded-full">
                THREAT INTEL & RECOMMANDATIONS ANSSI
              </span>
            </div>
            <p className="text-xs text-sky-800 font-sans font-bold mt-0.5">
              Guide pratique de protection organisationnelle et autopsies d'attaques majeures
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-sans font-bold text-slate-700 bg-white border-2 border-sky-200 px-3.5 py-2 rounded-2xl shadow-sm">
            📚 5 Fiches Pratiques • 📄 4 Rapports d'Analyses
          </span>
        </div>
      </div>

      {/* SECTION 1: BONNES PRATIQUES CYBER (ANSSI / NIST) */}
      <div className="pixar-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between border-b-2 border-sky-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 font-sans flex items-center gap-2 uppercase">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              GUIDE DES 5 BONNES PRATIQUES ESSENTIELLES (ANSSI & NIST)
            </h3>
            <p className="text-xs text-sky-700 font-sans font-bold mt-0.5">Mesures prioritaires pour prémunir les entreprises contre les ransomwares</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestPractices.map((bp) => (
            <div key={bp.id} className="p-5 rounded-3xl bg-sky-50/80 border-2 border-sky-100 hover:border-sky-300 transition-all space-y-3 flex flex-col justify-between shadow-sm">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-indigo-900 bg-white border border-indigo-200 px-2.5 py-0.5 rounded-full shadow-xs">
                    {bp.category}
                  </span>
                  <span className={`text-[10px] font-sans font-extrabold px-2.5 py-0.5 rounded-full border ${
                    bp.priority === 'CRITIQUE'
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {bp.priority}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 font-sans">{bp.title}</h4>
                <p className="text-xs text-slate-700 font-sans font-semibold leading-relaxed">{bp.summary}</p>
              </div>

              <div className="pt-2 border-t border-sky-200/60 space-y-1 text-xs font-sans">
                <span className="text-[10px] font-mono font-bold text-sky-800 uppercase block">Recommandations clés :</span>
                {bp.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: RAPPORTS D'ANALYSES AVANCÉES D'ATTAQUES */}
      <div className="pixar-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between border-b-2 border-sky-100 pb-3">
          <div>
            <h3 className="text-base font-black text-slate-900 font-sans flex items-center gap-2 uppercase">
              <FileText className="w-5 h-5 text-indigo-600" />
              RAPPORTS D'ANALYSES AVANCÉES DES ATTAQUES (THREAT INTEL)
            </h3>
            <p className="text-xs text-sky-700 font-sans font-bold mt-0.5">Autopsies techniques d'incidents réels, chaînes d'infection et remédiations</p>
          </div>
        </div>

        <div className="space-y-4">
          {attackReports.map((report) => (
            <div key={report.id} className="p-5 rounded-3xl bg-white border-2 border-sky-100 hover:border-indigo-300 transition-all space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-sky-50 pb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-sans font-extrabold text-white bg-indigo-600 px-3 py-1 rounded-full shadow-xs">
                    {report.group}
                  </span>
                  <span className={`text-xs font-sans font-extrabold px-3 py-1 rounded-full border ${
                    report.severity === 'CRITIQUE'
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {report.severity}
                  </span>
                </div>

                <span className="text-xs font-mono font-bold text-sky-800">
                  Date du rapport : {report.date}
                </span>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-slate-900 font-sans">{report.title}</h4>
                <p className="text-xs font-sans font-bold text-rose-700 mt-1">Impact constaté : {report.impact}</p>
              </div>

              {/* Attack Chain Steps */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-2">
                <span className="text-xs font-mono font-bold text-sky-900 uppercase block">Chaîne d Infection Détaillée (TTPs MITRE ATT&CK) :</span>
                <div className="space-y-1.5 text-xs font-sans">
                  {report.attack_chain.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-800 font-semibold bg-white p-2 rounded-xl border border-sky-100 shadow-xs">
                      <span className="w-5 h-5 rounded-full bg-sky-200 text-sky-900 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post Remediation */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-900 uppercase block">Recommandations de Remédiation Prioritaires :</span>
                <div className="space-y-1 text-xs font-sans">
                  {report.recommendations_post.map((rec, i) => (
                    <div key={i} className="flex items-center gap-2 text-emerald-900 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end pt-2">
                <button
                  onClick={() => setSelectedReport(report)}
                  className="pixar-btn-3d px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold font-sans text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4 text-white" />
                  <span>Consulter le Rapport Complet 🚀</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detailed Report Viewer */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/50 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white border-4 border-sky-300 rounded-[2.5rem] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-sky-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 font-sans">{selectedReport.title}</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans text-slate-800 font-semibold leading-relaxed">
              <p className="p-3 bg-sky-50 rounded-2xl border border-sky-200">
                <strong>Synthèse de l incident :</strong> Rapport d investigation approfondie rédigé par l équipe Threat Intelligence. Analyse complète des vecteurs d entrée, des mouvements latéraux et des indicateurs de compromission.
              </p>

              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm">Chronologie des évènements :</h4>
                {selectedReport.attack_chain.map((c, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t-2 border-sky-100 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  alert('Téléchargement du rapport complet PDF démarré !');
                  setSelectedReport(null);
                }}
                className="pixar-btn-3d px-5 py-2.5 bg-sky-500 text-white font-extrabold font-sans text-xs flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4 text-white" />
                <span>Télécharger PDF 📄</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
