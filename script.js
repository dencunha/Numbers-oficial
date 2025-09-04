const raffleMaker = document.querySelector(".raffle-maker")
const resultDiv = document.getElementById("result")
const resultsContainer = document.querySelector(".results")
const drawButton = document.querySelector(".btn-draw .draw")
const redoButton = document.querySelector("#result .btn-draw")

const inputQuantity = document.getElementById("quantity")
const inputStart = document.getElementById("start-number")
const inputEnd = document.getElementById("end-number")
const inputNoRepeat = document.getElementById("toggle")

function generateNumbers(qtd, start, end, allowRepeat) {
  let results = []

  while (results.length < qtd) {
    let number = Math.floor(Math.random() * (end - start + 1)) + start
    
    if (allowRepeat) {
      results.push(number)
    } else {
      if (results.indexOf(number) === -1) {
        results.push(number)
      }
    }
  }

  return results
}

drawButton.parentElement.onclick = function() {
  let qtd = Number(inputQuantity.value)
  let start = Number(inputStart.value)
  let end = Number(inputEnd.value)
  let allowRepeat = !inputNoRepeat.checked

  let numbers = generateNumbers(qtd, start, end, allowRepeat)

  raffleMaker.style.display = "none"
  resultDiv.style.display = "block"

  resultsContainer.innerHTML = ""

  // header aparece primeiro (já está no HTML)
  // depois de 1 segundo, começa a exibir números
  setTimeout(function() {
    showNumbersSequential(numbers, 0)
  }, 1000)
}

function showNumbersSequential(numbers, index) {
  if (index >= numbers.length) {
    // acabou, mostrar botão "sorteio novamente"
    redoButton.style.display = "block"
    return
  }

  let span = document.createElement("span")
  span.classList.add("number")

  let inner = document.createElement("span")
  inner.classList.add("draw-number")
  inner.textContent = numbers[index]

  span.appendChild(inner)
  resultsContainer.appendChild(span)

  // força a animação (dependendo do seu CSS pode precisar do truque do offsetWidth)
  span.style.animationPlayState = "running"
  inner.style.animationPlayState = "running"

  // esperar 3 segundos (duração da animação) e chamar o próximo
  setTimeout(function() {
    showNumbersSequential(numbers, index + 1)
  }, 3000)
}

redoButton.onclick = function() {
  resultDiv.style.display = "none"
  raffleMaker.style.display = "block"
  redoButton.style.display = "none"
}
