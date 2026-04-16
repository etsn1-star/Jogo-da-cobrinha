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

let velocidade = 1;

let alturaCobra = (larguraCobra = 10);

let letra;

//array de posições
const posicoes = [
  {
    posicaoCobraX: 10,
    posicaoCobraY: 10,
  },
];
let posicoesCabeca = [];
let x;
let y;
//movimento do mouse
window.addEventListener("keydown", function (e) {
  if (posicoes.length > 1) {
    velocidade = posicoes.length / 2;
  }

  //movimento por teclas
  switch (e.key.toLocaleLowerCase()) {
    case "w":
      letra = "w";
      break;
    case "a":
      letra = "a";
      break;
    case "s":
      letra = "s";
      break;
    case "d":
      letra = "d";
      break;
  }
});

const tamanhoMaca = 10;
let posicaoMacaX = (posicaoMacaY = 250);

function principal() {
  //desenha o campo
  areaDesenho.fillStyle = "#2e7d32";
  areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

  movimento();
  gameOver();

  //desenha a cobra

  posicoes.forEach((item, i) => {
    //faz ela ter movimentação "fluída"
    //movimenta a cobra

    //desenha os segmentos da cobra
    if (i % 2 === 0) {
      areaDesenho.fillStyle = "#7d322e";
    } else {
      areaDesenho.fillStyle = "#ffffff";
    }
    areaDesenho.fillRect(
      item.posicaoCobraX,
      item.posicaoCobraY,
      larguraCobra,
      alturaCobra,
    );
  });

  macas();
}

//gerador de maçãs
function macas() {
  areaDesenho.fillStyle = "#322e7d";
  areaDesenho.fillRect(posicaoMacaX, posicaoMacaY, tamanhoMaca, tamanhoMaca);

  if (
    posicoes[0].posicaoCobraX > posicaoMacaX - tamanhoMaca / 2 &&
    posicoes[0].posicaoCobraX < posicaoMacaX + tamanhoMaca / 2 &&
    posicoes[0].posicaoCobraY > posicaoMacaY - tamanhoMaca / 2 &&
    posicoes[0].posicaoCobraY < posicaoMacaY + tamanhoMaca / 2
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
function movimento() {
  const antigas = posicoes.map((p) => ({
    x: p.posicaoCobraX,
    y: p.posicaoCobraY,
  }));

  switch (letra) {
    case "a":
      posicoes[0].posicaoCobraX -= velocidade;
      break;
    case "d":
      posicoes[0].posicaoCobraX += velocidade;
      break;
    case "w":
      posicoes[0].posicaoCobraY -= velocidade;
      break;
    case "s":
      posicoes[0].posicaoCobraY += velocidade;
      break;
  }

  for (let i = 1; i < posicoes.length; i++) {
    switch (letra) {
      case "a":
        posicoes[i].posicaoCobraX = antigas[i - 1].x;
        posicoes[i].posicaoCobraY = antigas[i - 1].y;
        break;
      case "d":
        posicoes[i].posicaoCobraX = antigas[i - 1].x;
        posicoes[i].posicaoCobraY = antigas[i - 1].y;
        break;
      case "w":
        posicoes[i].posicaoCobraX = antigas[i - 1].x;
        posicoes[i].posicaoCobraY = antigas[i - 1].y;
        break;
      case "s":
        posicoes[i].posicaoCobraX = antigas[i - 1].x;
        posicoes[i].posicaoCobraY = antigas[i - 1].y;
        break;
    }
  }
}
function gameOver() {
  //direito
  if (posicoes[0].posicaoCobraX - larguraCobra / 2 >= larguraCampo) {
    posicoes[0].posicaoCobraX = 10;
    posicoes[0].posicaoCobraY = 10;
    letra = "";
    posicoes.splice(1);
  }
  //esquerdo
  if (posicoes[0].posicaoCobraX + larguraCobra / 2 <= 0) {
    posicoes[0].posicaoCobraX = 10;
    posicoes[0].posicaoCobraY = 10;
    letra = "";
    posicoes.splice(1);
  }
  //Em cima
  if (posicoes[0].posicaoCobraY + alturaCobra / 2 <= 0) {
    posicoes[0].posicaoCobraX = 10;
    posicoes[0].posicaoCobraY = 10;
    letra = "";
    posicoes.splice(1);
  }
  //Em baixo
  if (posicoes[0].posicaoCobraY - alturaCobra / 2 >= alturaCampo) {
    posicoes[0].posicaoCobraX = 10;
    posicoes[0].posicaoCobraY = 10;
    letra = "";
    posicoes.splice(1);
  }
}
