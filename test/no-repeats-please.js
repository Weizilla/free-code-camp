"use strict";

var noRepeatsPlease = require("../no-repeats-please");
var expect = require("chai").expect;

describe("perm", function() {
    var tests = [
        {arg: "aab", expected: 2},
        {arg: "aaa", expected: 0},
        {arg: "aabb", expected: 8},
        {arg: "abcdefa", expected: 3600},
        {arg: "abfdefa", expected: 2640},
        {arg: "zzzzzzz", expected: 0},
        {arg: "a", expected: 1},
        {arg: "aaab", expected: 0},
        {arg: "aaabb", expected: 12}
    ];

    tests.forEach(function(test) {
        it("expect input " + test.arg + " to return " + test.expected, function(){
            expect(noRepeatsPlease.permAlone(test.arg)).to.equal(test.expected);
        });
    });

});
