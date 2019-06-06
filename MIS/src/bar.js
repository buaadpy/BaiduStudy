var bar = {};

bar.drawHistogram = function (data) {
    var draw = '';
    draw = '<svg version="1.1"nbaseProfile="full" width="680" height="480" xmlns="http://www.w3.org/2000/svg">';
    draw += '<line x1="40" y1="40" x2="40" y2="440" stroke="black"/>';
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