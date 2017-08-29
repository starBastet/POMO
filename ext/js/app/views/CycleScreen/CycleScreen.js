define(
	[
		'app/views/CycleScreen/util/WindowBox',
		'app/views/CycleScreen/util/Clock',
		'app/views/CycleScreen/util/StatusBar',
		'app/views/CycleScreen/util/Resetter',
		'app/views/util/ArrowBtn',
		'app/views/CycleScreen/util/SVGField'
	],
	function (WindowBox,Clock,StatusBar,Resetter,ArrowBtn,SVGField)
	{
		var _cycleScreen;
		
		function CycleScreen(JSON_A,enteredText)
		{
			_cycleScreen = this;
			this.JSON_A = JSON_A;
			this.enteredText = enteredText;
			
			this.container;
			this.ITERATION_MAX = JSON_A.ITERATION_MAX;
			this.currIteration = 0;
			this.PHASE_NUM = 0; // 0: FOCUS, 1: REST, 2: LONG_REST
			this.PHASE_A = [this.JSON_A.FOCUS,this.JSON_A.REST,this.JSON_A.LONG_REST];
			
			this.blurbA = 	[
								[JSON_A.FOCUS.TEXT_A[0],'cycleBlurbMain'],
								[this.enteredText,'cycleBlurbTask']
							];
			this.clock;
			this.statusBar;
			this.continueBtn;
			this.resetter;
			this.svgField;
			
			
			this.container = document.createElement('div');
			this.container.id = 'cycleContainer';
			
			this.init();
		}
		
		CycleScreen.prototype.init = function()
		{
			this.createBlurbs();
			this.createClock();
			this.createStatusBar();
			this.createResetter();
			
			this.addListeners();
		}
		
		CycleScreen.prototype.createSvgField = function()
		{
			if (this.PHASE_NUM != 0)
			{
				if (this.svgField != null) // typeof this.svgField !== 'undefined' || 
				{
					this.removeSvgField();
				}
			
				this.svgField = new SVGField(this.PHASE_A[this.PHASE_NUM].SVG_DETAILS.CLASS_NAME,this.PHASE_A[this.PHASE_NUM].SVG_DETAILS.AMOUNT);
			this.container.appendChild(this.svgField.container);
			}
		}
		
		CycleScreen.prototype.callToRemoveSvgField = function()
		{
			if (this.svgField != null) // typeof this.svgField !== 'undefined' || 
			{
				this.svgField.callRemoval();
			}
		}
		
		CycleScreen.prototype.removeSvgField = function(e=null)
		{
			//var t = e.target;
			_cycleScreen.container.removeChild(_cycleScreen.svgField.container); //t
			_cycleScreen.svgField = null;
		}
		
		CycleScreen.prototype.createBlurbs = function()
		{
			for (var i=0;i<this.blurbA.length;i++)
			{
				this.blurbA[i] = new WindowBox(this.blurbA[i][0],this.blurbA[i][1]);
				this.container.appendChild(this.blurbA[i].container);
			}
		}
		
		CycleScreen.prototype.callToSwapBlurbs = function(remove=false)
		{
			for (var i=0;i<this.blurbA.length;i++)
			{
				var str = this.PHASE_A[this.PHASE_NUM].TEXT_A[i];
				if (remove === true)
				{
					str = '';
				}
				else if (this.PHASE_NUM === 2 && i === 0)
				{
					str += ' '+ this.enteredText + '!';
				}
				var color = this.PHASE_A[this.PHASE_NUM].TEXT_COLOR_A[i];
				this.blurbA[i].swapBlurb(str,color);
			}
		}
		
		CycleScreen.prototype.createClock = function()
		{
			this.clock = new Clock(this.PHASE_A[this.PHASE_NUM].TIME);
			this.container.appendChild(this.clock.container);
		}
		
		CycleScreen.prototype.createStatusBar = function()
		{
			this.statusBar = new StatusBar(this.ITERATION_MAX);
			this.container.appendChild(this.statusBar.container);
		}
		
		CycleScreen.prototype.addListeners = function()
		{
			$(this.container).on('phaseChanged',this.phaseChange);
			$(this.container).on('statusBarRemoved',this.removeStatusBar);
			$(this.container).on('svgFieldRemoved',this.removeSvgField);
		}
		
		CycleScreen.prototype.removeListeners = function()
		{
			$(this.container).off('phaseChanged',this.phaseChange);
			$(this.container).off('statusBarRemoved',this.removeStatusBar);
			$(this.container).off('svgFieldRemoved',this.removeSvgField);
		}
		
		CycleScreen.prototype.phaseChange = function(e)
		{
			if (_cycleScreen.PHASE_NUM === 2)
			{
				_cycleScreen.callRemoval();
				return;
			}
			else if (_cycleScreen.PHASE_NUM === 0)
			{
				_cycleScreen.PHASE_NUM = 1;
			}
			else
			{
				_cycleScreen.PHASE_NUM = 0;
				_cycleScreen.currIteration++;
			}
			
			if (_cycleScreen.currIteration === _cycleScreen.ITERATION_MAX-1 && _cycleScreen.PHASE_NUM === 1)
			{
				_cycleScreen.PHASE_NUM = 2;
			}
			
			if (_cycleScreen.PHASE_NUM === 0)
			{
				_cycleScreen.createContinueBtn();
			}
			else
			{
				_cycleScreen.continueAfterRest();
			}
			
			_cycleScreen.createSvgField();
		}
		
		CycleScreen.prototype.createContinueBtn = function()
		{
			if (this.continueBtn != null)
			{
				this.continueBtn.callRemoval();
				this.continueBtn = null;
			}
			this.continueBtn = new ArrowBtn('continueBtn');
			this.clock.container.appendChild(this.continueBtn.container);
			$(this.container).on('arrowBtnClicked',this.continueBtnClicked);
		}
		
		CycleScreen.prototype.continueBtnClicked = function(e)
		{
			_cycleScreen.continueBtn.callRemoval();
			_cycleScreen.continueBtn = null;
			$(_cycleScreen.container).off('arrowBtnClicked',_cycleScreen.continueBtnClicked);
			_cycleScreen.continueAfterRest();
		}
		
		CycleScreen.prototype.continueAfterRest = function()
		{
			var arr = _cycleScreen.PHASE_A[_cycleScreen.PHASE_NUM];
			
			_cycleScreen.clock.updateTimeDur(arr.TIME);
			_cycleScreen.callToSwapBlurbs();
			_cycleScreen.clock.timeDisplay.animateColor(arr.CLOCK_COLOR);
			_cycleScreen.statusBar.update(_cycleScreen.PHASE_NUM,arr.STATUS_BAR_COLOR);
			_cycleScreen.resetter.changeBtn(_cycleScreen.PHASE_NUM);
			_cycleScreen.callToRemoveSvgField();
			$(this.container).trigger('advancePhase');
		}
		
		CycleScreen.prototype.removeBlurb = function(e)
		{
			_cycleScreen.contiainer.removeChild(_cycleScreen.clock.container);
		}
		
		CycleScreen.prototype.removeClock = function(e)
		{
			_cycleScreen.container.removeChild(_cycleScreen.clock.container);
		}
		
		CycleScreen.prototype.removeStatusBar = function(e)
		{
			if (typeof _cycleScreen.statusBar != 'undefined' || _cycleScreen.statusBar != null)
			{
				_cycleScreen.container.removeChild(_cycleScreen.statusBar.container);
				_cycleScreen.statusBar = null;
			}
		}
		
		CycleScreen.prototype.createResetter = function()
		{
			this.resetter = new Resetter();
			this.container.appendChild(this.resetter.container);
			$(this.container).on('resetBtnClicked',this.resetBtnClicked);
		}
		
		CycleScreen.prototype.resetBtnClicked = function(e)
		{
			$(_cycleScreen.container).off('resetBtnClicked',_cycleScreen.resetBtnClicked);
			_cycleScreen.callRemoval();
		}
		
		CycleScreen.prototype.callRemoval = function()
		{
			this.removeListeners();
			this.callToSwapBlurbs(true);
			this.clock.callRemoval();
			this.resetter.callRemoval();
			
			if (this.statusBar != null) //typeof this.statusBar != 'undefined' || 
			{
				this.statusBar.stopBlinkTimer();
			}
			$(this.container).animate({opacity:0},function(){
				$(this).trigger('cycleScreenRemoved');
			});
		}
		
		return CycleScreen;
	}
)