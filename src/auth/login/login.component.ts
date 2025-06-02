import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
  <input type="email" formControlName="email" placeholder="Email" />
  <div *ngIf="email.invalid && email.touched" style="color:red;">Enter a valid email</div>

  <input type="password" formControlName="password" placeholder="Password" />
  <div *ngIf="password.invalid && password.touched" style="color:red;">Password is required</div>

  <button type="submit" [disabled]="loginForm.invalid">Login</button>

  <div class="switch-auth">
    <span>Don't have an account?</span>
    <button type="button" (click)="goToRegister()">Register</button>
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
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }
    );
  }

  onSubmit() {
    if(this.loginForm.valid){
            if (this.loginForm.valid) {
              const { email, password } = this.loginForm.value;
              if (this.authService.login(email, password)) {
                this.router.navigate(['/courses']);
              } else {
                alert('Invalid credentials');
              }
            }
        }     
    }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  goToRegister() {
    this.router.navigate(['/auth/register'])
  }
}