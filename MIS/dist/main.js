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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var sourceData = __webpack_require__(1);
var table = __webpack_require__(2);
var checkbox = __webpack_require__(3);
var bar = __webpack_require__(4);

(function () {
    var selectRegion = document.getElementById('region');
    var selectProduct = document.getElementById('product');
    var showTable = document.getElementById('saleData');

    checkbox.createCheckBox(selectRegion, ['华东', '华北', '华南']);
    checkbox.createCheckBox(selectProduct, ['手机', '笔记本', '智能音箱']);
    
    document.getElementById('histogram').innerHTML = bar.drawHistogram(sourceData[0].sale);
    /*根据筛选条件筛选数据*/
    var selectData = function (region, product, option) {
        var result = [];
        for (var i = 0, len = sourceData.length; i < len; i++) {
            if (region.indexOf(sourceData[i].region) != -1 && product.indexOf(sourceData[i].product) != -1) {
                result.push(sourceData[i]);
            }
        }

        if (option.countRegion == 1 && option.countProduct > 1) {
            result = result.sort(function (a, b) {
                if (a.region > b.region) return -1;
                if (a.region == b.region) return 0;
                return 1;
            });
        } else {
            result = result.sort(function (a, b) {
                if (a.product > b.product) return -1;
                if (a.product == b.product) return 0;
                return 1;
            });
        }
        return result;
    }

    var selectChange = function () {
        var region = checkbox.getSelect(selectRegion);
        var product = checkbox.getSelect(selectProduct);
        var option = {
            countRegion : region.length,
            countProduct : product.length
        }
        var data = selectData(region, product, option);
        table.refreshTable(showTable, data, option);
    }

    selectRegion.addEventListener('click', selectChange);
    selectProduct.addEventListener('click', selectChange);
})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]

module.exports = sourceData;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var table = {};

/*将筛选数据显示到表格中*/
table.refreshTable = function (container, data, option) {
    container.innerHTML = '';
    if (data.length == 0) return;
    var s = '';

    /*创建表头*/
    if (option.countRegion == 1 && option.countProduct > 1) {
        s = '<tr><td>地区</td><td>商品</td>';
    } else {
        s = '<tr><td>商品</td><td>地区</td>';
    }
    for (var i = 1; i <= 12; i++) {
        s += '<td>' + i + '月</td>';
    }
    s += '</tr>';

    /*插入一行行数据*/
    var same = '';
    var rowCount = 1;
    var columnOne = 'product';
    var columnTwo = 'region';
    if (option.countRegion == 1 && option.countProduct > 1) {
        columnOne = 'region';
        columnTwo = 'product';
    }
    for (var i = 0, len = data.length; i < len; i++) {
        s += '<tr>'
        if (same == '') {
            same = data[i][columnOne];
            while (i + rowCount < len && data[i + rowCount][columnOne] == same) rowCount++;
            s += '<td rowspan="' + rowCount + '">' + same + '</td>'
        } else {
            rowCount--;
            if (rowCount == 1) {
                same = '';
            }
        }
        s += '<td>' + data[i][columnTwo] + '</td>'
        for (var j = 0; j < 12; j++) {
            s += '<td>' + data[i].sale[j] + '</td>';
        }
        s += '</tr>'
    }

    container.innerHTML = s;
}

module.exports = table;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var checkbox = {};

/*生成一组checkbox*/
checkbox.createCheckBox = function (container, option) {
    var allHTML = '<label><input type="checkbox" value="全选" data-boxtype="all">全选</label>';
    var childHTML = '';
    for (var i = 0, len = option.length; i < len; i++) {
        childHTML += '<label><input type="checkbox" value="' + option[i] +
            '" data-boxtype="child">' + option[i] + '</label>';
    }
    container.innerHTML = allHTML + childHTML;

    /*点击关联逻辑*/
    container.addEventListener('click', function () {
        if (event.target.type != 'checkbox') return;
        if (event.target.dataset.boxtype == 'all') {
            for (var i = 0, len = container.childNodes.length; i < len; i++) {
                if (container.childNodes[i].firstChild.dataset.boxtype == 'child') {
                    container.childNodes[i].firstChild.checked = true;
                }
            }
            event.target.checked = true;
        } else {
            var flag = true;
            for (var i = 0, len = container.childNodes.length; i < len; i++) {
                if (container.childNodes[i].firstChild.dataset.boxtype == 'child' && !container
                    .childNodes[i].firstChild.checked) {
                    flag = false;
                    break;
                }
            }
            container.firstChild.firstChild.checked = flag ? true : false;
        }
    })
}

/*获取用户的选择条件*/
checkbox.getSelect = function (checkboxList) {
    var result = [];
    var list = checkboxList.childNodes;
    for (var i = 1, len = list.length; i < len; i++) {
        if (list[i].firstChild.checked) {
            result.push(list[i].firstChild.value);
        }
    }
    return result;
}

module.exports = checkbox;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var bar = {};

bar.drawHistogram = function (data) {
    var draw = '';
    draw = '<svg version="1.1"nbaseProfile="full" width="680" height="480" xmlns="http://www.w3.org/2000/svg">';
    draw += '<line x1="40" y1="40" x1="40" y2="440" stroke="black"/>';
    draw += '<line x1="40" y1="440" x2="640" y2="440" stroke="black"/>';

    var max = 0;
    for (var i = 0; i < 12; i++) {
        if (data[i] > max) {
            max = data[i];
        }
    }
    for (var i = 0; i < 12; i++) {
        var width = 600 / 12 / 4 * 3;
        var padding = 600 / 12 / 4;
        var x = 40 + 50*i + padding;
        var height = data[i]/max * 400;
        var y = 480 - 40 - height;
        draw += '<rect x="'+ x +'" y="'+ y +'" width="' + width + '" height="' + height + '" fill="green"/>'
    }
    draw += '</svg>'
    return draw;
}

module.exports = bar;

/***/ })
/******/ ]);