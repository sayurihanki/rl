import { createTag, decorateIcons, makeVideo } from '../../scripts/scripts.js';

export default async function decorate(block) {
  decorateIcons(block);

  if (Object.values(block.classList).includes('video')) {
    const videoSrc = block.querySelector('div > a');
  
    // block.querySelector('div').innerHTML = `<video loop muted playsInline>
    //   <source data-src="${videoSrc.href}" type="video/mp4" />
    // </video>`;

    // const video = block.querySelector('div > video');
    // const source = block.querySelector('div > video > source');

    // source.src = source.dataset.src;
    // videoSrc.remove();
    // video.load();
    // video.addEventListener('loadeddata', () => {
    //   console.log('loaded');
    //   video.setAttribute('autoplay', true);
    //   video.setAttribute('data-loaded', true);
    //   video.play();
    // });

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
