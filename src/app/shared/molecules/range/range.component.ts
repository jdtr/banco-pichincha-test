import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  @Input() label!: string;
  @Input() typeInput: string = "text";
  @Input() group!: FormGroup;
  @Input() controlName!: string;

  public value!: string;

  constructor() { }

  ngOnInit(): void {
  }

  rangeChange() {
    console.log(this.group.get(this.controlName)?.value)
    this.value = this.group.get(this.controlName)?.value;
  }

  styleRange() {
    return `linear-gradient(to right, #6657F7 0%, #6657F7 ${this.value}%, #fff ${this.value}%, white 100%)`
  }

}
