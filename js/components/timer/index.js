import template from './template.html';

export default class Timer {
  constructor (config) {
    // Set component state
    this.state = config.state && typeof config.state === 'object' ? config.state : {};

    // Set root element and html
    this.el = document.querySelector(config.el);
  }

  setTimer (timer) {
    this.state.timer = timer;
    return this;
  }

  clearInterval () {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  count () {
    const timerEl = this.el.querySelector('.count');
    if (typeof this.state.timer === 'number') {
      timerEl.textContent = this.state.timer;

      this.clearInterval();
      this.interval = setInterval(() => {
        this.state.timer = this.state.timer - 1;
        timerEl.textContent = this.state.timer;
        if (this.state.timer <= 0) {
          this.clearInterval();
        }
      }, 1000);
    }
  }

  render () {
    this.el.innerHTML = template;
  }
}
