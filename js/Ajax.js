/**
 * 连接后端，验证是否为大一新生，并储存招新信息
 * Created by Lunzi on 9/9/2016.
 */

ajax = new Ajax();
ajax.getKey();

function Ajax() {
    var QuQ = this;
    var key;
    var loginkey;
    var freshMenList;
    this.getKey = function () {
        $.get("http://localhost:8888/api/", {}, function (data) {
            QuQ.key = data.key;
        });
    };

    this.submitInfo = function(){
        var studentInfo = $("#baoming1 form").serialize();
        $.post("http://localhost:8888/api/apply?k=" + QuQ.key, studentInfo, function (data) {
            if(data.success) {
                //提交成功
                console.log("success");
            }else {
                //提交失败，显示错误信息
                console.log(data.error);
            }
        }, "json");
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
}