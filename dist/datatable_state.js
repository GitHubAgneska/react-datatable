"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.initialState = void 0;

var _mockData = _interopRequireDefault(require("./mockData.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// ......................................................
// INITIAL STATE
// ......................................................
var initialState = {
  collection: null,
  sorted: false,
  sortedBy: {
    sortParam: '',
    reverse: false
  },
  searchActive: false,
  searchTerm: '',
  collectionAsPages: null,
  entries: 0,
  currentPage: null,
  currentPageIndex: null,
  totalPages: null
}; // ......................................................
// REDUCER
// ......................................................

exports.initialState = initialState;

var reducer = function reducer(state, action) {
  var newState;

  switch (action.type) {
    case 'init':
      newState = _objectSpread(_objectSpread({}, state), {}, {
        collection: _mockData.default.list,
        entries: 15,
        currentPageIndex: 0
      });
      return setUpPages(newState);

    case 'setCollection':
      if (state.collection && state.collection.length > 0) {
        state.collection = null;
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        collection: action.value
      });

    case 'setCollectionAsPages':
      if (state.collectionAsPages && state.collectionAsPages.length > 0) {
        state.collectionAsPages = null;
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        collectionAsPages: action.value
      });

    case 'setEntriesPerPage':
      var requestedEntries = action.value;
      newState = _objectSpread(_objectSpread({}, state), {}, {
        entries: requestedEntries
      });
      return setUpPages(newState);

    case 'setCurrentPage':
      var requestedIndex = action.value;
      var collectionPages = state.collectionAsPages;
      return _objectSpread(_objectSpread({}, state), {}, {
        currentPageIndex: requestedIndex,
        currentPage: collectionPages[requestedIndex]
      });

    case 'sortList':
      var sortParam = action.value.sortParam;
      var reverse = action.value.reverse;
      newState = _objectSpread(_objectSpread({}, state), {}, {
        sortedBy: {
          sortParam: sortParam,
          reverse: reverse
        }
      });
      return reduceSort(newState);

    case 'searchList':
      return _objectSpread(_objectSpread({}, state), {}, {
        searchTerm: action.value,
        searchActive: true
      });
    //default: throw new Error (`${action.type} is not a valid action`)

    default:
      return state;
  }
}; // ......................................................
// REDUCERS FUNCTIONS
// ......................................................


exports.reducer = reducer;

var setUpPages = function setUpPages(state) {
  var _state$currentPageInd;

  var currentList = state.collection;
  var currentIndex = (_state$currentPageInd = state.currentPageIndex) !== null && _state$currentPageInd !== void 0 ? _state$currentPageInd : 0;
  var entries = state.entries;
  var outputPages = [];
  var from = 0;
  var totalPages = Math.floor(currentList.length / entries); // setup pages arrays

  for (var i = from; i <= totalPages; i++) {
    var to = from + entries;
    outputPages.push(currentList.slice(from, to));
    from += entries;
  }

  if (state.collectionAsPages && state.collectionAsPages.length) {
    state.collectionAsPages = [];
  }

  return _objectSpread(_objectSpread({}, state), {}, {
    entries: entries,
    totalPages: totalPages,
    collectionAsPages: [].concat(outputPages),
    currentPageIndex: currentIndex,
    currentPage: outputPages[currentIndex]
  });
};

var reduceSort = function reduceSort(state) {
  var newState;
  var _state$sortedBy = state.sortedBy,
      sortParam = _state$sortedBy.sortParam,
      reverse = _state$sortedBy.reverse;
  var currentList = state.collection;

  var sortedList = _toConsumableArray(currentList); // ---- for 'sort()' will try to mutate 'currentList' and fail ---- !


  !reverse ? sortedList.sort(function (a, b) {
    return a[sortParam].localeCompare(b[sortParam]);
  }) // a, b = employee objects of employees array
  : sortedList.sort(function (a, b) {
    return b[sortParam].localeCompare(a[sortParam]);
  }); // if prop is an object : :a[sortParam].name.localeCompare(b[sortParam].name)

  newState = _objectSpread(_objectSpread({}, state), {}, {
    sorted: true,
    sortedBy: {
      sortParam: sortParam,
      reverse: reverse
    },
    collection: _toConsumableArray(sortedList)
  });
  return setUpPages(newState);
};