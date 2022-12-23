import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../service/house.service";
import {OrderService} from "../../service/order.service";
import {House} from "../../model/house";
import {FormControl, FormGroup} from "@angular/forms";
import {Income} from "../../model/income";
import {Order} from "../../model/order";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-house-income',
  templateUrl: './house-income.component.html',
  styleUrls: ['./house-income.component.css']
})
export class HouseIncomeComponent implements OnInit{
  id: number = 0;
  user!:User
  listHouse: House[] = [];
  result: string = "";
  income: Income ={
    houseId: "",
    month: "",
  }
  orders: Order[] = [];
  form = new FormGroup( {
    houseId: new FormControl(),
    month: new FormControl()
  });
  check: boolean = false;
  image: string = "";
  houseName: string ="";
    constructor(private houseService: HouseService,
                private orderService: OrderService,
                private userService: UserService) {
      this.id = Number(localStorage.getItem('ID'));
      this.userService.getUserProfile(this.id).subscribe( result => {
        this.user = result;
      })
      this.houseService.findByUserId(this.id).subscribe( res => {
        this.listHouse = res;
      })
    }
  ngOnInit(): void {
  }
  submit(){
    let sum: number = 0;
    this.income = this.form.value;
    this.orderService.getIncome(this.income).subscribe( res => {
      this.orders = res;
      if (this.orders.length > 0) {
        this.check = true;
        this.houseName = String(this.orders[0].house?.houseName);
        // @ts-ignore
        this.image = String(this.orders[0].house?.image[0].imageName)
        for (let i = 0; i < this.orders.length; i++) {
          sum += Number(this.orders[i].income);
        }
        this.result = "Thu nhập của nhà " + this.houseName + " trong tháng "+ this.income.month?.slice(5,8) + " năm " + this.income.month?.slice(0,4) +" là: " + sum + "VNĐ";
      }
      else this.result = "Không có thu nhập nào trong tháng này";
    })
  }
}
