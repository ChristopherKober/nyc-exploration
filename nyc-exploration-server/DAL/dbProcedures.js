const DAL = require('./DAL')
const AUTH = require('../api/authentication')

module.exports = {

    getAllEvents: async function () {
        return await DAL.executeQuery('SELECT * FROM public."NYC_EVENTS"')
    },

    getAllNeighborhoods: async function () {
        return await DAL.executeQuery('SELECT * FROM public."NYC_NEIGHBORHOODS"')
    },

    getPasswordsFromDatabase: async function () {
        return await DAL.executeQuery('SELECT * FROM public."NYC_CREDENTIALS"')
    },

    getAllVisitedNeighborhoods: async function () {
        return await DAL.executeQuery('SELECT DISTINCT "NEIGHBORHOOD_ID" FROM public."NYC_EVENTS" \
                                       ORDER BY "NEIGHBORHOOD_ID" ASC')
    },

    getAllEventsFromNeighborhood: async function (neighborhoodId) {
        if (isNaN(neighborhoodId))
            return []

        neighborhoodId = Number(neighborhoodId)
        return await DAL.executeQuery('SELECT * FROM public."NYC_EVENTS" \
                                       WHERE "NEIGHBORHOOD_ID" = ' + neighborhoodId + ' \
                                       ORDER BY "EVENT_DATE" DESC')
    },

    addEvent: async function (params) {
        try {
            var auth = await this.getPasswordsFromDatabase();
            var authed = await AUTH.authenticate(params, auth);
            console.log(authed)
            if (authed) {

                return await DAL.executeQuery('INSERT INTO public."NYC_EVENTS"( \
	                                           "EVENT_TYPE", "EVENT_NAME", "NEIGHBORHOOD_ID", "EVENT_DATE", "EVENT_RATING", "COMMENTS") \
                                                VALUES(\'' + params.event_type.replace(/[-'"()]/gm,'') + '\'\
                                                , \'' + params.event_name.replace(/[-'"()]/gm, '') + '\'\
                                                , ' + params.neighborhood_id.toString().replace(/[-'"()]/gm, '') + '\
                                                , \'' + params.event_date.replace(/[-'"()]/gm, '') + '\'\
                                                , ' + params.event_rating.toString().replace(/[-'"()]/gm, '') + '\
                                                , \'' + params.comments.replace(/[-'"()]/gm, '') + '\'\
                                                );');
            }
        }
        catch (err) {
            return;
        }
    }

}