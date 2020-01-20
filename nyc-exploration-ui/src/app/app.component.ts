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
      connectionString: ""
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
