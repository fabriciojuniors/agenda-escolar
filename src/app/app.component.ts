import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Agenda', url: '/', icon: 'calendar-number-outline' },
    { title: 'Horário Escolar', url: '/2', icon: 'time-outline' },
    { title: 'Perfil', url: '/2', icon: 'person-outline' },
    { title: 'Preferências', url: '/2', icon: 'cog-outline' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
