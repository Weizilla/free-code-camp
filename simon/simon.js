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

    function playSequence() {
        sequence.forEach(function(buttonIndex, i) {
            var id = buttons[buttonIndex].id;
            setTimeout(function() {$(id).mousedown()}, i * 1000);
            setTimeout(function() {$(id).mouseup()}, (i + 1) * 900);
        });
    }

    function addSequence() {
        sequence.push(_.random(3));
        setTimeout(playSequence, 1000);
    }

    addSequence();

});