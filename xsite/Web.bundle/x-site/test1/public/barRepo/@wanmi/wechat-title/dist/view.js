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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = xDllContext.React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof3 = function _typeof3(obj) { return typeof obj; }; } else { _typeof3 = function _typeof3(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof3(obj); }

function _typeof2(obj) {
  if (typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return _typeof3(obj);
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof3(obj);
    };
  }

  return _typeof2(obj);
}

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Title = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  _setPrototypeOf(subClass.prototype, superClass && superClass.prototype);

  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) {
    return o.__proto__;
  };

  return _getPrototypeOf(o);
}

var WidgetTitleBar =
/*#__PURE__*/
function (_React$Component) {
  function WidgetTitleBar() {
    _classCallCheck(this, WidgetTitleBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(WidgetTitleBar).apply(this, arguments));
  }

  _createClass(WidgetTitleBar, [{
    key: "render",
    value: function render() {
      var dataWidgetPath = this.props.dataWidgetPath;
      return _react.default.createElement("div", {
        className: "qmBar x-site-ui-public-weixin-titlebar",
        "data-widget-path": dataWidgetPath
      }, _react.default.createElement("div", {
        className: "qmGroup",
        "data-widget-path": dataWidgetPath
      }, _react.default.createElement(_Title.default, this.props)));
    }
  }]);

  _inherits(WidgetTitleBar, _React$Component);

  return WidgetTitleBar;
}(_react.default.Component);

exports.default = WidgetTitleBar;

__XSite_widgetInject(WidgetTitleBar, {
  widgetNameSpace: "@wanmi/wechat-title",
  isProxy: false
});

__XSite_widgetInject(WidgetTitleBar, {
  widgetNameSpace: "x-site-ui-public-weixin/widget-bar/title-bar/demoA/weixinDIYTitle",
  isProxy: false
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

__webpack_require__(3);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  _setPrototypeOf(subClass.prototype, superClass && superClass.prototype);

  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) {
    return o.__proto__;
  };

  return _getPrototypeOf(o);
}

var ImgComp = window.xDllContext.commonComp.xImage;
var _window = window,
    _window$BusinessDataC = _window.BusinessDataCenter,
    BusinessDataCenter = _window$BusinessDataC === void 0 ? {} : _window$BusinessDataC;

var MainTitle = function MainTitle(_ref) {
  var title = _ref.title,
      image = _ref.image,
      imageStyle = _ref.imageStyle,
      color = _ref.color,
      hasThemeColor = _ref.hasThemeColor;
  var isIcon = !/\/\//.test(image);
  return _react.default.createElement("div", {
    className: "publicTitle-mainTitle ".concat(imageStyle, " ").concat(hasThemeColor ? "x-site-color" : ""),
    style: {
      color: color
    }
  }, imageStyle === "show" && isIcon && _react.default.createElement("i", {
    className: "x-site-new-qIcon publicTitle-image ".concat(image)
  }, " "), imageStyle === "show" && !isIcon && _react.default.createElement(ImgComp, {
    w: 16,
    className: "publicTitle-image",
    imgSrc: image,
    enableLazyLoad: true
  }), title);
};

var SubTitle = function SubTitle(_ref2) {
  var subTitle = _ref2.subTitle;
  return _react.default.createElement("div", {
    className: "publicTitle-subTitle"
  }, subTitle);
};

var TextLink = function TextLink(_ref3) {
  var link = _ref3.link,
      linkText = _ref3.linkText;
  return _react.default.createElement("a", {
    href: "javascript:;",
    onClick: function onClick() {
      if (!BusinessDataCenter) return;
      BusinessDataCenter.getResult("go_link", link);
    },
    className: "publicTitle-textLink"
  }, linkText, _react.default.createElement("span", {
    className: "x-site-new-qIcon xSite-you"
  }, " "));
};

var Title =
/*#__PURE__*/
function (_React$Component) {
  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, _getPrototypeOf(Title).apply(this, arguments));
  }

  _createClass(Title, [{
    key: "getType",
    value: function getType() {
      var style = this.props.style;
      if (style.indexOf("simple") > -1) return "simple";
      if (style.indexOf("full") > -1) return "full";
      if (style.indexOf("normal") > -1) return "normal";
      return "normal";
    }
  }, {
    key: "getLayout",
    value: function getLayout() {
      return this.props.style.indexOf("vertical") > -1 ? "vertical" : "horizontal";
    }
  }, {
    key: "getTitleStyle",
    value: function getTitleStyle() {
      var style = this.props.style;
      if (style.indexOf("border") > -1) return "border";
      if (style.indexOf("show") > -1) return "show";
      if (style.indexOf("none") > -1) return "none";
      return "";
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          image = _this$props.image,
          subTitle = _this$props.subTitle,
          link = _this$props.link,
          linkText = _this$props.linkText,
          style = _this$props.style,
          imageStyle = _this$props.imageStyle,
          color = _this$props.color,
          titleColor = _this$props.titleColor,
          hasThemeColor = _this$props.hasThemeColor;
      var type = this.getType();
      var layout = this.getLayout();
      var hasLine = style.indexOf("line") > -1 ? "hasLine" : ""; // const titleStyle = getTitleStyle(style);

      return _react.default.createElement("div", {
        className: "publicTitle-container ".concat(hasLine)
      }, _react.default.createElement("div", {
        className: "publicTitle ".concat(style, " ").concat(layout),
        style: {
          color: color
        }
      }, _react.default.createElement(MainTitle, {
        title: title,
        image: image,
        hasThemeColor: hasThemeColor,
        imageStyle: imageStyle,
        color: titleColor
      }), type !== "simple" && _react.default.createElement(SubTitle, {
        subTitle: subTitle
      }), type === "full" && _react.default.createElement(TextLink, {
        link: link,
        linkText: linkText
      })));
    }
  }]);

  _inherits(Title, _React$Component);

  return Title;
}(_react.default.Component);

exports.default = Title;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);