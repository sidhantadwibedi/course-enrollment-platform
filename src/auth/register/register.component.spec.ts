import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form if fields are empty', () => {
    component.registrationForm.setValue({
      email: '',
      password: '',
      confirmPassword: ''
    });
    expect(component.registrationForm.invalid).toBeTrue();
  });

  it('should show password mismatch error if passwords do not match', () => {
    component.registrationForm.setValue({
      email: 'test@example.com',
      password: 'abc123',
      confirmPassword: 'xyz123'
    });

    expect(component.registrationForm.invalid).toBeTrue();
    expect(component.registrationForm.errors?.['passwordMismatch']).toBeTrue();
  });

  it('should store user in localStorage on valid submit', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');

    component.registrationForm.setValue({
      email: 'test@example.com',
      password: 'abc123',
      confirmPassword: 'abc123'
    });

    component.onSubmit();

    expect(setItemSpy).toHaveBeenCalledWith(
      'users',
      jasmine.any(String)
    );
  });
});
