import {Component} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-group-form-modal',
  templateUrl: './new-group-form-modal.component.html',
  styleUrls: ['./new-group-form-modal.component.scss'],
})
export class NewGroupFormModalComponent {
  protected groupForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.groupForm.getRawValue(), 'confirm');
  }
}
