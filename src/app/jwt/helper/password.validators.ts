import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidators {
  static invalidOldPwd(control: AbstractControl) : Promise <ValidationErrors | null>{
    return new Promise((resolve) => {
      if(control.value !== 'ravi1234'){
        resolve ({invalidOldPwd : true});
      }
      else
        resolve(null);
    });
  }

  static passwordShouldMatch(control : AbstractControl){
    // @ts-ignore
    let newPassword = control.get('newPassword').value;
    // @ts-ignore
    let cnfPassword = control.get('cnfPassword').value;

    if(newPassword !== cnfPassword) {
      return {passwordShouldMatch : true};
    }
    else
      return null;
  }

  static oldAndNewPwdShouldNotMatch(control : AbstractControl){
    // @ts-ignore
    let oldPassword = control.get('oldPassword').value;
    // @ts-ignore
    let newPassword = control.get('newPassword').value;

    if(oldPassword === newPassword) {
      return {oldAndNewPwdShouldNotMatch : true};
    }
    else
      return null;
  }
}
