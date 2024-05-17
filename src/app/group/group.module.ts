import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupComponent } from './group.component';
import {BalancePage} from "./balance/balance.page";
import {ParticipantsPage} from "./participants/participants.page";
import {SharedModule} from "../shared/shared.module";
import {UpdateGroupFormModalComponent} from "./components/update-group-form-modal/update-group-form-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupPageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    GroupComponent,
    BalancePage,
    ParticipantsPage,
    UpdateGroupFormModalComponent,
  ]
})
export class GroupPageModule {}
