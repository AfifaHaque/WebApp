# Work in Progress #
# Data Flow Diagram (DFD)

## Introduction

This document illustrates how data flows through the Centralized Study Planner and Management System. The diagrams identify the external entities, processes, data stores, and the movement of information within the system.

---

# Level 0 DFD (Context Diagram)

The Level 0 DFD represents the entire Study Planner System as a single process interacting with the student.

```mermaid
flowchart LR

    Student[Student]

    System((Study Planner System))

    Student -->|Registration Data<br>Login Credentials<br>Tasks<br>Exam Schedules<br>Study Materials<br>Calendar Events| System

    System -->|Dashboard Information<br>Notifications<br>Calendar View<br>Study Materials<br>Search Results| Student
```

---

# Level 1 DFD

The Level 1 DFD decomposes the main system into its major functional processes.

```mermaid
flowchart TB

    Student[Student]

    P1((1. User Management))
    P2((2. Task Management))
    P3((3. Exam Management))
    P4((4. Study Material Management))
    P5((5. Calendar Management))
    P6((6. Notification Management))

    D1[(User Database)]
    D2[(Task Database)]
    D3[(Exam Database)]
    D4[(Material Database)]
    D5[(Event Database)]

    Student -->|Registration & Login Data| P1
    P1 --> D1
    D1 --> P1
    P1 -->|Authentication Status| Student

    Student -->|Task Information| P2
    P2 --> D2
    D2 --> P2
    P2 -->|Task Updates| Student

    Student -->|Exam Information| P3
    P3 --> D3
    D3 --> P3
    P3 -->|Exam Schedule| Student

    Student -->|Upload Materials| P4
    P4 --> D4
    D4 --> P4
    P4 -->|Study Materials| Student

    Student -->|Events & Deadlines| P5
    P5 --> D5
    D5 --> P5
    P5 -->|Calendar View| Student

    P2 --> P6
    P3 --> P6
    P5 --> P6

    P6 -->|Reminders & Notifications| Student
```

---

# DFD Components

## External Entity

### Student

The primary user of the system who manages academic tasks, examinations, study materials, and calendar events.

---

## Processes

### 1. User Management

Handles registration, authentication, profile management, and account access.

### 2. Task Management

Handles task creation, modification, deletion, categorization, and completion tracking.

### 3. Exam Management

Handles examination schedules and exam-related information.

### 4. Study Material Management

Handles uploading, storing, organizing, retrieving, and deleting study resources.

### 5. Calendar Management

Handles academic events, deadlines, and calendar visualization.

### 6. Notification Management

Generates reminders and notifications for upcoming tasks, examinations, and events.

---

## Data Stores

### User Database

Stores user account and profile information.

### Task Database

Stores task details, deadlines, priorities, and completion status.

### Exam Database

Stores examination schedules and related information.

### Material Database

Stores uploaded study materials and associated metadata.

### Event Database

Stores academic events, deadlines, and calendar entries.

```
```
