define(
	[
		'app/views/StartScreen/util/InputField',
		'app/views/util/ArrowBtn'
	],
	function(InputField,ArrowBtn)
	{
		var _taskPrompt;
		
		function TaskPrompt(text,inputMax)
		{
			_taskPrompt = this;
			
			this.text = text;
			this.inputMax = inputMax;
			
			this.container;
			this.inputField;
			this.arrowBtn;
			this.enteredText;
			
			this.container = document.createElement('div');
			this.container.id = 'taskPromptContainer';
			
			this.init();
		}
		
		TaskPrompt.prototype.init = function()
		{
			this.createInputField();
			this.createArrowBtn();
			this.addListeners();
			
			$(this.container).animate({opacity:1},1300);
		}
		
		TaskPrompt.prototype.createInputField = function()
		{
			this.inputField = new InputField(this.text,this.inputMax);
			this.container.appendChild(this.inputField.container);
		}
		
		TaskPrompt.prototype.createArrowBtn = function()
		{
			this.arrowBtn = new ArrowBtn();
			this.container.appendChild(this.arrowBtn.container);
		}
		
		TaskPrompt.prototype.addListeners = function()
		{
			$(this.container).on('arrowBtnClicked',this.startBtnClicked);
		}
		
		TaskPrompt.prototype.removeListeners = function()
		{
			$(this.container).off('arrowBtnClicked',this.startBtnClicked);
		}
		
		TaskPrompt.prototype.startBtnClicked = function(e)
		{
			_taskPrompt.arrowBtn.removeItemFunc();
			_taskPrompt.removeListeners();
			_taskPrompt.enteredText = _taskPrompt.inputField.inputField.value;
		}
		
		TaskPrompt.prototype.callRemoval = function()
		{
			this.removeListeners();
			this.inputField.callRemoval();
		}
		
		return TaskPrompt;
	}
)