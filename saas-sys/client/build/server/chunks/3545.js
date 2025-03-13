"use strict";
exports.id = 3545;
exports.ids = [3545];
exports.modules = {

/***/ 3545:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  xZ: () => (/* binding */ userRole)
});

// UNUSED EXPORTS: catchBlockHandler, durationHelper, getCurrentDate, storageHelper, userTypesName

;// CONCATENATED MODULE: ./src/common/toast.js
// import MainToast from 'react-native-root-toast';
const config = {
    // duration: MainToast.durations.LONG,
    // position: MainToast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0
};
function showToast(message, customConfig = {}) {
//MainToast.show(message, {...config, ...customConfig});
}
function toast_errorToast(message, customConfig = {}) {
    showToast(message, {
        backgroundColor: "rgb(140,28,28)",
        textColor: "#FFFFFF",
        ...customConfig
    });
}
function shortErrorToast(message) {
    showToast(message, {
        backgroundColor: "rgb(140,28,28)",
        textColor: "#FFFFFF",
        duration: MainToast.durations.SHORT
    });
}
function successToast(message) {
    showToast(message, {
        backgroundColor: "rgb(51,134,27)",
        textColor: "#FFFFFF"
    });
}
/* harmony default export */ const toast = ((/* unused pure expression or super */ null && (showToast)));


// EXTERNAL MODULE: ./src/common/constantData/constants.js
var constants = __webpack_require__(2021);
;// CONCATENATED MODULE: ./src/common/helpers.js



function catchBlockHandler(error, message = "", silent = false) {
    if (error instanceof AxiosError) {
        console.log(error.errors);
        if (silent) {
            return;
        }
        if (message) {
            errorToast(message);
        } else if (Array.isArray(error.errors) && error.errors.length) {
            error.errors.forEach((val)=>{
                errorToast(val);
            });
        } else if (typeof error.errors === "object" && error.errors !== null) {
            Object.keys(error.errors).forEach((key)=>{
                console.log("key", error.errors[key]);
                errorToast(error.errors[key]);
            });
        } else {
            errorToast(error.errors);
        }
    } else {
        console.log(error.message);
        if (silent) {
            return;
        }
        errorToast(error.message);
    }
}
function getCurrentDate(day) {
    let today = new Date(new Date().setDate(new Date().getDate() + day));
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
}
function storageHelper(size) {
    let storage = PLAN_STORAGE.filter((item)=>{
        return item.limit == size;
    });
    return storage?.[0]?.name ?? size + " MB";
}
function durationHelper(size) {
    let duration = PLAN_DURATION.filter((item)=>{
        return item.day == size;
    });
    return duration?.[0]?.name ?? size + " days";
}
function userTypesName(size) {
    let duration = USER_TYPES.filter((item)=>{
        return item.key == size;
    });
    return duration?.[0]?.name ?? "Not Identified";
}
function userRole(role, user_type) {
    if (role == "SUPER_ADMIN") {
        return user_type == 2 || user_type == 0;
    } else if (role == "ADMIN") {
        return user_type == 3 || user_type == 2 || user_type == 0;
    } else if (role == "LOCAL_ADMIN") {
        return user_type == 3;
    } else if (role == "LOCAL_USER") {
        return user_type == 4;
    } else if (role == "USER") {
        return user_type == 5;
    }
    return false;
}



/***/ })

};
;