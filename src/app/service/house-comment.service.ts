import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status";
import {environment} from "../../enviroments/environment";
import {Comments} from "../model/comment";
import {Order} from "../model/order";
import {Rating} from "../model/rating";
import {CommentFinal} from "../model/commentFinal";
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class HouseCommentService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(API_URL + `/comment/list`);
  }
showCommentByHouseId(id:number): Observable<Comments[]> {
  return this.httpClient.get<Comments[]>(API_URL  + `/comment/createcomment/${id}`)
}
saveComment(houseCommentDTO: Comments): Observable<Comments> {
  return this.httpClient.post<Comments>(API_URL + `/comment/housecomment`,houseCommentDTO)
}
  getCommentByHouseOfUserID(id: number, start: number): Observable<Comments> {
    return this.httpClient.get<Comments>(API_URL + `/comment/detail/${id}/${start}`)
  }
  getCommentByUserId(id: number): Observable<Comments[]>{
    return this.httpClient.get<Comments[]>( API_URL+`/user/house/comment/${id}`);
  }

  CommentRead(userId: number): Observable<CommentFinal[]> {
    return this.httpClient.get<CommentFinal[]>(API_URL + `/comment/listCommentRead/${userId}`);
  }
  CommentNotRead(userId: number): Observable<CommentFinal[]> {
    return this.httpClient.get<CommentFinal[]>(API_URL + `/comment/listCommentNotRead/${userId}`);
  }
  updateIsRead(id : number):Observable<CommentFinal> {
    return this.httpClient.put<CommentFinal>(API_URL + `/comment/updateIsRead/${id}`, id)
  }
  getCommentByHouseIdPaging(id: number, start: number): Observable<Comments[]>{
    return this.httpClient.get<Comments[]>(API_URL+`/comment/getCommentByHouseIdPaging/${id}/${start}`);

  }
}
