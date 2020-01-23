const { Client } = require('pg')

module.exports = {
    executeQuery: async function (queryString) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL + "?ssl=true"
        })

        await client.connect()
        let result = await client.query(queryString)

        client.end()
        return result 
    }
}