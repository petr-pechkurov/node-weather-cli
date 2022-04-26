import { homedir } from 'os';
import { join } from 'path';
import { readFile, stat, writeFile } from 'fs/promises';

const configFilePath = join(homedir(), 'weather-config.json');

const keys = {
  token: 'token',
  city: 'city'
};

async function saveKeyValue(key, value) {
  let data = {};

  if (await isExist(configFilePath)) {
    const file = await readFile(configFilePath);
    data = JSON.parse(file);
  }

  data[key] = value;
  await writeFile(configFilePath, JSON.stringify(data));
}

async function getKeyValue(key) {

  if (await isExist(configFilePath)) {
    const file = await readFile(configFilePath);
    const data = JSON.parse(file);
    return data[key];
  }
  return undefined;
}

async function isExist(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export { saveKeyValue, getKeyValue, keys };