var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    // для this.physics
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);


function preload ()
{
    this.load.image("hero", "assets/hero.png");
    this.load.image("sky" , "assets/Sky.png");
    this.load.image("block", "assets/block.png");
}

function create()
{
    
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.plane = this.physics.add.sprite(100, 100, 'hero');
    platforms = this.physics.add.staticGroup();
}

function update()
{

}