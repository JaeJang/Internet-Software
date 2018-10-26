var Model = function()
{
	this.index_question = 0;
	this.questionArray = [];
	
	this.init();
}

Model.prototype = 
{
	//Initialize the model
	//If there is a quiz in localStorge, it is loaded and Admin can modify it
	//If there is no quiz saved, create a new question
	init: function()
	{
		let loadQuiz = localStorage.getItem('quiz');
		if(loadQuiz === null)
			this.questionArray.push(new Question(++this.index_question));
		else
		{
			this.loadQuiz(JSON.parse(loadQuiz));
		}
		
	},
	
	//Set view
	setView: function(view)
	{
		this.view = view;
		this.view.update();
	},
	
	//Add question
	addQuestion: function()
	{
		this.questionArray.push(new Question(++this.index_question));
		this.view.update();
	},
	
	//Set values in the input elements with the loaded quiz
	loadQuiz: function(quizzes)
	{
		for(x in quizzes)
		{
			let correctA = quizzes[x]['correct'];
			let newQ = new Question(x);
			newQ.textarea.value = quizzes[x]['question'];
			for(let i = 0; i < newQ.answers.length; ++i)
			{
				newQ.answers[i].value = quizzes[x][i];
				if(i === correctA)
				{
					newQ.checkboxes[i].checked = true;
				}
			}
			++this.index_question
			this.questionArray.push(newQ);
			
		}
	},
	
	//Store the quiz formatted in JSON to localStorage
	storeQuiz: function()
	{
		let jsonArr = {};
		for(let i = 0; i < this.questionArray.length; ++i)
		{
			let json = {};
			json['question'] = this.questionArray[i].getQuestion();
			
			let answers = this.questionArray[i].getAnswers();
			for(let j = 0; j < answers.length; ++j)
			{
				json[j] = answers[j];
			}
			
			json['correct'] = this.questionArray[i].getCorrectAnswerIndex();
			
			jsonArr[this.questionArray[i].getNum()] = json;
		}
		
		localStorage.setItem('quiz', JSON.stringify(jsonArr));
		
	},
	
	//Create delete buttons for each questions 
	//and set eventListener
	addDeleteButton: function()
	{
		for(let i = 0; i < this.questionArray.length; ++i)
		{
			let tempB = document.createElement('button');
			tempB.className = "delButton"
			tempB.innerHTML = "X";
			tempB.dataset.Qnumber = this.questionArray[i].getNum();
			tempB.addEventListener('click', function(evt){
				let num = evt.target.dataset.Qnumber -1;
				this.questionArray.splice(num, 1);
				for(let i = num; i < this.questionArray.length; ++i)
				{
					let tmp = this.questionArray[i].getNum();
					this.questionArray[i].setNum(--tmp);
				}
				--this.index_question;
				
				if(this.questionArray.length === 0)
				{
					this.questionArray.push(new Question(++this.index_question));
					document.querySelector('#delete').dataset.clicked = 'false';
					this.deleteDeleteButton();
				}
				
				this.view.removeContents();
				this.view.update();
			}.bind(this));
			
			this.questionArray[i].addDeleteButton(tempB);
			
		}
		this.view.changeButtonState(true);
		this.view.update();
	},
	
	//Remove delete buttons
	deleteDeleteButton: function()
	{
		for(let i = 0; i < this.questionArray.length; ++i)
		{
			this.questionArray[i].deleteDeleteButton();
		}
		this.view.changeButtonState(false);
		this.view.update();
	},
	
	//Loop through the questions and check if all forms are filled
	checkBlanks: function()
	{
		let check = true;
		for(let i = 0; i < this.questionArray.length; ++i)
		{
			if(!this.questionArray[i].checkBlanks())
			{
				check = false;	
			}
		}
		return check;
	},
	
	//Retrieve divs from the question objects
	getQuestionsDiv: function()
	{
		let divArray = [];
		for(let i = 0; i < this.questionArray.length; ++i)
		{
			divArray.push(this.questionArray[i].getDiv());
		}
		return divArray;
	}
}