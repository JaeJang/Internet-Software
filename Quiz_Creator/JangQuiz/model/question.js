var Question  = function(num)
{
	this.num = num;
	this.div = null;
	this.questionDiv = null;
	this.textarea = null;
	this.deleteButton = null;
	this.checkboxes = [];
	this.answers = [];
	this.errDiv = null;
	this.init();
	
}

Question.prototype = 
{
	//Initialize the Question object
	init : function()
	{
		this.createElements();
	},
	
	//Create all elements needed to make quizzes
	createElements : function()
	{
		this.div = document.createElement('div');
		this.textarea = document.createElement('textarea');
		this.textarea.rows = "3";
		this.textarea.className = "form-control form-control-lg"
		for(let i = 0; i < 4; ++i)
		{
			
			let input = document.createElement('input');
			input.type="radio";
			input.name = this.num;
			//input.id = 'a_r' + i;
			//input.dataset.indexNumber = i;
			//input.className = "form-check-input";
			this.checkboxes.push(input)
			
			let a = document.createElement('input');
			a.type = "text";
			//a.id = 'a_t' + i;
			a.className = "input_text";
			this.answers.push(a);
			
		}
		
		let p_a = document.createElement('p');
		p_a.innerHTML = 'Answers*';
		p_a.className = "h6";
		
		this.questionDiv = document.createElement('div');
		this.questionDiv.innerHTML = "Question*";
		this.questionDiv.className = "h6";
		
		this.div.appendChild(this.questionDiv);
		this.div.appendChild(this.textarea);
		this.div.appendChild(p_a);
		
		for(let i = 0; i < 4; ++i)
		{
			
			this.div.appendChild(this.checkboxes[i]);
			this.div.appendChild(this.answers[i]);
			this.div.appendChild(document.createElement('br'))
			this.div.appendChild(document.createElement('br'))
		}
		
	},
	
	//Check if all blanks are filled and one correct answer is checked
	//Return true if it's good to go
	//If it's false, add error messages to the question div
	checkBlanks: function()
	{
		let check = true;
		let errMessage = [];
		if(this.textarea.value == '')
		{
			check = false;
		}
		for(let i = 0; i < this.answers.length; ++i)
		{
			if(this.answers[i].value == '')
			{
				check = false;
			}
		}
		if(!check)
		{
			errMessage.push("All blanks must be filled");
		}
		
		
		let checkCheckboxes = false;
		for(let i = 0; i < this.checkboxes.length; ++i)
		{
			if(this.checkboxes[i].checked === true )
			{
				checkCheckboxes = true;
			}
		}
		if(!checkCheckboxes)
		{
			errMessage.push("One answer must be selected");
		}
		
		
		if(check && checkCheckboxes)
		{
			this.removeErrorMes();
			return true;
		}
		
		this.addErrorMes(errMessage);
		return false;
		
	},
	
	//Add passed messages to the question div
	addErrorMes: function(errMessage)
	{
		this.removeErrorMes();
		this.errDiv = document.createElement('div');
		for(let i = 0; i < errMessage.length; ++i)
		{
			let p = document.createElement('p');
			p.style.color = "red";
			p.className = "h5";
			p.innerHTML = errMessage[i];
			this.errDiv.appendChild(p);
			this.errDiv.appendChild(document.createElement('br'));
			
		}
		this.div.appendChild(this.errDiv);
	},
	
	//Remove error messages
	removeErrorMes: function()
	{
		if(this.errDiv !== null)
		{
			this.div.removeChild(this.errDiv);
			this.errDiv = null;
		}
	},
	
	//Add 'x' buttons next to 'Question' string to delete question
	addDeleteButton: function(e)
	{
		
		this.deleteButton = e;
		this.questionDiv.appendChild(this.deleteButton);
	},
	
	//Remove 'x' buttons that delete the question
	deleteDeleteButton: function()
	{
		if(this.deleteButton !== null)
		{
			this.questionDiv.removeChild(this.deleteButton);
			this.deleteButton = null;			
		}
	},
	
	//Set the question number
	setNum: function(num)
	{
		this.num = num;
		for(let i = 0; i < this.checkboxes.length; ++i)
		{
			this.checkboxes[i].name = this.num;
		}
	},
	
	//Return the question number
	getNum: function()
	{
		return this.num;
	},
	
	//Return the question
	getQuestion: function()
	{
		return this.textarea.value;
	},
	
	//Return answers
	getAnswers: function()
	{
		let a = [];
		for(let i = 0; i < this.answers.length; ++i)
		{
			a.push(this.answers[i].value);
		}
		return a;
	},
	
	//Return the correct answers index
	getCorrectAnswerIndex: function()
	{
		let index = -1;
		for(let i = 0; i < this.checkboxes.length; ++i)
		{
			if(this.checkboxes[i].checked)
			{
				index = i;
				break;
			}	
		}
		return index;
	},
	
	//Return the div what contains all of question information
	getDiv: function()
	{
		return this.div;
	}
}