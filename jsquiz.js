(function() {
  var questions = [{
    question: "¿Que instrumento se usa para verificar la temperatura?",
    choices: ["Contador Geiger", "Termómetro", "Barómetro", "Contador Gilberto"],
    correctAnswer: 1
  }, {
    question: "¿Cual es el nombre para el medico de los tainos?",
    choices: ["Cacique", "Cajaya", "Bohiti", "Bohio", "Bojike"],
    correctAnswer: 4
  }, {
    question: "¿Cual huracán tuvo mas muertes?",
    choices: ["George", "San Felipe II", "San Ciprián", "Santa Clara", "Hugo"],
    correctAnswer: 1
  }, {
    question: "¿En que año llego el Huracán Hugo?",
    choices: ["1998", "1989", "1987", "1996", "1988"],
    correctAnswer: 1
  }, {
    question: "¿En que año llego el Huracán George?",
    choices: ["1996", "1931", "1988", "1997", "1998"],
    correctAnswer: 4
  }];
  
  var times = 0;
  var total;
  var random = getRandomInt(0, questions.length - 1);
  var questionsDone = [];
  var questionCounter = 0; //Tracks question number
  var badAnswers = 0;
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  findNext();
  //fillArray();
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
      if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[random])) { //fix this error
      $('#container').effect("shake");
    }
    else if (selections[random] !== questions[random].correctAnswer){
      
      //alert('Incorrecto. ¡Inténtalo de nuevo!')
      badAnswers++;
      $('input[name="answer"]:checked').attr('disabled', true);
      $('#container').effect("shake");
      
     }
    
    else {
      times++;
      questionCounter++;
      if(times != questions.length)findNext();
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  /*$('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });*/
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    questionsDone = [];
    displayNext();
    total = 0;
    badAnswers = 0;
    times = 0;
    findNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Pregunta ' + (times + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  /*function fillArray(){
    
    for(var k = 0; k < questions.length; k++){
      
        questionsDone[k] = 0;
      
    }
    
  }*/
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    
    var radioList = $('<ul>');
    var item;
    var input = '';
    
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[random] = +$('input[name="answer"]:checked').val();
  }
  
  function getRandomInt(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
  }
  
  function findNext() {
    
     while(true){
      
      var check = questionsDone[random];
      
      if(!(check == 1)){
        
        questionsDone[random] = 1;
        return random = random;
        
      }
      else {
        
        random = getRandomInt(0, questions.length - 1); 
        
      }
    }
  }
  
  // Displays next requested element
  function displayNext() {
    
    quiz.fadeOut(function() {
      
      $('#question').remove();
      
      if(questionCounter < questions.length){
        
        var nextQuestion = createQuestionElement(random);
        quiz.append(nextQuestion).fadeIn();
        
        if (!(isNaN(selections[random]))) {
          $('input[value='+selections[random]+']').prop('checked', true);
        }
        
        if(questionCounter === 0){
          $('#next').show();
        }
        
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    total = questionCounter;
    
    total = total - badAnswers;
    
    score.append('¡Tuvistes ' + total + ' puntos de ' +
                 questions.length + '!');
    score.append('<p>' + '¡Cada contestacion incorrecta es -1!' + '</p>');
    
    return score;
    
  }
})();