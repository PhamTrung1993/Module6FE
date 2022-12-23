import {Component, OnInit} from '@angular/core';
import {Order} from "../../model/order";
import {OrderService} from "../../service/order.service";
import {HouseService} from "../../service/house.service";
import {House} from "../../model/house";
import {User} from "../../model/user";
import {Status} from "../../model/status";
import {Image} from "../../model/Image";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-order-past',
  templateUrl: './order-past.component.html',
  styleUrls: ['./order-past.component.css']
})
export class OrderPastComponent implements OnInit {
  page: number = 0;
  listOrderByUserId: Order[] = [];
  id: number = 0;
  listPageNumber: number[] = [];
  orderList: Order[] = [];
  house!: House;
  listFirstImage: string[] = [];
  listImage: Image[] = [];

  lastpage!: number;
  check! : any;

  ngOnInit(): void {
    this.getPageNumberMax(this.id);
  }

  constructor(private orderService: OrderService,
              private houseService: HouseService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.page = +paramMap.get('start');
      this.id = Number(localStorage.getItem("ID"));
      this.getOrderPast(this.id, this.page);
    });
  }

  getOrderPast(id: number, start: number) {
    this.orderService.getOrderPast(id, start).subscribe(result => {
      this.orderList = result;
      for (let i = 0; i < this.orderList.length; i++) {
        // @ts-ignore
        this.listFirstImage.push(this.orderList[i].house?.image[0].imageName);
      }
    }, error => {
      console.log(error);
    })
  }

  getPageNumberMax(id: number) {
    this.orderService.getOrderByUserId(id).subscribe(res => {
      this.listOrderByUserId = res;
      this.lastpage = Math.floor(((this.listOrderByUserId.length) / 5));
      for (let i = 0; i <= Math.floor(this.listOrderByUserId.length / 5); i++) {
        this.listPageNumber.push((i + 1));
      }
    })
  }

  checkHidden() {
    let value = 1;
    let value2 = 0;
    this.check = false;
    if (value2 < value) {
      this.check = true;
    }
  }

  covert(data: any) {
    return (new Date(Date.parse(data)).toString().slice(0, 15))
  }
}
