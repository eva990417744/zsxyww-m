/**
 * 连接后端，验证是否为大一新生，并储存招新信息
 * Created by Lunzi on 9/9/2016.
 */

ajax = new Ajax();
ajax.getKey();

function Ajax() {
    var key;
    var loginkey;
    var freshMenList;
    this.getKey = function () {
        $.get("http://localhost:8888/api/", {}, function (data) {
            ajax.key = data.key;
        });
    };

    this.submitInfo = function(){
        $.post("http://localhost:8888/api/apply?k=" + ajax.key, studentInfo, function (data) {
            if(data.success) {
                //提交成功
            }else {
                //提交失败，显示错误信息
            }
        }, "json");
    };

    this.login = function () {
        $.post("http://local:8888/api", account, function (data) {
            if(data.key) {
                ajax.key = data.key;
            }else {
                //验证失败，显示错误信息；
            }
        }, "json)");
    };

    this.getInfoList = function () {
        $.get("http://local:8888/api/list?k=" + loginkey, {}, function (data) {
            ajax.freshMenList = data;       //获取报名新生数据
        });
    };

    $("#baoming1 > .button").addEventListener("click", ajax.submitInfo, false);
}