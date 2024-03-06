const submit=document.querySelector("#submit");
const userInput=document.querySelector("#guessField");
const guessSlot=document.querySelector(".guesses");
const remaining=document.querySelector(".lastResult");
const startOver= document.querySelector('.resultParas');
const lowOrHi=document.querySelector(".lowOrHigh");

const p=document.createElement('p');

const rand_number=parseInt(Math.random()*100+1);
//global scope
let prevGuess=[];//array for storing guesses of users
let numguess=1;//number of guesses
let playGame=true;

if(playGame){
    submit.addEventListener("click",function(e){
        e.preventDefault();//to keep the value from thr form 
        const guess=parseInt(userInput.value);
        validateGuess(guess);
    });
}


//to check wheatjer the number entered by the user valid
function validateGuess(guess){
    //
    if(isNaN(guess)){
        displayMesg("please enter a valid number!");
    }
    else if(guess<1){
        displayMesg("please enter a larger number!");
    }
    else if(guess>100){
        displayMesg("please enter a smaller number!");
    }
    else{
        prevGuess.push(guess);
        if(numguess===11){
            displayGuess(guess);
            displayMesg(`game over! Random number was ${rand_number}`)
            endGame();
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess===rand_number){
        displayMesg(`you guessed it right!`);
        endGame();
    }
    else if(guess<rand_number){
        displayMesg(`number is too low!`);
    }
    else if(guess>rand_number){
        displayMesg(`number is too large!`);
    }

}

function displayGuess(guess){
    userInput.value='';//clean up
    guessSlot.innerHTML+=`${guess},`;
    numguess++;
    remaining.innerHTML=`${11-numguess}`; 

}

function displayMesg(mesg){
    lowOrHi.innerHTML=`<h2>${mesg}</h2>`

}

function endGame(){
    userInput.value='';
    userInput.setAttribute("disabled",'');
    p.classList.add('button');
    p.innerHTML=`<h2 id ="newGame">New Game</h2>`;
    startOver.appendChild(p);
    playGame=false;
    newgame();

}

function newgame(){
    const newGameButtn=document.querySelector("#newGame");
    newGameButtn.addEventListener("click",function(e){
        rand_number=parseInt(Math.random()*100+1);
        prevGuess=[];
        numguess=1;
        guessSlot.innerHTML='';
        remaining.innerHTML=`${11-numguess}`;
        userInput.removeAttribute("disabled");
        startOver.removeChild(p);

        playGame=true;
    })

}

