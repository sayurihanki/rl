export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  const h2 = block.querySelector('h2');
  console.log(h2.innerHTML.includes('&amp;'));
  if(h2.innerHTML.includes('&amp;')) {
    h2.innerHTML = h2.innerHTML.replace('&amp;', '<br />&amp;<br />');
  }
}
