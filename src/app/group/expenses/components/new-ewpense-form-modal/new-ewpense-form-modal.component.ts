import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-new-ewpense-form-modal',
  templateUrl: './new-ewpense-form-modal.component.html',
  styleUrls: ['./new-ewpense-form-modal.component.scss'],
})
export class NewEwpenseFormModalComponent {

  protected expenseForm = this.formBuilder.group({
    label: [''],
    amount: [''],
  })

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.expenseForm.getRawValue(), 'confirm');
  }}
