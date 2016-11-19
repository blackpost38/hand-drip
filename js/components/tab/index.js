import template from './template.html';

export default class Tab {
  constructor (config) {
    // Set component state
    this.state = config.state && typeof config.state === 'object' ? config.state : {};

    // Set root element and html
    this.el = document.querySelector(config.el);

    // // Set compiled template
    this.template = template;
    this.el.innerHTML = this.template;

    this.sections = this.detachAllEl(this.el);
    this.lists = this.detachListsEl(this.el);

    // Set event listeners
    this.events = config.events || [];
    this.events.forEach((event) => this.addListener(event));
  }

  addListener ({eventType, selector, callback}) {
    this.el.addEventListener(eventType, (event) => {
      if (selector) {
        const nodeList = this.el.querySelectorAll(selector);
        if ([...nodeList].every((node) => node !== event.target)) {
          return;
        }
      }
      return callback.call(this, event);
    }, false);
  }

  detachAllEl (template) {
    const sectionsEl = template.querySelectorAll('section');
    sectionsEl.forEach((sectionEl) => {
      sectionEl.parentElement.removeChild(sectionEl);
    });
    return [...sectionsEl];
  }

  detachListsEl (el) {
    const lisEl = el.querySelectorAll('li');
    lisEl.forEach((liEl) => {
      liEl.parentElement.removeChild(liEl);
    });
    return [...lisEl];
  }

  render () {
    const contentsFragment = document.createDocumentFragment();
    contentsFragment.appendChild([...this.sections].find(section => section.id === this.state.activeTabId));

    const contentsEl = this.el.querySelector('.contents');
    contentsEl.innerHTML = '';
    contentsEl.appendChild(contentsFragment);

    this.lists = this.lists.map((list, index) => {
      const { activeTabId } = this.state;
      const tabIndex = +activeTabId.split('-')[1];
      if (index + 1 <= tabIndex) {
        !list.classList.contains('active') && list.classList.add('active');
        const aEl = list.querySelector('a');
        !aEl.classList.contains('active') && aEl.classList.add('active');
      } else {
        list.classList.contains('active') && list.classList.remove('active');
        const aEl = list.querySelector('a');
        aEl.classList.contains('active') && aEl.classList.remove('active');
      }
      return list;
    })

    const lisFragment = document.createDocumentFragment();
    this.lists.forEach((list) => { lisFragment.appendChild(list); });

    const navEl = this.el.querySelector('.nav');
    const olEl = navEl.querySelector('ol');
    olEl.innerHTML = '';
    olEl.appendChild(lisFragment);
  }
}
