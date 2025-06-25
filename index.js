document.addEventListener("DOMContentLoaded", function () {
  let slideAtual = 0;
  const slides = document.getElementsByClassName("slide");
  const tempoTroca = 3000; // 3 segundos
  let intervalo;
  const indicadoresContainer = document.createElement("div");
  indicadoresContainer.className = "indicadores";
  document.querySelector(".carousel").appendChild(indicadoresContainer);

  // Criar as bolinhas
  const indicadores = Array.from(slides).map((_, i) => {
    const span = document.createElement("span");
    span.className = "indicador";
    span.addEventListener("click", () => {
      slideAtual = i;
      mostrarSlide(slideAtual);
      reiniciarAutoplay();
    });
    indicadoresContainer.appendChild(span);
    return span;
  });

  function mostrarSlide(n) {
    if (n >= slides.length) slideAtual = 0;
    if (n < 0) slideAtual = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      indicadores[i].classList.remove("ativo");
    }

    slides[slideAtual].style.display = "block";
    indicadores[slideAtual].classList.add("ativo");
  }

  function mudarSlide(direcao) {
    slideAtual += direcao;
    mostrarSlide(slideAtual);
    reiniciarAutoplay();
  }

  function autoplay() {
    slideAtual++;
    mostrarSlide(slideAtual);
  }

  function reiniciarAutoplay() {
    clearInterval(intervalo);
    intervalo = setInterval(autoplay, tempoTroca);
  }

  // Tornar função acessível no HTML
  window.mudarSlide = mudarSlide;

  // Iniciar carrossel
  mostrarSlide(slideAtual);
  intervalo = setInterval(autoplay, tempoTroca);
});
