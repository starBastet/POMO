define(
	function()
	{
		var _branding; // _this
		
		function Branding(text)
		{
			_branding = this;
			this.text = text;
			
			this.container;
			this.icon;
			this.brandingText;
			
			
			this.container = document.createElement('div');
			this.container.id = 'brandingContainer';
			
			this.init();
		}
		
		Branding.prototype.init = function()
		{
			this.createBranding();
			this.animateIn();
		}
		
		Branding.prototype.createBranding = function()
		{
			this.icon = document.createElement('div');
			this.icon.className = 'brandingIcon';
			this.container.appendChild(this.icon);
			
			this.brandingText = document.createElement('p');
			this.brandingText.className = 'brandingText';
			$(this.brandingText).html(this.text);
			this.container.appendChild(this.brandingText);
		}
		
		Branding.prototype.animateIn = function()
		{
			$(this.container).animate({opacity:1},2000);
			
			//$(this.brandingText).animate({color:'#333333'},2000);
		}
		
		Branding.prototype.animateColor = function(color)
		{
			$(this.brandingText).animate({color:color},2000);
			$(this.icon).animate({'background-color':color},2000);
		}
		
		return Branding;
	}
)