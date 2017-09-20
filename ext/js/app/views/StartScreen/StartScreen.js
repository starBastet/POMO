define(
	[
		'app/views/util/Blurb',
		'app/views/util/TaskPrompt'
	],
	function (Blurb,TaskPrompt)
	{
		var _startScreen;
		
		function StartScreen(JSON_A)
		{
			_startScreen = this;
			this.JSON_A = JSON_A;
			
			this.container;
			this.blurbA = [
								[this.JSON_A.WELCOME_TEXT,'startScreenBlurbMain'],
								[this.JSON_A.WELCOME_SUB_TEXT,'startScreenBlurbSub']
							];
			this.taskPrompt;
			this.ANIM_DIST = 40;
			this.BLURB_ANIM_DUR = 500;
			this.BLURB_ANIM_DUR_DIFF = 200;
			this.enteredText;
			
			this.container = document.createElement('div');
			this.container.id = 'startScreenContainer';
			
			this.init();
		}
		
		StartScreen.prototype.init = function()
		{
			this.createBlurbs();
			this.createTaskPrompt();
			this.addListeners();
			this.animateIn();
		}
		
		StartScreen.prototype.createBlurbs = function()
		{
			for (var i=0;i<this.blurbA.length;i++)
			{
				this.blurbA[i] = new Blurb(this.blurbA[i][0],this.blurbA[i][1]);
				this.container.appendChild(this.blurbA[i].container);
			}
		}
		
		StartScreen.prototype.createTaskPrompt = function()
		{
			this.taskPrompt = new TaskPrompt(this.JSON_A.PROMPT_TEXT,this.JSON_A.INPUT_MAX);
			this.container.appendChild(this.taskPrompt.container);
		}
		
		StartScreen.prototype.animateIn = function()
		{
			var dur = this.BLURB_ANIM_DUR;
			
			for (var i=0;i<this.blurbA.length;i++)
			{
				$(this.blurbA[i].container).animate({opacity:1},dur);
				
				// BROKEN COORDINATE ANIMS:
				/*
				var T = parseFloat($(this.blurbA[i].container).css('top'));
				$(this.blurbA[i].container).css({top:(T+this.ANIM_DIST)+'px'});
				$(this.blurbA[i].container).animate({top:T+'px',opacity:1},dur);
				*/
				
				dur += this.BLURB_ANIM_DUR_DIFF;
			}
		}
		
		StartScreen.prototype.addListeners = function()
		{
			$(this.container).on('arrowBtnClicked',this.startBtnClicked);
		}
		
		StartScreen.prototype.removeListeners = function()
		{
			$(this.container).off('arrowBtnClicked',this.startBtnClicked);
		}
		
		StartScreen.prototype.startBtnClicked = function(e)
		{
			_startScreen.enteredText = _startScreen.taskPrompt.enteredText;
			_startScreen.callRemoval();
		}
		
		StartScreen.prototype.callRemoval = function()
		{
			this.removeListeners();
			
			var dur = this.BLURB_ANIM_DUR;
			
			for (var i=0;i<this.blurbA.length;i++)
			{
				$(this.blurbA[i].container).animate({opacity:0},dur);
				
				// BROKEN COORDINATE ANIMS:
				/*
				var T = parseFloat($(this.blurbA[i].container).css('top'));
				$(this.blurbA[i].container).animate({top:(T-this.ANIM_DIST)+'px',opacity:0},dur);
				*/
				dur += this.BLURB_ANIM_DUR_DIFF;
			}
			
			this.taskPrompt.callRemoval();
			$(this.taskPrompt.container).animate({opacity:0},dur,function(){
				for (var i=0;i<_startScreen.blurbA.length;i++)
				{
					_startScreen.container.removeChild(_startScreen.blurbA[i].container);
				}
				_startScreen.container.removeChild(_startScreen.taskPrompt.container);
				$(_startScreen.container).trigger('startScreenRemoved');
			});
			
			$(_startScreen.container).trigger('changeState');
		}
		
		return StartScreen;
	}
)