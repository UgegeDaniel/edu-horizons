import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-google-signin-button',
  templateUrl: './google-signin-button.component.html',
  styleUrls: ['./google-signin-button.component.css']
})
export class GoogleSigninButtonComponent {
  constructor(
  ) { }
  async signInWithGoogle() {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId = '1034227723960-pqsnc6q65m4ph9o0clci910npefdmgvp.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:5000/user/auth/google/redirect';
    const scope = 'profile email';
    const responseType = 'code';
    const authUrl = `${googleAuthUrl}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  }
}