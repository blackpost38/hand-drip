import Tab from './components/tab';

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

        this.render();
      }
    },
  ]
});
tab.render();
