

// Timer duration in seconds
const timerDuration = 1 * 60; // 10 minutes in seconds

//Timer element
const timerElement = document.getElementById('timer');

// ToiInitialize the timer display
updateTimerDisplay(timerDuration);

// Function to update the timer display
function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);

    const seconds = timeInSeconds % 60;
    //To display the time in proper format
    timerElement.textContent = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;


    // Changeing color to red if less than 10 seconds
    if (timeInSeconds < 11) {
        timerElement.style.color = 'red';
    } else {
        timerElement.style.color = ''; // Reset to default color
    }
}

//Countdown
let timeLeft = timerDuration;
const countdownInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {

        showResult();
    } else {
        updateTimerDisplay(timeLeft);
    }
}, 1000);

//Question in array form
let quizQuestions = [
    {
        "question": "Q1. What is the capital of Japan?",
        "options": ["Beijing", "Tokyo", "Seoul", "Bangkok"],
        "answer": "Tokyo"
    },
    {
        "question": "Q2. Which planet is known as the 'Red Planet'?",
        "options": ["Mars", "Jupiter", "Saturn", "Neptune"],
        "answer": "Mars"
    },
    {
        "question": "Q3. Who painted the Mona Lisa?",
        "options": ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        "answer": "Leonardo da Vinci"
    },
    {
        "question": "Q4. What is the chemical symbol for gold?",
        "options": ["Au", "Ag", "Fe", "Hg"],
        "answer": "Au"
    },
    {
        "question": "Q5. Who is known as the 'Father of Computers'?",
        "options": ["Alan Turing", "Charles Babbage", "Ada Lovelace", "Bill Gates"],
        "answer": "Charles Babbage"
    }
]



// To track of the current question index
let currentIndex = 0;
let answeredQuestions = new Array(quizQuestions.length).fill(undefined); // To Keep track of answered questions
let score = 0; // Initial Score=0

// Function to load the current question
function loadQuestion() {

    let questionDiv = document.getElementById("question");
    let optionsDiv = document.getElementById("options");

    // Displaying the current question
    questionDiv.textContent = quizQuestions[currentIndex].question;
    optionsDiv.innerHTML = ""; // Clearing options before adding new ones

    // Shuffleing the options 
    let shuffledOptions = shuffleArray(quizQuestions[currentIndex].options);

    // Looping through the options
    for (let i = 0; i < shuffledOptions.length; i++) {
        // Created a label for the option
        let optionLabel = document.createElement("label");
        optionLabel.textContent = shuffledOptions[i];

        // Created a radio button for the option
        let radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "option";
        radioButton.value = i;

        // Checking if the radio button was previously selected
        if (answeredQuestions[currentIndex] !== undefined && answeredQuestions[currentIndex] == i) {
            radioButton.checked = true;
        }

        optionsDiv.appendChild(radioButton);
        optionsDiv.appendChild(optionLabel);
        optionsDiv.appendChild(document.createElement("br")); // Add a line break
    }
    // previous btn diable for furst question
    if (currentIndex > 0) {
        document.getElementById('previous').disabled = false;
    } else {
        document.getElementById('previous').disabled = true;
    }
}

// Function to move to the next question
function nextQuestion() {
    let selectedOption = document.querySelector('input[name="option"]:checked');

    // Storeing the selected option in the answeredQuestions array
    if (selectedOption !== null) {
        answeredQuestions[currentIndex] = parseInt(selectedOption.value);
    }

    currentIndex++;

    // Checking if there are more questions
    if (currentIndex < quizQuestions.length) {
        // If it's the last question, changing the button text to "Submit"
        if (currentIndex == quizQuestions.length - 1) {
            let s = document.getElementById("next");
            s.innerText = "Submit";
            s.style.backgroundColor = "rgb(13, 110, 253)";
        }

        loadQuestion(); // Loading the next question
    } else {
        showSubmitPopup(); // If no more questions, showing the result
    }
}

// Function to move to the previous question
function previousQuestion() {
    // Moveing if their is previous question if available
    if (currentIndex > 0) {
        currentIndex--;
        loadQuestion(); // Loading the previous question
    }
}

// Function to show the quiz result
function showResult() {
    hideSubmitPopup()
    clearInterval(countdownInterval); // to stop the timer
    timerElement.textContent = "00:00"; // To reset timer display
    document.getElementById("quiz").style.display = "none"; // To hide the quiz
    document.getElementById("result").style.display = "block"; // To show the result

    // Evaluating answers and calculating the score
    for (let i = 0; i < quizQuestions.length; i++) {
        // Comparing the selected option with the correct answer
        if (answeredQuestions[i] !== undefined && quizQuestions[i].options[answeredQuestions[i]] === quizQuestions[i].answer) {
            score++;
        }
    }

    // Displaying the score
    document.getElementById("score").textContent = "Score: " + score + "/" + quizQuestions.length;
}

loadQuestion();

// Function to shuffle an array 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swaping elements randomly
    }
    return array; // Returning the shuffled array
}


//popup when clicked on submit btn
function showSubmitPopup() {
    document.getElementById('submitPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

//pop will hide when clicked on no option
function hideSubmitPopup() {
    document.getElementById('submitPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
