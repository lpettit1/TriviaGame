$(document).ready(function () {

    var questionsObject = {
        "1": {
            q: "What was the nam of Scooby-Doo's original TV series?",
            possibleAnswers:["A pup names Scooby-Doo", "Mystery Incorporated", "The Scooby-Doo show", "Scooby-doo, where are you!"],
            answers:"Scooby-doo, where are you!",
            imageLocation:"assets/images/img1.jpg"
        },

        "2": {
            q: "what kind of dog is Scooby-Doo?",
            possibleAnswers:["Irish Wolfhound", "Labrador Retriever", "Newfoundland", "Great Dane"],
            answers:"Great Dane",
            imageLocation:"assets/images/img2.jpg"
        },

        "3": {
            q: "Scooby got his name from which Frank Sinatra song?",
            possibleAnswers:["I get a kick out of you", "Strangers in the night", "My funny Valentine", "The lady is a tramp"],
            answers:"Strangers in the night",
            imageLocation:"assets/images/img3.jpg"
        },

        "4": {
            q: "Which celebrity guests made the most appearances on The New Scooby-Doo Movies television series?",
            possibleAnswers:["Laurel & Hardy", "Batman & Robin", "The Harlem Globetrotters", "The three stooges"],
            answers:"The Harlem Globetrotters",
            imageLocation:"assets/images/img4.png"
        },

        "5": {
            q: "What was the first episode in which Velma lost her glasses?",
            possibleAnswers:["Hassle in the castle", "Decoy for a dognapper", "Which witch is which?", "What a night for a knight"],
            answers:"What a night for a knight",
            imageLocation:"assets/images/img5.jpg"
        },

        "6": {
            q: "What's wrong with the money Scooby inherits in 'A Night of Fright is No Delight'?",
            possibleAnswers:["It belongs to the bank", "It's at the bottom of the ocean", "It's counterfeit", "It's confederate"],
            answers:"It's confederate",
            imageLocation:"assets/images/img6.png"
        },

        "7": {
            q: "Which Scooby villain was supposed to help run Funland before he turned evil?",
            possibleAnswers:["Black knight", "ghost clown", "Charlie the robot", "Puppet master"],
            answers:"Charlie the robot",
            imageLocation:"assets/images/img7.jpg"
        },

        "8": {
            q: "What color is Daphne's dress?",
            possibleAnswers:["Orange", "Pink", "Green", "Purple"],
            answers:"Purple",
            imageLocation:"assets/images/img8.jpg"
        },

        "9": {
            q: "In 'Bedlam in the Bigtop', what does Daphne do when she's hypnotized by the Ghost Clown?",
            possibleAnswers:["Performs a trapeze act", "Rides a unicycle", "Walks the high wire", "Tames Lions"],
            answers:"Rides a unicycle",
            imageLocation:"assets/images/img9.jpg"
        },

        "10": {
            q: "In Who's Afraid of the Big Bad Werewolf, what does the werewolf do when Shaggy and Scooby escape into the river in a barrel?",
            possibleAnswers:["Throws boulders at them", "Chases them in a canoe", "Catches the barrel with a fishing rod", "Turns into a bat"],
            answers:"Chases them in a canoe",
            imageLocation:"assets/images/img10.jpg"
        }

    };
   
    //variables for the game
    var correct = 0;
    var incorrect = 0;
    var ngAnswers = 0;
    var timeReset = 10;
    var timeLeft = 10;
    var intervalId;
    var qCounter = 1;
    var cAnswer = "";
    var qImg = "";
    var clickedAnswer = ""

    // functions for the tasks

    // game load
    function gameLoad() {
        var startButton = $("<h1>");
        startButton.addClass("startButton");
        startButton.text("start");
        $("#answers").append(startButton);
        $(".startButton").on("click", function () {
            emptyText();
            displayQuestion(qCounter);
        })
    }

    //clear screen
    function emptyText() {
        $("#answers").empty();
        $(".questions").empty();

    }

    function correctGuess(){
        correct++;
        stop();
        timeLeft = timeReset;
        $("#timeLeft").html(timeLeft);
        emptyText();
        $(".questions").text("Correct!!");
        var imgDisplay = $("<img>");
        imgDisplay.attr("src", qImg);
        $("#answers").append(imgDisplay);

    }

    function incorrectGuess() {
        incorrect++
        stop();
        timeLeft = timeReset;
        $("#timeLeft").html(timeLeft);
        emptyText();
        $(".question").text("Incorrect!!");
        $("#answers").html("<h2>Correct answer was: " + cAnswer + "</h2>");
        var imgDisplay = $("<img>");
        imgDisplay.attr("src", qImg);
        $("#answers").append(imgDisplay);

    }

    function timerUp() {
        ngAnswers++
        timeLeft = timeReset;
        $("#timeLeft").html(timeLeft);
        $("#answers").empty();
        $(".question").empty();
        qCounter++;
        setTimeout(function () {
            displayQuestion(qCounter);
        }, 3000);

        $(".question").text("Times Up!!");
        $("#answers").html("<h2>Correct answer was: " + cAnswer + "</h2>");
        var imgDisplay = $("<img>");
        imgDisplay.attr("src", qImg);
        $("#answers").append(imgDisplay);

    }
    
    // function end the game

    function gameOver() {
        $(".question").text("Game Over");
        $("#answers").append("<P> Correctly Guessed: " + correct + "</P>");
        $("#answers").append("<P> Incorrectlty Guessed: " + incorrect + "</p>");
        $("#answers").append("<P> Unanswered Questions: " + ngAnswers + "</P>");

        var startButton = $("<h1>");
        startButton.addClass("startButton");
        startButton.text("start");
        $("#answers").append(startButton);
        $(".startButton").on("click", function () {
            $("#answers").empty();
            correct = 0;
            incorrect = 0;
            qCounter = 1;
            ngAnswers = 0;
            displayQuestion(qCounter);
        });

    };


    //functions for object, questions & answers pull up date screen

    function displayQuestion(x) {
        emptyText();
        if (qCounter === 11) {
            gameOver()

        } else {
            var currentQuestion = questionsObject[x].q;

            var answers = questionsObject[x].possibleAnswers;

            cAnswer = questionsObject[x].answers;
            qImg = questionsObject[x].imageLocation;

            for (i = 0; i < answers.length; i++) {
                var answerDiv = $("<div>");
                var h1 = $("<h1>");
                h1.addClass("answer-generated");
                h1.attr("data-value", answers[i]);
                h1.text(answers[i]);

                answerDiv.append(h1);

                $("#answers").append(answerDiv);
            }

            $(".questions").text(currentQuestion);
            countDownTime();

            $(".answer-generated").on("click", function () {
                
                var answerClicked = $(this).attr("data-value");
                if (answerClicked === cAnswer) {
                    qCounter++;
                    correctGuess();
                    setTimeout(function () {
                        displayQuestion(qCounter)
                    }, 3000);

                } else {
                    qCounter++;
                    incorrectGuess();
                    setTimeout(function () {
                        displayQuestion(qCounter)
                    }, 3000);
                }
            })

        }
    }


    //timer for questions

    function countDownTime() {
        clearInterval(intervalId)
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        timeLeft--;
        $("#timeLeft").html(timeLeft)

        if (timeLeft === 0) {
            timerUp()

        }
    }

    function stop() {
        clearInterval(intervalId)
    }

    //starts game load

    gameLoad()

})

