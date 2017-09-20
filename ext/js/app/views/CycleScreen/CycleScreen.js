define(
	[
		'app/views/CycleScreen/util/WindowBox',
		'app/views/CycleScreen/util/Clock',
		'app/views/CycleScreen/util/Resetter',
		'app/views/util/ArrowBtn',
		'app/views/CycleScreen/util/SVGField',
		'app/views/util/TaskPrompt',
		'app/views/util/TextBtn'
	],
	function (WindowBox,Clock,Resetter,ArrowBtn,SVGField,TaskPrompt,TextBtn)
	{
		var _cycleScreen;
		
		function CycleScreen(JSON_A,enteredText)
		{
			_cycleScreen = this;
			this.JSON_A = JSON_A;
			this.enteredText = enteredText;
			
			this.container;
			this.PHASE_NUM = 0; // 0: FOCUS, 1: REST, 2: CRUSHED
			this.PHASE_A = [this.JSON_A.FOCUS,this.JSON_A.REST,this.JSON_A.CRUSHED];
			
			this.blurbA = 	[
								[JSON_A.FOCUS.TEXT_A[0],'cycleBlurbMain'],
								[this.enteredText,'cycleBlurbTask']
							];
			this.clock;
			this.longRestBtn;
			this.resetter;
			this.svgFieldA = [];
			this.taskPrompt;
			
			
			this.container = document.createElement('div');
			this.container.id = 'cycleContainer';
			
			this.init();
		}
		
		CycleScreen.prototype.init = function()
		{
			this.createBlurbs();
			this.createClock();
			this.createResetter();
			
			this.addListeners();
		}
		
		CycleScreen.prototype.createSvgField = function()
		{
			var arr = this.PHASE_A[this.PHASE_NUM].SVG_DETAILS;
			var svgField = new SVGField(arr.CLASS_NAME,arr.AMOUNT);
			this.container.appendChild(svgField.container);
			this.svgFieldA.push(svgField);
		}
		
		CycleScreen.prototype.callToReplaceSvgField = function(addNew=true)
		{
			this.svgFieldA[0].callRemoval();
			if (addNew === true)
			{
				this.createSvgField();
			}
		}
		
		CycleScreen.prototype.removeSvgField = function(e=null)
		{
			var t = e.target;
			_cycleScreen.container.removeChild(t);
			_cycleScreen.svgFieldA.splice(0,1);
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
				
				if (this.PHASE_NUM === 0 && i === 1)
				{
					str = this.enteredText;
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
		
		CycleScreen.prototype.recallClock = function()
		{
			this.container.appendChild(this.clock.container);
			this.clock.recall();
		}
		
		CycleScreen.prototype.addListeners = function()
		{
			$(this.container).on('phaseChanged',this.phaseChange);
			$(this.container).on('svgFieldRemoved',this.removeSvgField);
		}
		
		CycleScreen.prototype.removeListeners = function()
		{
			$(this.container).off('phaseChanged',this.phaseChange);
			$(this.container).off('svgFieldRemoved',this.removeSvgField);
			
			$(this.container).off('textBtnClicked',this.longRestBtnClicked);
			$(this.container).off('clockFaded',this.callToCreateTaskPrompt);
			$(this.container).off('arrowBtnClicked',this.startBtnClicked);
			$(this.container).off('taskPromptFaded',this.removeTaskPrompt);
		}
		
		CycleScreen.prototype.phaseChange = function(e=null)
		{
			_cycleScreen.PHASE_NUM++;
			if (_cycleScreen.PHASE_NUM >= _cycleScreen.PHASE_A.length)
			{
				_cycleScreen.PHASE_NUM = 0;
			}
			
			if (_cycleScreen.PHASE_NUM === 0)
			{
				_cycleScreen.recallClock();
				_cycleScreen.continueAfterHold(false);
			}
			else if (_cycleScreen.PHASE_NUM === 1)
			{
				_cycleScreen.continueAfterHold();
			}
			else if (_cycleScreen.PHASE_NUM === 2)
			{
				_cycleScreen.doCrushed();
			}
		}
		
		CycleScreen.prototype.createLongRestBtn = function()
		{
			if (this.longRestBtn != null)
			{
				this.longRestBtn.callRemoval();
				this.longRestBtn = null;
			}
			this.longRestBtn = new TextBtn(this.PHASE_A[_cycleScreen.PHASE_NUM].LONG_REST_BTN_TEXT);
			this.clock.container.appendChild(this.longRestBtn.container);
			$(this.container).on('textBtnClicked',this.longRestBtnClicked);
		}
		
		CycleScreen.prototype.longRestBtnClicked = function(e)
		{
			_cycleScreen.removeLongRestBtn();
			_cycleScreen.clock.updateTimeDur(_cycleScreen.PHASE_A[_cycleScreen.PHASE_NUM].LONG_REST_TIME);
		}
		
		CycleScreen.prototype.removeLongRestBtn = function()
		{
			if (_cycleScreen.longRestBtn != null)
			{
				_cycleScreen.longRestBtn.callRemoval();
				_cycleScreen.longRestBtn = null;
				$(_cycleScreen.container).off('textBtnClicked',_cycleScreen.longRestBtnClicked);
			}
		}
		
		CycleScreen.prototype.continueAfterHold = function(createSvg=true)
		{
			var arr = _cycleScreen.PHASE_A[_cycleScreen.PHASE_NUM];
			
			_cycleScreen.clock.updateTimeDur(arr.TIME);
			_cycleScreen.callToSwapBlurbs();
			_cycleScreen.clock.timeDisplay.animateColor(arr.CLOCK_COLOR);
			_cycleScreen.resetter.changeBtn(_cycleScreen.PHASE_NUM);
			if (createSvg === true)
			{
				_cycleScreen.createSvgField();
			}
			else
			{
				_cycleScreen.callToReplaceSvgField(false);
			}
			if (_cycleScreen.PHASE_NUM === 1)
			{
				_cycleScreen.createLongRestBtn();
			}
			$(this.container).trigger('advancePhase');
		}
		
		CycleScreen.prototype.doCrushed = function()
		{
			var arr = _cycleScreen.PHASE_A[_cycleScreen.PHASE_NUM];
			
			$(this.container).on('clockFaded',this.callToCreateTaskPrompt);
			_cycleScreen.clock.fader();
			_cycleScreen.clock.timeDisplay.animateColor(arr.CLOCK_COLOR);
			_cycleScreen.callToSwapBlurbs();
			_cycleScreen.resetter.changeBtn(_cycleScreen.PHASE_NUM);
			_cycleScreen.callToReplaceSvgField();
			_cycleScreen.removeLongRestBtn();
			$(this.container).trigger('advancePhase');
		}
		
		CycleScreen.prototype.callToCreateTaskPrompt = function(e)
		{
			$(_cycleScreen.container).off('clockFaded',_cycleScreen.callToCreateTaskPrompt);
			_cycleScreen.createTaskPrompt();
		}
		
		CycleScreen.prototype.createTaskPrompt = function()
		{
			var arr = this.PHASE_A[_cycleScreen.PHASE_NUM];
			
			this.taskPrompt = new TaskPrompt(this.enteredText,arr.INPUT_MAX);
			this.container.appendChild(this.taskPrompt.container);
			$(this.container).on('arrowBtnClicked',this.startBtnClicked);
		}
		
		CycleScreen.prototype.startBtnClicked = function(e)
		{
			$(_cycleScreen.container).off('arrowBtnClicked',_cycleScreen.startBtnClicked);
			e.stopPropagation();
			_cycleScreen.enteredText = _cycleScreen.taskPrompt.enteredText;
			$(_cycleScreen.container).on('taskPromptFaded',_cycleScreen.removeTaskPrompt);
			_cycleScreen.taskPrompt.fader();
		}
		
		CycleScreen.prototype.removeTaskPrompt = function(e)
		{
			var t = e.target;
			$(_cycleScreen.container).off('taskPromptFaded',_cycleScreen.removeTaskPrompt);
			_cycleScreen.container.removeChild(t);
			_cycleScreen.taskPrompt = null;
			_cycleScreen.phaseChange();
		}
		
		CycleScreen.prototype.removeBlurb = function(e)
		{
			_cycleScreen.contiainer.removeChild(_cycleScreen.clock.container);
		}
		
		CycleScreen.prototype.removeClock = function(e)
		{
			_cycleScreen.container.removeChild(_cycleScreen.clock.container);
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
			
			if (this.taskPrompt != null)
			{
				this.taskPrompt.callRemoval();
			}
			
			$(this.container).animate({opacity:0},function(){
				$(this).trigger('cycleScreenRemoved');
			});
		}
		
		return CycleScreen;
	}
)