  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAebWaCFf9Aebf8Z2FnZVd1f4HcGTwxJhE",
    authDomain: "quiz-app-7c7c7.firebaseapp.com",
    databaseURL: "https://quiz-app-7c7c7-default-rtdb.firebaseio.com",
    projectId: "quiz-app-7c7c7",
    storageBucket: "quiz-app-7c7c7.appspot.com",
    messagingSenderId: "61288035240",
    appId: "1:61288035240:web:f820e472709e54791a639d"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  var db = firebase.database();
  // console.log(db);



var question = [
    {
      question: "HTML Stands for",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "CSS Stands for",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which tag is used for most large heading",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      corrAnswer: "<h1>",
    },
    {
      question: "Which tag is used to make element unique ",
      option1: "id",
      option2: "class  ",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Any element assigned with id, can be get in css ",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "The external JavaScript file must contain the <script> tag.",
      option1: "True",
      option2: "False",
      option3: "None on the Above",
      corrAnswer: "False",
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      option1: "<scripting>",
      option2: "<script>",
      option3: "<js>",
      corrAnswer: "<script>",
    },
    {
      question: "In array we can use key name and value ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "toFixed() is used to define length of decimal ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "How can you open a link in a new browser window",
      option1: "_blank",
      option2: "Target",
      option3: "Open",
      corrAnswer: "_blank",
    },
  ];

 var ques = document.getElementById('ques');
 var option1 = document.getElementById('opt1');
 var option2 = document.getElementById('opt2');
 var option3 = document.getElementById('opt3');
 var btn = document.getElementById('btn');
 var timer = document.getElementById('timer');
 var index = 0;
 var score = 0;
 var min = 1;
 var sec = 59;
 var interval;

var interval = setInterval(function(){
    timer.innerHTML = `${min}:${sec}`;
    sec--;
    if(sec == 0){
        min--;
        sec = 59;
    }
    if(min <0){
        min = 1;
        sec = 59;
        nextQuestion();
    }
 },100)

function nextQuestion(){
    var getOptions = document.getElementsByName('option');

    for(var i=0 ; i < getOptions.length; i++){
        if(getOptions[i].checked){
            var selectedAns = getOptions[i].value;
            var selectedQues = question[index -1].question;
            var selectedOpt = question[index -1][`option${selectedAns}`];
            var correctAns = question[index-1]['corrAnswer'];
            var id = Date.now().toString(26);

            var obj = {
              Question:selectedQues,
              UserAns:selectedOpt,
              CorrectAns:correctAns,
            }
            firebase.database().ref(`Quiz Data/ ${id}`).set(obj)

            if(selectedOpt == correctAns){
                score++;
            }
        }
        getOptions[i].checked = false;
    }
    btn.disabled = true;

    if(index > question.length-1){
        Swal.fire({
            title: "Good job!",
            text:`Your percentage is ${((score / question.length) * 100).toFixed(2)}`,
            icon: "success"
          });
        var scoreObj = {
          quizScore: ((score / question.length) * 100).toFixed(2),
        }
        clearInterval(interval);
          firebase.database().ref('Result').push(scoreObj)
    }
    else{
        ques.innerText = question[index].question;
        opt1.innerText = question[index].option1;
        opt2.innerText = question[index].option2;
        opt3.innerText = question[index].option3;
        index++;
        min = 1;
        sec = 59;
    }
 }

 function target() {
    btn.disabled = false;
  }

  var button = document.getElementById('start')

  function start(){
    var stdName = document.getElementById("stdName");
    var id = Date.now().toString(26);
    
    window.location.href = "quiz/index.html"
    
    var stdobj= {
        stdName: stdName.value,
        key: id,
    }
    firebase.database().ref(`Student Name/ ${id}`).set(stdobj);

    stdName.value = "";
}