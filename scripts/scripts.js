import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
} from './lib-franklin.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here
const ICON_ROOT = '/icons';
const ICON_EXCEPTIONS = ['login', 'cart', 'wishlist'];

function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    // section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
// function buildAutoBlocks(main) {
//   try {
//     buildHeroBlock(main);
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error('Auto Blocking failed', error);
//   }
// }

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  // buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/icons/favicon.ico`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

export function decorateIcons(element = document) {
  element.querySelectorAll('span.icon').forEach(async (span) => {
    if (span.classList.length < 2 || !span.classList[1].startsWith('icon-')) {
      return;
    }
    const icon = span.classList[1].substring(5);
    if (ICON_EXCEPTIONS.includes(icon)) return;

    // eslint-disable-next-line no-use-before-define
    const resp = await fetch(`${window.hlx.codeBasePath}${ICON_ROOT}/${icon}.svg`);
    if (resp.ok) {
      const iconHTML = await resp.text();
      if (iconHTML.match(/<style/i)) {
        const img = document.createElement('img');
        img.src = `data:image/svg+xml,${encodeURIComponent(iconHTML)}`;
        span.appendChild(img);
      } else {
        span.innerHTML = iconHTML;
      }
    }
    else { }
  });
}

/**
 * Helper function to create DOM elements
 * @param {string} tag DOM element to be created
 * @param {Object} attributes attributes to be added
 * @param {HTMLElement|SVGElement|string} html HTML or SVG to append to/after new element
 */

export function createTag(tag, attributes, html = undefined) {
  const el = document.createElement(tag);
  if (html) {
    if (html instanceof HTMLElement || html instanceof SVGElement) {
      el.append(html);
    } else {
      el.insertAdjacentHTML('beforeend', html);
    }
  }
  if (attributes) {
    Object.entries(attributes).forEach(([key, val]) => {
      el.setAttribute(key, val);
    });
  }
  return el;
}

export function makeVideo(element, href) {
  element.innerHTML = `<video loop muted playsInline>
    <source data-src="${href}" type="video/mp4" />
  </video>`;

  const video = element.querySelector('video');
  const source = element.querySelector('video > source');

  source.src = source.dataset.src;
  
  video.load();
  video.addEventListener('loadeddata', () => {
    video.setAttribute('autoplay', true);
    video.setAttribute('data-loaded', true);
    video.play();
  });

}

loadPage();

let pos = 0;
let vWidth = 100;
function reveals() {
  const reveals = document.querySelectorAll(".rl-signature span > svg");
  for (let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
  const navWrapper = document.querySelector('.nav-wrapper');
  const greenbar = document.querySelector(".cards.stick"); 
  const imgHeight = document.querySelector('.cards.stick img');
  
  const gbTop = greenbar.getBoundingClientRect().top;
  if(gbTop < (imgHeight.offsetHeight - navWrapper.offsetHeight) && pos === 0) {
    greenbar.style.position = 'fixed'; 
    greenbar.style.top = `${(navWrapper.offsetHeight - imgHeight.offsetHeight)}px`;
    console.log(greenbar.style.top);
    console.log(greenbar.offsetHeight);
    greenbar.style['z-index'] = '1'; 
    pos = window.visualViewport.pageTop;
  } else if(pos > window.visualViewport.pageTop) {
    greenbar.style.position = 'relative';
    greenbar.style.top = 'unset';
    greenbar.style['z-index'] = 'unset';
    pos = 0;
  }

  
  let bgColor = 'transparent';
  let fontColor = '#000';
  let className = '';

  if(window.scrollY === 0) {
    bgColor = 'transparent';
    fontColor = '#fff';
  } else {
    bgColor = '#fff';
    fontColor = '#000';
    className = 'black';
  }

  navWrapper.style.backgroundColor = bgColor;
  const links = navWrapper.querySelectorAll('a');
  links.forEach(link => {
    link.style.color = fontColor;
  });

  let icons = navWrapper.querySelectorAll('span.icon');
  icons.forEach((icon) => {
    icon.style.fill = fontColor;
  });

  icons = navWrapper.querySelectorAll('span.icon');
  icons.forEach((icon) => {
    if(className == '')
      icon.parentElement.classList.remove('black');
    else
      icon.parentElement.classList.add('black');
  });

  const reveal = document.querySelector('.reveal');
  
  const rect = reveal.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;
  const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

  const video = reveal.querySelector('video');
  const videoH2 = reveal.querySelector('.overlay > h2');
  
  if(isVisible) {
    vWidth += 10;
    video.style.left = '50%';
    video.style.top = '50%';
    video.style.transform = 'translate(-50%, -50%)';
    video.style.width = `${vWidth}px`;
    video.style.maxHeight = '100%';

    videoH2.style.left = '50%';
    videoH2.style.top = '50%';
    videoH2.style.transform = 'translate(-50%, -50%)';

    videoH2.style.width = `${vWidth}px`;
    videoH2.style.maxWidth = '80%';
  }
}

window.addEventListener("scroll", reveals);
