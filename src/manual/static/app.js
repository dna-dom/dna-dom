// dna-engine Website ~~ dna-engine.org ~~ MIT
// Copyright (c) 2013-2026 Individual contributors to dna-engine

const app = {
   setup() {
      app.nav.setup();
      app.documenation.setup();
      const versionNumber = globalThis.document.querySelector('.version-number');
      if (versionNumber)
         versionNumber.textContent = dna.version;
      },
   };

app.bookstore = {
   books: [
      { title: 'Go JavaScript', author: 'Jake' },
      { title: 'Styling CSS3',  author: 'Abby' },
      { title: 'Howdy HTML5',   author: 'Ed' },
      ],
   clear() {
      dna.empty('book', { fade: true });
      },
   feelLucky() {
      const lucky = Math.floor(Math.random() * app.bookstore.books.length);
      dna.clone('book', app.bookstore.books[lucky], { fade: true });
      },
   setup() {
      dna.clone('book', { title: 'The DOM', author: 'Jan' });
      },
   };

app.nav = {
   setup() {
      const folder =  globalThis.location.pathname.split('/').slice(-2)[0];
      const active =  globalThis.document.getElementById('nav-' + folder)?.parentElement;
      const current = active || globalThis.document.querySelector('body >header >nav >menu >li');
      current.classList.add('current');
      },
   };

app.documenation = {
   setup() {
      const addOutlineNumber = (elem, index) => {
         const letter = String.fromCharCode('A'.charCodeAt() + index);
         elem.textContent = letter + '. ' + elem.textContent;
         };
      if (globalThis.location.pathname.indexOf('/docs') !== -1)
         globalThis.document.querySelectorAll('main >div >h3').forEach(addOutlineNumber);
      },
   };

dna.dom.onReady(app.setup);
