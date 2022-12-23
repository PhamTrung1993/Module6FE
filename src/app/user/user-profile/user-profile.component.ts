import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";
import {FormControl, FormGroup} from "@angular/forms";
import {HouseService} from "../../service/house.service";
import {House} from "../../model/house";
import {Image} from "../../model/Image";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  houses!: House[]
  listImage: Image[] = [];
  listFirstImage: string[] = [];
  userForm:FormGroup | any;
      userId! : any;
      userName: any;
      id: number | any;
      fullName: any;
      avatar: any;
      userAddress:any;
      email:any;
      phoneNumber:any;

  ngOnInit(): void {
  }
  constructor(private userService: UserService,
              private router: Router,
              private houseService: HouseService,
              private activatedRoute: ActivatedRoute  ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getHouseByUserId(this.id);
      this.initializeForm();
      this.getUser(this.id)
    });
  }
  initializeForm(){
    this.userForm = new FormGroup({
      fullName: new FormControl(),
      avatar: new FormControl(),
      userAddress: new FormControl(),
      email: new FormControl(),
      phoneNumber: new FormControl()
    });
  }

  getUser(id: number) {
    return this.userService.getUserProfile(id).subscribe(userr => {
      this.userName = userr.username
      this.userId = userr.id
      this.fullName = userr.fullName
      this.avatar = userr.avatar
      this.userAddress = userr.userAddress
      this.email = userr.email
      this.phoneNumber = userr.phoneNumber
    });
  }
  getHouseByUserId(id: number) {
    return this.houseService.findByUserId(id).subscribe(house => {
      this.houses = house;
      for (let i = 0; i < this.houses.length; i++) {
        // @ts-ignore
        this.listFirstImage.push(String(this.houses[i].image[0].imageName))
      }
    }, error => {
      console.log(error);
    })
  }
}
