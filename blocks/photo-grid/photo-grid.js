import { createTag, decorateIcons, makeVideo } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

{/* <picture class="rlc-picture" data-images="{
                'desktop':'https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1678360023458/img/202301/20230131-polo-black-history-feat/0131_black_history_month_lp_c03_bg.jpg',
                'mobile':'https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1678360023458/img/202301/20230131-polo-black-history-feat/0131_black_history_month_lp_m_c03_bg.jpg'
                }">
<source class="rlc-image-src-desktop" media="(min-width: 768px)" srcset="https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1678360023458/img/202301/20230131-polo-black-history-feat/0131_black_history_month_lp_c03_bg.jpg">
<source class="rlc-image-src-mobile" media="(max-width: 767px)" srcset="https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1678360023458/img/202301/20230131-polo-black-history-feat/0131_black_history_month_lp_m_c03_bg.jpg">
<img alt="" class="rlc-image rlc-background rlc-imgLoaded">
</picture> */}

function scrunch(divs) {
  const leftCol = createTag('div', {class: 'left-col'});
  const middleCol = createTag('div', {class: 'middle-col'});
  const rightCol = createTag('div', {class: 'rightCol'});
  console.log(divs);
  let n = 0;
  divs.forEach((div) => {
    if(n === 0) {
      leftCol.appendChild([...div.children][0]);
      middleCol.appendChild([...div.children][0]);
      rightCol.appendChild([...div.children][0]);
    } else {
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
  console.log(returnDiv);
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
      console.log(div);
      const newPhotoGrid = scrunch(div.querySelectorAll('.photo-grid > div'));
      
      div.querySelector('.photo-grid').appendChild(newPhotoGrid);
     
      div.querySelectorAll('.photo-grid > div a').forEach((anchor) => {
        makeVideo(anchor.parentElement, anchor.href);
        anchor.remove();
        console.log(anchor.href);
      })
    }
    overlay.appendChild(div);
  });

  
  section.appendChild(bgDiv);
  section.appendChild(overlay);

  console.log(section);

}