"use strict";

function showNextQuestion(nextQuestionClass, currentQuestionIndex) {
  let currentQuestion = document.querySelector(nextQuestionClass);
  if (currentQuestion)
    currentQuestion.style.display = "none";
  let nextQuestionIndex = currentQuestionIndex + 1;
  let nextQuestion = document.querySelector(`.q${nextQuestionIndex}`);
  if (nextQuestion) {
    nextQuestion.style.display = "block";
    checkButtonsVisibility(nextQuestionIndex);
  }
}

function showPrevQuestion(prevQuestionClass, currentQuestionIndex) {
  let currentQuestion = document.querySelector(prevQuestionClass);
  if (currentQuestion)
    currentQuestion.style.display = "none";
  let prevQuestionIndex = currentQuestionIndex - 1;
  let prevQuestion = document.querySelector(`.q${prevQuestionIndex}`);
  if (prevQuestion) {
    prevQuestion.style.display = "block";
    checkButtonsVisibility(prevQuestionIndex);
  }
}

function checkButtonsVisibility(currentQuestionIndex) {
  for (let i = 1; i <= 5; i++) {
    let question = document.querySelector(`.q${i}`);
    if (question)
      question.style.display = i === currentQuestionIndex ? "block" : "none";
    let nextButton = document.getElementById("submit" + i);
    let prevButton = document.getElementById("prev" + i);
    if (nextButton)
      nextButton.disabled = false;
    if (prevButton)
      prevButton.disabled = false;
  }
}

function redirectToNewPage(page) {
  // Get user answers
  const q1Answer = document.querySelector('input[name="question1"]:checked').value;
  const q2Answer = document.querySelector('input[name="question2"]:checked').value;
  const q3Answer = document.querySelector('input[name="question3"]:checked').value;
  const q4Answer = document.querySelector('input[name="question4"]:checked').value;
  const q5Answer = document.querySelector('input[name="question5"]:checked').value;
  
  // Redirect to weight-gain-results.html with answers as query parameters
  const answers = `?q1=${q1Answer}&q2=${q2Answer}&q3=${q3Answer}&q4=${q4Answer}&q5=${q5Answer}`;
  window.location.href = page + answers;
}