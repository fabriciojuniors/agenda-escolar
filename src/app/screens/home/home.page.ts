import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  daysOfWeek = [];
  month: string = '';
  monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  daysOfWeekName = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  year: number = 0;
  constructor() {
    let now = moment().toDate();
    let counter = 1;
    this.year = now.getFullYear();
    this.month = this.monthNames[now.getMonth()];   
    this.daysOfWeek.push({
      day: now.getDate(),
      dayOfWeek: this.daysOfWeekName[now.getDay()]
    })
    while(counter <= 4){
      let newDate = moment().add(counter, 'd').toDate();
      this.daysOfWeek.push({
        day: newDate.getDate(),
        dayOfWeek: this.daysOfWeekName[newDate.getDay()]
      })
      counter++;      
    }
    
  }

  ngOnInit() {}

  pesquisar() {
    console.log('Pesquisando compromisso...');
  }
}
