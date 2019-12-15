import {MainScreenRoutingModule} from './main-screen-routing.module';
import {CommonModule} from '@angular/common';
import {MainScreenComponent} from './main-screen.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [CommonModule, MainScreenRoutingModule],
  declarations: [MainScreenComponent]
})
export class MainScreenModule {
}

