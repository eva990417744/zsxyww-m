(function () {
    var width,   //  视口宽度
        height,   //  视口高度
        timer,   //  nav-btn的计时器
        id;      //  move的计时器

    //  改变视口大小时的调整
    function change_size() {
        width = $(window).width();
        height = $(window).height();
        $("#background_img").css("height", height)
            .css("width", width);
        $("#background_shadow").css("height", height)
            .css("width", width);
    }

    //增加nav点击事件、返回顶部。优化部分效果

    //  移动滚动条
    function move(current, step) {
        var t = 0;
        clearInterval(id);
        id = setInterval(function () {
            window.scrollTo(0, current - step);
            ++t;
            current -=  step;
            if (t >= 30) {
                clearInterval(id);
            }
        }, 12.5);
    }

    // nav点击事件
    function click_nav(event) {
        $("#drop-nav").hide();
        var aim = $($(event.target).attr("href"))[0].offsetTop;
        var current = $(document).scrollTop();
        move(current,(current - aim) / 30);
        event.preventDefault();
    }

    // nav-btn点击事件
    function click_navBtn() {
        clearInterval(timer);
        var nav = $("#drop-nav");
        var temp = parseInt(nav.css("height"));
        console.log(temp);
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
                    nav.css("height",215);
                    clearInterval(timer);
                    return;
                }
                temp+=20;
                nav.css("height",temp);
            },15);
        }
    }

    // 控制go-tio的显示与隐藏
    function change_gt() {
        var pos = $(document).scrollTop();
        var gt = $("#go_top");
        if (pos > height / 3) {
            gt.fadeIn();
        } else {
            gt.fadeOut();
        }
        gt = null;
    }

    $(document).ready(function () {
        change_size();
        change_gt();

        //  改变窗口大小事件
        $(window).resize(change_size);

        // nav-btn点击事件
        $('#nav-btn').click(click_navBtn);

        //  nav点击事件
        $('nav #drop-nav a').click(click_nav);

        //  go-tio点击事件
        $("#go_top").click(function () {
            var current = $(document).scrollTop();
            move(current,current / 30);
            event.preventDefault();
        });

        //  当滚动停止时的操作
        $(window).bind('scrollstop', function () {
            change_gt();
        });

    });
})();