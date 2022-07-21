let numPanel = document.getElementsByClassName('numKey');
let onoff = document.getElementsByClassName('button');
const calcScreen = document.getElementById('lowScreen');
const topScreen = document.getElementById('topScreen');
const buttons = document.querySelectorAll('button');
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
onoff = [...onoff];
btns = [...buttons];
//_All variables/Elements that are modified
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

document.addEventListener('keydown',function(elem){
    let simbols = /^[+\-*\/]/;
    let numbers = /[0-9]/;
    let dot = /\./
    console.log(elem.key)
    if(elem.key.match(simbols)){
        symbolshandler(elem);
    } else if(elem.key == '=' || elem.key==='Enter'){ 
        elem.preventDefault();
        equalHandler();
    } else if(elem.key.match(numbers) || elem.key.match(dot)){
        numKeyHandler(elem);
    }  else if(elem.key == 'Backspace'){
        delCalc();
    } else if(elem.key =='Delete'){
        clearCalc();
    }
})

//_All the events to target the elements
//________________________________
let calculatef = function(arr){
    for(let i =0;i<arr.length-1;i++){
        if(arr[i]=='*' || arr[i] =='/'){
            let operator = arr[i];
            let first = arr[i-1];
            let second = arr[i+1];
            result = doDaMath[operator](first,second);
            arr[i+1] = result;
            arr.splice(i-1,2)
            i=0;

        }
    }
    for(let i =0;i<arr.length-1;i++){
        if(arr[i]=='+' || arr[i] =='-'){
            let operator = arr[i];
            let first = arr[i-1];
            let second = arr[i+1];
            result = doDaMath[operator](first,second);
            arr[i+1] = result;
            arr.splice(i-1,2)
            i=0;
        }
    }
    if(arr[0].toString().indexOf('.')!=-1&&(arr[0].toString().length-arr[0].toString().indexOf('.'))>3){    
        return arr[0].toFixed(3);
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
    result = undefined;
}

function delCalc(){
    num = '';
    calcScreen.textContent = '';
}

function symbolshandler(elem){
    if(this.textContent && num){
            //commacheck(num);
            operations.push(num);
            operations.push(this.textContent);
            num = '';
            calcScreen.textContent = '';
            topScreen.textContent = operations.join(' ');
    } else if(elem.key && num){
            operations.push(num);
            //commacheck(num);
            operations.push(elem.key);
            num = '';
            calcScreen.textContent = '';
            topScreen.textContent = operations.join(' ');
    } 
};

function equalHandler(){
    if(num){
        //commacheck(num);
        operations.push(num);
        num = '';
        calcScreen.textContent = '';
        topScreen.textContent = operations.join(' ');
        result = calculatef(operations);
        if(result == 'Infinity'){
            calcScreen.textContent = 'Error';
        } else if(result.length>15){
            calcScreen.textContent = 'Error';
            topScreen.textContent = 'NUMBER TOO BIG'
        }else {
            calcScreen.textContent = parseFloat(result).toLocaleString();
        }
        
    };
}

function numKeyHandler(elem){
    let digit;
    if(elem.key){
        digit = elem.key;
    } else {
        digit = this.textContent;
    }
    if(result!=undefined){
        clearCalc();
    }
    if(num.length<13){
        if(digit =='.'){
            if(!num.includes('.')){
                if(num.toString().length==0){
                    num = '0';
                }
                num += digit;
                calcScreen.textContent = parseFloat(num).toLocaleString();;                       
            }
        } else {
            if(num.includes('.') && (num.length-num.indexOf('.'))<6){
                num += digit;
                calcScreen.textContent = num;
            } else if (!num.includes('.')){
                if(num!='0'){
                    num += digit;
                    calcScreen.textContent = parseFloat(num).toLocaleString();
                } 
            }
            
        }
    }
};
//_All the functions created to target elements
//________________________________