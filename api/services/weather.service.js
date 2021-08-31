require("isomorphic-fetch");
const _ = require("lodash");

const { get, insert } = require("../repositories/weather.repository");
const { retrieve } = require("../utils/http.utils");
const { weatherServiceBaseUrl } = require("../../props");

const locationsUrl = (query) =>
  `${weatherServiceBaseUrl}/location/search/?query=${query}`;

const weatherConditionsUrl = (id) => `${weatherServiceBaseUrl}/location/${id}`;

const Service = module.exports;

Service.getWeatherCondition = async (query = "") => {
  try {
    const locations = await getLocations(query);
    if (_.isEmpty(locations)) {
      throw new Error(
        `[service::weather::getWeatherCondition] there is no locations matching the provided query`
      );
    }
    const { woeid, title } = locations[0];
    let weather = await get(woeid);

    if (!weather) {
      let { consolidated_weather } = await (
        await fetch(weatherConditionsUrl(woeid))
      ).json();

      if (!consolidated_weather) {
        throw new Error(
          `[service::weather::getWeatherCondition] there is no weather information for the given location`
        );
      }

      const { the_temp, min_temp, max_temp, humidity, weather_state_abbr } = consolidated_weather[0];
      weather = { woeid, the_temp, min_temp, max_temp, humidity, weather_state_abbr };
      
      await insert(weather);
    }

    return {
      name: title,
      weather,
    };
  } catch (e) {
    throw new Error(
      `[service::weather::getWeatherCondition] Failed to obtain weather conditions for query: ${query}. Error: `,
      e.message
    );
  }
};

const getLocations = async (query = "") => await retrieve(locationsUrl(query));
