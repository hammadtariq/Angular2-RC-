import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'form-group',
    templateUrl: 'formGroup.html',
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