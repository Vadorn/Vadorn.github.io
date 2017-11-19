var letter = "";
var words = ["APPLE", "CAR", "BALL", "DOG","EGG", "FISH", "GIRAFFE", "HORSE", "JUICE", "KEY", "LION", "NUTS", "OWL", "PARROT", "QUEEN", "RABBIT", "SUN", "UMBRELLA", "VASE", "WHALE", "ZEBRA", "YELLOW", "RED", "ORANGE", "PURPLE"]
var words_count = 8;
var words_ukr = ["ЯБЛУКО", "АВТОМОБІЛЬ", "М'ЯЧ'", "СОБАКА","ЯЙЦЕ", "РИБА", "ЖИРАФ", "КІНЬ", "СІК", "КЛЮЧ", "ЛЕВ", "ГОРІХИ", "СОВА", "ПАПУГА", "КОРОЛЕВА", "КРОЛИК", "СОНЦЕ", "ПАРАСОЛЬКА", "ВАЗА", "КИТ", "ЗЕБРА", "ЖОВТИЙ", "ЧЕРВОНИЙ", "ОРАНЖЕВИЙ", "ФЫОЛЕТОВИЙ"]
var rows = 8;
var columns = 8;
var addedWords = { english : [], ukrainian : [] };
document.getElementById("img").style.visibility = "hidden";

// The list of all the possible orientations
var allOrientations = ['horizontal','horizontalBack','vertical','verticalUp'];

// The definition of the orientation, calculates the next square given a
// starting square (x,y) and distance (i) from that square.
var orientations = {
  horizontal:     function(x,y,i) { return {x: x+i, y: y  }; },
  horizontalBack: function(x,y,i) { return {x: x-i, y: y  }; },
  vertical:       function(x,y,i) { return {x: x,   y: y+i}; },
  verticalUp:     function(x,y,i) { return {x: x,   y: y-i}; }
};
// Determines if an orientation is possible given the starting square (x,y),
// the height (h) and width (w) of the puzzle, and the length of the word (l).
// Returns true if the word will fit starting at the square provided using
// the specified orientation.
var checkOrientations = {
  horizontal:     function(x,y,h,w,l) { return w >= x + l; },
  horizontalBack: function(x,y,h,w,l) { return x + 1 >= l; },
  vertical:       function(x,y,h,w,l) { return h >= y + l; },
  verticalUp:     function(x,y,h,w,l) { return y + 1 >= l; }
};
// Determines the next possible valid square given the square (x,y) was ]
// invalid and a word lenght of (l).  This greatly reduces the number of
// squares that must be checked. Returning {x: x+1, y: y} will always work
// but will not be optimal.
var skipOrientations = {
  horizontal:     function(x,y,l) { return {x: 0,   y: y+1  }; },
  horizontalBack: function(x,y,l) { return {x: l-1, y: y    }; },
  vertical:       function(x,y,l) { return {x: 0,   y: y+100}; },
  verticalUp:     function(x,y,l) { return {x: 0,   y: l-1  }; }
};


function fillQuestWords(wordQty) {
  var wordsToReturn = [];
  var workWords = words;
  var workWords_ukr = words_ukr;
  var wordsToReturn_ukr = [];
  for (var i = 0; i < wordQty; i++) {
    var index_word = Math.floor(Math.random() * workWords.length);
    var wordToAdd = workWords[index_word];
    var wordToAdd_ukr = workWords_ukr[index_word];
    wordsToReturn.push(wordToAdd);
    wordsToReturn_ukr.push(wordToAdd_ukr);
    workWords_ukr = workWords_ukr.filter(function(word){
      return (word != wordToAdd_ukr);
    });
    workWords = workWords.filter(function(word) {
      return (word != wordToAdd);
    });
  }
  return { english : wordsToReturn, ukrainian : wordsToReturn_ukr };
}


function checkLetter() {
  var compWord = addedWords.english.filter(function(word) {
    return (word.indexOf(letter) == 0);
  });
  if (compWord.length == 0) {
    return {result:false, final:false};
  }
  if ((compWord.length == 1) && (compWord[0].length == letter.length)) {
    return {result:true, final:true};
  }
  return {result:true, final:false};
}

var fillPuzzle = function () {
  var puzzle = [], i, j;

  // initialize the puzzle with blanks
  for (i = 0; i < rows; i++) {
    puzzle.push([]);
    for (j = 0; j < columns; j++) {
      puzzle[i].push('');
    }
  }
  return puzzle;
}

function clearAll() {
  letter = ""
  var field = document.getElementsByClassName("div_field")[0];
  var cells = field.getElementsByClassName("div_cell");
  for (i = 0; i < cells.length; i++) {
    cells[i].classList.remove("active");
    cells[i].classList.add("inactive");
  }
}

function time() { document.getElementById("img").style.visibility = "hidden";}


function strike() {
  var i = 0
  for (; letter != addedWords.english[i]; i++){

  }
  addedWords.english[i] = "<strike>" + addedWords.english[i] + "</strike> ";
  addedWords.ukrainian[i] = "<strike>" + addedWords.ukrainian[i] + "</strike> ";
}

function congrat(){
  var i = 0;
  for(; i < addedWords.english.length; i++) {
    if (addedWords.english[i].indexOf('strike') == -1) {
      break;
    }
  }
  console.log('i=' + i);
  if (i == addedWords.english.length) {
    addedWords.english = [];
    addedWords.ukrainian = [];
    document.getElementById("img").style.visibility = "visible";
    setTimeout(time, 5000);
    new_game();
  }
}


function finalOk() {
 strike();
 addedWords_fill();
 congrat();
  //alert("Good");
  clearAll();
}

function lightDiv(el) {
  el.classList.remove("inactive");
  el.classList.add("active");
}

function div_cell_click(el) {
  letter += el.innerHTML;
  console.log(letter);
  var checkResult = checkLetter();
  console.log(checkResult);
  if (!(checkResult.result)) { // result false
    clearAll(); // Сбрасываем подцвет, чистим letter
  }
  else {
     if (checkResult.final) { // final true
       lightDiv(el);
       setTimeout(finalOk, 100);
     }
     else { // result true final false
       lightDiv(el);// Подцветить букву
     }
   }
  console.log("Whole =" + letter);
}

var tryToPut = function (word, puzzle, x, y, fnGetSquare) {
    // traverse the squares to determine if the word fits
  for (var i = 0, len = word.length; i < len; i++) {

    var next = fnGetSquare(x, y, i);
    var square = puzzle[next.y][next.x];

    if (square !== word[i] && square !== '') {
      return false;
    }
  }
  return true;
};

var placeWord = function (puzzle, word, x, y, fnGetSquare) {
  for (var i = 0, len = word.length; i < len; i++) {
    var next = fnGetSquare(x, y, i);
    puzzle[next.y][next.x] = word[i];
  }
};

function fillWords(puzzle, height, width, wordsToPut) {
  for (var i = 0; i < wordsToPut.english.length; i++) {
    var locations = [];
    var word = wordsToPut.english[i];
    var wordLen = word.length;
    for (var direct = 0; direct < allOrientations.length; direct++) {
      var direction = allOrientations[direct];
      var next = orientations[direction];
      var check = checkOrientations[direction];
      var skipTo = skipOrientations[direction];
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          if (check(x, y, height, width, wordLen)) {
            if (tryToPut(word, puzzle, x, y, next)) {
              locations.push({x: x, y: y, orientation: direction});
            }
          }
          else {
            nextXY = skipTo(x, y, wordLen);
            if (nextXY.y >= height) {
              break;
            }
            x = nextXY["x"];
            y = nextXY.y;
          }
        }
      }
    }
    if (locations.length !== 0) {
      var sel = locations[Math.floor(Math.random() * locations.length)];
      placeWord(puzzle, word, sel.x, sel.y, orientations[sel.orientation]);
      addedWords.english.push(word);
      addedWords.ukrainian.push(wordsToPut.ukrainian[i]);
    }
  }
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  cells = document.getElementsByClassName('div_cell')
  for (var i = 0; i< cells.length; i++) {
    if (cells[i].innerHTML.length == 0) {
      text = possible.charAt(Math.floor(Math.random() * possible.length));
      cells[i].innerHTML = text;
    }
  }
}

function fieldToDiv(puzzle, height, width) {
  var cells = document.getElementsByClassName('div_cell');
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      cells[y * width + x].innerHTML = puzzle[y][x];
    }
  }
}

function addedWords_fill() {
  var stringFromWords = "";
  var words_we_need = document.getElementsByClassName('words_we_need');
  for (var i = 0; i < addedWords.ukrainian.length; i++) {
    stringFromWords += addedWords.ukrainian[i] + ' ';
  }
  console.log(stringFromWords);
  words_we_need[0].innerHTML = stringFromWords;
}


function new_game(){
  var words_to_fill = fillQuestWords(words_count);
  var game_field = fillPuzzle();
  fillWords(game_field, rows, columns, words_to_fill);
  fieldToDiv(game_field, rows, columns);
  makeid();
  addedWords_fill();
}

new_game();
