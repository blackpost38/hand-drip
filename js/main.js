import Timer from './components/timer';
import Tab from './components/tab';

var timer = new Timer({
  el: '.main-timer'
});
timer.render();

var tab = new Tab({
  el: '.main-tab',
  state: {
    activeTabId: 'tab-1'
  },
  events: [
    {
      eventType: 'click',
      selector: '.next-btn',
      callback () {
        const { activeTabId } = this.state;
        const tabIndex = +activeTabId.split('-')[1];
        if (tabIndex < this.sections.length) {
          const nextIndex = tabIndex + 1;
          this.state.activeTabId = `tab-${nextIndex}`;
        }

        if (this.state.activeTabId === 'tab-5') {
          timer.setTimer(30).count();
        } else if (this.state.activeTabId === 'tab-6') {
          timer.setTimer(50).count();
        } else if (this.state.activeTabId === 'tab-7') {
          timer.setTimer(50).count();
        } else if (this.state.activeTabId === 'tab-8') {
          timer.setTimer(50).count();
        } else {
          timer.render();
        }

        this.render();
      }
    },
    {
      eventType: 'click',
      selector: '.prev-btn',
      callback () {
        const { activeTabId } = this.state;
        const tabIndex = +activeTabId.split('-')[1];
        if (tabIndex > 1) {
          this.state.activeTabId = `tab-${tabIndex -1}`;
        }

        if (this.state.activeTabId === 'tab-5') {
          timer.setTimer(30).count();
        } else if (this.state.activeTabId === 'tab-6') {
          timer.setTimer(50).count();
        } else if (this.state.activeTabId === 'tab-7') {
          timer.setTimer(50).count();
        } else if (this.state.activeTabId === 'tab-8') {
          timer.setTimer(50).count();
        } else {
          timer.render();
        }

        this.render();
      }
    },
    {
      eventType: 'click',
      selector: '.step-btn',
      callback (event) {
        const targetLi = event.target.parentElement;

        const index = this.lists.findIndex((list) => { return list === targetLi });
        if (index !== -1) {
          this.state.activeTabId = `tab-${index + 1}`;
        }

        if (this.state.activeTabId === 'tab-5') {
          timer.setTimer(30).count();
        } else if (this.state.activeTabId === 'tab-6') {
          timer.setTimer(50).count();
        } else if (this.state.activeTabId === 'tab-7') {
          timer.setTimer(50).count();
        } else if (this.state.activeTabId === 'tab-8') {
          timer.setTimer(50).count();
        } else {
          timer.render();
        }

        this.render();
      }
    },
    {
      eventType: 'click',
      selector: '.retry-btn',
      callback (event) {
        this.state.activeTabId = 'tab-1';
        this.render();
      }
    },
  ]
});
tab.render();
