import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {from} from 'rxjs';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  imageToEdit: any;
  croppedImage: ImageCroppedEvent;
  imageCropped: boolean;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  constructor(
    public modalRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Blob
    ) {
    this.imageCropped = false;
  }

  ngOnInit() {
    this.createImageFromBlob(this.data);
  }
  // convert the blob to base64 on load
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageToEdit = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  onNoClick(): void {
    this.modalRef.close();
  }
  cropImage(): void {
    // @ts-ignore
    const observable = from(this.imageCropper.crop('both'));
    observable.subscribe((result: ImageCroppedEvent) => this.croppedImage = result);
    this.imageCropped = true;
  }


}
