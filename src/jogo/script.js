//define as variaveis principais
const folhaDesenho = document.getElementById("desenho");
const areaDesenho = folhaDesenho.getContext("2d");
const mensagem = document.getElementById("mensagem");

let tempoJogo = 0;
let tempoJogoContador = 0;

//Classes

class Cobra {
  //constrói a cobra
  constructor(x, y) {
    this.velocidade = 5;
    this.nome = "Cadeia alimentar";
    this.chance = 0.01;
    this.contador = 0;
    this.fimEvento = false;
    this.ativo = true;
    this.desenho = false;
    this.direcao = 1;

    //cria a cabeça
    this.posicoes = [
      {
        posicaoCobraX: x,
        posicaoCobraY: y,
      },
    ];
  }
  executar() {
    //executa se a probabilidade for correta
    if (probabilidade(this) && this.ativo == true) {
      this.ativo = false;
      this.desenho = true;
      umEventoSo();
      mensagem.innerText = this.nome;
      mensagem.style.display = "block";

      setTimeout(() => {
        this.fimEvento = true;
        this.posicoes.splice(1);
        reativarEventos();
      }, 100000);

      setTimeout(() => {
        mensagem.style.display = "none";
      }, 3000);
    }
    if (this.fimEvento) {
      this.ativo = true;
      this.fimEvento = false;
      this.desenho = false;
    }
    if (this.desenho == true) {
      this.antigas = this.posicoes.map((p) => ({
        x: p.posicaoCobraX,
        y: p.posicaoCobraY,
      }));

      areaDesenho.fillStyle = "#346789";
      areaDesenho.fillRect(
        this.posicoes[0].posicaoCobraX,
        this.posicoes[0].posicaoCobraY,
        10,
        10,
      );

      //evita bugs estranhos por haver duas frutas
      if (this.direcao == 1) {
        //cria IA simples, movimento horizontal
        if (this.posicoes[0].posicaoCobraX < frutas[0].posicaoMacaX) {
          this.posicoes[0].posicaoCobraX += this.velocidade;
        } else if (this.posicoes[0].posicaoCobraX > frutas[0].posicaoMacaX) {
          this.posicoes[0].posicaoCobraX -= this.velocidade;
        }
        if (
          Math.abs(this.posicoes[0].posicaoCobraX - frutas[0].posicaoMacaX) <
          this.velocidade
        ) {
          this.direcao = 0;
        }
      }
      if (this.direcao == 0) {
        console.log("entrei na vertical");
        //cria IA simples, movimento vertical
        if (this.posicoes[0].posicaoCobraY > frutas[0].posicaoMacaY) {
          this.posicoes[0].posicaoCobraY -= this.velocidade;
          console.log("cobra maior que fruta");
        } else if (this.posicoes[0].posicaoCobraY < frutas[0].posicaoMacaY) {
          this.posicoes[0].posicaoCobraY += this.velocidade;
          console.log("fruta maior que cobra");
        }
        if (
          Math.abs(this.posicoes[0].posicaoCobraY - frutas[0].posicaoMacaY) <
          this.velocidade
        ) {
          console.log("posicao igual");
          this.direcao = 1;
        }
      }

      for (let i = 1; i < this.posicoes.length; i++) {
        areaDesenho.fillStyle = "#346789";
        areaDesenho.fillRect(
          this.posicoes[i].posicaoCobraX,
          this.posicoes[i].posicaoCobraY,
          10,
          10,
        );

        this.posicoes[i].posicaoCobraX = this.antigas[i - 1].x;
        this.posicoes[i].posicaoCobraY = this.antigas[i - 1].y;
      }
      for (let i = 0; i < this.posicoes.length; i++) {
        if (
          posicoes[0].posicaoCobraX >
            this.posicoes[i].posicaoCobraX - larguraCobra / 2 &&
          posicoes[0].posicaoCobraX <
            this.posicoes[i].posicaoCobraX + larguraCobra / 2 &&
          posicoes[0].posicaoCobraY >
            this.posicoes[i].posicaoCobraY - alturaCobra / 2 &&
          posicoes[0].posicaoCobraY <
            this.posicoes[i].posicaoCobraY + alturaCobra / 2
        ) {
          gameOver(true);
          this.desenho = false;
        }
      }
    }
  }
  velocidade() {}
}

class incendio {
  constructor(x, y) {
    this.posicoesIncendio = [
      {
        x: x,
        y: y,
      },
    ];
    this.tamanhoIncendio = 10;
    this.posicaoX;
    this.posicaoY;
    this.nome = "fogo fogaréu";
    this.chance = 0.05;
    this.chance2 = 0.1;
    this.contador = 0;
    this.contador2 = 0;
    this.fimEvento = false;
    this.ativo = true;
    this.desenho = false;
    this.direcao = 1;
  }

  executar() {
    if (probabilidade(this) && this.ativo == true) {
      this.ativo = false;
      this.desenho = true;
      umEventoSo();
      mensagem.innerText = this.nome;
      mensagem.style.display = "block";

      setTimeout(() => {
        this.fimEvento = true;
        this.incendio.splice(0);
        reativarEventos();
      }, 100000);
      setTimeout(() => {
        mensagem.style.display = "none";
      }, 3000);
    }
    if (this.fimEvento) {
      this.ativo = true;
      this.fimEvento = false;
      this.desenho = false;
    }
    if (this.desenho == true) {
      areaDesenho.fillStyle = "#ffff00";
      areaDesenho.fillRect(
        this.posicoesIncendio[0].x,
        this.posicoesIncendio[0].y,
        this.tamanhoIncendio,
        this.tamanhoIncendio,
      );

      for (let i = 0; i < this.posicoesIncendio.length; i++) {
        const pos = this.posicoesIncendio[i];

        this.posicaoX =
          Math.floor(
            Math.random() *
              (this.posicoesIncendio[i].x +
                25 -
                (this.posicoesIncendio[i].x - 25) +
                1),
          ) +
          (this.posicoesIncendio[i].x - 25);
        this.posicaoY =
          Math.floor(
            Math.random() *
              (this.posicoesIncendio[i].y +
                25 -
                (this.posicoesIncendio[i].y - 25) +
                1),
          ) +
          this.posicoesIncendio[i].y -
          25;

        if (this.probabilidadeIncendio()) {
          if (
            this.posicaoX <= larguraCampo &&
            this.posicaoY <= alturaCampo &&
            this.posicoesIncendio.length
          ) {
            this.posicoesIncendio.push({
              x: this.posicaoX,
              y: this.posicaoY,
            });
          }
        }
        areaDesenho.fillRect(
          this.posicoesIncendio[i].x,
          this.posicoesIncendio[i].y,
          this.tamanhoIncendio,
          this.tamanhoIncendio,
        );
        console.log("entrei");
        if (
          posicoes[0].posicaoCobraX >
            this.posicoesIncendio[i].x - this.tamanhoIncendio / 2 &&
          posicoes[0].posicaoCobraX <
            this.posicoesIncendio[i].x + this.tamanhoIncendio / 2 &&
          posicoes[0].posicaoCobraY >
            this.posicoesIncendio[i].y - this.tamanhoIncendio / 2 &&
          posicoes[0].posicaoCobraY <
            this.posicoesIncendio[i].y + this.tamanhoIncendio / 2
        ) {
          gameOver(true);
          this.desenho = false;
        }
      }
    }
  }
  probabilidadeIncendio() {
    this.contador2++;
    if (this.contador2 == 30) {
      //testa a probabilidade

      this.contador2 = 0;

      if (Math.random() <= this.chance2) {
        return true;
      } else {
        return false;
      }
    }
  }
}

const cobraIA = new Cobra(10, 10);
const fogo = new incendio(250, 220);

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
//cria a cobra IA

const eventos = [
  {
    nome: "Chuva de frutas",
    chance: 0.05,
    contador: 0,
    fimEvento: false,
    ativo: true,

    executar: function () {
      if (probabilidade(this) && this.ativo == true) {
        mensagem.innerText = this.nome;
        mensagem.style.display = "block";

        this.ativo = false;
        umEventoSo();

        frutas.push({
          posicaoMacaX: 50,
          posicaoMacaY: 50,
        });
        setTimeout(() => {
          this.fimEvento = true;
        }, 30000);

        setTimeout(() => {
          mensagem.style.display = "none";
        }, 3000);
      }

      if (this.fimEvento) {
        frutas.pop();
        this.ativo = true;
        this.fimEvento = false;
        reativarEventos();
      }
    },
    //simula a probabilidade do jogo
  },

  {
    nome: "bombinha",
    chance: 0.03,
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
      if (probabilidade(this) && this.ativo == true) {
        mensagem.innerText = this.nome;
        mensagem.style.display = "block";

        this.ativo = false;
        this.desenho = true;
        umEventoSo();

        setTimeout(() => {
          this.fimEvento = true;
          reativarEventos();
        }, 60000);
        setTimeout(() => {
          mensagem.style.display = "none";
        }, 3000);
      }
      if (this.fimEvento) {
        this.ativo = true;
        this.fimEvento = false;
        this.desenho = false;
        this.velocidadeBombaX = 5;
        this.velocidadeBombaY = 5;
      }
      if (this.desenho == true) {
        this.desenharBomba();
      }
    },
    //desenha a bomba
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
        posicoes.length > 1
      ) {
        posicoes.pop();
        this.desenho = false;
      } else if (
        posicoes.length == 1 &&
        posicoes[0].posicaoCobraX > this.posicaoX - this.tamanhoBomba / 2 &&
        posicoes[0].posicaoCobraX < this.posicaoX + this.tamanhoBomba / 2 &&
        posicoes[0].posicaoCobraY > this.posicaoY - this.tamanhoBomba / 2 &&
        posicoes[0].posicaoCobraY < this.posicaoY + this.tamanhoBomba / 2
      ) {
        gameOver(true);
        this.desenho = false;
      }
    },
  },
  cobraIA,
  fogo,
];
//movimento do mouse
window.addEventListener("keydown", function (e) {
  if (posicoes.length > 1) {
    velocidade = posicoes.length / 2;
  }

  //movimento por teclas
  switch (e.key.toLocaleLowerCase()) {
    case "w":
      if (letra != "s") {
        letra = "w";
      }
      break;
    case "a":
      if (letra != "d") {
        letra = "a";
      }
      break;
    case "s":
      if (letra != "w") {
        letra = "s";
      }
      break;
    case "d":
      if (letra != "a") {
        letra = "d";
      }
      break;
  }
});

function principal() {
  tempoJogoContador++;
  if (tempoJogoContador == 30) {
    tempoJogo++;
    tempoJogoContador = 0;
  }

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
    if (
      cobraIA.posicoes[0].posicaoCobraX > item.posicaoMacaX - tamanhoMaca / 2 &&
      cobraIA.posicoes[0].posicaoCobraX < item.posicaoMacaX + tamanhoMaca / 2 &&
      cobraIA.posicoes[0].posicaoCobraY > item.posicaoMacaY - tamanhoMaca / 2 &&
      cobraIA.posicoes[0].posicaoCobraY < item.posicaoMacaY + tamanhoMaca / 2
    ) {
      item.posicaoMacaX =
        Math.floor(Math.random() * (larguraCampo - tamanhoMaca + 1)) +
        tamanhoMaca;
      item.posicaoMacaY =
        Math.floor(Math.random() * (larguraCampo - tamanhoMaca + 1)) +
        tamanhoMaca;

      cobraIA.posicoes.push({
        posicaoCobraX:
          cobraIA.posicoes[cobraIA.posicoes.length - 1].posicaoCobraX -
          larguraCobra / 2,
        posicaoCobraY:
          cobraIA.posicoes[cobraIA.posicoes.length - 1].posicaoCobraY,
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
function gameOver(evento) {
  //direito, esquerdo, cima e baixo
  if (
    posicoes[0].posicaoCobraX - larguraCobra / 2 >= larguraCampo ||
    posicoes[0].posicaoCobraX + larguraCobra / 2 <= 0 ||
    posicoes[0].posicaoCobraY + alturaCobra / 2 <= 0 ||
    posicoes[0].posicaoCobraY - alturaCobra / 2 >= alturaCampo
  ) {
    posicoes[0].posicaoCobraX = 10;
    posicoes[0].posicaoCobraY = 10;
    letra = "";

    velocidade = 1;
    localStorage.setItem("pontuacao", posicoes.length - 1);
    localStorage.setItem("tempo", tempoJogo);
    posicoes.splice(1);
    window.location.href = "../paginasExtras/gameOver/gameover.html";
  }
  if (evento) {
    posicoes[0].posicaoCobraX = 10;
    posicoes[0].posicaoCobraY = 10;
    letra = "";

    velocidade = 1;
    localStorage.setItem("pontuacao", posicoes.length - 1);
    localStorage.setItem("tempo", tempoJogo);
    posicoes.splice(1);
    window.location.href = "../paginasExtras/gameOver/gameover.html";
  }
}
function pontuacao() {
  areaDesenho.fillStyle = "#000000";

  areaDesenho.fillText("Pontuação: " + (posicoes.length - 1), 425, 15);
}
function probabilidade(objeto) {
  //se chegar a 30, passou-se 1 segundo

  objeto.contador++;

  if (objeto.contador == 30) {
    //testa a probabilidade

    objeto.contador = 0;

    if (Math.random() <= objeto.chance) {
      return true;
    } else {
      return false;
    }
  }
}
function umEventoSo() {
  eventos.forEach((item) => (item.ativo = false));
}
function reativarEventos(objeto) {
  eventos.forEach((item) => (item.ativo = true));
}
