function makeCard({ image, title, body, techList, link, theme }) {
  const {
    primary,
    secondary,
    tertiary,
    textMainHead,
    textSubHead,
    textBody,
  } = theme;
  const card = document.createElement('div');
  card.className = 'card';
  const titleElem = document.createElement('div');
  titleElem.className = 'card-body-title';
  const imageElem = document.createElement('picture');
  const bodyElem = document.createElement('div');
  bodyElem.className = 'card-body-paragraph';
  const bodyWrapper = document.createElement('div');
  bodyWrapper.className = 'card-body';
  const techElem = document.createElement('div');
  techElem.className = 'card-body-paragraph';
  const linkElem = document.createElement('a');
  linkElem.className = 'card-body-link';
  const buttonElem = document.createElement('div');
  buttonElem.className = 'card-body-link--wrapper';
  const bodyHeaderelem = document.createElement('div');
  bodyHeaderelem.className = 'card-body-title-paragraph';
  const techlsitHeaderElem = document.createElement('div');
  techlsitHeaderElem.className = 'card-body-title-paragraph';
  linkElem.href = link;
  const types = ['webp'];
  types.forEach((type, index) => {
    if (index === types.length - 1) {
      const img = document.createElement('img');
      img.src = `${image}.${type}`;
      img.alt = title;
      img.className = 'card-img';
      imageElem.appendChild(img);
    } else {
      const source = document.createElement(
        index === types.length - 1 ? 'img' : 'source',
      );
      source.srcset = `${image}.${type}`;
      source.type = `$image/${type}`;
      imageElem.appendChild(source);
    }
  });
  imageElem.alt;
  techList.forEach((tech) => {
    const li = document.createElement('div');
    li.innerText = tech;
    techElem.appendChild(li);
  });
  techElem.style.color = textBody;
  linkElem.innerText = 'Visit';
  linkElem.target = '_blank';
  linkElem.style.color = textMainHead;
  linkElem.style.background = primary;
  titleElem.innerText = title;
  titleElem.style.color = textMainHead;
  bodyElem.innerText = body;
  bodyElem.style.color = textBody;
  bodyHeaderelem.innerText = 'Summary';
  bodyHeaderelem.style.color = textSubHead;
  techlsitHeaderElem.innerText = 'Tech/Source';
  techlsitHeaderElem.style.color = textSubHead;
  buttonElem.appendChild(linkElem);
  buttonElem.style.background = tertiary;
  bodyWrapper.appendChild(titleElem);
  bodyWrapper.appendChild(bodyHeaderelem);
  bodyWrapper.appendChild(bodyElem);
  bodyWrapper.appendChild(techlsitHeaderElem);
  bodyWrapper.appendChild(techElem);
  bodyWrapper.style.background = primary;
  card.style.background = secondary;
  card.style.color = secondary;
  card.appendChild(imageElem);
  card.appendChild(bodyWrapper);
  card.appendChild(buttonElem);
  const wrap = document.createElement('div');
  wrap.className = 'card--wrapper';
  wrap.appendChild(card);
  return wrap;
}
let globalTimeoutId = null;
function observerHandler(card) {
  // const timeoutBeforeExpand = 500;
  const maxRatioThreshold = 0.8;
  const maxTranslate = 15;
  const deadZone = 0.1;
  const scaleVariant = 0.1;
  const opacityVariant = 1;
  const translateVariant = 1;
  /* Multiplier will vary from 0 to 1 with a giver ratio lower or equal to 1*/
  const getMultiplier = (ratio) =>
    Math.max(
      0,
      Math.min(1, (ratio - deadZone) * (1 / (maxRatioThreshold - deadZone))),
    );
  return (entries) => {
    const entry = entries[0];
    if (entry.intersectionRatio < 1 - maxRatioThreshold) {
      card.classList.remove('expanded');
    }
    const multi = getMultiplier(entry.intersectionRatio);
    const fixedTranslate = maxTranslate * (1 - translateVariant);
    const variableTranslate = maxTranslate - fixedTranslate;
    requestAnimationFrame(() => {
      card.style.opacity = 1 - opacityVariant + opacityVariant * multi;
      card.style.transform = `scale(${
        1 - scaleVariant + scaleVariant * multi
      }) translate(-${
        maxTranslate - (fixedTranslate + variableTranslate * multi)
      }%)`;
    });
  };
}
function processCard(card) {
  const pollRate = 100;
  const observer = new IntersectionObserver(observerHandler(card), {
    threshold: Array(pollRate + 1)
      .fill()
      .map((_, index) => index / pollRate),
  });
  card.addEventListener('click', () => {
    if (card.classList.contains('expanded')) {
      card.classList.remove('expanded');
    } else {
      const scrollEndTimeoutDuration = 50;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      let timeout = null;
      const scrollEndHandler = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          card.classList.add('expanded');
          window.removeEventListener('scroll', scrollEndHandler);
        }, scrollEndTimeoutDuration);
      };
      window.addEventListener('scroll', scrollEndHandler);
      scrollEndHandler();
    }
  });
  observer.observe(card);
  requestAnimationFrame(() => {
    card.style.opacity = 1;
  });
}
function defer(fnc, timeout) {
  setTimeout(() => {
    fnc();
  }, timeout);
}
function makeGridCard(cardDataList) {
  const gridElem = document.createElement('div');
  cardDataList.forEach((cardData, index) => {
    defer(() => {
      const card = makeCard(cardData);
      processCard(card);
      // workaround for the issue that hides the first card on page load even if it is inside viewport
      requestAnimationFrame(() => gridElem.appendChild(card));
    }, index * 100);
  });
  requestAnimationFrame(() => gridElem.classList.add('card-grid'));
  return gridElem;
}

const app = document.getElementById('root');
fetch('./projectData.json')
  .then((response) => response.json())
  .then((json) => {
    const grid = makeGridCard(json);
    app.appendChild(grid);
  });
