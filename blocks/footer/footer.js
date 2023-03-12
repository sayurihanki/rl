import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';
import { createTag } from '../../scripts/scripts.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});
  const html = await resp.text();

  const footer = document.createElement('div');
  footer.innerHTML = html;
  const h3s = footer.querySelectorAll('h3');

  h3s.forEach((h3) => {
    const div = createTag('div', { class: 'footer-element'});
    const ul = h3.nextElementSibling;
    div.appendChild(h3);
    div.appendChild(ul);
    footer.appendChild(div);
  });

  footer.querySelector('div').remove();

  await decorateIcons(footer);  
  block.append(footer);
}
