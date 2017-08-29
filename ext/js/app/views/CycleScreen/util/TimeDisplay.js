define(
	function()
	{
		var _timeDisplay;
		
		function TimeDisplay(time)
		{
			_timeDisplay = this;
			
			this.time = time;
			
			this.container;
			
			this.container = document.createElement('p');
			this.container.className = 'timeDisplay';
			
			this.init();
		}
		
		TimeDisplay.prototype.init = function()
		{
			this.createDisplay();
		}
		
		TimeDisplay.prototype.createDisplay = function()
		{
			$(this.container).html(this.time);
			$(this.container).animate({opacity:1});
		}
		
		TimeDisplay.prototype.updateDisplay = function(timeStr)
		{
			$(this.container).html(timeStr);
		}
		
		TimeDisplay.prototype.animateColor = function(color)
		{
			$(this.container).stop(true,false).animate({'color':color},1200);
		}
		
		return TimeDisplay;
	}
)