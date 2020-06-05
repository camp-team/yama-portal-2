import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  user$ = this.authService.afUser$;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  googleLogin() {
    this.authService.googleLogin();
  }

  facebookLogin() {
    this.authService.facebookLogin();
  }

  twitterLogin() {
    this.authService.twitterLogin();
  }

  register() {
    this.authService.createUser(this.form.value);
  }

  emailLogin() {
    this.authService.emailLogin(this.form.value);
  }

  logout() {
    this.authService.logout();
  }

  resetPassword() {
    this.authService.resetPassword(this.form.value.email);
  }

  ngOnInit(): void {}
}
