import { Inject, Injectable } from '@angular/core';
import { Member, User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { myApiErrorObject } from '../model/error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _$connectedMember : BehaviorSubject< Member | undefined > = new BehaviorSubject < Member | undefined >(this.getMember());
  $connectedMember : Observable< Member | undefined > = this._$connectedMember.asObservable();
  private _member : Member | undefined;

  private _loginEndPoint : string = "api/Auth/Login";
  private _registerEndPoint : string = "api/Auth/Register";

  constructor( @Inject('urlBase') private _urlBase : number,
          private _httpClient : HttpClient ) { }

  getMember() : Member |undefined{
    return this._member;
  }

  login (identifier:string, password:string) : Observable< Member | undefined > {

    this._loginToApi(identifier, password).subscribe({
      // Si ça se passe bien
      next : ( value ) =>{
        localStorage.setItem("deventToken", value.token);
        this._$connectedMember.next(value.member);
      },
      // En cas d'erreur
      error : ( error ) => {
        let errorReceived = error as myApiErrorObject;
        this._$connectedMember.error(errorReceived.error.errors.Message[0]);
      }
    });

    return this.$connectedMember;
  }
  private _loginToApi(identifier:string, password:string) : Observable<User> {

    let login : Login = new Login( identifier,password);
    return this._httpClient.post<User>( this._urlBase + this._loginEndPoint, login );
  }

  register (member : Member) : Observable<Member>{
    let observable = this._httpClient.post<Member>( this._urlBase + this._registerEndPoint, member);
    console.log(member);
    return observable;
  }
}
