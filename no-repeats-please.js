"use strict";

function permAlone(str) {
    function genPerms(chars) {
        if (chars.length === 1) {
            return chars;
        }
        var result = [];
        for (var i = 0; i < chars.length; i++) {
            var remaining = chars.slice();
            var curr = remaining.splice(i, 1);
            var tails = genPerms(remaining);
            for (var j = 0; j < tails.length; j++) {
                result.push(curr + tails[j]);
            }
        }
        return result;
    }

    function hasRepeat(str) {
        for (var i = 1; i < str.length; i++) {
            if (str.charAt(i - 1) === str.charAt(i)) {
                return true;
            }
        }
        return false;
    }

    var perms = genPerms(str.split(""));

    return perms.filter(function(str) {
        return ! hasRepeat(str);
    }).length;
}

console.log(permAlone("abc"));

exports.permAlone = permAlone;
