/**
 * Interface utilisateur tel qu'il est reçu par la WebApi
 */
export interface User{
    /**
     * token fournit par l'Api pour les requêtes
     * 
     * A conserver précieusement !
     */
    token : string;

    /**
     * Les informations de l'utilisateur
     */
    member : Member;
}

/**
 * Information détaillé de l'utilisateur
 */
export class Member {
    /**
     * Id de la db
     * 
     * Util pour certaine requête db
     */
    id : number|undefined;

    /**
     * Pseudo de l'utilisateur
     * 
     * Est requis et unique
     */
    pseudo :string;

    /**
     * Email de la personne
     * 
     * Est requis et unique
     */
    email: string;

    /**
     * Prénom de l'utilisateur
     * 
     * Est requis
     */
    firstName : string;

    /**
     * Nom de famille de l'utilisateur
     * 
     * Est requis
     */
    lastName: string;

    /**
     * mot de passe de l'utilisateur
     * 
     * n'est pas null en cas d'inscription
     */
    password : string|undefined;

    /**
     * Date de naissance de l'utilisateur
     * 
     * optionnel
     */
    birthdate: Date|undefined;

    /**
     * Constructeur avec les éléments requis
     * 
     * Ce qui n'est pas indiqué reste undifened jusqu'à leur définition
     */
    constructor( pseudo:string, email:string, firstName :string, lastName:string ) {
        this.pseudo = pseudo;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * Définition de l'id
     * 
     * @param { number } id  id de l'utilisateur dans la db
     */
    public setId(id : number){
        this.id = id;
    }
    /**
     * Définition de la date de naissance
     * 
     * @param { Date } birthdate date de naissance
     * 
     */
    public setBirthdate ( birthdate : Date){
        this.birthdate = birthdate;
    }
    /**
     * Définition du mot de passe
     * 
     * @param { string } password mot de passe
     * 
     */
    public setPassword ( password : string){
        this.password = password;
    }
}