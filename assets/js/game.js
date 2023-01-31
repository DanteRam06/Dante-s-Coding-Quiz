const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timeCount = document.querySelector('.time');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
 { 
    question:
    "Which of the following is not a JavaScript data type?",
    choice1: 'numbers',
    choice2: 'strings',
    choice3: 'arrays',
    choice4: 'booleans',
    answer: 3,
},
{ 
    question:
    "Which of the following is used to check for strict equality?",
    choice1: "==",
    choice2: "===",
    choice3: "!=",
    choice4: "||",
    answer: 2,
},
{ 
    question: 
    "What outputs a JavaScript message to the web console?",
    choice1: 'JavaScript()',
    choice2: '*/',
    choice3: 'Print()',
    choice4: 'console.log()',
    answer: 4,
},
{ 
    question: 
    "What is the data type used to return a true or false value?",
    choice1: 'Strings',
    choice2: 'Booleans',
    choice3: 'Arrays',
    choice4: 'Object',
    answer: 2,
}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

function startTimer(){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = timer;
        timer--;
    }
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

            return window.location.assign('/end.html')
    } 

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex= Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText= currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'
        
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)            
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
startTimer()