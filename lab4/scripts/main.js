// main.js - Lab 4: DOM e eventos

// ---------- Variáveis ----------
let contador = 0;
let fotoGrande = false;

// ---------- Elementos (pesquisados uma só vez, fora das funções) ----------
const corpo = document.querySelector('body');
const contadorTexto = document.querySelector('#contador');
const mensagem = document.querySelector('#mensagem');
const fotografia = document.querySelector('#fotografia');
const legenda = document.querySelector('#legenda');
const painel = document.querySelector('#painel');
const coordenadas = document.querySelector('#coordenadas');
const tema = document.querySelector('#tema');

// ---------- Contador ----------

// Atualiza o número no ecrã e muda o estilo conforme o valor
function atualizarContador() {
    contadorTexto.textContent = contador;

    if (contador >= 10) {
        contadorTexto.style.color = '#ff2e88';
        contadorTexto.style.fontSize = '64px';
        mensagem.textContent = 'Já chega! Estás cheio de takoyaki.';
    } else if (contador > 0) {
        contadorTexto.style.color = '#ffd400';
        contadorTexto.style.fontSize = '48px';
        mensagem.textContent = 'Bom apetite!';
    } else {
        contadorTexto.style.color = '#ffd400';
        contadorTexto.style.fontSize = '48px';
        mensagem.textContent = 'Clica em "Comer mais um" para começar.';
    }
}

// Evento click
function incrementar() {
    contador++;
    atualizarContador();
}

// Evento click
function decrementar() {
    if (contador > 0) {
        contador--;
    }
    atualizarContador();
}

// Evento dblclick
function reiniciar() {
    contador = 0;
    atualizarContador();
    mensagem.textContent = 'Contador reiniciado.';
}

// ---------- Fotografia ----------

// Evento mouseover
function acender() {
    fotografia.style.opacity = '1';
    fotografia.style.borderColor = '#ff2e88';
    legenda.textContent = 'As luzes de Osaka acenderam! Faz duplo clique para aumentar.';
    legenda.style.color = '#ff2e88';
}

// Evento mouseout
function apagar() {
    fotografia.style.opacity = '0.6';
    fotografia.style.borderColor = 'transparent';
    legenda.textContent = 'Passa o rato por cima da fotografia.';
    legenda.style.color = '';
}

// Evento dblclick
function alternarTamanho() {
    fotoGrande = !fotoGrande;

    if (fotoGrande) {
        fotografia.style.transform = 'scale(1.08)';
        legenda.textContent = 'Fotografia aumentada. Duplo clique para voltar.';
    } else {
        fotografia.style.transform = 'scale(1)';
        legenda.textContent = 'Fotografia no tamanho normal.';
    }
}

// ---------- Painel de néon ----------

// Evento mousemove: a cor depende da posição do rato dentro do painel
function moverNeon(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    const tom = x % 360;

    coordenadas.textContent = 'x: ' + x + ' | y: ' + y;
    painel.style.backgroundColor = 'hsl(' + tom + ', 100%, 20%)';
    painel.style.borderColor = 'hsl(' + tom + ', 100%, 60%)';
    coordenadas.style.color = 'hsl(' + tom + ', 100%, 70%)';
}

// Evento mouseout
function limparNeon() {
    coordenadas.textContent = 'Move o rato aqui dentro.';
    painel.style.backgroundColor = '#000000';
    painel.style.borderColor = '#00e5ff';
    coordenadas.style.color = '';
}

// ---------- Tema ----------

// Evento click
function mudarTema(nome) {
    if (nome === 'dia') {
        corpo.style.backgroundColor = '#fdf6e3';
        corpo.style.color = '#222222';
        tema.textContent = 'Ambiente atual: dia no Castelo de Osaka.';
    } else {
        corpo.style.backgroundColor = '#12121c';
        corpo.style.color = '#f2f2f2';
        tema.textContent = 'Ambiente atual: noite em Dotonbori.';
    }
}
