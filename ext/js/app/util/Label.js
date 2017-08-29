define(
	function()
	{
		function Label(labelStr,className)
		{
			this.container;
			
			this.container = document.createElement('p');
			this.container.className = className;
			
			$(this.container).html(labelStr);
		}
		
		return Label;
	}
)