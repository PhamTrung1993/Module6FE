import {Injectable} from '@angular/core';
import {environment} from "../../enviroments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {Register} from "../model/register";

const API_URL = `${environment.apiUrl}`

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) {
  }

  // getAll(): Observable<User[]> {
  //   return this.http.get<User[]>(API_URL + '/register');
  // }

  findById(id: number) {
    return this.http.get<User>(`${API_URL}/users/${id}`);
  }

  save(register: Register): Observable<Register> {
    return this.http.post<Register>(API_URL + `/register`, register);
  }

  delete(id: number | undefined): Observable<User> {
    return this.http.delete<User>(`${API_URL}/users/${id}`);
  }

  editUser(id: number, temp: User) {
    return this.http.put<User>(`${API_URL}/users/${id}`, temp);
  }
}
