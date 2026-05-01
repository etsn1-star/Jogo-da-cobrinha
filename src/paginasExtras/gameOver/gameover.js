const clicou = document.getElementById("botaoId");
const textoPonto = document.getElementById("pontos");
const textoTempo = document.getElementById("tempo");

textoPonto.innerText += " " + localStorage.getItem("pontuacao");
textoTempo.innerText += " " + localStorage.getItem("tempo") + "s";

clicou.addEventListener("click", () => {
  window.location.href = "../inicio/index.html";
});
