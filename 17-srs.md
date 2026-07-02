# Software Requirements Specification (SRS)

# 1. Introduction

## 1.1 Purpose

The purpose of this Software Requirements Specification (SRS) is to define the requirements and overall design considerations for the Centralized Study Planner and Management System. This web application is intended to help university students manage academic responsibilities, organize study resources, track deadlines, and receive timely reminders for examinations and important events.

## 1.2 Scope

The Centralized Study Planner and Management System provides a single platform where students can:

* Manage academic tasks and assignments
* Track examination schedules
* Receive deadline and exam reminders
* Organize study materials
* View academic activities through an integrated calendar
* Monitor academic progress and upcoming commitments

The system aims to improve organization, time management, and productivity among students.

## 1.3 Intended Audience

This document is intended for:

* Project Supervisors
* Software Developers
* System Testers
* Project Stakeholders
* Future Maintainers of the System

---

# 2. Overall Description

## 2.1 Product Perspective

The system is a web-based application designed to centralize academic planning activities for university students. It integrates task management, examination scheduling, study material organization, notifications, and calendar management into a single platform.

## 2.2 Product Functions

The system provides the following core functions:

* User registration and authentication
* Task and deadline management
* Examination scheduling
* Study material storage and organization
* Calendar-based event tracking
* Notification and reminder generation
* Search and filtering capabilities

## 2.3 User Characteristics

The primary users of the system are university students who possess basic computer and internet literacy skills.

## 2.4 Assumptions and Dependencies

* Users have access to a stable internet connection.
* Users access the system through a supported web browser.
* The server infrastructure is available and operational.
* Notification services are functioning properly.

## 2.5 Constraints

* The application requires internet connectivity.
* Performance depends on server and network availability.
* Storage capacity is limited by available server resources.

---

# 3. System Features Overview

The system consists of several major modules:

## User Management Module

Provides user registration, login, authentication, profile management, and account security features.

## Task Management Module

Allows users to create, update, delete, categorize, and track academic tasks.

## Examination Management Module

Allows users to manage examination schedules and receive automated reminders.

## Study Material Management Module

Allows users to upload, organize, access, and manage study resources.

## Calendar Management Module

Provides visual scheduling of academic events, deadlines, examinations, and tasks.

## Notification Management Module

Generates reminders and notifications for important academic activities.

---

# 4. System Architecture

## Frontend Layer

Responsible for presenting the user interface and handling user interactions.

Possible technologies include:

* React.js
* HTML5
* CSS3
* JavaScript

## Backend Layer

Responsible for business logic, authentication, data processing, and communication between the client and database.

Possible technologies include:

* Node.js
* Express.js

## Database Layer

Responsible for storing user information, tasks, examinations, study materials, and calendar events.

Possible technologies include:

* MongoDB
* PostgreSQL

---

# 5. External Interface Requirements

## User Interface

The system shall provide a responsive web interface accessible from desktops, laptops, tablets, and mobile devices.

## Software Interface

The application shall communicate with backend services through RESTful APIs.

## Communication Interface

Communication between the client and server shall occur over HTTPS to ensure secure data transmission.

---

# 6. Detailed Requirements References

The detailed requirements for the system are documented separately.

## Functional Requirements

Refer to:

* 1-functional-requirements.md

## Non-Functional Requirements

Refer to:

* 2-non-functional-requirements.md

## Use Cases

Refer to:

* 3-use-cases.md

## Data Flow Diagrams

Refer to:

* 4-dfd.md

---

# 7. Future Enhancements

Potential future improvements include:

* Collaborative study groups
* Integration with google classroom
* Mobile application support
* Academic performance analytics
* Cloud synchronization across devices

---

# 8. Conclusion

The Centralized Study Planner and Management System is designed to provide students with a unified platform for managing academic activities and resources. By integrating task management, examination scheduling, notifications, study materials, and calendar functionality, the system aims to improve organization, productivity, and overall academic performance.
