let numPanel = document.getElementsByClassName('numKey');
const calcScreen = document.getElementById('lowScreen');
const topScreen = document.getElementById('topScreen');
//________________________________
let operations=[];
let num = '';
let doDaMath = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '*': function (x, y) { return x * y },
    '\/': function (x, y) { return x / y },
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
            if(num || operations.length > 3){
                operations.push(num);
                num = '';
                calcScreen.textContent = '';
                topScreen.textContent = operations.join(' ');
                console.log(operations);
                //console.log(eval(operations.join(' ')))
                for(let i = 1;i<operations.length;){
                    let first = parseFloat(operations[0]);
                    let operator = operations[1];
                    let second = parseFloat(operations[2]);
                    let result = doDaMath[operator](first,second);
                    console.log(result);
                    operations.splice(0,3);
                    operations.unshift(result);
                    console.log(operations);
                }
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
