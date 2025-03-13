"use strict";
exports.id = 8018;
exports.ids = [8018];
exports.modules = {

/***/ 8018:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ Layout)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(580);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
// EXTERNAL MODULE: external "@mui/material/styles"
var styles_ = __webpack_require__(8442);
;// CONCATENATED MODULE: ./src/components/logo.js


const Logo = ()=>{
    const theme = (0,styles_.useTheme)();
    const fillColor = theme.palette.primary.main;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        fill: "none",
        height: "100%",
        viewBox: "0 0 24 24",
        width: "100%",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("path", {
                opacity: 0.16,
                d: "M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z",
                fill: fillColor
            }),
            /*#__PURE__*/ jsx_runtime.jsx("path", {
                d: "M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z",
                fill: fillColor
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/layouts/auth/layout.js





// TODO: Change subtitle text
const Layout = (props)=>{
    const { children } = props;
    return /*#__PURE__*/ jsx_runtime.jsx(material_.Box, {
        component: "main",
        sx: {
            display: "flex",
            flex: "1 1 auto"
        },
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(material_.Unstable_Grid2, {
            container: true,
            sx: {
                flex: "1 1 auto"
            },
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(material_.Unstable_Grid2, {
                    xs: 12,
                    lg: 6,
                    sx: {
                        backgroundColor: "background.paper",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative"
                    },
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(material_.Box, {
                            component: "header",
                            sx: {
                                left: 0,
                                p: 3,
                                position: "fixed",
                                top: 0,
                                width: "100%"
                            },
                            children: /*#__PURE__*/ jsx_runtime.jsx(material_.Box, {
                                component: (link_default()),
                                href: "/",
                                sx: {
                                    display: "inline-flex",
                                    height: 32,
                                    width: 32
                                },
                                children: /*#__PURE__*/ jsx_runtime.jsx(Logo, {})
                            })
                        }),
                        children
                    ]
                }),
                /*#__PURE__*/ jsx_runtime.jsx(material_.Unstable_Grid2, {
                    xs: 12,
                    lg: 6,
                    sx: {
                        alignItems: "center",
                        background: "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        "& img": {
                            maxWidth: "100%"
                        }
                    },
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(material_.Box, {
                        sx: {
                            p: 3
                        },
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)(material_.Typography, {
                                align: "center",
                                color: "inherit",
                                sx: {
                                    fontSize: "24px",
                                    lineHeight: "32px",
                                    mb: 1
                                },
                                variant: "h1",
                                children: [
                                    "Welcome to",
                                    " ",
                                    /*#__PURE__*/ jsx_runtime.jsx(material_.Box, {
                                        component: "a",
                                        sx: {
                                            color: "#15B79E"
                                        },
                                        target: "_blank",
                                        children: "SmartHealth"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx(material_.Typography, {
                                align: "center",
                                sx: {
                                    mb: 3
                                },
                                variant: "subtitle1",
                                children: "A professional kit that comes with ready-to-use MUI components."
                            }),
                            /*#__PURE__*/ jsx_runtime.jsx("img", {
                                alt: "",
                                src: "/assets/auth-illustration.svg"
                            })
                        ]
                    })
                })
            ]
        })
    });
};
Layout.prototypes = {
    children: (external_prop_types_default()).node
};


/***/ })

};
;