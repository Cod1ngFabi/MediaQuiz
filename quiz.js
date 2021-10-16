// Score needed for the final evaluation ------------------------
let score = {
    right: 0,
    false: 0,
    result: ["far fa-smile","far fa-meh","far fa-frown"]
}



const percentageToScore = {
    BAD: 30,
    GOOD: 70,
    GREAT:  100
}


// index for displaying the right question in the array ---------------------
let countQuestion = 0;

let begin = true;

let tempArrayForAnswers = [];

let progressBarPercentToAdd = $('.progress').width();
progressBarPercentToAdd = progressBarPercentToAdd * 0.10;



// Question Array which contains Objects of answers  ----------------------
let questions = [{
        question: 'What Lamborghini model does Bruce Wayne drive in the movie "Batman Begins" ?',
        a: 'Aventador',
        b: 'Huracan',
        c: 'Murcielago',
        d: 'Urus',
        answer: 'b'
    },
    {
        question: 'What does Morpheus tell Neo to follow in "The Matrix" ?',
        a: 'The white rabbit',
        b: 'The green frog',
        c: 'The brown cat',
        d: 'The orange butterfly',
        answer: 'a'
    },
    {
        question: 'Red runs the kitchen in the prison, which country is she from in the series "Orange is the new Black" ?',
        a: 'Norway',
        b: 'Russia',
        c: 'Spain',
        d: 'China',
        answer: 'b'
    },
    {
        question: 'When was the publishing year of "The Wolf of Wall Street" ?',
        a: '2011',
        b: '2015',
        c: '2017',
        d: '2013',
        answer: 'd'
    },
    {
        question: 'Which of these characters in the serie "Brookyn Nine-Nine" is not a detective ?',
        a: 'Jake',
        b: 'Amy',
        c: 'Gina',
        d: 'Terry',
        answer: 'c'
    },
    {
        question: 'Where is Eric from in the series from in the serie "Sex Education" ?',
        a: 'Nigeria',
        b: 'Tanzania',
        c: 'Kenya',
        d: 'Ethiopia',
        answer: 'a'
    },
    {
        question: 'What business do Walter and Skyler run in the later part in the serie "Breaking Bad" ?',
        a: 'Grocery Store',
        b: 'Gas station',
        c: 'Laundry',
        d: 'Car Wash',
        answer: 'd'
    },
    {
        question: 'What is Tara\'s surname in the serie "Sons of Anarchy" ?',
        a: 'Knowles',
        b: 'Nolan',
        c: 'Knabb',
        d: ' Knally',
        answer: 'a'
    },
    {
        question: 'The boys like to meet to play which game in the serie "Stranger Things" ?',
        a: 'Atari',
        b: 'Monopoly',
        c: 'Dungeons & Dragons',
        d: 'Uno',
        answer: 'c'
    },
    {
        question: 'What do death crystals do in the serie "Rick and Morty" ?',
        a: 'Turn you into a killer',
        b: 'Kill you obviously',
        c: 'Gives you a super power',
        d: 'Shows your death possiblities',
        answer: 'd'
    }

]



// Start Quiz Button ----------------------
$(document).ready(function() {
 $('#startQuiz').click(function(){
    displayQuestion();
    displayChoices();
    countQuestion++;

     $('#startQuiz').fadeOut(300);
     $('#next').delay(100).fadeIn(1600);    
 });
});



// Next Question Button ----------------------
$(document).ready(function() {
    $("#next").click(function() {

        if(!lookForCheckedRadioButton())
        {
            alert("No button selected!!");
            return;
        }
        
        if(countQuestion === (questions.length))
        {
            lastQuestion();
            return;
        }

        checkCklickedAnswer(tempArrayForAnswers);
        displayChoices();
        displayQuestion();

        progressBar();
        clearRadioButtons();

        countQuestion++;
    });
});



// Updates Question and displays them ----------------------
function displayQuestion() {
    $('#numberOfQuestions').text(countQuestion + 1 + ". ");
    $('#questionToAnswer').text(questions[countQuestion].question);
}



// Updates answer choices and displays them ----------------------
function displayChoices() {

    if(countQuestion === (questions.length))
    {
        return;
    }
    let answerArray = [];

    answerArray.push({
        toWrite: questions[countQuestion].a,
        answerLetter: questions[countQuestion].answer,
        isTrueAnswer: questions[countQuestion].answer === Object.keys(questions[countQuestion])[1]
    }, {
        toWrite: questions[countQuestion].b,
        answerLetter: questions[countQuestion].answer,
        isTrueAnswer: questions[countQuestion].answer === Object.keys(questions[countQuestion])[2]
    }, {
        toWrite: questions[countQuestion].c,
        answerLetter: questions[countQuestion].answer,
        isTrueAnswer: questions[countQuestion].answer === Object.keys(questions[countQuestion])[3]

    }, {
        toWrite: questions[countQuestion].d,
        answerLetter: questions[countQuestion].answer,
        isTrueAnswer: questions[countQuestion].answer === Object.keys(questions[countQuestion])[4]
    });
    answerArray = shuffleArray(answerArray);

    let length = answerArray.length;
    for (let i = 0; i < length; i++) {
        $('.form-check-label').each(function(i) {
            $(this).text(answerArray[i].toWrite);
        });
    }

    tempArrayForAnswers = [...answerArray];
}



// SCheckes clicked RadioButton for right answer----------------------
function checkCklickedAnswer(answerArrayToLookFor) {
    
    $('.form-check-input').each(function(i) {
        console.log("Answer: " + answerArrayToLookFor[i].toWrite + " is: " + answerArrayToLookFor[i].isTrueAnswer);
        //console.log("checked: " + $(this).is(':checked') + " :" + answerArrayToLookFor[i].isTrueAnswer);

        if ($(this).is(':checked') && answerArrayToLookFor[i].isTrueAnswer) {
            alert("True answer !!!, Question: " + countQuestion);
            score.right++;
            return;
        }
    });
}



// Shuffles the answers and returns them ----------------------
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}



function progressBar(){
    $('.progress-bar-striped').animate({"width": "+="+progressBarPercentToAdd+"px" })
}



function clearRadioButtons(){
    $('.form-check-input').each(function() {
        $(this).prop("checked", false);
    });
}



function evaluateScore(){
    let placeholderForResult = $('#emojiResult');
    let textPlaceholder = $('#textResult');
    
    $('#trueAnswers').text(score.right);
    $('#falseAnswers').text(score.false);

    let numberQuestions = questions.length;
    let resultPercentage = score.right * 100 / numberQuestions;
    console.log(resultPercentage);
    if(resultPercentage >= percentageToScore.GOOD)
    {
        textPlaceholder.text("Great Job! ");
        return;
    }
    if(resultPercentage < percentageToScore.GOOD)
    {
        textPlaceholder.text("Keep going! "); 
    }
    if(resultPercentage <= percentageToScore.BAD)
    {
        textPlaceholder.text("Watch more! ");
        return;
    }
}



function lookForCheckedRadioButton(){
    let oneChecked = false;
    $('.form-check-input').each(function() {
       if($(this).is(':checked'))
       {
            oneChecked = true;
       };
    });
    return oneChecked;
}



function lastQuestion(){
    $("#next").prop("disabled",true);
            checkCklickedAnswer(tempArrayForAnswers);
            progressBar();
            score.false = questions.length - score.right;
            evaluateScore();
}