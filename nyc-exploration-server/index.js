const express = require('express')
var timeout = require('connect-timeout')

const PORT = process.env.PORT || 5000
const api = require('./api/api')

const app = express()



app.use(timeout(15000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

app.use(express.json())
api.setup(app)

app
    .listen(PORT, () => console.log(`Listening on ${PORT}`))