import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasActiveSession());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router) {}

  private hasActiveSession(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  login(email: string, password: string): boolean {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const matchedUser = storedUsers.find(u => u.email === email && u.password === password);

    if (matchedUser) {
      localStorage.setItem('currentUser', JSON.stringify(matchedUser));
      this.loggedIn.next(true);
      return true;
    }

    this.loggedIn.next(false);
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  getCurrentUser(): User | null {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }
}
