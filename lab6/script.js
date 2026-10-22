// A. Variáveis

// estado da aplicação
if (!localStorage.getItem("colecao")) {
  localStorage.setItem("colecao", "[]");
}
if (!localStorage.getItem("repetidos")) {
  localStorage.setItem("repetidos", "[]");
}

const colecao = JSON.parse(localStorage.getItem("colecao"));
const repetidos = JSON.parse(localStorage.getItem("repetidos"));
let totalRepetidos = repetidos.length;

// referências a elementos do DOM
const nodeForm = document.querySelector("form");
const nodeInputNumero = document.querySelector("#numero");
const nodeInputSubmit = document.querySelector("form button");
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeSpanTotal = document.querySelector("#colecao span");
const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeSpanRepetidos = document.querySelector("#repetidos span");

// B. Event handlers
function guardaCarta() {
  const valor = nodeInputNumero.value.trim();

  if (!valor) return;

  const numero = Number(valor);

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
    totalRepetidos++;
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
  }

  guardaDados();
  renderizar();

  nodeInputNumero.value = "";
  ativarBotao();
}

function eliminaRepetido(indice) {
  repetidos.splice(indice, 1);
  totalRepetidos--;

  guardaDados();
  renderizar();
}

function ativarBotao() {
  nodeInputSubmit.disabled =
    nodeInputNumero.value.trim().length > 0 ? false : true;
}

function guardaDados() {
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

// C. Event listeners
nodeForm.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
};

nodeInputNumero.addEventListener("input", ativarBotao);

function ligaBotoesEliminar() {
  document.querySelectorAll("#repetidos .eliminar").forEach((botao) => {
    botao.onclick = () => eliminaRepetido(Number(botao.dataset.indice));
  });
}

// D. Renderização
function atualizaLista(lista, nodeUl) {
  nodeUl.innerHTML = "";

  lista.forEach((numero, indice) => {
    const nodeLi = document.createElement("li");

    if (lista === repetidos) {
      nodeLi.innerHTML = `${numero} <button type="button" class="eliminar" data-indice="${indice}">eliminar</button>`;
    } else {
      nodeLi.textContent = numero;
    }

    nodeUl.append(nodeLi);
  });

  if (lista === repetidos) {
    ligaBotoesEliminar();
  }
}

function renderizar() {
  atualizaLista(colecao, nodeUlColecao);
  atualizaLista(repetidos, nodeUlRepetidos);
  nodeSpanTotal.textContent = colecao.length;
  nodeSpanRepetidos.textContent = totalRepetidos;
}

// E. Inicialização da aplicação
renderizar();
ativarBotao();
