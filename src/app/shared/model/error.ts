/**
 * format d'erreur envoyé par le backend
 */
export interface myApiErrorObject{
    /**
     * objet erreur encapsulé
     */
    error:ApiError;
}

/**
     * objet erreur encapsulé
     */
export interface ApiError{
    /**
     * object erreur encore plus encapsulé
     */
    errors: ErrorDetail;
}

/**
 * object erreur encore plus encapsulé
 * 
 * peut contenir des listes variées de messages d'erreurs
 * p.e. : Message, pseudo (message d'erreur lié au pseudo), ...
 */
export interface ErrorDetail{
    /**
     * liste de message d'erreur
     */
    Message : string[];
}