
// frases e respotas 
const verbSentences = {
  easy: [
      { sentence: "O gato __ no telhado.", correctVerb: "está", alternatives: ["está", "foi", "será"] },
      { sentence: "Eu __ um livro ontem.", correctVerb: "li", alternatives: ["li", "leria", "lê"] },
      { sentence: "Eles ___ futebol no parque.", correctVerb: "jogam", alternatives: ["jogam", "jogavam", "jogarão"] }
  ],
  medium: [
      { sentence: "Maria __ música todas as manhãs.", correctVerb: "ouve", alternatives: ["ouve", "ouvira", "ouvirá"] },
      { sentence: "Nós __ um bolo para a festa.", correctVerb: "fizemos", alternatives: ["fizemos", "fazíamos", "faríamos"] },
      { sentence: "Você ___ sua tarefa hoje?", correctVerb: "terminou", alternatives: ["terminou", "termina", "terminará"] }
  ],
  hard: [
      { sentence: "Ela __ a resposta certa.", correctVerb: "sabia", alternatives: ["sabia", "sabe", "saberá"] },
      { sentence: "Eles __ na chuva ontem à noite.", correctVerb: "correram", alternatives: ["correram", "corriam", "correrão"] },
      { sentence: "O vento ___ forte durante a tempestade.", correctVerb: "ficou", alternatives: ["ficou", "fica", "ficará"] }
  ]
};

let currentLevel = null;
let currentSentenceIndex = 0;

const verbSentenceElement = document.getElementById('verb-sentence');
const verbInputElement = document.getElementById('verb-input');
const checkButton = document.getElementById('check-button');
const resultElement = document.getElementById('result');
const alternativesList = document.getElementById('alternatives-list');
const levelButtons = document.querySelectorAll('.level-button');

// Função que colocar as frases do nivel escolhido 
function setLevel(level) {
  currentLevel = level;
  currentSentenceIndex = 0;
  const sentenceObject = verbSentences[currentLevel][currentSentenceIndex];
  verbSentenceElement.textContent = sentenceObject.sentence;
  verbInputElement.disabled = false;
  checkButton.disabled = false;
  resultElement.textContent = '';
  verbInputElement.value = '';
  setAlternatives(sentenceObject.alternatives);
}

function setAlternatives(alternatives) {
  alternativesList.innerHTML = '';
  alternatives.forEach((alternative, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${alternative}`;
      listItem.addEventListener('click', () => {
          verbInputElement.value = alternative;
          checkVerb();
      });
      alternativesList.appendChild(listItem);
  });
}

// Função que checa os verbos e define as frases de parabens ou de falha
function checkVerb() {
  const playerGuess = verbInputElement.value.trim().toLowerCase();
  const correctVerb = verbSentences[currentLevel][currentSentenceIndex].correctVerb;

  if (playerGuess === correctVerb) {
      resultElement.textContent = 'Correto! Próxima frase:';
      resultElement.style.color = 'green';
      currentSentenceIndex++;
      if (currentSentenceIndex < verbSentences[currentLevel].length) {
          const sentenceObject = verbSentences[currentLevel][currentSentenceIndex];
          verbSentenceElement.textContent = sentenceObject.sentence;
          verbInputElement.value = '';
          setAlternatives(sentenceObject.alternatives);
      } else {
          resultElement.textContent = 'Parabéns, você completou todas as frases!';
          verbInputElement.disabled = true;
          checkButton.disabled = true;
      }
  } else {
      resultElement.textContent = 'Incorreto. Tente novamente.';
      resultElement.style.color = 'red';
  }
}

levelButtons.forEach(button => {
  button.addEventListener('click', () => setLevel(button.dataset.level));
});

checkButton.addEventListener('click', checkVerb);

// Inicialize o jogo com o nível padrão (fácil)
// setLevel('easy');