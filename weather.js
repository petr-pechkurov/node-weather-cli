#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getIcon, getWeather } from './services/api.service.js';
import { logError, logHelp, logSuccess, logWeather } from './services/log.service.js';
import { getKeyValue, keys, saveKeyValue } from './services/storage.service.js';

function initCLI() {
  const args = getArgs(process.argv);
  if (args.h) {
    logHelp();
    return;
  }

  if (args.s) {
    saveCity(args.s);
    return;
  }

  if (args.t) {
    saveToken(args.t);
    return;
  }

  getForcast();
}

async function getForcast() {
  try {
    const city = await getKeyValue(keys.city);
    if (!city) throw new Error('No city is set. Please, use -s [CITY]');
    const data = await getWeather(city);
    logWeather(data, getIcon(data));
  } catch (e) {
    if (e?.response?.status === 404) {
      logError('Invalid city name');
    } else if (e?.response?.status === 401) {
      logError('Invalid api key');
    } else {
      logError(e.message);
    }
  }
}

async function saveToken(token) {
  if (!token.length) {
    logError('No token available. Please, set the token by using -t [API_TOKEN].');
    return;
  }

  try {
    await saveKeyValue(keys.token, token);
    logSuccess('Token saved!');
  } catch (err) {
    logError(err.message);
  }
}

async function saveCity(city) {
  if (!city.length) {
    logError('No city was saved');
  }

  try {
    await saveKeyValue(keys.city, city);
    logSuccess('City saved!');
  } catch (err) {
    logError(err.message);
  }
}

initCLI();