var chai = require('chai');
var app = require('../main.js');
var supertest = require('supertest');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);

var input;

// Tests if input in name field is valid
describe('Input validation', function() {
  it('checks input validity', function() {
    input = 'name1'
    expect(sampleFunction(input)).to.be.true;
    input = 'name2'
    expect(sampleFunction(input)).to.be.false;
    });
  });

// Test if we are getting something
describe('GET /tasks', function() {
  it('returns a list of tasks', function(done) {
      request.get('/tasks')
          .expect(200)
          .end(function(err, res) {
              expect(res.body).to.have.lengthOf(2);
              done(err);
          });
  });
});


// Tests if we are getting correct information from API