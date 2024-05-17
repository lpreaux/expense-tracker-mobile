import {Component, Input, OnInit, signal} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Participant, ParticipantService} from "../../../../providers/participant.service";
import {GroupTrackerService} from "../../../group-tracker.service";
import {ModalController} from "@ionic/angular";
import {Expense} from "../../../../providers/expense.service";
import {Geolocation} from "@capacitor/geolocation";
import {Capacitor} from "@capacitor/core";
import {Camera, CameraResultType} from "@capacitor/camera";

@Component({
  selector: 'app-update-expense-form-modal',
  templateUrl: './update-expense-form-modal.component.html',
  styleUrls: ['./update-expense-form-modal.component.scss'],
})
export class UpdateExpenseFormModalComponent implements OnInit {
  @Input({required: true}) expense!: Expense;

  protected expenseForm = this.formBuilder.group({
    label: ['', Validators.required],
    amount: [0, Validators.required],
    locationType: ['', Validators.required],
    location: [''],
    participantId: ['', Validators.required],
  })
  protected proofImageUrl = signal<string | undefined>(undefined);

  protected participants = signal<Participant[] | undefined>(undefined)

  constructor(
    private groupTrackerService: GroupTrackerService,
    private participantService: ParticipantService,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.expenseForm.controls['locationType'].setValue('currentLocation');
    this.getParticpantFromGroup();

    this.expenseForm.controls['label'].setValue(this.expense.label);
    this.expenseForm.controls['amount'].setValue(this.expense.amount);
    this.expenseForm.controls['locationType'].setValue(this.expense.locationType);
    if (this.expense.locationType == "other") {
      this.expenseForm.controls['location'].setValue(this.expense.location);
    }
    this.expenseForm.controls['participantId'].setValue(String(this.expense.participantId));
    this.proofImageUrl.set(this.expense.proofImgUrl);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    const newExpense: Partial<Expense> = Object.assign(this.expenseForm.getRawValue(), {
      proofImageUrl: this.proofImageUrl(),
    } as Partial<Expense>);
    if (newExpense.locationType === 'currentLocation') {
      const position = await Geolocation.getCurrentPosition();

      // Extract serializable properties from the GeolocationPosition object to the new Expense
      // (The Position object obtain with `await Geolocation.getCurrentPosition()` isn't serializable)
      newExpense.location = {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          accuracy: position.coords.accuracy,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed
        },
        timestamp: position.timestamp
      };

    }
    return this.modalCtrl.dismiss(newExpense, 'confirm');
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

  private getParticpantFromGroup() {
    const group = this.groupTrackerService.currentGroup();
    if (group) {
      this.participantService.getAllByGroup(group)
        .subscribe(participants => this.participants.set(participants));
    }
  }

  protected readonly String = String;}
