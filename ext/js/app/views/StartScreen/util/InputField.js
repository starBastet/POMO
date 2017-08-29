define(
	function()
	{
		var _inputField;
		
		function InputField(text,inputMax)
		{
			_inputField = this;
			
			this.text = text;
			this.inputMax = inputMax;
			
			this.container;
			this.inputField;
			
			this.container = document.createElement('div');
			this.container.id = 'inputFieldContainer';
			
			this.init();
		}
		
		InputField.prototype.init = function()
		{
			this.createInputField();
			this.addItemFunc();
		}
		
		InputField.prototype.createInputField = function()
		{
			this.inputField = document.createElement('input');
			this.inputField.type = 'text';
			this.inputField.id = 'inputField';
			this.inputField.value = this.text;
			this.inputField.maxLength = this.inputMax;
			this.container.appendChild(this.inputField);
		}
		
		InputField.prototype.addItemFunc = function()
		{
			$(this.container).mousedown(this.clearField);
			$(this.inputField).keyup(this.checkForEnter);
		}
		
		InputField.prototype.removeItemFunc = function()
		{
			$(this.inputField).blur();
			$(this.container).unbind('mousedown');
			$(this.inputField).unbind('keyup');
			
			this.enteredText = this.inputField.value;
		}
		
		InputField.prototype.clearField = function(e)
		{
			var ct = e.currentTarget;
			$(ct).unbind('mousedown');
			_inputField.inputField.value = '';
			$(_inputField.inputField).focus();
		}
		
		InputField.prototype.checkForEnter = function(e)
		{
			var kc = e.keyCode;
			if (kc == 13)
			{
				$(this).trigger('arrowBtnClicked');
			}
		}
		
		InputField.prototype.callRemoval = function()
		{
			this.removeItemFunc();
		}
		
		return InputField;
	}
)