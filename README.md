# Course Overload API

## Pitch

I want to write an API that catalogs the courses available at universities. People with access to private university catalogs will be able to contribute. I want to use this information for a front end project that will help people organize the courses they want with attention paid to prerequisites and things like that. I want to be able use my web scraper project in BEW 2.5 to import data from this project.

## Resources
University - name, majors, courses_offered
Major - name, university, courses_required
Courses - university, department, code, name, description, units, prerequisites, corequisites, postrequisites (courses that have this course as a pre or corequisite)

## Plan

### Setup
- [x] README.md
- [x] init package.json
- [x] express
- [x] env & .gitignore
- [x] github repo
- [x] M+C+tests setup
- [x] server.js
- [x] mongodb

### Courses
- [x] tests for course endpoints
- [x] course model
- [x] course CREATE routes
- [x] course READ routes
- [x] course UPDATE routes
- [x] course DESTROY routes
- [x] passing course endpoint tests
- [x] tests for course course associations
- [x] passing tests for course course associations

### Majors
- [x] tests for major endpoints
- [x] major model
- [x] major CREATE routes
- [x] major READ routes
- [x] major UPDATE routes
- [x] major DESTROY routes
- [x] passing major endpoint tests
- [x] tests for major course associations
- [x] passing tests for major course associations

### Schools
- [x] tests for school endpoints
- [x] school model
- [x] school CREATE routes
- [x] school READ routes
- [x] school UPDATE routes
- [x] school DESTROY routes
- [x] passing school endpoint tests

### Refactor to have schools be central
- [ ] course endpoints -> by school
  - [ ] update tests
  - [ ] add school to course model
  - [ ] update routes
  - [ ] passing all tests
- [ ] major endpoints -> by school
  - [ ] update tests
  - [ ] add school to major model
  - [ ] update routes
  - [ ] passing all tests

