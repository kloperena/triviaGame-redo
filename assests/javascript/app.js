$(document).ready(function () {
    var options = [
        {
            question: "Which pets are students NOT allowed to have in Hogwarts?", 
            choice: ["Toad", "Cat", "Dog", "Owl"],
            answer: 2,
            //photo:"assests/img/pets hp.png"
         },
         {
             question: "What is the Spell used to unlock doors?", 
            choice: ["Lumos", "Avada Kedavra", "Wingardium Leviosa", "Alohomora"],
            answer: 3,
           // photo:"assests/img/Alohomora.jpg"
           
         }, 
         {
             question: "What is Hermione's patronus?", 
            choice: ["Dragon", "Bunny", "Otter", "Deer" ],
            answer: 2,
           // photo:"assests/img/Hermione's patronus"
            
        }, 
        {
            question: "What is Professor McGonagall's first name?", 
            choice: ["Minerva", "Lucy", "Wendy", "Luna" ],
            answer: 0,
            //photo:"assests/img/Professor McGonagall.jpg"
           
        }, 
        {
            question: "Which is NOT a Deathly Hallows?", 
            choice: ["Elder Wand", "Sword of Gryffindor", "Invisibility Cloak", "Resurrection Stone" ],
            answer: 1,
            //photo: "assests/img/Deathly Hallows.png"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    var audio = new Audio("assests/audio/Harry Potter Theme Song.mp3");
    
    
    
    $("#reset").hide();
    $("#start").on("click", function () {
        audio.play();
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
   
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    function displayQuestion() {
      
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
  
    }
    
    
    $(".answerchoice").on("click", function () {
     
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })