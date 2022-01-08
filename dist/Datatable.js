"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _datatable_state = require("./datatable_state");

var _searchText = require("./searchText");

var _DataTable_style = require("./DataTable_style");

var _Table = _interopRequireDefault(require("./Table/Table"));

var _Pagination = _interopRequireDefault(require("./Pagination/Pagination"));

var _SelectEntriesBox = _interopRequireDefault(require("./SelectEntriesBox/SelectEntriesBox"));

var _SearchBox = _interopRequireDefault(require("./SearchBox/SearchBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Datatable = function Datatable() {
  var _state$currentPage, _state$collection;

  var _useReducer = (0, _react.useReducer)(_datatable_state.reducer, _datatable_state.initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    dispatch({
      type: 'init'
    });
  }, []);
  (0, _react.useEffect)(function () {
    console.log('state changed:', state);
  }, [state]);
  var entriesOptions = [15, 30, 50];

  var selectEntriesAmount = function selectEntriesAmount(n) {
    dispatch({
      type: 'setEntriesPerPage',
      value: n
    });
  };

  var currentlyShowing = (_state$currentPage = state.currentPage) === null || _state$currentPage === void 0 ? void 0 : _state$currentPage.length;
  var listTotal = (_state$collection = state.collection) === null || _state$collection === void 0 ? void 0 : _state$collection.length;

  var changePage = function changePage(pageNumber) {
    dispatch({
      type: 'setCurrentPage',
      value: pageNumber
    });
  };

  var sortListBy = function sortListBy(sortParam, reverse) {
    dispatch({
      type: 'sortList',
      value: {
        sortParam: sortParam,
        reverse: reverse
      }
    });
  };

  var input = document.querySelector('input');

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      searchInputValues = _useState2[0],
      setSearchInputValues = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      suggestions = _useState4[0],
      setSuggestions = _useState4[1];

  var handleSearchChange = function handleSearchChange(e) {
    var query = e.target.value;
    dispatch({
      type: 'searchList',
      value: query
    });

    if (query.length > 2) {
      var sugg = (0, _searchText.searchSuggestions)(query, state.collection);
      setSuggestions(sugg);
    } else {
      setSuggestions([]);
      dispatch({
        type: 'init'
      });
    }
  };

  var handleKeyDown = function handleKeyDown(e) {
    var key = e.code;

    if (key === 'Enter') {
      validateCurrentSearch();
    }
  };

  var validateCurrentSearch = function validateCurrentSearch() {
    var suggestedResults = Array.from(suggestions.values()).flat();
    dispatch({
      type: 'setCollection',
      value: suggestedResults
    });
    dispatch({
      type: 'setEntriesPerPage',
      value: state.entries
    });
    setSuggestions([]);
  };

  var clearInput = function clearInput() {
    if (input.value !== "") {
      setSearchInputValues("");
      input.value = "";
      setSuggestions([]);
      dispatch({
        type: 'init'
      });
    } else {
      return;
    }
  };

  var selectSuggestion = function selectSuggestion(suggestion) {
    input.value = suggestion;
    var resultsOfClickedSuggestion = suggestions.get(suggestion);
    setSuggestions([]);
    dispatch({
      type: 'setCollection',
      value: resultsOfClickedSuggestion
    });
    dispatch({
      type: 'setEntriesPerPage',
      value: state.entries
    });
  };

  var handleSearchSubmit = function handleSearchSubmit() {
    return input.value !== "" ? validateCurrentSearch() : null;
  };

  return /*#__PURE__*/_react.default.createElement(_DataTable_style.ComponentWrapper, null, /*#__PURE__*/_react.default.createElement(_SelectEntriesBox.default, {
    options: entriesOptions,
    selectEntriesAmount: selectEntriesAmount,
    currentlyshowing: currentlyShowing,
    listTotal: listTotal,
    entries: state.entries
  }), /*#__PURE__*/_react.default.createElement(_SearchBox.default, {
    handleSearchChange: handleSearchChange,
    handleSearchSubmit: handleSearchSubmit,
    clearInput: clearInput,
    values: searchInputValues,
    suggestions: suggestions,
    selectSuggestion: selectSuggestion,
    handleKeyDown: handleKeyDown
  }), state.collectionAsPages && /*#__PURE__*/_react.default.createElement(_Table.default, {
    currentPage: state.currentPage,
    sortListBy: sortListBy,
    searchTerm: state.searchTerm
  }), /*#__PURE__*/_react.default.createElement(_Pagination.default, {
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    changePage: changePage
  }));
};

var _default = Datatable;
exports.default = _default;