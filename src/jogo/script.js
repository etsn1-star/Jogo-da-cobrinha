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

const tamanhoMaca = 10;
const frutas = [
  {
    posicaoMacaX: 250,
    posicaoMacaY: 250,
  },
];

//array de posições
const posicoes = [
  {
    posicaoCobraX: 10,
    posicaoCobraY: 10,
  },
];
const eventos = [
  {
    nome: "Chuva de frutas",
    chance: 0.03,
    contador: 0,
    fimEvento: false,
    ativo: true,

    executar: function () {
      if (this.probabilidade() && this.ativo == true) {
        this.ativo = false;

        frutas.push({
          posicaoMacaX: 50,
          posicaoMacaY: 50,
        });
        setTimeout(() => {
          this.fimEvento = true;
        }, 30000);
      }

      if (this.fimEvento) {
        frutas.pop();
        this.ativo = true;
        this.fimEvento = false;
      }
    },
    //simula a probabilidade do jogo
    probabilidade: function () {
      //se chegar a 30, passou-se 1 segundo

      this.contador++;

      if (this.contador == 30) {
        //testa a probabilidade

        this.contador = 0;

        if (Math.random() <= this.chance) {
          return true;
        } else {
          return false;
        }
      }
    },
  },

  {
    nome: "bombinha",
    chance: 0.05,
    fimEvento: false,
    ativo: true,
    contador: 0,
    posicaoX: 10,
    posicaoY: 5,
    tamanhoBomba: 30,
    velocidadeBombaX: 5,
    velocidadeBombaY: 5,
    ricochete: 0.005,
    desenho: false,
    executar: function () {
      if (this.probabilidade() && this.ativo == true) {
        this.ativo = false;
        this.desenho = true;

        setTimeout(() => {
          this.fimEvento = true;
        }, 60000);
      }
      if (this.fimEvento) {
        this.ativo = true;
        this.fimEvento = false;
        this.desenho = false;
      }
      if (this.desenho == true) {
        this.desenharBomba();
      }
    },
    //simula a probabilidade do jogo
    probabilidade: function () {
      //se chegar a 30, passou-se 1 segundo

      this.contador++;

      if (this.contador == 30) {
        //testa a probabilidade

        this.contador = 0;

        if (Math.random() <= this.chance) {
          return true;
        } else {
          return false;
        }
      }
    },
    desenharBomba: function () {
      //muda a posição da bomba
      this.posicaoX += this.velocidadeBombaX;
      this.posicaoY += this.velocidadeBombaY;

      //desenha a bomba
      areaDesenho.fillStyle = "#000000";
      areaDesenho.fillRect(
        this.posicaoX,
        this.posicaoY,
        this.tamanhoBomba,
        this.tamanhoBomba,
      );

      //detecta colisão com o campo
      if (this.posicaoX >= larguraCampo) {
        this.velocidadeBombaX *= -1;
        this.velocidadeBombaY =
          this.velocidadeBombaY +
          (alturaCampo - this.posicaoY) * this.ricochete;
      }
      if (this.posicaoX <= 0) {
        this.velocidadeBombaX *= -1;
        this.velocidadeBombaY =
          this.velocidadeBombaY +
          (alturaCampo - this.posicaoY) * this.ricochete;
      }
      if (this.posicaoY >= alturaCampo) {
        this.velocidadeBombaY *= -1;
        this.velocidadeBombaX =
          this.velocidadeBombaX +
          (larguraCampo - this.posicaoX) * this.ricochete;
      }
      if (this.posicaoY <= 0) {
        this.velocidadeBombaY *= -1;
        this.velocidadeBombaX =
          this.velocidadeBombaX +
          (larguraCampo - this.posicaoX) * this.ricochete;
      }

      if (
        posicoes[0].posicaoCobraX > this.posicaoX - this.tamanhoBomba / 2 &&
        posicoes[0].posicaoCobraX < this.posicaoX + this.tamanhoBomba / 2 &&
        posicoes[0].posicaoCobraY > this.posicaoY - this.tamanhoBomba / 2 &&
        posicoes[0].posicaoCobraY < this.posicaoY + this.tamanhoBomba / 2 &&
        posicoes.length != 1
      ) {
        posicoes.pop();
        this.desenho = false;
      }
    },
  },
];
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

function principal() {
  //desenha o campo
  areaDesenho.fillStyle = "#2e7d32";
  areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

  movimento();
  gameOver();
  pontuacao();

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

  eventos.forEach((item) => {
    item.executar();
  });

  macas();
}

//gerador de maçãs
function macas() {
  areaDesenho.fillStyle = "#322e7d";
  frutas.forEach((item) => {
    areaDesenho.fillRect(
      item.posicaoMacaX,
      item.posicaoMacaY,
      tamanhoMaca,
      tamanhoMaca,
    );

    if (
      posicoes[0].posicaoCobraX > item.posicaoMacaX - tamanhoMaca / 2 &&
      posicoes[0].posicaoCobraX < item.posicaoMacaX + tamanhoMaca / 2 &&
      posicoes[0].posicaoCobraY > item.posicaoMacaY - tamanhoMaca / 2 &&
      posicoes[0].posicaoCobraY < item.posicaoMacaY + tamanhoMaca / 2
    ) {
      item.posicaoMacaX =
        Math.floor(Math.random() * (larguraCampo - tamanhoMaca + 1)) +
        tamanhoMaca;
      item.posicaoMacaY =
        Math.floor(Math.random() * (larguraCampo - tamanhoMaca + 1)) +
        tamanhoMaca;

      posicoes.push({
        posicaoCobraX:
          posicoes[posicoes.length - 1].posicaoCobraX - larguraCobra / 2,
        posicaoCobraY: posicoes[posicoes.length - 1].posicaoCobraY,
      });
    }
  });
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
function pontuacao() {
  areaDesenho.fillStyle = "#000000";

  areaDesenho.fillText("Pontuação: " + (posicoes.length - 1), 425, 15);
}
