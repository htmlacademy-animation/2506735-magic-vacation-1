import {
  introTitleAnimation,
  introDatesAnimation,
  historyTitleAnimation,
  prizesTitleAnimation,
  rulesTitleAnimation,
  gameTitleAnimation,
} from "./text-animation";

export default class TextAnimationManager {
  constructor() {
    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);

    this.activeScreen = 0;
    this.previousActiveScreen = 0;
    this.onUrlHashChengedHandler = this._onUrlHashChanged.bind(this);

    this.animatedText = {
      0: [{animation: introTitleAnimation, delay: 200}, {animation: introDatesAnimation, delay: 1200}],
      1: [{animation: historyTitleAnimation, delay: 200}],
      2: [{animation: prizesTitleAnimation, delay: 200}],
      3: [{animation: rulesTitleAnimation, delay: 200}],
      4: [{animation: gameTitleAnimation, delay: 200}],
    };
  }

  init() {
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);
    this._onUrlHashChanged();
  }

  _onUrlHashChanged() {
    const newActiveIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.previousActiveScreen = this.activeScreen;
    this.activeScreen = (newActiveIndex < 0) ? 0 : newActiveIndex;
    this._changeAnimationState();
  }

  _changeAnimationState() {
    const previousAnimatedText = this.animatedText[this.previousActiveScreen];
    const animatedText = this.animatedText[this.activeScreen];

    previousAnimatedText.forEach((text) => {
      text.animation.destroy();
    });

    animatedText.forEach((text) => {
      setTimeout(() => {
        text.animation.run();
      }, text.delay);
    });
  }
}


