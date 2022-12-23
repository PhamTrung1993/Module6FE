import {Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import { AuthenticationService } from 'src/app/service/authentication.service.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
      username : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  });
  // returnUrl?: string;
  // adminUrl?: string;
  error = '';
  loading = false;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    console.log(this.authenticationService.currentUserValue);
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    // this.returnUrl = '';
    // this.adminUrl = '/admin'
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          Swal.fire(
            ' ',
            '<h2 style="color: green; font-size: 32px">Đăng nhập thành công!!!</h2>',
            'success'
          )
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          localStorage.setItem('ROLE', data.roles[0].authority);
          localStorage.setItem('USERNAME', data.username);
          localStorage.setItem('ID', data.id);
          if (data.roles[0].authority == "ROLE_ADMIN") {
            this.router.navigate(['/home'])
          } else

            if (data.roles[0].authority == "ROLE_USER") {

              this.router.navigate(['/home']);
            }
        },
        error => {
          Swal.fire(
            ' ',
            '<h2 style="color: red; font-size: 32px">Tài khoản của bạn đã bị khoá hoặc sai mật khẩu!</h2>',
            'error'
          )
          this.loading = false;
        });
  }

  logout() {
    this.authenticationService.logout()
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ID'");
  }

}
