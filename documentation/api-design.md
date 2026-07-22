# API Design Document

## Project Name
Student Study Planner Web App

## 1. Introduction

This document explains the API design for the Student Study Planner Web App. The backend of the system is developed using Node.js, Express.js, MongoDB, and Mongoose.

The purpose of these APIs is to allow students to register, log in, manage their study tasks, search and filter tasks, and view dashboard summary information. The backend APIs will later be connected with the frontend pages of the web application.

---

## 2. Base URL

```text
http://localhost:5000
```

All API endpoints are tested locally using this base URL during development.

---
## 3. Authentication APIs

Authentication APIs are used to register new users and allow existing users to log in. After login, the user receives a JWT token. This token is required to access protected task-related APIs.

---

### 3.1 Register User

**Endpoint**

```http
POST /api/auth/register
```

**Description**

This endpoint allows a new student to create an account in the system. The user must provide name, student ID, email, and password.

**Request Body**

```json
{
  "name": "Salem",
  "student_id": "232001",
  "email": "salem@gmail.com",
  "password": "123456"
}
```

**Successful Response**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "Salem",
    "student_id": "232001",
    "email": "salem@gmail.com",
    "role": "student"
  }
}
```

**Possible Errors**

```json
{
  "message": "All fields are required"
}
```

```json
{
  "message": "Email already registered"
}
```

---

### 3.2 Login User

**Endpoint**

```http
POST /api/auth/login
```

**Description**

This endpoint allows a registered user to log in using email and password. If the login information is correct, the system returns a JWT token.

**Request Body**

```json
{
  "email": "salem@gmail.com",
  "password": "123456"
}
```

**Successful Response**

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "Salem",
    "student_id": "232001",
    "email": "salem@gmail.com",
    "role": "student"
  }
}
```

**Possible Errors**

```json
{
  "message": "Email and password are required"
}
```

```json
{
  "message": "Invalid email or password"
}
```

---
## 4. Authorization

Most task-related APIs are protected. This means the user must be logged in before accessing them.

The JWT token returned from the login API must be sent in the request header.

**Required Header**

```http
Authorization: Bearer jwt_token_here
```

If the token is missing or invalid, the system returns an error message.

```json
{
  "message": "Not authorized, no token"
}
```

```json
{
  "message": "Not authorized, token failed"
}
```

---
## 5. Task Management APIs

Task management APIs allow students to create, view, update, complete, and delete study tasks. A task can be an assignment, quiz, exam, project, reading, revision, or other academic activity.

All task management APIs require authorization.

---

### 5.1 Create Task

**Endpoint**

```http
POST /api/tasks
```

**Description**

This endpoint allows a logged-in student to create a new study task.

**Request Body**

```json
{
  "title": "Numerical Methods Assignment",
  "course_name": "Numerical Methods",
  "task_type": "Assignment",
  "description": "Complete bisection method problems",
  "deadline": "2026-07-10",
  "priority": "High",
  "status": "Pending"
}
```

**Successful Response**

```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task_id",
    "user_id": "user_id",
    "title": "Numerical Methods Assignment",
    "course_name": "Numerical Methods",
    "task_type": "Assignment",
    "description": "Complete bisection method problems",
    "deadline": "2026-07-10T00:00:00.000Z",
    "priority": "High",
    "status": "Pending"
  }
}
```

**Possible Error**

```json
{
  "message": "Required fields are missing"
}
```

---

### 5.2 View All Tasks

**Endpoint**

```http
GET /api/tasks
```

**Description**

This endpoint returns all tasks created by the logged-in user. The tasks are sorted by deadline.

**Successful Response**

```json
{
  "count": 3,
  "tasks": [
    {
      "_id": "task_id",
      "user_id": "user_id",
      "title": "Numerical Methods Assignment",
      "course_name": "Numerical Methods",
      "task_type": "Assignment",
      "description": "Complete bisection method problems",
      "deadline": "2026-07-10T00:00:00.000Z",
      "priority": "High",
      "status": "Pending"
    }
  ]
}
```

---

### 5.3 View Single Task

**Endpoint**

```http
GET /api/tasks/:id
```

**Description**

This endpoint returns the details of one specific task. The task ID is passed through the URL.

**Example URL**

```text
http://localhost:5000/api/tasks/6a4a31f1cc5a05a4e8d2765e
```

**Successful Response**

```json
{
  "_id": "task_id",
  "user_id": "user_id",
  "title": "Numerical Methods Assignment",
  "course_name": "Numerical Methods",
  "task_type": "Assignment",
  "description": "Complete bisection method problems",
  "deadline": "2026-07-10T00:00:00.000Z",
  "priority": "High",
  "status": "Pending"
}
```

**Possible Error**

```json
{
  "message": "Task not found"
}
```

---
### 5.4 Update Task

**Endpoint**

```http
PUT /api/tasks/:id
```

**Description**

This endpoint allows the logged-in user to update an existing task. The user can update the title, course name, task type, description, deadline, priority, and status.

**Request Body**

```json
{
  "title": "Updated Numerical Methods Assignment",
  "course_name": "Numerical Methods",
  "task_type": "Assignment",
  "description": "Complete bisection and Newton-Raphson problems",
  "deadline": "2026-07-12",
  "priority": "Medium",
  "status": "In Progress"
}
```

**Successful Response**

```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task_id",
    "title": "Updated Numerical Methods Assignment",
    "priority": "Medium",
    "status": "In Progress"
  }
}
```

---

### 5.5 Mark Task as Completed

**Endpoint**

```http
PATCH /api/tasks/:id/complete
```

**Description**

This endpoint updates the selected task status to Completed.

**Successful Response**

```json
{
  "message": "Task marked as completed",
  "task": {
    "_id": "task_id",
    "status": "Completed"
  }
}
```

---

### 5.6 Delete Task

**Endpoint**

```http
DELETE /api/tasks/:id
```

**Description**

This endpoint deletes a selected task from the database.

**Successful Response**

```json
{
  "message": "Task deleted successfully"
}
```

---
## 6. Search and Filter APIs

The task listing endpoint also supports search and filtering using query parameters. This helps students find specific tasks quickly.

---

### 6.1 Search Tasks by Keyword

**Endpoint**

```http
GET /api/tasks?search=database
```

**Description**

This endpoint searches tasks by title, description, or course name.

**Example Response**

```json
{
  "count": 1,
  "tasks": [
    {
      "title": "Database Quiz Preparation",
      "course_name": "Database Management",
      "task_type": "Quiz",
      "status": "Completed"
    }
  ]
}
```

---

### 6.2 Filter Tasks by Status

**Endpoint**

```http
GET /api/tasks?status=Pending
```

**Description**

This endpoint filters tasks based on their status.

**Possible Status Values**

```text
Pending
In Progress
Completed
```

---

### 6.3 Filter Tasks by Priority

**Endpoint**

```http
GET /api/tasks?priority=High
```

**Description**

This endpoint filters tasks based on priority.

**Possible Priority Values**

```text
Low
Medium
High
```

---

### 6.4 Filter Tasks by Task Type

**Endpoint**

```http
GET /api/tasks?task_type=Project
```

**Description**

This endpoint filters tasks based on task type.

**Possible Task Types**

```text
Assignment
Quiz
Exam
Project
Reading
Revision
Other
```

---

### 6.5 Filter Tasks by Course Name

**Endpoint**

```http
GET /api/tasks?course_name=Numerical
```

**Description**

This endpoint filters tasks based on course name. Partial course names can also be used.

---

### 6.6 Filter Tasks by Deadline

**Endpoint**

```http
GET /api/tasks?deadline=2026-07-10
```

**Description**

This endpoint filters tasks based on deadline date.

---

### 6.7 Combined Filter

**Endpoint**

```http
GET /api/tasks?status=Pending&priority=High
```

**Description**

This endpoint allows multiple filters to be used together. For example, a student can view tasks that are both pending and high priority.

---
## 7. Dashboard Summary API

The dashboard summary API provides a quick overview of the logged-in student's task progress.

---

### 7.1 Get Dashboard Summary

**Endpoint**

```http
GET /api/tasks/summary
```

**Description**

This endpoint returns task summary data for the dashboard.

**Successful Response**

```json
{
  "totalTasks": 3,
  "pendingTasks": 1,
  "inProgressTasks": 1,
  "completedTasks": 1,
  "progressPercentage": 33,
  "upcomingDeadlines": [
    {
      "_id": "task_id",
      "title": "Numerical Methods Assignment",
      "deadline": "2026-07-10T00:00:00.000Z",
      "priority": "High",
      "status": "Pending"
    }
  ]
}
```

---

## 8. API Testing

The APIs were tested using Thunder Client in VS Code.

The following APIs were tested:

- Register user
- Login user
- Create task
- View all tasks
- View single task
- Update task
- Mark task as completed
- Delete task
- Search tasks by keyword
- Filter tasks by status
- Filter tasks by priority
- Filter tasks by task type
- Filter tasks by course name
- Combined filter
- Dashboard summary

---

## 9. Conclusion

The API design supports the main backend functions of the Student Study Planner Web App. The implemented APIs allow users to register, log in, manage study tasks, search and filter tasks, and view dashboard summary information.

These APIs provide the backend foundation for the frontend interface of the system.