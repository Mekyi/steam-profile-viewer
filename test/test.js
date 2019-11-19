var chai = require('chai');
// * as ClientFunctions from '../index.js';
//var ClientFunctions = require('../index.js');
//var app = require('../index.js');
var supertest = require('supertest');
var app = require('../app.js');

//functions = new Functions();

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

// Testing the post task expecting status 201 of success
describe('POST /tasks', function() {
  it('saves a new task', function(done) {
      request.post('/tasks')
          .send({
              title: 'run',
              content: 'this is a test',
              done: false
          })
          .expect(201)
          .end(function(err, res) {
              done(err);
          });
  });
});

describe('Function testing', function() {
  it('tests function', function() {
    expect(ClientFunctions.testFunction()).to.be.true;
    });
  });

  class Functions{
    testFunction(){
        return true;
    }
  }
  
  module.exports = Functions;

// Tests if we are getting correct information from API