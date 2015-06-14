/**
 * Created by Shahzaib Gill on 6/13/2015.
 */
//include jquery and javascript library in html

var myBtn = document.getElementById('btn');
myBtn.addEventListener('click', function (event) {
    $("#tooltip").hide();
});


$(document).ready(function () {
    $("#tooltip").hide();

    $('#text').mouseup(function (e) {
        $("#tooltip").hide();
        if(getSelectionText()!=""){
            var x = e.clientX;
            var y = e.clientY;
            placeTooltip(x, y);
            $("#tooltip").show();
        }})
});


function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}


function placeTooltip(x_pos, y_pos) {
    var d = document.getElementById('tooltip');
    d.style.position = "absolute";
    d.style.left = x_pos + 'px';
    d.style.top = y_pos + 'px';
}

$(function () {
    $(document).tooltip();
});