import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {Participant} from "../../../../providers/participant.service";

@Component({
  selector: 'app-update-participant-form-modal',
  templateUrl: './update-participant-form-modal.component.html',
  styleUrls: ['./update-participant-form-modal.component.scss'],
})
export class UpdateParticipantFormModalComponent implements OnInit {
  @Input({required: true}) participant!: Participant;

  protected participantForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
  });

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.participantForm.controls['firstname'].setValue(this.participant.firstname);
    this.participantForm.controls['lastname'].setValue(this.participant.lastname);
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const updatedParticipant = Object.assign(this.participant, this.participantForm.getRawValue());
    this.modalCtrl.dismiss(updatedParticipant, 'confirm');
  }
}
