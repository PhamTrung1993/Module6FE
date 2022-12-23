import { Injectable } from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {

  }
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + '/findAllUsers');
  }

    getUserProfile(id: number): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }
  updateUserProfile(id: number, user: User): Observable<User> {
    return this.http.put<User>(API_URL + `/users/${id}`, user);
  }
  changePassword(id:number, password: string): Observable<User> {
    return  this.http.put<User>(API_URL + `/editPassword/${id}`,password)
  }

}
