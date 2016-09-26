import { FormControl } from '@angular/forms';

function itemNameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && !control.value.match(/[A-Z | a-z]/g)) {
        return {invaliditemName: true};
    }
}

function amountValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && !control.value.match(/[0-9]/g)) {
        return {invalidAmount: true};
    }
}

export { itemNameValidator, amountValidator };
