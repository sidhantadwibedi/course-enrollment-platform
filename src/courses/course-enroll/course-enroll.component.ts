import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../shared/services/enrollment.service';

@Component({
  selector: 'app-course-enroll',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="enrolled-courses">
      @if (enrolled().length > 0) {
        <h2>Enrolled Courses</h2>
        @for (course of enrolled(); track course.title) {
          <div class="course-card">
            <h3>{{ course.title }}</h3>
            <p>{{ course.description }}</p>
          </div>
        }
      } @else {
        <p>No courses enrolled yet.</p>
      }
    </section>
  `,
  styles: [`
    .enrolled-courses {
      max-width: 800px;
      margin: 40px auto;
      padding: 1rem;
    }

    .course-card {
      background: #e0f7fa;
      border: 1px solid #4dd0e1;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 16px;
    }

    h2 {
      color: #00796b;
      margin-bottom: 1rem;
    }

    h3 {
      margin: 0 0 8px;
    }

    p {
      margin: 0;
    }
  `]
})
export class CourseEnrollComponent {
    constructor(private enrollmentService: EnrollmentService) { }
    enrolled = computed(() => this.enrollmentService.enrolledCourses());
}