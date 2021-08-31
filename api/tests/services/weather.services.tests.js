require("dotenv");
const assert = require("assert");
const fetchMock = require("fetch-mock");
const { weatherServiceBaseUrl } = require("../../../props");
const { getWeatherCondition } = require("../../services/weather.service");

const validLocationResponse = [
  {
    title: "San Francisco",
    location_type: "City",
    woeid: 2487956,
    latt_long: "37.777119, -122.41964",
  },
];

const validConditionsResponse = {
  id: 366945,
  weather_state_name: "Light Rain",
  weather_state_abbr: "lr",
  wind_direction_compass: "N",
  created: "2013-04-27T22:52:57.403100Z",
  applicable_date: "2013-04-27",
  min_temp: 3.07,
  max_temp: 10.01,
  the_temp: null,
  wind_speed: 9.85,
  wind_direction: 358.0,
  air_pressure: null,
  humidity: 74,
  visibility: 9.997862483098704,
  predictability: 75,
};

describe("weather.service", () => {
  it("should return a valid weather info response if provided a query that matches a valid city", async () => {
    fetchMock.get(
      `${weatherServiceBaseUrl}/location/search/?query=San`,
      validLocationResponse
    );
    fetchMock.get(
      `${weatherServiceBaseUrl}/location/2487956`,
      validConditionsResponse
    );
    const result = await getWeatherCondition("San");
    assert.strictEqual(result.weather.woeid, 2487956);
    assert.strictEqual(result.name, "San Francisco");
    fetchMock.reset();
  });

  it("should fail if the provided query does not match a valid city", async () => {
    fetchMock.get(
      `${weatherServiceBaseUrl}/location/search/?query=InvalidQuery`,
      []
    );
    try {
      await getWeatherCondition("InvalidQuery");
    } catch (e) {
      fetchMock.reset();
      assert.ok(true);
      return;
    }
    fetchMock.reset();
    assert.fail();
  });
});
