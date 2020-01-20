import { Client } from 'pg'

  export class DALManager {

    constructor() { }

    execute() {
      this.BasicSelect().then(respo => { return respo })
    }

    async BasicSelect() {
      
      const client = new Client({
        connectionString: ""
      })

      client.connect()

      client.query('SELECT * FROM NYC_EVENTS', (err, res) => {
        console.log(err, res)
        client.end()
      }) 
    }
  }
