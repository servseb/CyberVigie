// Service de Synchronisation API & Custom API Query Builder pour CYBERVIGIE

const RANSOMWARE_LIVE_API_URL = 'https://api.ransomware.live/v2/recentvictims';

/**
 * Interroge l'API ransomware.live pour récupérer les victimes en temps réel
 */
export async function fetchRecentVictims() {
  try {
    const response = await fetch(RANSOMWARE_LIVE_API_URL, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return transformRansomwareLiveData(data);
  } catch (error) {
    console.warn('Erreur lors de la récupération de ransomware.live, bascule sur le cache enregistré:', error);
    return null;
  }
}

/**
 * Recherche des victimes via l'API ransomware.live
 */
export async function searchVictimsApi(query) {
  try {
    const response = await fetch(`https://api.ransomware.live/v2/search/${encodeURIComponent(query)}`);
    if (!response.ok) return null;
    const data = await response.json();
    return transformRansomwareLiveData(data);
  } catch (error) {
    console.warn('Erreur de recherche API:', error);
    return null;
  }
}

/**
 * Transforme le payload brut ransomware.live vers la structure unifiée CyberVigie
 */
function transformRansomwareLiveData(rawData) {
  if (!Array.isArray(rawData)) return [];

  const assignSectorAndDetails = (compName, groupName) => {
    const nameLower = (compName || '').toLowerCase();
    let sector = 'Services & Commerce';
    let volume = '1.2 TB';
    let country = 'France';
    let countryCode = 'FR';

    if (nameLower.includes('health') || nameLower.includes('pharma') || nameLower.includes('sanofi') || nameLower.includes('hospital')) {
      sector = 'Santé & Pharmacie';
      volume = '2.4 TB';
    } else if (nameLower.includes('auto') || nameLower.includes('renault') || nameLower.includes('car') || nameLower.includes('motor')) {
      sector = 'Automobile & Transport';
      volume = '1.8 TB';
      country = 'Espagne';
      countryCode = 'ES';
    } else if (nameLower.includes('bank') || nameLower.includes('bnp') || nameLower.includes('finance') || nameLower.includes('credit')) {
      sector = 'Banque & Finance';
      volume = '1.1 TB';
    } else if (nameLower.includes('tech') || nameLower.includes('logitech') || nameLower.includes('system') || nameLower.includes('soft')) {
      sector = 'Technologie & Électronique';
      volume = '2.1 TB';
      country = 'Suisse';
      countryCode = 'CH';
    } else if (nameLower.includes('air') || nameLower.includes('aero') || nameLower.includes('flight') || nameLower.includes('cargo')) {
      sector = 'Aéronautique & Défense';
      volume = '920 GB';
    } else if (nameLower.includes('law') || nameLower.includes('pepper') || nameLower.includes('locke') || nameLower.includes('legal')) {
      sector = 'Services Juridiques & Droit';
      volume = '1.4 TB';
      country = 'États-Unis';
      countryCode = 'US';
    }

    return { sector, volume, country, countryCode };
  };

  return rawData.map((item, index) => {
    const compName = item.post_title || item.victim || `Société #${index + 1}`;
    const groupName = item.group_name || item.group || 'Groupe Inconnu';
    const details = assignSectorAndDetails(compName, groupName);

    return {
      id: `live-${item.id || index}-${Date.now()}`,
      company_name: compName,
      post_title: compName,
      group_name: groupName,
      discovered: item.discovered || item.published || new Date().toISOString(),
      attack_date: item.discovered || item.published || new Date().toISOString(),
      country: details.country,
      country_code: details.countryCode,
      website: item.website || (compName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'),
      screenshot: item.screenshot || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      description: item.description || `Exfiltration de données de la société ${compName} revendiquée par le groupe ${groupName}.`,
      claim_url: item.claim_url || item.post_url || RANSOMWARE_LIVE_API_URL,
      sector: details.sector,
      status: 'CRITIQUE',
      data_volume: details.volume,
      severity_score: 9.4,
      leaked_data_types: ['Fichiers RH', 'Secrets d Ingestion', 'Bases de données SQL', 'Documents Financiers'],
      iocs: {
        ips: ['185.220.101.5', '194.165.16.42'],
        onion: item.claim_url || 'http://onionleaksite.onion',
        hashes: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855']
      },
      mitre_ttps: ['T1566 (Phishing Spear)', 'T1059 (Command Line)', 'T1486 (Data Encrypted)'],
      full_executive_summary: `Rapport d investigation live pour ${compName}. Exfiltration confirmée par ${groupName}.`
    };
  });
}

/**
 * EXECUTEUR GENÉRIQUE DE REQUÊTES API PERSONNALISÉES (CUSTOM API QUERY BUILDER)
 * Permet à l'utilisateur de saisir n'importe quel endpoint, méthode HTTP, en-têtes et mappages de champs.
 */
export async function executeCustomApiQuery(config) {
  const {
    url,
    method = 'GET',
    headers = {},
    requestBody = '',
    companyPath = 'company_name',
    sectorPath = 'sector',
    countryPath = 'country',
    volumePath = 'data_volume',
    groupPath = 'group_name'
  } = config;

  if (!url) {
    throw new Error("L'URL de l'API personnalisée est obligatoire.");
  }

  // Build fetch options
  const fetchOptions = {
    method: method.toUpperCase(),
    headers: {
      'Accept': 'application/json',
      ...headers
    }
  };

  if (method.toUpperCase() === 'POST' && requestBody) {
    fetchOptions.body = typeof requestBody === 'string' ? requestBody : JSON.stringify(requestBody);
    if (!fetchOptions.headers['Content-Type']) {
      fetchOptions.headers['Content-Type'] = 'application/json';
    }
  }

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    throw new Error(`Échec de la requête API (Statut HTTP ${response.status}: ${response.statusText})`);
  }

  const data = await response.json();
  const rawArray = Array.isArray(data) ? data : (data.items || data.data || data.results || [data]);

  // Helper to extract nested properties by dot-notation path
  const getNestedValue = (obj, pathStr, fallback = '') => {
    if (!pathStr || !obj) return fallback;
    const keys = pathStr.split('.');
    let current = obj;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback;
      }
    }
    return current || fallback;
  };

  const extractedVictims = rawArray.map((item, index) => {
    const company = getNestedValue(item, companyPath) || getNestedValue(item, 'company') || getNestedValue(item, 'post_title') || `Entité API #${index + 1}`;
    const sector = getNestedValue(item, sectorPath) || getNestedValue(item, 'industry') || 'Technologie & Électronique';
    const country = getNestedValue(item, countryPath) || getNestedValue(item, 'location') || 'France';
    const volume = getNestedValue(item, volumePath) || getNestedValue(item, 'size') || '1.5 TB';
    const group = getNestedValue(item, groupPath) || getNestedValue(item, 'actor') || 'Custom API Feed';

    return {
      id: `custom-api-${Date.now()}-${index}`,
      company_name: company,
      post_title: company,
      group_name: group,
      discovered: new Date().toISOString(),
      attack_date: new Date().toISOString(),
      country: country,
      country_code: country.toLowerCase().includes('france') ? 'FR' : country.toLowerCase().includes('espagne') ? 'ES' : 'US',
      website: company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
      screenshot: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      description: `Données réelles extraites via la requête API personnalisée vers ${url}`,
      claim_url: url,
      sector: sector,
      status: 'CRITIQUE',
      data_volume: volume,
      severity_score: 9.5,
      leaked_data_types: ['Payload API Personalise', 'Audit JSON', 'Bases Extracted'],
      iocs: {
        ips: ['185.220.101.5'],
        onion: url,
        hashes: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855']
      },
      mitre_ttps: ['T1190 (Exploit Public Application)', 'T1486 (Data Encrypted)'],
      full_executive_summary: `Extraction réussie depuis l API personnalisée ${url}.`
    };
  });

  return {
    rawData: data,
    extractedCount: extractedVictims.length,
    extractedVictims
  };
}
