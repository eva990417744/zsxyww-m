(function () {
    var width,   //  视口宽度
        height;   //  视口高度

    //  改变视口大小时的调整
    function change_size() {
        width = $(window).width();
        height = $(window).height();
        $("#background_img").css("height", height)
            .css("width", width);
        $("#background_shadow").css("height", height)
            .css("width", width);
    }

    // nav-btn点击事件
    function click_navBtn() {
        var nav = $("#drop-nav");
        var temp = parseInt(nav.css("height"));
        console.log(temp);
        var timer;
        if (temp > 0) {
            timer=setInterval(function () {
                if (temp<20){
                    nav.css("height",0);
                    nav.css("display","none");
                    clearInterval(timer);
                    return;
                }
                temp-=20;
                nav.css("height",temp);
            },15);
        } else {
            nav.css("display","block");
            timer=setInterval(function () {
                if (temp>150){
                    nav.css("height",212);
                    clearInterval(timer);
                    return;
                }
                temp+=20;
                nav.css("height",temp);
            },15);
        }
    }

    $(document).ready(function () {
        change_size();

        //  改变窗口大小事件
        $(window).resize(change_size);

        // nav-btn点击事件
        $('#nav-btn').click(click_navBtn);

    });
})();