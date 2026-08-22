// Datasets Enrichis pour CYBERVIGIE — Vigilance Cyber & Traçabilité des Menaces

export const MOCK_VICTIMS = [
  {
    id: 'v1',
    post_title: 'Troutman Pepper Locke',
    group_name: 'SilentRansomGroup',
    discovered: '2026-08-20T16:52:00Z',
    attack_date: '2026-08-20T16:52:00Z',
    country: 'États-Unis',
    country_code: 'US',
    website: 'troutman.com',
    screenshot: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    description: 'Compromission majeure du cabinet d avocats international Troutman Pepper Locke. Exfiltration massive de contrats clients confidentiels, données financières internes et litiges en cours.',
    claim_url: 'https://ransomware.live/#/group/SilentRansomGroup',
    sector: 'Services Juridiques & Droit',
    status: 'CRITIQUE',
    data_volume: '1.4 TB',
    severity_score: 9.6,
    leaked_data_types: ['Contrats Clients', 'Audits Financiers', 'Correspondances Juridiques', 'PII Employés'],
    iocs: {
      ips: ['185.220.101.5', '194.165.16.42', '45.142.214.88'],
      onion: 'http://silentransom4v2xk9a0q.onion/leak/troutman',
      hashes: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'f4a2b9188e40129a008b417c8d9e2182']
    },
    mitre_ttps: ['T1566 (Phishing Spear)', 'T1059 (Command & Scripting Interpreter)', 'T1486 (Data Encrypted for Impact)'],
    full_executive_summary: "L'attaque par extorsion a été initiée via un compromis d'identifiants VPN non protégés par MFA. Le groupe SilentRansomGroup exige la somme de 5 millions de dollars en Monero sous peine de publication intégrale des 1.4 TB de données confidentielles extraites des serveurs de fichiers de New York et Chicago."
  },
  {
    id: 'v2',
    post_title: 'The University of Delhi (DU)',
    group_name: 'DYSPHOR1A',
    discovered: '2026-08-20T16:50:00Z',
    attack_date: '2026-08-20T16:50:00Z',
    country: 'Inde',
    country_code: 'IN',
    website: 'du.ac.in',
    screenshot: '',
    description: 'Violation de base de données universitaire exposant les dossiers administratifs, notes académiques et données d identification de plus de 450 000 étudiants et professeurs.',
    claim_url: 'https://ransomware.live/#/group/DYSPHOR1A',
    sector: 'Éducation & Recherche',
    status: 'ÉLEVÉ',
    data_volume: '480 GB',
    severity_score: 8.8,
    leaked_data_types: ['Dossiers Étudiants', 'Base MySQL Utilisateurs', 'Salaires Enseignants', 'Empreintes Bionumériques'],
    iocs: {
      ips: ['103.251.140.12', '185.220.100.240'],
      onion: 'http://dysphoria7xleak4q9.onion/du-leak',
      hashes: ['9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08']
    },
    mitre_ttps: ['T1190 (Exploit Public-Facing Application)', 'T1078 (Valid Accounts)', 'T1567 (Exfiltration Over Web Service)'],
    full_executive_summary: "Le groupe DYSPHOR1A s'est introduit dans le portail d'inscription académique en exploitant une faille SQL injection non corrigée (CVE-2026-3012). Le dump SQL de 480 GB est mis en vente aux enchères sur les canaux Telegram cybercriminels."
  },
  {
    id: 'v3',
    post_title: 'Gruppo Spaggiari Parma',
    group_name: 'xpl0itrs',
    discovered: '2026-08-20T15:31:00Z',
    attack_date: '2026-08-20T15:31:00Z',
    country: 'Italie',
    country_code: 'IT',
    website: 'spaggiari.eu',
    screenshot: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    description: 'Dernière sommation avant publication des 610 GB de données volées à l éditeur de logiciels éducatifs Spaggiari Parma.',
    claim_url: 'https://ransomware.live/#/group/xpl0itrs',
    sector: 'Logiciels & Éducation',
    status: 'CRITIQUE',
    data_volume: '610 GB',
    severity_score: 9.4,
    leaked_data_types: ['Code Source Applicatif', 'Identifiants Écoles', 'Certificats SSL/TLS', 'Bases de données SQL'],
    iocs: {
      ips: ['91.240.118.172', '193.142.146.210'],
      onion: 'http://xpl0itrsleakboard5v.onion/spaggiari',
      hashes: ['5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8']
    },
    mitre_ttps: ['T1486 (Data Encrypted for Impact)', 'T1021 (Remote Services)', 'T1003 (OS Credential Dumping)'],
    full_executive_summary: "Attaque par ransomware ciblant l'infrastructure de production cloud. Les attaquants prétendent détenir le code source complet de la plateforme ClasseViva utilisée par les écoles italiennes. Une rançon de 1.8M€ est exigée."
  },
  {
    id: 'v4',
    post_title: 'Ayuntamiento de Velilla de San Antonio',
    group_name: 'kairos',
    discovered: '2026-08-20T14:54:00Z',
    attack_date: '2026-08-20T14:54:00Z',
    country: 'Espagne',
    country_code: 'ES',
    website: 'velilladesanantonio.es',
    screenshot: '',
    description: 'Compromission des serveurs municipaux de la mairie espagnole de Velilla de San Antonio. Données fiscales et registres civils d état civil compromis.',
    claim_url: 'https://ransomware.live/#/group/kairos',
    sector: 'Secteur Public & Mairie',
    status: 'MOYEN',
    data_volume: '120 GB',
    severity_score: 7.8,
    leaked_data_types: ['Fichiers d État Civil', 'Registres d Imposition Local', 'Procès-Verbaux Municipaux'],
    iocs: {
      ips: ['45.154.255.71'],
      onion: 'http://kairosleaksite3q.onion/velilla',
      hashes: ['7d793037a0760186574b0282f2f435e7']
    },
    mitre_ttps: ['T1078 (Valid Accounts)', 'T1489 (Service Stop)', 'T1048 (Exfiltration Over Alternative Protocol)'],
    full_executive_summary: "Les attaquants ont compromis un compte administrateur local via une attaque Brute Force sur le port RDP exposé sur Internet. Les sauvegardes en ligne ont été chiffrées."
  },
  {
    id: 'v5',
    post_title: 'Logitech International S.A.',
    group_name: 'qilin',
    discovered: '2026-08-19T22:15:00Z',
    attack_date: '2026-08-19T22:15:00Z',
    country: 'Suisse',
    country_code: 'CH',
    website: 'logitech.com',
    screenshot: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    description: 'Publication de schémas R&D matériels et accords de distribution internationaux confidentiels de Logitech par le groupe Qilin.',
    claim_url: 'https://ransomware.live/#/group/qilin',
    sector: 'Technologie & Matériel',
    status: 'CRITIQUE',
    data_volume: '2.1 TB',
    severity_score: 9.8,
    leaked_data_types: ['Plans R&D Matériel', 'Schémas PCB Brevetés', 'Contrats Fournisseurs', 'Fichiers Firmware C++'],
    iocs: {
      ips: ['185.220.101.7', '194.26.29.112'],
      onion: 'http://qilin2rev4x9.onion/posts/logitech-sa',
      hashes: ['a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3']
    },
    mitre_ttps: ['T1190 (Exploit Public-Facing Application)', 'T1558 (Steal or Forge Kerberos Tickets)', 'T1486 (Data Encrypted for Impact)'],
    full_executive_summary: "Qilin a réussi une élévation de privilèges Domain Admin après avoir exploité la vulnérabilité Zero-Day sur la passerelle VPN d'ingénierie. 2.1 TB de données industrielles ont été publiées sur le réseau Tor."
  },
  {
    id: 'v6',
    post_title: 'Centre Hospitalier Régional de France',
    group_name: 'LockBit 3.0',
    discovered: '2026-08-19T18:40:00Z',
    attack_date: '2026-08-19T18:40:00Z',
    country: 'France',
    country_code: 'FR',
    website: 'chr-france.fr',
    screenshot: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
    description: 'Données médicales confidentielles, dossiers de soins et comptes d administrateurs exposés suite à une exfiltration LockBit 3.0.',
    claim_url: 'https://ransomware.live/#/group/LockBit%203.0',
    sector: 'Santé & Hôpital',
    status: 'CRITIQUE',
    data_volume: '850 GB',
    severity_score: 9.7,
    leaked_data_types: ['Dossiers Médicaux (DPI)', 'Imagerie Scanner/IRM', 'Données Sécurité Sociale', 'Fichiers RH Praticiens'],
    iocs: {
      ips: ['185.220.101.4', '45.142.214.10'],
      onion: 'http://lockbit3v4q9a0x.onion/post/chr-fr',
      hashes: ['2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae']
    },
    mitre_ttps: ['T1566 (Phishing)', 'T1486 (Data Encrypted for Impact)', 'T1071 (Application Layer Protocol)'],
    full_executive_summary: "L'attaque a perturbé les urgences et le système d'archivage d'imagerie médicale. L'ANSSI et le CERT-FR ont été dépêchés sur place pour appuyer le déchiffrement et l'assainissement du réseau Active Directory."
  }
];

export const MOCK_TOP_GROUPS = [
  { name: 'qilin', percentage: 19.0, count: 38, color: '#00f2fe' },
  { name: 'direwolf', percentage: 7.0, count: 14, color: '#38bdf8' },
  { name: 'incransom', percentage: 6.0, count: 12, color: '#818cf8' },
  { name: 'titan', percentage: 4.5, count: 9, color: '#c084fc' },
  { name: 'xpl0itrs', percentage: 4.0, count: 8, color: '#ff2a5f' }
];

export const MOCK_CONTINENTS = [
  { name: 'Europe', percentage: 35.0, count: 70, color: '#3b82f6' },
  { name: 'Amérique du Nord', percentage: 29.0, count: 58, color: '#ff2a5f' },
  { name: 'Asie', percentage: 14.0, count: 28, color: '#10b981' },
  { name: 'Autres', percentage: 12.5, count: 25, color: '#64748b' },
  { name: 'Amérique du Sud', percentage: 5.5, count: 11, color: '#f97316' },
  { name: 'Afrique', percentage: 2.0, count: 4, color: '#eab308' },
  { name: 'Océanie', percentage: 2.0, count: 4, color: '#a855f7' }
];

export const MOCK_TOP_COUNTRIES = [
  { country: 'États-Unis', code: 'US', count: 49 },
  { country: 'N/A', code: 'N/A', count: 24 },
  { country: 'Italie', code: 'IT', count: 18 },
  { country: 'Allemagne', code: 'DE', count: 17 },
  { country: 'Royaume-Uni', code: 'GB', count: 10 },
  { country: 'France', code: 'FR', count: 7 },
  { country: 'Thaïlande', code: 'TH', count: 5 },
  { country: 'Espagne', code: 'ES', count: 4 },
  { country: 'Canada', code: 'CA', count: 4 },
  { country: 'Brésil', code: 'BR', count: 4 }
];

export const MOCK_APT_FORUMS = [
  {
    id: 'apt-1',
    name: 'RansomChats Archive',
    url: 'https://github.com/Casualtek/Ransomchats',
    status: 'ONLINE',
    is_onion: false,
    description: 'Archive et journaux de chat de négociation de ransomware en temps réel.'
  },
  {
    id: 'apt-2',
    name: 'Ransomfeed Cyber Intelligence',
    url: 'https://ransom.insicurezzadigitale.com/index.php',
    status: 'ONLINE',
    is_onion: false,
    description: 'Feed automatisé des annonces et fuites de ransomware mondiales.'
  },
  {
    id: 'apt-3',
    name: 'RANSOM DB Global Threat Vault',
    url: 'https://www.ransom-db.com',
    status: 'ONLINE',
    is_onion: false,
    description: 'Base de données des victimes et groupes cybercriminels répertoriés.'
  },
  {
    id: 'apt-4',
    name: 'Ransomwatch Index Feed',
    url: 'https://ransomwatch.telemetry.ltd/#/INDEX',
    status: 'ONLINE',
    is_onion: false,
    description: 'Monitoring en direct des blogs et sites Tor de fuites d extorsion.'
  },
  {
    id: 'apt-5',
    name: 'Onion Leak Mirror Alpha',
    url: 'http://thexfvx7hqcrpgtm.onion',
    status: 'OFFLINE',
    is_onion: true,
    description: 'Miroir .onion de surveillance des groupes APT russes.'
  }
];

export const MOCK_UNDERGROUND_FORUMS = [
  {
    id: 'ug-1',
    name: '0x00sec Security Hub',
    url: 'https://0x00sec.org/',
    status: 'ONLINE',
    is_onion: false,
    description: 'Forum communautaire de reverse engineering et hacking éthique.'
  },
  {
    id: 'ug-2',
    name: '4CHEAT Underground Forum',
    url: 'https://4cheat.ru/',
    status: 'ONLINE',
    is_onion: false,
    description: 'Forum underground d exploits et de développement de malwares.'
  },
  {
    id: 'ug-3',
    name: 'ALTENEN Deep Market',
    url: 'https://altenens.is',
    status: 'ONLINE',
    is_onion: false,
    description: 'Forum historique de carding et d ingénierie sociale.'
  },
  {
    id: 'ug-4',
    name: 'ALPHV / BlackCat Affiliate Forum',
    url: 'https://alphv.pro',
    status: 'ONLINE',
    is_onion: false,
    description: 'Forum de recrutement d affiliés du groupe BlackCat/ALPHV.'
  }
];

export const MOCK_TELEGRAM_CHANNELS = [
  {
    id: 'tg-1',
    name: 'GODELESS CLOUD Botnet Logs',
    url: 'https://t.me/+8Dx0rHQdrzw1ZjUy',
    status: 'VALID',
    is_onion: false,
    description: 'Distribution automatisée de logs d identifiants volés par Botnet.'
  },
  {
    id: 'tg-2',
    name: 'HUBHEAD Logs RedLine',
    url: 'https://t.me/+fcxhFl9JSRE3YTdi',
    status: 'VALID',
    is_onion: false,
    description: 'Canal de fuites de logs RedLine / MetaStealer.'
  },
  {
    id: 'tg-3',
    name: 'Goblin Free Stealer Logs',
    url: 'https://t.me/+0ZheKtZ368YxMDBI',
    status: 'VALID',
    is_onion: false,
    description: 'Partage gratuit de logs de stealers pour analyse Threat Intel.'
  }
];

export const MOCK_ANSSI_ALERTS = [
  {
    id: 'anssi-1',
    date: '21 juillet 2026',
    title: 'Multiples vulnérabilités critiques dans Microsoft Sharepoint (CVE-2026-50522)',
    summary: 'Microsoft a publié des correctifs urgents pour deux vulnérabilités critiques affectant SharePoint (CVE-2026-50522 et CVE-2026-58644) permettant une exécution de code à distance sans authentification.',
    url: 'https://www.cert.ssi.gouv.fr/avis/CERTFR-2026-AVI-0612/',
    severity: 'CRITICAL',
    cve: ['CVE-2026-50522', 'CVE-2026-58644']
  },
  {
    id: 'anssi-2',
    date: '19 juillet 2026',
    title: 'Multiples vulnérabilités dans WordPress (CVE-2026-60137)',
    summary: 'WordPress a publié un avis de sécurité concernant une injection SQL et un contournement de sécurité permettant à un attaquant distant d exécuter des commandes arbitraires.',
    url: 'https://www.cert.ssi.gouv.fr/avis/CERTFR-2026-AVI-0608/',
    severity: 'HIGH',
    cve: ['CVE-2026-60137', 'CVE-2026-63030']
  }
];

export const MOCK_SCRAPER_SOURCES = [
  {
    id: 'src-1',
    name: 'CERT-FR / ANSSI (Avis & Alertes)',
    url: 'https://www.cert.ssi.gouv.fr/feed/',
    type: 'RSS / Atom',
    category: 'CERT / ANSSI',
    frequency: '15 min',
    status: 'ACTIVE',
    lastScraped: new Date().toISOString(),
    itemCount: 412,
    isCustom: false
  },
  {
    id: 'src-2',
    name: 'Ransomware.live API Feed',
    url: 'https://api.ransomware.live/v2/recentvictims',
    type: 'REST API',
    category: 'Ransomware',
    frequency: '5 min',
    status: 'ACTIVE',
    lastScraped: new Date().toISOString(),
    itemCount: 1845,
    isCustom: false
  },
  {
    id: 'src-3',
    name: 'BleepingComputer - Cyber Crime Feed',
    url: 'https://www.bleepingcomputer.com/feed/',
    type: 'RSS / Atom',
    category: 'Actualités Cyber',
    frequency: '1 heure',
    status: 'ACTIVE',
    lastScraped: new Date().toISOString(),
    itemCount: 928,
    isCustom: false
  }
];
