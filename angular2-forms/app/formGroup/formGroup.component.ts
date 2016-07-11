import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'form-group',
    templateUrl: 'formGroup.html',
    directives:[REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES]
})
export class FormGroupComponent implements OnInit {
    myForm:FormGroup;
    
    constructor(fb:FormBuilder) {
        this.myForm = fb.group({
            'username' : [''],
                'userid': ['']
            })
     }

    ngOnInit() { 

    }

    onSubmit(obj){
        console.log("values from form",obj)
    }

}