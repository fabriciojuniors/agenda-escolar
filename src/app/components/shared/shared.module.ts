import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';
import { CompromissoComponent } from './compromisso/compromisso.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [DayComponent, CompromissoComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [DayComponent, CompromissoComponent]
})
export class SharedModule { }
