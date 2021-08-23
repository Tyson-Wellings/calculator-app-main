const themeToggle = document.getElementById("theme-toggle-control");
const staButtons = document.getElementsByClassName("standard-button");
const theme = document.getElementById('theme');
const display = document.getElementById("calc-display");
const delButton = document.getElementsByClassName("delete-button");
const opButtons = document.getElementsByClassName("operation");
const equalButtons = document.getElementsByClassName("equal-button");
const resetButtons = document.getElementsByClassName("reset-button");
const equation = document.getElementById("equation");
var displayEquation;
var prevDisplay = 0;
var calcDisplay = 0;
const displayOperations = ["x" , "/" , "+" , "-"];
const operations = ["*" , "/" , "+" , "-"];
const opCheck = [0, 0, 0, 0];
const history = [0];
var digitMultiplier = 0;

//Called upon when the dom loads. This essentially prepares all the buttons to work when interacted with
function init (){
    themeToggle.value = "1"
    theme.href = "theme" + themeToggle.value + ".css"
    display.innerHTML = calcDisplay;
    prepareThemeToggle()
    prepareStaButtons()
    prepareDelButton()
    prepareOperations()
    prepareEqualButton()
    prepareResetButtons()
    

}


function prepareThemeToggle(){
    themeToggle.addEventListener("change",changeTheme)
}

function changeTheme(){
    theme.href = "theme" + themeToggle.value + ".css" 
}

function prepareStaButtons(){
    Array.from(staButtons).forEach(function(button){ //Array.from will convert our staButtons (which is a DOM collection) into an array.
        button.addEventListener('click', () => updateDisplay(button))
    })
}

function updateDisplay(button){

    if (history.length > 1){ //history.length is 1 by default
        calcDisplay = calcDisplay + (button.value) //the number are strings at this stage so plus just adds one string to the next
    }

    if (history.length == 1){ //if history.length == 1 that would mean we have not input a new number yet
        calcDisplay = button.value //This will erase the default number. 
    }
    
    history.push(calcDisplay); //number is stored in history which will be important when deleting digits
    display.innerText = calcDisplay.toLocaleString('en-US') //this adds commas to appropriate spots in the number
}

function prepareDelButton(){
    
    Array.from(delButton).forEach(function(button){ 
        button.addEventListener('click', delDigit)
    })
}

function delDigit(){
    if (history.length == 1){
        display.innerHTML = history[0] 
        return
    }

    history.pop() //pop will get rid of the most recent number in the history array
    var length = history.length; 
    display.innerHTML = history[length-1] //array index's start at 0. Length begins at 1...
    calcDisplay = history[length-1]
}

function prepareOperations(){
    Array.from(opButtons).forEach(function(button){
        button.addEventListener('click',function(){
            if (history.length > 1){ 
                calcDisplay = calculate(); 

                /* whenever an operation is called upon the previous equation is resolved. 
                For example if I write 2+2 then I click "x" the answer to 2+2 will be displayed on the calculator
                until I then input the next number that the answer to 2+2 will be multiplied against. checking
                if history.length is greater than 1 in this case will prevent a new calculation running if the user
                decides to change which operation they want to call upon. */
    
            }
            /* This makes all the index's in the opCheck array = 0 resetting it. That
            way previously called operations do not interfere with the subsequent calculation. */
            opCheck.forEach(function(item,index){
                opCheck[index] = 0
            })
            /* This will make the corresponding index in the opCheck array = 1 which will then be used for 
            the subsequent calculation */
            opCheck[operations.lastIndexOf(button.value)] = 1
            displayEquation = lastAnswer+displayOperations[opCheck.lastIndexOf(1)];
            equation.innerHTML = displayEquation;
            recalibrateVariables(calcDisplay)

        })
    })
}

var answer;
var lastAnswer = 0;

function calculate(){
    if(opCheck.lastIndexOf(1) == -1){ /* When inputting the first operation all index's in opCheck
    will == 0 therefore the lastIndexOf function will return -1  */
        lastAnswer = calcDisplay
        prevDisplay = calcDisplay
        return 0; 
       
    } 
    displayEquation = lastAnswer+displayOperations[opCheck.lastIndexOf(1)]+calcDisplay+"=";
    if ( displayEquation != 'undefined')
    {equation.innerHTML = displayEquation;}
    console.log(displayEquation)
    answer = eval(lastAnswer+operations[opCheck.lastIndexOf(1)]+calcDisplay);
    lastAnswer = answer
    prevDisplay = calcDisplay;
    return(answer)
}

function recalibrateVariables(number){
    display.innerHTML = number.toLocaleString('en-US');
    history.splice(1) //reset the history array by splicing out all the other index's after 0
}

function prepareEqualButton(){
    Array.from(equalButtons).forEach(function(button){ 
        button.addEventListener('click', function(){

            /* Typically on a traditional calculator when the equal button is pressed with no input
             of a new number the last opeartion is reapplied therefore checking the history length 
             lets the function know wether to calculate a new equation or wether to reapply the previous operation
             and input to the current number */
            if (history.length == 1){
                calcDisplay = reCalculate() 
            }
            if (history.length > 1){
                calcDisplay = calculate()
            }
            lastAnswer = calcDisplay
            recalibrateVariables(calcDisplay)

        })
    })
}

function reCalculate(){
    displayEquation = calcDisplay+displayOperations[opCheck.lastIndexOf(1)]+ prevDisplay+"=";
    if ( displayEquation != 'undefined')
    {equation.innerHTML = displayEquation;}
    answer = eval(calcDisplay+operations[opCheck.lastIndexOf(1)]+ prevDisplay)
    return(answer)
}

function prepareResetButtons(){
    Array.from(resetButtons).forEach(function(button){ 
        button.addEventListener('click', resetCalcualator)
    })
}

function resetCalcualator(){
    history.splice(0)
    history[0] = 0;
    prevDisplay = 0
    calcDisplay = 0;
    opCheck.forEach(function(item,index){
        opCheck[index] = 0
    })
    display.innerHTML = calcDisplay.toLocaleString('en-US');
    equation.innerHTML = "";


}

document.addEventListener("DOMContentLoaded", init);