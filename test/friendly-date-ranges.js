"use strict";

var friendlyDateRanges = require("../friendly-date-ranges");
var expect = require("chai").expect;

describe("friendly date ranges", function() {
    var tests = [
        {arr: ["2016-07-01", "2016-07-04"], expected: ["July 1st", "4th"]},
        {arr: ["2016-12-01", "2017-02-03"], expected: ["December 1st", "February 3rd"]},
        {arr: ["2016-12-01", "2018-02-03"], expected: ["December 1st, 2016", "February 3rd, 2018"]},
        {arr: ["2017-03-01", "2017-05-05"], expected: ["March 1st, 2017", "May 5th"]},
        {arr: ["2018-01-13", "2018-01-13"], expected: ["January 13th, 2018"]},
        {arr: ["2022-09-05", "2023-09-04"], expected: ["September 5th, 2022", "September 4th"]},
        {arr: ["2022-09-05", "2023-09-05"], expected: ["September 5th, 2022", "September 5th, 2023"]}
    ];

    tests.forEach(function(test) {
        it("should calc " + test.arr + " and return " + test.expected, function() {
            var actual = friendlyDateRanges.makeFriendlyDates(test.arr);
            expect(actual).to.deep.equal(test.expected);
        });
    });
});