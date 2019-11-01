import { Component, OnInit } from '@angular/core';
import { AuthCallsService } from 'src/app/services/auth-calls.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthCallsService) { }

  ngOnInit() {
    this.authService.LogOutUser();
  }

}
