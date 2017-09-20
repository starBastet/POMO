define(
	function ()
	{
		function TextButton()
		{
			// defined by the specific btn class that extends this:
			this.elemType;
			this.className;
			
			// the generic btn's content:
			this.container;
			
			// the btn container
			this.container = document.createElement(this.elemType);
			this.container.className = this.className;
			
			this.create();
		}
		
		TextButton.prototype.create = function()
		{
			this.addItemFunc();
		}
		
		TextButton.prototype.addItemFunc = function()
		{
			$(this.container).mouseenter(this.itemOver);
			$(this.container).mouseleave(this.itemOut);
			$(this.container).mousedown(this.itemDown);
			$(this.container).css({cursor:'pointer'});
		}
		
		TextButton.prototype.removeItemFunc = function()
		{
			$(this.container).unbind('mouseenter');
			$(this.container).unbind('mouseleave');
			$(this.container).unbind('mousedown');
			$(this.container).css({cursor:'default'});
		}
		
		TextButton.prototype.callRemoval = function()
		{
			this.removeItemFunc();
			$(this.container).animate({opacity:0},function(){
				this.parentNode.removeChild(this);
			});
		}
		
		
		return TextButton;
	}
)