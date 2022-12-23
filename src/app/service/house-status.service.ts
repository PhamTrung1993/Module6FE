import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../model/house";
import {Status} from "../model/status";
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class HouseStatusService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(API_URL + `/houseStatus/list`);
  }
}
