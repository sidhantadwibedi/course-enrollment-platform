import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: { login: () => true } },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should validate form with valid credentials', () => {
    component.loginForm.setValue({ email: 'sidha@example.com', password: 'sidh' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call login and navigate on submit', () => {
    spyOn(authService, 'login').and.returnValue(true);
    component.loginForm.setValue({ email: 'user@example.com', password: 'password' });
    component.onSubmit();
    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });
});
