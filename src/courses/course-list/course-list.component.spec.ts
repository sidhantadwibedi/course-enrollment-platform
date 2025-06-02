import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { EnrollmentService } from '../../shared/services/enrollment.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let enrollmentService: EnrollmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, CourseListComponent],
      providers: [EnrollmentService, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    enrollmentService = TestBed.inject(EnrollmentService);
    fixture.detectChanges();
  });

  it('should create CourseListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render all available courses', () => {
    const courseCards = fixture.nativeElement.querySelectorAll('.course-card');
    expect(courseCards.length).toBe(component.courses.length);
  });

  it('should call enroll method when Enroll button is clicked', () => {
    spyOn(enrollmentService, 'enroll');
    const enrollButtons = fixture.nativeElement.querySelectorAll('button');
    enrollButtons[0].click();
    expect(enrollmentService.enroll).toHaveBeenCalledWith(component.courses[0]);
  });
});
