// dna-dom
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { JSDOM } from 'jsdom';

// Setup
import { dna } from '../dist/dna-dom.js?cache-bust=1';
const mode =     { type: 'ES Module', file: 'dist/dna-dom.js' };
const filename = import.meta.url.replace(/.*\//, '');  //jshint ignore:line
const dom =      new JSDOM('');
const setupEnv = (done) => dna.initGlobal(dom.window) && done();

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {
   before(setupEnv);

////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.find()', () => {

   it('finds an item by key in an array and returns the item and index', () => {
      const array =    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      const actual =   [
         dna.array.find(array, 'b'),
         dna.array.find(array, 'Ant', 'word'),
         ];
      const expected = [
         { item: { code: 'b', word: 'Bat' }, index: 1 },
         { item: { code: 'a', word: 'Ant' }, index: 0 },
         ];
      assertDeepStrictEqual(actual, expected);
      });

   it('returns null for the item when the key does not exist', () => {
      const array =    [{ code: 'a', word: 'Ant' }, { code: 'b', word: 'Bat' }];
      const actual =   dna.array.find(array, 'bogus');
      const expected = { index: -1, item: null };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.fromMap()', () => {

   it('converts a map of objects into an array of maps', () => {
      const map =      { a: { word: 'Ant' }, bZ: { word: 'Bat' } };
      const actual =   dna.array.fromMap(map);
      const expected = [{ code: 'a', word: 'Ant' }, { code: 'bZ', word: 'Bat' }];
      assertDeepStrictEqual(actual, expected);
      });

   it('converts a map of objects into an array of maps with kebab case codes', () => {
      const map =      { a: { word: 'Ant' }, bZ: { word: 'Bat' } };
      const actual =   dna.array.fromMap(map, { kebabCodes: true });
      const expected = [{ code: 'a', word: 'Ant' }, { code: 'b-z', word: 'Bat' }];
      assertDeepStrictEqual(actual, expected);
      });

   it('converts a map of values into an array of maps with a custom code name', () => {
      const map =      { x0: 100, x1: 101, x2: 102 };
      const actual =   dna.array.fromMap(map, { key: 'key' });
      const expected = [{ key: 'x0', value: 100 }, { key: 'x1', value: 101 }, { key: 'x2', value: 102 }];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Array utility function dna.array.toMap()', () => {

   it('converts an array of objects into an object (hash map)', () => {
      const array = [
         { code: 'a',        word: 'Ant' },
         { code: 'b-z',      word: 'Bat' },
         { code: 'J30X-W77', price: 34.99 },
         ];
      const actual = dna.array.toMap(array);
      const expected = {
         'a':        { code: 'a',        word: 'Ant' },
         'b-z':      { code: 'b-z',      word: 'Bat' },
         'J30X-W77': { code: 'J30X-W77', price: 34.99 },
         };
      assertDeepStrictEqual(actual, expected);
      });

   it('converts an array of objects into an object (hash map) with camel case keys', () => {
      const array = [
         { code: 'a',        word: 'Ant' },
         { code: 'b-z',      word: 'Bat' },
         { code: 'J30X-W77', price: 34.99 },
         ];
      const actual = dna.array.toMap(array, { key: 'code', camelKeys: true });
      const expected = {
         a:       { code: 'a',        word: 'Ant' },
         bZ:      { code: 'b-z',      word: 'Bat' },
         J30XW77: { code: 'J30X-W77', price: 34.99 },
         };
      assertDeepStrictEqual(actual, expected);
      });

   it('converts an array of objects into an object (hash map) with custom key field', () => {
      const array = [
         { code: 'a',   word: 'Ant' },
         { code: 'b-z', word: 'Bat' },
         ];
      const actual = dna.array.toMap(array, { key: 'word' });
      const expected = {
         Ant: { code: 'a',   word: 'Ant' },
         Bat: { code: 'b-z', word: 'Bat' },
         };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
