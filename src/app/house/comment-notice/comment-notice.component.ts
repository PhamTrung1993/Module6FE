import {Component} from '@angular/core';
import {Comments} from "../../model/comment";
import {HouseCommentService} from "../../service/house-comment.service";
import {CommentFinal} from "../../model/commentFinal";

@Component({
  selector: 'app-comment-notice',
  templateUrl: './comment-notice.component.html',
  styleUrls: ['./comment-notice.component.css']
})
export class CommentNoticeComponent {
  id: number = 0;
  comment: CommentFinal[] = [];

  constructor(private commentService: HouseCommentService) {
  }

  ngOnInit() {
    this.id = Number(localStorage.getItem("ID"))
    this.getAllComments(this.id);
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
}
