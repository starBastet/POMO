define(
	function()
	{
		function Box(className)
		{
			this.container;
			
			this.container = document.createElement('div');
			this.container.className = className;
		}
		
		return Box;
	}
)