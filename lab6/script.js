const nodeInputNumero = document.querySelector("#numero");
const nodeInputSubmit = document.querySelector("form button");
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeSpanTotal = document.querySelector("#colecao span");
const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeSpanRepetidos = document.querySelector("#repetidos span");

const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];
let totalRepetidos = repetidos.length;

function guardaDados() {
  localStorage.setItem("colecao", JSON.stringify(colecao));
  localStorage.setItem("repetidos", JSON.stringify(repetidos));
}

function guardaCarta() {
  const numero = Number(nodeInputNumero.value);

  if (colecao.includes(numero)) {
    repetidos.push(numero);
    repetidos.sort((a, b) => a - b);
    totalRepetidos++;
    atualizaLista(repetidos, nodeUlRepetidos);
    nodeSpanRepetidos.textContent = totalRepetidos;
  } else {
    colecao.push(numero);
    colecao.sort((a, b) => a - b);
    atualizaLista(colecao, nodeUlColecao);
    nodeSpanTotal.textContent = colecao.length;
  }

  guardaDados();
  nodeInputNumero.value = "";
}

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

function eliminaRepetido(indice) {
  repetidos.splice(indice, 1);
  totalRepetidos--;
  atualizaLista(repetidos, nodeUlRepetidos);
  nodeSpanRepetidos.textContent = totalRepetidos;
  guardaDados();
}

nodeInputSubmit.form.onsubmit = (event) => {
  event.preventDefault();
  guardaCarta();
};

function ligaBotoesEliminar() {
  document.querySelectorAll("#repetidos .eliminar").forEach((botao) => {
    botao.onclick = () => {
      eliminaRepetido(Number(botao.dataset.indice));
    };
  });
}

atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);
nodeSpanTotal.textContent = colecao.length;
nodeSpanRepetidos.textContent = totalRepetidos;
