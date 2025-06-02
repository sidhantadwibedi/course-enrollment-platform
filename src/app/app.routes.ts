import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/auth/register', pathMatch: 'full' },
    {
      path: 'auth',
      loadChildren: () => import('../auth/auth.route').then(m => m.AUTH_ROUTES)
    },
    {
      path: 'courses',
      loadChildren: () => import('../courses/course.route').then(m => m.COURSE_ROUTES)
    }
  ];