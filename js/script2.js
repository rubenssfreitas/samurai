 var jogadorNome;
 var jogadorEscolha = 0;
 var jogadorPontos = 0;
 var computadorPontos = 0;
 var computadorEscolha = 0;


 // exibe mensagem no console
 function mensagem(texto) {
     document.getElementById('mensagem').innerHTML = texto;
 }

 // define o nome do jogador na tela
 function definirNomeJogador(nome) {
     document.getElementById('jogador-nome').innerHTML = nome;
 }

 //sorteia dois numeros
 function sortear(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 // calcula e retorna quem ganhou 
 function calcularEscolha(jogador, computador) {
     if (jogador == 1 && computador == 1) {
         return 0;
     } else if (jogador == 1 && computador == 2) {
         return 2;
     } else if (jogador == 1 && computador == 3) {
         return 1;
     } else if (jogador == 2 && computador == 1) {
         return 1;
     } else if (jogador == 2 && computador == 2) {
         return 0;
     } else if (jogador == 2 && computador == 3) {
         return 2;
     } else if (jogador == 3 && computador == 1) {
         return 2;
     } else if (jogador == 3 && computador == 2) {
         return 1;
     } else if (jogador == 3 && computador == 3) {
         return 0;
     }

 }

 //soma pontos jogador
 function somarPontoJogador() {
     jogadorPontos++;
     document.getElementById('jogador-pontos').innerHTML = jogadorPontos;
 }

 //soma pontos computador
 function somarPontoComputador() {
     computadorPontos++;
     document.getElementById('computador-pontos').innerHTML = computadorPontos;
 }

 //adiciona classe selecionado
 function selecionar(tipo, escolha) {
    document.getElementById(tipo + '-escolha-' + escolha).classList.add('selecionado');
 }

 //remove a classe selecionado
 function deselecionar(tipo, escolha) {
    document.getElementById(tipo + '-escolha-' + escolha).classList.remove('selecionado');
 }



 //Escolha a jogada
 // 1 - pedra
 // 2 - papel
 // 3 - tesoura

 function jogar(escolha) {
     jogadorEscolha = escolha;
     selecionar('jogador', jogadorEscolha);

     computadorEscolha = sortear(1, 3);
     selecionar('computador', computadorEscolha);

     var ganhador = calcularEscolha(jogadorEscolha, computadorEscolha);

     if (ganhador == 0) {
        mensagem('Empate');
     } 
     else if (ganhador == 1) {
        mensagem('Ponto para' + jogadorNome);
        somarPontoJogador();
     } 
     else if (ganhador == 2) {
        mensagem('Ponto para Computador');
        somarPontoComputador();
     }

     setTimeout(function() {
        deselecionar ('jogador', jogadorEscolha);
        deselecionar('computador', computadorEscolha);
        mensagem(jogadorNome + 'Escolha uma opção acima...');
    }, 2000);
  }


 document.getElementById('jogador-escolha-1').onclick = function () {
     jogar(1);
 };

 document.getElementById('jogador-escolha-2').onclick = function () {
     jogar(2);
 };

 document.getElementById('jogador-escolha-3').onclick = function () {
     jogar(3);
 };

 jogadorNome = prompt('Qual seu nome? ');


 mensagem('Bem-vindo ' + jogadorNome + ' Está preparado? Escolha uma opção acima...');
 definirNomeJogador(jogadorNome);