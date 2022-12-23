import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Image} from "../../model/Image";
import {HouseService} from "../../service/house.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Status} from "../../model/status";
import {HouseStatusService} from "../../service/house-status.service";
import {House} from "../../model/house";
import Swal from "sweetalert2";

@Component({
  selector: 'app-house-update-status',
  templateUrl: './house-update-status.component.html',
  styleUrls: ['./house-update-status.component.css']
})
export class HouseUpdateStatusComponent {
  listStatus: Status[] = [];
  house? : House
  houseForm: FormGroup | undefined | any;
  id: number = 0;
  statusForm = new FormGroup ({
      id: new FormControl()
  })
  status: Status = {
    id: 0
  }
  // @ts-ignore
  listImage: Image[];
  image1: any;
  image2: any;
  image3: any;

  constructor(private houseService: HouseService,
              private activatedRoute: ActivatedRoute,
              private statusService: HouseStatusService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.houseService.findById(this.id).subscribe(res => {
        this.house = res
      })
      this.initializeForm();
      this.getStatus();
      this.getImage(this.id)
    });
  }
  initializeForm(){
    this.houseForm = new FormGroup({
      houseName: new FormControl(),
      houseAddress: new FormControl(),
      bedrooms: new FormControl(),
      bathrooms: new FormControl(),
      rent: new FormControl(),
      description: new FormControl()
    });
  }

  ngOnInit() {
  }
  getStatus(){
    return this.statusService.getAll().subscribe(statusList => {
      this.listStatus = statusList;
    } )
  }
  // getSmartphone(id: number) {
  //   return this.houseService.findById(id).subscribe(house => {
  //     this.houseForm = new FormGroup({
  //       houseName: new FormControl(house.houseName),
  //       houseAddress: new FormControl(house.houseAddress),
  //       bedrooms: new FormControl(house.bedrooms),
  //       bathrooms: new FormControl(house.bathrooms),
  //       rent: new FormControl(house.rent),
  //       description: new FormControl(house.description)
  //     });
  //   });
  // }

  updateHouseStatus() {
    this.status = this.statusForm.value;
    let idStatus = Number(this.status.id);
    this.houseService.updateStatus(this.id, idStatus).subscribe(() => {
      Swal.fire(
        ' ',
        '<h2 style="color: green; font-size: 32px">Cập nhật thành công!!!</h2>',
        'success'
      )
      location.reload();
    }, error => {
      Swal.fire(
        ' ',
        '<h2 style="color: red; font-size: 32px">Có lỗi xảy ra!!!</h2>',
        'error'
      )
      console.log(error);
    })
  }
  getImage(id: number){
    return this.houseService.findImageByHouseId(id).subscribe( listImage => {
      // @ts-ignore
      this.listImage = listImage;
      this.image1 = listImage[0].imageName;
      this.image2 = listImage[1].imageName;
      this.image3 = listImage[2].imageName;
    })
  }
}
