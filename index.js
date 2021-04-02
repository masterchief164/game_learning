
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let ord = [], game = false,ans = [];

$(".btn").click(function () {
    ans.push(this.id);
    console.log(this.id);
    const aud = new Audio("sounds/" + this.id + ".mp3");
    $("#" + this.id).addClass("pressed");
    aud.play().then(() => {
        sleep(200).then(() => {});
        $("#" + this.id).removeClass("pressed");
    });
});

$(window).keypress(function (e) {
    if ((e.key === 'A' || e.key === 'a') && !game) {
        console.log("Level 1");
        $("#level-title").text('Level 1');
    }
});

function gen(lev) {
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
}

async function disp() {
    for (let i = 0; i < ord.length; i++) {
        let p = '#' + ord[i];
        $(p).addClass("pressed");
        await sleep(500);
        $(p).removeClass("pressed");
    }
}