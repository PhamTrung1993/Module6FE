import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service.service";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HouseCommentService} from "../../service/house-comment.service";
import {CommentFinal} from "../../model/commentFinal";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SearchComponent} from "./search/search.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  userID: number = 0;
  userName?: any;
  avatar: any;
  id: number = 0;
  user?: User;
  id1: number = 0;
  comment: CommentFinal[] = [];
  constructor(private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private commentService: HouseCommentService,
              private matDialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe((paramMap : ParamMap) => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.getUser()
    });

  }
  ngOnInit(): void {
    let userid = Number(localStorage.getItem('ID'));
    this.userID = userid
    // console.log(this.userID);
    this.id1 = Number(localStorage.getItem("ID"))
    this.getAllComments(this.id1)
  }
  logout() {
    this.authenticationService.logout()
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ID");
    window.location.href = 'http://localhost:4200';
  }
  getUser(){
     let userid = Number(localStorage.getItem('ID'))
    this.userService.getUserProfile(userid).subscribe(res => {
      this.avatar = res.avatar;
      this.userName = res.username;
    })
  }
  getAllComments(id:number) {
    this.commentService.CommentNotRead(id).subscribe(result => {
        this.comment = result;
        console.log(this.comment)
      }, error => {
        console.log(error);
      }
    )
  }
  isRead(id: any){
    this.commentService.updateIsRead(id).subscribe(result=>{

    })
  }

  // @ts-ignore
  matDialogRef: MatDialogRef<SearchComponent>;
  name: string = "";

  OpenModal() {
    this.matDialogRef = this.matDialog.open(SearchComponent, {
      data: { },
      disableClose: true
    });

    // this.matDialogRef.afterClosed().subscribe(res => {
    //   if ((res == true)) {
    //     this.name = "";
    //   }
    // });
  }

}
