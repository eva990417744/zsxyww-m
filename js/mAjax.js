/**
 * Created by Lunzi on 9/9/2016.
 */

majax = new MAjax();
majax.getKey();

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
    $("#sumbitBtn").click(QwQ.sumbitInfo);
}