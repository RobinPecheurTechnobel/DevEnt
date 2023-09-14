import { AbstractControl, ValidatorFn } from "@angular/forms";

export function confirmationValidator(firstControl : AbstractControl) : ValidatorFn |null{
    return (secondControl : AbstractControl) => {

        if(secondControl.value !== firstControl.value){
            return { notEquals : true };
        }

        return null;
    }
}