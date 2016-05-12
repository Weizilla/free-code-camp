"use strict";

var Person = function(firstAndLast) {
    var first = firstAndLast.split(" ")[0];
    var last = firstAndLast.split(" ")[1];

    this.setFirstName = function(firstName) {
        first = firstName;
    };

    this.getFirstName = function() {
        return first;
    };

    this.setLastName = function(lastName) {
        last = lastName;
    };

    this.getLastName = function() {
        return last;
    };

    this.setFullName = function(fullName) {
        first = fullName.split(" ")[0];
        last = fullName.split(" ")[1];
    };

    this.getFullName = function() {
        return first + " " + last;
    };
};

exports.Person = Person;