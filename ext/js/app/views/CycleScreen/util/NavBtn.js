define(
	[
		'app/util/Button'
	],
	function(Button)
	{
		var _navBtn;
		
		function NavBtn(labelStr)
		{
			_navBtn = this;
			
			// passed to the model Button class:
			this.elemType = 'li';
			this.className = 'navBtn';
			this.labelStr = labelStr;
			this.labelClassName = 'navBtnLabel';
			this.boxClassName = 'navBtnBox';
			
			// vars relevant only to this type of btn:
			this.totalHeight;
			this.topY = 0;
			this.downY;
			
			// extend the Button model
			Button.call(this);
			
			this.init();
		}
		
		NavBtn.prototype = Object.create(Button.prototype);
		
		NavBtn.prototype.init = function()
		{
			this.totalHeight = parseFloat($(this.container).css('height'));
			
			var textHeight = parseFloat($(this.label.container).height());
			this.downY = this.totalHeight - textHeight;
			
			this.animateIn();
		}
		
		NavBtn.prototype.animateIn = function()
		{
			this.callAnim(this.downY);
		}
		
		NavBtn.prototype.makeSelected = function()
		{
			this.callAnim(this.topY);
			this.removeItemFunc();
		}
		
		NavBtn.prototype.deselect = function()
		{
			this.callAnim(this.downY);
			this.addItemFunc();
		}
		
		NavBtn.prototype.callAnim = function(toY,elem=this.container)
		{
			$(elem).stop(true,false).animate({top:toY+'px'},150);
		}
		
		NavBtn.prototype.itemOver = function(e)
		{
			_navBtn.callAnim(_navBtn.topY,this);
		}
		
		NavBtn.prototype.itemOut = function(e)
		{
			_navBtn.callAnim(_navBtn.downY,this);
		}
		
		NavBtn.prototype.itemDown = function(e)
		{
			$(this).trigger('btnClicked');
		}
		
		return NavBtn;
	}
)