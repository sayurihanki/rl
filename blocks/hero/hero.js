import { createTag, decorateIcons } from '../../scripts/scripts.js';

export default async function decorate(block) {
  console.log(block);
  decorateIcons(block);

  if (Object.values(block.classList).includes('video')) {
    const videoSrc = block.querySelector('div > a');
  
    block.querySelector('div').innerHTML = `<video loop muted playsInline>
      <source data-src="${videoSrc.href}" type="video/mp4" />
    </video>`;

    const video = block.querySelector('div > video');
    const source = block.querySelector('div > video > source');

    source.src = source.dataset.src;
    videoSrc.remove();
    video.load();
    video.addEventListener('loadeddata', () => {
      console.log('loaded');
      video.setAttribute('autoplay', true);
      video.setAttribute('data-loaded', true);
      video.play();
    });
  }
}
