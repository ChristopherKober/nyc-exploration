const express = require('express')
const PORT = process.env.PORT || 5000
const api = require('./api/api')

const app = express()


api.setup(app)

app
    .listen(PORT, () => console.log(`Listening on ${PORT}`))