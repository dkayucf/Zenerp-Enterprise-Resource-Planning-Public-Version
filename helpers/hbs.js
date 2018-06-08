const moment = require('moment');

module.exports = {
    truncate: function(str, len){
        if(str.length > len && str.length > 0){
            var new_str = str + " ";
            new_str = str.substr(0, len);
            new_str = str.substr(0, new_str.lastIndexOf(' '));
            new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
            return new_str + '...';
        }
        return str;
    },
    formatDate: function(date, format){
        return moment(date).format(format);
    },
    updateInvoiceStatus(balance, dueDate){
        let dateNow = Date.now();
        if(balance === 0){
            return './img/paid.svg';
        }else if(dateNow > dueDate){
            return './img/past-due.svg';
        }else {
            return './img/due.svg';
        }
    },
    stripTags: function(input){
        return input.replace(/<(?:.|\n)*?>/gm, '');
    },
    ifCond: function (v1, operator, v2, options) {

        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    },
    select: function(selected, options){
        return options.fn(this)
            .split('\n')
            .map(function(v) {
            var t = 'value="' + value + '"'
            return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
            })
            .join('\n')
    }    
    
}