$(document).foundation();

//    自动调节小工具的高度
function tools_height() {
    var height = $(".tools .medium-11").css("height");
    $(".tools-title").css("height",height);
};

$(window).resize(function () {
    tools_height();
});

$(document).ready(function () {
   tools_height();
});
