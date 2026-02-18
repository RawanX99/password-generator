const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "~`!@#$%^&*()_-+={[}]|:;<>,.?/";

const generatorBtn=document.getElementById("generate-btn");
const passwordText=document.querySelectorAll(".password-box p");
const passwordBoxes=document.querySelectorAll(".password-box");
const passwordCopyBoxes=document.querySelectorAll(".password-box span");
const numberCheckbox=document.getElementById("includeNumbers");
const symbolCheckbox=document.getElementById("includeSymbols");
const sortCheckbox=document.getElementById("includeSorting");
const numberCounter=document.getElementById("numberCounter");
const symbolCounter=document.getElementById("symbolCounter")
const lengthSlider=document.getElementById("length-slider");
const displayLength=document.getElementById("length-display");
const alertSpan=document.getElementById("alert-message");

const themeBtn=document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {
    const body=document.body;
    if(body.classList.contains("dark-mode")){
        body.classList.replace("dark-mode", "light-mode");
        document.getElementById("sun-symbol").classList.remove("hide");
        document.getElementById("moon-symbol").classList.add("hide");
        document.querySelector(".tooltip-text").textContent="switch to dark mode";
    }else{
        body.classList.replace("light-mode", "dark-mode");
        document.getElementById("sun-symbol").classList.add("hide");
        document.getElementById("moon-symbol").classList.remove("hide");
        document.querySelector(".tooltip-text").textContent="switch to light mode";
    }

});


enableCopy();


let passwordLength=lengthSlider.value;

lengthSlider.addEventListener("input", (e) => {
    passwordLength=e.target.value;
    displayLength.innerText=passwordLength;
     
});


    
generatorBtn.addEventListener("click",generatePassword);


    
function generatePassword(){
    
    let length=parseInt(passwordLength);
    const minNum=numberCheckbox.checked ?parseInt(numberCounter.value):0;
    const minSym=symbolCheckbox.checked ?parseInt(symbolCounter.value):0;
    
    console.log(`${length} ${minNum}  ${minSym}`);
    
    let minLength=2+minNum+minSym;
    
    if(minLength>length){
        alertSpan.textContent=`Password length (${length}) is too short for the minimum requirements (${minLength} characters needed)`;
        alertSpan.classList.remove("hide");
        return "";   
    }else{
        alertSpan.textContent="";
        alertSpan.classList.add("hide");
    }
    
    let password=[];
    let characters;
    let passlen=length-minNum-minSym;
    
    for(let i=0;i<2;i++){
                
        let characters=buildCharacter(
            addLetters(passlen),
            numberCheckbox.checked ? addNumbers(minNum) : "",
            symbolCheckbox.checked ? addSymbols(minSym) : ""
        );
        
        password[i]=characters;
    }
     
     if(sortCheckbox.checked){
                
        // addLetters(password,passlen);
        
        // if(numberCheckbox.checked){
        //     addNumbers(password)
        // }
        
        // if(symbolCheckbox.checked){
        //     addSymbols(password)
        // }
         
    for(let i=0;i<2;i++){
        Object.assign(passwordBoxes[i].style,{
            fontSize:"14px",
            opacity:"1",
            fontWeight:"100"
        });
        passwordText[i].innerText=password[i];
        
      } 
        
        

        
     }else{
        
      for(let i=0;i<2;i++){
        Object.assign(passwordBoxes[i].style,{
            fontSize:"14px",
            opacity:"1",
            fontWeight:"100"
        });
        passwordText[i].innerText=generateUnsortedPassword(password[i]);
        
      } 
        
     }

};


    
function addLetters(lenght){
    let minLetters="";
    for(let i=0;i<lenght;i++){
        minLetters+=letters[Math.floor(Math.random()*letters.length)];
    }
    console.log("letters: "+minLetters);
    return minLetters;
}

function  addNumbers(length){     
    let minNumbers="";
    for(let i=0;i<length;i++){
                minNumbers+=numbers[Math.floor(Math.random()*numbers.length)];
            }
            console.log("numbers: "+minNumbers);
    return minNumbers;
}

function addSymbols(length){
    let minSymbols="";
    for(let i=0;i<length;i++){
                minSymbols+=symbols[Math.floor(Math.random()*symbols.length)];
            }   
            console.log("symbols: "+minSymbols);
    return minSymbols;
}

function buildCharacter(...parts){
    return parts.join("");
}


function generateUnsortedPassword(characters){
  
    let password=characters.split("");

    for(let i=password.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [password[j],password[i]]=[password[i],password[j]]
    }
    console.log(password.join(""));
  return password.join("");
}



numberCheckbox.addEventListener("change",() => {
    const numOptContainer=document.querySelector("#numbers-option"); 
    const numCounter=document.querySelector("#number-counter"); 
   
    if(numberCheckbox.checked){
        numOptContainer.classList.replace("disabled","enabled");
        numCounter.classList.remove("disabled"); 
    }else{
        numOptContainer.classList.replace("enabled","disabled");
        numCounter.classList.add("disabled"); 

    }
    
});


symbolCheckbox.addEventListener("change",() => {
    const symOptContainer=document.querySelector("#symbols-option"); 
    const symCounter=document.querySelector("#symbol-counter"); 

    if(symbolCheckbox.checked){
        symOptContainer.classList.replace("disabled","enabled");
        symCounter.classList.remove("disabled"); 
    }else{
        symOptContainer.classList.replace("enabled","disabled");
        symCounter.classList.add("disabled"); 
        
    }
    
});

sortCheckbox.addEventListener("change",() => {
    const sortOptContainer=document.querySelector("#sorting-option"); 
   
    if(sortCheckbox.checked){
        sortOptContainer.classList.replace("disabled","enabled");

    }else{
        sortOptContainer.classList.replace("enabled","disabled");

        
    }
    
});



function enableCopy(){
    
    for(let i=0;i<passwordBoxes.length;i++){
    passwordBoxes[i].addEventListener('mouseenter',()=>{
        passwordCopyBoxes[i].classList.remove("hide");
    });
    
    passwordBoxes[i].addEventListener('mouseleave',()=>{
        passwordCopyBoxes[i].classList.add("hide");
        passwordCopyBoxes[i].textContent="Click to Copy";
    });
    
    passwordCopyBoxes[i].addEventListener("click", () =>{
        copyPassword(i);
        passwordCopyBoxes[i].textContent="Copied!";
    });
    
    }
}

function copyPassword(index){
    
    const password=passwordText[index].textContent;
    
    navigator.clipboard.writeText(password);
    
    
}


const numberInputs = document.querySelectorAll('input[type="number"]');

numberInputs.forEach(input => {

    input.addEventListener("input", () => validateNumber(input));


    input.addEventListener("blur", () => {
        if (input.value === "") {
            input.value = input.min || 0;
        }
        validateNumber(input);
    });
});

function validateNumber(input) {
    if (input.value === "") return;

    const min = Number(input.min);
    const max = Number(input.max);
    const value = Number(input.value);

    if (value < min) input.value = min;
    if (value > max) input.value = max;
}


