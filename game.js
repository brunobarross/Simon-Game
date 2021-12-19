let buttonColors = ["red", "blue", "green", "yellow"];
let colorAleatoria;
let padraoJogo = []; // sequencia da maquina
let padraoUsuarioClicou = []; // sequencia do user
const buttonRed = document.querySelector('#red');
const buttonBlue = document.querySelector('#blue');
const buttonGreen = document.querySelector('#green');
const buttonYellow = document.querySelector('#yellow');
let jogoComecou = false;
let nivel = 0;

let titulo = document.querySelector("#level-title");




function nextSequence() {
    nivel++;
    titulo.innerHTML = `Level ${nivel}`;
    let randomNumber = Math.floor(Math.random() * 4); // gerar numero aleatorio
    colorAleatoria = buttonColors[randomNumber]; // correr a array aleatoriamente
    padraoJogo.push(colorAleatoria); // adiciona ao padrao de jogo a cor aleatoria gerada
    const button = document.querySelector(`#${colorAleatoria}`);
    button.classList.add('blink_me');
    setTimeout(function () {
        button.classList.remove('blink_me');
    }, 300);
   

    playSound(colorAleatoria);

    //console.log(padraoJogo, 'padraoJogo')
    //console.log(padraoUsuarioClicou, 'padraoUsuario')
    


}

function lidarComClique(event) {
    let corEscolhida = event.target.id;
    padraoUsuarioClicou.push(corEscolhida);
    playSound(corEscolhida);
    animaAopressionar(corEscolhida);
    checarResposta(padraoUsuarioClicou.length - 1);
}

function playSound(nome) {
    const audio = new Audio(`songs/${nome}.mp3`);
    audio.play();
}


function animaAopressionar(corAtual) {
    const cor = document.querySelector(`#${corAtual}`);
    cor.classList.add('pressed')
    setTimeout(function () {
        cor.classList.remove('pressed');
    }, 200);

};


/* COMEÇAR O JOGO*/

function comecarJogo() {
    if (!jogoComecou) {
        nextSequence();
        jogoComecou = true;
        titulo.innerHTML = `Level ${nivel}`;
    } 
}

/* CHECAR RESPOSTA */

function checarResposta(nivelatual) {
    console.log('padrao User, ' + padraoUsuarioClicou[nivelatual]);
    console.log('padrao Jogo, ' + padraoJogo[nivelatual]);
    if (padraoUsuarioClicou[nivelatual] === padraoJogo[nivelatual]){
        console.log('acertou');
    if(padraoJogo.length === padraoUsuarioClicou.length){
            setTimeout(function () {
                nextSequence();
                padraoUsuarioClicou = [];
            }, 1000);
        }
    } else {
        console.log('errou');
        playSound('wrong');
        document.body.classList.add('game-over');
        setTimeout(function () {
            document.body.classList.remove('game-over');
        }, 200);

        titulo.innerHTML = "Game Over, Press Any Key to Restart";
        comecarNovamente();
        
    }

}


function comecarNovamente(){
        nivel = 0;
        padraoJogo = [];
        padraoUsuarioClicou = [];
        jogoComecou = false;
              
}





    buttonRed.addEventListener('click', lidarComClique);
    buttonBlue.addEventListener('click', lidarComClique);
    buttonGreen.addEventListener('click', lidarComClique);
    buttonYellow.addEventListener('click', lidarComClique);

    window.addEventListener('keydown', comecarJogo);