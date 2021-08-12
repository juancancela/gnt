const express = require('express')
const weatherService = require('../services/weather.service')
const router = express.Router()

router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params
        const locations = await weatherService.getWeatherCondition(query)
        return await res.json(locations)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

module.exports = router