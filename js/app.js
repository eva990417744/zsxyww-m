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
var $videoModal1 = $('#exampleModal11 > div > iframe');
var $videoModal2 = $('#exampleModal2 > div > iframe');
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
$('#exampleModal2').on('open.zf.reveal', function () {
    $videoModal2.attr('src', 'http://player.youku.com/embed/XMTcyNzQ1NjM1Mg==');
}).on('closed.zf.reveal', function () {
    $videoModal2.attr('src', '');
});

//  修复框架代码获取轮播图高度错误的问题（貌似只在chrome出现，在我机子为这种情况：仅在出现获取数据错误后执行，获取正确不执行）
$('#ad img').eq(0).load(function () {
    var height = this.getBoundingClientRect().height;
    var ad = document.getElementById('ad');
    var ul = ad.getElementsByClassName('orbit-container')[0];
    var li = ad.getElementsByTagName('li');
    for (var i = 0;i <li.length;i++){
        ul.style.height = height+'px';
        li[i].style.maxHeight = '';
        li[i].style.height = height+'px';
    }
});