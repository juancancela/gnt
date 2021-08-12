require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const weatherRoutes = require('./api/routes/weather.routes')
const { port } = require('./props')

app.use(cors())
app.use('/api/v1/weather', weatherRoutes)
app.use('/', express.static('app/build'))

app.listen(port, () => console.log(`gnt-app listening at port ${port}`))