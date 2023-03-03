import { createTag, decorateIcons } from '../../scripts/scripts.js';


{/* <video playsinline="" muted="" loop="" poster="https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1677582838619/img/202203/20220328-morehouse-spelman-feat/0328_hbcu_feat_c01_vid.jpg">
  <source src="//video.ralphlauren.com/202203/20220328-morehouse-spelman-feat/03292022_hbcu_lp_dsk_1440x720.mp4" type="video/mp4">Your browser does not support the video tag.</video> */}

{/* <video autoplay="" playsinline="" loop="" 
src="https://publish-p91555-e868145.adobeaemcloud.com/content/dam/gql-demo-template/assets/AdobeStock_307513975.mp4" 
poster="https://publish-p91555-e868145.adobeaemcloud.com/content/dam/gql-demo-template/assets/AdobeStock_307513975.mp4/jcr%3Acontent/renditions/cq5dam.zoom.2048.2048.jpeg"></video> */}

export default function decorate(block) {
  decorateIcons(block);
  if (Object.values(block.classList).includes('video')) {
    // const poster = block.querySelector('picture > img');
    const videoSrc = block.querySelector('div:nth-child(3) > div');
    const video = createTag('video', { playsinline: '', muted: 'true', loop: '', autoplay: '', src: videoSrc.textContent });
    videoSrc.remove();
    video.load();
    video.addEventListener('loadeddata', () => {
      console.log('loaded');
      video.setAttribute('data-loaded', true);
      video.play();
    });
    
    block.querySelector('div > picture').replaceWith(video);
    console.log(block);
  }
}