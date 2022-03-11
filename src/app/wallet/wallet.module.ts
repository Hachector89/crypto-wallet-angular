import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OperationsComponent } from './pages/operations/operations.component';
import { MaterialModule } from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    OperationsComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WalletModule { }
