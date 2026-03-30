//define as variaveis principais
const folhaDesenho = document.getElementById("desenho");
const areaDesenho = folhaDesenho.getContext("2d");

//define a taxa de quadros por segundo
window.onload = function () {
  setInterval(principal, 1000 / 30);
};

//define as variaveis
const alturaCampo = 500;
const larguraCampo = 500;

let alturaCobra = (larguraCobra = 10);

const posicoes = [
  {
    posicaoCobraX: 10,
    posicaoCobraY: 10,
  },
];

//movimento do mouse
folhaDesenho.addEventListener("mousemove", function (e) {
  posicoes[0].posicaoCobraX = e.clientX - larguraCobra / 2;
  posicoes[0].posicaoCobraY = e.clientY - alturaCobra / 2;
});

const tamanhoMaca = 10;
let posicaoMacaX = (posicaoMacaY = 250);

function principal() {
  //desenha o campo
  areaDesenho.fillStyle = "#000000";
  areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

  //desenha a cobra
  areaDesenho.fillStyle = "#ffffff";

  posicoes.forEach((item, i) => {
    areaDesenho.fillRect(
      item.posicaoCobraX,
      item.posicaoCobraY,
      larguraCobra,
      alturaCobra,
    );
    if (i > 0) {
      item.posicaoCobraX = posicoes[i - 1].posicaoCobraX - larguraCobra / 2;
      item.posicaoCobraY = posicoes[i - 1].posicaoCobraY;
    }
  });

  macas();
}

//gerador de maçãs
function macas() {
  areaDesenho.fillStyle = "#ff0000";
  areaDesenho.fillRect(posicaoMacaX, posicaoMacaY, tamanhoMaca, tamanhoMaca);

  if (
    posicoes[0].posicaoCobraX == posicaoMacaX ||
    posicoes[0].posicaoCobraY == posicaoMacaY
  ) {
    posicaoMacaX =
      Math.floor(Math.random() * (larguraCampo - tamanhoMaca + 1)) +
      tamanhoMaca;
    posicaoMacaY =
      Math.floor(Math.random() * (larguraCampo - tamanhoMaca + 1)) +
      tamanhoMaca;

    posicoes.push({
      posicaoCobraX:
        posicoes[posicoes.length - 1].posicaoCobraX - larguraCobra / 2,
      posicaoCobraY: posicoes[posicoes.length - 1].posicaoCobraY,
    });
  }
}
