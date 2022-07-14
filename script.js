let numPanel = document.getElementsByClassName('numKey');
let onoff = document.getElementsByClassName('button');
const calcScreen = document.getElementById('lowScreen');
const topScreen = document.getElementById('topScreen');
//_All elements that are defined
//________________________________
let operations=[];
let num = '';
let result = undefined;
let doDaMath = {
    '+': function (x, y) { return parseFloat(x) + parseFloat(y) },
    '-': function (x, y) { return parseFloat(x) - parseFloat(y) },
    '*': function (x, y) { return parseFloat(x) * parseFloat(y) },
    '\/': function (x, y) { return parseFloat(x) / parseFloat(y) },
}
//_All variables that are defined
//________________________________
calcScreen.textContent = '';
numPanel = [...numPanel];
onoff = [...onoff]
//_All variables/Elements that are modified
//________________________________

//________________________________
numPanel.forEach(element => {
    let simbols = /^[+\-*\/]/;
    if(element.textContent.match(simbols)){
        element.addEventListener('click',symbolshandler);

    } else if(element.textContent == '='){ 
        element.addEventListener('click', equalHandler)
    } else {
        element.addEventListener('click', numKeyHandler);
    }   
});

onoff.forEach(e =>{
    if(e.textContent=='Delete'){
        e.addEventListener('click',delCalc);
    } else if (e.textContent=='Clear'){
        e.addEventListener('click', clearCalc)
    }
});
//_All the forEach to target the buttons
//________________________________
let calculatef = function(arr){
    //console.log(arr);
    for(let i =0;i<arr.length-1;i++){
        if(arr[i]=='*' || arr[i] =='/'){
            let operator = arr[i];
            let first = arr[i-1];
            let second = arr[i+1];
            let temp = arr;
            result = doDaMath[operator](first,second);
            arr[i+1] = result;
            arr.splice(i-1,2)
            i=0;
            console.log(arr);

        }
    }
    for(let i =0;i<arr.length-1;i++){
        if(arr[i]=='+' || arr[i] =='-'){
            let operator = arr[i];
            let first = arr[i-1];
            let second = arr[i+1];
            let temp = arr;
            result = doDaMath[operator](first,second);
            arr[i+1] = result;
            arr.splice(i-1,2)
            i=0;
            console.log(arr);
        }
    }
    if(arr[0].toString().indexOf('.')!=-1 || (arr[0].length-arr[0].toString().indexOf('.')>6)){
        return arr[0].toFixed(6);
    } else {
        return arr[0];
    }
    
}
//_All the functions designed to work inside the code
//________________________________
function clearCalc(){
    num = '';
    operations = [];
    calcScreen.textContent = '';
    topScreen.textContent = '';
}

function delCalc(){
    num = '';
    calcScreen.textContent = '';
}

function symbolshandler(){
    if(num){
        operations.push(num);
        operations.push(this.textContent);
        num = '';
        calcScreen.textContent = '';
        topScreen.textContent = operations.join(' ');
    }
};

function equalHandler(){
    if(num){
        operations.push(num);
        num = '';
        calcScreen.textContent = '';
        topScreen.textContent = operations.join(' ');
        result = calculatef(operations);
        calcScreen.textContent = result;
    }
}

function numKeyHandler(){
    if(num.length<13){
        if(this.textContent =='.'){
            if(!num.includes('.')){
                    num += this.textContent;
                    calcScreen.textContent = num;                       
            }
        } else {
            if(num.includes('.') && (num.length-num.indexOf('.'))<6){
                num += this.textContent;
                calcScreen.textContent = num;
            } else if (!num.includes('.')){
                num += this.textContent;
                calcScreen.textContent = num;
            }
            
        }
    }
}
//_All the functions created to target elements
//________________________________