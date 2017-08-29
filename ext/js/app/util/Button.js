define(
	[
		'app/util/Box',
		'app/util/Label'
	],
	function (Box,Label)
	{
		function Button()
		{
			// defined by the specific btn class that extends this:
			this.elemType;
			this.className;
			this.labelStr;
			this.labelClassName;
			this.boxClassName;
			
			// the generic btn's content:
			this.container;
			this.box;
			this.label;
			
			// the btn container
			this.container = document.createElement(this.elemType);
			this.container.className = this.className;
			
			this.create();
		}
		
		Button.prototype.create = function()
		{
			this.createBox();
			this.createLabel();
			this.addItemFunc();
		}
		
		Button.prototype.createBox = function()
		{
			this.box = new Box(this.boxClassName);
			this.container.appendChild(this.box.container);
		}
		
		Button.prototype.createLabel = function()
		{
			this.label = new Label(this.labelStr,this.labelClassName);
			this.box.container.appendChild(this.label.container);
		}
		
		Button.prototype.addItemFunc = function()
		{
			$(this.container).mouseenter(this.itemOver);
			$(this.container).mouseleave(this.itemOut);
			$(this.container).mousedown(this.itemDown);
			$(this.container).css({cursor:'pointer'});
		}
		
		Button.prototype.removeItemFunc = function()
		{
			$(this.container).unbind('mouseenter');
			$(this.container).unbind('mouseleave');
			$(this.container).unbind('mousedown');
			$(this.container).css({cursor:'default'});
		}
		
		
		return Button;
	}
)