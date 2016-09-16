import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'card',
  templateUrl: 'card.component.html',
})
export class CardComponent implements OnInit { 
  @Input() id:number
  @Input() created:string
  @Input() updated:string
  @Input() type:string
  @Input() attempts:string
  @Input() duration:string

  showDetails:boolean
  count:number
  sideColor:string
  
  ngOnInit(){
    this.showDetails = false;
    this.count = 0;
    this.sideColor = this.getRandomColor()
  }

  getRandomColor(){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color.toString();
  }

  toggleDetails(){
     if(this.count%2 == 0){
          this.showDetails = true;
      }else{
          this.showDetails = false;
      }
      this.count++; 
  }

}
