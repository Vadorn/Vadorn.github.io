
var items = [
  { name: "apple", source : "img/apple.jpg"},
  { name: "banana", source: "img/banana.png"},
  { name : "ball", source:"img/ball.png"},
  { name: "car", source:"img/car.jpg"},
  { name:"parrot", source:"img/parrot.jpg"}
];
document.getElementById("mal").style.visibility = "hidden";

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
var questItem = adding_imgs();


function answers() {
  var answer_name;
  if(questItem.Qty > 1){
    answer_name = digitNames[questItem.Qty - 1];
    answer_name += "  "
    answer_name += questItem.type.name + "s";

  }
  else{ answer_name = digitNames[0];
  answer_name += " ";
  answer_name += questItem.type.name;
}
  return answer_name;
}

var answersArray = answers();

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

var not_answers = fake_answers();

function ans_inDiv(){
  var ans_divs = document.getElementsByClassName('for_answers')
  console.log(ans_divs);
  var number = Math.floor(Math.random() * ans_divs.length);
  //answersArray.innerHTML = ans_divs[Math.floor(Math.random() * ans_divs.length)];
  ans_divs[number].innerHTML = answersArray;
  console.log(number);
  ans_divs[number].id = "correct";
  for( var i = 0,wrongAnsNum = 0; i < ans_divs.length; i++){
    if(ans_divs[i].id != "correct"){
      ans_divs[i].innerHTML = not_answers[wrongAnsNum];
      wrongAnsNum++;
    }
  }
  return ans_divs;
}

function time() { document.getElementById("mal").style.visibility = "hidden";}

function check_answer(el) {
  if (el.id == "correct") {
    document.getElementById("mal").style.visibility = "visible";
    setTimeout(time, 5000);
  } else {
    alert("gg")
  }
}

var answer_div = ans_inDiv();
