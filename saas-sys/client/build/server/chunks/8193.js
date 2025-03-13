"use strict";
exports.id = 8193;
exports.ids = [8193];
exports.modules = {

/***/ 4703:
/***/ (() => {

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/logo.a6c7ea85.png","height":100,"width":329,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAARUlEQVR4nGNMXaFmxcT8P42BkaH2LyfjF8a//5kZGBmZGf4zAGmGr4yJS1SM/jH8j+TgYO75y/H/J+M/BiagAiYGCPgJAJS+EptS7ZvjAAAAAElFTkSuQmCC","blurWidth":8,"blurHeight":2});

/***/ }),

/***/ 5191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_CircularProgress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9048);
/* harmony import */ var _mui_material_CircularProgress__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CircularProgress__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var src_theme_colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8465);




const Loading = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "red"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_CircularProgress__WEBPACK_IMPORTED_MODULE_2___default()), {
            size: 60,
            sx: {
                color: src_theme_colors__WEBPACK_IMPORTED_MODULE_3__/* .success */ .Vp.primary
            }
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);


/***/ }),

/***/ 779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  hs: () => (/* reexport */ flex_box_FlexBox)
});

// UNUSED EXPORTS: FlexBetween, FlexRowCenter

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "@mui/material"
var material_ = __webpack_require__(5692);
;// CONCATENATED MODULE: ./src/components/flex-box/FlexBetween.jsx


const FlexBetween = ({ children, ...props })=>/*#__PURE__*/ _jsx(Box, {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...props,
        children: children
    });
/* harmony default export */ const flex_box_FlexBetween = ((/* unused pure expression or super */ null && (FlexBetween)));

;// CONCATENATED MODULE: ./src/components/flex-box/FlexBox.jsx


const FlexBox = ({ children, ...props })=>/*#__PURE__*/ jsx_runtime.jsx(material_.Box, {
        display: "flex",
        ...props,
        children: children
    });
/* harmony default export */ const flex_box_FlexBox = (FlexBox);

;// CONCATENATED MODULE: ./src/components/flex-box/FlexRowCenter.jsx


const FlexRowCenter = ({ children, ...props })=>/*#__PURE__*/ _jsx(Box, {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...props,
        children: children
    });
/* harmony default export */ const flex_box_FlexRowCenter = ((/* unused pure expression or super */ null && (FlexRowCenter)));

;// CONCATENATED MODULE: ./src/components/flex-box/index.js






/***/ }),

/***/ 734:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ Scrollbar)
/* harmony export */ });
/* harmony import */ var simplebar_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4172);
/* harmony import */ var simplebar_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(simplebar_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__);


const Scrollbar = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_1__.styled)((simplebar_react__WEBPACK_IMPORTED_MODULE_0___default()))``;


/***/ }),

/***/ 2259:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  I: () => (/* binding */ withAuthGuard)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(580);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);
// EXTERNAL MODULE: ./src/contexts/auth-context.js
var auth_context = __webpack_require__(261);
;// CONCATENATED MODULE: ./src/guards/auth-guard.js




const AuthGuard = (props)=>{
    const { children } = props;
    const router = (0,router_.useRouter)();
    const { isAuthenticated } = (0,auth_context/* useAuthContext */.Eu)();
    const ignore = (0,external_react_.useRef)(false);
    const [checked, setChecked] = (0,external_react_.useState)(false);
    const unatuthentedUrlList = [
        "/subscription_request",
        "/register"
    ];
    // Only do authentication check on component mount.
    // This flow allows you to manually redirect the user after sign-out, otherwise this will be
    // triggered and will automatically redirect to sign-in page.
    (0,external_react_.useEffect)(()=>{
        if (!router.isReady) {
            return;
        }
        // Prevent from calling twice in development mode with React.StrictMode enabled
        if (ignore.current) {
            return;
        }
        ignore.current = true;
        if (!isAuthenticated && checkAccess(router.asPath)) {
            console.log("login Not authenticated, redirecting");
            router.replace({
                pathname: "/auth/login",
                query: router.asPath !== "/" ? {
                    continueUrl: router.asPath
                } : undefined
            }).catch(console.error);
        } else {
            setChecked(true);
        }
    }, [
        router.isReady
    ]);
    function checkAccess(url) {
        if (unatuthentedUrlList.includes(url)) {
            return false;
        }
        return true;
    }
    if (!checked) {
        return null;
    }
    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // authenticated / authorized.
    return children;
};
AuthGuard.propTypes = {
    children: (external_prop_types_default()).node
};

;// CONCATENATED MODULE: ./src/hocs/with-auth-guard.js


const withAuthGuard = (Component)=>(props)=>/*#__PURE__*/ jsx_runtime.jsx(AuthGuard, {
            children: /*#__PURE__*/ jsx_runtime.jsx(Component, {
                ...props
            })
        });


/***/ }),

/***/ 9492:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ usePopover)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function usePopover() {
    const anchorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const handleOpen = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        setOpen(true);
    }, []);
    const handleClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        setOpen(false);
    }, []);
    const handleToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        setOpen((prevState)=>!prevState);
    }, []);
    return {
        anchorRef,
        handleClose,
        handleOpen,
        handleToggle,
        open
    };
}


/***/ }),

/***/ 1665:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ AccountPopover)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9332);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_hooks_use_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(926);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _common_apiCall_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5110);
/* harmony import */ var _common_apiCall_axiosSetup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4446);
/* harmony import */ var _common_constantData_screenUrl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(294);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_apiCall_api__WEBPACK_IMPORTED_MODULE_7__, _common_apiCall_axiosSetup__WEBPACK_IMPORTED_MODULE_8__]);
([_common_apiCall_api__WEBPACK_IMPORTED_MODULE_7__, _common_apiCall_axiosSetup__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const AccountPopover = (props)=>{
    const { anchorEl, onClose, open, user } = props;
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const auth = (0,src_hooks_use_auth__WEBPACK_IMPORTED_MODULE_5__/* .useAuth */ .a)();
    const handleSignOut = ()=>{
        (0,_common_apiCall_api__WEBPACK_IMPORTED_MODULE_7__/* .logoutApiGet */ .Xu)().then((response)=>{
            localStorage.removeItem("token");
            (0,_common_apiCall_axiosSetup__WEBPACK_IMPORTED_MODULE_8__/* .setHeaders */ .FU)("");
            auth.signOut();
            router.push(_common_constantData_screenUrl__WEBPACK_IMPORTED_MODULE_9__/* .LOGIN_SCREEN_URL */ .j8);
        }).catch((err)=>{
            console.log(err);
        });
    };
    // const handleSignOut = useCallback(
    //   () => {
    //     onClose?.();
    //     auth.signOut();
    //     router.push('/auth/login');
    //   },
    //   [onClose, auth, router]
    // );
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Popover, {
        anchorEl: anchorEl,
        anchorOrigin: {
            horizontal: "left",
            vertical: "bottom"
        },
        onClose: onClose,
        open: open,
        PaperProps: {
            sx: {
                width: 200
            }
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
                sx: {
                    py: 1.5,
                    px: 2
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {
                        variant: "overline",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_6___default()), {
                            href: "/account-settings",
                            style: {
                                textDecoration: "none"
                            },
                            children: "Account"
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {
                        color: "text.secondary",
                        variant: "body2",
                        children: user?.name
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Divider, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.MenuList, {
                disablePadding: true,
                dense: true,
                sx: {
                    p: "8px",
                    "& > *": {
                        borderRadius: 1
                    }
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.MenuItem, {
                    onClick: handleSignOut,
                    children: "Sign out"
                })
            })
        ]
    });
};
AccountPopover.propTypes = {
    anchorEl: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().any),
    onClose: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
    open: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool).isRequired
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7495:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ items)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5123);
/* harmony import */ var _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1950);
/* harmony import */ var _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1149);
/* harmony import */ var _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4517);
/* harmony import */ var _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8240);
/* harmony import */ var _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8617);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2021);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_2__, _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_4__, _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_5__, _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_6__]);
([_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_2__, _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_4__, _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_5__, _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const items = [
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Dashboard",
        path: "/dashboard",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Subscription Plan",
        path: "/subscription",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "SMS Package",
        path: "/sms-package",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.LOCAL_ADMIN
        ],
        title: "Branch",
        path: "/branch",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Storage Limit ",
        path: "/storage-limit",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Validity ",
        path: "/validity ",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Organization",
        path: "/organization",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.LOCAL_ADMIN
        ],
        title: "Organization",
        path: "/user/own-organization/edit",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Subscription Request",
        path: "/subscription-request",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_5__["default"], {})
        })
    },
    // {
    //   access:[ACCESS.LOCAL_ADMIN],
    //   title: 'Billing & Subscriptions',
    //   path: '/billing-&-subscriptions',
    //   icon: (
    //     <SvgIcon fontSize="small">
    //       <InboxStackIcon />
    //     </SvgIcon>
    //   )
    // },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Coupon",
        path: "/coupon",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Feature",
        path: "/feature",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.LOCAL_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Billing & Subscriptions",
        path: "/billing-&-subscriptions",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.LOCAL_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "User",
        path: "/user",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Refund List",
        path: "/refund-list",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Cancel Request",
        path: "/cancel-request",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_8__/* .ACCESS */ .qz.LOCAL_ADMIN
        ],
        title: "payment History",
        path: "/history",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {})
        })
    }
];

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6203:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ items2)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5123);
/* harmony import */ var _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9573);
/* harmony import */ var _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3004);
/* harmony import */ var _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8707);
/* harmony import */ var _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8356);
/* harmony import */ var _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8916);
/* harmony import */ var _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1950);
/* harmony import */ var _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3702);
/* harmony import */ var _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1149);
/* harmony import */ var _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8067);
/* harmony import */ var _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4517);
/* harmony import */ var _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(60);
/* harmony import */ var _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8240);
/* harmony import */ var _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8617);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2021);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__, _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__, _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__, _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__, _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__, _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__, _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__, _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__, _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__, _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__, _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__, _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__]);
([_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__, _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__, _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__, _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__, _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__, _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__, _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__, _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__, _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__, _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__, _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__, _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const items2 = [
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.LOCAL_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "User Profile",
        path: "/account-settings",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_15__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        })
    }
];

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3791:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ items3)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5123);
/* harmony import */ var _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9573);
/* harmony import */ var _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3004);
/* harmony import */ var _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8707);
/* harmony import */ var _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8356);
/* harmony import */ var _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8916);
/* harmony import */ var _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1950);
/* harmony import */ var _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3702);
/* harmony import */ var _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1149);
/* harmony import */ var _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8067);
/* harmony import */ var _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4517);
/* harmony import */ var _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(60);
/* harmony import */ var _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8240);
/* harmony import */ var _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8617);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2021);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__, _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__, _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__, _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__, _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__, _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__, _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__, _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__, _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__, _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__, _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__, _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__]);
([_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__, _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__, _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__, _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__, _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__, _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__, _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__, _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__, _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__, _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__, _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__, _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const items3 = [
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.LOCAL_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Settings",
        path: "/settings/edit",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_15__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        })
    }
];

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7345:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ items4)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5123);
/* harmony import */ var _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9573);
/* harmony import */ var _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3004);
/* harmony import */ var _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8707);
/* harmony import */ var _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8356);
/* harmony import */ var _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8916);
/* harmony import */ var _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1950);
/* harmony import */ var _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3702);
/* harmony import */ var _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1149);
/* harmony import */ var _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8067);
/* harmony import */ var _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4517);
/* harmony import */ var _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(60);
/* harmony import */ var _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8240);
/* harmony import */ var _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8617);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(2021);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__, _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__, _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__, _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__, _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__, _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__, _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__, _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__, _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__, _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__, _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__, _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__]);
([_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__, _heroicons_react_24_solid_CogIcon__WEBPACK_IMPORTED_MODULE_2__, _heroicons_react_24_solid_LockClosedIcon__WEBPACK_IMPORTED_MODULE_3__, _heroicons_react_24_solid_ShoppingBagIcon__WEBPACK_IMPORTED_MODULE_4__, _heroicons_react_24_solid_UserIcon__WEBPACK_IMPORTED_MODULE_5__, _heroicons_react_24_solid_UserPlusIcon__WEBPACK_IMPORTED_MODULE_6__, _heroicons_react_24_solid_UsersIcon__WEBPACK_IMPORTED_MODULE_7__, _heroicons_react_24_solid_MapIcon__WEBPACK_IMPORTED_MODULE_8__, _heroicons_react_24_solid_PresentationChartBarIcon__WEBPACK_IMPORTED_MODULE_9__, _heroicons_react_24_solid_XCircleIcon__WEBPACK_IMPORTED_MODULE_10__, _heroicons_react_24_solid_SquaresPlusIcon__WEBPACK_IMPORTED_MODULE_11__, _heroicons_react_24_outline_BanknotesIcon__WEBPACK_IMPORTED_MODULE_12__, _heroicons_react_24_outline_InboxStackIcon__WEBPACK_IMPORTED_MODULE_13__, _heroicons_react_24_outline_TicketIcon__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const items4 = [
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.LOCAL_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Audit",
        path: "/audit",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_15__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Subscription plan",
        path: "/reports/subscription-plan",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_15__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Organizations",
        path: "/reports/organization",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_15__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        })
    },
    {
        access: [
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_ADMIN,
            _common_constantData_constants__WEBPACK_IMPORTED_MODULE_16__/* .ACCESS */ .qz.SUPER_USER
        ],
        title: "Users ",
        path: "/users-plan",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_15__.SvgIcon, {
            fontSize: "small",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_heroicons_react_24_solid_ChartBarIcon__WEBPACK_IMPORTED_MODULE_1__["default"], {})
        })
    }
];

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8193:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9332);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var src_hocs_with_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2259);
/* harmony import */ var _side_nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8170);
/* harmony import */ var _top_nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(362);
/* harmony import */ var _top_ber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3792);
/* harmony import */ var src_hooks_use_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(926);
/* harmony import */ var _stateManagement_auth_AuthSelector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6903);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_Loading__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5191);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_side_nav__WEBPACK_IMPORTED_MODULE_5__, _top_nav__WEBPACK_IMPORTED_MODULE_6__, _top_ber__WEBPACK_IMPORTED_MODULE_7__]);
([_side_nav__WEBPACK_IMPORTED_MODULE_5__, _top_nav__WEBPACK_IMPORTED_MODULE_6__, _top_ber__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const SIDE_NAV_WIDTH = 280;
const SIDE_NAV_WIDTH2 = 20;
const LayoutRoot = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.styled)("div")(({ theme })=>({
        width: "100%",
        background: "",
        display: "flex",
        flex: "1 1 auto",
        [theme.breakpoints.up("lg")]: {
            paddingLeft: SIDE_NAV_WIDTH,
            paddingRight: SIDE_NAV_WIDTH2
        }
    }));
const LayoutContainer = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_3__.styled)("div")({
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column"
});
const mapStateToProps = (state)=>({
        userProfile: (0,_stateManagement_auth_AuthSelector__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)(state)?.userProfile
    });
const mapDispatchToProps = (dispatch)=>({});
const Layout = (0,src_hocs_with_auth_guard__WEBPACK_IMPORTED_MODULE_4__/* .withAuthGuard */ .I)((props)=>{
    const { children } = props;
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const [openNav, setOpenNav] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [displayNav, setDisplayNav] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props?.userProfile ? true : false);
    const auth = (0,src_hooks_use_auth__WEBPACK_IMPORTED_MODULE_8__/* .useAuth */ .a)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const showNav = ()=>{
        setOpenNav(true);
    };
    const handlePathnameChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (openNav) {
            setOpenNav(false);
        }
    }, [
        openNav
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        handlePathnameChange();
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        pathname
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (auth?.user?.user?.is_tem_password == 1) {
            router.push("/account-settings");
        }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    setTimeout(()=>{
        setDisplayNav(true);
    }, 3000);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            backgroundColor: "#F6F7F7"
        },
        children: [
            displayNav && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_top_nav__WEBPACK_IMPORTED_MODULE_6__/* .TopNav */ .tD, {
                onNavOpen: ()=>setOpenNav(true),
                isAuth: props?.userProfile
            }),
            displayNav && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_top_ber__WEBPACK_IMPORTED_MODULE_7__/* .TopBer */ .v, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_side_nav__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                        onClose: ()=>setOpenNav(false),
                        open: openNav,
                        user: auth.user,
                        isAuth: props?.userProfile
                    })
                ]
            }),
            !displayNav && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Loading__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LayoutRoot, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LayoutContainer, {
                    children: children
                })
            })
        ]
    });
});
(0,react_redux__WEBPACK_IMPORTED_MODULE_9__.connect)(mapStateToProps, mapDispatchToProps)(Layout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5150:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ SideNavItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_3__);




const SideNavItem = (props)=>{
    const { active = false, disabled, external, icon, path, title } = props;
    const linkProps = path ? external ? {
        component: "a",
        href: path,
        target: "_blank"
    } : {
        component: (next_link__WEBPACK_IMPORTED_MODULE_1___default()),
        href: path
    } : {};
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_3__.ButtonBase, {
            sx: {
                fontFamily: "system-ui",
                alignItems: "center",
                borderRadius: 1,
                display: "flex",
                justifyContent: "flex-start",
                pl: "16px",
                pr: "16px",
                textAlign: "left",
                fontSize: "5px",
                fontWeight: "500",
                width: "100%",
                ...active && {
                    backgroundColor: "rgb(225, 240, 250)"
                },
                "&:hover": {
                    backgroundColor: "rgb(225, 240, 250)",
                    color: "rgb(0, 108, 184)"
                }
            },
            ...linkProps,
            children: [
                icon && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                    component: "span",
                    sx: {
                        fontFamily: "system-ui",
                        fontWeight: "500",
                        fontSize: "5px",
                        alignItems: "center",
                        color: "red",
                        display: "inline-flex",
                        justifyContent: "center",
                        mr: 2,
                        ...active && {
                            color: "red"
                        }
                    },
                    children: icon
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_3__.Box, {
                    component: "span",
                    sx: {
                        fontFamily: "system-ui",
                        color: "#616161",
                        flexGrow: 1,
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "30px",
                        whiteSpace: "nowrap",
                        ...active && {
                            color: "rgb(0, 108, 184)"
                        },
                        ...disabled && {
                            color: "#616161"
                        }
                    },
                    children: title
                })
            ]
        })
    });
};
SideNavItem.propTypes = {
    active: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    external: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),
    icon: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
    path: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    title: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired
};


/***/ }),

/***/ 8170:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9332);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_components_scrollbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(734);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7495);
/* harmony import */ var _config2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6203);
/* harmony import */ var _config3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3791);
/* harmony import */ var _config4__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7345);
/* harmony import */ var _side_nav_item__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5150);
/* harmony import */ var src_hooks_use_popover__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9492);
/* harmony import */ var _account_popover__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1665);
/* harmony import */ var _mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3622);
/* harmony import */ var _mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_ArrowBack__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _mui_icons_material_Business__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6283);
/* harmony import */ var _mui_icons_material_Business__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Business__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _mui_icons_material_EditNote__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3688);
/* harmony import */ var _mui_icons_material_EditNote__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_EditNote__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _common_apiCall_api__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(5110);
/* harmony import */ var src_hooks_use_auth__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(926);
/* harmony import */ var _common_constantData_screenUrl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(294);
/* harmony import */ var _mui_icons_material_Settings__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(32);
/* harmony import */ var _mui_icons_material_Settings__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Settings__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _stateManagement_global_globalSelector__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(15);
/* harmony import */ var _stateManagement_auth_AuthSelector__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(6903);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _common_constantData_constants__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(2021);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _public_assets_logos_logo_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(4703);
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(1156);
/* harmony import */ var lodash_size__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(lodash_size__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(7986);
/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_mui_system__WEBPACK_IMPORTED_MODULE_25__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_config__WEBPACK_IMPORTED_MODULE_6__, _config2__WEBPACK_IMPORTED_MODULE_7__, _config3__WEBPACK_IMPORTED_MODULE_8__, _config4__WEBPACK_IMPORTED_MODULE_9__, _account_popover__WEBPACK_IMPORTED_MODULE_12__, _common_apiCall_api__WEBPACK_IMPORTED_MODULE_16__]);
([_config__WEBPACK_IMPORTED_MODULE_6__, _config2__WEBPACK_IMPORTED_MODULE_7__, _config3__WEBPACK_IMPORTED_MODULE_8__, _config4__WEBPACK_IMPORTED_MODULE_9__, _account_popover__WEBPACK_IMPORTED_MODULE_12__, _common_apiCall_api__WEBPACK_IMPORTED_MODULE_16__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





























const mapStateToProps = (state)=>({
        settings: (0,_stateManagement_global_globalSelector__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .Z)(state)?.settings,
        userProfile: (0,_stateManagement_auth_AuthSelector__WEBPACK_IMPORTED_MODULE_27__/* ["default"] */ .Z)(state)?.userProfile,
        validity: (0,_stateManagement_global_globalSelector__WEBPACK_IMPORTED_MODULE_26__/* ["default"] */ .Z)(state)?.validity
    });
const mapDispatchToProps = (dispatch)=>({});
const SideNav = (props)=>{
    const auth = (0,src_hooks_use_auth__WEBPACK_IMPORTED_MODULE_17__/* .useAuth */ .a)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { open, onClose } = props;
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const lgUp = (0,_mui_material__WEBPACK_IMPORTED_MODULE_4__.useMediaQuery)((theme)=>theme.breakpoints.up("lg"));
    const accountPopover = (0,src_hooks_use_popover__WEBPACK_IMPORTED_MODULE_11__/* .usePopover */ .S)();
    const handleSignOut = ()=>{
        (0,_common_apiCall_api__WEBPACK_IMPORTED_MODULE_16__/* .logoutApiGet */ .Xu)().then((response)=>{
            localStorage.removeItem("token");
            auth.signOut();
            router.push(_common_constantData_screenUrl__WEBPACK_IMPORTED_MODULE_18__/* .LOGIN_SCREEN_URL */ .j8);
            setHeaders("");
        }).catch((err)=>{
            console.log(err);
        });
    };
    const redirectUrl = ()=>{
        let to_url = _common_constantData_constants__WEBPACK_IMPORTED_MODULE_21__/* .LINKED_APP_URL */ .oR;
        (0,_common_apiCall_api__WEBPACK_IMPORTED_MODULE_16__/* .redirectToken */ .xM)({
            to_url: to_url
        }).then((response)=>{
            window.location.href = to_url + "?token=" + response?.data?.token;
        }).catch((err)=>{
            console.log(err);
        });
    };
    console.log(props?.settings, "settings");
    const content = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(src_components_scrollbar__WEBPACK_IMPORTED_MODULE_5__/* .Scrollbar */ .L, {
        sx: {
            height: "100%",
            "& .simplebar-content": {
                height: "100%"
            },
            "& .simplebar-scrollbar:before": {
                background: "neutral.400"
            },
            background: "#FFFF"
        },
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
            sx: {
                display: "flex",
                flexDirection: "column",
                height: "100%"
            },
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
                    sx: {
                        paddingBottom: 0
                    },
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
                        sx: {
                            display: "inline-flex",
                            height: 32,
                            width: 40,
                            marginLeft: "6px",
                            marginTop: "10px"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
                                    component: "header",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                                        // alignItems="center"
                                        // direction="row"
                                        // justifyContent="start"
                                        spacing: 20,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                                            direction: "row",
                                            spacing: 0,
                                            style: {
                                                display: "flex",
                                                justifyContent: "center"
                                            },
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                                style: {
                                                    color: "#089B1A",
                                                    lineHeight: "1.5",
                                                    cursor: "pointer",
                                                    height: 50,
                                                    width: 200,
                                                    display: "flex",
                                                    justifyItems: "center",
                                                    // marginLeft: "-7%",
                                                    marginTop: "4%",
                                                    marginLeft: "15px",
                                                    fontSize: "30px",
                                                    fontFamily: "system-ui"
                                                },
                                                children: "SmartHealth"
                                            })
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_account_popover__WEBPACK_IMPORTED_MODULE_12__/* .AccountPopover */ .x, {
                                    anchorEl: accountPopover.anchorRef.current,
                                    open: accountPopover.open,
                                    onClose: accountPopover.handleClose
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
                    component: "nav",
                    sx: {
                        flexGrow: 1,
                        px: 2,
                        py: 3
                    },
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                        component: "ul",
                        spacing: 0.5,
                        sx: {
                            listStyle: "none",
                            p: 0,
                            m: 0,
                            marginTop: "0%"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Divider, {
                                sx: {
                                    marginBottom: "20px",
                                    marginTop: "10px"
                                }
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                                direction: "row",
                                spacing: 2,
                                sx: {
                                    paddingBottom: "10px",
                                    width: "100%"
                                },
                                children: [
                                    props?.userProfile?.photo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Avatar, {
                                        src: props?.userProfile?.photo,
                                        sx: {
                                            bgcolor: "#78858a",
                                            height: {
                                                xs: 30,
                                                md: 28
                                            },
                                            width: {
                                                xs: 30,
                                                md: 28
                                            },
                                            marginTop: {
                                                xs: "10px",
                                                md: "20px"
                                            }
                                        },
                                        alt: "Remy Sharp"
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Avatar, {
                                        sx: {
                                            bgcolor: "#78858a",
                                            height: {
                                                xs: 30,
                                                md: 28
                                            },
                                            width: {
                                                xs: 30,
                                                md: 28
                                            },
                                            marginTop: {
                                                xs: "10px",
                                                md: "20px"
                                            }
                                        },
                                        alt: "Remy Sharp",
                                        children: "N"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                                        direction: {
                                            xs: "column",
                                            md: "row"
                                        },
                                        alignItems: "center" // Ensure items are aligned properly
                                        ,
                                        spacing: 1,
                                        sx: {
                                            width: "100%"
                                        },
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {
                                                variant: "subtitle1",
                                                component: "label",
                                                sx: {
                                                    width: "60%",
                                                    fontSize: {
                                                        xs: "14px",
                                                        md: "15px"
                                                    },
                                                    fontWeight: "bold",
                                                    color: "#121212",
                                                    fontFamily: "system-ui",
                                                    textAlign: {
                                                        xs: "center",
                                                        md: "left"
                                                    }
                                                },
                                                children: props?.userProfile?.name
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {
                                                variant: "subtitle2",
                                                component: "label",
                                                sx: {
                                                    fontSize: {
                                                        xs: "12px",
                                                        md: "11px"
                                                    },
                                                    cursor: "pointer",
                                                    color: "#089B1A",
                                                    width: "35%",
                                                    fontFamily: "system-ui",
                                                    textAlign: {
                                                        xs: "center",
                                                        md: "left"
                                                    }
                                                },
                                                onClick: handleSignOut,
                                                children: "Log Out"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            _config2__WEBPACK_IMPORTED_MODULE_7__/* .items2 */ .g.filter((item)=>item.access.includes(parseInt(props?.userProfile?.user_type))).map((item)=>{
                                const active = item.path ? pathname === item.path : false;
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        marginLeft: "10%",
                                        fontFamily: "system-ui"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_side_nav_item__WEBPACK_IMPORTED_MODULE_10__/* .SideNavItem */ .y, {
                                        active: active,
                                        disabled: item.disabled,
                                        external: item.external,
                                        path: item.path,
                                        title: item.title
                                    }, item.title)
                                });
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                                direction: "row",
                                spacing: 2,
                                sx: {
                                    paddingBottom: "10px",
                                    color: "#636f73"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Business__WEBPACK_IMPORTED_MODULE_14___default()), {
                                        sx: {
                                            height: 30,
                                            width: 30,
                                            marginTop: "20px"
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        style: {
                                            color: "#121212",
                                            fontSize: "15px",
                                            marginTop: "7px",
                                            fontWeight: "530",
                                            lineHeight: "1.2",
                                            fontFamily: "system-ui"
                                        },
                                        children: "Administration"
                                    })
                                ]
                            }),
                            _config__WEBPACK_IMPORTED_MODULE_6__/* .items */ .e.filter((item)=>item.access.includes(parseInt(props?.userProfile?.user_type))).map((item)=>{
                                const active = item.path ? pathname === item.path : false;
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        marginLeft: "10%",
                                        fontFamily: "system-ui"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_side_nav_item__WEBPACK_IMPORTED_MODULE_10__/* .SideNavItem */ .y, {
                                        active: active,
                                        disabled: item.disabled,
                                        external: item.external,
                                        path: item.path,
                                        title: item.title,
                                        sx: {}
                                    }, item.title)
                                });
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                                direction: "row",
                                spacing: 2,
                                sx: {
                                    paddingBottom: "10px",
                                    color: "#636f73"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_EditNote__WEBPACK_IMPORTED_MODULE_15___default()), {
                                        sx: {
                                            height: 30,
                                            width: 30,
                                            marginTop: "20px"
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        style: {
                                            color: "#121212",
                                            fontSize: "15px",
                                            marginTop: "7px",
                                            fontWeight: "530",
                                            lineHeight: "1.2",
                                            fontFamily: "system-ui"
                                        },
                                        children: "Audit & Report"
                                    })
                                ]
                            }),
                            _config4__WEBPACK_IMPORTED_MODULE_9__/* .items4 */ .b.filter((item)=>item.access.includes(parseInt(props?.userProfile?.user_type))).map((item)=>{
                                const active = item.path ? pathname === item.path : false;
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        marginLeft: "10%",
                                        fontFamily: "system-ui"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_side_nav_item__WEBPACK_IMPORTED_MODULE_10__/* .SideNavItem */ .y, {
                                        active: active,
                                        disabled: item.disabled,
                                        external: item.external,
                                        path: item.path,
                                        title: item.title,
                                        sx: {}
                                    }, item.title)
                                });
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Stack, {
                                direction: "row",
                                spacing: 2,
                                sx: {
                                    paddingBottom: "10px",
                                    color: "#636f73"
                                },
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Settings__WEBPACK_IMPORTED_MODULE_19___default()), {
                                        sx: {
                                            height: 30,
                                            width: 30,
                                            marginTop: "20px"
                                        }
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        style: {
                                            color: "#121212",
                                            fontSize: "15px",
                                            marginTop: "7px",
                                            fontWeight: "530",
                                            lineHeight: "1.2",
                                            fontFamily: "system-ui"
                                        },
                                        children: "System Settings"
                                    })
                                ]
                            }),
                            _config3__WEBPACK_IMPORTED_MODULE_8__/* .items3 */ .u.filter((item)=>item.access.includes(parseInt(props?.userProfile?.user_type))).map((item)=>{
                                const active = item.path ? pathname === item.path : false;
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        marginLeft: "10%",
                                        fontFamily: "system-ui"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_side_nav_item__WEBPACK_IMPORTED_MODULE_10__/* .SideNavItem */ .y, {
                                        active: active,
                                        disabled: item.disabled,
                                        external: item.external,
                                        path: item.path,
                                        title: item.title
                                    }, item.title)
                                });
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Box, {
                    sx: {
                        px: 2,
                        py: 3
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {
                            color: "neutral.100",
                            variant: "subtitle2"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Typography, {
                            color: "neutral.500",
                            variant: "body2",
                            children: "SmartHealth"
                        })
                    ]
                })
            ]
        })
    });
    if (lgUp) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Drawer, {
            anchor: "left",
            open: true,
            PaperProps: {
                sx: {
                    backgroundColor: "common.white",
                    color: "common.white",
                    width: 260,
                    // paddingLeft: "1%",
                    marginRight: "1%"
                }
            },
            variant: "permanent",
            children: content
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_4__.Drawer, {
        anchor: "left",
        onClose: onClose,
        open: open,
        PaperProps: {
            sx: {
                backgroundColor: "neutral.800",
                color: "common.white",
                width: 305
            }
        },
        sx: {
            zIndex: (theme)=>theme.zIndex.appBar + 100
        },
        variant: "temporary",
        children: content
    });
};
SideNav.propTypes = {
    onClose: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
    open: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_20__.connect)(mapStateToProps, mapDispatchToProps)(SideNav));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3792:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ TopBer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3882);
/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1431);
/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7934);
/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7163);
/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _mui_material_InputBase__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8855);
/* harmony import */ var _mui_material_InputBase__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material_InputBase__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _mui_material_Badge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5168);
/* harmony import */ var _mui_material_Badge__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Badge__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9271);
/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8125);
/* harmony import */ var _mui_material_Menu__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Menu__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3365);
/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8017);
/* harmony import */ var _mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Search__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1883);
/* harmony import */ var _mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _mui_icons_material_Mail__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(9026);
/* harmony import */ var _mui_icons_material_Mail__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Mail__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _mui_icons_material_Notifications__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1567);
/* harmony import */ var _mui_icons_material_Notifications__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Notifications__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(6952);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3188);
/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _common_apiCall_api__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(5110);
/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(3765);
/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _top_nav__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(362);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_common_apiCall_api__WEBPACK_IMPORTED_MODULE_19__, _top_nav__WEBPACK_IMPORTED_MODULE_21__]);
([_common_apiCall_api__WEBPACK_IMPORTED_MODULE_19__, _top_nav__WEBPACK_IMPORTED_MODULE_21__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
























const Search = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)("div")(({ theme })=>({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "red",
        "&:hover": {
            backgroundColor: "#F6F7F7"
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        }
    }));
const SearchIconWrapper = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)("div")(({ theme })=>({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }));
const StyledInputBase = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)((_mui_material_InputBase__WEBPACK_IMPORTED_MODULE_8___default()))(({ theme })=>({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: "20ch"
            }
        }
    }));
const TopBer = (props)=>{
    const [anchorEl, setAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const [total, setTotal] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [detailsid, setdetailsid] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const [perpage, setperpage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event)=>{
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = ()=>{
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = ()=>{
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMenuClose2 = ({ id })=>{
        const data = {
            notification_details_id: id,
            status: 1
        };
        (0,_common_apiCall_api__WEBPACK_IMPORTED_MODULE_19__/* .notificationSeenApiCall */ .mA)(data).then((response)=>{
            setdetailsid(id);
        });
    };
    const handleMenuClose3 = ({ id })=>{
        const data = {
            notification_details_id: id,
            status: 2
        };
        (0,_common_apiCall_api__WEBPACK_IMPORTED_MODULE_19__/* .notificationSeenApiCall */ .mA)(data).then((response)=>{
            setdetailsid(id);
        });
    };
    const handleMenuClose4 = ()=>{
        setperpage(perpage + 1);
    };
    const handleMobileMenuOpen = (event)=>{
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const fetchNotification = (queryparam = null)=>{
        (0,_common_apiCall_api__WEBPACK_IMPORTED_MODULE_19__/* .notificationApiCall */ .Zq)(queryparam).then((response)=>{
            if (response?.code == 200) {
                setData(response?.data?.notifications?.data);
                setTotal(response?.data?.notification_count);
                setLoading(false);
            }
        }).catch(()=>{});
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let query = "page=" + perpage;
        fetchNotification(query);
    }, [
        perpage,
        detailsid,
        setdetailsid
    ]);
    console.log(detailsid, "data>>");
    const menuId = "primary-search-account-menu";
    const renderMenu = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Menu__WEBPACK_IMPORTED_MODULE_11___default()), {
        anchorEl: anchorEl,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        id: menuId,
        keepMounted: true,
        transformOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        open: isMenuOpen,
        onClose: handleMenuClose,
        sx: {
            mt: "2%"
        },
        children: total == 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_10___default()), {
            onClick: handleMenuClose,
            children: "You have no notification"
        }, data.id) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: data?.map((data)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_10___default()), {
                    children: data?.seen_status == 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Alert__WEBPACK_IMPORTED_MODULE_20___default()), {
                        icon: false,
                        severity: "success",
                        sx: {
                            width: "100%"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                style: {
                                    float: "right",
                                    marginLeft: "2%"
                                },
                                onClick: ()=>handleMenuClose3({
                                        id: data.id
                                    }),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_18___default()), {
                                    sx: {
                                        color: "red"
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>handleMenuClose2({
                                        id: data.id
                                    }),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
                                        sx: {
                                            color: "#6147c3"
                                        },
                                        children: data?.notification?.title
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
                                        children: data?.notification?.message
                                    })
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Alert__WEBPACK_IMPORTED_MODULE_20___default()), {
                        icon: false,
                        severity: "warning",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                style: {
                                    float: "right",
                                    marginLeft: "2%"
                                },
                                onClick: ()=>handleMenuClose3({
                                        id: data.id
                                    }),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_18___default()), {
                                    sx: {
                                        color: "red"
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                onClick: ()=>handleMenuClose2({
                                        id: data.id
                                    }),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
                                        sx: {
                                            color: "#6147c3"
                                        },
                                        children: data?.notification?.title
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Typography__WEBPACK_IMPORTED_MODULE_7___default()), {
                                        children: data?.notification?.message
                                    })
                                ]
                            })
                        ]
                    })
                }, data.id))
        })
    });
    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Menu__WEBPACK_IMPORTED_MODULE_11___default()), {
        anchorEl: mobileMoreAnchorEl,
        anchorOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        id: mobileMenuId,
        keepMounted: true,
        transformOrigin: {
            vertical: "top",
            horizontal: "right"
        },
        open: isMobileMenuOpen,
        onClose: handleMobileMenuClose,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_10___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                        size: "large",
                        "aria-label": "show 4 new mails",
                        color: "inherit",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Badge__WEBPACK_IMPORTED_MODULE_9___default()), {
                            badgeContent: 4,
                            color: "error",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Mail__WEBPACK_IMPORTED_MODULE_15___default()), {})
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "Messages"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_10___default()), {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                        size: "large",
                        "aria-label": "show 17 new notifications",
                        color: "inherit",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Badge__WEBPACK_IMPORTED_MODULE_9___default()), {
                            badgeContent: 17,
                            color: "error",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Notifications__WEBPACK_IMPORTED_MODULE_16___default()), {})
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "Notifications"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_10___default()), {
                onClick: handleProfileMenuOpen,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                        size: "large",
                        "aria-label": "account of current user",
                        "aria-controls": "primary-search-account-menu",
                        "aria-haspopup": "true",
                        color: "inherit",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_14___default()), {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "Profile"
                    })
                ]
            })
        ]
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_4___default()), {
        sx: {
            width: "100%",
            background: "#F6F7F7"
        },
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_3___default()), {
                position: "fixed",
                sx: {
                    width: "100%",
                    background: "white"
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_5___default()), {
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_4___default()), {
                            sx: {
                                flexGrow: 1
                            }
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_4___default()), {
                            sx: {
                                display: {
                                    xs: "none",
                                    md: "flex"
                                }
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                                size: "large",
                                edge: "end",
                                "aria-label": "account of current user",
                                "aria-controls": menuId,
                                "aria-haspopup": "true",
                                onClick: handleProfileMenuOpen,
                                color: "inherit",
                                disableRipple: true,
                                sx: {
                                    "&:hover": {
                                        backgroundColor: "transparent"
                                    }
                                },
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Badge__WEBPACK_IMPORTED_MODULE_9___default()), {
                                    badgeContent: total,
                                    color: "secondary",
                                    sx: {
                                        backgroundColor: "#e2faca",
                                        borderRadius: "8px",
                                        padding: "6px",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "#c8e6a0"
                                        }
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Notifications__WEBPACK_IMPORTED_MODULE_16___default()), {
                                        sx: {
                                            color: "#70b42c"
                                        }
                                    })
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_Box__WEBPACK_IMPORTED_MODULE_4___default()), {
                            sx: {
                                display: {
                                    xs: "flex",
                                    md: "none"
                                }
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_6___default()), {
                                size: "large",
                                "aria-label": "show more",
                                "aria-controls": mobileMenuId,
                                "aria-haspopup": "true",
                                onClick: handleMobileMenuOpen,
                                color: "inherit",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_17___default()), {})
                            })
                        })
                    ]
                })
            }),
            renderMobileMenu,
            renderMenu
        ]
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 362:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tD: () => (/* binding */ TopNav)
/* harmony export */ });
/* unused harmony exports SearchOutlinedIcon, SearchResultCard */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(580);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8442);
/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_SearchOutlined__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1920);
/* harmony import */ var _mui_icons_material_SearchOutlined__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_SearchOutlined__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_flex_box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(779);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _mui_icons_material_Dehaze__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1407);
/* harmony import */ var _mui_icons_material_Dehaze__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Dehaze__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_hooks_use_popover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9492);
/* harmony import */ var _account_popover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1665);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_account_popover__WEBPACK_IMPORTED_MODULE_9__]);
_account_popover__WEBPACK_IMPORTED_MODULE_9__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





 // styled components




const SearchOutlinedIcon = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)((_mui_icons_material_SearchOutlined__WEBPACK_IMPORTED_MODULE_3___default()))(({ theme })=>({
        color: "#D4D0D0",
        background: "#E32727",
        width: "80px",
        fontSize: "48px",
        padding: "10px"
    })); // also used in the GrocerySearchBox component
const SearchResultCard = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Card)(()=>({
        zIndex: 99,
        top: "100%",
        width: "100%",
        position: "absolute",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem"
    }));
const DropDownHandler = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_2__.styled)(_components_flex_box__WEBPACK_IMPORTED_MODULE_4__/* .FlexBox */ .hs)(({ theme })=>({
        whiteSpace: "pre",
        // borderLeft: `1px solid ${theme.palette.text.disabled}`,
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    }));
const SIDE_NAV_WIDTH = 80;
const TOP_NAV_HEIGHT = 64;
const TopNav = (props)=>{
    const { onNavOpen } = props;
    console.log(onNavOpen, "onNavOpen");
    const lgUp = (0,_mui_material__WEBPACK_IMPORTED_MODULE_7__.useMediaQuery)((theme)=>theme.breakpoints.up("lg"));
    const accountPopover = (0,src_hooks_use_popover__WEBPACK_IMPORTED_MODULE_8__/* .usePopover */ .S)();
    const [category, setCategory] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)("");
    const [resultList, setResultList] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
    const parentRef = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Box, {
                component: "header",
                sx: {
                    backdropFilter: "blur(6px)",
                    backgroundColor: "#F6F7F7",
                    position: "sticky",
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: 0,
                    width: "15%",
                    zIndex: (theme)=>theme.zIndex.appBar
                },
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Stack, {
                    alignItems: "center",
                    direction: "row",
                    justifyContent: "space-between",
                    spacing: 2,
                    sx: {
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Stack, {
                            alignItems: "center",
                            direction: "row",
                            spacing: 2,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Box, {
                                sx: {
                                    display: "inline-flex",
                                    height: 32,
                                    width: 32
                                },
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    onClick: onNavOpen,
                                    style: {
                                        background: "#FFFF",
                                        marginLeft: "10px"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_mui_icons_material_Dehaze__WEBPACK_IMPORTED_MODULE_6___default()), {
                                        sx: {
                                            fontSize: "30px"
                                        }
                                    })
                                })
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Stack, {
                            alignItems: "center",
                            direction: "row",
                            spacing: 2
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_account_popover__WEBPACK_IMPORTED_MODULE_9__/* .AccountPopover */ .x, {
                anchorEl: accountPopover.anchorRef.current,
                open: accountPopover.open,
                onClose: accountPopover.handleClose
            })
        ]
    });
};
TopNav.propTypes = {
    onNavOpen: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;