import { Component, OnInit } from '@angular/core';
import {Image} from '../Image';
import {ImageFetcherService} from '../image-fetcher.service';
import {MatDialog} from '@angular/material';
import {EditModalComponent} from './edit-modal/edit-modal.component';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: Image[];
  imageToEdit: any;
  breakpoint;
  constructor(private service: ImageFetcherService, private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchImages();
    this.setBreakPoint(window.innerWidth);
  }
  // fetch images from the remote source using a service
  fetchImages() {
    this.service.getImages().subscribe(images => {
      this.images = images;
      // generate the blobs of the images
      this.images.map(image => {
        this.service.getImage(image.image_url).subscribe(blob => {
          image.blob = blob;
        });
      });
    });
  }
  onResize(event) {
    this.setBreakPoint(event.target.innerWidth);
  }
  // Resolves the col breakpoint based on the screen width to make the grid responsive
  setBreakPoint(width) {
    if (width > 800)
      this.breakpoint = 4;
    else if (width < 800 && width > 420)
      this.breakpoint = 2;
    else
      this.breakpoint = 1;
  }
  // Delete image; for now splicing it from the array
  deleteImage(index) {
    this.images.splice(index, 1);
  }
  // Edit image; opening the dialog for image cropping
  editImage(index){
    let width = '50%';
    switch (this.breakpoint) {
      case 4: {
        width = '50%'; break;
      }
      case 1: {
        width = '100%'; break;
      }
      case 2: {
        width = '75%'; break;
      }
    }
    const modalRef = this.dialog.open(EditModalComponent, {
      width: width,
      data: this.images[index].blob
    });

    modalRef.afterClosed().subscribe((result: ImageCroppedEvent) => {
      this.images[index].image_url = result.base64;
      this.images[index].blob = result.file;
    });

  }

}
