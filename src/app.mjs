import { quizData } from '../data.js';

const question = document.querySelector('.question');
const btnBox = document.querySelector('.btnBox');
const newQuestion = document.querySelector('.newQuestion');
const scoreDisplay = document.querySelector('.score');

let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

newQuestion.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    updateQuestion();
  } else {
    console.log('End of quiz');
    calculateScore();
    newQuestion.style = 'background-color:white;color:black;font-weight:300';
    newQuestion.textContent = 'Restart Quiz';
    newQuestion.addEventListener('click', restartQuiz);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  updateQuestion();
});

function updateQuestion() {
  question.style =
    'question text-violet-600 text-4xl text-start font-bold px-16 py-10 max-sm:text-2xl max-sm:px-10';
  question.textContent = `${quizData[currentQuestionIndex].question}`;

  let html = '';
  quizData[currentQuestionIndex].answers.forEach((answer) => {
    const { content, isCorrect } = answer;
    html += `
      <div class="btn answer cursor-pointer hover:bg-slate-100 hover:w-[92%] border-2 border-slate-300 my-2 py-3 pl-3 w-[90%] rounded-md text-2xl max-sm:text-lg" data_id="${isCorrect}">
        ${content}
      </div>
    `;
  });

  btnBox.innerHTML = html;

  // Add event listeners to the answer buttons
  const answerButtons = document.querySelectorAll('.answer');
  answerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isCorrect = button.getAttribute('data_id') === 'true';
      userAnswers.push({ questionIndex: currentQuestionIndex, isCorrect });
      console.log(`Clicked on ${isCorrect ? 'correct' : 'incorrect'} answer`);
    });
  });
}

function calculateScore() {
  score = userAnswers.filter((answer) => answer.isCorrect).length;
  console.log(`You got ${score} out of ${quizData.length} questions correct.`);
  question.style = 'color:black; text-align:center';
  question.textContent = `Your final score:`;
  scoreDisplay.style = 'font-size:3rem';
  scoreDisplay.innerHTML = `<h1 class="font-bold"> ${score} / <span class="text-5xl text-violet-600">${quizData.length}</span></h1>`;
  newQuestion.style = 'background-color:white;color:black; ';
  newQuestion.textContent = 'restart Quiz';
}

function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  score = 0;
  updateQuestion();
  newQuestion.style = ''; // Reset button styles if needed
  newQuestion.textContent = 'Next Question';
  newQuestion.removeEventListener('click', restartQuiz);
}
