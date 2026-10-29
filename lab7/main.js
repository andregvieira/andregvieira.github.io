/* global produtos */
if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", "[]");
}

const listaProdutos = document.querySelector("#lista-produtos");
const listaCesto = document.querySelector("#lista-cesto");
const totalCesto = document.querySelector("#total");

function criarProduto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.image);
  imagem.setAttribute("alt", produto.title);

  const preco = document.createElement("p");
  preco.classList.add("preco");
  preco.textContent = `Custo total: ${produto.price.toFixed(2)} €`;

  const descricao = document.createElement("p");
  descricao.classList.add("descricao");
  descricao.textContent = produto.description;

  const rating = document.createElement("p");
  rating.textContent = `⭐ ${produto.rating.rate} (${produto.rating.count} avaliações)`;

  const botao = document.createElement("button");
  botao.textContent = "+ Adicionar ao Cesto";
  botao.addEventListener("click", () => adicionarAoCesto(produto));

  article.append(titulo, imagem, preco, descricao, rating, botao);

  return article;
}

function criaProdutoCesto(produto) {
  const article = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const imagem = document.createElement("img");
  imagem.setAttribute("src", produto.image);
  imagem.setAttribute("alt", produto.title);

  const preco = document.createElement("p");
  preco.classList.add("preco");
  preco.textContent = `Custo total: ${produto.price.toFixed(2)} €`;

  const botao = document.createElement("button");
  botao.textContent = "- Remover do Cesto";
  botao.addEventListener("click", () => removerDoCesto(produto));

  article.append(titulo, imagem, preco, botao);

  return article;
}

function renderizarProdutos(produtos) {
  listaProdutos.innerHTML = "";

  produtos.forEach((produto) => {
    const article = criarProduto(produto);
    listaProdutos.append(article);
  });
}

function atualizaCesto() {
  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );

  listaCesto.innerHTML = "";

  selecionados.forEach((produto) => {
    const article = criaProdutoCesto(produto);
    listaCesto.append(article);
  });

  const total = selecionados.reduce((acum, produto) => acum + produto.price, 0);
  totalCesto.textContent = `${total.toFixed(2)} €`;
}

function adicionarAoCesto(produto) {
  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );
  selecionados.push(produto);
  localStorage.setItem("produtos-selecionados", JSON.stringify(selecionados));

  atualizaCesto();
}

function removerDoCesto(produto) {
  const selecionados = JSON.parse(
    localStorage.getItem("produtos-selecionados"),
  );

  const indice = selecionados.findIndex((p) => p.id === produto.id);
  selecionados.splice(indice, 1);

  localStorage.setItem("produtos-selecionados", JSON.stringify(selecionados));

  atualizaCesto();
}

renderizarProdutos(produtos);
atualizaCesto();
