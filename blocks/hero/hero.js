import { createTag, decorateIcons, makeVideo } from '../../scripts/scripts.js';

export default async function decorate(block) {
  decorateIcons(block);
  
  if (Object.values(block.classList).includes('video')) {
    const videoSrc = block.querySelector('div > a');
    if(videoSrc.href.includes(window.hlx.codeBasePath))
    {
      videoSrc.href = videoSrc.text;
      console.log(videoSrc);
    }
    makeVideo(block.querySelector('div'), videoSrc.href);
    videoSrc.remove();

    const button = block.querySelector('div:nth-child(2) a.button');

    const watchLink = button.href;
    const watchTitle = button.textContent;

    const watch = createTag('button');
    const watchSpan = createTag('span');
    watchSpan.textContent = watchTitle;
    watch.appendChild(watchSpan);
    button.replaceWith(watch);
  }
}
