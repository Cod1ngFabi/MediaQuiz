// Score needed for the final evaluation
let score = {
    right: 0,
    false: 0
}



// index for displaying the right question in the array
let countQuestion = 0;

let begin = true;

let tempArrayForAnswers = [];


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
        a: 'Turn you into a stone-cold killer',
        b: 'Kill you obviously',
        c: 'Gives you a super power',
        d: 'Show you how you are going to die',
        answer: 'd'
    }

]


$(document).ready(function() {
 $('#startQuiz').click(function(){
     // add question text and answer choices
    displayQuestion();
    displayChoices();
    countQuestion++;

     $('#startQuiz').hide(1500);
     $('#next').show(1500);    
 });
});



$(document).ready(function() {
    $("#next").click(function() {
        
        if(countQuestion === 10)
        {
            $('#next').attr("disabled","disabled");
            return;
        }


        /*
        if(begin === true){

        }
        */

        displayQuestion();
        let choicesArray = displayChoices();
        checkCklickedAnswer(choicesArray);

        console.log("right: " + score.right + " false: " + score.false);

        $('.form-check-input').each(function() {
            $(this).prop("checked", false);
        });

        countQuestion++;
    });
});



function displayQuestion() {
    $('#numberOfQuestions').text(countQuestion + 1 + ". ");
    $('#questionToAnswer').text(questions[countQuestion].question);
}



function displayChoices() {
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

    if(begin === true){
    tempArrayForAnswers = [...answerArray];
    console.log(tempArrayForAnswers);
    return;
    }
    
    //return answerArray;
}



function checkCklickedAnswer(answerArrayToLookFor) {

    $('.form-check-input').each(function(i) {
        console.log("Answer: " + answerArrayToLookFor[i].toWrite + " is: " + answerArrayToLookFor[i].isTrueAnswer);
        console.log($(this).is(':checked') + " :" + answerArrayToLookFor[i].isTrueAnswer);

        if ($(this).is(':checked') && answerArrayToLookFor[i].isTrueAnswer) {
            alert("True answer !!!");
            score.right++;
            return;
        }
    });
}



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}