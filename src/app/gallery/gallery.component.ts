import { Component, OnInit } from '@angular/core';
import {Image} from '../Image';
import {ImageFetcherService} from '../image-fetcher.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: Image[];
  breakpoint;
  constructor(private service: ImageFetcherService) { }

  ngOnInit() {
    this.fetchImages();
    this.setBreakPoint(window.innerWidth);
  }
  fetchImages(){
    this.service.getImages().subscribe(images => this.images = images);
  }
  onResize(event) {
    this.setBreakPoint(event.target.innerWidth);
  }
  setBreakPoint(width){
    if (width > 800)
      this.breakpoint = 4;
    else if (width < 800 && width > 420)
      this.breakpoint = 2;
    else if (width < 420)
      this.breakpoint = 1;
  }

}
