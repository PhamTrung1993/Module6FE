import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {HouseService} from "../../service/house.service";
import {Image} from "../../model/Image";
import {HouseCommentService} from "../../service/house-comment.service";
import {Comments} from "../../model/comment";
import {Rating} from "../../model/rating";
import {HouseRatingService} from "../../service/house-rating.service";
import {Order} from "../../model/order";
import {User} from "../../model/user";

import Swal from "sweetalert2";

import {RatingDTO} from "../../model/ratingDTO";





@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent {
  stars:number = 0;
  comments:number = 0;
  houseForm: FormGroup | any;
  houseId! : any;
  houseUser!: User;
  id: number | any;
  // @ts-ignore
  listImage: Image[];
  image1: any;
  image2: any;
  image3: any;
  houseName: any;
  Address: any;
  Rent!: any;
  description! : any;
  bedrooms! : any;
  bathrooms! : any;
  listComment: Comments[]=[];
  listRating: Rating[]=[];
  selectedRating = 0;
  star:any;
  userId:number = 0;
  page: number = 0;
  orders: Order[] = [];
  lastpage! : number;
  listCommentByUserId: Comments[] = [];
  listPageNumber: number[] = [];
  houseRating: Rating = {
    userId: 0,
    houseId:0,
    houseRating: "",

  }
  houseComment:  Comments = {
    comment: "",
    houseId:0,
    userName:"",
    isRead: false,
    userId:0,
  };

  commentForm = new FormGroup({
    comment: new FormControl()
  });
  listPageNumberComment: number[] = [];
  userCommentName: string[] = [];
  constructor(private houseService: HouseService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private houseCommentService: HouseCommentService,
              private houseRatingService: HouseRatingService,
              private commentService: HouseCommentService,
              ) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.userId = Number(localStorage.getItem('ID'));
      this.getHouse(this.id);
      this.initializeForm();
      this.getImage(this.id);
      this.getComment(this.id, 0);
      this.getStar(this.id)

    });
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.findPageNumberMax();
    })

  }
  initializeForm(){
    this.houseForm = new FormGroup({
      Name: new FormControl(),
      Address: new FormControl(),
      Rent: new FormControl(),
      description: new FormControl(),
      bedrooms: new FormControl(),
      bathrooms: new FormControl(),
      HouseStatus: new FormControl()

    });
  }

  getHouse(id: number) {
    return this.houseService.findById(id).subscribe(house => {
      this.houseId = house.id
      this.houseName = house.houseName
      this.Address = house.houseAddress
      this.Rent = house.rent
      this.description = house.description
      this.bedrooms = house.bedrooms
      this.bathrooms = house.bathrooms
      // @ts-ignore
      this.houseUser = house.user;
    });
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
  getComment(id: number, page: number){
    return this.houseCommentService.getCommentByHouseIdPaging(id,page).subscribe(commentList => {
      this.listComment = commentList;

    } )
  }
  checkStar(){
    // @ts-ignore
    document.getElementById("star" + this.stars).checked = true;

    console.log(document.getElementById("star5"))
  }
  getStar(id: number){
     return this.houseRatingService.getStar(id).subscribe(ratingList => {
      this.listRating = ratingList;

      for (let i = 0; i < this.listRating.length; i++) {
          this.stars += Number(ratingList[i].rating)/this.listRating.length;
      }
        this.stars = Math.floor(this.stars);
       this.checkStar();
    } )
  }
  createRating(id:any, star:any){
this.houseRatingService.createRating(Number(localStorage.getItem("ID")),Number(id)).subscribe(orders => {
  this.orders = orders;
  if (this.orders.length != 0){
    let userId = Number(localStorage.getItem("ID"))
    this.houseRating.houseRating = String(star);
    this.houseRating.userId = userId;
    this.houseRating.houseId = this.id;
    this.houseRatingService.saveRating(this.houseRating).subscribe(() =>{
      Swal.fire(
        ' ',
        '<h2 style="color: green; font-size: 32px">Cảm ơn bạn đã đánh giá!!!</h2>',
        'success'
      )
    },error => {
      console.log(error)
    })
  }
  else {
    Swal.fire(
      ' ',
      '<h2 style="color: red; font-size: 32px">Bạn cần phải thuê nhà 1 lần!!!</h2>',
      'error'
    )
  }
})
  }

  createComment(){

        let comment: any;
        let userId = Number(localStorage.getItem("ID"))
        // this.houseComment.comment = String(this.commentForm.get("comment")?.value);
        comment = this.commentForm.value;
        this.houseComment.comment = comment.comment;
          this.houseComment.userId = userId;
        this.houseComment.houseId = this.id;
    this.houseRatingService.createRating(Number(localStorage.getItem("ID")),Number(this.id)).subscribe(orders => {
      this.orders = orders;
      if (this.orders.length != 0) {
        this.houseCommentService.saveComment(this.houseComment).subscribe(() => {
          this.commentForm.reset();
          Swal.fire(
            ' ',
            '<h2 style="color: green; font-size: 32px">Cảm ơn bạn đã nhận xét!!!</h2>',
            'success')
          location.reload();
        }, error => {
          console.log(error)
        })
      }
      else {
        Swal.fire(
          ' ',
          '<h2 style="color: red; font-size: 32px">Bạn cần phải thuê nhà 1 lần!!!</h2>',
          'error'
        )
      }})
      }
  findPageNumberMax(){
    this.commentService.showCommentByHouseId(this.id).subscribe( res =>{
      for (let i = 0; i < res.length/5; i++) {
        this.listPageNumberComment.push(i+1);
      }
    })
  }
// getUserCommentById(userCommentId : number){
//     this.
// }
}
