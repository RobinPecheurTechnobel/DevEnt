import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * Validateur servant à comparer la valeur d'un champs d'un formaulaire à une autre
 * 
 * Une "erreur" est renvoyé si les 2 valeurs sont différentes
 * 
 * @param { AbstractControl } firstControl control qui doit être reproduit
 * @returns une "erreur" de validation **ou** null
 */
export function confirmationValidator(firstControl : AbstractControl) : ValidatorFn |null{
    return (secondControl : AbstractControl) => {

        if(secondControl.value !== firstControl.value){
            return { notEquals : true };
        }

        return null;
    }
}