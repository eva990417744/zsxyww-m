(function () {
    var page = [],   //  缓存页面
        maxPage = 6, //  最大页数
        timer,   //  nav-btn的计时器
        index,  //  当前位置
        hammertime;   //  手势
    var majax;   // Ajax

    //  改变视口大小时的调整
    function change_size() {
        var width = $(window).width();
        var height = $(window).height();
        $("#background_img").css("height", height)
            .css("width", width);
        $("#background_shadow").css("height", height)
            .css("width", width);
    }

    //  改变背景图片
    function change_bgimg() {
        $("#background_img").attr("src", "img/m_bg" + index + ".jpg")
    }

    //  获得当前位置m_
    function get_position(num) {
        for (var i = 1; i <= num; ++i) {
            if (page[i].css("display") != 'none') {
                return i;
            }
        }
    }

    // nav点击事件
    function click_nav(event) {
        $("#drop-nav").hide();
        var aim = parseInt($(event.target).attr("href").slice(5));
        if (aim != index) {
            change_page(aim, index);
        }
        event.preventDefault();
    }

    // nav-btn点击事件
    function click_navBtn() {
        clearInterval(timer);
        var nav = $("#drop-nav");
        var temp = parseInt(nav.css("height"));
        if (temp > 0) {
            timer = setInterval(function () {
                if (temp <= 15) {
                    nav.css("height", 0);
                    nav.css("display", "none");
                    clearInterval(timer);
                    return;
                }
                temp -= 10;
                nav.css("height", temp);
            }, 16.67);
        } else {
            nav.css("display", "block");
            timer = setInterval(function () {
                if (temp > 200) {
                    nav.css("height", 215);
                    clearInterval(timer);
                    return;
                }
                temp += 10;
                nav.css("height", temp);
            }, 16.67);
        }
    }

    // 控制go-tio的显示与隐藏
    function change_gt() {
        var gt = $("#go_top");
        index == 1 ? gt.hide() : gt.show();
    }

    //  切换页面
    function change_page(aim, current) {
        page[current].hide();
        page[aim].show();
        index = aim;
        change_bgimg();
        if (aim > 1 && current > 1) {
            return;
        }
        change_gt();
    }

    //  手势左滑事件
    function swipeLeft() {
        if (index >= maxPage) {
            return;
        }
        change_page(index + 1, index);
    }

    //  手势右滑事件
    function swipeRight() {
        if (index <= 1) {
            return;
        }
        change_page(index - 1, index);
    }

    //  Ajax
    function MAjax() {
        var QwQ = this;

        this.getKey = function () {
            $.get("http://zsxyww.com:8888/api/", {}, function (data) {
                QwQ.key = data.key;
                return data.key;
            });
        };
        this.getStudentInfo = function () {
            var infoData = "name=" + $("#name").val()
                + "&tel=" + $("#tel").val()
                + "&remark=" + $("#remark").val();
            return infoData;
        };

        this.sumbitInfo = function () {
            if(QwQ.getStudentInfo())
                $.post("http://zsxyww.com:8888/api/apply?k=" + QwQ.key, QwQ.getStudentInfo(), function (data) {
                    if(data.success) {
                        //提交成功
                        ajax.showMessageOnPage("报名成功，敬请期待w", "lightgreen");
                    }else {
                        //提交失败，显示错误信息
                        ajax.showMessageOnPage("报名失败：" + data.error,"red");
                    }
                }, "json");
            else
                ajax.showMessageOnPage("输入信息异常，检查后重新输入","red");

            return false;
        };
    }


    $(document).ready(function () {
        hammertime = new Hammer(document.getElementById("swipe"), {
            recognizers: [
                [Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]
            ]
        });

        //  初始化各个东西
        for (var i = 1; i <= maxPage; ++i) {
            page[i] = $("#page" + i);
        }
        majax = new MAjax();
        index = get_position(maxPage);
        change_size();
        // change_gt();
        // change_bgimg();

        //  手势左滑事件
        hammertime.on("swipeleft", swipeLeft);

        //  手势右滑事件
        hammertime.on("swiperight", swipeRight);

        //  改变窗口大小事件
        $(window).resize(change_size);

        // nav-btn点击事件
        $('#nav-btn').click(click_navBtn);

        //  nav点击事件
        $('nav #drop-nav a').click(click_nav);

        //  go-tio点击事件
        $("#go_top").click(function () {
            change_page(1, index);
            event.preventDefault();
        });

        majax.getKey();
        $("#sumbitBtn").click(QwQ.sumbitInfo);

        $('#youku1').on('hidden.bs.modal', function () {
            $('#test1').attr('src', '')
        }).on('show.bs.modal',function () {
            $('#test1').attr('src','http://player.youku.com/embed/XMTcyMDYzNTgyOA==');
        });
        $('#youku').on('hidden.bs.modal', function () {
            $('#test').attr('src', '')
        }).on('show.bs.modal',function () {
            $('#test').attr('src','http://player.youku.com/embed/XMTcyNzQ1NjM1Mg==');
        });
        $('#youku2').on('hidden.bs.modal', function () {
            $('#test2').attr('src', '')
        }).on('show.bs.modal',function () {
            $('#test2').attr('src','http://player.youku.com/embed/XMTcyMDYzNTgyOA==');
            $('#test1').attr('src','http://player.youku.com/embed/XMTcyMDYzNTgyOA==');
        });
    });
})();
