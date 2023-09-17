import { Member } from "./user";

/**
 * model pour les enregistrement d'utilisateur participant à un event
 */
export interface Registration{
    /**
     * Membre inscrit
     */
    member : Member;
    /**
     * ses invités
     */
    nbGuest : number;
}