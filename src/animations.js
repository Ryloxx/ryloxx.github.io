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
window.observeCard = function (card) {
  const pollRate = 100;
  const observer = new IntersectionObserver(observerHandler(card), {
    threshold: Array(pollRate + 1)
      .fill()
      .map((_, index) => index / pollRate),
  });
  observer.observe(card);
  requestAnimationFrame(() => {
    card.style.opacity = 1;
  });
};
