# Use Cases

## UC-1 Register Account

### Actor

Student

### Preconditions

User is not registered.

### Main Flow

1. User opens registration page.
2. User enters details.
3. User submits registration form.
4. System validates information.
5. Account is created successfully.

### Postconditions

User account exists in the system.

---

## UC-2 Login

### Actor

Student

### Preconditions

User account exists.

### Main Flow

1. User enters email and password.
2. System validates credentials.
3. User is redirected to dashboard.

### Postconditions

User is authenticated.

---

## UC-3 Create Study Task

### Actor

Student

### Main Flow

1. User selects "Add Task".
2. User enters task information.
3. User assigns deadline.
4. System saves task.

### Postconditions

Task appears on dashboard and calendar.

---

## UC-4 Upload Study Material

### Actor

Student

### Main Flow

1. User opens study materials section.
2. User uploads file.
3. User selects subject category.
4. System stores file.

### Postconditions

Material becomes available for access.

---

## UC-5 Add Exam Schedule

### Actor

Student

### Main Flow

1. User adds exam details.
2. User specifies date and time.
3. System saves exam schedule.
4. Reminder notifications are scheduled.

### Postconditions

Exam appears in calendar.

---

## UC-6 View Calendar

### Actor

Student

### Main Flow

1. User opens calendar page.
2. System displays tasks, exams, and events.
3. User reviews schedule.

### Postconditions

User sees academic timeline.
