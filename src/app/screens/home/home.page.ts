import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { NewTaskPage } from '../new-task/new-task.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  daysOfWeek = [];
  month: string = '';
  monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  daysOfWeekName = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  year: number = 0;

  compromissos = [];
  usuario = '';
  filtro = '';
  constructor(
    private modalCtrl: ModalController,
    private firestore: AngularFirestore
  ) {
    let now = moment().toDate();
    let counter = 1;
    this.year = now.getFullYear();
    this.month = this.monthNames[now.getMonth()];
    this.daysOfWeek.push({
      day: now.getDate(),
      dayOfWeek: this.daysOfWeekName[now.getDay()],
    });
    while (counter <= 4) {
      let newDate = moment().add(counter, 'd').toDate();
      this.daysOfWeek.push({
        day: newDate.getDate(),
        dayOfWeek: this.daysOfWeekName[newDate.getDay()],
      });
      counter++;
    }
  }

  async ngOnInit() {
    this.firestore
      .collection('compromissos', (ref) =>
        ref.where('usuario', '==', this.usuario)
      )
      .snapshotChanges()
      .subscribe((data) => {
        this.compromissos = [];
        data.map((item) => {
          this.compromissos.push(item.payload.doc.data());
        });
      });
  }

  pesquisar() {
    console.log('Pesquisando compromisso...');
    this.firestore
      .collection('compromissos', (ref) =>
        this.filtro == ''
          ? ref.where('usuario', '==', this.usuario)
          : ref
              .where('usuario', '==', this.usuario)
              .where('nome', '==', this.filtro)
              .orderBy("data")
      )
      .snapshotChanges()
      .subscribe((data) => {
        this.compromissos = [];
        data.map((item) => {
          this.compromissos.push(item.payload.doc.data());
        });
      });
  }

  async openNewTask() {
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
      cssClass: 'newTaskModal',
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 1],
    });
    return await modal.present();
  }
}
