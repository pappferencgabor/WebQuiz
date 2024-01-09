const NUMBER_OF_QUESTIONS = 20;
const API_URL = `https://opentdb.com/api.php?amount=${NUMBER_OF_QUESTIONS}`

let questionWrapper = document.getElementById("questionWrapper");

let questionElements = []
let questionIndex = 0

fetch(API_URL)
.then(res => res.json())
.then(questions => {
    console.log(questions)

    questions.results.forEach((question, idx) => {
      questionElements.push(generateMeContent(question, idx+1))
    });

    loadQuestionElement(0)
})

function loadQuestionElement(idx) {
    questionWrapper.innerHTML = "";
    questionWrapper.appendChild(questionElements[idx]);
}

function generateMeContent(question, questionNumber) {
    let state = document.createElement("div");
    state.classList.add("state");
    state.innerHTML = `<strong>${questionNumber}</strong>/${NUMBER_OF_QUESTIONS}`;

    let questionEl = document.createElement("div");
    questionEl.classList.add("question-holder");
    questionEl.innerHTML = question.question;

    let answers = [question.correct_answer, ...question.incorrect_answers]
    answers.sort( () => .5 - Math.random() );

    let answersEl = document.createElement("div");
    answersEl.classList.add("answers");

    answers.forEach(answer => {
        let answerEl = document.createElement("div");
        answerEl.classList.add("answer");
        answerEl.innerHTML = answer;

        answerEl.addEventListener("click", e => {
            if (answer === question.correct_answer) {
                e.target.classList.add("success")
            }
            else {
                e.target.classList.add("fail")
            }
            setTimeout(() => {
                loadQuestionElement(questionNumber)
            }, 1000)
        })

        answersEl.appendChild(answerEl);
    })

    let questionHolder = document.createElement("div");

    questionHolder.appendChild(state)
    questionHolder.appendChild(questionEl)
    questionHolder.appendChild(answersEl)

    return questionHolder
}