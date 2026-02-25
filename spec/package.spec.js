// dna-dom
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { JSDOM } from 'jsdom';
import fs from 'fs';

// Setup
import { dna } from '../dist/dna-dom.js?cache-bust=5';
const pkg =      JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const mode =     { type: 'ES Module', file: 'dist/dna-dom.js' };
const filename = import.meta.url.replace(/.*\//, '');  //jshint ignore:line
const dom =      new JSDOM('');
const setupEnv = (done) => dna.initGlobal(dom.window) && done();

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {
   before(setupEnv);

////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains the correct files', () => {
      const actual = fs.readdirSync('dist').sort();
      const expected = [
         'dna-dom.css',
         'dna-dom.d.ts',
         'dna-dom.dev.js',
         'dna-dom.js',
         'dna-dom.min.js',
         'panel-nav.css',
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const semVerPattern = /\d+[.]\d+[.]\d+/;
      const actual =   { version: dna.version, valid: semVerPattern.test(dna.version) };
      const expected = { version: dna.version, valid: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Function dna.info()', () => {

   it('reports correct numbers before any cloning', () => {
      const actual = dna.info();
      delete actual.state;
      actual.store = Object.keys(actual.store);  //only verify keys names
      const expected = {
         clones:       0,
         initializers: [],
         names:        [],
         panels:       [],
         store:        [],
         subs:         0,
         templates:    0,
         version:      pkg.version,
         };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
