# dna-dom
<img src=https://dna-dom.org/graphics/dna-logo.png align=right width=160 alt=logo>

_An uncomplicated user interface library for cloning semantic templates_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://dna-dom.org/license)
[![npm](https://img.shields.io/npm/v/dna-dom.svg)](https://www.npmjs.com/package/dna-dom)
[![Hits](https://data.jsdelivr.com/v1/package/npm/dna-dom/badge?style=rounded)](https://www.jsdelivr.com/package/npm/dna-dom)
[![Build](https://github.com/dna-dom/dna-dom/actions/workflows/run-spec-on-push.yaml/badge.svg)](https://github.com/dna-dom/dna-dom/actions/workflows/run-spec-on-push.yaml)
[![Publish Website](https://github.com/dna-dom/dna-dom/actions/workflows/publish-website.yaml/badge.svg)](https://github.com/dna-dom/dna-dom/actions/workflows/publish-website.yaml)

dna-dom is a lightweight easy-to-use UI library enabling developers to rapidly build maintainable
JavaScript applications.

## A) Bookstore Example
Designate templates with the `dna-template` class, and put the templates directly into the HTML
of your web page.&nbsp;
Use the element's `id` to indicate the name of the template.&nbsp;
Enclose data fields in double tildes `~~`.

### 1. HTML for book template
```html
<h1>Featured Books</h1>
<section class=books>
   <div id=book class=dna-template>
      <h2>~~title~~</h2>
      Author: <cite>~~author~~</cite>
   </div>
</section>
```

Then call the `dna.clone()` function to insert a copy of the template into the DOM.&nbsp;
The supplied JSON data object populates the fields of the template.

### 2. JavaScript call to add book node
```javascript
dna.clone('book', { title: 'The DOM', author: 'Jan' });
```

The new clone element replaces the template.&nbsp;
The original template is detached from the DOM and kept for additional cloning.

### 3. Resulting HTML with clone
```html
<h1>Featured Books</h1>
<section class=books>
   <div class=book>
      <h2>The DOM</h2>
      Author: <cite>Jan</cite>
   </div>
</section>
```

Need to clone the template multiple times?&nbsp;
Simply pass an array of data objects into the `dna.clone()` function.

## B) Additional Information
* [https://dna-dom.org](https://dna-dom.org/) (see the *"Try it out"* section for an interactive example)
* [Sample To-Do Application](https://jsfiddle.net/4jkua81f) (jsfiddle)
* [Introduction to dna-dom](https://youtu.be/1CrYAFZPdAg) (YouTube)
* [Documentation](https://dna-dom.org/docs)
* [Release Notes](https://github.com/dna-dom/dna-dom/wiki/Release-Notes)

## C) Contributor Notes
To be a contributor, **fork** the project and run the commands `npm install` and `npm test` on your
local clone.&nbsp;
Make your edits and rerun the tests.

Pull requests welcome.&nbsp;
Since the pacakge version number is updated during the release process, you can leave the version number unchanged.

## D) Build Environment
Check out the `runScriptsConfig` section in [package.json](package.json) for an
interesting approach to organizing build tasks.

**CLI Build Tools for package.json**
   - 🎋 [add-dist-header](https://github.com/center-key/add-dist-header):&nbsp; _Prepend a one-line banner comment (with license notice) to distribution files_
   - 📄 [copy-file-util](https://github.com/center-key/copy-file-util):&nbsp; _Copy or rename a file with optional package version number_
   - 📂 [copy-folder-util](https://github.com/center-key/copy-folder-util):&nbsp; _Recursively copy files from one folder to another folder_
   - 🪺 [recursive-exec](https://github.com/center-key/recursive-exec):&nbsp; _Run a command on each file in a folder and its subfolders_
   - 🔍 [replacer-util](https://github.com/center-key/replacer-util):&nbsp; _Find and replace strings or template outputs in text files_
   - 🔢 [rev-web-assets](https://github.com/center-key/rev-web-assets):&nbsp; _Revision web asset filenames with cache busting content hash fingerprints_
   - 🚆 [run-scripts-util](https://github.com/center-key/run-scripts-util):&nbsp; _Organize npm package.json scripts into groups of easy to manage commands_
   - 🚦 [w3c-html-validator](https://github.com/center-key/w3c-html-validator):&nbsp; _Check the markup validity of HTML files using the W3C validator_

<br>

---
Feel free to submit questions at:<br>
[github.com/dna-dom/dna-dom/issues](https://github.com/dna-dom/dna-dom/issues)

dna-dom is open source under the [MIT License](https://dna-dom.org/license).&nbsp;
The website and documentation are published under the
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) license.
