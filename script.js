import { criarFaixas } from "./js/rua.js";
import { criarPavimentos, criarElevador, aplicarControlesNoElevador } from "./js/predio.js";

window.addEventListener("DOMContentLoaded", () => {
  criarFaixas();
  criarPavimentos();
  criarElevador();
  aplicarControlesNoElevador();
});