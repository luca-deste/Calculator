let numPanel = document.getElementsByClassName('numKey');
const calcScreen = document.getElementById('lowScreen');
const topScreen = document.getElementById('topScreen');
//________________________________
let operations=[];
let num = '';
let doDaMath = {
    '+': function (x, y) { return parseFloat(x) + parseFloat(y) },
    '-': function (x, y) { return parseFloat(x) - parseFloat(y) },
    '*': function (x, y) { return parseFloat(x) * parseFloat(y) },
    '\/': function (x, y) { return parseFloat(x) / parseFloat(y) },
}
//________________________________
calcScreen.textContent = '';
numPanel = [...numPanel];
//________________________________

//________________________________
numPanel.forEach(element => {
let simbols = /^[+\-*\/]/;
    if(element.textContent.match(simbols)){
        //console.log(element.textContent);
        element.addEventListener('click',function(){
            if(num){
                operations.push(num);
                operations.push(element.textContent);
                num = '';
                calcScreen.textContent = '';
                topScreen.textContent = operations.join(' ')
            }
            //console.log(operations);
        })
    } else if(element.textContent == '='){ 
        element.addEventListener('click', function(){
            if(num){
                operations.push(num);
                num = '';
                calcScreen.textContent = '';
                topScreen.textContent = operations.join(' ');
                let result = calculatef(operations);
                calcScreen.textContent = result;
            }
        })
    } else {
        //console.log(element.textContent);
        element.addEventListener('click', function(){
            if(num.length<13){
                if(element.textContent =='.'){
                    if(!num.includes('.')){
                            num += element.textContent;
                            calcScreen.textContent = num;                       
                    }
                } else {
                    if(num.includes('.') && (num.length-num.indexOf('.'))<6){
                        num += element.textContent;
                        calcScreen.textContent = num;
                    } else if (!num.includes('.')){
                        num += element.textContent;
                        calcScreen.textContent = num;
                    }
                    
                }
            }                
    });
    }
    
});

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