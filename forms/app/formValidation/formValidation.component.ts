import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';

function usernameValidator(control:FormControl):{[s:string]:boolean} {
    if(!control.value.match(/[A-Z | a-z]/g)){
        return {invalidUsername:true};
    }
}

function useridValidator(control:FormControl):{[s:string]:boolean} {
    if(!control.value.match(/[0-9]/g)){
        return {invalidUserid:true};
    }
}

@Component({
    moduleId: module.id,
    selector: 'form-validation',
    templateUrl: 'formValidation.html',
    //directives:[REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES],
    styleUrls:['formValidation.style.css']
})

export class FormValidationComponent implements OnInit {
    myForm:FormGroup;
    username:AbstractControl;
    productname:string;

    constructor(fb:FormBuilder) {
        this.myForm = fb.group({
            'username' : ['', Validators.compose([Validators.required,usernameValidator])],
                'userid': ['', Validators.compose([Validators.required,useridValidator])],
                'productname':['']
            })
        //for single validation
        // this.myForm = fb.group({
        //     'username' : ['', Validators.required],
        //         'userid': ['', Validators.required]
        //     })
        //validation using form control instance method
        //this.username = this.myForm.controls['username'];
        //this.userid = this.myForm.controls['userid'];
     }

    ngOnInit() { }

    onSubmit(userobj:Object):void{
        console.log("values from form",userobj)
    }

}