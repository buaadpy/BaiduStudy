var sourceData = require('./data');
var table = require('./table');
var checkbox = require('./checkbox');

(function () {
    var selectRegion = document.getElementById('region');
    var selectProduct = document.getElementById('product');
    var showTable = document.getElementById('saleData');

    checkbox.createCheckBox(selectRegion, ['华东', '华北', '华南']);
    checkbox.createCheckBox(selectProduct, ['手机', '笔记本', '智能音箱']);

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