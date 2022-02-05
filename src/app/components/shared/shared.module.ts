import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day/day.component';



@NgModule({
  declarations: [DayComponent],
  imports: [
    CommonModule
  ],
  exports: [DayComponent]
})
export class SharedModule { }
