const questions = [
    {
        question: "What command is used to initialize a new Git repository?",
        answers: ["git start", "git init", "git new", "git create"],
        correct: 1
    },
    {
        question: "What is the command to stage changes for the next commit?",
        answers: ["git commit", "git add", "git push", "git status"],
        correct: 1
    },
    {
        question: "How do you check the status of your Git repository?",
        answers: ["git log", "git status", "git diff", "git check"],
        correct: 1
    },
    {
        question: "Which command is used to create a new branch in Git?",
        answers: ["git branch new_branch", "git checkout new_branch", "git create new_branch", "git new-branch"],
        correct: 0
    },
    {
        question: "How do you switch to a newly created branch in Git?",
        answers: ["git switch new_branch", "git branch new_branch", "git checkout new_branch", "git change new_branch"],
        correct: 2
    },
    {
        question: "What command is used to merge branches in Git?",
        answers: ["git merge", "git combine", "git integrate", "git join"],
        correct: 0
    },
    {
        question: "How do you clone a repository from GitHub?",
        answers: ["git download <url>", "git copy <url>", "git clone <url>", "git fetch <url>"],
        correct: 2
    },
    {
        question: "What is the command to push commits to a remote repository?",
        answers: ["git upload", "git send", "git push", "git commit"],
        correct: 2
    },
    {
        question: "Which command is used to pull changes from a remote repository?",
        answers: ["git fetch", "git retrieve", "git pull", "git update"],
        correct: 2
    },
    {
        question: "How do you view the commit history in Git?",
        answers: ["git history", "git log", "git show", "git reflog"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');

function loadQuestion() {
    clearAnswers();
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-button');
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function clearAnswers() {
    answersContainer.innerHTML = '';
}

function selectAnswer(index) {
    userAnswers.push({ questionIndex: currentQuestionIndex, selectedAnswer: index });
    const correctIndex = questions[currentQuestionIndex].correct;
    if (index === correctIndex) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.style.display = 'none';
    answersContainer.style.display = 'none';
    nextButton.style.display = 'none';

    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `<p>You scored ${score} out of ${questions.length}</p>`;

    userAnswers.forEach(answer => {
        const question = questions[answer.questionIndex];
        const userAnswerText = question.answers[answer.selectedAnswer];
        const correctAnswerText = question.answers[question.correct];
        resultContainer.innerHTML += `
            <div class="result-question">
                <p><strong>Question:</strong> ${question.question}</p>
                <p><strong>Your Answer:</strong> ${userAnswerText}</p>
                <p><strong>Correct Answer:</strong> ${correctAnswerText}</p>
            </div>
        `;
    });
}

nextButton.addEventListener('click', loadQuestion);

// Initialize the quiz
loadQuestion();
