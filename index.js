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
    return new Promise ((resolve) => {
        btncolor.className += ' active';
        setTimeout(() => {
            btncolor.className = btncolor.className.replace(' active','');
            setTimeout(() => {
                resolve();
            },500);
        }, 1000);
    });
};

let canClick = false;

const colorClicked = (colorClicked,teste) => {
    teste.className += ' active';
    setTimeout(() => {
        teste.className = teste.className.replace(' active','');
    },500);
    setTimeout(() => {
        if(!canClick) return;
        const expectedColor = sequenceToGuess.shift();
        if(expectedColor === colorClicked) {
            if(sequenceToGuess.length === 0) {
                sequence.push(getRandomBtnColor());
                sequenceToGuess = [...sequence];
                startFlashing();
            }
        } else {
            sequence = [];
            sequence.push(getRandomBtnColor());
            sequenceToGuess = [...sequence];
            let contagem = document.querySelector("#contagem");
            let valor =0;
            contagem.textContent = valor; 
            const gameover = document.querySelector('#gameover');
            gameover.style.display = "flex";
            const restart = document.querySelector('#restart');
            restart.addEventListener("click", startFlashing);
        }
    },1000);
};

const startFlashing = async () => {
    canClick = false;
    let contagem = document.querySelector("#contagem");
    let valor =0;
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

