/**
 * Class utilisée pour la connection d'un utilisateur
 */
export class Login{
    /**
     * Pseudo ou email pour s'identifier
     */
    identifier : string;

    /**
     * mot de passe de l'utilisateur
     */
    password: string;

    /**
     * constructeur
     */
    constructor(identifier : string , password : string) {
        this.identifier = identifier;
        this.password = password;
    }
}