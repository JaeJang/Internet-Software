const TIME_LIMIT = 60;

var Model = function(view)
{

	this.view = view;
	
	//target word
	this.word = '';
	//guessed words
	this.revealedWord = null;
	//life
	this.life = 7;
	//score
	this.score = 0;
	//number of words guessed
	this.correct = 0;
	
	this.presentedWordList = [];

	this.generateWord();
}

//Checks if the user's guess is right.
//Updates life, printed word
//If the game reaches to the conditions of end of game,
//calls view.end to end this game.
Model.prototype.check = function(alpha)
{
	//let index = this.word.indexOf(alpha);
	let moreThanOne = [];
	let index_mul = 0;
	let index = -1;
	for(let i = 0; i < this.word.length; ++i)
		{
			if(this.word[i] == alpha){
				++index;
				moreThanOne[index] = i;
			}
		}
	//If not matched
	if (index === -1)
	{
		this.life--;
		//this.score--;
		this.view.updatelife_score(this.life,this.score, alpha);
	}
	//If matched
	else
	{	
		//If there are more than one
		if(index >= 1){
			while(index >= 0){
				this.revealedWord[moreThanOne[index]] = alpha.toUpperCase();
				--index;
				this.correct++;
				//this.score++;
			}
		}
		//If there is one matched
		else{
			this.revealedWord[moreThanOne[index]] = alpha.toUpperCase();
			this.correct++;
			//this.score++;
		}
		
		let string = '';
		
		for(let i = 0; i < this.revealedWord.length; ++i)
		{
			if(this.revealedWord[i] === undefined)
				string += ' _ ';
			else
				string += this.revealedWord[i]; 
		}
		
		this.view.updateWord(string, alpha);
		if(this.correct === this.word.length){
			//this.view.end('congratulation! YOU WIN!');
			this.score++;
			setTimeout(()=>{this.reset();},1000);
			
		}
		this.view.updatelife_score(this.life,this.score, null);
	}
	if(this.life === 0){
		//this.view.end("YOU LOSE");
		this.reset();
	}
}

//Select a word from WORD_LIST
//
Model.prototype.generateWord = function()
{
	let len = WORD_LIST.length;
	let ranIndex = 0;
	do
	{
		ranIndex = Math.floor(Math.random() * len);
		this.word = WORD_LIST[ranIndex];
	}
	while(this.presentedWordList.indexOf(this.word) != -1);
	this.revealedWord = new Array(this.word.length);
	let string = '';
	for(let i = 0; i < this.revealedWord.length; i++)
	{
		string += ' _ ';
	}

	this.presentedWordList.push(this.word);
	this.view.updateWord(string);
	this.view.updateDef(DEF[ranIndex]);
}

//Reset word and life
Model.prototype.reset = function()
{
	this.generateWord();
	this.correct = 0;
	this.life = 7;
	this.view.updatelife_score(this.life,this.score, null);
	this.view.resetButtons();
}

Model.prototype.start = function(name)
{
	this.view.disableElement('#first_screen');
	this.view.enableElement('#contents');
	this.name = name;
	this.time = 0;
	this.timer = setInterval(()=>{
		this.view.updateTime(++this.time);
		if(this.time == TIME_LIMIT){
			setTimeout(()=>{
				this.test();		

			},1000);
			clearInterval(this.timer);
		}
	}, 1000);
}

Model.prototype.test = function(){
	this.fade_interval = setInterval(()=>{
		if(!document.querySelector('#fade_out_div').style.opacity)
		{
			this.view.enableElement('#loading_image');

			document.querySelector('#fade_out_div').style.opacity = 1;
			this.score_font_interval = setInterval(()=>{
				let e = document.querySelector('#score');
				let style = window.getComputedStyle(e, null).getPropertyValue("font-size");
				let currentsize = parseFloat(style);
				e.style.fontSize = (currentsize + 2) + 'px';
				
				if(this.fade_done)
					clearInterval(this.score_font_interval);
				
			},20);
		}
		if(document.querySelector('#fade_out_div').style.opacity >0){
			document.querySelector('#fade_out_div').style.opacity -= 0.1;
			
		}
		else{
			document.querySelector('#fade_out_div').style.display='none';
			this.fade_done = true;
			this.getRank();
			clearInterval(this.fade_interval);
		}
	}, 50);
}

Model.prototype.getRank = function()
{
	var model_instance = this;
	let http = new XMLHttpRequest();
	http.open("GET","model/ranking.php?name=" + this.name + "&score=" + this.score, true);
	http.send();
	http.onreadystatechange =function(){
		if(this.readyState == 4 && this.status == 200)
		{
			model_instance.view.disableElement('#loading_image');
			let rankings = JSON.parse(this.responseText);
			model_instance.view.printRank(rankings, model_instance.name);
		}
	};

}