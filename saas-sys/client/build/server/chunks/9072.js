"use strict";
exports.id = 9072;
exports.ids = [9072];
exports.modules = {

/***/ 9678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ OrganizationPlanDetails1Table)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9424);
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5612);
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_MoreHoriz__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5453);
/* harmony import */ var _mui_icons_material_MoreHoriz__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MoreHoriz__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_ModeEdit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4465);
/* harmony import */ var _mui_icons_material_ModeEdit__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ModeEdit__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var src_components_scrollbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(734);
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4384);
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(date_fns_format__WEBPACK_IMPORTED_MODULE_11__);





//change//




///////////



const OrganizationPlanDetails1Table = (props)=>{
    const { data = [] } = props;
    const [listAction, setListAction] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const [activeItem, setActiveItem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [showDeleteButton, setShowDeleteButton] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    console.log(activeItem, "activeItem");
    const isRowSelected = (id)=>props.selectedRows.includes(id);
    const handleMenuClose = ()=>{
        setListAction(null);
        setActiveItem(null);
    };
    //////header style /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const StyledTableCell = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__.styled)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()))(({ theme })=>({
            [`&.${_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__.tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.white,
                color: theme.palette.common.black
            },
            [`&.${_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__.tableCellClasses.body}`]: {
                fontSize: 14,
                fontWeight: "bold"
            }
        }));
    const StyledTableRow = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__.styled)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.TableRow)(({ theme })=>({
            // hide last border
            "&:last-child td, &:last-child th": {
                border: 0
            }
        }));
    console.log(data, "sdsadsd>>>>");
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Card, {
        sx: {
            border: "1px solid #eee",
            borderRadius: "10px"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                container: true,
                spacing: 2,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 2,
                        md: 3,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            style: {
                                paddingLeft: "20px"
                            },
                            children: " Subscription plan list"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 1,
                        md: 1.5
                    }),
                    showDeleteButton ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 1,
                        md: 1.5
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 1,
                        md: 1.5
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 8,
                        md: 6
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(src_components_scrollbar__WEBPACK_IMPORTED_MODULE_10__/* .Scrollbar */ .L, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Box, {
                    sx: {
                        minWidth: 800
                    },
                    children: data ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Table, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.TableHead, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledTableRow, {
                                    style: {
                                        backgroundColor: "#f2f2f2",
                                        borderBottom: "1px solid #F1F1F1"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: "SL"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__/* .ORGANIZATION_PLAN */ .qu.NAME
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__/* .ORGANIZATION_PLAN */ .qu.START_DATE
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__/* .ORGANIZATION_PLAN */ .qu.END_DATE
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__/* .ORGANIZATION_PLAN */ .qu.PRICE
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__/* .ORGANIZATION_PLAN */ .qu.USER_LIMIT
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.TableBody, {
                                children: data?.map((organization_plan, index)=>{
                                    const isSelected = isRowSelected(organization_plan.id);
                                    const actualIndex = (index + 1) ?? 0;
                                    const startDate = organization_plan?.start_date ? date_fns_format__WEBPACK_IMPORTED_MODULE_11___default()(new Date(organization_plan?.start_date), "MMMM dd, yyyy") : "N/A";
                                    const endDate = organization_plan?.end_date ? date_fns_format__WEBPACK_IMPORTED_MODULE_11___default()(new Date(organization_plan?.end_date), "MMMM dd, yyyy") : "N/A";
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.TableRow, {
                                        hover: true,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                sx: {
                                                    color: "#9DA4AE",
                                                    textDecoration: "none"
                                                },
                                                children: actualIndex
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Stack, {
                                                    alignItems: "center",
                                                    direction: "row",
                                                    spacing: 2,
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {
                                                        variant: "caption",
                                                        children: organization_plan?.subscription_plan?.name
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {
                                                    variant: "caption",
                                                    children: startDate
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {
                                                    variant: "caption",
                                                    sx: {
                                                        color: "#9DA4AE"
                                                    },
                                                    children: endDate
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {
                                                    variant: "caption",
                                                    sx: {
                                                        color: "#9DA4AE"
                                                    },
                                                    children: [
                                                        organization_plan?.subscription_plan?.price ? organization_plan?.subscription_plan?.price : 0,
                                                        " ",
                                                        props.currency
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {
                                                    variant: "caption",
                                                    sx: {
                                                        color: "#9DA4AE"
                                                    },
                                                    children: organization_plan?.subscription_plan?.user_limit
                                                })
                                            })
                                        ]
                                    }, organization_plan.id);
                                })
                            })
                        ]
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: "Loading..."
                    })
                })
            })
        ]
    });
};
OrganizationPlanDetails1Table.propTypes = {
    count: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
    items: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().array),
    onDeselectAll: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onDeselectOne: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onPageChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onRowsPerPageChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onSelectAll: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onSelectOne: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    page: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
    rowsPerPage: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
    selected: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().array)
};


/***/ }),

/***/ 4609:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ OrganizationPlanDetails2Table)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9424);
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5612);
/* harmony import */ var _mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_icons_material_MoreHoriz__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5453);
/* harmony import */ var _mui_icons_material_MoreHoriz__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MoreHoriz__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_icons_material_ModeEdit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4465);
/* harmony import */ var _mui_icons_material_ModeEdit__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ModeEdit__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var src_components_scrollbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(734);





//change//




///////////


const OrganizationPlanDetails2Table = (props)=>{
    const { data = [] } = props;
    const [listAction, setListAction] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);
    const [activeItem, setActiveItem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const [showDeleteButton, setShowDeleteButton] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    console.log(activeItem, "activeItem");
    const isRowSelected = (id)=>props.selectedRows.includes(id);
    const handleMenuClose = ()=>{
        setListAction(null);
        setActiveItem(null);
    };
    //////header style /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const StyledTableCell = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__.styled)((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()))(({ theme })=>({
            [`&.${_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__.tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.white,
                color: theme.palette.common.black
            },
            [`&.${_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5__.tableCellClasses.body}`]: {
                fontSize: 14,
                fontWeight: "bold"
            }
        }));
    const StyledTableRow = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_6__.styled)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.TableRow)(({ theme })=>({
            // hide last border
            "&:last-child td, &:last-child th": {
                border: 0
            }
        }));
    console.log(data, "kksdaskdsd>>>>");
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Card, {
        sx: {
            border: "1px solid #eee",
            borderRadius: "10px"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                container: true,
                spacing: 2,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 2,
                        md: 3,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h4", {
                            style: {
                                paddingLeft: "20px"
                            },
                            children: " User list"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 1,
                        md: 1.5
                    }),
                    showDeleteButton ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 1,
                        md: 1.5
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 1,
                        md: 1.5
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Grid, {
                        item: true,
                        xs: 8,
                        md: 6
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(src_components_scrollbar__WEBPACK_IMPORTED_MODULE_10__/* .Scrollbar */ .L, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Box, {
                    sx: {
                        minWidth: 800
                    },
                    children: data ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Table, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.TableHead, {
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(StyledTableRow, {
                                    style: {
                                        backgroundColor: "#f2f2f2",
                                        borderBottom: "1px solid #F1F1F1"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: "SL"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__/* .ORGANIZATION_PLAN */ .qu.NAME
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__/* .ORGANIZATION_PLAN */ .qu.EMAIL
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(StyledTableCell, {
                                            children: _common_constantData_language__WEBPACK_IMPORTED_MODULE_4__/* .ORGANIZATION_PLAN */ .qu.USER_MOBILE
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.TableBody, {
                                children: data?.map((organization_plan, index)=>{
                                    const isSelected = isRowSelected(organization_plan.id);
                                    const actualIndex = (index + 1) ?? 0;
                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_9__.TableRow, {
                                        hover: true,
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                sx: {
                                                    color: "#9DA4AE",
                                                    textDecoration: "none"
                                                },
                                                children: actualIndex
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Stack, {
                                                    alignItems: "center",
                                                    direction: "row",
                                                    spacing: 2,
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {
                                                        variant: "caption",
                                                        children: organization_plan?.name
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {
                                                    variant: "caption",
                                                    children: organization_plan?.email
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_TableCell__WEBPACK_IMPORTED_MODULE_5___default()), {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_9__.Typography, {
                                                    variant: "caption",
                                                    sx: {
                                                        color: "#9DA4AE"
                                                    },
                                                    children: organization_plan?.mobile
                                                })
                                            })
                                        ]
                                    }, organization_plan.id);
                                })
                            })
                        ]
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: "Loading..."
                    })
                })
            })
        ]
    });
};
OrganizationPlanDetails2Table.propTypes = {
    count: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
    items: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().array),
    onDeselectAll: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onDeselectOne: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onPageChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onRowsPerPageChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onSelectAll: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    onSelectOne: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
    page: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
    rowsPerPage: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number),
    selected: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().array)
};


/***/ })

};
;