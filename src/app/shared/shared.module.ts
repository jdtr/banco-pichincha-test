import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BtnComponent } from './atoms/btn/btn.component';
import { RangeComponent } from './molecules/range/range.component';
import { SearchComponent } from '../components/search/search.component';
import { TableComponent } from '../components/table/table.component';
import { FormGroupComponent } from './molecules/form-group/form-group.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BtnComponent,
    RangeComponent,
    SearchComponent,
    TableComponent,
    FormGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BtnComponent,
    RangeComponent,
    SearchComponent,
    TableComponent,
    FormGroupComponent
  ]
})
export class SharedModule { }
