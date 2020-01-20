const express = require('express')
const { Client } = require('pg')

module.exports = {

    setup: function (app) {
        /// Path: /echo
        /// Returns an echo response to test if service is available
        app
            .get('/echo', (req, res) => {
                res.statusCode = 200;
                res.end('Echo')
            })

        /// Path: /events
        /// Returns all events
        app
            .get('/events', (req, res) => {
                const client = new Client({
                    connectionString: process.env.DATABASE_URL + "?ssl=true"
                })

                client.connect()

                client.query('SELECT * FROM public."NYC_EVENTS"', (err, data) => {

                    if (err) {
                        res.statusCode = 500;
                        res.end('Cannot connect to database')
                    }
                    else {
                        try {
                            res.statusCode = 200;
                            res.set('Access-Control-Allow-Origin', '*')
                            res.set('Access-Control-Allow-Methods', 'GET, POST')
                            res.set('Access-Control-Allow-Headers', 'Origin, Content-Type')
                            res.end(JSON.stringify(data["rows"]))
                        } catch
                        {
                            res.statusCode = 500;
                            res.end('Data format not as expected')
                        }
                    }

                    client.end()
                })
            })
        app
            .options('/events', (req, res) => {
                res.statusCode = 200
                res.set('Access-Control-Allow-Origin', '*')
                res.set('Access-Control-Allow-Methods', 'GET, POST')
                res.set('Access-Control-Allow-Headers', 'Origin, Content-Type')
                res.end()
            })
    }

}