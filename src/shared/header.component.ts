// header.component.ts
import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <h1>Course Enrollment Platform</h1>
      <nav>
      <a routerLink="/courses" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Courses</a>
      <span> || </span>
      <a routerLink="/courses/enrolled" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Enrolled Courses</a>
    </nav>
      <div class="user-info" *ngIf="currentUser()">
        <span>{{ currentUser()?.email }}</span>
        <button (click)="logout()">Logout</button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #1976d2;
      color: white;
    }
    .user-info {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
        
    nav a {
      text-decoration: none;
      padding: 8px 16px;
      margin: 0 5px;
      color: white;
      font-weight: bold;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    nav a.active {
      background-color: #1976d2;
      color: yellow;
    }

    button {
      background-color: #f44336;
      border: none;
      padding: 6px 12px;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class HeaderComponent {
  currentUser = signal<{ email: string } | null>(null);

  constructor(private router: Router, private authService:AuthService) {
      const user = localStorage.getItem('currentUser');
      this.currentUser.set(user ? JSON.parse(user) : null);
  }

  logout() {
   this.authService.logout();
  }
}
