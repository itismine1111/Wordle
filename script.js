document.addEventListener("DOMContentLoaded", () => {
    createSquares();    

    let startmodalexitbtn = document.querySelector(".exit");
    let startmodal = document.querySelector(".starting-modal");

    startmodalexitbtn.addEventListener("click", function(){
        startmodal.style.opacity = "0";
        startmodal.style.zIndex = "-10";
    })

    let globalindex = 0;
    let wordsarr = ["dairy", "naman"];
    let questionarr = ["Name an object?", "What is my name?"];
    let hintarr = ["Hint1", "Hint2"];
    let remarkarr = ["Remark1", "Remark2"];

    let word = wordsarr[globalindex];
    let question = questionarr[globalindex];
    let hint = hintarr[globalindex];
    let remark = remarkarr[globalindex];

    let guessedWords = [[]];
    let availableSpace = 1;
  
    let guessedWordCount = 0;
  
    const keys = document.querySelectorAll(".keyboard-row button");

    let next = document.getElementById("next");
    next.onclick = function(){
        console.log("here");
        guessedWords = [[]];
        availableSpace = 1;
        guessedWordCount = 0;
        globalindex += 1;
        word = wordsarr[globalindex];
        question = questionarr[globalindex];
        hint = hintarr[globalindex];
        remark = remarkarr[globalindex];

        let board = document.getElementById("board");
        board.innerHTML = "";
        createSquares();


    };
    console.log("next");

  
    function getCurrentWordArr() {
      const numberOfGuessedWords = guessedWords.length;
      return guessedWords[numberOfGuessedWords - 1];
    }
  
    function updateGuessedWords(letter) {
      const currentWordArr = getCurrentWordArr();
  
      if (currentWordArr && currentWordArr.length < 5) {
        currentWordArr.push(letter);
  
        const availableSpaceEl = document.getElementById(String(availableSpace));
  
        availableSpace = availableSpace + 1;
        availableSpaceEl.textContent = letter;
      }
    }
  
    function getTileColor(letter, index) {
      const isCorrectLetter = word.includes(letter);
  
      if (!isCorrectLetter) {
        return "rgb(58, 58, 60)";
      }
  
      const letterInThatPosition = word.charAt(index);
      const isCorrectPosition = letter === letterInThatPosition;
  
      if (isCorrectPosition) {
        // return "rgb(255, 51, 51)";
        return "rgb(158, 0, 0)";
  
      }
  
      return "rgb(181, 159, 59)";
    }
  
    function handleSubmitWord() {
      const currentWordArr = getCurrentWordArr();
      if (currentWordArr.length !== 5) {
        window.alert("Word must be 5 letters");
      }
  
      const currentWord = currentWordArr.join("");
  
      const firstLetterId = guessedWordCount * 5 + 1;
          const interval = 200;
          currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
              const tileColor = getTileColor(letter, index);
  
              const letterId = firstLetterId + index;
              const letterEl = document.getElementById(letterId);
              letterEl.classList.add("animate__flipInX");
              letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index);
          });
  
          guessedWordCount += 1;
  
          if (currentWord === word) {
            guessedWordCount = 0;
            window.alert("Congratulations!");
          }
  
          if (guessedWords.length === 6) {
            window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
          }
  
          guessedWords.push([]);
        
    }
  
    function createSquares() {
      const gameBoard = document.getElementById("board");
  
      for (let index = 0; index < 30; index++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("animate__animated");
        square.setAttribute("id", index + 1);
        gameBoard.appendChild(square);
      }
    }
  
    function handleDeleteLetter() {
      const currentWordArr = getCurrentWordArr();
      const removedLetter = currentWordArr.pop();
  
      guessedWords[guessedWords.length - 1] = currentWordArr;
  
      const lastLetterEl = document.getElementById(String(availableSpace - 1));
  
      lastLetterEl.textContent = "";
      availableSpace = availableSpace - 1;
    }
  
    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = ({ target }) => {
        const letter = target.getAttribute("data-key");
  
        if (letter === "enter") {
          handleSubmitWord();
          return;
        }
  
        if (letter === "del") {
          handleDeleteLetter();
          return;
        }
  
        updateGuessedWords(letter);
      };
    }


  });  