/**
 * Live Weather Service using Open-Meteo (Free, No API Key needed)
 * Coordinates default to Dhaka, Bangladesh (or user location / division)
 */

const DIVISION_COORDS = {
  dhaka: { lat: 23.8103, lon: 90.4125, name: 'Dhaka', nameBn: 'ঢাকা' },
  rangpur: { lat: 25.7439, lon: 89.2752, name: 'Rangpur', nameBn: 'রংপুর' },
  chittagong: { lat: 22.3569, lon: 91.7832, name: 'Chattogram', nameBn: 'চট্টগ্রাম' },
  rajshahi: { lat: 24.3745, lon: 88.6042, name: 'Rajshahi', nameBn: 'রাজশাহী' },
  khulna: { lat: 22.8456, lon: 89.5403, name: 'Khulna', nameBn: 'খুলনা' },
  sylhet: { lat: 24.8949, lon: 91.8687, name: 'Sylhet', nameBn: 'সিলেট' },
  barisal: { lat: 22.7010, lon: 90.3535, name: 'Barishal', nameBn: 'বরিশাল' },
  mymensingh: { lat: 24.7471, lon: 90.4203, name: 'Mymensingh', nameBn: 'ময়মনসিংহ' },
};

// WMO weather code mapping
function mapWeatherCode(code) {
  if (code === 0) return { condition: 'Clear Sky', conditionBn: 'পরিষ্কার আকাশ', icon: '☀️' };
  if (code <= 3) return { condition: 'Partly Cloudy', conditionBn: 'আংশিক মেঘলা', icon: '⛅' };
  if (code <= 48) return { condition: 'Foggy', conditionBn: 'কুয়াশাচ্ছন্ন', icon: '🌫️' };
  if (code <= 55) return { condition: 'Light Drizzle', conditionBn: 'হালকা গুঁড়ি গুঁড়ি বৃষ্টি', icon: '🌦️' };
  if (code <= 65) return { condition: 'Rain', conditionBn: 'বৃষ্টি', icon: '🌧️' };
  if (code <= 82) return { condition: 'Heavy Rain Showers', conditionBn: 'ভারী বৃষ্টিপাত', icon: '⛈️' };
  if (code <= 99) return { condition: 'Thunderstorm', conditionBn: 'বজ্রপাতসহ ঝড়বৃষ্টি', icon: '⚡' };
  return { condition: 'Partly Cloudy', conditionBn: 'আংশিক মেঘলা', icon: '⛅' };
}

export async function fetchLiveWeather(locationName = 'Dhaka') {
  try {
    const locKey = locationName.toLowerCase().trim();
    const coords = DIVISION_COORDS[locKey] || DIVISION_COORDS.dhaka;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FDhaka`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();

    const current = data.current;
    const weatherInfo = mapWeatherCode(current.weather_code);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const forecast = (data.daily?.time || []).slice(1, 6).map((timeStr, idx) => {
      const date = new Date(timeStr);
      const code = data.daily.weather_code[idx + 1] || 1;
      const maxT = Math.round(data.daily.temperature_2m_max[idx + 1] || 30);
      return {
        day: days[date.getDay()],
        temp: maxT,
        icon: mapWeatherCode(code).icon,
      };
    });

    return {
      location: `${coords.name}, Bangladesh`,
      locationBn: `${coords.nameBn}, বাংলাদেশ`,
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.temperature_2m + 2),
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      condition: weatherInfo.condition,
      conditionBn: weatherInfo.conditionBn,
      icon: weatherInfo.icon,
      forecast: forecast.length > 0 ? forecast : [
        { day: 'Mon', temp: 30, icon: '☀️' },
        { day: 'Tue', temp: 31, icon: '⛅' },
        { day: 'Wed', temp: 29, icon: '🌧️' },
        { day: 'Thu', temp: 30, icon: '⛅' },
        { day: 'Fri', temp: 32, icon: '☀️' },
      ],
    };
  } catch (err) {
    console.warn('Weather fallback to default:', err.message);
    return null;
  }
}
