var player
var floor
var zombie1, zombie2, zombie3
var bulletgroup
var zombiesGroup
var bg
var life = 100
var velocitys = [3,4,-3,-4]
function preload() {
 bg = loadImage("./download.jpg")
}


function setup() {
    createCanvas(1024, 600);
    player = createSprite(200, 425, 20, 70);
    player.shapeColor = "blue"

    floor = createSprite(340, 560, 1024 * 3, 10);
    floor.visible = false

    zombiesGroup = new Group()


    zombie1 = createSprite(400, 520, 20, 70)
    zombie1.shapeColor = "green"
    zombie1.velocityX = random(velocitys)
    zombiesGroup.add(zombie1)

    zombie2 = createSprite(600, 520, 20, 70)
    zombie2.shapeColor = "green"
    zombie2.velocityX = random(velocitys)
    zombiesGroup.add(zombie2)

    zombie3 = createSprite(800, 520, 20, 70)
    zombie3.shapeColor = "green"
    zombie3.velocityX = random(velocitys)
    zombiesGroup.add(zombie3)

   
    bulletgroup = new Group()
}


function draw() {
    background("red");
    console.log(player.x)
    camera.position.x = player.x
    image(bg, -350,0, width*2, height)
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
    if(player.x < 170){
        camera.position.x = 170
    }
    if(player.x > 1240){
        camera.position.x = 1240
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


function kill(){
    bulletgroup.overlap(zombiesGroup, function(bullet,zombie){
        bullet.remove()
        zombie.remove()
    })
}

function damage(){
    player.overlap(zombiesGroup,function(player,zombie){
        life -= 1;
        player.x -= 5
    })
}

function showlife(){
    push();
    fill("white");
    rect(player.x - 50, player.y - 100, 100, 20);
    fill("#f50057");
    rect(player.x - 50, player.y - 100, life, 20);
    noStroke();
    pop();
}


// olha o codigo da aula 42!!