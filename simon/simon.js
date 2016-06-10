"use strict";

$(document).ready(function () {
    var padButtons = [
        {id: "#greenPad", down: "#00FF00", up: "#3CB371", index: 0, sound: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"},
        {id: "#redPad", down: "#FF0000", up: "#8B0000", index: 1, sound: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"},
        {id: "#yellowPad", down: "#FFFF00", up: "#DEB887", index: 2, sound: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"},
        {id: "#bluePad", down: "#1589FF", up: "#21618C", index: 3, sound: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"}
    ];

    var otherButtons = [
        {id: "#startBtn", down: "#F9966B", up: "#C11B17"},
        {id: "#strictBtn", down: "#FFFFCC", up: "#FDD017"}
    ];

    var sequence = [];
    var intervals = [];
    var running = false;
    var userTimeoutInterval;
    var userSequence = [];
    var usersTurn = false;

    padButtons.forEach(function(button) {
        $(button.id).mousedown(function() {
            $(this).attr("fill", button.down);
            new Audio(button.sound).play();
            return false;
        }).mouseup(function() {
            $(this).attr("fill", button.up);
            return false;
        })
    });

    otherButtons.forEach(function(button) {
        $(button.id).mousedown(function() {
            $(this).attr("fill", button.down);
            return false;
        }).mouseup(function() {
            $(this).attr("fill", button.up);
            return false;
        })
    });

    $(".onOffBtn").click(function () {
        running = ! running;
        updateOnOffSwitch();
        if (! running) {
            reset();
        }
    });

    //TODO what to do when start button is pressed and there's already a sequence
    $("#startBtn").click(function() {
        if (running) {
            addSequence();
        }
    });

    $(".padBtn").click(function() {
        if (usersTurn) {
            if (userTimeoutInterval) {
                clearTimeout(userTimeoutInterval);
            }

            var id = "#" + $(this).attr("id");
            var buttonIdx = padButtons.find(function(button) {
                return id === button.id;
            }).index;
            userSequence.push(buttonIdx);
            checkValidUserSteps();
        }
    });

    function checkValidUserSteps() {
        console.log("checking user steps");
        for (var i = 0; i < userSequence.length; i++) {
            if (userSequence[i] !== sequence[i]) {
                gameOver();
                return;
            }
        }
        console.log("all good");
        if (userSequence.length === sequence.length) {
            userSequence = [];
            addSequence();
        } else {
            waitForUser();
        }
    }

    function playSequence(step) {
        console.log("playing step", step);
        var buttonIdx = sequence[step];
        var button = padButtons[buttonIdx];
        $(button.id).mousedown();
        intervals.push(setTimeout(function() {
            $(button.id).mouseup();
            if (step < (sequence.length - 1)) {
                playSequence(step + 1);
            } else {
                console.log("done");
                waitForUser();
            }
        }, 1000));
    }

    function addSequence() {
        sequence.push(_.random(3));
        updateCount();
        intervals.push(setTimeout(function() {
            playSequence(0);
        }, 1000));
    }

    function waitForUser() {
        console.log("waiting for user");
        if (userTimeoutInterval) {
            clearTimeout(userTimeoutInterval);
        }
        var id = setTimeout(gameOver, 3000);
        userTimeoutInterval = id;
        intervals.push(id);
        usersTurn = true;
    }

    function gameOver() {
        console.log("game over!");
        padButtons.forEach(function(button) {
            new Audio(button.sound).play();
        });
        reset();
    }

    function reset() {
        intervals.forEach(function(id) {
            clearInterval(id);
        });
        padButtons.forEach(function(button) {
            $(button.id).mouseup();
        });
        usersTurn = false;
        sequence = [];
        userSequence = [];
        updateCount();
    }

    function updateOnOffSwitch() {
        $("#onSwitch").attr("fill", running ? "green" : "black");
        $("#offSwitch").attr("fill", running ? "black" : "green");
    }

    function updateCount() {
        var count = sequence.length;
        count = count > 0 ? count - 1 : 0;
        $("#count").text(count);
    }

    updateOnOffSwitch();
    updateCount();
});