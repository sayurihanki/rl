import { getMetadata } from '../../scripts/lib-franklin.js';
import { createTag } from '../../scripts/scripts.js';

{/* <video playsinline="" muted="" loop="" poster="https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1677582838619/img/202203/20220328-morehouse-spelman-feat/0328_hbcu_feat_c01_vid.jpg">
  <source src="//video.ralphlauren.com/202203/20220328-morehouse-spelman-feat/03292022_hbcu_lp_dsk_1440x720.mp4" type="video/mp4">Your browser does not support the video tag.</video> */}

export default function decorate(block) {
  if (Object.values(block.classList).includes('video')) {
    const poster = block.querySelector('picture > img');
    const video = createTag('video', { poster: poster.src, playsinline:'', muted:'', loop:''  });
    const source = createTag('source', { src: block.querySelector('div > a').href, type: 'video/mp4' });
    video.appendChild(source);
    console.log(video);
    block.querySelector('div > picture').replaceWith(video);
    console.log(block);
  }
}