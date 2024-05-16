import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, Validators} from "@angular/forms";
import {Group} from "../../../providers/group.service";

@Component({
  selector: 'app-update-group-form-modal',
  templateUrl: './update-group-form-modal.component.html',
  styleUrls: ['./update-group-form-modal.component.scss'],
})
export class UpdateGroupFormModalComponent implements OnInit{
  @Input() group!: Group;

  protected groupForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.groupForm.get('name')?.setValue(this.group.name);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const updatedGroup = Object.assign(this.group, this.groupForm.getRawValue());
    return this.modalCtrl.dismiss(updatedGroup, 'confirm');
  }
}
