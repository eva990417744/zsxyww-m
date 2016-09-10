/**
 * 连接后端，验证是否为大一新生，并储存招新信息
 * Created by Lunzi on 9/9/2016.
 */

ajax = new Ajax();

function Ajax() {
    var QuQ = this;
    var key;
    var loginkey;
    var freshMenList;
    var studentInfo;

    this.getStudentInfo = function () {
        studentInfo = $("#baoming1 form").serialize();
        return studentInfo;
    };

    this.getKey = function () {
        $.get("http://localhost:8888/api/", {}, function (data) {
            QuQ.key = data.key;
        });
    };

    this.submitInfo = function(){
        QuQ.getKey();
        if(QuQ.getStudentInfo())
            $.post("http://localhost:8888/api/apply?k=" + QuQ.key, studentInfo, function (data) {
                if(data.success) {
                    //提交成功
                    QuQ.showMessageOnPage("报名成功，敬请期待w", "lightgreen");
                }else {
                    //提交失败，显示错误信息
                    QuQ.showMessageOnPage("报名失败：" + data.error,"red");
                }
            }, "json");
        else
            QuQ.showMessageOnPage("输入信息异常，检查后重新输入","red");

        return false;
    };

    this.login = function () {
        $.post("http://local:8888/api", account, function (data) {
            if(data.key) {
                QuQ.key = data.key;
            }else {
                //验证失败，显示错误信息；
            }
        }, "json)");
    };

    this.getInfoList = function () {
        $.get("http://local:8888/api/list?k=" + loginkey, {}, function (data) {
            QuQ.freshMenList = data;       //获取报名新生数据
        });
    };

    var sumbitForm = $("#baoming1");
    sumbitForm.submit(QuQ.submitInfo);

    this.showMessageOnPage = function (text,color) {
        var MessageBox = $("#showMessage");
        MessageBox.text(text);
        MessageBox.css("display","block");
        MessageBox.css("color", color);
    };

    //跳转后台------------------
    $("#bgLogin").click(function () {
       window.open("bg.html")
    });

}