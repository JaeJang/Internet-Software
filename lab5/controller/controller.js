 var Controller = function(model, view)
 {
	this.model = model;
	this.view = view;
	
	this.init();
 }
 
 Controller.prototype = 
 {
	 //Set Views eventListener
	 //Assign the view to model
	 //Assign this controller to view
	init: function()
	{
		this.setViewEventListeners();
		this.model.setView(view);
		this.view.setController(this);
	},
	
	//Set Views eventLisnters
	setViewEventListeners: function()
	{
		//ADMIN SIDE
		if(PAGE === 'admin.html')
		{
			this.addEventHandler = this.addEvent.bind(this);
			this.deleteEventHandler = this.deleteEvent.bind(this);
			this.saveEventHandler = this.saveEvent.bind(this);
			
			this.view.setButtonEvent('#add',this.addEventHandler);
			this.view.setButtonEvent('#delete',this.deleteEventHandler);
			this.view.setButtonEvent('#save',this.saveEventHandler);

			window.onbeforeunload = (e)=>{
				var dialogText = 'Do you really want to leave this site?';
  	 			 e.returnValue = dialogText;
    			return dialogText;
			 };
		}
		//USER SIDE
		else
		{
			this.submitHandler = this.submitEvent.bind(this);
			this.startHandler = this.startEvent.bind(this);
			this.backHandler = this.backEvent.bind(this);
			this.view.setButtonEvent('#submit', this.submitHandler);
			this.view.setButtonEvent('#start', this.startHandler);
			this.view.setButtonEvent('#back', this.backHandler);
		}
	},
	
	//Add buttons event
	addEvent: function()
	{
		this.view.removeContents();
		this.model.addQuestion();
	},
	
	//Delete buttons event
	deleteEvent: function(evt)
	{
		this.view.removeContents();
		if(evt.target.dataset.clicked == 'false')
		{
			evt.target.dataset.clicked = 'true';
			this.model.addDeleteButton();
		}
		else
		{
			evt.target.dataset.clicked = 'false';
			this.model.deleteDeleteButton();
		}
	},
	
	//Save buttons event
	saveEvent: function()
	{
		if(this.model.checkBlanks())
		
			this.model.storeQuiz();
		
	},
	
	//USER SIDE
	//Submit buttons event
	submitEvent: function(evt)
	{
		this.view.removeContents();
		if(this.model.check())
		{
			this.model.submit(evt.target);
		}	
		else
		{
			this.model.error("All qustions must be answered");
		}
		
	},

	//USER SIDE
	//Start buttons event
	startEvent: function()
	{	
		let check = this.view.checkDifficulty();
		if(check[0])
		{
			this.model.startQuiz(check[1]);
		}
		else
		{
			this.view.enableElement('#difficulty_select_error');
			//this.view.difficulty_select_error();
		}
	},

	//USER SIDE
	//Back button event
	backEvent: function()
	{
		this.model.init();
		this.view.removeContents();
		this.view.disableElement('#buttons');
		this.view.disableElement('#difficulty_select_error');
		this.view.enableElement('#difficulty_select');
	}
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 