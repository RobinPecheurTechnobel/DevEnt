/**
 * Model décrivant un évènement
 */
export interface Event{
    /**
     * id de l'event dans la db
     */
    id : number | undefined;
    /**
     * titre de l'event
     */
    name : string;
    /**
     * Description de l'event
     */
    description : string | undefined;
    /**
     * Date de début de l'event
     */
    startDate : Date;
    /**
     * Date de fin de l'event
     */
    endDate : Date;
    /**
     * nombre optionnel du maximum de participant
     */
    maxGuest : number | undefined;
    /**
     * Boolean indiquant si un event est annulé ou pas
     */
    isCancel : boolean;
    /**
     * id du créateur
     */
    creatorId : number;

    /**
     * objet pouvant accompagné l'event
     */
    image :Image | undefined;
}

/**
 * model d'image pouvant accompagné un évènement
 */
export interface Image{
    /**
     * Nom de l'image
     */
    name : string;
    /**
     * Blob de l'image
     */
    data : string;
}