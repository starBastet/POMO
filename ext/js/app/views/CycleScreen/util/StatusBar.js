define(
	function()
	{
		var _statusBar;
		
		function StatusBar(iterationMax)
		{
			_statusBar = this;
			this.ITERATION_MAX = iterationMax;
			
			this.container;
			this.dotsA = [];
			this.currDotNum = 0;
			this.timer;
			this.currDotOpacity = 0;
			
			this.container = document.createElement('ul');
			this.container.id = 'statusBarContainer';
			$(this.container).html(this.text);
			
			this.init();
		}
		
		StatusBar.prototype.init = function()
		{
			this.createDots();
			var W = $(this.dotsA[0]).width();
			$(this.container).css({left:(-W)+'px'});
		}
		
		StatusBar.prototype.createDots = function()
		{
			for (var i=0;i<this.ITERATION_MAX;i++)
			{
				var d = document.createElement('li');
				d.className = 'statusDot';
				this.container.appendChild(d);
				this.dotsA.push(d);
				
				var fill = document.createElement('div');
				fill.className = 'statusDotFill';
				d.appendChild(fill);
			}
			
			$(this.dotsA[this.currDotNum]).css({opacity:1});
		}
		
		StatusBar.prototype.update = function(phaseNum,color)
		{
			if (phaseNum === 1)
			{
				this.startBlinkTimer();
				this.animateDotColor(color);
			}
			else if (phaseNum === 0)
			{
				this.stopBlinkTimer();
				this.setCurrDotOpacity(1);
				this.currDotNum++;
				$(this.dotsA[this.currDotNum]).css({opacity:1});
				this.animateDotColor(color);
			}
			else
			{
				this.callRemoval();
			}
		}
		
		StatusBar.prototype.startBlinkTimer = function()
		{
			if (typeof this.timer != 'undefined')
			{
				this.stopBlinkTimer();
			}
			
			this.timer = setInterval(this.blinker,300);
		}

		StatusBar.prototype.stopBlinkTimer = function()
		{
			if (typeof this.timer != 'undefined')
			{
				clearInterval(this.timer);
				this.timer = undefined;
			}
		}

		StatusBar.prototype.blinker = function(e)
		{
			if (_statusBar.currDotOpacity === 1)
			{
				_statusBar.currDotOpacity = 0;
			}
			else
			{
				_statusBar.currDotOpacity = 1;
			}
			
			_statusBar.setCurrDotOpacity();
		}
		
		StatusBar.prototype.setCurrDotOpacity = function(opacity=this.currDotOpacity)
		{
			/*var currColor = $(this.dotsA[this.currDotNum]).css('background-color');
			var lastComma = currColor.lastIndexOf(',');
			var newColor = String(currColor.slice(0,lastComma+1) + opacity + ")");
			$(this.dotsA[this.currDotNum]).css({'background-color':newColor});
			*/
			
			$(this.dotsA[this.currDotNum].firstChild).css({opacity:opacity});
		}
		
		StatusBar.prototype.animateDotColor = function(color)
		{
			for (var i=0;i<this.dotsA.length;i++)
			{
				$(this.dotsA[i]).animate({'border-color':color});
				$(this.dotsA[i].firstChild).animate({'background-color':color},900);
			}
		}
		
		StatusBar.prototype.callRemoval = function()
		{
			this.stopBlinkTimer();
			this.setCurrDotOpacity(1);
				
			$(this.container).animate({opacity:0},function(){
				$(this).trigger('statusBarRemoved');
			});
		}
		
		return StatusBar;
	}
)