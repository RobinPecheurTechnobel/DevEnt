import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor utilisé par ajouter le token dans nos requête
 * 
 * Obligatoire pour certaine requête du backend
 */
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

/**
 * Methode d'interception des requetes
 * 
 * s'il y a un **token** enregistré dans le **localstorage**, celui est ajouté dans l'entête d'une copie de la requête capturée
 * 
 * le token est ajouté sous la propriété "**Authorization**" et commençant par "**Bearer **"
 * 
 * @param { HttpRequest< unknown > } request requéte intercepté
 * @param { HttpHandler } next "action" suivante après l'interception
 * @returns action suivante avec la requête "relâchée"
 */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  let token : string | null = localStorage.getItem("deventToken");

  if(token && token != ''){
    let requestClone = request.clone({setHeaders:{'Authorization' : `Bearer ${token}`}});
    return next.handle(requestClone);
  }

    return next.handle(request);
  }
}
