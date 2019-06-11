var line = {};

line.drawLineChart = function (canvas, data) {
    canvas.width = 680;
    canvas.height = 380;
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(40, 40);
    ctx.lineTo(40, 340);
    ctx.lineTo(640, 340);
    ctx.stroke();

    if (data == null) return;

    var max = 0;
    for (var i = 0; i < 12; i++) {
        if (data[i] > max) {
            max = data[i];
        }
    }
    for (var i = 0; i < 12; i++) {
        var height = data[i] / max * 300;
        var y = 380 - 40 - height;

        ctx.beginPath();
        ctx.arc(90 + i * 50, y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(90, 340 - (data[0] / max * 300));
    for (var i = 1; i < 12; i++) {
        var height = data[i] / max * 300;
        var y = 380 - 40 - height;
        ctx.lineTo(90 + i * 50, y);
    }
    ctx.stroke();
}

line.drawAllLineChart = function (canvas, data) {
    canvas.width = 680;
    canvas.height = 380;
    var ctx = canvas.getContext('2d');
    /*画x轴与y轴*/
    ctx.beginPath();
    ctx.moveTo(40, 40);
    ctx.lineTo(40, 340);
    ctx.lineTo(640, 340);
    ctx.stroke();
    if (data == null) return;
    /*选出最大值*/
    var max = 0;
    var lineCount = data.length;
    for (var j = 0; j < lineCount; j++) {
        for (var i = 0; i < 12; i++) {
            if (data[j][i] > max) {
                max = data[j][i];
            }
        }
    }
    /*随机颜色*/
    var color = [];
    for (var j = 0; j < lineCount; j++) {
        var r = Math.random() * 255;
        var g = Math.random() * 255;
        var b = Math.random() * 255;
        color.push({
            'r': r,
            'g': g,
            'b': b
        })
    }
    /*画圆点*/
    for (var j = 0; j < lineCount; j++) {
        for (var i = 0; i < 12; i++) {
            var height = data[j][i] / max * 300;
            var y = 380 - 40 - height;
            ctx.fillStyle = 'rgb(' + color[j]['r'] + ',' + color[j]['g'] + ',' + color[j]['b'] + ')';
            ctx.beginPath();
            ctx.arc(90 + i * 50, y, 2.5, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    /*画折线*/
    for (var j = 0; j < lineCount; j++) {
        ctx.strokeStyle = 'rgb(' + color[j]['r'] + ',' + color[j]['g'] + ',' + color[j]['b'] + ')';
        ctx.beginPath();
        ctx.moveTo(90, 340 - (data[j][0] / max * 300));
        for (var i = 1; i < 12; i++) {
            var height = data[j][i] / max * 300;
            var y = 380 - 40 - height;
            ctx.lineTo(90 + i * 50, y);
        }
        ctx.stroke();
    }
}

module.exports = line;