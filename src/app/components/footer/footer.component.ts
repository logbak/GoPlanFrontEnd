import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isAdmin: boolean;
  isLoggedIn: boolean;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    if(localStorage.getItem('user_role') == "Admin")
    { this.isAdmin = true; } else { this.isAdmin = false; }

    if(localStorage.getItem('id_token') != null) { this.isLoggedIn = true } else { this.isLoggedIn = false };
  }

  onSubmitLogout(){
    this._auth.logout();
    this.ngOnInit();
  }
}
