/**
 * @file NWjs file that is run first when project is compiled
 */

var bodyParser = require('body-parser');
var supertest = require('supertest');
var chai = require('chai');

nw.Window.open('index.html', {}, function(win) {});