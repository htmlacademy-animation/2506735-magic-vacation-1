export default class TextAnimation {
  constructor(settings) {
    /** Target DOM element */
    this._element = settings.element;
    /** Transition property (transform, width, left, opacity, color, etc.) */
    this._property = settings.property;
    /** Animation duration */
    this._duration = settings.duration;
    /** Time offset for letter-by-letter animation */
    this._timeOffset = settings.timeOffset;
    /** Timing function (ease, ease-in, cubic-bezier, etc.) */
    this._timingFunction = settings.timingFunction;
    /** Class to activate an animation */
    this._activeClass = settings.activeClass;

    this._animateText();
  }

  run() {
    if (!this._element) {
      return;
    }

    this._element.classList.add(this._activeClass);
  }

  destroy() {
    this._element.classList.remove(this._activeClass);
  }

  _animateText() {
    if (!this._element) {
      return;
    }

    /** Split the text content by words */
    const words = this._element.textContent
      .trim()
      .split(` `)
      .filter((letter) => letter !== ``);

    /** Animate each word */
    const content = words.reduce((parentFragment, word) => {
      const wordContainer = document.createElement(`span`);
      /** Calculated time offset for letter-by-letter animation */
      let offset = 0;

      /** Specify a transition for each letter in the word */
      const letterElement = Array.from(word).reduce((fragment, letter, index) => {
        let currentOffset = 0;
        offset += this._timeOffset;
        index++;

        if (index % 3 === 1) {
          currentOffset = offset;
        } else if (index % 3 === 2) {
          currentOffset = offset + this._timeOffset;
        } else {
          currentOffset = offset - this._timeOffset;
        }

        const animatedLetter = this._createTextWithAnimation(letter, currentOffset);
        fragment.appendChild(animatedLetter);
        return fragment;
      }, document.createDocumentFragment());

      wordContainer.classList.add(`animated-word`);

      wordContainer.appendChild(letterElement);
      parentFragment.appendChild(wordContainer);

      return parentFragment;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  _createTextWithAnimation(text, timeOffset = this._timeOffset) {
    const span = document.createElement(`span`);

    span.textContent = text;
    span.style.transition = `${this._property} ${this._duration}ms ${this._timingFunction} ${timeOffset}ms`;

    return span;
  }
}

export const introTitleAnimation = new TextAnimation({
  element: document.querySelector(`.intro__title`),
  property: `transform`,
  duration: 350,
  timeOffset: 40,
  timingFunction: `ease`,
  activeClass: `active`,
});

export const introDatesAnimation = new TextAnimation({
  element: document.querySelector(`.intro__date`),
  property: `transform`,
  duration: 350,
  timeOffset: 40,
  timingFunction: `ease`,
  activeClass: `active`,
});

export const historyTitleAnimation = new TextAnimation({
  element: document.querySelector(`.slider__item-title`),
  property: `transform`,
  duration: 350,
  timeOffset: 40,
  timingFunction: `ease`,
  activeClass: `active`,
});

export const prizesTitleAnimation = new TextAnimation({
  element: document.querySelector(`.prizes__title`),
  property: `transform`,
  duration: 350,
  timeOffset: 40,
  timingFunction: `ease`,
  activeClass: `active`,
});

export const rulesTitleAnimation = new TextAnimation({
  element: document.querySelector(`.rules__title`),
  property: `transform`,
  duration: 350,
  timeOffset: 40,
  timingFunction: `ease`,
  activeClass: `active`,
});

export const gameTitleAnimation = new TextAnimation({
  element: document.querySelector(`.game__title`),
  property: `transform`,
  duration: 350,
  timeOffset: 40,
  timingFunction: `ease`,
  activeClass: `active`,
});
