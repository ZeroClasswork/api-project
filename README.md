# Course Overload API

An API to add and track courses with associated schools and majors.

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## How To Test out this API

- [ ] clone this repo
- [ ] start the server with environment variables
  - [ ] PORT (e.g. 3000)
  - [ ] ALGORITHM (e.g. sha256)
  - [ ] API_KEY (will be generated in following steps)
- [ ] send a POST request to localhost:<PORT>/users/new
  - [ ] include a form body with an email key
  - [ ] get the api key in the response
  - [ ] if you need to regenerate your api key with the same email, send a PATCH request to localhost:<PORT>/users/me/regenerate_key
    - [ ] be sure to include the email key form body
- [ ] update your API_KEY environment variable
- [ ] run `npm test` to run tests
- [ ] run `npm start` to utilize the api yourself
  - [ ] you'll have to include the header `Authorization: Api-Key <API_KEY>` in your API calls

## Documentation

Check out [my docs](https://courseoverloadapi.docs.apiary.io/)!

## Resources
University - name, majors, courses_offered
Major - name, university, courses_required
Courses - university, department, code, name, description, units, prerequisites, corequisites, postrequisites (courses that have this course as a pre or corequisite)
