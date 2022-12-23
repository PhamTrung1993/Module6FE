import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../model/house";
import {EmailDetails} from "../model/emailDetails";
const API_URL = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }
  sendMail(emailDetails: EmailDetails): Observable<EmailDetails> {
    debugger
  return this.httpClient.post<EmailDetails>( `${API_URL}/sendMail`, emailDetails );
}
  getAll(): Observable<House[]> {
    return this.httpClient.get<House[]>(API_URL + `/house/list`);
  }

}
