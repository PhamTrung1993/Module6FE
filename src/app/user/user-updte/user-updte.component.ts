import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import firebase from "firebase/compat";
import {User} from "../../model/user";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-updte',
  templateUrl: './user-updte.component.html',
  styleUrls: ['./user-updte.component.css']
})
export class UserUpdteComponent implements OnInit {
  image: string = "";
  downloadURL: any;
  fb: any;
  user? : User;
  userUpdate: User = {
    fullName: "",
    avatar:  "",
    userAddress: "",
    email: "",
    phoneNumber: ""
}
  userForm = new FormGroup({
    fullName: new FormControl(),
    userAddress: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
  })
  id: number = 0;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.userService.getUserProfile(this.id).subscribe(res =>{
        this.user = res
      })
      this.getUser(this.id);

    });
  }



  ngOnInit() {
    this.id = Number(localStorage.getItem('ID'));
    this.getUser(this.id);
  }

  getUser(id: number) {
    return this.userService.getUserProfile(id).subscribe(userr => {
      this.userForm = new FormGroup({
        fullName: new FormControl(userr.fullName),
        userAddress: new FormControl(userr.userAddress),
        email: new FormControl(userr.email),
        phoneNumber: new FormControl(userr.phoneNumber),
      });
    });
  }

  updateUser(id: number) {
    this.userUpdate = this.userForm.value;
    if (this.image != "" && this.image != null){
      this.userUpdate.avatar = this.image;
    }
   console.log(this.userUpdate);
    this.userService.updateUserProfile(id, this.userUpdate).subscribe(() => {
      Swal.fire(
        ' ',
        '<h2 style="color: green; font-size: 32px">Cập nhật thành công!!!</h2>',
        'success'
      )

      this.router.navigate(['/user',id]);
    }, e => {
      Swal.fire(
        ' ',
        '<h2 style="color: red; font-size: 32px">Có lỗi xảy ra!</h2>',
        'error'
      )
      console.log(e);
    });
  }
  // @ts-ignore
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: string) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
            this.image = this.fb;
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
