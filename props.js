module.exports = {
    port: process.env.PORT || 80,
    weatherServiceBaseUrl: process.env.WEATHER_SERVICE_BASE_URL || 'https://www.metaweather.com/api',
    environment: process.env.ENVIRONMENT || 'development',
    httpRetries: parseInt(process.env.HTTP_RETRIES) || 5,
    cacheTTL: parseInt(process.env.CACHE_TTL) || 180,
}