module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SlideToggle = __webpack_require__(2);

Object.defineProperty(exports, 'SlideToggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SlideToggle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 _state_ is used to minimize expensive re-renderings.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 We don't want to update the state for every requestAnimationFrame
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 this.state is updated on toggle state change, used easing and duration.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

//import PropTypes from 'prop-types';

var log = console.log.bind(console);
var warn = console.warn.bind(console);

var rAF = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (callback) {
  return window.setTimeout(callback, 16);
};
var cAF = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : window.clearInterval.bind(window);

var TOGGLE = {
  EXPANDED: 'EXPANDED',
  COLLAPSED: 'COLLAPSED',
  EXPANDING: 'EXPANDING',
  COLLAPSING: 'COLLAPSING'
};

var cubicInOut = function cubicInOut(t) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
};

var SlideToggle = function (_React$Component) {
  _inherits(SlideToggle, _React$Component);

  // static propTypes = {
  //   duration: PropTypes.number,
  //   easeIn: PropTypes.oneOfType([PropTypes.func]),
  //   easeOut: PropTypes.oneOfType([PropTypes.func]),
  //   collapsed: PropTypes.bool,
  //   onExpanded: PropTypes.func,
  //   onExpanding: PropTypes.func,
  //   onCollapsed: PropTypes.func,
  //   onCollapsing: PropTypes.func,
  // };

  function SlideToggle(props) {
    _classCallCheck(this, SlideToggle);

    var _this = _possibleConstructorReturn(this, (SlideToggle.__proto__ || Object.getPrototypeOf(SlideToggle)).call(this, props));

    _this.setCollapsibleElement = function (element) {
      if (!element) {
        warn('no element in setCollapsibleElement');
        return;
      }
      _this._state_.collasibleElement = element;
      if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        _this.setCollapsedState();
      } else if (_this._state_.toggleState === TOGGLE.EXPANDED) {
        _this.setExpandedState();
      }
    };

    _this.onToggle = function () {
      var update_State_ = function update_State_(_ref) {
        var toggleState = _ref.toggleState,
            display = _ref.display,
            isReverse = _ref.isReverse;

        _this._state_.toggleState = toggleState;
        _this._state_.isReverse = !!isReverse;

        if ((typeof display === 'undefined' ? 'undefined' : _typeof(display)) !== undefined) {
          _this._state_.collasibleElement.style.display = display;
        }
        var now = _this.now();
        if (isReverse) {
          var _this$_state_ = _this._state_,
              duration = _this$_state_.duration,
              startTime = _this$_state_.startTime;

          var elapsedTime = Math.min(duration, now - startTime);
          var subtract = Math.max(0, duration - elapsedTime);
          _this._state_.startTime = now - subtract;
        } else {
          _this._state_.boxHeight = _this._state_.collasibleElement.clientHeight;
          _this._state_.startTime = now;
        }

        _this.setState({
          toggleState: _this._state_.toggleState,
          isReverse: _this._state_.isReverse
        });
      };

      if (_this._state_.toggleState === TOGGLE.EXPANDED) {
        update_State_({ toggleState: TOGGLE.COLLAPSING });
        _this.props.onCollapsing && _this.props.onCollapsing();
        _this.collapse();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        update_State_({ toggleState: TOGGLE.EXPANDING, display: '' });
        _this.props.onExpanding && _this.props.onExpanding();
        _this.expand();
      } else if (_this._state_.toggleState === TOGGLE.EXPANDING) {
        update_State_({ toggleState: TOGGLE.COLLAPSING, isReverse: true });
        _this.props.onCollapsing && _this.props.onCollapsing();
        _this.collapse();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSING) {
        update_State_({
          toggleState: TOGGLE.EXPANDING,
          display: '',
          isReverse: true
        });
        _this.props.onExpanding && _this.props.onExpanding();
        _this.expand();
      }
    };

    _this.setDuration = function (duration) {
      _this._state_.duration = Math.max(parseInt(duration, 10) || 1);
    };

    _this.setEaseFunction = function (_ref2) {
      var easeIn = _ref2.easeIn,
          easeOut = _ref2.easeOut;

      if (easeIn) _this._state_.easeIn = easeIn;
      if (easeOut) _this._state_.easeOut = easeOut;
    };

    _this.setCollapsedState = function () {
      _this._state_.collasibleElement.style.display = 'none';
      _this._state_.collasibleElement.style.height = '';
      _this._state_.toggleState = TOGGLE.COLLAPSED;
      _this.setState({
        toggleState: TOGGLE.COLLAPSED
      });
      _this.props.onCollapsed && _this.props.onCollapsed();
    };

    _this.collapse = function () {
      if (!_this._state_.collasibleElement) {
        warn('no collapsibleElement');
        return;
      }
      if (_this._state_.toggleState !== TOGGLE.COLLAPSING) {
        return;
      }

      var _this$_state_2 = _this._state_,
          duration = _this$_state_2.duration,
          easeIn = _this$_state_2.easeIn,
          startTime = _this$_state_2.startTime,
          boxHeight = _this$_state_2.boxHeight;

      var elapsedTime = Math.min(duration, _this.now() - startTime);
      var range = elapsedTime / duration;
      var progress = 1 - easeIn(range);
      var currentHeightValue = Math.round(boxHeight * progress);

      if (elapsedTime < duration) {
        _this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        _this._state_.timeout = _this.nextTick(_this.collapse);
      } else {
        _this.setCollapsedState();
      }
    };

    _this.setExpandedState = function () {
      _this._state_.collasibleElement.style.height = '';
      _this._state_.toggleState = TOGGLE.EXPANDED;
      _this.setState({
        toggleState: TOGGLE.EXPANDED
      });
      _this.props.onExpanded && _this.props.onExpanded();
    };

    _this.expand = function () {
      if (!_this._state_.collasibleElement) {
        warn('no collapsibleElement');
        return;
      }
      if (_this._state_.toggleState !== TOGGLE.EXPANDING) {
        return;
      }

      var _this$_state_3 = _this._state_,
          duration = _this$_state_3.duration,
          startTime = _this$_state_3.startTime,
          easeOut = _this$_state_3.easeOut,
          boxHeight = _this$_state_3.boxHeight;

      var elapsedTime = Math.min(duration, _this.now() - startTime);
      var range = elapsedTime / duration;
      var progress = easeOut(range);
      var currentHeightValue = Math.round(boxHeight * progress);

      if (elapsedTime < duration) {
        _this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        _this.nextTick(_this.expand);
      } else {
        _this.setExpandedState();
      }
    };

    _this.nextTick = function (callback) {
      _this._state_.timeout = rAF(callback);
    };

    _this._state_ = {
      collasibleElement: null,
      toggleState: _this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED
    };

    _this.setDuration(_this.props.duration);
    _this.setEaseFunction({
      easeIn: _this.props.easeIn,
      easeOut: _this.props.easeOut
    });

    _this.state = {
      toggleState: _this._state_.toggleState,
      isReverse: false
    };
    return _this;
  }

  _createClass(SlideToggle, [{
    key: 'render',
    value: function render() {
      return this.props.render({
        onToggle: this.onToggle,
        setCollasibleElement: this.setCollapsibleElement,
        toggleState: this.state.toggleState,
        isReverse: this.state.isReverse,
        isMoving: this.isMoving(this.state.toggleState)
      });
    }
  }, {
    key: 'isMoving',
    value: function isMoving(toggleState) {
      return toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING;
    }
  }, {
    key: 'now',
    value: function now() {
      return new Date().getTime();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.easeIn !== this.props.easeIn) {
        this.setEaseFunction({ easeIn: nextProps.easeIn });
      }
      if (nextProps.easeOut !== this.props.easeOut) {
        this.setEaseFunction({ easeOut: nextProps.easeOut });
      }
      if (nextProps.duration !== this.props.duration) {
        this.setDuration(nextProps.duration);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      cAF(this._state_.timeout);
    }
  }]);

  return SlideToggle;
}(_react2.default.Component);

SlideToggle.defaultProps = {
  duration: 300,
  easeIn: cubicInOut,
  easeOut: cubicInOut,
  collapsed: false,
  onExpanded: null,
  onExpanding: null,
  onCollapsed: null,
  onCollapsing: null
};
exports.default = SlideToggle;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("React");

/***/ })
/******/ ]);