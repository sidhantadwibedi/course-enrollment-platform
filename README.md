# 📘 Course Enrollment Platform

An Angular 17+ standalone application that allows users to:

- Register/Login
- View available courses
- Enroll in courses
- View enrolled courses

It demonstrates modern Angular features including:
- Standalone components
- Signals
- Routing with lazy loading and route guards
- Component-to-component communication
- Reactive form validation
- State sharing between components

---

## 🚀 Features

- ✅ Register/Login with form validation
- ✅ Route protection via `AuthGuard`
- ✅ Modern Angular syntax (`@for`, `@if`)
- ✅ Shared state using Angular **signals**
- ✅ Lazy loading of feature modules
- ✅ Centralized services for Auth & Enrollment
- ✅ Global header with dynamic user and logout

---

## 🧱 File Structure

```
src/
├── app/
│   ├── app.component.html             # Main layout template
│   ├── app.component.scss             # Styling for app shell
│   ├── app.component.spec.ts          # Unit tests for root component
│   ├── app.component.ts               # Root component for the Angular app
│   ├── app.config.ts                  # Application configuration including providers and bootstrap
│   └── app.routes.ts                  # Defines root-level routes and lazy loading
├── assets/
│   └── .gitkeep                       # Placeholder to retain empty assets folder
├── auth/
│   ├── login/
│   │   └── login.component.ts         # Login form with field validation and redirect logic
│   ├── register/
│   │   └── register.component.ts      # Register form with password match and email validation
│   └── auth.route.ts                  # Lazy-loaded routing module for auth-related components
├── courses/
│   ├── course-enroll/
│   │   └── course-enroll.component.ts # Displays list of enrolled courses using signals
│   ├── course-list/
│   │   └── course-list.component.ts   # Lists available courses and triggers enrollment
│   └── course.route.ts                # Routing module for courses, includes lazy loading
├── shared/
│   ├── guards/
│   │   └── auth.guard.ts              # Route guard to prevent access without authentication
│   ├── pipes/
│   │   └── title-case.pipe.ts         # Custom pipe to convert strings to Title Case
│   ├── services/
│   │   ├── auth.service.ts            # Auth service to handle login state and registered users
│   │   └── enrollment.service.ts      # Manages enrolled courses using Angular signals
│   └── header.component.ts            # Global header with navigation, user info, and logout
├── favicon.ico                        # App icon
├── index.html                         # Base HTML file for the Angular app
├── main.ts                            # Entry point for bootstrapping the Angular app
└── styles.scss                        # Global application styles
```

---

## 🧩 Component Overview

### 📌 `app.routes.ts`
Configures routes for the `auth` and `courses` feature areas, loaded lazily.

### 👤 Auth Components

- **LoginComponent**: Reactive login form, redirects on success.
- **RegisterComponent**: Validates and registers user to localStorage.

### 📚 Course Components

- **CourseListComponent**: List of available courses, enrollable.
- **EnrolledCoursesComponent**: Displays only enrolled courses.

### 🧠 Shared Services

- **AuthService**: Manages session, registration, login and logout.
- **EnrollmentService**: Tracks enrolled courses via signals.

### 🧩 Global Components

- **HeaderComponent**: Dynamic title, navigation links, logout and user info.

---

## 📦 How to Run

```bash
npm install
ng serve
```

Visit `http://localhost:4200` to view the app.

---

## 🙌 Credits

Made with Angular 17+ standalone APIs, signals, and new structural directives.