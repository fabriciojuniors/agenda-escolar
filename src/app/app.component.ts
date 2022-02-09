import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Agenda',
      url: '/',
      icon: 'calendar-number-outline',
      disabled: false,
    }
    // ,
    // {
    //   title: 'Horário Escolar',
    //   url: '/2',
    //   icon: 'time-outline',
    //   disabled: true,
    // },
    // { title: 'Perfil', url: '/2', icon: 'person-outline', disabled: true },
    // { title: 'Preferências', url: '/2', icon: 'cog-outline', disabled: true },
  ];
  displayName = '';
  email = '';
  id = '';
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((state) => {
      this.displayName = state.displayName;
      this.email = state.email;
      this.id = state.uid;
    });
  }
}
