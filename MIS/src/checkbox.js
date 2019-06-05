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