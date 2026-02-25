// dna-dom
// Mock Data

const html = `
   <!doctype html>
   <html lang=en>
      <head>
         <meta charset=utf-8>
         <title>Specification Runner</title>
      </head>
      <body>
         <h1>Featured Books</h1>
         <section class=books>
            <div id=book class=dna-template data-attr-id=~~isbn~~>
               <h2>~~title~~</h2>
               Author: <cite>~~author~~</cite>
               Prices:
                  <output class=usd    data-format-currency=usd>~~price~~</output>
                  <output class=jpy    data-format-currency=jpy>~~price~~</output>
                  <output class=usd100 data-format-currency100=usd>~~price~~</output>
               Event:
                  <output class=locale    data-format-date=locale>~~event~~</output>
                  <output class=general   data-format-date=general>~~event~~</output>
                  <output class=timestamp data-format-date=timestamp>~~event~~</output>
            </div>
         </section>
      </body>
   </html>
   `;

const timestamp = new Date('2030-05-04T01:00:00').getTime();  //May 4, 2030 at 1:00am (local time)

const bookCatalog = [
   { isbn: 'N978-1', title: 'The DOM',      author: 'Jan',  price: 2499, sale: false, language: 'en' },
   { isbn: 'N978-2', title: 'Styling CSS3', author: 'Abby', price: 1999, sale: true,  language: 'fr' },
   { isbn: 'N978-3', title: 'Howdy HTML5',  author: 'Ed',   event: timestamp },
   ];

export { html, timestamp, bookCatalog };
