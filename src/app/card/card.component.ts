import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input() img: string;
@Input() title: string;
@Input() index: number;
@Output() delete = new EventEmitter();
@Output() edit = new EventEmitter();
hovered: boolean;
  constructor() {
    this.hovered = false;
  }

  ngOnInit() {
  }

  // Sends index of the card whose delete event is triggered
  deleteImage() {
    this.delete.emit(this.index);
  }
  // Sends index of the card whose edit event is triggered
  editImage() {
    this.edit.emit(this.index);
  }

}
