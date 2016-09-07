(function () {
    var width,   //  视口宽度
        height,   //  视口高度
        timer,   //  nav-btn的计时器
        id,      //  move的计时器
        position = [],  //  块的位置
        scroll_pos = [], //  块移动目标位置
        block,   //  块
        index,  //  当前位置
        hammertime;   //  手势

    //  改变视口大小时的调整
    function change_size() {
        width = $(window).width();
        height = $(window).height();
        $("#background_img").css("height", height)
            .css("width", width);
        $("#background_shadow").css("height", height)
            .css("width", width);
        calculate(6);
    }

//  计算各个块的位置
    function calculate(num) {
        var temph;  // 块的高度
        var tempt;  // 块的offsetTop
        for (var i = 0; i < num; i++) {
            temph = (height - block[i].clientHeight) / 2;
            tempt = block[i].offsetTop;
            position[i] = tempt - 40;
            if (temph < 0) {
                scroll_pos[i] = tempt;
            } else {
                scroll_pos[i] = tempt - temph;
            }
        }
    }

    //  获取当前所处位置
    function get_position(num) {
        var current = $(document).scrollTop();
        for (var i = 0; i < num; ++i) {
            if (current < position[i]) {
                return i;
            }
        }
        return 6;
    }

    //  移动滚动条
    function move(current, step) {
        var t = 0;
        clearInterval(id);
        id = setInterval(function () {
            window.scrollTo(0, current - step);
            ++t;
            current -= step;
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
        move(current, (current - aim) / 30);
        event.preventDefault();
    }

    // nav-btn点击事件
    function click_navBtn() {
        clearInterval(timer);
        var nav = $("#drop-nav");
        var temp = parseInt(nav.css("height"));
        console.log(temp);
        if (temp > 0) {
            timer = setInterval(function () {
                if (temp < 20) {
                    nav.css("height", 0);
                    nav.css("display", "none");
                    clearInterval(timer);
                    return;
                }
                temp -= 20;
                nav.css("height", temp);
            }, 15);
        } else {
            nav.css("display", "block");
            timer = setInterval(function () {
                if (temp > 150) {
                    nav.css("height", 215);
                    clearInterval(timer);
                    return;
                }
                temp += 20;
                nav.css("height", temp);
            }, 15);
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

    //手势上滑事件
    function swipeTop() {
        console.log("swipeTop");
        var endCurrent = $(document).scrollTop();  //  滑动停止时的位置
        var temp, step;  //  temp为目标位置，step为每一次移动的距离

        if (index == 5) {
            move(endCurrent, (endCurrent - scroll_pos[0]) / 30);
        } else {
            temp = scroll_pos[index+1];
            step = (endCurrent - temp) / 30;
            move(endCurrent, step);
        }
    }

    //  手势下滑事件
    function swipeDown() {
        console.log("swipeDown");
        var endCurrent = $(document).scrollTop();  //  滑动停止时的位置
        var temp, step;  //  temp为目标位置，step为每一次移动的距离

        if (index == 0) {
            temp = scroll_pos[5];
            step = (endCurrent - temp) / 30;
            move(endCurrent, step);
        } else {
            temp = scroll_pos[index - 1];
            step = (endCurrent - temp) / 30;
            move(endCurrent, step);
        }
    }


    $(document).ready(function () {
        block = $(".container-fluid").children();
        console.log("compare");
        hammertime = new Hammer(document.getElementById("swipe"), {
            recognizers: [
                [Hammer.Swipe]
            ]
        });
        console.log("init");
        index = get_position(6);

        change_size();
        change_gt();

        //  手势下滑事件
        hammertime.on("swipedown",swipeDown);

        //  手势上滑事件
        hammertime.on("swipeup",swipeTop);

        //  改变窗口大小事件
        $(window).resize(change_size);

        // nav-btn点击事件
        $('#nav-btn').click(click_navBtn);

        //  nav点击事件
        $('nav #drop-nav a').click(click_nav);

        //  go-tio点击事件
        $("#go_top").click(function () {
            var current = $(document).scrollTop();
            move(current, current / 30);
            event.preventDefault();
        });

        //  当滚动停止时的操作
        $(window).bind('scrollstop', function () {
            change_gt();
            index = get_position(6);
        });

    });
})();