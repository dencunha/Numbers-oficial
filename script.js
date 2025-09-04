// script.js
document.addEventListener("DOMContentLoaded", () => {
  const drawBtn = document.querySelector(".btn-draw .draw")?.closest("button");
  const raffleMaker = document.querySelector(".raffle-maker");
  const resultDiv = document.getElementById("result");
  const resultsContainer = resultDiv.querySelector(".results");
  const redoBtn = resultDiv.querySelector(".btn-draw .redo")?.closest("button");

  const quantityInput = document.getElementById("quantity");
  const startInput = document.getElementById("start-number");
  const endInput = document.getElementById("end-number");
  const noRepeatToggle = document.getElementById("toggle");

  // Função para gerar números aleatórios
  function generateNumbers(quantity, min, max, allowRepeats) {
    const numbers = [];
    while (numbers.length < quantity) {
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      if (allowRepeats || !numbers.includes(rand)) {
        numbers.push(rand);
      }
    }
    return numbers;
  }

  // Função para animar a exibição sequencial dos números
  async function showNumbersSequential(numbers) {
    resultsContainer.innerHTML = ""; // limpa resultados anteriores

    for (let i = 0; i < numbers.length; i++) {
      const wrapper = document.createElement("span");
      wrapper.classList.add("number");

      const span = document.createElement("span");
      span.classList.add("draw-number");
      span.textContent = numbers[i];

      wrapper.appendChild(span);
      resultsContainer.appendChild(wrapper);

      // força reflow para reiniciar animação
      void wrapper.offsetWidth;

      // adiciona classes para disparar as animações do CSS
      wrapper.style.animationPlayState = "running";
      span.style.animationPlayState = "running";

      // espera a animação terminar antes de exibir o próximo
      await new Promise(resolve =>
        setTimeout(resolve, 3000) // 0.6s scaleUp + 2.4s rotateFull
      );
    }

    // mostra o botão "sortear novamente" depois de todos os números
    redoBtn.style.display = "flex";
  }

  // Clique no botão "SORTEAR"
  drawBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const quantity = parseInt(quantityInput.value, 10) || 1;
    const min = parseInt(startInput.value, 10) || 1;
    const max = parseInt(endInput.value, 10) || 100;
    const allowRepeats = !noRepeatToggle.checked;

    const numbers = generateNumbers(quantity, min, max, allowRepeats);

    raffleMaker.style.display = "none";
    resultDiv.style.display = "block";

    // mostra header imediatamente
    resultDiv.querySelector("header").style.display = "flex";
    resultsContainer.innerHTML = "";
    redoBtn.style.display = "none";

    // 1 segundo depois, mostra os números
    setTimeout(() => {
      showNumbersSequential(numbers);
    }, 1000);
  });

  // Clique no botão "SORTEAR NOVAMENTE"
  redoBtn.addEventListener("click", () => {
    resultDiv.style.display = "none";
    raffleMaker.style.display = "block";
  });
});
