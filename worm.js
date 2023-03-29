var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var size = 20;
var direction = "right";
var score = 0;

var worm = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
];

var apple = generateApple();

setInterval(function() {
    moveWorm();
    draw();
}, 100);

document.addEventListener("keydown", function(event) {
    var key = event.keyCode;
    if (key === 37 && direction !== "right") {
        direction = "left";
    } else if (key === 38 && direction !== "down") {
        direction = "up";
    } else if (key === 39 && direction !== "left") {
        direction = "right";
    } else if (key === 40 && direction !== "up") {
        direction = "down";
    }
});

function moveWorm() {
    var head = { x: worm[0].x, y: worm[0].y };
    if (direction === "right") {
        head.x++;
    } else if (direction === "left") {
        head.x--;
    } else if (direction === "up") {
        head.y--;
    } else if (direction === "down") {
        head.y++;
    }
    worm.unshift(head);
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple = generateApple();
    } else {
        worm.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the worm
    ctx.fillStyle = "green";
    for (var i = 0; i < worm.length; i++) {
        var x = worm[i].x * size;
        var y = worm[i].y * size;
        ctx.fillRect(x, y, size, size);
    }
    // draw the apple
    ctx.fillStyle = "red";
    var x = apple.x * size;
    var y = apple.y * size;
    ctx.fillRect(x, y, size, size);
    // draw the score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function generateApple() {
    var x = Math.floor(Math.random() * (canvas.width / size));
    var y = Math.floor(Math.random() * (canvas.height / size));
    return { x: x, y: y };
}
