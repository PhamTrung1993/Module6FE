import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {Order} from "../../model/order";
import {Image} from "../../model/Image";
import {House} from "../../model/house";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EmailDetails} from "../../model/emailDetails";
import {EmailService} from "../../service/email.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  house!: House;
  bookings: Order[] = [];
  listOrderByUserId: Order[] = [];
  listFirstImage: string[] = [];
  listImage: Image[] = [];
  orderStatus!: number;
  emailDetails: EmailDetails = {
    recipient: "",
    msgBody: "",
    subject: "",
    attachment: "",
  }
  userId:number = 0;
  page: number = 0;
  lastpage! : number;
  listPageNumber: number[] = [];
  listOrderByHouseId: Order[] = [];
  constructor(private orderService : OrderService,
              private activatedRoute: ActivatedRoute,
              private emailService: EmailService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.page = +paramMap.get('start');

      this.userId = Number(localStorage.getItem('ID'));
      this.getBooking(this.userId,this.page)
    });
  }
  ngOnInit(): void {


  }

  getBooking(userId: number,start: number) {
    this.orderService.getBookingByHouseOfUserID(userId,start).subscribe(res => {
      // @ts-ignore
      this.bookings = res;
      // @ts-ignore
      for (let i = 0; i < this.bookings.length; i++) {
        // @ts-ignore
        this.listFirstImage.push(this.bookings[i].house?.image[0].imageName);
      }
    }, error => {
      console.log(error);
    })
  }
  getPageNumberMax(id : number) {
    this.orderService.getBookingByUserId(id).subscribe(res => {
      this.listOrderByUserId = res;
      this.lastpage = Math.floor(((this.listOrderByUserId.length)/5));
      for (let i = 0; i <= Math.floor(this.listOrderByUserId.length/5); i++) {
        this.listPageNumber.push((i+1));
      }
    })
  }
  sendMail(subject: string, msgBody: string, recipient: string) {
    this.emailDetails.subject = subject;
    this.emailDetails.msgBody = msgBody;
    this.emailDetails.recipient = recipient;
    this.emailService.sendMail(this.emailDetails).subscribe(res => {
    })
  }

  submit(id: any) {
    this.orderStatus = 2;
    this.orderService.changeOderStatus(id, this.orderStatus).subscribe(() => {
      let startDate: Date;
      let endDate: Date;
      let subject = "Bạn đã đặt thành công một căn nhà trên AirBlade";
      let msgBody = "";
      let recipient: string = "";
      let houseId = 0;
      this.orderService.showOrderById(id).subscribe(res => {
        msgBody = "Đơn hàng của bạn đã được xác nhận!  Đơn hàng bắt đầu từ ngày: " + res.startTime + " tới ngày " + res.endTime + "  tên căn nhà bạn thuê là: " + res.house?.houseName;
        houseId = Number(res.house?.id);
        this.orderService.showOrderByHouseIdStatus1(houseId).subscribe(res => {
          this.listOrderByHouseId = res;
          for (let i = 0; i < this.listOrderByHouseId.length; i++) {
            if (endDate >= this.listOrderByHouseId[i].endTime && this.listOrderByHouseId[i].endTime >= startDate && startDate > this.listOrderByHouseId[i].startTime) {
              this.cancelByConfirm(this.listOrderByHouseId[i].id);
            }
            if (this.listOrderByHouseId[i].endTime >= endDate && endDate >= this.listOrderByHouseId[0].startTime && this.listOrderByHouseId[0].startTime > startDate) {
              this.cancelByConfirm(this.listOrderByHouseId[i].id);
            }
            if (endDate >= this.listOrderByHouseId[i].endTime && startDate <= this.listOrderByHouseId[0].startTime) {
              this.cancelByConfirm(this.listOrderByHouseId[i].id);
            }
            if (endDate <= this.listOrderByHouseId[i].endTime && startDate >= this.listOrderByHouseId[0].startTime) {
              this.cancelByConfirm(this.listOrderByHouseId[i].id);
            }
          }
        })
        startDate = res.startTime;
        endDate = res.endTime;
        recipient = String(res.user?.email);
        this.sendMail(subject, msgBody, recipient);
      })
      Swal.fire(
        ' ',
        '<h2 style="color: green; font-size: 32px">Đã xác nhận!!!</h2>',
        'success'
      )
      // location.reload();
    }, error => {
      Swal.fire(
        ' ',
        '<h2 style="color: red; font-size: 32px">Có lỗi xảy ra!!!</h2>',
        'error'
      )
    })
  }
  cancelByConfirm(id: any) {
    this.orderStatus = 4;
    this.orderService.changeOderStatus(id, this.orderStatus).subscribe(() => {
      let subject = "Rất tiếc phải hủy một đơn hàng của bạn trên AirBlade";
      let msgBody = "";
      let recipient: string = "";
      this.orderService.showOrderById(id).subscribe(res => {
        msgBody = "Chúng tôi rất tiếc khi phải hủy đợn hàng tạo ngày: " + res.createTime + " tên căn hộ: " + res.house?.houseName;
        recipient = String(res.user?.email);
      })
      this.sendMail(subject, msgBody, recipient);
    }, eror => {
      console.log(eror)
    })
  }
  cancel(id: any) {
    this.orderStatus = 4;
    this.orderService.changeOderStatus(id, this.orderStatus).subscribe(() => {
      let subject = "Rất tiếc phải hủy một đơn hàng của bạn trên AirBlade";
      let msgBody = "";
      let recipient: string = "";
      this.orderService.showOrderById(id).subscribe(res => {
        msgBody = "Chúng tôi rất tiếc khi phải hủy đợn hàng tạo ngày: " + res.createTime + " tên căn hộ: " + res.house?.houseName;
        recipient = String(res.user?.email);
      })
      this.sendMail(subject, msgBody, recipient);
      Swal.fire(
        ' ',
        '<h2 style="color: green; font-size: 32px">Đã hủy thành công!!!</h2>',
        'success'
      )
      location.reload();
    }, eror => {
      Swal.fire(
        ' ',
        '<h2 style="color: red; font-size: 32px">Có lỗi xảy ra!!!</h2>',
        'error'
      )
      location.reload();
    })
  }


  log(data: any) {
    new Date(data).toUTCString()

  }

  covert(data: any) {
    return (new Date(Date.parse(data)).toString().slice(0, 15))

  }
}

