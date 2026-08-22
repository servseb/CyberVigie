// Live API Client for ransomware.live

const API_BASE = 'https://api.ransomware.live/v2';

export async function fetchRecentVictims() {
  try {
    const response = await fetch(`${API_BASE}/recentvictims`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return transformVictimData(data);
  } catch (error) {
    console.warn('API ransomware.live non disponible, utilisation des données locales:', error);
    return null; // Signals fallback to local data
  }
}

export async function searchVictimsApi(query) {
  if (!query || query.trim() === '') return null;
  try {
    const response = await fetch(`${API_BASE}/search/${encodeURIComponent(query.trim())}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return transformVictimData(data);
  } catch (error) {
    console.warn('Erreur lors de la recherche API:', error);
    return null;
  }
}

// Normalize raw API payload to unified victim object format
function transformVictimData(rawItems) {
  if (!Array.isArray(rawItems)) return [];
  return rawItems.map((item, index) => {
    // Extract country name from country code
    const countryName = item.country ? getCountryName(item.country) : 'N/A';
    
    return {
      id: item.id || `v-${index}-${Date.now()}`,
      post_title: item.post_title || item.title || 'Victime non nommée',
      group_name: item.group_name || item.group || 'Inconnu',
      discovered: item.discovered || item.published || new Date().toISOString(),
      attack_date: item.discovered || item.published || new Date().toISOString(),
      country: countryName,
      country_code: item.country || 'N/A',
      website: item.website || item.domain || 'ransomware.live',
      screenshot: item.screenshot || item.screenshot_url || '',
      description: item.description || item.post_title || 'Aucune description fournie dans la revendication.',
      claim_url: item.claim_url || item.post_url || '#',
      sector: item.activity || item.sector || 'Not Found',
      status: 'RANSOMWARE'
    };
  });
}

function getCountryName(code) {
  if (!code || code === 'N/A') return 'N/A';
  const map = {
    'US': 'États-Unis',
    'FR': 'France',
    'DE': 'Allemagne',
    'GB': 'Royaume-Uni',
    'IT': 'Italie',
    'ES': 'Espagne',
    'CA': 'Canada',
    'BR': 'Brésil',
    'TH': 'Thaïlande',
    'AU': 'Australie',
    'IN': 'Inde',
    'ZA': 'Afrique du Sud',
    'TW': 'Taïwan',
    'MY': 'Malaisie',
    'MX': 'Mexique',
    'SE': 'Suède',
    'CH': 'Suisse',
    'ID': 'Indonésie',
    'JP': 'Japon',
    'HK': 'Hong Kong',
    'CZ': 'Tchéquie',
    'NL': 'Pays-Bas',
    'TR': 'Turquie',
    'RU': 'Russie',
    'KR': 'Corée du Sud',
    'SG': 'Singapour',
    'BE': 'Belgique',
    'AT': 'Autriche'
  };
  return map[code.toUpperCase()] || code;
}
