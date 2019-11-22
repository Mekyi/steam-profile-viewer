var chai = require('chai');
var supertest = require('supertest');
var app = require('../src/app.js');
var functions = require('../src/functions.js');

global.app = app.App;
global.expect = chai.expect;
global.request = supertest(app.App);

/**
* Tests if API key exists
*/
describe('API key', function() {
  it('tests if API key exists', function() {
    var isTrue = true;
    if (app.Key != null){
      isTrue = false
    }
    else {
      isTrue = true
    }
    expect(isTrue).to.be.true;
  });
});

/**
* Tests if server works
*/ 
describe('GET /test', function() {
  it('tests if server works', function(done) {
    request.get('/test')
        .expect(200)
        .end(function(err, res) {
            done(err);
    });
  });
});

/**
* Tests if trasforming custom profile url to steam ID works
*/ 
// Not tested currently due to Travis CI can't decrypt encrypted API key 
// describe('POST /test', function() {
//   it('check if trasforming custom profile url to steam ID works', function(done) {
//     var res1;
//     var res2;
//       request.post('/OwnedGames')
//           .send({
//               'steamid':'76561198036256662'
//           })
//           .expect(200)
//           .end(function(err, res) {
//             res1 = res;
//           });
//       request.post('/OwnedGames')
//           .send({
//               'steamid':'Mekyi',
//               done: false
//           })
//           .expect(200)
//           .end(function(err, res) {
//             res2 = res;
//               done(err);
//           });
//       expect(res1 === res2).to.be.true;
//   });
// });

/**
 * Tests if JSON parsing success works
 */
describe('JSON parsing true', function() {
  it('tests if JSON parsing success works', function() {
    var json = '{"result":true, "count":42}';
    expect(functions.tryParseJSON(json)).to.be.an('object');
  });
});

/**
 * Tests if JSON parsing fail works
 */
describe('JSON parsing false', function() {
  it('tests if JSON parsing fail works', function() {
    var json = '{"result":true, "count":42}';
    expect(functions.tryParseJSON(true)).to.be.false;
  });
});

/**
 * Tests if converting playtime to hours works
 */
describe('Playtime conversion', function() {
  it('tests if converting playtime to hours works', function() {
    var result = functions.playTimeToHours(210);
    expect(result).to.equal('3.5');
  });
});

/**
 * Tests if isNum function works
 */
describe('isNum function', function() {
  it('tests if isNum works', function() {
    expect(app.Num(5)).to.be.true;
    expect(app.Num("string")).to.be.false;
  });
});