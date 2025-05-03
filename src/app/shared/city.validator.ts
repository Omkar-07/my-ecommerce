import { AbstractControl } from "@angular/forms";

export function validateCity(control:AbstractControl){
    const indianCities=['Delhi','Mumbai','Chennai'];
    const value=control.value;
    if(indianCities.includes(value)){
        return null;
    }else{
        return {invalidCity:true};
    }
}