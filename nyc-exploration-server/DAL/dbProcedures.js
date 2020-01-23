const DAL = require('./DAL')

module.exports = {

    getAllEvents: async function () {
        return await DAL.executeQuery('SELECT * FROM public."NYC_EVENTS"')
    },

    getAllNeighborhoods: async function () {
        return await DAL.executeQuery('SELECT * FROM public."NYC_NEIGHBORHOODS"')
    },

    getPasswordsFromDatabase: async function () {
        return await DAL.executeQuery('SELECT * FROM public."NYC_CREDENTIALS"')
    }

}