var sourceData = require('./data');
var table = require('./table');
var checkbox = require('./checkbox');
var bar = require('./bar');
var line = require('./line');

(function () {
    var selectRegion = document.getElementById('region');
    var selectProduct = document.getElementById('product');
    var showTable = document.getElementById('saleData');

    checkbox.createCheckBox(selectRegion, ['华东', '华北', '华南']);
    checkbox.createCheckBox(selectProduct, ['手机', '笔记本', '智能音箱']);

    document.getElementById('histogram').innerHTML = bar.drawHistogram();
    line.drawLineChart(document.getElementById('linechart'));

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

    /*选择条件时触发事件*/
    var selectChange = function () {
        var region = checkbox.getSelect(selectRegion);
        var product = checkbox.getSelect(selectProduct);
        var option = {
            countRegion: region.length,
            countProduct: product.length
        }
        var data = selectData(region, product, option);
        table.refreshTable(showTable, data, option);
    }

    /*选择数据并画图*/
    var showData = function (e) {
        if (e.target == showTable || e.target.parentNode == showTable.firstChild.firstChild) return;
        var row = e.target.parentNode.childNodes;
        var data = [];
        for (var i = row.length - 12; i < row.length; i++) {
            data.push(+row[i].innerText);
        }
        document.getElementById('histogram').innerHTML = bar.drawHistogram(data);
        line.drawLineChart(document.getElementById('linechart'), data);
    }
    var showAllData = function (e) {
        var data = [];
        var tableData = showTable.firstChild.childNodes;
        for (var j = 1, len = tableData.length; j < len; j++){
            var rowData = [];
            var row = tableData[j].childNodes;
            for (var i = row.length - 12; i < row.length; i++) {
                rowData.push(+row[i].innerText);
            }
            data.push(rowData);
        }
        line.drawAllLineChart(document.getElementById('linechart'), data);
    }

    selectRegion.addEventListener('click', selectChange);
    selectProduct.addEventListener('click', selectChange);
    showTable.addEventListener('mouseover', showData);
    showTable.addEventListener('mouseleave', showAllData);
})();