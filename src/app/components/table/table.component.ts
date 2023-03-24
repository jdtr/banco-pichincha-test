import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipokemon } from 'src/app/helpers/pokemon.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data!: Ipokemon[];
  @Output() editEvent: EventEmitter<number> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  public quoteRegex = /\'\'/;

  constructor() { }

  onEdit(id: number) {
    this.editEvent.emit(id);
  }
  onDelete(id: number) {
    this.deleteEvent.emit(id);
  }
}
