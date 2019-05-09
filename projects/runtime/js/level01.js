var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'box',x:400,y:groundY -25},
                {type: 'box',x:600,y:groundY -25},
                {type: 'box',x:900,y:groundY -25},
                {type: 'box',x:1400,y:groundY - 25},
                {type: 'enemy',x:1500,y: groundY - 56},
                {type: 'coin',x:1250,y: 310},
                {type: 'box',x:1700,y:groundY -25},
                {type: 'box',x:2000,y:groundY -25},
                {type: 'box',x:2200,y:groundY -25},
                {type: 'box',x:2400,y:groundY -25},
                {type: 'enemy',x:2000,y:groundY-56},
                {type: 'box',x:2500,y:groundY -25},
                {type: 'box',x:2700,y:groundY -25},
                {type: 'box',x:2850,y:groundY -25},
                {type: 'box',x:3000,y:groundY -25},
                {type: 'box',x:3200,y:groundY -25},
                {type: 'box',x:3500,y:groundY -25},
                {type: 'box',x:3800,y:groundY -25},
                {type: 'coin',x:2750,y: 310},
                {type: 'enemy',x:4000,y:groundY-56},
                {type: 'enemy',x:6000,y:groundY-56},
                {type: 'box2',x:4100,y:groundY-56},
                {type: 'box2',x:4110,y:groundY-56},
                {type: 'box2',x:4120,y:groundY-56},
                {type: 'box2',x:4130,y:groundY-56},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        
        //Default Sawblade function//
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            myObstacle.onPlayerCollision = function() {
                myObstacle.fadeOut();
                game.changeIntegrity(-10);
            };
            
            game.addGameItem(myObstacle);
        
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
        
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        } 
        //Enemy function//
        function createEnemy(x,y) {
            var enemy = game.createGameItem('enemy',100);
            var redSquare = draw.bitmap('img/knight.png');
            redSquare.x = -115;
            redSquare.y = -80;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = -4;
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                enemy.fadeOut();
                game.changeIntegrity(-20);
            };
            enemy.onProjectileCollision = function() {
              game.increaseScore(100);
              console.log('Halle has hit the enemy');
              enemy.shrink();
            };
            
            game.addGameItem(enemy);
        }
        //Coin function//
        function createCoin(x,y) {
            var hitZoneSize = 30;
            var coin = game.createObstacle(hitZoneSize);
            coin.onPlayerCollision = function() {
                coin.fadeOut();
                game.changeIntegrity(20);
                game.increaseScore(300);
            };
            coin.velocityX = -2;
            coin.x = x;
            coin.y = y;
            game.addGameItem(coin);
            
            var coinImage = draw.bitmap('img/coin.png');
            coinImage.x = -25;
            coinImage.y = -25;
            coin.addChild(coinImage);
            
        }
        //Box function//
        function createBox(x,y) {
            var hitZoneSize = 30;
            var box = game.createObstacle(hitZoneSize);
            box.onPlayerCollision = function() {
              box.fadeOut();
              game.changeIntegrity(-20);
              console.log('Halle got hit by box');
            };
            box.velocityX = -2;
            box.x = x;
            box.y = y;
            game.addGameItem(box);
            
            var obstacleImage = draw.bitmap('img/crate.png');
            box.addChild(obstacleImage);
            
            obstacleImage.x = -25;
            obstacleImage.y = -30;
        }
        //Kill-Zone Function//
        function createEnd(x,y) {
            var hitZoneSize = 100;
            var box2 = game.createObstacle(hitZoneSize);
            box2.onPlayerCollision = function() {
              box2.fadeOut();
              game.changeIntegrity(-200);
              console.log('Halle got hit by box');
            };
            box2.velocityX = -2;
            box2.x = x;
            box2.y = y;
            game.addGameItem(box2);
        }
        //Getting all of the gameItems//
        for(var i = 0; i < levelData.gameItems.length;i++) {
            var gameItem = levelData.gameItems[i];
            if (levelData.gameItems[i].type === 'sawblade') {
                createSawBlade(gameItem.x,gameItem.y);
            } else if (levelData.gameItems[i].type === 'box') {
                createBox(gameItem.x,gameItem.y);
            } else if (levelData.gameItems[i].type === 'enemy') {
                createEnemy(gameItem.x,gameItem.y);
            } else if (levelData.gameItems[i].type === 'coin') {
                createCoin(gameItem.x,gameItem.y);
            } else if (levelData.gameItems[i].type === 'box2') {
                createEnd(gameItem.x,gameItem.y);
            }
        }
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}