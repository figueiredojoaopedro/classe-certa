<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Instructions for AI Agents

- Respect the existing architecture.
- Do not introduce new frameworks without justification.
- Do not bypass the Service and Repository layers.
- Keep changes minimal and focused.
- Prefer consistency over innovation.
- If a feature is outside the MVP scope, do not implement it unless explicitly requested.


# AGENTS.md

# Classe Certa

## Project Overview

Classe Certa is an educational marketplace that connects teachers with schools.

The platform works as a specialized professional network where:

* Teachers create professional profiles.
* Schools publish job opportunities.
* Teachers apply for jobs.
* Schools receive ranked candidates.
* A matching algorithm recommends the best candidates.

The goal of the MVP is to build a simple, maintainable, and scalable platform.

---

# Technology Stack

## Frontend

* Next.js
* React
* TypeScript
* TailwindCSS
* Shadcn UI

## Backend

* Next.js API Routes
* TypeScript

## Database

* PostgreSQL

## ORM

* Drizzle ORM

## Infrastructure

* Docker
* Docker Compose

## API Documentation

* Swagger / OpenAPI

## Monitoring

* Prometheus
* Grafana

---

# Development Principles

## Keep it simple

Always prefer simple solutions over complex abstractions.

Avoid:

* Deep inheritance
* Magic code
* Unnecessary design patterns
* Over-engineering

Prefer:

* Composition
* Small functions
* Single Responsibility Principle
* Explicit code

---

# Architecture

Expected request flow:

```
API Route
    ↓
Service
    ↓
Repository
    ↓
Drizzle ORM
    ↓
PostgreSQL
```

Pages and UI components must never access the database directly.

Business logic belongs to Services.

Database operations belong to Repositories.

---

# Project Structure

```
src/
│
├── app/
├── components/
├── db/
│   ├── index.ts
│   └── schema/
│
├── repositories/
├── services/
├── hooks/
├── lib/
├── types/
└── utils/

drizzle/
docker/
docs/
tests/
```

---

# Naming Conventions

## Components

Use PascalCase.

Examples:

* TeacherCard.tsx
* JobCard.tsx
* CreateJobForm.tsx

## Services and Repositories

Use camelCase.

Examples:

* userService.ts
* jobRepository.ts
* matchAlgorithm.ts

---

# Database Rules

* Use Drizzle ORM for all database access.
* Generate migrations through Drizzle Kit.
* Do not manually create or modify database tables.
* Keep schemas organized by domain.

---

# Core Entities

## User

Authentication entity.

Fields:

* id
* email
* password
* role
* createdAt

Roles:

* TEACHER
* SCHOOL

---

## Teacher

* firstName
* lastName
* phone
* description
* education
* resume
* availability
* location

---

## School

* name
* registrationNumber
* location
* description
* educationLevels

---

## Job

* title
* description
* subject
* contractType
* modality
* location
* status

---

## Application

Represents a teacher applying for a job.

Fields:

* teacherId
* jobId
* matchScore
* status

---

## Post

* authorId
* content
* createdAt

---

# Matching System

The initial matching algorithm should consider:

* Subject
* Location
* Availability
* Education level
* Experience

The algorithm must return a score between 0 and 100.

Do not use Artificial Intelligence or Machine Learning in the MVP.

Use simple business rules.

---

# API Standards

Every endpoint should:

* Validate input
* Return standardized JSON responses
* Use proper HTTP status codes

Common responses:

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 500 Internal Server Error

---

# Repository Pattern

All database operations must go through a Repository.

Example:

```
JobRepository

- create()
- update()
- delete()
- findById()
- findAll()
```

Business rules belong to Services.

API Routes should only orchestrate requests.

---

# Code Style

* TypeScript strict mode
* Avoid using `any`
* Prefer explicit types
* Keep functions small
* One responsibility per function
* Write readable code

Readable code is more important than clever code.

---

# Git Conventions

Use Conventional Commits.

Examples:

* feat:
* fix:
* refactor:
* docs:
* test:
* style:
* chore:

---

# MVP Scope

## Teacher

* Register
* Login
* Create profile
* Edit profile
* Browse jobs
* Apply for jobs
* Create posts

## School

* Register
* Login
* Create profile
* Edit profile
* Publish jobs
* View candidates
* Create posts

---

# Out of Scope

The following features are intentionally excluded from the MVP:

* Internal chat
* Payment system
* Sponsored posts
* User ratings
* Document verification
* Machine Learning
* Mobile application
* Government integrations

---

# Local Development

The development environment must use Docker Compose.

Required services:

* PostgreSQL

The database container must be running before starting the application.

---

# Project Goal

Although this is an academic project, the codebase should follow professional engineering practices.

Priorities:

1. Simplicity
2. Maintainability
3. Scalability
4. Readability
5. Future extensibility

Always write code as if another developer will maintain it.
