document.getElementById("winmal").style.visibility = "hidden";
document.getElementById("losemal").style.visibility = "hidden";

var winPosTop = document.getElementById("winmal").offsetTop;
var winPosLeft = document.getElementById("winmal").offsetLeft;
document.getElementById("losemal").offsetTop = winPosTop;
document.getElementById("losemal").offsetLeft = winPosLeft;

var items = [
  { name: "apple", source : "img/apple.jpg"},
  { name: "banana", source: "img/banana.png"},
  { name : "ball", source:"img/ball.png"},
  { name: "car", source:"img/car.jpg"},
  { name:"parrot", source:"img/parrot.jpg"}
];

var digitNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

function adding_imgs(){
  var i = 0;
  var min = 1;
  var max = 9;
  var cont = document.getElementById('cont');
  var imgQty = Math.floor(Math.random() * (max - min) + min);
  var item = items[Math.floor(Math.random() * items.length)];
  for (; i < imgQty; i++ ) {
     var new_img = document.createElement('img');
     new_img.src = item.source;
     new_img.classList.add("flex-item");
     cont.appendChild(new_img);
  }
  console.log(item);
  return {Qty : imgQty, type : item};
}

function answers(questItem) {
  var answer_name;
  if(questItem.Qty > 1) {
    answer_name = digitNames[questItem.Qty - 1];
    answer_name += "  "
    answer_name += questItem.type.name + "s";
  }
  else { answer_name = digitNames[0];
    answer_name += " ";
    answer_name += questItem.type.name;
  }
  return answer_name;
}

function fake_answers(){
  var inn_answers = [];
  var i = 0;
    inn_answers[i] = digitNames[Math.floor(Math.random() * digitNames.length)];
    inn_answers[i] += " ";
    inn_answers[i] += items[Math.floor(Math.random() * items.length)].name;
    i++
    inn_answers[i] = digitNames[Math.floor(Math.random() * digitNames.length)];
    inn_answers[i] += " ";
    inn_answers[i] += items[Math.floor(Math.random() * items.length)].name;
    return inn_answers;
  }

function ans_inDiv(correctAnswer, wrongAnswers) {
  var ans_divs = document.getElementsByClassName('for_answers');
  console.log(ans_divs);
  var number = Math.floor(Math.random() * ans_divs.length);
  //answersArray.innerHTML = ans_divs[Math.floor(Math.random() * ans_divs.length)];
  ans_divs[number].innerHTML = correctAnswer;
  console.log(number);
  ans_divs[number].id = "correct";
  for( var i = 0,wrongAnsNum = 0; i < ans_divs.length; i++){
    if(ans_divs[i].id != "correct"){
      ans_divs[i].innerHTML = wrongAnswers[wrongAnsNum];
      wrongAnsNum++;
    }
  }
  return ans_divs;
}

function time_win() {
  document.getElementById("winmal").style.visibility = "hidden";
  clearField();
  new_game();
}

function time_lose() {
  document.getElementById('losemal').style.visibility = "hidden";
  clearField();
  new_game();
}

function check_answer(el) {
  if (el.id == "correct") {
    document.getElementById("winmal").style.visibility = "visible";
    setTimeout(time_win, 2000);
  } else {
    document.getElementById('losemal').style.visibility = "visible";
    setTimeout(time_lose, 2000);
  }
}

function clearField() {
  document.getElementById('cont').innerHTML = "";
  var ans_divs = document.getElementsByClassName('for_answers');
  for( var i = 0; i < ans_divs.length; i++){
    ans_divs[i].innerHTML = "";
    if (ans_divs[i].id == "correct") {
      ans_divs[i].id = "";
    }
  }
}

function new_game() {
  var questItem = adding_imgs();
  var correctAnswer = answers(questItem);
  var wrongAnswers = fake_answers();
  var answer_div = ans_inDiv(correctAnswer, wrongAnswers);
}

new_game();
