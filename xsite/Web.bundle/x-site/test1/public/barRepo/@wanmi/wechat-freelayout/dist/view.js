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
/******/ 	return __webpack_require__(__webpack_require__.s = 95);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = xDllContext.React;

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

module.exports = xDllContext.Immutable;

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;
exports.ensureHTTPS = void 0;

function assert(value, message) {
  if (value !== true) {
    throw new Error(message);
  }
}

var ensureHTTPS = function ensureHTTPS(url) {
  return url && url.replace(/^http:/, "https:");
};

exports.ensureHTTPS = ensureHTTPS;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRatio = exports.msg = exports.log = exports.px2px = exports.px2rem = void 0;
var _xDllContext = xDllContext,
    xKit = _xDllContext.xKit,
    msg = _xDllContext.msg;
exports.msg = msg;
var dpr = window.devicePixelRatio || 1;

var px2rem = function px2rem(value) {
  return "".concat(value / 50, "rem");
};

exports.px2rem = px2rem;

var log = xKit && xKit.log || function () {};

exports.log = log;

var getRatio = function getRatio() {
  // document.documentElement.clientWidth 不包括滚动条
  var ratio = window.innerWidth / 375; // .weixin-iphone 兼容老模式.等待删除

  var isEditingMode = document.querySelector(".x-site-editor") !== null || document.querySelector(".weixin-iphone") !== null;
  return isEditingMode ? 1 : ratio;
};

exports.getRatio = getRatio;

var px2px = function px2px(value) {
  return value * getRatio();
};

exports.px2px = px2px;

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function get() {
    return _Text.default;
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _Image.default;
  }
});
Object.defineProperty(exports, "Shape", {
  enumerable: true,
  get: function get() {
    return _Shape.default;
  }
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(0));

var _Text = _interopRequireDefault(__webpack_require__(34));

var _Image = _interopRequireDefault(__webpack_require__(35));

var _Shape = _interopRequireDefault(__webpack_require__(36));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * 组件集合组件
 */


var Element = function Element(props) {
  var type = props.type,
      content = props.content,
      link = props.link;

  var handleClick = function handleClick(e) {
    if (e) e.preventDefault();
    if (link === "javascript:;" || !link) return;
    var _window = window,
        BusinessDataCenter = _window.BusinessDataCenter;
    if (!BusinessDataCenter) return;
    BusinessDataCenter.getResult("xsiteNavigator", link);
  };

  if (type === "text") {
    return _react.default.createElement(_Text.default, {
      content: content,
      onClick: handleClick
    });
  }

  if (type === "image") {
    return _react.default.createElement(_Image.default, Object.assign({}, props, {
      onClick: handleClick
    }));
  }

  if (type === "shape") {
    // line | polygon
    return _react.default.createElement(_Shape.default, Object.assign({}, props, {
      onClick: handleClick
    }));
  } // other ....

};

var _default = Element;
exports.default = _default;

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(0));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

var Text =
/*#__PURE__*/
function (_Component) {
  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, _getPrototypeOf(Text).apply(this, arguments));
  }

  _createClass(Text, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          content = _this$props.content,
          onClick = _this$props.onClick;
      return _react.default.createElement("div", {
        onClick: onClick,
        className: "element element-text",
        dangerouslySetInnerHTML: {
          __html: content
        }
      });
    }
  }]);

  _inherits(Text, _Component);

  return Text;
}(_react.Component);

Text.defaultProps = {
  editable: false,
  content: "<p>双击此处进行编辑</p>",
  link: "javascript:;",
  onClick: function onClick() {}
};
var _default = Text;
exports.default = _default;

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(0));

var _util = __webpack_require__(3);

var _common = __webpack_require__(16);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

var Image =
/*#__PURE__*/
function (_Component) {
  function Image() {
    var _this;

    _classCallCheck(this, Image);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Image).apply(this, arguments));

    _this.makeOptimizedSrc = function () {
      var devicePixelRatio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.devicePixelRatio || 1;
      var useWebp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$props = _this.props,
          underlayerRect = _this$props.underlayerRect,
          cropHandlerRect = _this$props.cropHandlerRect,
          opacity = _this$props.opacity,
          src = _this$props.src,
          w = _this$props.width,
          h = _this$props.height;
      var width = parseFloat(w) || 1;
      var height = parseFloat(h) || 1;
      var dpr = devicePixelRatio;
      var columns = [];

      if (underlayerRect) {
        width = underlayerRect.width;
        height = underlayerRect.height;
      } // OSS图片的宽或者高不能超过4096(同时设置宽高时)
      // 乘积不能超过4096*4096(宽高只设置一个值时)


      var MAX_WIDTH = 4096;

      if (height * dpr > MAX_WIDTH) {
        columns.push({
          name: "resize",
          m: "fixed",
          limit: 0,
          w: width * dpr // w: (MAX_WIDTH * width) / height,
          // h: MAX_WIDTH

        });
      } else if (width * dpr > MAX_WIDTH) {
        columns.push({
          name: "resize",
          m: "fixed",
          limit: 0,
          h: height * dpr // w: MAX_WIDTH,
          // h: (MAX_WIDTH * height) / width

        });
      } else {
        columns.push({
          name: "resize",
          m: "fixed",
          limit: 0,
          w: width * dpr,
          h: height * dpr
        });
      }

      if (useWebp) {
        columns.push({
          name: "format",
          _: "webp"
        });
      }

      if (cropHandlerRect) {
        columns.push({
          name: "crop",
          x: (cropHandlerRect.left - underlayerRect.left) * dpr,
          y: (cropHandlerRect.top - underlayerRect.top) * dpr,
          w: cropHandlerRect.width * dpr,
          h: cropHandlerRect.height * dpr,
          g: "nw"
        });
      }

      columns = columns.map(function (col) {
        var args = Object.keys(col).filter(function (key) {
          return key !== "name";
        }).map(function (key) {
          var val = col[key];
          if (key === "_") return val;
          val = typeof val === "number" ? Math.floor(val) : val;
          return "".concat(key, "_").concat(val);
        });
        args.unshift(col.name);
        return args.join(",");
      });
      return "".concat((0, _common.ensureHTTPS)(src), "?x-oss-process=image/").concat(columns.join("/"));
    };

    return _this;
  }

  _createClass(Image, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        onClick: this.props.onClick,
        className: this.wrapperCls,
        style: this.wrapperStyle
      }, this.img);
    }
  }, {
    key: "shadowStyle",
    get: function get() {
      var _this$props2 = this.props,
          boxShadowDirection = _this$props2.boxShadowDirection,
          boxShadowBlur = _this$props2.boxShadowBlur,
          boxShadowSize = _this$props2.boxShadowSize,
          boxShadowColor = _this$props2.boxShadowColor;
      var deg = boxShadowDirection / 360 * Math.PI * 2;
      var boxShadowX = Math.floor(boxShadowSize * Math.sin(deg));
      var boxShadowY = Math.floor(boxShadowSize * Math.cos(deg));
      return {
        boxShadow: "".concat(boxShadowColor, " ").concat(boxShadowX, "px ").concat(boxShadowY, "px ").concat(boxShadowBlur, "px")
      };
    }
  }, {
    key: "wrapperStyle",
    get: function get() {
      var _this$props3 = this.props,
          poly = _this$props3.poly,
          borderRadius = _this$props3.borderRadius,
          bkgColor = _this$props3.bkgColor,
          cropHandlerRect = _this$props3.cropHandlerRect,
          top = _this$props3.top,
          left = _this$props3.left,
          width = _this$props3.width,
          height = _this$props3.height,
          rotate = _this$props3.rotate;
      var style = Object.assign({
        position: "absolute",
        borderRadius: poly && poly !== "poly-0" ? 0 : borderRadius,
        backgroundColor: bkgColor
      }, this.shadowStyle, {
        overflow: "hidden",
        top: top,
        left: left,
        width: width,
        height: height,
        transform: "translateZ(0) rotate(".concat(rotate, "deg)")
      });

      if (cropHandlerRect) {
        style = Object.assign({}, style, cropHandlerRect);
      }

      style.top = (0, _util.px2rem)(style.top);
      style.left = (0, _util.px2rem)(style.left);
      style.width = (0, _util.px2rem)(style.width);
      style.height = (0, _util.px2rem)(style.height);
      return style;
    }
  }, {
    key: "isEditingMode",
    get: function get() {
      return this.props.ENV_SCENE === "edit";
    } // 编辑: 定位+宽高
    // 展示: oss后缀裁切

  }, {
    key: "imgStyle",
    get: function get() {
      var _this$props4 = this.props,
          underlayerRect = _this$props4.underlayerRect,
          cropHandlerRect = _this$props4.cropHandlerRect,
          opacity = _this$props4.opacity;
      var offsetX = 0;
      var offsetY = 0;
      var width = "100%";
      var height = "100%";

      if (underlayerRect !== null && cropHandlerRect) {
        width = underlayerRect.width;
        height = underlayerRect.height;
        offsetX = underlayerRect.left - cropHandlerRect.left;
        offsetY = underlayerRect.top - cropHandlerRect.top;
      }

      return {
        position: "absolute",
        left: (0, _util.px2rem)(offsetX),
        top: (0, _util.px2rem)(offsetY),
        width: typeof width === "string" ? width : (0, _util.px2rem)(width),
        height: typeof height === "string" ? height : (0, _util.px2rem)(height),
        opacity: opacity
      };
    }
  }, {
    key: "wrapperCls",
    get: function get() {
      var _this$props5 = this.props,
          cropHandlerRect = _this$props5.cropHandlerRect,
          filter = _this$props5.filter,
          poly = _this$props5.poly; // element-image 这个 cls 如果需要修改的话需要注意与之相关的 css

      var ret = "element element-image img-view".split(" ");

      if (cropHandlerRect) {
        ret.push("cropped");
        ret.push(poly);
      }

      if (filter) {
        ret.push(filter);
      }

      return ret.join(" ");
    }
  }, {
    key: "optimizedImgStyle",
    get: function get() {
      var opacity = this.props.opacity;
      return {
        opacity: opacity
      };
    }
  }, {
    key: "img",
    get: function get() {
      return _react.default.createElement("picture", null, _react.default.createElement("source", {
        type: "image/webp",
        srcSet: ["".concat(this.makeOptimizedSrc(1.5, true), " 1.5x"), "".concat(this.makeOptimizedSrc(2, true), " 2x"), "".concat(this.makeOptimizedSrc(2.5, true), " 2.5x"), "".concat(this.makeOptimizedSrc(3, true), " 3x")].join(",")
      }), _react.default.createElement("source", {
        srcSet: ["".concat(this.makeOptimizedSrc(1.5), " 1.5x"), "".concat(this.makeOptimizedSrc(2), " 2x"), "".concat(this.makeOptimizedSrc(2.5), " 2.5x"), "".concat(this.makeOptimizedSrc(3), " 3x")].join(",")
      }), _react.default.createElement("img", {
        src: this.makeOptimizedSrc(1),
        style: this.optimizedImgStyle
      }));
    }
  }]);

  _inherits(Image, _Component);

  return Image;
}(_react.Component);

Image.defaultProps = {
  link: "javascript:;",
  filter: "",
  onClick: function onClick() {}
};
var _default = Image;
exports.default = _default;

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShapePolygon = exports.ShapeLine = exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(0));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

var Shape =
/*#__PURE__*/
function (_Component) {
  function Shape() {
    _classCallCheck(this, Shape);

    return _possibleConstructorReturn(this, _getPrototypeOf(Shape).apply(this, arguments));
  }

  _createClass(Shape, [{
    key: "render",
    value: function render() {
      var svgType = this.props.svgType;
      if (svgType === "line") return _react.default.createElement(ShapeLine, Object.assign({}, this.props));
      return _react.default.createElement(ShapePolygon, Object.assign({}, this.props));
    }
  }]);

  _inherits(Shape, _Component);

  return Shape;
}(_react.Component);

exports.default = Shape;

var ShapeLine =
/*#__PURE__*/
function (_Component2) {
  function ShapeLine() {
    _classCallCheck(this, ShapeLine);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShapeLine).apply(this, arguments));
  }

  _createClass(ShapeLine, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onClick = _this$props.onClick,
          content = _this$props.content,
          color = _this$props.color,
          lineWidth = _this$props.lineWidth,
          lineStyle = _this$props.lineStyle;
      return _react.default.createElement("div", {
        onClick: onClick,
        className: "element element-shape"
      }, _react.default.createElement("svg", {
        style: {
          fill: color
        },
        dangerouslySetInnerHTML: {
          __html: content
        }
      }));
    }
  }]);

  _inherits(ShapeLine, _Component2);

  return ShapeLine;
}(_react.Component);

exports.ShapeLine = ShapeLine;
ShapeLine.defaultProps = {
  color: "#5d9cec",
  onClick: function onClick() {}
};

var ShapePolygon =
/*#__PURE__*/
function (_Component3) {
  function ShapePolygon() {
    _classCallCheck(this, ShapePolygon);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShapePolygon).apply(this, arguments));
  }

  _createClass(ShapePolygon, [{
    key: "getStrokeDashArray",
    // stroke-dasharray: 1, 5; 点线 dotted
    // stroke-dasharray: 5,;   虚线 dashed
    // stroke-dasharray: 0;    实线 solid
    // strokeWidth 0           无   none
    value: function getStrokeDashArray() {
      var _this$props2 = this.props,
          borderWidth = _this$props2.borderWidth,
          borderStyle = _this$props2.borderStyle;
      if (borderStyle === "dotted") return "1, 5";
      if (borderStyle === "dashed") return "5";
      if (borderStyle === "solid") return "0";
      return "none";
    }
  }, {
    key: "getStrokeWidth",
    value: function getStrokeWidth() {
      var _this$props3 = this.props,
          borderColor = _this$props3.borderColor,
          borderWidth = _this$props3.borderWidth,
          borderStyle = _this$props3.borderStyle,
          width = _this$props3.width;
      var ratio = width / 160; // 放大的倍率

      if (!borderColor || borderColor === "none" || borderColor === "transparent") return 0;
      if (!borderStyle || borderStyle === "none") return 0;
      return borderWidth / ratio + "px";
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          onClick = _this$props4.onClick,
          color = _this$props4.color,
          borderColor = _this$props4.borderColor,
          content = _this$props4.content;
      return _react.default.createElement("div", {
        onClick: onClick,
        className: "element element-shape"
      }, _react.default.createElement("svg", {
        style: {
          fill: color,
          stroke: borderColor,
          strokeWidth: this.getStrokeWidth(),
          strokeDasharray: this.getStrokeDashArray()
        },
        dangerouslySetInnerHTML: {
          __html: content
        }
      }));
    }
  }]);

  _inherits(ShapePolygon, _Component3);

  return ShapePolygon;
}(_react.Component);

exports.ShapePolygon = ShapePolygon;
ShapePolygon.defaultProps = {
  color: "#5d9cec",
  borderWidth: 1,
  borderColor: "transparent",
  borderStyle: "solid",
  onClick: function onClick() {}
};

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(0));

var _util = __webpack_require__(3);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

var Background =
/*#__PURE__*/
function (_Component) {
  function Background() {
    _classCallCheck(this, Background);

    return _possibleConstructorReturn(this, _getPrototypeOf(Background).apply(this, arguments));
  }

  _createClass(Background, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          bkgImgRect = _this$props.bkgImgRect,
          bkgLayerSize = _this$props.bkgLayerSize,
          bkgImgSrc = _this$props.bkgImgSrc,
          bkgColor = _this$props.bkgColor,
          bkgSvg = _this$props.bkgSvg,
          bkgImgOpacity = _this$props.bkgImgOpacity,
          bkgSvgOpacity = _this$props.bkgSvgOpacity,
          bkgSvgColor = _this$props.bkgSvgColor;
      return _react.default.createElement("div", {
        className: "bkg-layer",
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: bkgColor
        },
        onClick: function onClick() {
          if (_this.props.onBkgClick) _this.props.onBkgClick();
        }
      }, bkgImgSrc && _react.default.createElement("img", {
        src: bkgImgSrc,
        style: {
          top: bkgImgRect.y,
          left: bkgImgRect.x,
          width: (0, _util.px2rem)(bkgImgRect.width),
          height: (0, _util.px2rem)(bkgImgRect.height),
          opacity: bkgImgOpacity || 1,
          display: bkgSvg ? "none" : "block"
        }
      }), bkgSvg && _react.default.createElement("svg", {
        style: {
          fillOpacity: bkgSvgOpacity,
          fill: bkgSvgColor,
          stroke: bkgSvgColor
        },
        dangerouslySetInnerHTML: {
          __html: bkgSvg
        }
      }));
    }
  }]);

  _inherits(Background, _Component);

  return Background;
}(_react.Component);

exports.default = Background;
Background.defaultProps = {
  bkgLayerSize: {
    width: 0,
    height: 0
  },
  bkgImgCropSize: {
    width: 0,
    height: 0
  },
  bkgImgCropRect: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  bkgImgSize: {
    width: 0,
    height: 0
  },
  bkgImgRect: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  bkgSvgColor: "#666",
  bkgColor: "#fff"
};

/***/ }),

/***/ 95:
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

var _react = _interopRequireWildcard(__webpack_require__(0));

var _ElementBox = _interopRequireDefault(__webpack_require__(96));

var _Element = _interopRequireDefault(__webpack_require__(33));

var _Background = _interopRequireDefault(__webpack_require__(37));

__webpack_require__(97);

__webpack_require__(98);

var _immutable = __webpack_require__(13);

var _util = __webpack_require__(3);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
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

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) {
    return o.__proto__;
  };

  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var FreeLayoutBar =
/*#__PURE__*/
function (_Component) {
  function FreeLayoutBar() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, FreeLayoutBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FreeLayoutBar)).call.apply(_getPrototypeOf2, [this].concat(args))), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "props", void 0), _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fixChromeSvgNotReflowBug", function () {
      var list = document.querySelectorAll(".qmBar svg");

      var reflow = function reflow(ele) {
        var p = ele.parentNode;
        setTimeout(function () {
          p.removeChild(ele);
          p.appendChild(ele);
        }, 10);
      };

      Array.from(list).forEach(reflow);
    }), _temp));
  }

  _createClass(FreeLayoutBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _util.msg.on("closeEditBox", this.fixChromeSvgNotReflowBug);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      _util.msg.off("closeEditBox", this.fixChromeSvgNotReflowBug);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dataWidgetPath = _this$props.dataWidgetPath,
          ENV_EDITING = _this$props.ENV_EDITING,
          items = _this$props.items,
          container = _this$props.container;
      return _react.default.createElement("div", {
        className: "qmBar freeLayoutBar",
        "data-widget-path": dataWidgetPath
      }, _react.default.createElement("div", {
        className: "qmGroup",
        "data-widget-path": dataWidgetPath,
        style: {
          height: (0, _util.px2rem)(container.get("height")),
          position: "relative",
          width: "100%"
        }
      }, _react.default.createElement(_Background.default, container.toJS()), items.map(function (data, index) {
        data = data.toJS();

        var _data = data,
            id = _data.id,
            type = _data.type,
            content = _data.content,
            link = _data.link,
            styles = _objectWithoutProperties(_data, ["id", "type", "content", "link"]);

        var config = {
          type: type,
          content: content,
          link: link
        };
        return _react.default.createElement(_ElementBox.default, _extends({
          key: index,
          type: type
        }, styles), _react.default.createElement(_Element.default, data));
      })));
    }
  }]);

  _inherits(FreeLayoutBar, _Component);

  return FreeLayoutBar;
}(_react.Component);

_defineProperty(FreeLayoutBar, "defaultProps", {
  items: (0, _immutable.List)([])
});

var _default = FreeLayoutBar;
exports.default = _default;

__XSite_widgetInject(FreeLayoutBar, {
  widgetNameSpace: "@wanmi/wechat-freelayout",
  isProxy: false
});

__XSite_widgetInject(FreeLayoutBar, {
  widgetNameSpace: "x-site-ui-wechat/widget-bar/free-layout-bar/free-layout-bar",
  isProxy: false
});

/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(0));

var _util = __webpack_require__(3);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
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

var ElementBox =
/*#__PURE__*/
function (_Component) {
  function ElementBox() {
    _classCallCheck(this, ElementBox);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementBox).apply(this, arguments));
  }

  _createClass(ElementBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          opacity = _this$props.opacity,
          borderRadius = _this$props.borderRadius,
          borderWidth = _this$props.borderWidth,
          borderColor = _this$props.borderColor,
          borderStyle = _this$props.borderStyle,
          backgroundColor = _this$props.backgroundColor;
      var _this$props2 = this.props,
          skewX = _this$props2.skewX,
          skewY = _this$props2.skewY,
          lineHeight = _this$props2.lineHeight,
          letterSpacing = _this$props2.letterSpacing,
          textAlign = _this$props2.textAlign,
          writingMode = _this$props2.writingMode,
          fontFamily = _this$props2.fontFamily,
          fontSize = _this$props2.fontSize,
          color = _this$props2.color,
          underline = _this$props2.underline,
          fontItalic = _this$props2.fontItalic,
          fontBold = _this$props2.fontBold,
          rotate = _this$props2.rotate;
      var elementStyle = {
        opacity: opacity,
        borderRadius: borderRadius
      };
      var bw = borderStyle === "none" ? 0 : borderWidth;

      if (type !== "image") {
        elementStyle = Object.assign({}, elementStyle, {
          transform: "rotate(".concat(rotate, "deg)")
        });
      }

      if (type === "text") {
        elementStyle = Object.assign({}, elementStyle, this.shadowStyle, {
          border: "".concat(borderWidth, "px ").concat(borderStyle, " ").concat(borderColor),
          color: color,
          backgroundColor: backgroundColor,
          transform: "skew(".concat(skewX, "deg, ").concat(skewY, "deg) rotate(").concat(rotate, "deg)"),
          lineHeight: lineHeight,
          textAlign: textAlign,
          letterSpacing: "".concat(letterSpacing / 100, "em"),
          writingMode: writingMode,
          fontFamily: fontFamily,
          fontSize: (0, _util.px2rem)(fontSize),
          fontWeight: fontBold ? "bold" : "normal",
          fontStyle: fontItalic ? "italic" : "normal",
          textDecoration: underline ? "underline" : "none"
        });
      }

      return _react.default.createElement("div", {
        className: this.boxCls,
        style: this.boxStyle
      }, _react.default.createElement("div", {
        className: "element-wrapper",
        style: elementStyle
      }, this.props.children));
    }
  }, {
    key: "shadowStyle",
    // box阴影样式
    get: function get() {
      var _this$props3 = this.props,
          boxShadowDirection = _this$props3.boxShadowDirection,
          boxShadowBlur = _this$props3.boxShadowBlur,
          boxShadowSize = _this$props3.boxShadowSize,
          boxShadowColor = _this$props3.boxShadowColor;
      var deg = boxShadowDirection / 360 * Math.PI * 2;
      var boxShadowX = Math.floor(boxShadowSize * Math.sin(deg));
      var boxShadowY = Math.floor(boxShadowSize * Math.cos(deg));
      return {
        boxShadow: "".concat(boxShadowColor, " ").concat((0, _util.px2rem)(boxShadowX), "\n      ").concat((0, _util.px2rem)(boxShadowY), " ").concat((0, _util.px2rem)(boxShadowBlur))
      };
    }
  }, {
    key: "boxStyle",
    get: function get() {
      var _this$props4 = this.props,
          type = _this$props4.type,
          top = _this$props4.top,
          left = _this$props4.left,
          height = _this$props4.height,
          width = _this$props4.width,
          rotate = _this$props4.rotate,
          zIndex = _this$props4.zIndex;

      if (type === "image") {
        return {
          zIndex: zIndex
        };
      }

      return {
        width: width,
        height: height,
        left: (0, _util.px2rem)(left),
        top: (0, _util.px2rem)(top),
        transform: "translateZ(0) scale(".concat((0, _util.getRatio)(), ")"),
        transformOrigin: "left top",
        zIndex: zIndex
      };
    }
  }, {
    key: "boxCls",
    get: function get() {
      var cls = ["element-box"];
      var type = this.props.type;

      if (type === "image") {
        cls.push("image");
      }

      return cls.join(" ");
    }
  }]);

  _inherits(ElementBox, _Component);

  return ElementBox;
}(_react.Component);

ElementBox.defaultProps = {
  opacity: 1,
  backgroundColor: "transparent",
  borderRadius: 0,
  boxShadowDirection: 0,
  boxShadowBlur: 0,
  boxShadowSize: 0,
  boxShadowColor: "transparent",
  // 文字专有
  skewX: 0,
  skewY: 0,
  borderWidth: 0,
  borderColor: "transparent",
  borderStyle: "solid",
  textAlign: "center",
  lineHeight: 1.5,
  letterSpacing: 0,
  active: false,
  writingMode: "horizontal-tb",
  fontFamily: "inherit",
  fontSize: 20,
  color: "#666",
  underline: false,
  fontItalic: false,
  fontBold: false,
  // 图片专有
  filter: "none",
  onSelect: function onSelect() {}
};
var _default = ElementBox;
exports.default = _default;

/***/ }),

/***/ 97:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 98:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });