"use strict";

$(document).ready(function () {
    var buttons = [
        {id: "#greenPad", down: "#00FF00", up: "#3CB371", index: 0, sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")},
        {id: "#redPad", down: "#FF0000", up: "#8B0000", index: 1, sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")},
        {id: "#yellowPad", down: "#FFFF00", up: "#DEB887", index: 2, sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")},
        {id: "#bluePad", down: "#1589FF", up: "#0000CD", index: 3, sound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")},
        {id: "#startBtn", down: "#F9966B", up: "#C11B17"},
        {id: "#strictBtn", down: "#FFFFCC", up: "#FDD017"}
    ];

    var sequence = [];
    var intervals = [];
    var running = false;

    buttons.forEach(function(button) {
        $(button.id).mousedown(function() {
            $(this).attr("fill", button.down);
            if (button.hasOwnProperty("sound")) {
                button.sound.pause();
                button.sound.play();
            }
            return false;
        }).mouseup(function() {
            $(this).attr("fill", button.up);
            if (button.hasOwnProperty("sound")) {
                button.sound.pause();
            }
            return false;
        })
    });

    $(".onOffBtn").click(function () {
        running = ! running;
        updateOnOffSwitch();
        if (! running) {
            intervals.forEach(function (id) {
                clearInterval(id);
                //TODO reset all pad button states
            });
        }
    });
    
    //TODO what to do when start button is pressed and there's already a sequence
    $("#startBtn").click(function() {
        if (running) {
            addSequence(); 
        }
    });

    function playSequence(step) {
        console.log("playing step", step);
        var buttonIdx = sequence[step];
        var button = buttons[buttonIdx];
        $(button.id).mousedown();
        intervals.push(setTimeout(function() {
            $(button.id).mouseup();
            if (step < (sequence.length - 1)) {
                playSequence(step + 1);
            } else {
                console.log("done");
                addSequence()
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

    function updateOnOffSwitch() {
        $("#onSwitch").attr("fill", running ? "green" : "black");
        $("#offSwitch").attr("fill", running ? "black" : "green");
    }
    
    function updateCount() {
        $("#count").text(sequence.length);
    }

    updateOnOffSwitch();
    updateCount();
});