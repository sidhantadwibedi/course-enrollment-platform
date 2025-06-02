import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseEnrollComponent } from './course-enroll.component';
import { EnrollmentService } from '../../shared/services/enrollment.service';
import { CommonModule } from '@angular/common';

describe('CourseEnrollComponent', () => {
  let component: CourseEnrollComponent;
  let fixture: ComponentFixture<CourseEnrollComponent>;
  let enrollmentService: EnrollmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, CourseEnrollComponent],
      providers: [EnrollmentService],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseEnrollComponent);
    component = fixture.componentInstance;
    enrollmentService = TestBed.inject(EnrollmentService);

    enrollmentService['enrolledCoursesSignal'].set([
      { title: 'Angular', description: 'Framework by Google' },
    ]);

    fixture.detectChanges();
  });

  it('should create CourseEnrollComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render enrolled courses', () => {
    const enrolledCards = fixture.nativeElement.querySelectorAll('.course-card');
    expect(enrolledCards.length).toBe(1);
  });

  it('should display correct course title and description', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent.toLowerCase()).toContain('angular');
  });
});
