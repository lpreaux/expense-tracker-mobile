import {Component, OnInit, signal} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder} from "@angular/forms";
import {Camera, CameraResultType} from "@capacitor/camera";
import {Capacitor} from "@capacitor/core";
import {Expense} from "../../../../providers/expense.service";

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

  protected proofImageUrl = signal<string | undefined>(undefined);

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const rawValue = Object.assign(this.expenseForm.getRawValue(), {
      proofImageUrl: this.proofImageUrl(),
    } as Partial<Expense>);
    return this.modalCtrl.dismiss(rawValue, 'confirm');
  }

  async takePicture() {
    if (Capacitor.getPlatform() !== 'web') {
      const permissionStatus = await Camera.checkPermissions();
      if (permissionStatus.camera !== 'granted' || permissionStatus.photos !== 'granted') {
        await Camera.requestPermissions()
      }
    } else {
      console.log("Camera permissions are not supported on the web platform.");
    }

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    const imageUrl = image.webPath;
    if (imageUrl) {
      this.proofImageUrl.set(imageUrl);
    }
  }
}
