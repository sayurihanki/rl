import { createTag, makeVideo} from "../../scripts/scripts.js";

export default async function decorate(block) {
  console.log(block);
  const h2 = block.querySelector('h2');

  if (Object.values(block.classList).includes('video')) {
    const videoSrc = block.querySelector('div > a');
    if(videoSrc.href.includes(window.hlx.codeBasePath))
    {
      videoSrc.href = videoSrc.text;
      console.log(videoSrc);
    }
    makeVideo(block.querySelector('div:has(a)'), videoSrc.href);
    videoSrc.remove();

    const div = createTag('div', {class:'overlay-h2'});
    const h2Overlay = createTag('h2');
    h2Overlay.innerHTML = h2.innerHTML;
    div.appendChild(h2Overlay)
    block.appendChild(div);

  //   // const button = block.querySelector('div:nth-child(2) a.button');

  //   // const watchLink = button.href;
  //   // const watchTitle = button.textContent;

  //   // const watch = createTag('button');
  //   // const watchSpan = createTag('span');
  //   // watchSpan.textContent = watchTitle;
  //   // watch.appendChild(watchSpan);
  //   // button.replaceWith(watch);
  }
}
