"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
function usernameValidator(control) {
    if (!control.value.match(/[A-Z | a-z]/g)) {
        return { invalidUsername: true };
    }
}
function useridValidator(control) {
    if (!control.value.match(/[0-9]/g)) {
        return { invalidUserid: true };
    }
}
var FormValidationComponent = (function () {
    function FormValidationComponent(fb) {
        this.myForm = fb.group({
            'username': ['', forms_1.Validators.compose([forms_1.Validators.required, usernameValidator])],
            'userid': ['', forms_1.Validators.compose([forms_1.Validators.required, useridValidator])],
            'productname': ['']
        });
        //for single validation
        // this.myForm = fb.group({
        //     'username' : ['', Validators.required],
        //         'userid': ['', Validators.required]
        //     })
        //validation using form control instance method
        //this.username = this.myForm.controls['username'];
        //this.userid = this.myForm.controls['userid'];
    }
    FormValidationComponent.prototype.ngOnInit = function () { };
    FormValidationComponent.prototype.onSubmit = function (userobj) {
        console.log("values from form", userobj);
    };
    FormValidationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'form-validation',
            templateUrl: 'formValidation.html',
            //directives:[REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES],
            styleUrls: ['formValidation.style.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], FormValidationComponent);
    return FormValidationComponent;
}());
exports.FormValidationComponent = FormValidationComponent;
//# sourceMappingURL=formValidation.component.js.map