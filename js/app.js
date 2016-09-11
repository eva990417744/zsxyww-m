$(document).foundation();
//nav跳转
function go(num) {
    switch (num = parseInt(num)) {
        case 1:
            var down = $("#calendar");
            break;
        case 2:
            var down = $("#feature");
            break;
        case 3:
            var down = $("#tools");
            break;
        default:
            var down = $("#repairs");
            break;
    }
    var hight = down.position().top;
    console.log(hight);
    $("body").scrollTop(hight - $(".top-bar").height() - 15);
}
// iframe开启和关闭事件
var $videoModal = $('#exampleModal3 > div > iframe');
var $videoModal1 = $('#exampleModal11>div>iframe');
$('#exampleModal3').on('open.zf.reveal', function () {
    $videoModal.attr('src', 'http://player.youku.com/player.php/sid/XMTcyMDYzNTgyOA==/v.swf');
}).on('closed.zf.reveal', function () {
    $videoModal.attr('src', '');
});
$('#exampleModal11').on('open.zf.reveal', function () {
    $videoModal1.attr('src', 'http://player.youku.com/player.php/sid/XMTcyMDYzNTgyOA==/v.swf');
}).on('closed.zf.reveal', function () {
    $videoModal1.attr('src', '');
});