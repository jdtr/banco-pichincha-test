import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, debounceTime, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  public formSearch!: FormGroup;
  private _keyupInput$!: Subscription;

  @Output() searchEvent: EventEmitter<string> = new EventEmitter();
  @ViewChild("input") public input!: ElementRef;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm () {
    this.formSearch = this._fb.group({
      search: ["", [Validators.required]]
    })
  }

  ngAfterViewInit(): void {
    const keyupInput$ = fromEvent(this.input.nativeElement, 'keyup');

    this._keyupInput$ = keyupInput$
      .pipe(
        map((i: any) => {
          if (i.key.toLowerCase() === 'enter') return null;
          return this.formSearch.get("search")?.value;
        }),
        debounceTime(500)
      )
      .subscribe((val) => {
        if (val === null) return;
        this.searchEvent.emit(val)
      });
  }

}
