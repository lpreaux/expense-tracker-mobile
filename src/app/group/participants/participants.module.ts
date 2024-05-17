import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantsRoutingModule } from './participants-routing.module';
import {
  NewParticipantFormModalComponent
} from "./components/new-participant-form-modal/new-participant-form-modal.component";
import {IonicModule} from "@ionic/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {
  UpdateParticipantFormModalComponent
} from "./components/update-participant-form-modal/update-participant-form-modal.component";


@NgModule({
  declarations: [
    NewParticipantFormModalComponent,
    UpdateParticipantFormModalComponent,
  ],
  imports: [
    CommonModule,
    ParticipantsRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class ParticipantsModule { }
