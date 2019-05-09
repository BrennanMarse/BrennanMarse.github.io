var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var image;
        var background;
        var tree;
        var torches = [];
        var buildings = [];
        // ANIMATION VARIABLES HERE:

        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'yellow');
            background.addChild(backgroundFill);
            
            image = draw.bitmap('img/wall4.png');
            image.x = 0;
            image.y = 0;
            background.addChild(image);
            
            // TODO: 3 - Add a moon and starfield
            tree = draw.bitmap('img/wall4.png');
            tree.x = 2000;
            tree.y = 0;
            background.addChild(tree);
            
            
            var shape = draw.rect(canvasWidth,1000,'gray');
            background.addChild(shape);
            
            shape.y = ground.y + 3;
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight = 308;
            var building;
            for(var i=0;i<5;i++) {
                building = draw.bitmap('img/pillar.png');
                building.x = 600*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            
            var torchHeight = 258;
            var torch;
            for(var i2=0;i2<5;i2++) {
                torch = draw.bitmap('img/torch.png');
                torch.x = 600*i2 + 300;
                torch.y = groundY-torchHeight;
                background.addChild(torch);
                torches.push(torch);
            }
            
            // TODO 4: Part 1 - Add a tree

        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            image.x = image.x - 2;
            
            if (image.x < -2000) {
                image.x = canvasWidth;
            }
            
            
            tree.x = tree.x - 2;
            
            if (tree.x < -2000) {
                tree.x = canvasWidth; 
            }
            
            for(var t = 0; t < torches.length; t++) {
                torches[t].x = torches[t].x -2;
                if (torches[t].x < -87) {
                    torches[t].x = (3000 - 87);
                }
            }
                    
            // TODO 5: Part 2 - Parallax
            for(var i = 0; i < buildings.length; i++) {
                buildings[i].x = buildings[i].x - 2;
                if (buildings[i].x < -87) {
                    buildings[i].x = (3000 - 87);
                }
            }
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
