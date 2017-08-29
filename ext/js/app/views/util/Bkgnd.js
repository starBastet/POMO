define(
	function()
	{
		var _bkgnd;
		
		function Bkgnd(color)
		{
			_bkgnd = this;
			
			this.color = color;
			
			this.container;
			
			this.container = document.createElement('div');
			this.container.id = 'bkgnd';
			$(this.container).css({'background-color':this.color});
			$(this.container).animate({opacity:1});
		}
		
		Bkgnd.prototype.animateColor = function(color)
		{
			$(this.container).stop(true,false).animate({'background-color':color},1200);
		}
		
		return Bkgnd;
	}
)