import { createTag } from "../../scripts/scripts.js";
import { createOptimizedPicture } from "../../scripts/lib-franklin.js";

export default async function decorate(block) {
  console.log('here');
  dataDrivenList(block);
}

async function dataDrivenList(block) {
  const url = new URL(block.querySelector('a').href);
  const resp = await fetch(url + '?foo=bar',
  {
    headers : { 
      'Authorization': `Bearer ${localStorage.auth}`,
      'Content-Type': 'text/html' 
    } 
  });
  const json = await resp.json();
  const ul = createTag('ul');
  
  json.data.imageListByPath.item.imageListItems.forEach((row) => {
    const li = createTag('li');
    const divImage = createTag('div', {class: 'offers-card-image'});
    divImage.innerHTML = `<img src='${row.asset._publishUrl}' />`;
    const divDesc = createTag('div', {class: 'offers-card-body'});
    divDesc.innerHTML = `<p><a href='${row.link}'>${row.offerName}</a></p>`;
    li.appendChild(divImage);
    li.appendChild(divDesc);
    ul.appendChild(li);
  });
  [...block.children][0].replaceWith(ul);
}