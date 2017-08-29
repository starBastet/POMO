define(
	function()
	{
		var _blurb;
		
		function Blurb(text,className)
		{
			_blurb = this;
			
			this.text = text;
			this.className = className;
			
			this.container;
			
			this.container = document.createElement('p');
			this.container.className = this.className;
			$(this.container).html(this.text);
		}
		
		return Blurb;
	}
)