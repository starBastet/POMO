define(
	[
		'app/views/util/ArrowBtn'
	],
	function(ArrowBtn)
	{
		var _resetter;
		
		function Resetter()
		{
			_resetter = this;
			
			this.container;
			this.btn;
			this.btnBkgnd;
			
			
			this.container = document.createElement('div');
			this.container.id = 'resetterContainer';
			
			this.init();
		}
		
		Resetter.prototype.init = function()
		{
			this.createBtn();
			this.showBtn();
		}
		
		Resetter.prototype.createBtn = function()
		{
			this.btnBkgnd = document.createElement('div');
			this.btnBkgnd.id = 'restartBtnBkgnd';
			this.container.appendChild(this.btnBkgnd);
			
			this.btn = new ArrowBtn('restartBtn');
			this.container.appendChild(this.btn.container);
			$(this.container).on('arrowBtnClicked',this.btnClicked);
		}
		
		Resetter.prototype.btnClicked = function(e)
		{
			e.stopPropagation();
			_resetter.btn.callRemoval();
			_resetter.btn = null;
			$(_resetter.container).trigger('resetBtnClicked');
		}
		
		Resetter.prototype.showBtn = function()
		{
			$(this.container).animate({opacity:1},1000);
			
			// BROKEN COORDINATE ANIMS:
			/*
			var Y = $(this.container).css('top');
			$(this.container).css({top:-100+'px'});
			$(this.container).animate({opacity:1,top:'40px'},1000); // 40px shouldn't be string...
																  // but CEs suck	
			*/
		}
		
		Resetter.prototype.changeBtn = function(phaseNum)
		{
			var opac = 0;
			
			if (phaseNum === 0)
			{
				opac = .5;
			}
			$(this.btnBkgnd).animate({opacity:opac},1000);
		}
		
		Resetter.prototype.callRemoval = function()
		{
			$(this.container).animate({opacity:0},200,function(){
				this.parentNode.removeChild(this);
			});
			
			// BROKEN COORDINATE ANIMS:
			/*
			$(this.container).animate({opacity:0,top:-100+'px'},200,function(){
				this.parentNode.removeChild(this);
			});
			*/
		}
		
		return Resetter;
	}
)