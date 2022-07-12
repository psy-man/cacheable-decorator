import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumsService } from './enums.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public user$!: Observable<User>;

  constructor(private enums: EnumsService) {}

  getUser(id: number) {
    console.log('requesting user: ' + id);
    this.user$ = this.enums.getUser(id);
  }
}
