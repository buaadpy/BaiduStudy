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