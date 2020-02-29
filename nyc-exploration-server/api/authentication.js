const { atob } = require('atob')

module.exports = {
    authenticate: async function (body, auth) {
        try {
            console.log("entered");
            var requestPassword = getPasswordFromRequest(body);

            for (var i = 0; i < auth['rows'].length; i++) {
                var databasePassword = auth['rows'][i]

                console.log(databasePassword['PASSWORD_HASH']);
                console.log(requestPassword);

                if (databasePassword['PASSWORD_HASH'] === requestPassword) {
                    return true
                }
            }

            return false
        } catch (err) {
            console.log(err);
            return false
        }
    }
};

function getPasswordFromRequest(body) {
    //var basicToken = req.get('Authorization').split(" ")[1]
    //var decodedToken = atob(basicToken)
    //var password = decodedToken.split(":")[1]

    return body.password;
}

