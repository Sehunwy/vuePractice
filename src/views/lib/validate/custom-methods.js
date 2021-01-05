export function validCore(validateStr, value) {
    validateStr = strToJson(validateStr)
    var errors = [];
    var errorVal = ''
    for (let key in validateStr) {
        if (typeof methods[key] != 'undefined') {
            errorVal = methods[key](validateStr[key], value);
            if (errorVal != '') {
                errors.push(errorVal)
            }
        }
    }
    return errors;
}

var methods = {
    required: function (message, value) {
        if ("" == value) {
            return "required"
        }
        return '';
    },
    positive: function (message, value) {
        var positive = new RegExp(/^[1-9]\d*$/);
        var result = positive.test(value);
        if (!result) {
            return "positive"
        }
        return '';
    },
}

function strToJson(str) {
    var json = JSON.parse(JSON.stringify(str));
    if (typeof (json) == "string") {
        json = eval('(' + json + ')');
    }
    return json;
}