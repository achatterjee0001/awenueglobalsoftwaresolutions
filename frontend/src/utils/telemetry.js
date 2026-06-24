// Telemetry utilities for silent metadata collection

// Session state variables
const sessionStart = Date.now();
const categoryViews = {}; // Maps destination/category -> total duration (ms)
let activeCategory = null;
let categoryEntryTime = Date.now();
let cachedLocation = null;

// Parse browser user agent to identify OS and device type
function parseBrowserData() {
  const ua = navigator.userAgent;
  let os = 'Unknown OS';
  let device = 'Desktop';

  if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) { os = 'Android'; device = 'Mobile'; }
  else if (/iphone|ipad|ipod/i.test(ua)) { os = 'iOS'; device = 'Mobile/Tablet'; }
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown Browser';
  if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opr\//i.test(ua)) browser = 'Opera';
  else if (/edg/i.test(ua)) browser = 'Edge';

  const language = navigator.language || 'en';

  return `${device} | ${os} | ${browser} | Language: ${language}`;
}

// Fetch location via navigator.geolocation, with a fallback to an IP-based location API
export async function getApproximateLocation() {
  if (cachedLocation) return cachedLocation;

  // Try GPS geolocation first
  try {
    const coords = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            source: 'gps'
          });
        },
        (error) => {
          reject(error);
        },
        { timeout: 5000 }
      );
    });

    // Successfully got GPS coordinates. Reverse geocode or return coordinates
    cachedLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      city: 'GPS Coordinates',
      country: 'Local Device GPS',
      source: 'gps'
    };
    return cachedLocation;
  } catch (error) {
    console.log('GPS Geolocation unavailable, falling back to IP Geolocation...', error.message);
    
    // Fallback to IP-based geolocation API
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        cachedLocation = {
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city || 'Unknown City',
          country: data.country_name || 'Unknown Country',
          countryCode: data.country || '',
          source: 'ip'
        };
        return cachedLocation;
      }
    } catch (ipError) {
      console.error('IP Geolocation fallback failed:', ipError);
    }
  }

  // Final fallback
  cachedLocation = {
    latitude: 0,
    longitude: 0,
    city: 'Unknown Location',
    country: 'Unknown Country',
    source: 'none'
  };
  return cachedLocation;
}

// Track viewing duration on package details
export function switchActiveCategory(category) {
  const now = Date.now();
  if (activeCategory) {
    const elapsed = now - categoryEntryTime;
    categoryViews[activeCategory] = (categoryViews[activeCategory] || 0) + elapsed;
  }
  activeCategory = category;
  categoryEntryTime = now;
}

// Finalize and retrieve preferences based on viewing history
export function getInferredPreferences() {
  // Update the current active category timing
  switchActiveCategory(null);

  // Return list of categories that were viewed, sorted by duration descending
  return Object.entries(categoryViews)
    .filter(([_, duration]) => duration > 1000) // At least 1 second view
    .sort((a, b) => b[1] - a[1])
    .map(([cat, _]) => cat);
}

// Fetch the complete telemetry metadata payload
export async function getTelemetryPayload() {
  const location = await getApproximateLocation();
  const inferredPreferences = getInferredPreferences();
  const sessionDurationMs = Date.now() - sessionStart;

  return {
    location,
    browserData: parseBrowserData(),
    sessionDurationMs,
    inferredPreferences
  };
}
