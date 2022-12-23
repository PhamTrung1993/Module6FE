import {Component, OnInit} from '@angular/core';
import {House} from "../../model/house";
import {Image} from "../../model/Image";
import {HouseService} from "../../service/house.service";
import {identity} from "rxjs";
import {Order} from "../../model/order";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-list5house',
  templateUrl: './list5house.component.html',
  styleUrls: ['./list5house.component.css']
})
export class List5houseComponent implements OnInit {
  id: number = 0;
  houses: House[] = [];
  listImage: Image[] = [];
  listFirstImage: string[] = [];
  constructor(private houseService: HouseService) {
  }

  ngOnInit() {
    this.get5House();
    console.log(this.listFirstImage);
  }
  get5House(){
    this.houseService.get5house().subscribe(result => {
        this.houses = result;

        for (let i = 0; i < this.houses.length; i++) {
          // @ts-ignore
          this.listFirstImage.push(String(this.houses[i].image[0].imageName))
        }
      }, error => {
        console.log(error);
      }
    )
  }
}
