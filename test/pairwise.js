"use strict";

var pairwise = require("../pairwise");
var expect = require("chai").expect;

describe("pairwise", function() {
    var tests = [
        {arr: [7, 9, 11, 13, 15], arg: 20, expected: 6},
        {arr: [1, 4, 2, 3, 0, 5], arg: 7, expected: 11},
        {arr: [1, 3, 2, 4], arg: 4, expected: 1},
        {arr: [1, 1, 1], arg: 2, expected: 1},
        {arr: [0, 0, 0, 0, 1, 1], arg: 1, expected: 10},
        {arr: [], arg: 100, expected: 0}
    ];
   
    tests.forEach(function(test) {
        it("should calc correctly for " + test, function() {
            var actual = pairwise.pairwise(test.arr, test.arg);
            expect(actual).to.equal(test.expected);
        });
    })
});