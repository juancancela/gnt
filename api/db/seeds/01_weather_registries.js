exports.seed = (knex) => {
  return knex("weather")
    .del()
    .then(() => {
      return knex("weather").insert([
        {
          woeid: 2487956,
          applicable_date: "2021-08-29",
          the_temp: 28.5,
          min_temp: 24.5,
          max_temp: 31,
          humidity: 78.5,
          weather_state_abbr: "lr",
        },
        {
          woeid: 2487956,
          applicable_date: "2021-08-30",
          the_temp: 29.5,
          min_temp: 20.5,
          max_temp: 34,
          humidity: 88.5,
          weather_state_abbr: "lr",
        },
        {
          woeid: 2487956,
          applicable_date: "2021-08-31",
          the_temp: 21.5,
          min_temp: 18.5,
          max_temp: 30,
          humidity: 28,
          weather_state_abbr: "lr",
        },
      ]);
    });
};
