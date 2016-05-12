"use strict";

var makeAPerson = require("../make-a-person");
var expect = require("chai").expect;

describe("make a person", function() {
    var bob;

    beforeEach(function() {
        bob = new makeAPerson.Person("Bob Ross");
    });

    it("keys", function() {
        expect(Object.keys(bob).length).to.equal(6);
    });

    it("instance", function() {
        expect(bob instanceof makeAPerson.Person).to.be.true;
    });

    it("undefined", function() {
        expect(bob.firstName).to.be.undefined;
        expect(bob.lastName).to.be.undefined;
    });

    it("first name", function() {
        expect(bob.getFirstName()).to.equal("Bob");
    });

    it("last name", function () {
        expect(bob.getLastName()).to.equal("Ross");
    });

    it("full name", function() {
        expect(bob.getFullName()).to.equal("Bob Ross");
    });

    it("new first name", function () {
        bob.setFirstName("Haskell");
        expect(bob.getFullName()).to.equal("Haskell Ross");
    });

    it("new last name", function () {
        bob.setLastName("Curry");
        expect(bob.getFullName()).to.equal("Bob Curry");
    });

    it("new full name", function () {
        bob.setFullName("Haskell Curry");
        expect(bob.getFirstName()).to.equal("Haskell");
        expect(bob.getLastName()).to.equal("Curry");
    });
});