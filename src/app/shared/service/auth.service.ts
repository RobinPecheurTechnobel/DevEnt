import { Inject, Injectable, OnInit } from '@angular/core';
import { Member, User } from '../model/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../model/login';
import { myApiErrorObject } from '../model/error';

/**
 * Service responsable de la gestion de l'authentification de l'utilisateur de l'application
 * 
 * Ici démarre les requêtes vers le Backend pour vérifier un utilisateur ou pour inscrire un nouveau.
 * 
 * Tout composant nécessitant de l'information de l'utilisateur connecté doit "subscribe" au $connectedMember
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService{

  /**
   * BehaviourSubject utilisé pour changer la valeur de l'utilisateur connecté
   */
  private _$connectedMember : BehaviorSubject< Member | undefined > = new BehaviorSubject < Member | undefined >(this.getMember());
  /**
   * Version *Observable* de _$connectedMember
   * 
   * Les composants qui ont besoin des informations de l'utilisateur connecté peuvent **subscribe** ici pour 
   * bénéficier des changements de valeur de _member
   */
  $connectedMember : Observable< Member | undefined > = this._$connectedMember.asObservable();
  /**
   * Objet contenant les informations de l'utilisateur connecté
   */
  private _member : Member | undefined;

  /**
   * EndPoint disponible du backend à contacter pour le login
   */
  private _loginEndPoint : string = "api/Auth/Login";
  /**
   * EndPoint disponible du backend à contacter pour l'inscritpion d'un nouvel utilisateur
   */
  private _registerEndPoint : string = "api/Auth/Register";

  private _memberByIdEndPoint : string = "api/Member/";

  /**
   * Constructeur du service
   * 
   * @param _urlBase prend le paramétre centralisé de la base de l'api depuis l'app-module
   * @param _httpClient Service envoyant des requêtes http
   */
  constructor( @Inject('urlBase') private _urlBase : string,
          private _httpClient : HttpClient ) {
            
    let memberId = localStorage.getItem("id");
    let token = localStorage.getItem("deventToken");
    if(memberId && token){
      this._getMemberById(+memberId);
    }
  }

  /**
   * Méthode renvoyant l'information de l'utilisateur
   * 
   * @returns { Member | undefined } l'utilisateur connecté **ou** undefined si personne n'est connecté
   */
  getMember() : Member |undefined{
    return this._member;
  }

  /**
   * Méthode de login
   * 
   * Fait appel à une méthode privé
   * 
   * Et donne un observable au composant qui en a fait l'appel. Ainsi, il recevra le résultat par la suite
   * 
   * Cette étape permet le mapping des éléments reçus
   *  
   * @param identifier identifiant de l'utilisateur
   * @param password mot de passe de l'utilisateur
   * @returns un observable qui renverra le résultat de la requête
   */
  login (identifier:string, password:string) : Observable< Member | undefined > {

    this._loginToApi(identifier, password).subscribe({
      // Si ça se passe bien
      next : ( value ) =>{
        localStorage.setItem("deventToken", value.token);
        this._$connectedMember.next(value.member);
        localStorage.setItem("id", value.member.id!.toString());
      },
      // En cas d'erreur
      error : ( error ) => {
        let errorReceived = error as myApiErrorObject;
        this._$connectedMember.error(errorReceived.error.errors.Message[0]);
      }
    });

    return this.$connectedMember;
  }
  /**
   * Méthode privé faisant la requête http pour le login
   * 
   * @param identifier l'identifiant de l'utilisateur
   * @param password le mot de passe de l'utilisateur
   * @returns un observable qui renverra le résultat de la requête
   */
  private _loginToApi(identifier:string, password:string) : Observable<User> {

    let login : Login = new Login( identifier,password);
    return this._httpClient.post<User>( this._urlBase + this._loginEndPoint, login );
  }

  private _getMemberById(memberId : number) : void{

    this._httpClient.get<Member>( this._urlBase + this._memberByIdEndPoint + memberId).subscribe({
      next : (response) => {
        
        this._$connectedMember.next(response);
      }
    })
  }

  /**
   * Méthode d'inscription d'un nouvel utilisateur
   * 
   * appelé cette méthode implique des données vérifiées par des validateurs
   * 
   * @param member L'objet *utilisateur* qui contient les données de notre formulaire
   * @returns un observable qui renverra le résultat de la requête
   */
  register (member : Member) : Observable<Member>{
    let observable = this._httpClient.post<Member>( this._urlBase + this._registerEndPoint, member);
    return observable;
  }

  /**
   * Procédure de déconnection
   * 
   * + nettoyage du localstorage
   */
  disconnection() : void {

    //vider le localStorage
    localStorage.clear();

    this._$connectedMember.next(undefined);
  }
}
