import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'list',
  templateUrl: 'list.component.html'
})
export class ListComponent {
  @Input() cards:Object
  @Input() Title:string

 }
