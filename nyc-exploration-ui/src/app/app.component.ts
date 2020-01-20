import { Component } from '@angular/core';
import { Sequelize } from '@angular/sequelize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  //@Component({
  //  selector: 'app-dal-test',
  //  template: '<h3>test</h3>'
  //})

export class AppComponent {
  title = 'nyc-exploration';
  data = 'sample text';

  ngOnInit() {
    this.fetchDB()
  }

  private fetchDB() {
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

//export class DalTest {
//  s = (new DALManager()).BasicSelect
//}
