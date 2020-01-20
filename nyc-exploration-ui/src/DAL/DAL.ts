import { Client } from 'pg'

  export class DALManager {

    constructor() { }

    execute() {
      this.BasicSelect().then(respo => { return respo })
    }

    async BasicSelect() {
      
      const client = new Client({
        connectionString: "postgres://ohlwltetcttvlz:4c1d3cee0b32d90aeca96aba289a39c9967e329e8d16c08f6188fe14cb380166@ec2-174-129-33-120.compute-1.amazonaws.com:5432/dah8uee5bn7ask"
      })

      client.connect()

      client.query('SELECT * FROM NYC_EVENTS', (err, res) => {
        console.log(err, res)
        client.end()
      }) 
    }
  }
