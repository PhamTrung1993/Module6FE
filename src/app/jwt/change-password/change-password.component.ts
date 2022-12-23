import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  oldPw?:string;
  formchange = new FormGroup ( {
    oldPwd: new FormControl(),
    newPwd: new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirmPwd: new FormControl('',[Validators.required,Validators.minLength(6)])
  },{validators:this.validateAreEqual});

  constructor(private userService: UserService){

    this.changePassword()
  }
  changePassword() {
    let id = Number(localStorage.getItem('ID'))
    this.userService.getUserProfile(id).subscribe(res => {
      this.oldPw = String(res.password);
    })
  }
  checkPass(){
    if (this.oldPwd == this.oldPw) {
      this.userService.changePassword(Number(localStorage.getItem('ID')),String(this.newPwd))
    }
  }
  get oldPwd(){
    return String(this.formchange.get('oldPwd'));
  }

  get newPwd(){
    return this.formchange.get('newPwd');
  }

  get confirmPwd(){
    return this.formchange.get('confirmPwd');
  }

  ngOnInit(): void {
  }
  public validateAreEqual(c: AbstractControl): {notSame: boolean} | null {
    return  c.value.password  ===  c.value.confirmPassword ? null : {notSame: true};
  }
}
