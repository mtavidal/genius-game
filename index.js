const topLeft = document.querySelector('#yellow');
const topRight = document.querySelector('#green');
const bottomLeft = document.querySelector('#blue');
const bottomRight = document.querySelector('#red');

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

const colorClicked = (colorClicked, teste) => {
    teste.className += ' active';
    setTimeout(() => {
        teste.className = teste.className.replace(' active', '');
    }, 500);
    setTimeout( async () => {
        if (!canClick) return;
        const expectedColor = sequenceToGuess.shift();
        if (expectedColor === colorClicked) {
            if (sequenceToGuess.length === 0) {
                sequence.push(getRandomBtnColor());
                sequenceToGuess = [...sequence];
                startFlashing();
            }
        } else {
            sequence = [];
            sequence.push(getRandomBtnColor());
            sequenceToGuess = [...sequence];
            let contagem = document.querySelector("#contagem");
            let valor = 0;
            contagem.textContent = valor;
            const gameover = document.querySelector('#gameover');
            gameover.style.display = "flex";
            for (let index = 0; index < 5; index++) {             
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
    await new Promise(resolve => setTimeout(resolve,500));
}

const startFlashing = async () => {
    canClick = false;
    let contagem = document.querySelector("#contagem");
    let valor = 0;
    const gameover = document.querySelector('#gameover');
    gameover.style.display = "none";
    const titStart = document.querySelector('#titStart');
    titStart.textContent = "PLAY!";
    for (const btncolor of sequence) {
        valor++;
        contagem.textContent = valor;
        await flash(btncolor);
    }
    canClick = true;
};

const start = document.querySelector('#start');
start.addEventListener("click", startFlashing);

