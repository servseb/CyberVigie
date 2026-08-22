// Datasets pour CYBERVIGIE — Vigilance Cyber des Entreprises & Secteurs Impactés

export const MOCK_VICTIMS = [
  {
    id: 'v1',
    company_name: 'Troutman Pepper Locke',
    post_title: 'Troutman Pepper Locke',
    group_name: 'SilentRansomGroup',
    discovered: '2026-08-20T16:52:00Z',
    attack_date: '2026-08-20T16:52:00Z',
    country: 'États-Unis',
    country_code: 'US',
    website: 'troutman.com',
    screenshot: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    description: 'Compromission du cabinet d avocats international Troutman Pepper Locke. Exfiltration massive de contrats clients confidentiels, audits financiers et litiges.',
    claim_url: 'https://ransomware.live/#/group/SilentRansomGroup',
    sector: 'Services Juridiques & Droit',
    sector_icon: 'Scale',
    status: 'CRITIQUE',
    data_volume: '1.4 TB',
    severity_score: 9.6,
    leaked_data_types: ['Contrats Clients', 'Audits Financiers', 'Correspondances Juridiques', 'PII Employés'],
    iocs: {
      ips: ['185.220.101.5', '194.165.16.42'],
      onion: 'http://silentransom4v2xk9a0q.onion/leak/troutman',
      hashes: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855']
    },
    mitre_ttps: ['T1566 (Phishing Spear)', 'T1059 (Command Line)', 'T1486 (Data Encrypted)'],
    full_executive_summary: "Exfiltration majeure de 1.4 TB de contrats juridiques et audits confidentiels suite à une compromission d'identifiants VPN."
  },
  {
    id: 'v2',
    company_name: 'Renault Group (Filiale Espagne)',
    post_title: 'Renault Group (Usines Séville)',
    group_name: 'Qilin',
    discovered: '2026-08-20T16:10:00Z',
    attack_date: '2026-08-20T16:10:00Z',
    country: 'Espagne',
    country_code: 'ES',
    website: 'renaultgroup.com',
    screenshot: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80',
    description: 'Attaque ciblée sur les serveurs de la filiale industrielle de Renault à Séville. Plans d assemblage de boîtes de vitesses et schémas logistiques compromis.',
    claim_url: 'https://ransomware.live/#/group/Qilin',
    sector: 'Automobile & Transport',
    sector_icon: 'Car',
    status: 'CRITIQUE',
    data_volume: '1.8 TB',
    severity_score: 9.7,
    leaked_data_types: ['Schémas Logistiques', 'Plans d Assemblage', 'Données Fournisseurs Tier-1', 'Bases de données Usines'],
    iocs: {
      ips: ['91.240.118.15', '185.220.101.9'],
      onion: 'http://qilinleaksite77.onion/renault-spain',
      hashes: ['a4b2c8190012e847c10b23019842188c991823a8']
    },
    mitre_ttps: ['T1190 (Exploit Public Application)', 'T1021 (Remote Desktop Protocol)', 'T1486 (Chiffrement Système)'],
    full_executive_summary: "Attaque par ransomware ciblant l'infrastructure de production industrielle d'automobiles. Revendication de 1.8 TB de plans techniques."
  },
  {
    id: 'v3',
    company_name: 'Sanofi Pasteur France',
    post_title: 'Sanofi Pasteur (Centre R&D Lyon)',
    group_name: 'LockBit 3.0',
    discovered: '2026-08-20T15:45:00Z',
    attack_date: '2026-08-20T15:45:00Z',
    country: 'France',
    country_code: 'FR',
    website: 'sanofi.fr',
    screenshot: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
    description: 'Vol de données au sein du pôle de recherche vaccinale de Lyon. Dossiers d essais cliniques phase III et brevets pharmaceutiques ciblés.',
    claim_url: 'https://ransomware.live/#/group/LockBit%203.0',
    sector: 'Santé & Pharmacie',
    sector_icon: 'Activity',
    status: 'CRITIQUE',
    data_volume: '2.4 TB',
    severity_score: 9.9,
    leaked_data_types: ['Essais Cliniques Phase III', 'Formules Brevetées', 'Identités Patients', 'Accords de Licence'],
    iocs: {
      ips: ['45.142.214.12', '185.220.100.240'],
      onion: 'http://lockbit3v4q9a0x.onion/sanofi-lyon',
      hashes: ['8f96d081884c7d659a2feaa0c55ad015a3bf4f1b']
    },
    mitre_ttps: ['T1566 (Phishing)', 'T1558 (Kerberoasting)', 'T1486 (Ransomware Impact)'],
    full_executive_summary: "Infiltration dans le réseau d'ingénierie pharmaceutique. Publication de preuves d'exfiltration de formules médicales brevétées."
  },
  {
    id: 'v4',
    company_name: 'Air France-KLM IT Logistics',
    post_title: 'Air France-KLM (Systèmes Fret)',
    group_name: 'BlackCat / ALPHV',
    discovered: '2026-08-20T14:30:00Z',
    attack_date: '2026-08-20T14:30:00Z',
    country: 'France',
    country_code: 'FR',
    website: 'airfranceklm.com',
    screenshot: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80',
    description: 'Intrusion dans les sous-systèmes de gestion logistique du fret aérien et manifests d expédition cargo internationaux.',
    claim_url: 'https://ransomware.live/#/group/BlackCat',
    sector: 'Aéronautique & Transport',
    sector_icon: 'Plane',
    status: 'ÉLEVÉ',
    data_volume: '920 GB',
    severity_score: 8.9,
    leaked_data_types: ['Manifestes de Fret', 'Registres Douaniers', 'Contrats de Maintenance', 'Comptes Clients Cargo'],
    iocs: {
      ips: ['193.142.146.10', '91.240.118.99'],
      onion: 'http://alphvleakportal99.onion/airfrance-cargo',
      hashes: ['7c893037a0760186574b0282f2f435e7']
    },
    mitre_ttps: ['T1078 (Valid Accounts)', 'T1048 (Exfiltration Web)', 'T1489 (Service Stop)'],
    full_executive_summary: "Attaque ciblée sur les serveurs d'inventaire de fret à Roissy CDG sans impact sur les vols passagers."
  },
  {
    id: 'v5',
    company_name: 'Gruppo Spaggiari Parma',
    post_title: 'Gruppo Spaggiari Parma',
    group_name: 'xpl0itrs',
    discovered: '2026-08-20T15:31:00Z',
    attack_date: '2026-08-20T15:31:00Z',
    country: 'Italie',
    country_code: 'IT',
    website: 'spaggiari.eu',
    screenshot: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    description: 'Sommation d extorsion sur les 610 GB de données scolaires et de bases de données clientes de l éditeur Spaggiari Parma.',
    claim_url: 'https://ransomware.live/#/group/xpl0itrs',
    sector: 'Éducation & Recherche',
    sector_icon: 'BookOpen',
    status: 'CRITIQUE',
    data_volume: '610 GB',
    severity_score: 9.4,
    leaked_data_types: ['Code Source Applicatif', 'Identifiants Écoles', 'Certificats SSL', 'SQL Dumps'],
    iocs: {
      ips: ['91.240.118.172', '193.142.146.210'],
      onion: 'http://xpl0itrsleakboard5v.onion/spaggiari',
      hashes: ['5e884898da28047151d0e56f8dc6292773603d0d']
    },
    mitre_ttps: ['T1486 (Data Encrypted)', 'T1021 (Remote Services)', 'T1003 (Credential Dumping)'],
    full_executive_summary: "Ransomware ayant chiffré les serveurs de la plateforme éducative italienne ClasseViva."
  },
  {
    id: 'v6',
    company_name: 'Logitech International S.A.',
    post_title: 'Logitech International S.A.',
    group_name: 'qilin',
    discovered: '2026-08-19T22:15:00Z',
    attack_date: '2026-08-19T22:15:00Z',
    country: 'Suisse',
    country_code: 'CH',
    website: 'logitech.com',
    screenshot: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    description: 'Publication de schémas R&D matériels et d accords de distribution internationaux confidentiels par Qilin.',
    claim_url: 'https://ransomware.live/#/group/qilin',
    sector: 'Technologie & Électronique',
    sector_icon: 'Cpu',
    status: 'CRITIQUE',
    data_volume: '2.1 TB',
    severity_score: 9.8,
    leaked_data_types: ['Plans R&D Matériel', 'Schémas PCB Brevetés', 'Contrats Fournisseurs', 'Firmware C++'],
    iocs: {
      ips: ['185.220.101.7', '194.26.29.112'],
      onion: 'http://qilin2rev4x9.onion/posts/logitech-sa',
      hashes: ['a665a45920422f9d417e4867efdc4fb8a04a1f3f']
    },
    mitre_ttps: ['T1190 (Exploit Application)', 'T1558 (Kerberos Tickets)', 'T1486 (Data Encrypted)'],
    full_executive_summary: "Qilin s'est introduit via la passerelle VPN d'ingénierie et a exfiltré 2.1 TB de données industrielles."
  },
  {
    id: 'v7',
    company_name: 'BNP Paribas Personal Finance (Filiale)',
    post_title: 'BNP Paribas Personal Finance',
    group_name: 'Akira',
    discovered: '2026-08-19T17:10:00Z',
    attack_date: '2026-08-19T17:10:00Z',
    country: 'France',
    country_code: 'FR',
    website: 'bnpparibas.com',
    screenshot: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
    description: 'Attaque par extorsion ciblant les archives financières et historiques d octrois de crédits de consommation.',
    claim_url: 'https://ransomware.live/#/group/Akira',
    sector: 'Banque & Finance',
    sector_icon: 'Landmark',
    status: 'CRITIQUE',
    data_volume: '1.1 TB',
    severity_score: 9.5,
    leaked_data_types: ['Dossiers de Crédit', 'RIB & Relevés Bancaires', 'Contrats de Prêt', 'Scoring Risque'],
    iocs: {
      ips: ['45.142.214.99', '185.220.101.33'],
      onion: 'http://akiraleaksite99.onion/bnp-pf',
      hashes: ['3b893037a0760186574b0282f2f435e9']
    },
    mitre_ttps: ['T1566 (Phishing)', 'T1059 (Command Line)', 'T1486 (Chiffrement)'],
    full_executive_summary: "Extorsion visant les fichiers de scoring crédit. Aucune atteinte au réseau bancaire central."
  },
  {
    id: 'v8',
    company_name: 'Schneider Electric Energy',
    post_title: 'Schneider Electric (Division Smarter Grids)',
    group_name: 'Cactus',
    discovered: '2026-08-18T19:40:00Z',
    attack_date: '2026-08-18T19:40:00Z',
    country: 'France',
    country_code: 'FR',
    website: 'se.com',
    screenshot: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80',
    description: 'Compromission des schémas d architecture des réseaux électriques intelligents et composants SCADA.',
    claim_url: 'https://ransomware.live/#/group/Cactus',
    sector: 'Énergie & Industrie',
    sector_icon: 'Zap',
    status: 'CRITIQUE',
    data_volume: '1.6 TB',
    severity_score: 9.7,
    leaked_data_types: ['Schémas SCADA', 'Spécifications Transformateurs', 'Code Automates PLC', 'Fichiers Clients Utilitaires'],
    iocs: {
      ips: ['193.142.146.88', '185.220.101.44'],
      onion: 'http://cactusleaksite12.onion/schneider',
      hashes: ['9c893037a0760186574b0282f2f435f0']
    },
    mitre_ttps: ['T1190 (Exploit Zero-Day)', 'T1083 (File Discovery)', 'T1486 (Data Encrypted)'],
    full_executive_summary: "Compromission de la division Smarter Grids avec exfiltration de schémas d'automates industriels."
  }
];

export const MOCK_SECTORS = [
  { name: 'Tous les secteurs', count: 200, icon: 'Layers' },
  { name: 'Santé & Pharmacie', count: 32, icon: 'Activity' },
  { name: 'Banque & Finance', count: 28, icon: 'Landmark' },
  { name: 'Automobile & Transport', count: 25, icon: 'Car' },
  { name: 'Industrie & Énergie', count: 24, icon: 'Zap' },
  { name: 'Aéronautique & Défense', count: 19, icon: 'Plane' },
  { name: 'Technologie & Électronique', count: 22, icon: 'Cpu' },
  { name: 'Services Juridiques & Droit', count: 18, icon: 'Scale' },
  { name: 'Éducation & Recherche', count: 17, icon: 'BookOpen' },
  { name: 'Luxe & Distribution', count: 15, icon: 'ShoppingBag' }
];

export const MOCK_TOP_GROUPS = [
  { name: 'qilin', percentage: 19.0, count: 38, color: '#4f46e5' },
  { name: 'direwolf', percentage: 7.0, count: 14, color: '#0284c7' },
  { name: 'incransom', percentage: 6.0, count: 12, color: '#059669' },
  { name: 'titan', percentage: 4.5, count: 9, color: '#7c3aed' },
  { name: 'xpl0itrs', percentage: 4.0, count: 8, color: '#dc2626' }
];

export const MOCK_CONTINENTS = [
  { name: 'Europe', percentage: 35.0, count: 70, color: '#0284c7' },
  { name: 'Amérique du Nord', percentage: 29.0, count: 58, color: '#dc2626' },
  { name: 'Asie', percentage: 14.0, count: 28, color: '#059669' },
  { name: 'Autres', percentage: 12.5, count: 25, color: '#64748b' },
  { name: 'Amérique du Sud', percentage: 5.5, count: 11, color: '#d97706' }
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
  }
];
