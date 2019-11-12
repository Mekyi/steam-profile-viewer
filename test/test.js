var chai = require('chai');
var app = require('../main.js');

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

// Tests if we are getting correct information from API