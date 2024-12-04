"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _fileSaver = require("file-saver");
var _xlsx = _interopRequireDefault(require("xlsx"));
var _ExcelSheet = _interopRequireDefault(require("../elements/ExcelSheet"));
var _DataUtil = require("../utils/DataUtil");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ExcelFile = /*#__PURE__*/function (_React$Component) {
  function ExcelFile(props) {
    var _this;
    _classCallCheck(this, ExcelFile);
    _this = _callSuper(this, ExcelFile, [props]);
    _defineProperty(_this, "fileExtensions", ["xlsx", "xls", "csv", "txt", "html"]);
    _defineProperty(_this, "defaultFileExtension", "xlsx");
    if (_this.props.hideElement) {
      _this.download();
    } else {
      _this.handleDownload = _this.download.bind(_this);
    }
    _this.createSheetData = _this.createSheetData.bind(_this);
    return _this;
  }
  _inherits(ExcelFile, _React$Component);
  return _createClass(ExcelFile, [{
    key: "createSheetData",
    value: function createSheetData(sheet) {
      var columns = sheet.props.children;
      var sheetData = [_react["default"].Children.map(columns, function (column) {
        return column.props.label;
      })];
      var data = typeof sheet.props.data === "function" ? sheet.props.data() : sheet.props.data;
      data.forEach(function (row) {
        var sheetRow = [];
        _react["default"].Children.forEach(columns, function (column) {
          var getValue = typeof column.props.value === "function" ? column.props.value : function (row) {
            return row[column.props.value];
          };
          var itemValue = getValue(row);
          sheetRow.push(isNaN(itemValue) ? itemValue || "" : itemValue);
        });
        sheetData.push(sheetRow);
      });
      return sheetData;
    }
  }, {
    key: "download",
    value: function download() {
      var _this2 = this;
      var wb = {
        SheetNames: _react["default"].Children.map(this.props.children, function (sheet) {
          return sheet.props.name;
        }),
        Sheets: {}
      };
      _react["default"].Children.forEach(this.props.children, function (sheet) {
        if (typeof sheet.props.dataSet === "undefined" || sheet.props.dataSet.length === 0) {
          wb.Sheets[sheet.props.name] = (0, _DataUtil.excelSheetFromAoA)(_this2.createSheetData(sheet));
        } else {
          wb.Sheets[sheet.props.name] = (0, _DataUtil.excelSheetFromDataSet)(sheet.props.dataSet);
        }
      });
      var fileExtension = this.getFileExtension();
      var fileName = this.getFileName();
      var wbout = _xlsx["default"].write(wb, {
        bookType: fileExtension,
        bookSST: true,
        type: "binary"
      });
      (0, _fileSaver.saveAs)(new Blob([(0, _DataUtil.strToArrBuffer)(wbout)], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }), fileName);
    }
  }, {
    key: "getFileName",
    value: function getFileName() {
      if (this.props.filename === null || typeof this.props.filename !== "string") {
        throw Error("Invalid file name provided");
      }
      return this.getFileNameWithExtension(this.props.filename, this.getFileExtension());
    }
  }, {
    key: "getFileExtension",
    value: function getFileExtension() {
      var extension = this.props.fileExtension;
      if (extension.length === 0) {
        var slugs = this.props.filename.split(".");
        if (slugs.length === 0) {
          throw Error("Invalid file name provided");
        }
        extension = slugs[slugs.length - 1];
      }
      if (this.fileExtensions.indexOf(extension) !== -1) {
        return extension;
      }
      return this.defaultFileExtension;
    }
  }, {
    key: "getFileNameWithExtension",
    value: function getFileNameWithExtension(filename, extension) {
      return "".concat(filename, ".").concat(extension);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        hideElement = _this$props.hideElement,
        element = _this$props.element;
      if (hideElement) {
        return null;
      } else {
        return /*#__PURE__*/_react["default"].createElement("span", {
          onClick: this.handleDownload
        }, element);
      }
    }
  }]);
}(_react["default"].Component);
_defineProperty(ExcelFile, "props", {
  hideElement: _propTypes["default"].bool,
  filename: _propTypes["default"].string,
  fileExtension: _propTypes["default"].string,
  element: _propTypes["default"].any,
  children: function children(props, propName, componentName) {
    _react["default"].Children.forEach(props[propName], function (child) {
      if (child.type !== _ExcelSheet["default"]) {
        throw new Error("<ExcelFile> can only have <ExcelSheet> as children. ");
      }
    });
  }
});
_defineProperty(ExcelFile, "defaultProps", {
  hideElement: false,
  filename: "Download",
  fileExtension: "xlsx",
  element: /*#__PURE__*/_react["default"].createElement("button", null, "Download")
});
var _default = exports["default"] = ExcelFile;