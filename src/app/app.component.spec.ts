import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [HttpClient]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a form', () => {
    expect(component.formCreate).toBeDefined();
  });
  
  it('should be invalid when empty', () => {
    expect(component.formCreate.valid).toBeFalsy();
  });

  it('should be valid when all fields are filled', () => {
    component.formCreate.get('name')?.setValue('New pokemon');
    component.formCreate.get('image')?.setValue('http://www.image.com');
    component.formCreate.get('attack')?.setValue(60);
    component.formCreate.get('defense')?.setValue(50);
    expect(component.formCreate.valid).toBeTruthy();
  });
});
