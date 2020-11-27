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
  const titleElem = document.createElement('div');
  const imageElem = document.createElement('img');
  const bodyElem = document.createElement('div');
  const bodyWrapper = document.createElement('div');
  const techElem = document.createElement('div');
  const linkElem = document.createElement('a');
  const buttonElem = document.createElement('div');
  const bodyHeaderelem = document.createElement('div');
  const techlsitHeaderElem = document.createElement('div');
  linkElem.href = link;
  imageElem.src = image;
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
    console.log('something');
    const multi = getMultiplier(entry.intersectionRatio);
    const fixedTranslate = maxTranslate * (1 - translateVariant);
    const variableTranslate = maxTranslate - fixedTranslate;
    card.style.opacity = 1 - opacityVariant + opacityVariant * multi;
    card.style.transform = `scale(${
      1 - scaleVariant + scaleVariant * multi
    }) translate(-${
      maxTranslate - (fixedTranslate + variableTranslate * multi)
    }%)`;
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
}
function makeGridCard(cardDataList) {
  const gridElem = document.createElement('div');
  cardDataList.forEach((cardData, index) => {
    const card = makeCard(cardData);
    processCard(card);
    // workaround for the issue that hides the first card on page load even if it is inside viewport
    if (index === 0) {
      setTimeout(() => {
        card.style.opacity = null;
        card.style.transform = null;
      });
    }
    gridElem.appendChild(card);
  });
  gridElem.classList.add('card-grid');
  return gridElem;
}

const app = document.getElementById('root');
fetch('./projectData.json')
  .then((response) => response.json())
  .then((json) => {
    const grid = makeGridCard(json);
    app.appendChild(grid);
  });
