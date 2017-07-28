/* These Utils objects can be ran statically - or used as a method of it's own type ( e.g array.findCallback() ) */
var staticUtilsArray = {

    findCallback: function (aArgs) {
        aArgs = aArgs || this || new Array();
        if (typeof aArgs === 'object') {
            for (let i = 0; i < aArgs.length; i++) {
                if (typeof aArgs[i] === 'function') {
                    return aArgs[i];
                }
            }
        } else {
            return new Array();
        }
    }
    
    ,removeKey: function (index, aArray) {
        aArray = aArray || this || new Array();
        if (typeof aArray === 'object') {
            aArray.splice(index, 1);
        }
        return aArray;
    }
};
/* Add to the prototype so available for every array without manually including */
Array.prototype.findCallback = staticUtilsArray.findCallback;
Array.prototype.removeKey = staticUtilsArray.removeKey;

module.exports = staticUtilsArray;