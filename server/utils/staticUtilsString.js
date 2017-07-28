/* These Utils objects can be ran statically - or used as a method of it's own type ( e.g string.toUppercaseFirst() ) */
var staticUtilsString = {
    //Uppercases first letter of the first word
    toUppercaseFirst: function (str) {
        str = str || this.valueOf() || '';
        if (typeof str === 'string') {
            str = str[0].toUpperCase() + str.slice(1, str.length);
            return str;
        } else {
            return '';
        }
    }
    , padRight(length, string) {
        string = string || this;
        if (!length || length < string.length) {
            return string;
        }
        while (string.length < length) {
            string += " ";
        }
        return string;

    }
    , isValidMobileNumber(number, returnClean){
        number = number || this;
        if (!number.length || number.length < 11 || number.length > 13){ //+447 / 07
            return false;
        }
        number = number.replace(/(^0)/,'+44');
        if (number.indexOf("+447") === 0){
            return (returnClean ? number : true);
        } else {
            return false;
        }
    }
    , toSQLEscape(input){
        output = input || this;
        
        return output.replace(/'/g,"''");
    }
};


String.prototype.toUppercaseFirst = staticUtilsString.toUppercaseFirst;
String.prototype.padRight = staticUtilsString.padRight;
String.prototype.isValidMobileNumber = staticUtilsString.isValidMobileNumber;
String.prototype.toSQLEscape = staticUtilsString.toSQLEscape;

module.exports = staticUtilsString;