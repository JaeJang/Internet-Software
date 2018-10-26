var Model = function()
{
	this.view = null;
	this.quizzes = null;
	this.numberOfQ = 0;
	this.inputs = [];
	this.answers = [];
	this.answerDivs = [];
	this.questionsArray = [];
	this.init();
}

Model.prototype = 
{
	//Initialize
	//If there is a quiz in localStorage, load it
	//If not, print error message
	init: function()
	{
		//this.view.setModel(this);
		this.quizzes = JSON.parse(localStorage.getItem('jae_quiz'));
		if(this.quizzes === null)
		{
			this.error("NO QUIZ");
			document.querySelector('#submit').style.display = 'none';
		}
		else
			this.createElement();
	},
	
	setView: function(view)
	{
		this.view = view;
		this.view.update();
	},
	
	//Create questions and answers based on loaded JSON object
	createElement: function()
	{	
		for( x in this.quizzes)
		{
			++this.numberOfQ;
			
			let div = document.createElement('div');
			div.id = x;
			
			let questionDiv = document.createElement('div');
			questionDiv.className = "questionDiv";
			let q = this.quizzes[x]['question'].replace(/</g, "&lt;").replace(/>/g, "&gt;");
			
			questionDiv.innerHTML ='Q ' + x + '. '+ q;
			
			div.appendChild(questionDiv);
			let inputs_sub = [];
			let answerDivs_sub = [];
			for(let i = 0; i < 4; ++i)
			{
				
				let tmpDiv = document.createElement('div');
				tmpDiv.className = 'answersDiv';
				let tmpInput = document.createElement('input');
				let tmpLabel = document.createElement('label');
				tmpInput.type = 'radio';
				tmpInput.name = x;
				tmpLabel.className = "answer_label";
				let str = this.quizzes[x][i];
				tmpLabel.innerHTML = str;
				inputs_sub.push(tmpInput);
				answerDivs_sub.push(tmpDiv);
				
				tmpDiv.appendChild(tmpInput);
				tmpDiv.appendChild(tmpLabel);
				div.appendChild(tmpDiv);
				div.appendChild(document.createElement('br'));
			}
			this.answerDivs.push(answerDivs_sub);
			this.inputs.push(inputs_sub);
			
			
			this.questionsArray.push(div);
			
			this.answers.push(this.quizzes[x]['correct']);
		}
		
		//this.view.update();
	},
	
	//Return divs that have all elements
	getQuestionsDiv: function()
	{
		return this.questionsArray;
	},
	
	//Check if all questions are answered
	check: function()
	{
		let count = 0;
		for(let i = 0; i < this.inputs.length; ++i)
		{
			for(let j = 0; j < this.inputs[i].length; ++j)
			{
				if(this.inputs[i][j].checked)
				{
					++count;
					break;
				}
			}
		}
		
		return this.numberOfQ === count ? true : false;
	},
	
	//Check answers
	//If it's correct, mark with green border
	//If it's wrong, mark with red border
	submit: function(target)
	{
		let score = 0;
		for(let i = 0; i < this.inputs.length; ++i)
		{	
			let checkedA = 0;
			for(let j = 0; j < this.inputs[i].length; ++j)
			{
				if(this.inputs[i][j].checked)
				{
					checkedA = j;
					break;
				}
			}
			if(this.quizzes[i+1]['correct'] === checkedA)
			{
				this.answerDivs[i][checkedA].style.border = 'thick solid green';
				++score;
			}
			else
			{
				this.answerDivs[i][checkedA].style.border = 'thick solid red';
				this.answerDivs[i][this.quizzes[i+1]['correct']].style.border = 'thick solid green';
			}
		}
		
		let scoreDiv = document.createElement('div');
		scoreDiv.className = "text-center display-3";
		scoreDiv.style.marginBottom = '10px';
		scoreDiv.innerHTML = 'Score: ' + score + ' / ' + this.numberOfQ;
		this.questionsArray.push(scoreDiv);
		this.view.update();
		this.questionsArray.pop();
		
		target.disabled = true;
	},
	
	//Print error message to the view
	error: function(text)
	{
		let div = document.createElement('div');
		div.className = "h5 text-center";
		div.innerHTML = text;
		div.style.color = 'red';
		this.questionsArray.push(div);
		
		
		
		//this.questionsArray.pop();
	}
}



















