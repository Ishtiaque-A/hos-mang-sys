"use strict";
exports.id = 839;
exports.ids = [839];
exports.modules = {

/***/ 839:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ FeatureSearch)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _heroicons_react_24_solid_MagnifyingGlassIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(521);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _heroicons_react_24_solid_ArrowDownOnSquareIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8370);
/* harmony import */ var _heroicons_react_24_solid_ArrowUpOnSquareIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4281);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_heroicons_react_24_solid_MagnifyingGlassIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_ArrowDownOnSquareIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_ArrowUpOnSquareIcon__WEBPACK_IMPORTED_MODULE_4__]);
([_heroicons_react_24_solid_MagnifyingGlassIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_ArrowDownOnSquareIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_ArrowUpOnSquareIcon__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const FeatureSearch = ({ onSearch })=>{
    const handleInputChange = (event)=>{
        const query = event.target.value;
        onSearch(query);
    };
    const handleSearch = ()=>{
    // Perform search operation or additional logic if needed
    // This function can be customized as per your requirements
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Stack, {
        spacing: 3,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Stack, {
            direction: "row",
            justifyContent: "space-between",
            spacing: 4,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.OutlinedInput, {
                onChange: handleInputChange,
                style: {
                    width: "300px",
                    height: "40px",
                    borderRadius: "30px"
                },
                placeholder: "Search",
                startAdornment: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.InputAdornment, {
                    position: "start",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_2__.SvgIcon, {
                        color: "action",
                        fontSize: "small",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_MagnifyingGlassIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {})
                    })
                }),
                sx: {
                    maxWidth: 500,
                    float: "right"
                }
            })
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;