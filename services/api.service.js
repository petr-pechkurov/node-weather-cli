import axios from 'axios';
import { getKeyValue, keys } from './storage.service.js';

function getIcon({ weather }) {
  switch (weather[0].icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
}

async function getWeather(city) {
  const token = process.env.TOKEN ?? await getKeyValue(keys.token);
  if (!token) {
    throw new Error('No token is set. Use -t [API_KEY]');
  }

  const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,
      appid: token,
      lang: 'en',
      units: 'metric'
    }
  });

  return data;
}

export { getWeather, getIcon };