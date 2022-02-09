import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario = {
    email: '',
    senha: '',
  };
  constructor(
    private menuCtrl: MenuController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private auth: AngularFireAuth,
    private router : Router
  ) {
    this.menuCtrl.enable(false, 'menu');
  }

  ngOnInit() {}

  async presentLoad(msg) {
    let load = await this.loadingController.create({
      message: msg,
    });
    load.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  entrar() {
    this.presentLoad('Autenticando...');
    this.auth
      .signInWithEmailAndPassword(this.usuario.email, this.usuario.senha)
      .then((res) => {
        this.router.navigate(["/home"])
      })
      .catch((err) => {
        this.presentLoad("Usuário ou senha inválidos.")
      })
      .finally(() => {
        this.loadingController.dismiss()
      })
  }
}
