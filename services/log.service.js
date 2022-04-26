import chalk from 'chalk';
import dedent from 'dedent-js';

const msgTitle = {
  success: ' SUCCESS ',
  error: ' ERROR ',
  help: ' HELP ',
  weather: ' WEATHER '
};

const helpMessage = dedent`\n
                          no params - get weather
                          -s [CITY] to set the city
                          -h print help
                          -t [API_KEY] set token`;

function logMsg(title, msg, bgColor) {
  console.log('\n' + bgColor(title) + ' ' + msg);
  console.log();
}

function logWeather(data, icon) {
  let description = data.weather[0].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  console.log();
  console.log(
    dedent`${chalk.bgYellow(msgTitle.weather)} 
    Weather in the city ${data.name}:
    ${icon}  ${description}
    Temperature: ${data.main.temp} °C
    Feels like: ${data.main.feels_like} °C
    Humidity: ${data.main.humidity}%
    Wind speed: ${data.wind.speed} m/s \n
    `
  );
}

function logError(error) {
  logMsg(msgTitle.error, error, chalk.bgRed);
}
function logSuccess(msg) {
  logMsg(msgTitle.success, msg, chalk.bgGreen);
}
function logHelp() {
  logMsg(msgTitle.help, helpMessage, chalk.bgCyan);
}

export { logError, logSuccess, logHelp, logWeather };