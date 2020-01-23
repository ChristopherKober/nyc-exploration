const { atob } = require('atob')

const dbProcedures = require('../DAL/dbProcedures')

module.exports = {
    authenticate: async function (req) {
        try {
            var requestPassword = getPasswordFromRequest(req)
            var databasePasswords = await dbProcedures.getPasswordsFromDatabase()

            for (var i = 0; i < databasePasswords['rows'].length; i++) {
                var databasePassword = databasePasswords['rows'][i]

                if (databasePassword['PASSWORD_HASH'] === requestPassword) {
                    return true
                }
            }

            return false
        } catch (err) {
            return false
        }
    }
};

function getPasswordFromRequest(req) {
    var basicToken = req.get('Authorization').split(" ")[1]
    var decodedToken = atob(basicToken)
    var password = decodedToken.split(":")[1]

    return password
}

