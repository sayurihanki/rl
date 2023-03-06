import { createTag, decorateIcons } from '../../scripts/scripts.js';

{/* <video playsinline="" muted="" loop="" poster="https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1677582838619/img/202203/20220328-morehouse-spelman-feat/0328_hbcu_feat_c01_vid.jpg">
  <source src="//video.ralphlauren.com/202203/20220328-morehouse-spelman-feat/03292022_hbcu_lp_dsk_1440x720.mp4" type="video/mp4">Your browser does not support the video tag.</video> */}

{/* <video autoplay="" playsinline="" loop="" 
src="https://publish-p91555-e868145.adobeaemcloud.com/content/dam/gql-demo-template/assets/AdobeStock_307513975.mp4" 
poster="https://publish-p91555-e868145.adobeaemcloud.com/content/dam/gql-demo-template/assets/AdobeStock_307513975.mp4/jcr%3Acontent/renditions/cq5dam.zoom.2048.2048.jpeg"></video> */}

/*
 *
 * <video poster="https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1677841820291/img/202301/20230131-polo-black-history-feat/0131_black_history_month_lp_c01_vid.jpg" playsinline="playsinline" muted="muted" loop="loop" autoplay=""><source src="//video.ralphlauren.com/202301/20230131-polo-black-history-feat/20230131_bhm_hero_lp_dsk_1440x800.mp4" type="video/mp4"></video>
 * 
 * 
*/

export default async function decorate(block) {
  console.log(block);
  decorateIcons(block);
  if (Object.values(block.classList).includes('video')) {
    // const poster = 'https://www.ralphlauren.com/on/demandware.static/-/Sites-RalphLauren_US-Library/en_US/v1677582838619/img/202203/20220328-morehouse-spelman-feat/0328_hbcu_feat_c01_vid.jpg'; //block.querySelector('picture > img');
    const videoSrc = block.querySelector('div:nth-child(3) > div');
    // const video = createTag('video', { playsinline: '', muted: true, loop: '', preload: true, poster: poster });
    block.querySelector('div').innerHTML = `<video loop muted playsInline>
      <source data-src="${videoSrc.textContent}" type="video/mp4" />
    </video>`;

    // const source = createTag('source', { src: videoSrc.textContent, type: 'video/mp4' });
    // video.appendChild(source);

    const video = block.querySelector('div > video');
    const source = block.querySelector('div > video > source');

    source.src = source.dataset.src;

    console.log(video);

    // videoSrc.remove();

    video.load();
    video.addEventListener('loadeddata', () => {
      console.log('loaded');
      video.setAttribute('autoplay', true);

      video.setAttribute('data-loaded', true);
      const promise = video.play();
      if (promise !== undefined) {
        promise.then(_ => {
          // Autoplay started!
          console.log('autoplay started'); ``
          // video.setAttribute('autoplay', true);
        }).catch(error => {
          console.log('autoplay prevented');
          console.log(error);
          // video.setAttribute('autoplay', true);
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
      }
    });
  }
}