"use strict";

function pairwise(arr, arg) {
    var pairs = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (i < j && arr[i] + arr[j] == arg) {
                pairs.push({
                    value1: arr[i],
                    index1: i,
                    value2: arr[j],
                    index2: j,
                    indexSum: i + j
                });
            }
        }
    }

    var sorted = pairs.sort(function(a, b) {
        return a.indexSum - b.indexSum;
    });

    var usedIndex = {};
    var noConflicts =[];
    for (var i = 0; i < sorted.length; i++) {
        var pair = sorted[i];
        if (! usedIndex[pair.index1] && ! usedIndex[pair.index2]) {
            usedIndex[pair.index1] = true;
            usedIndex[pair.index2] = true;
            noConflicts.push(pair);
        }
    }
    
    return noConflicts.map(function(p) {
        return p.indexSum;
    }).reduce(function(prev, curr) {
        return prev + curr;
    }, 0);
}

console.log("Result", pairwise([1, 1, 1], 2));

exports.pairwise = pairwise;