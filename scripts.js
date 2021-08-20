const themeToggle = document.getElementById("theme-toggle-control")
const staButtons = document.getElementsByClassName("standard-button")
const theme = document.getElementById('theme')
const display = document.getElementById("calc-display")
const delButton = document.getElementsByClassName("delete-button");
const opButtons = document.getElementsByClassName("operation")
var preDisplay = 0;
var calcDisplay = 0;
const operations = ["*" , "/" , "+" , "-"];
const opCheck = [0, 0, 0, 0];
const history = [0];
var digitMultiplier = 0;
function init (){
    themeToggle.value = "1"
    theme.href = "theme" + themeToggle.value + ".css"
    display.innerHTML = calcDisplay;
    prepareThemeToggle()
    prepareStaButtons()
    prepareDelButton()
    prepareOperations()
    

}

function prepareThemeToggle(){

    themeToggle.addEventListener("change",changeTheme)
}

function changeTheme(){
    theme.href = "theme" + themeToggle.value + ".css" 
}

function prepareStaButtons(){
    Array.from(staButtons).forEach(function(button){
        button.addEventListener('click', () => updateDisplay(button))
    })
}

function updateDisplay(button){

    if (calcDisplay > 0){
        calcDisplay = calcDisplay + (button.value)
    }

    if (calcDisplay == 0){
        calcDisplay = button.value
    }
    
    history.push(calcDisplay);
    var length = history.length
    display.innerText = calcDisplay.toLocaleString('en-US')
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

    history.pop()
    var length = history.length;
    display.innerHTML = history[length-1]
    calcDisplay = history[length -1]
    
}

function prepareOperations(){
    Array.from(opButtons).forEach(function(button){
        button.addEventListener('click',function(){
            calcDisplay = calculate();
            opCheck.forEach(function(item,index){
                opCheck[index] = 0
            })
            opCheck[operations.lastIndexOf(button.value)] = 1
            recalibrateVariables()

        })
    })
}

function calculate(){
    var answer;
    if(opCheck.lastIndexOf(1) == -1){
        preDisplay = calcDisplay;
       return 0; 
       
    } 
    answer = preDisplay+operations[opCheck.lastIndexOf(1)]+calcDisplay;
    answer = eval(answer)
    preDisplay = calcDisplay;
    return(answer)
}

function recalibrateVariables(){

    display.innerHTML = calcDisplay.toLocaleString('en-US');
    history.splice(0)
    history.push(calcDisplay)
    calcDisplay = '0'
    console.log(digitMultiplier)
}

document.addEventListener("DOMContentLoaded", init);