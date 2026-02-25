// dna-dom
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { JSDOM } from 'jsdom';
import { grabText, grabAllText } from './fixtures/spec-tools.js';
import { html, bookCatalog } from './fixtures/mock-data.js';
import assert from 'assert';
import fs     from 'fs';

// Setup
const pkg =        JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const mode =       { type: 'Minified', file: 'dist/dna-dom.min.js' };
const filename =   import.meta.url.replace(/.*\//, '');  //jshint ignore:line
const dom =        new JSDOM(html, { runScripts: 'outside-only' });
const scripts =    [mode.file];
const loadScript = (file) => dom.window.eval(fs.readFileSync(file, 'utf8'));
scripts.forEach(loadScript);
const { dna } = dom.window;

// Specification suite
describe(`Specifications: ${filename} - ${mode.type} (${mode.file})`, () => {

////////////////////////////////////////////////////////////////////////////////
describe('Function dna.templateExists()', () => {

   it('identifies if a template is present before cloning', () => {
      const actual =   [dna.templateExists('book'), dna.templateExists('bogus')];
      const expected = [true, false];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Template cloning function dna.clone()', () => {

   it('creates a book with the correct title', () => {
      dna.clone('book', bookCatalog[0]);
      const actual =   { title: grabText(dom, '.book h2') };
      const expected = { title: bookCatalog[0].title };
      assertDeepStrictEqual(actual, expected);
      });

   it('creates a book with the correct author', () => {
      const actual =   { author: grabText(dom, '.book cite') };
      const expected = { author: bookCatalog[0].author };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Function dna.getModel()', () => {

   it('returns the data object for the clone', () => {
      dna.clone('book', bookCatalog[1]);
      const lastBook = [...dom.window.document.getElementsByClassName('book')].at(-1);
      const actual =   { model: dna.getModel(lastBook) };
      const expected = { model: bookCatalog[1] };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Field formatter', () => {

   it('for currency correctly formats prices', () => {
      dna.clone('book', bookCatalog[2]);
      const actual = {
         usd:    grabAllText(dom, 'output.usd'),
         jpy:    grabAllText(dom, 'output.jpy'),
         usd100: grabAllText(dom, 'output.usd100'),
         };
      const expected = {
         usd:    ['$2,499.00', '$1,999.00', ''],
         jpy:    [   '¥2,499',    '¥1,999', ''],
         usd100: [   '$24.99',    '$19.99', ''],
         };
      assertDeepStrictEqual(actual, expected);
      });

   it('for dates correctly formats timestamps', () => {
      const timestamp =  /^\d{4}-\d{2}-\d{2}[+]\d{2}:\d{2}:\d{2}$/;  //example: '2030-05-04+08:00:00'
      const actual = {
         locale:    grabText(dom, '#N978-3 output.locale'),
         general:   grabText(dom, '#N978-3 output.general'),
         timestamp: timestamp.test(grabText(dom, '#N978-3 output.timestamp')),
         };
      const expected = {
         locale:    '5/4/2030, 1:00:00 AM',
         general:   '2030-05-04 1:00am Sat',
         timestamp: true,  //check only format because UTC value differs from local time
         };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The dna.refresh() function', () => {

   it('updates the displayed title of a book', () => {
      const clones = dna.clone('book', bookCatalog, { empty: true });
      dna.getModel(clones[0]).title = 'The DOM 2.0!';
      dna.refresh(clones[0]);
      const actual =   { titles: grabAllText(dom, '.dna-clone.book h2') };
      const expected = { titles: ['The DOM 2.0!', 'Styling CSS3', 'Howdy HTML5'] };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The dna.destroy() function', () => {

   it('deletes a book from the DOM', () => {
      dna.destroy(dna.getClones('book').at(-1));
      const actual =   { titles: grabAllText(dom, '.dna-clone.book h2') };
      const expected = { titles: ['The DOM 2.0!', 'Styling CSS3'] };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Function dna.templateExists()', () => {

   it('identifies if a template is present after cloning', () => {
      const actual =   [dna.templateExists('book'), dna.templateExists('bogus')];
      const expected = [true, false];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Function dna.info()', () => {

   it('reports the correct number of templates and clone instances', () => {
      const actual = dna.info();
      delete actual.state;
      actual.store = Object.keys(actual.store);  //only verify keys names
      const expected = {
         clones:       2,
         initializers: [],
         names:        ['book'],
         panels:       [],
         store:        ['book'],
         subs:         0,
         templates:    1,
         version:      pkg.version,
         };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Correct error is thrown', () => {

   it('when dna.getModel() is called with an invalid template name', () => {
      const makeBogusCall = () => dna.getModel('wrong-template-name');
      const exception =     { message: '[dna-dom] Invalid element --> "wrong-template-name"' };
      assert.throws(makeBogusCall, exception);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
