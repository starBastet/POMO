define(
	[
		'app/util/TextButton'
	],
	function(TextButton)
	{
		var _textBtn;
		
		function TextBtn(str)
		{
			_textBtn = this;
			this.str = str;
			
			// passed to the model Button class:
			this.elemType = 'div';
			this.className = 'longRestBtn';
			
			// vars relevant only to this type of btn:
			this.animDist = 10;
			
			// extend the Button model
			TextButton.call(this);
			
			this.init();
		}
		
		TextBtn.prototype = Object.create(TextButton.prototype);
		
		TextBtn.prototype.init = function()
		{
			this.removeItemFunc();
			this.createText();
			this.animateIn();
		}
		
		TextBtn.prototype.createText = function()
		{
			var p = document.createElement('p');
			$(p).html(this.str);
			this.container.appendChild(p);
		}
		
		TextBtn.prototype.animateIn = function()
		{
			$(this.container).stop(true,false).delay(500).animate({opacity:.5},400,function(){
				_textBtn.addItemFunc();
			});
		}
		
		TextBtn.prototype.itemOver = function(e)
		{
			$(this).stop(true,false).animate({opacity:.9},300);
		}
		
		TextBtn.prototype.itemOut = function(e)
		{
			$(this).stop(true,false).animate({opacity:.5},300);
		}
		
		TextBtn.prototype.itemDown = function(e)
		{
			$(this).trigger('textBtnClicked');
		}
		
		return TextBtn;
	}
)