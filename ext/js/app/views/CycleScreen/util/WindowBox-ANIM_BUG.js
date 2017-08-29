define(
	function()
	{
		var _windowBox;
		
		function WindowBox(text,className)
		{
			_windowBox = this;
			
			this.text = text;
			this.className = className;
			
			this.container;
			this.CONTAINER_H;
			this.blurbA = [this.text,''];
			this.virgin = true;
			
			this.container = document.createElement('div');
			this.container.className = (this.className+'WindowBox');
			this.CONTAINER_H = $(this.container).height();
			
			this.init();
		}
		
		WindowBox.prototype.init = function()
		{
			this.createBlurbs();
			this.animateBlurbs();
		}
		
		WindowBox.prototype.createBlurbs = function()
		{
			for (var i=0;i<this.blurbA.length;i++)
			{
				var blurb = document.createElement('p');
				blurb.className = this.className;
				$(blurb).css({top:this.CONTAINER_H+'px'});
				$(blurb).html(this.blurbA[i]);
				this.blurbA[i] = blurb;
				this.container.appendChild(blurb);
			}
		}
		
		WindowBox.prototype.animateBlurbs = function()
		{
			var wb = this;
			
			for (var i=0;i<this.blurbA.length;i++)
			{
				var Y = parseFloat($(this.blurbA[i]).css('top'));
				var toY = Y - this.CONTAINER_H;
				if (i === 1)
				{
					$(this.blurbA[i]).animate({top:toY+'px'},(7*(this.CONTAINER_H*2)),function(){
						wb.shiftBlurbs();
					});
				}
				else
				{
					$(this.blurbA[i]).animate({top:toY+'px'},(7*(this.CONTAINER_H*2)));
				}
			}
		}
		
		WindowBox.prototype.swapBlurb = function(newBlurb,color)
		{
			$(this.blurbA[1]).html(newBlurb);
			$(this.blurbA[1]).css({color:color});
			this.animateBlurbs();
		}
		
		WindowBox.prototype.shiftBlurbs = function()
		{
			if (this.virgin === true)
			{
				this.virgin = false;
				return;
			}
			
			$(this.blurbA[0]).css({top:0+'px'});
			$(this.blurbA[1]).css({top:0+'px'});
			this.container.removeChild(this.blurbA[0]);
			this.container.appendChild(this.blurbA[0]);
			
			var shifted = this.blurbA.shift();
			this.blurbA.push(shifted);
		}
		
		return WindowBox;
	}
)