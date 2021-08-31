const repository = module.exports;

const moment = require("moment");
const knex = require("../db/knex");

repository.get = async (
  woeid,
  applicableDate = moment().format("YYYY-MM-DD")
) =>
  await knex
    .select()
    .from("weather")
    .where("applicable_date", applicableDate)
    .where("woeid", woeid)
    .first();

repository.insert = async (weather) =>
  await knex("weather").insert({
    ...weather,
    applicable_date: moment().format("YYYY-MM-DD"),
  });
