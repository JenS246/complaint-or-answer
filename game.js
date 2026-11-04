const QUESTIONS = [
  {
    prompt:
      "A driver starts a lawsuit by alleging that another driver ran a red light and caused a collision. Which pleading contains that allegation?",
    answer: "Complaint",
    explanation:
      "The plaintiff uses a complaint to state the material facts supporting the claim."
  },
  {
    prompt:
      "The driver who was sued admits that a collision occurred but denies running the red light. Which pleading contains that response?",
    answer: "Answer",
    explanation:
      "The defendant uses an answer to admit or deny the complaint's factual allegations."
  },
  {
    prompt:
      "A homeowner sues a contractor and asks the court to award the cost of repairing a leaking roof. Which pleading contains that request for relief?",
    answer: "Complaint",
    explanation:
      "The complaint states the plaintiff's claim and the relief requested from the court."
  },
  {
    prompt:
      "The contractor responds that the homeowner already signed a valid release covering the roof claim. In Pennsylvania, which pleading includes that defense under New Matter?",
    answer: "Answer",
    explanation:
      "A release is an affirmative defense pleaded in a responsive pleading under the heading New Matter."
  },
  {
    prompt:
      "An employee begins a lawsuit by alleging that an employer failed to pay wages required by their written agreement. Which pleading states the employee's claim?",
    answer: "Complaint",
    explanation:
      "The plaintiff begins the claim by stating its material facts in the complaint."
  },
  {
    prompt:
      "The employer responds to paragraph 8 by admitting the employee worked during the stated week but denying that any wages remain unpaid. Which pleading contains that paragraph-by-paragraph response?",
    answer: "Answer",
    explanation:
      "An answer responds to the complaint's averments and may admit part while denying the rest."
  },
  {
    prompt:
      "A tenant asks the court to order a landlord to return a security deposit and pay damages. Which pleading contains the tenant's demand?",
    answer: "Complaint",
    explanation:
      "The plaintiff's request for damages or other relief belongs in the complaint."
  },
  {
    prompt:
      "The landlord responds that the tenant's claim was filed after the applicable limitations period expired. In Pennsylvania, which pleading raises that defense as New Matter?",
    answer: "Answer",
    explanation:
      "The statute of limitations is an affirmative defense pleaded under New Matter in the answer."
  },
  {
    prompt:
      "A pedestrian starts a personal-injury lawsuit by alleging that a store left an icy entrance untreated and that the condition caused a fall. Which pleading contains those allegations?",
    answer: "Complaint",
    explanation:
      "The complaint sets out the plaintiff's material facts supporting the personal-injury claim."
  },
  {
    prompt:
      "The store responds that, after a reasonable investigation, it lacks enough knowledge to admit or deny the pedestrian's allegation about medical treatment. Which pleading contains that response?",
    answer: "Answer",
    explanation:
      "An answer may state that reasonable investigation left the defendant without enough information to form a belief. Under Pennsylvania practice, that statement has the effect of a denial."
  },
  {
    prompt:
      "A delivery company sues a customer, alleging that a written contract required payment of $4,200 and that the customer did not pay. Which pleading contains those allegations?",
    answer: "Complaint",
    explanation:
      "The plaintiff states the material facts supporting the contract claim in the complaint."
  },
  {
    prompt:
      "The customer responds that the $4,200 invoice was paid in full before the lawsuit began. In Pennsylvania, which pleading raises payment as New Matter?",
    answer: "Answer",
    explanation:
      "Payment is an affirmative defense pleaded under the heading New Matter in the answer."
  },
  {
    prompt:
      "A property owner begins a lawsuit by alleging that a neighbor's excavation damaged a retaining wall and caused $12,000 in repair costs. Which pleading contains the owner's allegations and claimed damage?",
    answer: "Complaint",
    explanation:
      "The complaint states the facts supporting the claim and identifies the relief the plaintiff seeks."
  },
  {
    prompt:
      "The neighbor responds to the property-damage complaint by admitting that excavation occurred but denying that it caused the wall to crack. Which pleading contains that response?",
    answer: "Answer",
    explanation:
      "The defendant uses an answer to admit one allegation and deny another."
  },
  {
    prompt:
      "A patient sues a clinic. The clinic responds that paragraph 12 correctly identifies the date of treatment, but it denies the paragraph's allegation that the treatment caused the injury. Which pleading contains the clinic's response?",
    answer: "Answer",
    explanation:
      "The answer must respond to the complaint's factual allegations and may admit part of a paragraph while denying the remainder."
  }
];

const TOTAL_QUESTIONS = QUESTIONS.length;

const ui = {
  introScreen: document.querySelector("#intro-screen"),
  playScreen: document.querySelector("#play-screen"),
  endScreen: document.querySelector("#end-screen"),
  reviewScreen: document.querySelector("#review-screen"),
  gameMeta: document.querySelector("#game-meta"),
  startButton: document.querySelector("#start-button"),
  scenarioCard: document.querySelector("#scenario-card"),
  scenarioText: document.querySelector("#scenario-text"),
  answers: [...document.querySelectorAll(".answer-button")],
  progress: document.querySelector("#progress"),
  progressMarks: document.querySelector("#progress-marks"),
  score: document.querySelector("#score"),
  feedback: document.querySelector("#feedback"),
  feedbackTitle: document.querySelector("#feedback-title"),
  feedbackText: document.querySelector("#feedback-text"),
  nextButton: document.querySelector("#next-button"),
  finalScore: document.querySelector("#final-score"),
  playAgainButton: document.querySelector("#play-again-button"),
  reviewButton: document.querySelector("#review-button"),
  backButton: document.querySelector("#back-button"),
  reviewTitle: document.querySelector("#review-title"),
  reviewList: document.querySelector("#review-list")
};

let deck = [];
let questionIndex = 0;
let score = 0;
let answered = false;

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function showScreen(name) {
  ui.introScreen.hidden = name !== "intro";
  ui.playScreen.hidden = name !== "play";
  ui.endScreen.hidden = name !== "end";
  ui.reviewScreen.hidden = name !== "review";
  ui.gameMeta.hidden = name !== "play";
}

function renderProgressMarks() {
  ui.progressMarks.replaceChildren();
  for (let index = 0; index < TOTAL_QUESTIONS; index += 1) {
    const mark = document.createElement("span");
    mark.className = "progress-mark";
    if (index < questionIndex) mark.classList.add("is-complete");
    if (index === questionIndex) mark.classList.add("is-current");
    ui.progressMarks.append(mark);
  }
}

function startGame() {
  deck = shuffled(QUESTIONS);
  questionIndex = 0;
  score = 0;
  showScreen("play");
  renderQuestion();
  ui.scenarioCard.focus();
}

function renderQuestion() {
  answered = false;
  const question = deck[questionIndex];
  ui.scenarioText.textContent = question.prompt;
  ui.progress.textContent = `${questionIndex + 1} / ${TOTAL_QUESTIONS}`;
  ui.score.textContent = `${score} right`;
  ui.feedback.hidden = true;
  ui.feedback.classList.remove("is-correct", "is-wrong");

  ui.answers.forEach((button) => {
    button.disabled = false;
    button.classList.remove("is-correct", "is-wrong");
  });

  renderProgressMarks();
}

function checkAnswer(choice) {
  if (answered) return;
  answered = true;

  const question = deck[questionIndex];
  const isCorrect = choice === question.answer;
  if (isCorrect) score += 1;

  ui.answers.forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === question.answer) button.classList.add("is-correct");
    if (button.dataset.answer === choice && !isCorrect) button.classList.add("is-wrong");
  });

  ui.score.textContent = `${score} right`;
  ui.feedback.classList.add(isCorrect ? "is-correct" : "is-wrong");
  ui.feedbackTitle.textContent = isCorrect
    ? "Correct!"
    : `Not quite. The correct answer is ${question.answer}.`;
  ui.feedbackText.textContent = question.explanation;
  ui.feedback.hidden = false;
  ui.nextButton.textContent = questionIndex === TOTAL_QUESTIONS - 1 ? "SEE SCORE" : "NEXT QUESTION";
  ui.nextButton.focus();
}

function nextQuestion() {
  if (!answered) return;
  questionIndex += 1;

  if (questionIndex < TOTAL_QUESTIONS) {
    renderQuestion();
    ui.scenarioCard.focus();
    return;
  }

  ui.finalScore.textContent = `${score} / ${TOTAL_QUESTIONS}`;
  showScreen("end");
  document.querySelector("#end-title").setAttribute("tabindex", "-1");
  document.querySelector("#end-title").focus();
}

function buildReview() {
  ui.reviewList.replaceChildren();

  QUESTIONS.forEach((question) => {
    const item = document.createElement("li");
    item.className = "review-item";

    const prompt = document.createElement("p");
    prompt.className = "review-question";
    prompt.textContent = question.prompt;

    const answer = document.createElement("p");
    answer.className = "review-answer";
    answer.textContent = `Correct answer: ${question.answer}`;

    const explanation = document.createElement("p");
    explanation.className = "review-explanation";
    explanation.textContent = question.explanation;

    item.append(prompt, answer, explanation);
    ui.reviewList.append(item);
  });
}

function showReview() {
  buildReview();
  showScreen("review");
  ui.reviewTitle.focus();
  window.scrollTo({ top: 0, behavior: "auto" });
}

ui.startButton.addEventListener("click", startGame);
ui.playAgainButton.addEventListener("click", startGame);
ui.reviewButton.addEventListener("click", showReview);
ui.backButton.addEventListener("click", () => {
  showScreen("end");
  ui.reviewButton.focus();
});
ui.nextButton.addEventListener("click", nextQuestion);

ui.answers.forEach((button) => {
  button.addEventListener("click", () => checkAnswer(button.dataset.answer));
});

document.addEventListener("keydown", (event) => {
  if (ui.playScreen.hidden || answered) return;
  if (event.key === "1") ui.answers[0].click();
  if (event.key === "2") ui.answers[1].click();
});

showScreen("intro");
