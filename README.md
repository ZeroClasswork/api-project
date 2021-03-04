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

### Universities
- [x] tests for university endpoints
- [ ] university model
- [ ] course endpoints -> by university
- [ ] major endpoints -> by university
- [ ] university CREATE routes
- [ ] university READ routes
- [ ] university UPDATE routes
- [ ] university DESTROY routes
- [ ] passing university endpoint tests

