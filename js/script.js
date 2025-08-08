import { criarFaixas } from "./rua.js";
import { criarPavimentos, criarElevador, aplicarControlesNoElevador } from "./predio.js";

window.addEventListener("DOMContentLoaded", () => {
  criarFaixas();
  criarPavimentos();
  criarElevador();
  aplicarControlesNoElevador();
});