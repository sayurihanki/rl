import { createTag, makeVideo } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function scrunch(divs) {
  const leftCol = createTag('div', {class: 'left-col'});
  const middleCol = createTag('div', {class: 'middle-col'});
  const rightCol = createTag('div', {class: 'right-col'});
  let n = 0;
  divs.forEach((div) => {
    if(n === 0 || n === 2) {
      leftCol.appendChild([...div.children][0]);
      middleCol.appendChild([...div.children][0]);
      rightCol.appendChild([...div.children][0]);
    } else if(n === 1) {
      leftCol.appendChild([...div.children][0]);
      rightCol.appendChild([...div.children][0]);
    }
    div.remove();
    n += 1;
  });
  const returnDiv = createTag('div', {class:'cols'});
  returnDiv.appendChild(leftCol);
  returnDiv.appendChild(middleCol);
  returnDiv.appendChild(rightCol);
  return returnDiv;
}

export default async function decorate(block) {
  const section = document.querySelector('.photo-grid-container');

  const background = createOptimizedPicture('https://main--rl-content-site--lamontacrook.hlx.page/media/ezgif-4-7edea768f4.jpg');
  
  const bgDiv = createTag('div', {class:'bg-image'});
  bgDiv.appendChild(background);

  const overlay = createTag('div', {class:'overlay'});

  [...section.children].forEach((div) => {
    if([...div.classList].includes('photo-grid-wrapper')) {
      const newPhotoGrid = scrunch(div.querySelectorAll('.photo-grid > div'));
      div.querySelector('.photo-grid').appendChild(newPhotoGrid);
      div.querySelectorAll('.photo-grid > div a').forEach((anchor) => {
        makeVideo(anchor.parentElement, anchor.href);
        anchor.remove();
      })
    }
    overlay.appendChild(div);
  });

  
  section.appendChild(bgDiv);
  section.appendChild(overlay);

}