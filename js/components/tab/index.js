export default class Tab {
  constructor (config) {
    // Set root element and html
    this.el = document.querySelector(config.el);

    // Set compiled template
    this.template = require('./template.html');
    
    // Set event listeners
    this.events = config.events || [];
    this.events.forEach((event) => this.addListener(event));
  }

  addListener ({eventType, selector, callback}) {
    this.el.addEventListener(eventType, (event) => {
      if (selector) {
        const node = this.el.querySelector(selector);
        if (node !== event.target) {
          return;
        }
      }
      return callback();
    }, false)
  }

  render () {
    this.el.innerHTML = this.template;
  }
}
