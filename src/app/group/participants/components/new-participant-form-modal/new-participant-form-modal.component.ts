import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-new-participant-form-modal',
  templateUrl: './new-participant-form-modal.component.html',
  styleUrls: ['./new-participant-form-modal.component.scss'],
})
export class NewParticipantFormModalComponent {
  protected participantForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
  });

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {
  }


  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(this.participantForm.getRawValue(), 'confirm');
  }
}
