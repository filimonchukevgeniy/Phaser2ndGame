var config = {
    type: Phaser.AUTO,
    width: 1980,
    height: 1080,
    
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
var platform_x = 0;
var worldWidth = 10000


function preload ()
{
    this.load.spritesheet('hero', 
    'assets/hero.png',
    { frameWidth: 100, frameHeight: 75 });
    this.load.image("sky" , "assets/Sky.png");
    this.load.image("block", "assets/block.png");
    this.load.image("coin", "assets/coin.png");
    this.load.image("backblock" , "assets/block2.png")
    this.load.image("platform" , "assets/platform1.png")
    this.load.image("fon" , "assets/fon.png")
    this.load.image("blockfon" , "assets/fon1.png")
    this.load.image("Rblock" , "assets/Rightblock.png")
    this.load.image("Lblock" , "assets/Leftblock.png")
    this.load.image("fon2","assets/fon2.png")

}

function create()
{
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1 
    });

    this.add.tileSprite(0 , 0 , worldWidth ,1080 , "fon").setOrigin(0,0).setDepth(-2);;
    this.add.tileSprite(0 , 660 , worldWidth , 1080 , "backblock").setScale(1).setOrigin(0,0).setDepth(1);

    
    //this.add.image(0, 0, 'sky').setOrigin(0, 0);
    //this.add.image(2000, 0, 'sky').setOrigin(0, 0);

    this.player = this.physics.add.sprite(100, 100, 'hero').setDepth(7);

    coinGroup = this.physics.add.group()
    coin = coinGroup.create(500 , 300 , "coin")

    platforms = this.physics.add.staticGroup(); 
    backblock = this.physics.add.staticGroup();
    platform = this.physics.add.staticGroup();
    fon = this.physics.add.staticGroup();

    this.physics.add.collider(this.player, platform);


    

    

    platform.create(2200 , 500 , 'platform').setScale(2).refreshBody();

    //for(var x = 0 ; x < worldWidth ; x = x + 450){
    //    platform.create(x , 1000 , "block").setOrigin(0 , 0 ).refreshBody();
    //}


    

    for (var i = 0; i < 150; i++) {
        var platform = platforms.create(40 * i, 660, 'block').setScale(2).refreshBody().setDepth(1);

    }

    for (var i = 0; i < 3; i++) {
        var x = 300
        var y = 500
        //1
        var platform = platforms.create(x +40 + 40 * i, y, 'block').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x, y, 'Lblock').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x+160, y, 'Rblock').setScale(2).refreshBody().setDepth(1);
        this.add.tileSprite(x-20 , y-4 , 200 , 1080 , "blockfon").setScale(1).setOrigin(0,0).setDepth(0);
        fon.create(x+180, y-15 + i*100, 'fon2').setScale(1).refreshBody().setDepth(-1).setOrigin(0,0);

        //2
        x = 600
        y = 420
        var platform = platforms.create(x +40 + 40 * i, y , 'block').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x, y, 'Lblock').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x+160, y, 'Rblock').setScale(2).refreshBody().setDepth(1);
        this.add.tileSprite(580 , 418 , 200 , 1080 , "blockfon").setScale(1).setOrigin(0,0).setDepth(0);
        fon.create(x+180, y-15 + i*100, 'fon2').setScale(1).refreshBody().setDepth(-1).setOrigin(0,0);
        //3
        x = 900
        y = 230
        var platform = platforms.create(x+40 + 40 * i, y, 'block').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x, y, 'Lblock').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x+160, y, 'Rblock').setScale(2).refreshBody().setDepth(1);
        this.add.tileSprite(880 , 228 , 200 , 1080 , "blockfon").setScale(1).setOrigin(0,0).setDepth(0);
        fon.create(x+180, y-15 + i*100, 'fon2').setScale(1).refreshBody().setDepth(-1).setOrigin(0,0);
        fon.create(x+180, y-15 + i*100+300, 'fon2').setScale(1).refreshBody().setDepth(-1).setOrigin(0,0);
        //4
        x = 1200
        y = 160
        var platform = platforms.create(x+40 + 40 * i, y, 'block').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x, y, 'Lblock').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x+160, y, 'Rblock').setScale(2).refreshBody().setDepth(1);
        this.add.tileSprite(1180 , 158 , 200 , 1080 , "blockfon").setScale(1).setOrigin(0,0).setDepth(0);
        fon.create(x+180, y+23 + i*100, 'fon2').setScale(1).refreshBody().setDepth(-1).setOrigin(0,0);
        fon.create(x+180, y-15 + i*100+300, 'fon2').setScale(1).refreshBody().setDepth(-1).setOrigin(0,0);
        //5
        x = 1500
        y = 200
        var platform = platforms.create(x+40 + 40 * i, y, 'block').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x, y, 'Lblock').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x+160, y, 'Rblock').setScale(2).refreshBody().setDepth(1);
        this.add.tileSprite(1480 , 198 , 200 , 1080 , "blockfon").setScale(1).setOrigin(0,0).setDepth(0);
        fon.create(x+180, y+90 + i*100, 'fon2').setScale(1).refreshBody().setDepth(-1).setOrigin(0,0);
        fon.create(x+180, y-15 + i*100+300, 'fon2').setScale(1).refreshBody().setDepth(-1).setOrigin(0,0);
        //6
        x = 1800
        y = 300
        var platform = platforms.create(x+40 + 40 * i, y, 'block').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x, y, 'Lblock').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x+160, y, 'Rblock').setScale(2).refreshBody().setDepth(1);
        this.add.tileSprite(1780 , 298 , 200 , 1080 , "blockfon").setScale(1).setOrigin(0,0).setDepth(0);
        
        //7
        x = 1500
        y = 400
        var platform = platforms.create(x+40 + 40 * i, y, 'block').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x, y, 'Lblock').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x+160, y, 'Rblock').setScale(2).refreshBody().setDepth(1);
        //8
        x = 1800
        y = 540
        var platform = platforms.create(x+40 + 40 * i, y, 'block').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x, y, 'Lblock').setScale(2).refreshBody().setDepth(1);
        var platform = platforms.create(x+160, y, 'Rblock').setScale(2).refreshBody().setDepth(1);
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
    if(cursors.down.isDown){
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160*speed);
 
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160*speed);
        }
            
    }
    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-450);
    }
    if (this.player.y > 1000) 
    { 
      
        restartGame();
    }

    //if(this.platform_x<5){
    //    this.platform.setVelocityX(50);
    //   this.platform_x ++;

        


    //}else
    //{
    //    this.platform.setVelocityX(-250);
    //    this.platform_x = 0;


   // }
    
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