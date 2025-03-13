"use strict";
exports.id = 9090;
exports.ids = [9090,4101,9114,9491,6278];
exports.modules = {

/***/ 6278:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9174);
/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3765);
/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_3__);




const Alert = ({ open, onClose, message })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_2___default()), {
        open: open,
        autoHideDuration: 6000,
        onClose: onClose,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Alert__WEBPACK_IMPORTED_MODULE_3___default()), {
            onClose: onClose,
            severity: "success",
            sx: {
                width: "100%"
            },
            children: message
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alert);


/***/ }),

/***/ 515:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9174);
/* harmony import */ var _mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3765);
/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_3__);




const Alert = ({ open, onClose, message })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Snackbar__WEBPACK_IMPORTED_MODULE_2___default()), {
        open: open,
        autoHideDuration: 6000,
        onClose: onClose,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Alert__WEBPACK_IMPORTED_MODULE_3___default()), {
            onClose: onClose,
            variant: "filled",
            severity: "error",
            sx: {
                width: "100%"
            },
            children: message
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Alert);


/***/ })

};
;