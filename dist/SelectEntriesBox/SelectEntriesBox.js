"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SelectEntriesBox_style = require("./SelectEntriesBox_style");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectEntriesBox = function SelectEntriesBox(_ref) {
  var options = _ref.options,
      entries = _ref.entries,
      selectEntriesAmount = _ref.selectEntriesAmount,
      currentlyshowing = _ref.currentlyshowing,
      listTotal = _ref.listTotal;
  return /*#__PURE__*/_react.default.createElement(_SelectEntriesBox_style.SelectEntriesBoxWrapper, null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "entries"
  }, "Show per page:"), /*#__PURE__*/_react.default.createElement("select", {
    options: options,
    name: "entries",
    value: entries,
    onChange: function onChange(e) {
      return console.log(e.target.value);
    },
    "aria-required": "true"
  }, options.map(function (o) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: Math.random(),
      onClick: function onClick() {
        selectEntriesAmount(o);
      }
    }, o);
  })), /*#__PURE__*/_react.default.createElement("div", {
    currentlyshowing: currentlyshowing
  }, "Showing: ", currentlyshowing, " of ", listTotal));
};

var _default = SelectEntriesBox;
exports.default = _default;
SelectEntriesBox.propTypes = {
  options: _propTypes.default.array.isRequired,
  selectEntriesAmount: _propTypes.default.func.isRequired,
  currentlyshowing: _propTypes.default.number,
  listTotal: _propTypes.default.number
};