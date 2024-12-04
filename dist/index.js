"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ExcelFile = _interopRequireDefault(require("./ExcelPlugin/components/ExcelFile"));
var _ExcelSheet = _interopRequireDefault(require("./ExcelPlugin/elements/ExcelSheet"));
var _ExcelColumn = _interopRequireDefault(require("./ExcelPlugin/elements/ExcelColumn"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_ExcelFile["default"].ExcelSheet = _ExcelSheet["default"];
_ExcelFile["default"].ExcelColumn = _ExcelColumn["default"];
var ReactExport = {
  ExcelFile: _ExcelFile["default"]
};
var _default = exports["default"] = ReactExport;
exports.modules = {
  ExcelFile: _ExcelFile["default"],
  ExcelSheet: _ExcelSheet["default"],
  ExcelColumn: _ExcelColumn["default"]
};