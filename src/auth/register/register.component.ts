// auth/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
  <input formControlName="email" placeholder="Email" />
  <div *ngIf="email.invalid && email.touched" style="color:red;">Enter a valid email</div>

  <input type="password" formControlName="password" placeholder="Password" />
  <div *ngIf="password.invalid && password.touched" style="color:red;">Password is required</div>

  <input type="password" formControlName="confirmPassword" placeholder="Confirm Password" />
  <div
    *ngIf="
      registerForm.errors?.['passwordMismatch'] &&
      confirmPassword.touched &&
      confirmPassword.value !== ''
    "
    style="color:red;"
  >
    Passwords do not match
  </div>

  <button type="submit" [disabled]="registerForm.invalid">Register</button>

  <div class="switch-auth">
    <span>Already have an account?</span>
    <button type="button" (click)="goToLogin()">Login</button>
  </div>
</form>
    
  `,
  styles: [`
    form {
      max-width: 400px;
      margin: 50px auto;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      background: #fff;
    }
  
    input {
      display: block;
      width: 100%;
      margin-bottom: 12px;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  
    button {
      width: 100%;
      padding: 10px;
      background-color: #1976d2;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  
    button:hover {
      background-color: #1565c0;
    }
  
    div[style*="color:red"] {
      font-size: 14px;
      margin-top: -10px;
      margin-bottom: 10px;
    }
  
    .switch-auth {
      text-align: center;
      margin-top: 15px;
    }
  
    .switch-auth button {
      background: transparent;
      color: #1976d2;
      border: none;
      text-decoration: underline;
      cursor: pointer;
      font-size: 14px;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder , private router: Router) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSubmit() {
    if (this.registerForm.valid) {
        const { email, password } = this.registerForm.value;
    
        const users = JSON.parse(localStorage.getItem('users') || '[]');
    
        const userExists = users.some((u: any) => u.email === email);
        if (userExists) {
          alert('User already exists');
          return;
        }
    
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! Please login.');
        this.router.navigate(['/auth/login']);

    }
  }
}
