//***********
//Enemy class
//***********

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
}

// Used to update enemy's position
// parameter dt is a time delta between ticks
Enemy.prototype.update = function (dt) {
    // to make the game runs at same speed for all computers we multiply enemy x position by dt
    this.x += this.speed * dt;
    if (this.x > 520) {
        this.x = -100;
        this.speed = Math.random() * 500 + 80;
    }
    this.collisionCheck();
};

//used to detect the collision between the user and bug
//Source : https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.collisionCheck = function () {
    if (player.x < this.x + 60 &&
        player.x + 50 > this.x &&
        player.y < this.y + 70 &&
        40 + player.y > this.y) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//***********
//Player class
//***********

class Player {
    constructor() {
        this.x = 200;
        this.y = 400;
        this.position = 50;
        this.sprite = 'images/char-boy.png';
    }
}

// used to reset the user position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

//used for preventing player from getting out of the boundaries.
Player.prototype.update = function () {

    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.x = 200;
        this.y = 400;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handles the user input
Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            if (this.x > 0) {
                this.x -= this.position + 50;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += this.position + 50;
            }
            break;
        case 'up':
            if (this.y > 45) {
                this.y -= this.position + 30;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += this.position + 30;
            }
            break;
    }
};


//**********
// instantiation of player and enemies
//**********

let allEnemies = [];
let player = new Player();

// "Y-axis" position where the enemies will are created
let enemyY = [60, 140, 220];
let enemy;
enemyY.forEach(function (Y) {
    enemy = new Enemy(0, Y, Math.random() * 500 + 80);
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});