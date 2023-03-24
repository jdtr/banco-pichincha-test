import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { mockData } from 'src/app/helpers/data.mock';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update @Input value', () => {
    component.data = mockData;
    fixture.detectChanges();
    expect(component.data).toBeTruthy();
  });
  it('Should emit id when it does click in edit', () => {
    const spy = spyOn(component.editEvent, 'emit');
    component.data = mockData;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler("click", null);

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  })
});
