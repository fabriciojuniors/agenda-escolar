import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { v4 as v4 } from 'uuid';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  compromisso = {
    nome: '',
    descricao: '',
    data: '',
    lembrarEm: '',
    usuario: '',
  };

  constructor(
    private firestore: AngularFirestore,
    private toastController: ToastController,
    private modalController: ModalController,
    private auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe(user => {
      this.compromisso.usuario = user.uid;
    })    
  }

  ngOnInit() {}

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  salvar() {
    console.log(this.compromisso);

    this.firestore
      .collection('compromissos')
      .add(this.compromisso)
      .then((res) => {
        this.presentToast('Compromisso salvo com sucesso');
        this.modalController.dismiss();
      })
      .catch((err) => {
        this.presentToast('Erro ao salvar o compromisso. ' + err);
      });
  }
}
