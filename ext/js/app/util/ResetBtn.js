define(
	[
		'app/util/Button'
	],
	function (Button)
	{
		var _resetBtn;
		
		function ResetBtn()
		{
			_resetBtn = this;
			
			// passed to the model Button class:
			this.elemType = 'div';
			this.className = 'resetBtn';
			this.labelStr = 'RESET';
			this.labelClassName = 'resetBtnLabel';
			this.boxClassName = 'resetBtnBox';
			
			// vars relevant only to this type of btn:
			
			// extend the Button model:
			Button.call(this);
			
			this.init();
		}
		
		ResetBtn.prototype = Object.create(Button.prototype);
		
		ResetBtn.prototype.init = function()
		{
			
		}
		
		ResetBtn.prototype.itemOver = function(e)
		{
			_resetBtn.box.container.className += ' resetOver';
		}
		
		ResetBtn.prototype.itemOut = function(e)
		{
			_resetBtn.box.container.className = _resetBtn.boxClassName;
		}
		
		ResetBtn.prototype.itemDown = function(e)
		{
			$(this).trigger('resetClicked');
		}
		
		
		return ResetBtn;
	}
)