document.addEventListener("DOMContentLoaded", () => {
  createSquares();    

  let startmodalexitbtn = document.querySelector(".exit");
  let startmodal = document.querySelector(".starting-modal");
  let hinttext = document.querySelector("#hint");
  let remarktext = document.querySelector("#remark");
  let questiontext = document.querySelector("#question");
  let keyboardrow = document.querySelector(".keyboard-container");
  let exitmodal = document.querySelector(".ending-modal");
  let enddisplaybutton = document.querySelector("#end-display-button");
  let nextbtndiv = document.querySelector("#next");

  function displayBtn() {
    startmodalexitbtn.style.display = 'block';
  }
  setTimeout(displayBtn, 4000);

  function displayEndBtn() {
    enddisplaybutton.style.display = 'block';
  }

  startmodalexitbtn.addEventListener("click", function(){
      startmodal.style.opacity = "0";
      startmodal.style.zIndex = "-10";
  })

  let globalindex = 0;
  // let wordsarr = ["dairy", "naman"];
  // let questionarr = ["Name an object?", "What is my name?"];
  // let hintarr = ["Hint1", "Hint2"];
  // let remarkarr = ["Remark1", "Remark2"];

  let wordsarr = ["heart", "treat", "lover", "crazy", "caint", "dance", "study", "sassy", "roses", "smile", "bitch", "mintu", "puchi"];

  let questionarr = ["Let's start easy. What is something that is mine and I have given you?", "Talking to you and soaking in that amazing personality for me is a ___?", "Teri in pyari pyari baaton ne mujhe bana diya hai tera ___?", "A word that perfectly describes you. I like this quality of you very much..?", "You are very very very ___?", "I go crazy when you ___?", "You always ditch me for this ?", "I loved this phase of you..?", "It was a gift to you..?", "When you do this, I melt like butter on a hot pan..?", "You really like calling me this..?", "I really like it when you call me this..?", "I really like giving it to you ..?"];

  let hintarr = ["Hint: I have never given this to anyone else..", "Hint: You promised to give it to me at a certain fast food chain if I come to Mauritious..", "Hint: I love you..", "Hint: Calling me the first time just after texting for a few minutes was..", "Hint: I call you this in punjabi..", "Hint: No hint this time. I have told this to you many times..", "Hint: You always ditch me for this, as you should..", "Hint: You really loved the colour black during this time..", "Hint: I put in a lot of efforts for this..", "Hint: I never want you to stop doing this..", "Hint: I am 3rd one on the list and I don't mind it at all..", "Hint: I really really really like it when you call me this..", "Hint: You really hate when I say it and give it to you.."];

  let remarkarr = ["Kya Baat Kya Baat. Starting stong smarty..", "I knew you would guess this one right..", "Smarty Pants..", "My very very academics Shreya..", "Hayee..", "Shreya 1 time mere liye, do the head bang of chaaiyan chaaiyan..", "I know you will do great in studies. Get into that college bitch!!", "Sassy shreya should definitely make a comeback someday.", "I will get you sunflowers for real one day..", "Always keep smiling babess. I want to always see that dimple on your face..", "No one, I mean NO ONE is taking my 3rd place. Always remember that!!", "Hayee, I swear dil le jati hai har baar..", "Shreya, apke liye dher saari PUCHIS!!!"]


  let word = wordsarr[globalindex];
  let question = questionarr[globalindex];
  let hint = hintarr[globalindex];
  let remark = remarkarr[globalindex];

  let guessedWords = [[]];
  let availableSpace = 1;

  let guessedWordCount = 0;

  questiontext.textContent = question;
  nextbtndiv.style.display = 'none';

  const keys = document.querySelectorAll(".keyboard-row button");

  let next = document.getElementById("next");
  next.onclick = function(){
      console.log("here");
      globalindex += 1;

      if (globalindex >= wordsarr.length) {
        window.location.replace("second.html");
        // exitmodal.style.zIndex = "800";
        // setTimeout(enddisplaybutton, 2000);
      }

      guessedWords = [[]];
      availableSpace = 1;
      guessedWordCount = 0;
      word = wordsarr[globalindex];
      question = questionarr[globalindex];
      questiontext.textContent = question;
      hint = hintarr[globalindex];
      remark = remarkarr[globalindex];
      hinttext.textContent = "";
      remarktext.textContent = "";
      nextbtndiv.style.display = 'none';


      // enableKeyboard();
      let board = document.getElementById("board");
      board.innerHTML = "";
      createSquares();

  };

  function disableKeyboard(){
    let disablediv = document.createElement("div");
    disablediv.classList.add("disablediv");
    keyboardrow.appendChild(disablediv);
    next.style.zIndex = "300";

  }

  function enableKeyboard(){
    let disablediv = document.querySelector(".disablediv");
    disablediv.style.zIndex = "-1";
  }

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

          remarktext.innerHTML = remark;
          nextbtndiv.style.display = 'block';
          // window.alert("Congratulations!");
          disableKeyboard();

        }
        
        if (guessedWords.length === 2){
          hinttext.innerHTML = hint;
        }

        if (guessedWords.length === 6) {
          remarktext.innerHTML = "If you would have solved this, you would have gotten - " + remark;
          nextbtndiv.style.display = 'block';
          window.alert(`Sorry Shreya, you have no more guesses left! The word is ${word}.`);
          disableKeyboard();
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
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) {
          window.alert("Word must be 5 letters");
          return;
        }
        else{
          handleSubmitWord();
        return;
        }
        
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter);
    };
  }


});  