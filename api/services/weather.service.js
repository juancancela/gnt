const fetch = require('node-fetch')
const _ = require('lodash')

const { weatherServiceBaseUrl } = require('../../props');
const locationsUrl = query => `${weatherServiceBaseUrl}/location/search/?query=${query}`
const weatherConditionsUrl = id => `${weatherServiceBaseUrl}/location/${id}`

const Service = module.exports

Service.getWeatherCondition = async (query = '') => {
    try {
        const locations = await getLocations(query)
        if (_.isEmpty(locations))
            return []

        const { woeid, title } = locations[0]

        let { consolidated_weather } =
            await (await fetch(weatherConditionsUrl(woeid))).json()

        if (_.isEmpty(consolidated_weather))
            return []

        return {
            name: title,
            weather: consolidated_weather[0]
        }
    } catch (e) {
        throw new Error(`[service::weather::getWeatherCondition] Failed to obtain weather conditions for query: ${query}. Error: `, e)
    }
}

const getLocations = async (query = '') => {
    try {
        const locations = await fetch(locationsUrl(query))
        return await locations.json()
    } catch (e) {
        throw new Error(`[service::weather::getLocations] Failed to obtain locations using query: ${query}. Error: `, e)
    }
}

