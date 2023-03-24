import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent {

  @Input() label!: string;
  @Input() typeInput: string = "text";
  @Input() group!: FormGroup;
  @Input() controlName!: string;

  constructor() { }


}
