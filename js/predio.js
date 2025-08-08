function criarTerreo() {
  const janela = document.createElement("div");
  janela.classList.add("janela");

  const terreo = document.createElement("div");
  terreo.classList.add("terreo");
  terreo.setAttribute("andar", "terreo");
  terreo.appendChild(janela);

  return terreo;
}

function criarAndar(numero) {
  const porta = document.createElement("div");
  porta.classList.add("porta");

  const andar = document.createElement("div");
  andar.classList.add("andar");
  andar.setAttribute("andar", numero);
  andar.appendChild(porta);

  return andar;
}

export function criarPavimentos() {
  const elementosComAndares = document.querySelectorAll("[andares]");
  elementosComAndares.forEach((elemento) => {
    const quantidade = +elemento.getAttribute("andares");
    for (let i = quantidade; i > 0; i--) {
      elemento.appendChild(criarAndar(i));
    }
    elemento.appendChild(criarTerreo());
  });
}

function iniciarMovimentacao() {
  const elevador = document.querySelector(".elevador");
  elevador.setAttribute("em-movimentacao", "true");
}

function finalizarMovimentacao() {
  const elevador = document.querySelector(".elevador");
  elevador.removeAttribute("em-movimentacao");
}

function emMovimentacao() {
  const elevador = document.querySelector(".elevador");
  return elevador.hasAttribute("em-movimentacao");
}

function obterTamanhoDoElevador() {
  const terreo = document.querySelector('[andar="terreo"]');
  return terreo.offsetHeight;
}

export function criarElevador() {
  const poco = document.querySelector(".poco");

  const elevador = document.createElement("div");
  elevador.classList.add("elevador");
  elevador.style.height = obterTamanhoDoElevador() + "px";

  poco.appendChild(elevador);
}

function obterPosicaoAtual() {
  const elevador = document.querySelector(".elevador");
  return +elevador.style.bottom.replace("px", "") || 0;
}

function atualizarMostrador(texto) {
  const mostrador = document.querySelector(".mostrador");
  mostrador.innerHTML = texto;
}

function iniciarComando(comando) {
  const botao = document.querySelector(`[comando="${comando}"]`);
  botao.classList.add("destaque");
}

function finalizarComando(comando) {
  const botao = document.querySelector(`[comando="${comando}"]`);
  botao.classList.remove("destaque");
}

function moverElevadorPara(andar) {
  if (emMovimentacao()) return;

  iniciarMovimentacao();
  iniciarComando(andar);
  const numero = andar ===  "terreo" ? 0 : +andar;
  const elevador = document.querySelector(".elevador");
  
  const posicaoInicial = obterPosicaoAtual();
  const posicaoFinal = numero * obterTamanhoDoElevador();
  const subindo = posicaoFinal > posicaoInicial;

  atualizarMostrador(subindo ? "Subindo" : "Descendo");

  let temporizador = setInterval(() => {
    const novaPosicao = obterPosicaoAtual() + (subindo ? 10 : -10);
    const terminou = subindo ? novaPosicao >= posicaoFinal : novaPosicao <= posicaoFinal;
    elevador.style.bottom = terminou ? posicaoFinal + "px" : novaPosicao + "px";

    if (terminou) {
      clearInterval(temporizador);
      atualizarMostrador(andar === "terreo" ? "Térreo" : `${andar} Andar`);
      finalizarMovimentacao();
      finalizarComando(andar);
    }
  }, 30);
}

export function aplicarControlesNoElevador() {
  const botoes = document.querySelectorAll("[comando]");

  botoes.forEach((botao) => {
    const destino = botao.getAttribute("comando");
    botao.onclick = function() {
      moverElevadorPara(destino);
    }
  });
}