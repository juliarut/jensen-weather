export function getWeatherDescription(code: number): string {
  const weatherMap: { [key: number]: string } = {
    0: 'Klart ☀️',
    1: 'Mestadels klart 🌤️',
    2: 'Dels molnigt ⛅',
    3: 'Mulet ☁️',
    45: 'Dimma 🌫️',
    48: 'Isdimma 🌫️❄️',
    51: 'Lätt duggregn 🌦️',
    53: 'Måttligt duggregn 🌧️',
    55: 'Tungt duggregn 🌧️',
    61: 'Lätt regn 🌧️',
    63: 'Måttligt regn 🌧️',
    65: 'Tungt regn 🌧️',
    71: 'Lätt snöfall 🌨️',
    73: 'Måttligt snöfall 🌨️',
    75: 'Tungt snöfall ❄️',
    95: 'Åska ⛈️',
    99: 'Åska med hagel ⛈️❄️'
  };

  return weatherMap[code] || 'Okänt väder 🤷‍♀️';
}
