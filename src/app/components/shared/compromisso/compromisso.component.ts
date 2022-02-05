import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-compromisso',
  templateUrl: './compromisso.component.html',
  styleUrls: ['./compromisso.component.scss'],
})
export class CompromissoComponent implements OnInit {

  @Input() compromisso = {
    id: 0,
    data: moment().toDate().toLocaleDateString(),
    nome: '',
    descricao: ''
  };

  constructor() { }

  ngOnInit() {
  }

  formataData(data){
    return moment(data).format("DD/MM/yyyy HH:mm")
  }

}
