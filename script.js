// Elementos
const audio = document.getElementById("audio");
const carrossel = document.querySelector(".carrossel");
const imagens = document.querySelectorAll(".carrossel img");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const tempoAtual = document.getElementById("tempo-atual");
const duracaoTotal = document.getElementById("duracao-total");

let interacaoUsuario = false; // Para garantir que o autoplay só acontece uma vez

// Alternar entre Play e Pause
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️"; // Ícone de Pause
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶"; // Ícone de Play
  }
}

// Atualiza a barra de progresso conforme a música toca
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const progresso = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progresso;
    tempoAtual.textContent = formatarTempo(audio.currentTime);
  }
});

// Atualiza a duração total da música ao carregar
audio.addEventListener("loadedmetadata", () => {
  duracaoTotal.textContent = formatarTempo(audio.duration);
});

// Permite clicar na barra para mudar o tempo da música
progressBar.addEventListener("input", (e) => {
  const novaPosicao = (e.target.value / 100) * audio.duration;
  audio.currentTime = novaPosicao;
});

// Formatar o tempo para exibir em minutos e segundos
function formatarTempo(tempo) {
  const minutos = Math.floor(tempo / 60);
  const segundos = Math.floor(tempo % 60).toString().padStart(2, "0");
  return `${minutos}:${segundos}`;
}

// Adiciona evento ao botão de play/pause
playPauseBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Impede que o clique no botão dispare outro evento no document
  togglePlayPause();
});

// Tocar música na primeira interação do usuário
function tocarMusica() {
  if (!interacaoUsuario) {
    audio.play().catch(error => {
      console.log("Autoplay bloqueado, esperando interação do usuário.");
    });
    interacaoUsuario = true; // Agora, o autoplay não será mais forçado
    document.removeEventListener("click", tocarMusica);
    document.removeEventListener("touchstart", tocarMusica);
  }
}

document.addEventListener("click", tocarMusica);
document.addEventListener("touchstart", tocarMusica);

window.onload = function () {
  if (localStorage.getItem("musica_autoplay") === "true") {
    tocarMusica();
    localStorage.removeItem("musica_autoplay");
  }
  criarCoracoes();
};

// Função para rolar automaticamente o carrossel
let index = 0;
function autoScroll() {
  index++;
  if (index >= imagens.length) {
    index = 0;
  }
  carrossel.style.transform = `translateX(-${index * 100}%)`;
}
setInterval(autoScroll, 3000);

// Criar efeito de corações flutuando
function criarCoracoes() {
  const container = document.createElement("div");
  container.classList.add("coracao-container");
  document.body.appendChild(container);

  for (let i = 0; i < 30; i++) {
    const coracao = document.createElement("div");
    coracao.classList.add("coracao");
    coracao.innerHTML = "❤️";
    coracao.style.left = `${Math.random() * 100}vw`;
    coracao.style.animationDuration = `${2 + Math.random() * 3}s`;
    container.appendChild(coracao);
  }

  setTimeout(() => {
    container.remove();
  }, 10000);
}

// Timer do relacionamento
const dataInicio = new Date("2023-01-13");

function atualizarTimer() {
  const agora = new Date();
  let anos = agora.getFullYear() - dataInicio.getFullYear();
  let meses = agora.getMonth() - dataInicio.getMonth();
  let dias = agora.getDate() - dataInicio.getDate();

  if (meses < 0 || (meses === 0 && dias < 0)) {
    anos--;
    meses += 12;
  }
  if (dias < 0) {
    const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias += ultimoMes.getDate();
    meses--;
  }

  const diferencaRestante = agora - new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const horas = Math.floor(diferencaRestante / (1000 * 60 * 60));
  const minutos = Math.floor((diferencaRestante / (1000 * 60)) % 60);
  const segundos = Math.floor((diferencaRestante / 1000) % 60);

  document.getElementById("timer").innerHTML = `
    ${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos
  `;
}
setInterval(atualizarTimer, 1000);
atualizarTimer();
