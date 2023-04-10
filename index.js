const topLeft = document.querySelector('#yellow');
const topRight = document.querySelector('#green');
const bottomLeft = document.querySelector('#blue');
const bottomRight = document.querySelector('#red');
const newRecord = document.querySelector('#newRecord');
const getRandomBtnColor = () => {
    const btncolors = [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ];
    return btncolors[parseInt(Math.random() * btncolors.length)];
}


let sequence = [getRandomBtnColor()];
let sequenceToGuess = [...sequence];


const flash = btncolor => {
    return new Promise((resolve) => {
        btncolor.className += ' active';
        setTimeout(() => {
            btncolor.className = btncolor.className.replace(' active', '');
            setTimeout(() => {
                resolve();
            }, 500);
        }, 1000);
    });
};

let canClick = false;
let corClicada = 0;
let corClicadaMaior = localStorage.getItem('bestScore');
console.log("corclicadaMAIOR" + corClicadaMaior);
const colorClicked = (colorClicked, teste) => {
    teste.className += ' active';
    setTimeout(() => {
        teste.className = teste.className.replace(' active', '');
    }, 500);
    setTimeout(async () => {
        if (!canClick) return;
        const expectedColor = sequenceToGuess.shift();
        if (expectedColor === colorClicked) {
            if (sequenceToGuess.length === 0) {
                sequence.push(getRandomBtnColor());
                sequenceToGuess = [...sequence];
                corClicada++;
                startFlashing();
            }
        } else {
            sequence = [];
            sequence.push(getRandomBtnColor());
            sequenceToGuess = [...sequence];
            let totScore = document.querySelector("#totScore");
            totScore.textContent = corClicada;
            if (corClicada > corClicadaMaior) {
                let totBest = document.querySelector("#totBest");
                totBest.textContent = corClicada;
                localStorage.setItem('bestScore', corClicada);
                corClicadaMaior = localStorage.getItem('bestScore');
                const center = document.querySelector('.center');
                center.style.display = "none"
                const newRecord = document.querySelector('#newRecord');
                newRecord.style.display = "flex";
                for (let index = 0; index < 5; index++) {
                    await piscaRecord() ;
                }
                newRecord.style.display = "none";
                center.style.display = "flex";
            }

            corClicada = 0;
            let contagem = document.querySelector("#contagem");
            let valor = 0;
            contagem.textContent = valor;
            const gameover = document.querySelector('#gameover');
            gameover.style.display = "flex";
            for (let index = 0; index < 3; index++) {
                await pisca();
            }
            const restart = document.querySelector('#restart');
            restart.addEventListener("click", startFlashing);
        }
    }, 1000);
};

async function pisca() {
    setTimeout(() => {
        topLeft.className += ' active';
        topRight.className += ' active';
        bottomLeft.className += ' active';
        bottomRight.className += ' active';
    }, 200);
    setTimeout(() => {
        topLeft.className = topLeft.className.replace(' active', '');
        topRight.className = topRight.className.replace(' active', '');
        bottomLeft.className = bottomLeft.className.replace(' active', '');
        bottomRight.className = bottomRight.className.replace(' active', '');
    }, 500);
    await new Promise(resolve => setTimeout(resolve, 500));
}
async function piscaRecord() {
    setTimeout(() => {
        newRecord.className += 'newRecordActive';
    }, 200);
    setTimeout(() => {
        newRecord.className = newRecord.className.replace('newRecordActive', '');
    }, 500);
    await new Promise(resolve => setTimeout(resolve, 500));
}

const startFlashing = async () => {
    canClick = false;
    let contagem = document.querySelector("#contagem");
    let valor = 0;
    const gameover = document.querySelector('#gameover');
    gameover.style.display = "none";
    const titStart = document.querySelector('#titStart');
    titStart.textContent = "";
    const titPlay = document.querySelector('#titPlay');
    titPlay.textContent = "PLAY";
    for (const btncolor of sequence) {
        valor++;
        contagem.textContent = valor;
        await flash(btncolor);
    }
    canClick = true;
};

const start = document.querySelector('#titStart');
start.addEventListener("click", startFlashing);
if (corClicadaMaior == undefined) {
    let totBest = document.querySelector("#totBest");
    totBest.textContent = "-";
} else {
    let totBest = document.querySelector("#totBest");
    totBest.textContent = localStorage.getItem('bestScore');
}




