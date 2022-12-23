import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {House} from "../model/house";
import {environment} from "../../enviroments/environment";
import {Image} from "../model/Image";
import {EmailDetails} from "../model/emailDetails";

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<House[]> {
    return this.httpClient.get<House[]>(API_URL + `/house/list`);
  }
  getAllHouse(start: number): Observable<House[]> {
    return this.httpClient.get<House[]>(API_URL + `/house/list/${start}`);
  }

  saveHouse(house: House, id: number): Observable<House> {
    return this.httpClient.post<House>(API_URL + `/house/create/${id}`, house);

  }

  findById(id: number): Observable<House> {
    return this.httpClient.get<House>(`${API_URL}/house/imageString/${id}`);
  }

  findImageByHouseId(id: number): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${API_URL}/image/house/${id}`);
  }

  updateStatus(id: number, idStatus: number): Observable<House> {
    return this.httpClient.put<House>(`${API_URL}/house/updateStatus/${id}/${idStatus}`, id);
  }

  sendMail(emailDetails: EmailDetails): Observable<EmailDetails> {
    return this.httpClient.post<EmailDetails>(`${API_URL}/sendMail`, emailDetails);
  }


  get5house(): Observable<House[]> {
    return this.httpClient.get<House[]>(API_URL + `/house/list5house`);
  }

  findByUserId(id: number): Observable<House[]> {
    return this.httpClient.get<House[]>(`${API_URL}/house/findByUser/${id}`)
  }
  findByAll(bedrooms: string,
            bathrooms: string,
            address: string,
            rentMin: number,
            rentMax: number,
            startTime: string,
            endTime: string)
            : Observable<House[]>{
    let params = new HttpParams()
      .set('bedrooms', bedrooms)
      .set('bathrooms', bathrooms)
      .set('address', address)
      .set('rentMin', rentMin)
      .set('rentMax', rentMax)
      .set('endTime', endTime)
      .set('startTime', startTime);

    return this.httpClient.get<House[]>(`${API_URL}/house/search`, {params: params});

  }
}
