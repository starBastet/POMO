define(
	[
		'app/util/ImageButton'
	],
	function(ImageButton)
	{
		var _arrowBtn;
		
		function ArrowBtn(classAppend=null)
		{
			_arrowBtn = this;
			this.classAppend = classAppend;
			
			// passed to the model Button class:
			this.elemType = 'div';
			this.className = 'arrowBtn';
			
				if (classAppend != null)
				{
					this.className = this.className+' '+classAppend;
				}
			
			// vars relevant only to this type of btn:
			this.animDist = 10;
			
			// extend the Button model
			ImageButton.call(this);
			
			this.init();
		}
		
		ArrowBtn.prototype = Object.create(ImageButton.prototype);
		
		ArrowBtn.prototype.init = function()
		{
			this.removeItemFunc();
			this.animateIn();
		}
		
		ArrowBtn.prototype.animateIn = function()
		{
			$(this.container).stop(true,false).delay(500).animate({opacity:.5},400,function(){
				_arrowBtn.addItemFunc();
			});
			
			// BROKEN COORDINATE ANIMS:
			/*
			var X;
			var initX;
			
			if (this.classAppend === 'restartBtn')
			{
				$(this.container).stop(true,false).delay(700).animate({opacity:.5},400,function(){
					_arrowBtn.addItemFunc();
				});
			}
			else if (this.classAppend != null)
			{
				X = parseFloat($(this.container).css('left'));
				initX = X - this.animDist;
				$(this.container).css({left:initX+'px'});
				$(this.container).stop(true,false).delay(700).animate({left:X+'px',opacity:.5},400,function(){
					_arrowBtn.addItemFunc();
				});
			}
			else
			{
				X = parseFloat($(this.container).css('right'));
				initX = X + this.animDist;
				$(this.container).css({right:initX+'px'});
				$(this.container).stop(true,false).delay(700).animate({right:X+'px',opacity:.5},400,function(){
					_arrowBtn.addItemFunc();
				});
			}
			*/
		}
		
		ArrowBtn.prototype.itemOver = function(e)
		{
			$(this).stop(true,false).animate({opacity:.9},300);
		}
		
		ArrowBtn.prototype.itemOut = function(e)
		{
			$(this).stop(true,false).animate({opacity:.5},300);
		}
		
		ArrowBtn.prototype.itemDown = function(e)
		{
			$(this).trigger('arrowBtnClicked');
		}
		
		return ArrowBtn;
	}
)