import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [FormBuilder, HttpClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit a value when keyup', () => {
    spyOn(component.searchEvent, 'emit');
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler("keyup", null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.searchEvent.emit).toHaveBeenCalledWith("pikachu");
    })
  });

});
