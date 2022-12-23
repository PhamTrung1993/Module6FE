import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comments} from "../model/comment";
import {environment} from "../../enviroments/environment";
import {Rating} from "../model/rating";
import {Order} from "../model/order";
import {RatingDTO} from "../model/ratingDTO";
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class HouseRatingService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(API_URL + `/rating/list`);
  }
  getStar(id:number): Observable<RatingDTO[]> {
    return this.httpClient.get<RatingDTO[]>(API_URL + `/rating/getstar/${id}`);
  }
  createRating(id:number, houses_id:number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(API_URL  + `/rating/createrating/${id}/${houses_id}`)
  }
  saveRating(houseRatingDTO: Rating): Observable<Rating> {
    return this.httpClient.post<Rating>(API_URL + `/rating/houserating`,houseRatingDTO)
  }
}
