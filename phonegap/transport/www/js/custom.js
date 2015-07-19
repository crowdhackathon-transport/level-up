katanalotis_id='dmanias';	
receiveeisitiriastatsajax(katanalotis_id );	
function getRandomColor() {
    var color = '';
    while (!color.match(/(#[c-e].)([e-f][a-f])([9-c].)/)) {
        color = '#' + Math.floor(Math.random() * (Math.pow(16,6))).toString(16);
    }
    return color;
}

function getColorSimilarityIndex(c1, c2) {
    var index = 0;
    for (i = 1; i <= 6; i++) {
        if (i == 1 || i == 5) {
            if (c1.substring(i, i + 1) === c2.substring(i, i + 1)) {
                index++;
            }
        }
    }
    return index;
}

