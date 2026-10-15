// main.js - Lab 5: JavaScript parte 2
// Organização: 1) elementos, 2) variáveis, 3) handlers, 4) listeners

// ---------- 1. Elementos (pesquisados uma só vez) ----------
const passa = document.querySelector("#passa");
const pintaTexto = document.querySelector("#pinta-texto");
const botoesCor = document.querySelectorAll("button.color");
const escrita = document.querySelector("#escrita");
const seletorFundo = document.querySelector("#seletor-fundo");
const contadorTexto = document.querySelector("#contador");
const botaoIncrementar = document.querySelector("#incrementar");
const botaoDecrementar = document.querySelector("#decrementar");
const botaoReset = document.querySelector("#reset");
const seletorFlex = document.querySelector("#seletor-flex");
const caixaFlex = document.querySelector("#caixa-flex");
const formulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#nome");
const campoIdade = document.querySelector("#idade");
const saudacao = document.querySelector("#saudacao");
const relogio = document.querySelector("#relogio");
const botaoPausa = document.querySelector("#pausa");

// ---------- 2. Variáveis ----------
const coresTeclas = ["#ff2e88", "#00e5ff", "#ffd400", "#7cff6b"];
let indiceCor = 0;

// Lê o valor guardado; se não existir, começa em 0
let contador = Number(localStorage.getItem("lab5-contador")) || 0;

let segundos = 0;
let intervalo = null;

// ---------- 3. Handlers (uma função para cada efeito) ----------

// 1. mouseover
function entrarPassa() {
  passa.textContent = "Obrigado por passares por Dotonbori!";
  passa.style.backgroundColor = "#ff2e88";
}

// 1. mouseout
function sairPassa() {
  passa.textContent = "Volta a passar por aqui!";
  passa.style.backgroundColor = "#2a2a3e";
}

// 3. keyup: as 4 cores vão alternando, voltando ao início no fim
function mudarCorEscrita() {
  escrita.style.backgroundColor = coresTeclas[indiceCor];
  indiceCor = (indiceCor + 1) % coresTeclas.length;
}

// 5. Contador (arrow functions)
const atualizarContador = () => {
  contadorTexto.textContent = contador;
  localStorage.setItem("lab5-contador", contador);
};

const incrementar = () => {
  contador++;
  atualizarContador();
};

const decrementar = () => {
  contador--;
  atualizarContador();
};

const reset = () => {
  contador = 0;
  atualizarContador();
};

// setInterval: corre a cada 1000 ms (1 segundo)
function contarSegundos() {
  segundos++;
  relogio.textContent = segundos;
}

function alternarTemporizador() {
  if (intervalo) {
    clearInterval(intervalo);
    intervalo = null;
    botaoPausa.textContent = "Retomar";
  } else {
    intervalo = setInterval(contarSegundos, 1000);
    botaoPausa.textContent = "Pausar";
  }
}

// ---------- 4. Listeners ----------

passa.addEventListener("mouseover", entrarPassa);
passa.addEventListener("mouseout", sairPassa);

// 2. querySelectorAll + forEach: um só bloco para todos os botões.
// A cor de cada botão vem do atributo data-color (botao.dataset.color).
botoesCor.forEach((botao) => {
  botao.style.backgroundColor = botao.dataset.color;
  botao.addEventListener("click", () => {
    pintaTexto.style.color = botao.dataset.color;
  });
});

escrita.addEventListener("keyup", mudarCorEscrita);

// 4. this: com function, "this" é o select que disparou o evento.
// (Numa arrow function, "this" não seria o select.)
seletorFundo.addEventListener("change", function () {
  document.body.style.backgroundColor = this.value;
});

botaoIncrementar.addEventListener("click", incrementar);
botaoDecrementar.addEventListener("click", decrementar);
botaoReset.addEventListener("click", reset);

// Select flex: muda o flex-direction da caixa
seletorFlex.addEventListener("change", function () {
  caixaFlex.style.flexDirection = this.value;
});

// onsubmit: preventDefault impede que a página recarregue
formulario.onsubmit = (e) => {
  e.preventDefault();
  saudacao.textContent = `Olá, o ${campoNome.value} tem ${campoIdade.value} anos!`;
};

botaoPausa.addEventListener("click", alternarTemporizador);

// ---------- Arranque ----------
atualizarContador();
intervalo = setInterval(contarSegundos, 1000);
