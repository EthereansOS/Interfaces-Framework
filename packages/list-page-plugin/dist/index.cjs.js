'use strict';

var React = require('react');
var designSystem = require('@dfohub/design-system');
var core = require('@dfohub/core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
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

var ListPage = function ListPage(_ref) {
  var setTemplateState = _ref.setTemplateState;

  var _useWeb = core.useWeb3(),
      list = _useWeb.list,
      updateInfo = _useWeb.updateInfo;

  React.useEffect(function () {
    var run = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _i, _Object$keys, key, el;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(list && Object.keys(list).length)) {
                  _context.next = 12;
                  break;
                }

                _i = 0, _Object$keys = Object.keys(list);

              case 2:
                if (!(_i < _Object$keys.length)) {
                  _context.next = 12;
                  break;
                }

                key = _Object$keys[_i];
                el = list[key];

                if (!(el.updating || el.updated)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("continue", 9);

              case 7:
                _context.next = 9;
                return updateInfo(el);

              case 9:
                _i++;
                _context.next = 2;
                break;

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function run() {
        return _ref2.apply(this, arguments);
      };
    }();

    run();
  }, [list, updateInfo]);
  React.useEffect(function () {
    setTemplateState(function (s) {
      return _objectSpread2(_objectSpread2({}, s), {}, {
        headerTitle: 'LIST'
      });
    });
  }, [setTemplateState]);
  return /*#__PURE__*/React__default['default'].createElement(designSystem.Card, null, /*#__PURE__*/React__default['default'].createElement("ul", null, Object.keys(list).map(function (key) {
    var item = list[key];
    return /*#__PURE__*/React__default['default'].createElement("li", {
      key: item.key
    }, "Icon: ", /*#__PURE__*/React__default['default'].createElement("img", {
      src: item.icon,
      alt: "logo"
    }), /*#__PURE__*/React__default['default'].createElement("br", null), "Name: ", item.name, /*#__PURE__*/React__default['default'].createElement("br", null), "Functions: ", item.functionalitiesAmount, /*#__PURE__*/React__default['default'].createElement("br", null), "Start block: ", item.startBlock, /*#__PURE__*/React__default['default'].createElement("br", null), "ENS: ", item.ens && item.ens.toLowerCase() + '.' || '', "dfohub.eth", /*#__PURE__*/React__default['default'].createElement("br", null), "Token: ", item.symbol, /*#__PURE__*/React__default['default'].createElement("br", null), "Address: ", item.dFO.options.address.substring(0, 9) + '...');
  })));
};

var initPlugin = function initPlugin(_ref) {
  var addElement = _ref.addElement;
  addElement('menu', {
    name: 'list',
    label: 'List',
    link: '/list',
    index: 30
  });
  addElement('router', {
    index: 20,
    path: '/list',
    Component: ListPage,
    exact: true,
    requireConnection: true,
    templateProps: {
      selected: 'list',
      showMenu: true
    }
  });
};

var pluginDefinition = {
  name: 'list-page-plugin',
  init: initPlugin
};

module.exports = pluginDefinition;
