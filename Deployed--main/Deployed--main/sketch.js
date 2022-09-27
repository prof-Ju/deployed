var player
var floor
var zombie1, zombie2, zombie3
var bulletgroup
var zombiesGroup
var bg
var life = 100
var velocitys = [3, 4, -3, -4]

var zombieDie, zombieWalk

var parede1, parede2


function preload() {
    bg = loadImage("./download.jpg")

    zombieWalk = loadAnimation(
        "./assets/zombie/walk/Walk (1).png",
        "./assets/zombie/walk/Walk (2).png",
        "./assets/zombie/walk/Walk (3).png",
        "./assets/zombie/walk/Walk (4).png",
        "./assets/zombie/walk/Walk (5).png",
        "./assets/zombie/walk/Walk (6).png",
        "./assets/zombie/walk/Walk (7).png",
        "./assets/zombie/walk/Walk (8).png",
        "./assets/zombie/walk/Walk (9).png",
        "./assets/zombie/walk/Walk (10).png",
    )

    zombieDie = loadAnimation(
        "./assets/zombie/die/Dead (1).png",
        "./assets/zombie/die/Dead (2).png",
        "./assets/zombie/die/Dead (3).png",
        "./assets/zombie/die/Dead (4).png",
        "./assets/zombie/die/Dead (5).png",
        "./assets/zombie/die/Dead (6).png",
        "./assets/zombie/die/Dead (7).png",
        "./assets/zombie/die/Dead (8).png",
        "./assets/zombie/die/Dead (9).png",
        "./assets/zombie/die/Dead (10).png",
        "./assets/zombie/die/Dead (11).png",
        "./assets/zombie/die/Dead (12).png",
    )

}





function setup() {
    createCanvas(1024, 600);
    player = createSprite(200, 425, 20, 70);
    player.shapeColor = "blue"

    floor = createSprite(340, 560, 1024 * 3, 10);
    floor.visible = false

    zombiesGroup = new Group()


    zombie1 = createSprite(100, 520, 20, 70)
    zombie1.shapeColor = "green"
    zombie1.velocityX = random(velocitys)
    zombiesGroup.add(zombie1)
    zombie1.addAnimation("die", zombieDie)
    zombie1.addAnimation("walk", zombieWalk)
    zombie1.changeAnimation("walk")
    // zombie1.debug= true
    zombie1.scale = 0.2

    zombie2 = createSprite(600, 520, 20, 70)
    zombie2.shapeColor = "green"
    zombie2.velocityX = random(velocitys)
    zombiesGroup.add(zombie2)
    zombie2.addAnimation("die", zombieDie)
    zombie2.addAnimation("walk", zombieWalk)
    zombie2.changeAnimation("walk")
    zombie2.scale = 0.2
    // zombie2.debug= true


    zombie3 = createSprite(800, 520, 20, 70)
    zombie3.shapeColor = "green"
    zombie3.velocityX = random(velocitys)
    zombiesGroup.add(zombie3)
    zombie3.addAnimation("die", zombieDie)
    zombie3.addAnimation("walk", zombieWalk)
    zombie3.changeAnimation("walk")
    zombie3.scale = 0.2
    // zombie3.debug= true

    bulletgroup = new Group()

    parede1 = createSprite(-340, 520, 20, 500);
    parede2 = createSprite(1645, 520, 20, 500);



    if (zombie1.velocityX < 0) {
        zombie1.mirrorX(zombie1.mirrorX() * -1);
    }


    if (zombie2.velocityX < 0) {
        zombie2.mirrorX(zombie2.mirrorX() * -1);
    }


    if (zombie3.velocityX < 0) {
        zombie3.mirrorX(zombie3.mirrorX() * -1);
    }
}


function draw() {

    background("red");
    console.log(player.x)
    camera.position.x = player.x
    image(bg, -350, 0, width * 2, height)
    if (keyDown("d")) {
        player.x += 10
    }


    if (keyDown("a")) {
        player.x -= 10
    }

    if (keyDown("w") && player.y > 510) {
        player.velocityY = -10

    }
    player.velocityY += 0.8
    player.collide(floor)
    drawSprites();
    shoot();
    kill();
    showlife();
    damage();
    if (player.x < 170) {
        camera.position.x = 170
    }
    if (player.x > 1240) {
        camera.position.x = 1240
    }

    player.collide(parede1)
    player.collide(parede2)

    if (zombie1.bounceOff(parede1) ||
        zombie1.bounceOff(parede2)
    ) {
        zombie1.mirrorX(zombie1.mirrorX() * -1); 
    }


    if (zombie2.bounceOff(parede1) ||
        zombie2.bounceOff(parede2)
    ) {
        zombie2.mirrorX(zombie2.mirrorX() * -1);
    }

    if (zombie3.bounceOff(parede1) ||
        zombie3.bounceOff(parede2)
    ) {
        zombie3.mirrorX(zombie3.mirrorX() * -1);
    }


}

function shoot() {
    if (keyDown("space")) {
        var bullet = createSprite(player.x, player.y, 10, 10)
        bullet.shapeColor = "yellow"
        bullet.velocityX = 10
        bulletgroup.add(bullet)
    }
}


function kill() {
    bulletgroup.overlap(zombiesGroup, function (bullet, zombie) {
        bullet.remove()
        zombie.changeAnimation("die")
        zombie.velocityX = 0;
        setTimeout(() => {
            zombie.remove()
        }, 1500)

    })
}

function damage() {
    player.overlap(zombiesGroup, function (player, zombie) {
        life -= 1;
        player.x -= 5
    })
}

function showlife() {
    push();
    fill("white");
    rect(player.x - 50, player.y - 100, 100, 20);
    fill("#f50057");
    rect(player.x - 50, player.y - 100, life, 20);
    noStroke();
    pop();
}


// olha o codigo da aula 42!!