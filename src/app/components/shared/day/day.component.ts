import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {

  @Input() day: string;
  @Input() dayOfWeek: string;

  constructor() {
    
   }

  ngOnInit() {
    this.dayOfWeek = `${this.dayOfWeek.substring(0, 3)}.`;
  }

}
