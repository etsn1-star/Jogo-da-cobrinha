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

let letra;

//array de posições
const posicoes = [
  {
    posicaoCobraX: 10,
    posicaoCobraY: 10,
  },
];

//movimento do mouse
window.addEventListener("keydown", function (e) {
  let velocidade = 1;
  if (posicoes.length > 1) {
    velocidade = posicoes.length / 2;
  }
  console.log(velocidade);

  //movimento por teclas
  switch (e.key.toLocaleLowerCase()) {
    case "w":
      posicoes[0].posicaoCobraY -= velocidade;
      letra = "w";

      break;
    case "a":
      posicoes[0].posicaoCobraX -= velocidade;
      letra = "a";
      break;
    case "s":
      posicoes[0].posicaoCobraY += velocidade;
      letra = "s";
      break;
    case "d":
      posicoes[0].posicaoCobraX += velocidade;
      letra = "d";
      break;
  }
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
      if (letra === "a" || letra === "d") {
        item.posicaoCobraX = posicoes[0].posicaoCobraX - larguraCobra * i;
        item.posicaoCobraY = posicoes[0].posicaoCobraY;
      } else if (letra === "w" || letra === "s") {
        item.posicaoCobraX = posicoes[0].posicaoCobraX;
        item.posicaoCobraY = posicoes[0].posicaoCobraY - alturaCobra * i;
      }
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
