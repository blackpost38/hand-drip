(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = require('./template.html');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tab = function () {
  function Tab(config) {
    var _this = this;

    _classCallCheck(this, Tab);

    // Set component state
    this.state = config.state && _typeof(config.state) === 'object' ? config.state : {};

    // Set root element and html
    this.el = document.querySelector(config.el);

    // // Set compiled template
    this.template = _template2.default;
    this.el.innerHTML = this.template;

    this.sections = this.detachAllEl(this.el);
    this.lists = this.detachListsEl(this.el);

    // Set event listeners
    this.events = config.events || [];
    this.events.forEach(function (event) {
      return _this.addListener(event);
    });
  }

  _createClass(Tab, [{
    key: 'addListener',
    value: function addListener(_ref) {
      var _this2 = this;

      var eventType = _ref.eventType,
          selector = _ref.selector,
          callback = _ref.callback;

      this.el.addEventListener(eventType, function (event) {
        if (selector) {
          var nodeList = _this2.el.querySelectorAll(selector);
          if ([].concat(_toConsumableArray(nodeList)).every(function (node) {
            return node !== event.target;
          })) {
            return;
          }
        }
        return callback.call(_this2, event);
      }, false);
    }
  }, {
    key: 'detachAllEl',
    value: function detachAllEl(template) {
      var sectionsEl = template.querySelectorAll('section');
      sectionsEl.forEach(function (sectionEl) {
        sectionEl.parentElement.removeChild(sectionEl);
      });
      return [].concat(_toConsumableArray(sectionsEl));
    }
  }, {
    key: 'detachListsEl',
    value: function detachListsEl(el) {
      var lisEl = el.querySelectorAll('li');
      lisEl.forEach(function (liEl) {
        liEl.parentElement.removeChild(liEl);
      });
      return [].concat(_toConsumableArray(lisEl));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var contentsFragment = document.createDocumentFragment();
      contentsFragment.appendChild([].concat(_toConsumableArray(this.sections)).find(function (section) {
        return section.id === _this3.state.activeTabId;
      }));

      var contentsEl = this.el.querySelector('.contents');
      contentsEl.innerHTML = '';
      contentsEl.appendChild(contentsFragment);

      this.lists = this.lists.map(function (list, index) {
        var activeTabId = _this3.state.activeTabId;

        var tabIndex = +activeTabId.split('-')[1];
        if (index + 1 <= tabIndex) {
          !list.classList.contains('active') && list.classList.add('active');
          var aEl = list.querySelector('a');
          !aEl.classList.contains('active') && aEl.classList.add('active');
        } else {
          list.classList.contains('active') && list.classList.remove('active');
          var _aEl = list.querySelector('a');
          _aEl.classList.contains('active') && _aEl.classList.remove('active');
        }
        return list;
      });

      var lisFragment = document.createDocumentFragment();
      this.lists.forEach(function (list) {
        lisFragment.appendChild(list);
      });

      var navEl = this.el.querySelector('.nav');
      var olEl = navEl.querySelector('ol');
      olEl.innerHTML = '';
      olEl.appendChild(lisFragment);
    }
  }]);

  return Tab;
}();

exports.default = Tab;

},{"./template.html":2}],2:[function(require,module,exports){
module.exports = "<nav class=nav><ol><li class=active><a class=\"step-btn active\"></a></li><li><a class=step-btn></a></li><li><a class=step-btn></a></li><li><a class=step-btn></a></li><li><a class=step-btn></a></li><li><a class=step-btn></a></li><li><a class=step-btn></a></li><li><a class=step-btn></a></li><li><a class=step-btn></a></li></ol></nav><div class=contents><section id=tab-1><h2>Step 1. 준비 첫번째</h2><p>준비물을 확인 합니다. 원두, 뜨거운 물, 드리퍼, 필터, 서버 -혹은 컵-</p><p><button class=next-btn>다음</button></p></section><section id=tab-2><h2>Step 2. 준비 두번째</h2><p>드리퍼를 서버 -혹은 컵- 위에 놓고, 필터를 드리퍼에 꽂습니다.</p><p><button class=prev-btn>이전</button> <button class=next-btn>다음</button></p></section><section id=tab-3><h2>Step 3. 준비 마지막</h2><p>원두를 분쇄하여 필터 안에 넣고, 평평하게 만들어줍니다.</p><p><button class=prev-btn>이전</button> <button class=next-btn>다음</button></p></section><section id=tab-4><h2>Step 4. 뜸들이기 첫번째</h2><p>물을 가운데 부터 바깥으로 가볍게 원을 그리듯이 커피 전체에 살짝 붓습니다.</p><p><button class=prev-btn>이전</button> <button class=next-btn>다음</button></p></section><section id=tab-5><h2>Step 5. 뜸들이기 마지막</h2><p>뜸들이기 입니다. 보통 30초가 적당합니다.</p><p><button class=prev-btn>이전</button> <button class=next-btn>다음</button></p></section><section id=tab-6><h2>Step 6. 추출 첫번째</h2><p>뜸을 들였으니 본격적으로 물을 가운데 부터 바깥으로 부어 천천히 조금씩 추출해주세요.</p><p><button class=prev-btn>이전</button> <button class=next-btn>다음</button></p></section><section id=tab-7><h2>Step 7. 추출 두번째</h2><p>같은 방식으로 추출합니다. 가운데 부터 바깥으로 원을 그리듯이, 천천히 조금씩...!</p><p><button class=prev-btn>이전</button> <button class=next-btn>다음</button></p></section><section id=tab-8><h2>Step 8. 추출 마지막</h2><p>마지막으로 물을 부어 추출해주세요. 천천히 조금씩, 가운데 부터 바깥으로, 원을 그려주면서...!</p><p><button class=prev-btn>이전</button> <button class=next-btn>다음</button></p></section><section id=tab-9><h2>Step 9. 완성</h2><p>맛있는 커피가 완성되었습니다. 다음 번엔 주의해야 할 것도 생각해보면서 해보세요.</p><p>바깥쪽 여과지에 물이 직접 닿지 않도록 주의해주세요: 물이 여과지를 타고 바로 흘러내려 물이 커피에 섞입니다.</p><p>추출 시간은 2~3분 정도가 적당합니다: 너무 길면 쓴맛이 많이 추출되요.</p><p><button class=retry-btn>다시</button></p></section></div>";

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _template = require('./template.html');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
  function Timer(config) {
    _classCallCheck(this, Timer);

    // Set component state
    this.state = config.state && _typeof(config.state) === 'object' ? config.state : {};

    // Set root element and html
    this.el = document.querySelector(config.el);
  }

  _createClass(Timer, [{
    key: 'setTimer',
    value: function setTimer(timer) {
      this.state.timer = timer;
      return this;
    }
  }, {
    key: 'clearInterval',
    value: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      clearInterval(this.interval);
      this.interval = undefined;
    })
  }, {
    key: 'count',
    value: function count() {
      var _this = this;

      var timerEl = this.el.querySelector('.count');
      if (typeof this.state.timer === 'number') {
        timerEl.textContent = this.state.timer;

        this.clearInterval();
        this.interval = setInterval(function () {
          _this.state.timer = _this.state.timer - 1;
          timerEl.textContent = _this.state.timer;
          if (_this.state.timer <= 0) {
            _this.clearInterval();
          }
        }, 1000);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.el.innerHTML = _template2.default;
    }
  }]);

  return Timer;
}();

exports.default = Timer;

},{"./template.html":4}],4:[function(require,module,exports){
module.exports = "<div class=contents><span class=count></span></div>";

},{}],5:[function(require,module,exports){
'use strict';

var _timer = require('./components/timer');

var _timer2 = _interopRequireDefault(_timer);

var _tab = require('./components/tab');

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timer = new _timer2.default({
  el: '.main-timer'
});
timer.render();

var tab = new _tab2.default({
  el: '.main-tab',
  state: {
    activeTabId: 'tab-1'
  },
  events: [{
    eventType: 'click',
    selector: '.next-btn',
    callback: function callback() {
      var activeTabId = this.state.activeTabId;

      var tabIndex = +activeTabId.split('-')[1];
      if (tabIndex < this.sections.length) {
        var nextIndex = tabIndex + 1;
        this.state.activeTabId = 'tab-' + nextIndex;
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
  }, {
    eventType: 'click',
    selector: '.prev-btn',
    callback: function callback() {
      var activeTabId = this.state.activeTabId;

      var tabIndex = +activeTabId.split('-')[1];
      if (tabIndex > 1) {
        this.state.activeTabId = 'tab-' + (tabIndex - 1);
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
  }, {
    eventType: 'click',
    selector: '.step-btn',
    callback: function callback(event) {
      var targetLi = event.target.parentElement;

      var index = this.lists.findIndex(function (list) {
        return list === targetLi;
      });
      if (index !== -1) {
        this.state.activeTabId = 'tab-' + (index + 1);
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
  }, {
    eventType: 'click',
    selector: '.retry-btn',
    callback: function callback(event) {
      this.state.activeTabId = 'tab-1';
      this.render();
    }
  }]
});
tab.render();

},{"./components/tab":1,"./components/timer":3}]},{},[5]);
