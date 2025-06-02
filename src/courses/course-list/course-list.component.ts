// courses.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '../../shared/pipes/title-case.pipe';
import { Router } from '@angular/router';
import { EnrollmentService } from '../../shared/services/enrollment.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  template: `
    <div class="course-container">
      <h2>Available Courses</h2>
      @for (course of courses; track course.title) {
        <div class="course-card">
          <h3>{{ course.title | titleCase }}</h3>
          <p>{{ course.description }}</p>
          <button (click)="enroll(course)">Enroll</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .course-container {
      max-width: 800px;
      margin: 40px auto;
      padding: 1rem;
    }

    .course-card {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .course-card:hover {
      transform: translateY(-2px);
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 28px;
      color: #1976d2;
    }

    h3 {
      margin: 0 0 10px;
      font-size: 20px;
      color: #333;
    }

    p {
      margin: 0 0 15px;
      color: #555;
    }

    button {
      background-color: #1976d2;
      color: white;
      font-weight: bold;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #1565c0;
    }
  `]
})
export class CourseListComponent {

    constructor(private router:Router,
                private enrollmentService: EnrollmentService
    ) {

    }
  courses = [
      { id: 1, title: 'angular basics', description: 'Learn the fundamentals of Angular.' },
      { id: 2, title: 'advanced angular', description: 'Deep dive into advanced Angular concepts.' },
      { id: 3, title: 'typescript essentials', description: 'Master TypeScript for Angular development.' }
  ];

  enroll(course: any) {
    this.enrollmentService.enroll(course);
    alert(`${course.title} enrolled!`);
  }
}
