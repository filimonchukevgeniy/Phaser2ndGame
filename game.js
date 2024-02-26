var config = {
    type: Phaser.AUTO,
    width: 1980,
    height: 880,
    
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
       // restart: restart,
    }
};

const game = new Phaser.Game(config);

var cursors; 
var enemies;
var speed = 4;
var score = 0 ;

function preload ()
{
    this.load.spritesheet('hero', 
    'assets/hero.png',
    { frameWidth: 100, frameHeight: 75 });
    this.load.image("sky" , "assets/Sky.png");
    this.load.image("block", "assets/block.png");
    this.load.image("coin", "assets/coin.png");
    this.load.image("backblock" , "assets/block2.png")
}

function create()
{
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1 
    });

    
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.player = this.physics.add.sprite(100, 100, 'hero');

    coinGroup = this.physics.add.group()
    coin = coinGroup.create(500 , 300 , "coin")

    platforms = this.physics.add.staticGroup(); 
    backblock = this.physics.add.staticGroup();

    backblock.create(0 , 760 , "backblock").setScale(2).refreshBody();
    backblock.create(1000 , 760 , "backblock").setScale(2).refreshBody();

    
    

    for (var i = 0; i < 50; i++) {
        var platform = platforms.create(40 * i, 660, 'block').setScale(3).refreshBody();

    }

    for (var i = 0; i < 5; i++) {
        var platform = platforms.create(300 + 40 * i, 500, 'block').setScale(2).refreshBody();
        var platform = platforms.create(600 + 40 * i, 400, 'block').setScale(2).refreshBody();
        var platform = platforms.create(900 + 40 * i, 230, 'block').setScale(2).refreshBody();
        var platform = platforms.create(1200 + 40 * i, 160, 'block').setScale(2).refreshBody();
        var platform = platforms.create(1500 + 40 * i, 200, 'block').setScale(2).refreshBody();
        var platform = platforms.create(1800 + 40 * i, 540, 'block').setScale(2).refreshBody();
        var platform = platforms.create(1500 + 40 * i, 400, 'block').setScale(2).refreshBody();
        var platform = platforms.create(1800 + 40 * i, 300, 'block').setScale(2).refreshBody();
    }
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, platforms);
    
    

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 800 * 10, 600);

    // Створення групи ворогів
    enemies = this.physics.add.group();
    var witch = enemies.create(600, 300, 'witch');
    witch.body.setCircle(15); // Встановлення круглої форми для колізії
    witch.body.setOffset(5, 10); // Зміщення колізії для кращої взаємодії
    

    this.physics.add.collider(enemies, platforms);
    this.physics.add.collider(coinGroup, platforms);

    this.physics.add.overlap(this.player, coin, collectCoin, null, this);

    this.physics.add.overlap(this.player, enemies, collideWithEnemy, null, this);

    
}

function update()
{
    if (cursors.left.isDown) {
        this.player.setVelocityX(-40*speed);
        this.player.flipX = true; 
        this.player.anims.play('walk', true);
    } else if (cursors.right.isDown) {
        this.player.setVelocityX(40*speed);
        this.player.flipX = false; 
        this.player.anims.play('walk', true);
    } else {
        this.player.setVelocityX(0);
        this.player.anims.stop('walk');
    }
    
    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-450);
    }
    if (this.player.y > 1000) 
    { 
      
        restartGame();
    }
    
}

function collideWithEnemy(plane, enemy) {
    // Встановлення таймера ефекту
    this.time.delayedCall(3000, function() {
        // Після 3 секунд збільшуємо швидкість героя назад
        this.speed = 4;
        console.log("speed 4")
        
    }, [], this);
    // Зменшення швидкості героя
    this.speed = 1;
    console.log("speed 1")
    
}

function collectCoin()
{
    coin.disableBody(true, true);
    coin = coinGroup.create(500 , 300 , "coin");
    
    
}



function restartGame() 
{
    // Перезавантаження гри
    console.log('restart')
    location.reload();
    //this.scene.create();
}