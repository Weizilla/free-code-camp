"use strict";

function makeFriendlyDates(arr) {
    function getMonth(month) {
       return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month];
    }

    function getDate(date) {
        switch (date) {
            case 1: return "1st";
            case 2: return "2nd";
            case 3: return "3rd";
            default: return date + "th";
        }
    }

    function format(input, includeMonth, includeYear) {
        var result = getDate(input.getUTCDate()).toString();
        if (includeMonth) {
            result = getMonth(input.getUTCMonth()) + " " + result;
        }
        if (includeYear) {
            result += ", " + input.getUTCFullYear();
        }
        return result;
    }

    if (arr[0] === arr[1]) {
        return [format(new Date(arr[0]), true, true)];
    }

    var start = new Date(arr[0]);
    var end = new Date(arr[1]);
    var includeEndYear = end.getTime() - start.getTime() >= 365 * 24 * 60 * 60 * 1000;
    var includeStartYear = new Date().getUTCFullYear() !== start.getFullYear() || includeEndYear;
    var includeEndMonth = start.getUTCMonth() !== end.getUTCMonth() || start.getUTCFullYear() !== end.getUTCFullYear();
    var startStr = format(start, true, includeStartYear);
    var endStr = format(end, includeEndMonth, includeEndYear);
    return [startStr, endStr];
}

console.log(makeFriendlyDates(["2016-07-01", "2016-07-04"]));

exports.makeFriendlyDates = makeFriendlyDates;
