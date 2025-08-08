export function criarFaixas() {
  const elementosComFaixas = document.querySelectorAll("[faixas]");
  elementosComFaixas.forEach((elemento) => {
    const quantidade = +elemento.getAttribute("faixas");
    for (let i = 0; i < quantidade; i++) {
      const faixa = document.createElement("div");
      faixa.classList.add("faixa");
      elemento.appendChild(faixa);
    }
  })
}