import { Injectable } from '@angular/core';
import { Member, User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _$connectedMember : BehaviorSubject< Member | undefined > = new BehaviorSubject < Member | undefined >(this.getMember());
  $connectedMember : Observable< Member | undefined > = this._$connectedMember.asObservable();
  private _member : Member | undefined;

  urlBase : string = "https://localhost:7245/";

  loginEndPoint : string = "api/Auth/Login";

  constructor( private _httpClient : HttpClient ) { }

  getMember() : Member |undefined{
    return this._member;
  }

  login (identifier:string, password:string) : Observable< Member | undefined > {
    console.log(identifier,password);
    this._loginToApi(identifier, password).subscribe({
      next : ( value ) =>{
        localStorage.setItem("deventToken", value.token);
        this._$connectedMember.next(value.member);
      },
      error : ( error ) => {
        this._$connectedMember.next(undefined);
      }
    });
    return this.$connectedMember;
  }
  private _loginToApi(identifier:string, password:string) : Observable<User> {

    let login : Login = new Login( identifier,password);
    return this._httpClient.post<User>( this.urlBase + this.loginEndPoint, login );
  }
}
