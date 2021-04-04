let ord = [], col = "", game = false, level = 1, wrong = false;

const timer = ms => new Promise(res => setTimeout(res, ms))

function play_sound() {
    const aud = new Audio("sounds/" + col + ".mp3");
    aud.play().then();
}
$("h1").click(function () {
    if(!game){
        console.log("Begin");
        level = 1;
        game = true;
        gen(level);
        displayColors().then();
        $("#level-title").text("Level " + level);
    }
})

$(".btn").click(function () {
    if (game) {
        if (this.id === ord.pop()) {
            col = this.id;
            play_sound();
            ani().then();

            if (ord.length === 0) {
                setTimeout(newLevel,250);
            }

        } else {
            col = "wrong";
            play_sound();
            ani().then();
            game = false;
            $("#level-title").text("Game Over, Press Any Key to Restart, or click me!");
            ord = []
            wrong = true;
            game = false;
            over().then();
        }
    } else {
        col = this.id;
        play_sound();
        ani().then();
    }
});

function gen(lev) {
    ord = []
    for (let i = 0; i < lev; i++) {
        let p = Math.random();
        p *= 4;
        p = Math.floor(p);
        p++;
        if (p === 1)
            ord.push('green');
        else if (p === 2)
            ord.push('red');
        else if (p === 3)
            ord.push('blue');
        else if (p === 4)
            ord.push('yellow');
    }
    console.log(ord);
}

async function ani() {

    $("#" + col).addClass("pressed");
    await timer(250);
    $('#' + col).removeClass("pressed");
}

async function displayColors() {
    for (let i = ord.length - 1; i >= 0; i--) {
        col = ord[i];
        console.log(col);
        await timer(500);
        await ani();
    }
}

$(window).keypress(function (e) {
    if (e.key === 'A' || e.key === 'a' && !game && !wrong) {
        console.log("Begin");
        level = 1;
        game = true;
        gen(level);
        displayColors().then();
        $("#level-title").text("Level " + level);
    } else if (wrong) {
        console.log("New Game");
        game = true;
        wrong = false;
        level = 1;
        gen(level);
        displayColors().then();
        $("#level-title").text("Level " + level);
    }
});


async function over() {
    let b = "body";
    $(b).addClass("game-over");
    await timer(250);
    $(b).removeClass("game-over");
}

function newLevel(){
    level++;
    $("#level-title").text("Level " + level);
    gen(level);
    displayColors().then();
}
