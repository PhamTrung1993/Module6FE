import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { PasswordValidators } from '../jwt/helper/password.validators';
import {UserService} from "../service/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username?: any;
  oldPw?:string;
  userId?: any;
  formchange : FormGroup | undefined | any;
  //
  // })

  constructor(private userService: UserService,
    ) {
    this.initializeForm();
    this.changePassword();
  }
  changePassword() {
    let id = Number(localStorage.getItem('ID'))
    this.userService.getUserProfile(id).subscribe(res => {
      this.oldPw = String(res.password);
      this.username = res.username;
      this.userId = res.id;
    })
    console.log(this.oldPw)
  }
  initializeForm()
  {
    this.formchange = new FormGroup({
      oldPassword: new FormControl ('',[Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      cnfPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    },{validators:this.validateAreEqual});
  }
  checkPass(){
    let formPassword = this.formchange.value;
    if (String(formPassword.oldPassword) == this.oldPw) {

      this.userService.changePassword(Number(localStorage.getItem('ID')),String(formPassword.newPassword)).subscribe(() => {
        Swal.fire(
          ' ',
          '<h2 style="color: green; font-size: 32px">Đổi mật khẩu thành công</h2>',
          'success'
        )
        this.formchange.reset();
        }, error => {
        Swal.fire(
          ' ',
          '<h2 style="color: red; font-size: 32px">Có lỗi xảy ra!!!</h2>',
          'error'
        )
        console.log(error);
      })
    }

  }

  get oldPassword() {
    return String(this.formchange.get('oldPassword'));
  }

  get newPassword() {
    return this.formchange.get('newPassword');
  }
  get cnfPassword() {
    return this.formchange.get('cnfPassword');
  }
  ngOnInit() {
  }
  public validateAreEqual(c: AbstractControl): {notSame: boolean} | null {
    return  c.value.newPassword  ===  c.value.cnfPassword ? null : {notSame: true};
  }
}
