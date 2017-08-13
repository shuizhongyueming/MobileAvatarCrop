/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mobileAvatarCrop = __webpack_require__(1);

var _mobileAvatarCrop2 = _interopRequireDefault(_mobileAvatarCrop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mobileAvatarCrop2.default)(document.getElementById('js_hac_post_file'), function () {
    // do nothing
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 第一目标是为了满足手机端头像裁剪需求
 *
 * 主要分如下几个功能点：
 * 1. 本地的基于HTML5 FileApi的图像预览功能
 * 2. 图像选择功能
 *    a. 选择框移动
 *    b. 选择框放大缩小
 *    c. 确定选择/取消选择
 * 3. 图像裁剪
 * 4. 图像上传
 */

/**
 * 获取图片数据
 *
 * @param {DOM} domInputFile fileInput
 * @returns {Promise} 返回对应的dataUrl
 */
function getImgDataUrl(domInputFile) {
    return new Promise(function (resolve, reject) {
        var fileList = domInputFile.files[0];
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileList);
        fileReader.onload = function (fileEvent) {
            resolve(fileEvent.target.result);
        };
    });
}

function initCropper(url, cb) {
    console.log(url);
}

function mobileAvatarCroper(domInputFile, cb) {
    domInputFile.addEventListener('change', function () {
        getImgDataUrl().then(function (dataUrl) {
            initCropper(dataUrl, cb);
        });
    }, false);
}

exports.default = mobileAvatarCroper;

/***/ })
/******/ ]);