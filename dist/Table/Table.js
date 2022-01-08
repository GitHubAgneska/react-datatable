"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TableHeader = _interopRequireDefault(require("./Table-header"));

var _DataTable_style = require("../DataTable_style");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function Table(_ref) {
  var currentPage = _ref.currentPage,
      sortListBy = _ref.sortListBy,
      searchTerm = _ref.searchTerm;
  var currentQuery = searchTerm;
  var tableHead = ['firstName', 'lastName', 'dob', 'startDate', 'street', 'city', 'state', 'zipcode', 'department'];

  var tableRow = function tableRow(employee) {
    // eslint-disable-next-line no-unused-vars
    var key = employee.key,
        value = employee.value;
    var tableCell = [].concat(tableHead);
    var columnData = tableCell.map(function (prop) {
      var valueToDisplay; // if prop is an object => if ( key[prop].hasOwnProperty('----') ) { valueToDisplay = key[prop]['----'] }

      if (prop === 'dob' || prop === 'startDate') {
        valueToDisplay = (0, _moment.default)(key[prop]).format('MM/DD/YY');
      } else {
        valueToDisplay = key[prop];
      }

      var match = false;

      if (currentQuery.length > 2 && valueToDisplay.toLowerCase().includes(currentQuery)) {
        match = true;
      }

      return /*#__PURE__*/React.createElement("td", {
        key: Math.random(),
        style: {
          backgroundColor: match ? 'yellow' : 'none'
        }
      }, valueToDisplay);
    });
    return /*#__PURE__*/React.createElement(_DataTable_style.StyledTableRow, {
      key: Math.random()
    }, columnData);
  };

  var tableData = function tableData() {
    return currentPage.map(function (key, index) {
      return tableRow({
        key: key,
        index: index
      });
    });
  };

  return /*#__PURE__*/React.createElement(_DataTable_style.TableWrapper, null, /*#__PURE__*/React.createElement(_DataTable_style.StyledTable, null, /*#__PURE__*/React.createElement(_DataTable_style.StyledTableHeader, null, /*#__PURE__*/React.createElement(_TableHeader.default, {
    sortListBy: sortListBy
  })), /*#__PURE__*/React.createElement("tbody", null, tableData())));
};

var _default = Table;
exports.default = _default;
Table.propTypes = {
  currentPage: _propTypes.default.array.isRequired,
  sortListBy: _propTypes.default.func.isRequired
};