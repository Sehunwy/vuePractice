import Vue from 'vue'
import { validCore } from '@/views/lib/validate/custom-methods.js'
Vue.directive('validate', {
    inserted: function (el, binding, vnode) {
        var value = el.value; // 输入的值
        var expression = binding.expression; // 自定义指令传输的值
        setErrTip(el);
        var errLogo = $(el).next(".err-logo");
        var errtip = $(errLogo).next(".err-tip");
        setLogoPosition(el);
        validation(expression, value, el, true);
        $(el).on('focus', function () { // 获取焦点事件
            value = el.value;
            validation(expression, value, el);
        })
        $(el).on('blur', function () { // 失去焦点事件
            $(errtip).addClass("dn");
        })
        $(el).on('input', function () { // 输入事件
            value = el.value;
            validation(expression, value, el)
        })
        $(errLogo).hover(function () {
            $(errtip).removeClass("dn");
        }, function () {
            $(errtip).addClass("dn");
        });
    }
})

function validation(expression, value, el, isInit) {
    var result = validCore(expression, value); // 验证的错误结果
    var length = result.length;
    var errLogo = $(el).next(".err-logo");
    var errtip = $(errLogo).next(".err-tip");
    if (length != 0) {
        $(el).attr("valid", "validFalse");
        var ul = $(errtip).find('ul');
        var li = "";
        ul.empty();
        for (var i = 0; i < length; i++) {
            li = $("<li>" + result[i] + "</li>");
            ul.append(li);
        }
        setTipPosition(el);
        showError(el, value, isInit);
    }
    else {
        $(el).attr("valid", "validTrue");
        $(errLogo).addClass("dn");
        $(errtip).addClass("dn");
        $(el).removeClass("valid-none-input").removeClass("valid-err-input");
    }
}

function setErrTip(el) {
    var BeforeLogo = $(el).next('.err-logo');
    if (BeforeLogo.length != 0) {
        var BeforeTip = $(BeforeLogo).next(".err-tip");
        $(BeforeLogo).remove();
        $(BeforeTip).remove();
    }
    var errlogo = $("<span class='err-logo dn'><i class='el-icon-warning-outline'></i></span>");
    var errtip = $("<div class='err-tip dn'><em class='em'></em><span class='span'></span><ul><li>testttttt</li></ul></div>");
    $(el).after(errlogo);
    $(errlogo).after(errtip);
}

function setLogoPosition(el) {
    var tip = $(el).next(".err-logo");
    setPosition(el, tip)
}

function setTipPosition(el) {
    var tip = $(el).next(".err-logo").next(".err-tip");
    setPosition(el, tip, true)
}

function setPosition(el, tip, isTip) {
    var input = $(el);
    var tipH = tip.outerHeight(),
        tipW = tip.outerWidth(),
        inputH = input.outerHeight(),
        inputW = input.innerWidth();
    var x = input.parent().offset().left + input.offset().left, y = input.offset().top;
    var padLeft = parseInt(input.parent().css('padding-left'));
    var top = y + (inputH - tipH) / 2,
        left = x + inputW + padLeft;
    if (isTip) {
        left += 10;
    }
    else {
        left -= tipW;
    }
    $(tip).css({ "top": top, "left": left });
}

function showError(el, value, isInit) {
    var errLogo = $(el).next(".err-logo");
    var errtip = $(errLogo).next(".err-tip");
    if (!isInit) {
        $(errLogo).removeClass("dn");
        $(errtip).removeClass("dn");
    }
    if (value == "") {
        if (!isInit)
            $(el).removeClass("valid-err-input").addClass("valid-none-input");
        $(errLogo).removeClass("cred").addClass("cblue");
        $(errtip).removeClass("cred");
    }
    else {
        if (!isInit)
            $(el).removeClass("valid-none-input").addClass("valid-err-input");
        $(errLogo).removeClass("cblue").addClass("cred");
        $(errtip).addClass("cred");
    }
}

export function formValid(form) {
    var valid = $(form).find("[valid='validFalse']");
    if (valid.length != 0) {
        var el = valid[0];
        var value = el.value;
        $(el).val("").focus().val(value).focus();
        return false;
    }
    return true;
}
