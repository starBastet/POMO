define(
	function()
	{
		var _svgField; // _this
		
		function SVGField(className,amount)
		{
			_svgField = this;
			this.className = className;
			this.amount = amount;
			
			this.container;
			this.itemA = [];
			
			
			this.container = document.createElement('div');
			this.container.id = 'svgFieldContainer';
			
			this.init();
		}
		
		SVGField.prototype.init = function()
		{
			this.createAssets();
			this.animateIn();
		}
		
		SVGField.prototype.createAssets = function()
		{
			for (var i=0;i<this.amount;i++)
			{
				var asset = document.createElement('div');
				asset.className = this.className + ' ' + this.className + (i+1);
				this.container.appendChild(asset);
				this.itemA.push(asset);
			}
		}
		
		SVGField.prototype.animateIn = function()
		{
			$(this.container).animate({opacity:1},3000);
		}
		
		SVGField.prototype.callRemoval = function()
		{
			$(this.container).animate({opacity:0},1000,function(){
				$(this).trigger('svgFieldRemoved');
			});
		}
		
		return SVGField;
	}
)