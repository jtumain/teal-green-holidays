import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) {}

  ngOnInit() {}

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  doTogglePassword(event: Event) {
    event.preventDefault();
    this.hide = !this.hide
  }

  doLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password)
      .subscribe(res => {
        console.log(res);
      });
  }
}
