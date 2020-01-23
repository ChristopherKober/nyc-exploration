const express = require('express')
const { Client } = require('pg')

const dbProcedures = require('../DAL/dbProcedures')
const auth = require('./authentication')

module.exports = {

    setup: (app) => {
        /// Path: /echo
        /// Returns an echo response to test if service is available
        app
            .get('/echo', (req, res) => {

                auth.authenticate(req).then(function (result) {
                    console.log("Auth returned: " + result.toString())
                }, function (err) {
                    console.log("Error occured: " + err.toString())
                })

                res.statusCode = 200;
                res.set('Access-Control-Allow-Origin', '*')
                res.set('Access-Control-Allow-Methods', 'GET')
                res.set('Access-Control-Allow-Headers', 'Origin, Content-Type')
                res.end('Echo')
            })
        app
            .options('/echo', (req, res) => {
                res.statusCode = 200
                res.set('Access-Control-Allow-Origin', '*')
                res.set('Access-Control-Allow-Methods', 'GET')
                res.set('Access-Control-Allow-Headers', 'Origin, Content-Type')
                res.end()
            })

        /// Path: /events
        /// Returns all events
        app
            .get('/events', (req, res) => {
                dbProcedures.getAllEvents().then(function (result) {
                    try {
                        res.statusCode = 200;
                        res.set('Access-Control-Allow-Origin', '*')
                        res.set('Access-Control-Allow-Methods', 'GET')
                        res.set('Access-Control-Allow-Headers', 'Origin, Content-Type')
                        res.end(JSON.stringify(result["rows"]))
                    } catch {
                        res.statusCode = 500;
                        res.end('Data format not as expected')                    
                    }
                }, function (err) {
                    res.statusCode = 500;
                    res.end('Database Error')
                })
            })
        app
            .options('/events', (req, res) => {
                res.statusCode = 200
                res.set('Access-Control-Allow-Origin', '*')
                res.set('Access-Control-Allow-Methods', 'GET')
                res.set('Access-Control-Allow-Headers', 'Origin, Content-Type')
                res.end()
            })

        app
            .get('/neighborhoods', (req, res) => {
                dbProcedures.getAllNeighborhoods().then(function (result) {
                    try {
                        res.statusCode = 200;
                        res.set('Access-Control-Allow-Origin', '*')
                        res.set('Access-Control-Allow-Methods', 'GET')
                        res.set('Access-Control-Allow-Headers', 'Origin, Content-Type')
                        res.end(JSON.stringify(result["rows"]))
                    } catch {
                        res.statusCode = 500;
                        res.end('Data format not as expected')
                    }
                }, function (err) {
                    res.statusCode = 500;
                    res.end('Database Error')
                })
            })

        app
            .options('/neighborhoods', (req, res) => {
                res.statusCode = 200
                res.set('Access-Control-Allow-Origin', '*')
                res.set('Access-Control-Allow-Methods', 'GET')
                res.set('Access-Control-Allow-Headers', 'Origin, Content-Type')
                res.end()
            })
    }

};