/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {    
    REST: {
      endpoint: 'http://docker:8080/v1/cleaning-sessions',
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }      
    },
    JSONResponse: {}
  },
  include: {
    I: './steps_file.js'
  },
  name: 'HooverAPITestSuite'
}