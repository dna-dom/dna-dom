// dna-dom
// Specification Tools

const grabText = (dom, selector) =>
   dom.window.document.querySelector(selector).textContent;

const grabAllText = (dom, selector) =>
   [...dom.window.document.querySelectorAll(selector)].map(elem => elem.textContent);

export { grabText, grabAllText };
