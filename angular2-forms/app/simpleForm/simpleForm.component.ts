import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'simple-form',
    templateUrl: 'simpleForm.html'
})
export class SimpleFormComponent implements OnInit {
    username:string;
    constructor() { }

    ngOnInit() { }

    onSubmit2(obj){
        console.log("values from form",obj)
    }

}