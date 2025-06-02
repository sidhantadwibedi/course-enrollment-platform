import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCoursesSignal = signal<any[]>([]);

  enrolledCourses = this.enrolledCoursesSignal.asReadonly();

  enroll(course: any) {
    const current = this.enrolledCoursesSignal();

    
    // Check if course already exists by id
    const alreadyEnrolled = current.some(c => c.id === course.id);
    if (alreadyEnrolled) {
        alert('You are already enrolled in this course.');
        return; // Skip adding duplicate
    }

    this.enrolledCoursesSignal.set([...current, course]);
  }

  clear() {
    this.enrolledCoursesSignal.set([]);
  }
}
