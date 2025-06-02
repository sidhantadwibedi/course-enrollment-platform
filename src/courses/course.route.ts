import { Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseEnrollComponent } from './course-enroll/course-enroll.component';
import { AuthGuard } from '../shared/guards/auth.guard';

export const COURSE_ROUTES: Routes = [
    {
      path: '',
      component: CourseListComponent
    },
    {
      path: 'enrolled',
      component: CourseEnrollComponent,
      canActivate:[AuthGuard]
    }
  ];
  