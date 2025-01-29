let numerosSorteados = [];
let numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibitTextoInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}

exibitTextoInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute > numeroMaximo){
        exibirTextoNaTela('p', `O número secreto está entre 1 e ${numeroMaximo}!!! Tente novamente.`)
        
    }else{
        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Acertou!!!');
            let palavraTentativa = tentativas > 1 ? 'tentativas':'tentativa';
            let mensagemTentativa = (`Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`)
            exibirTextoNaTela('p', mensagemTentativa);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
            } else {
                exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
            }
            tentativas++;
            limparCampo();
        }
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementos = numerosSorteados.length;

    if(quantidadeDeElementos == numeroMaximo){
        numerosSorteados = [];
    }
    if(numerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
   
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibitTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
    