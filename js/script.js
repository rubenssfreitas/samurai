window.onload = function () {
    iniciar();
    setInterval(principal, 1000 / 30);
}

function iniciar() {

    posicaoJogador1 = posicaoJogador2 = 40;
    posicaoBolaX = posicaoBolaY = 10;
    velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5;
    pontuacaoJogador1 = pontuacaoJogador2 = 0;

    folhaDesenho = document.getElementById("folha");
    areaDesenho = folhaDesenho.getContext("2d");

    larguraCampo = 600;
    alturaCampo = 500;
    espessuraRede = 5;

    diametroBola = 10;

    espessuraRaquete = 11;
    alturaRaquete = 100;

    efeitoRaquete = 0.3;
    velocidadeJogador2 = 5;

    folhaDesenho.addEventListener('mousemove', function (e) {
        posicaoJogador1 = e.clientY - alturaRaquete / 2;
    });
}

function principal() {
    desenhar();
    calcular();
}

function desenhar() {
    areaDesenho.fillStyle = '#286047';

    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

    areaDesenho.fillStyle = '#ffffff'; //cor branca

    areaDesenho.fillRect(larguraCampo / 2 - espessuraRede / 2, 0, espessuraRede, alturaCampo);

    areaDesenho.fillRect(
        posicaoBolaX - diametroBola / 2,
        posicaoBolaY - diametroBola / 2,
        diametroBola, diametroBola);

    // raquetes
    areaDesenho.fillRect(0, posicaoJogador1, espessuraRaquete, alturaRaquete);
    areaDesenho.fillRect(larguraCampo - espessuraRaquete, posicaoJogador2, espessuraRaquete, alturaRaquete);

    //escrever pontuação dos jogadores
    areaDesenho.fillText("Humano - " + pontuacaoJogador1 + " pontos", 100, 100);
    areaDesenho.fillText("Computador - " + pontuacaoJogador2 + " pontos", larguraCampo - 200, 100);

}

function calcular() {

    posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
    posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

    //lateral superior
    if (posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    //lateral inferior 
    if (posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    }

    //verifica se jogador 2 fez pontos
    if (posicaoBolaX < 0) {
        if (posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete) {
            //rebater a bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;

        } else {
            //pontos do jogador 2 
            pontuacaoJogador2 = pontuacaoJogador2 + 1;
            //colocar bola no centro
            continuar();
        }
    }
    // verifica se o jogador 1 fez ponto
    if (posicaoBolaX > larguraCampo) {
        if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete) {
            // rebater a bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;

        } else {
            // pontos do jogador
            pontuacaoJogador1 = pontuacaoJogador1 + 1;

            //colocar a bola no centro
            continuar();

        }
    }

    //atualiza posição jogador 2
    if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;

    } else {
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }

}

function continuar() {
    posicaoBolaX = larguraCampo / 2;
    posicaoBolaY = alturaCampo / 2;
    velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
    velocidadeBolaPosicaoY = 3;
}

// operadores