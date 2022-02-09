import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario = {
    nome: '',
    email: '',
    senha: '',
  };

  constructor(
    private menuCtrl: MenuController,
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.menuCtrl.enable(false, 'menu');
  }

  ngOnInit() {}

  async presentToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  registrar() {
    this.auth.createUserWithEmailAndPassword(
      this.usuario.email,
      this.usuario.senha
    ).then(res => {
      res.user.updateProfile({displayName: this.usuario.nome});
    });
    this.presentToast('Registro concluído com sucesso!');
    this.router.navigateByUrl('/login');
  }
}
