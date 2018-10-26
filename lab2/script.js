
var buttonP = document.querySelector('#oneone');
var buttonM = document.querySelector('#twotwo');
var x = document.body.offsetHeight - buttonM.offsetHeight;
var y = document.body.offsetWidth - buttonM.offsetWidth;
var scoreDiv = document.querySelector("#score");
var score = 0;
var interval;

//Move passed element to passed positions
function moveRandom(element, pos)
{
    element.style.top = pos[0] + 'px';
    element.style.left = pos[1] + 'px';
}

//Get random position inside screen
function getNewPos()
{
   
    var randomX = Math.floor(Math.random() * x);
    var randomY = Math.floor(Math.random() * y);

    return [randomX, randomY];
}

//Chekc overlap and replace if there is
function moveRandom2(element, other)
{
    var ok = true;
    do
    {
        moveRandom(element, getNewPos());
        ok = (element.offsetLeft + element.offsetWidth)  < other.offsetLeft ||
            element.offsetLeft > (other.offsetLeft + other.offsetWidth)     ||
            (element.offsetTop + element.offsetHeight) < other.offsetTop    ||
            element.offsetTop > (other.offsetTop + other.offsetHeight);
    }while(!ok);
}

//When the page is loaded, place buttons and start interval
window.onload = function(){
    moveRandom(buttonP, getNewPos());
    moveRandom(buttonM, getNewPos());
    
    interval = setInterval(function(){
        moveRandom(buttonP, getNewPos());
        moveRandom2(buttonM, buttonP);
        
    }, 1000);
};

//Reset x and y when the page is resized
window.onresize = function(event){
    x = document.body.offsetHeight - buttonP.offsetHeight;
    y = document.body.offsetWidth - buttonP.offsetWidth;
}

//Button event listener
document.querySelector("#buttonP").addEventListener('click', function(){
    ++score;
    scoreDiv.innerHTML = "Score: " + score;
});

//Button event listener
document.querySelector("#buttonM").addEventListener('click', function(){
    --score;
    scoreDiv.innerHTML = "Score: " + score;
});

