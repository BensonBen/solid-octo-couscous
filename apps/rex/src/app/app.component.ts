import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Something } from '@solid-octo-couscous/model';
@Component({
  selector: 'solid-octo-couscous-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'rex';
  public state: Array<Something>

  constructor(private readonly httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Array<Something>>('/api/getAll').subscribe(resultSet =>
      this.state = [...resultSet]
    );
  }

}
