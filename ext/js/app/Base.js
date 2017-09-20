define(
	[
		'app/util/AnalyticsMachine',
		'app/util/Branding',
		'app/util/SoundManager',
		'app/views/util/Bkgnd',
		'app/views/StartScreen/StartScreen',
		'app/views/CycleScreen/CycleScreen'
	],
	function(AnalyticsMachine,Branding,SoundManager,Bkgnd,StartScreen,CycleScreen)
	{
		var _base;
		
		function Base(JSON_A)
		{
			_base = this;
			this.JSON_A = JSON_A;
			
			this.container;
			
			this.MACHINE_STATE = 0;
			this.analyticsMachine;
			this.branding;
			this.soundManager;
			this.bkgnd;
			this.startScreen;
			this.cycleScreen;
			this.enteredText;
			this.pomoCount = 0;
			
			this.container = document.createElement('div');
			this.container.id = 'appContainer';
			document.body.appendChild(this.container);
			
			this.init();
		}
		
		Base.prototype.init = function()
		{
			this.createAnalyticsMachine();
			this.createBranding();
			this.createSoundManager();
			this.createBackground();
			this.updateState();
			//this.createCycle();
			this.addListeners();
		}
		
		Base.prototype.reinitialize = function()
		{
			this.MACHINE_STATE = 0;
			this.bkgnd.animateColor(this.JSON_A.START_SCREEN.BKGND_COLOR);
			this.branding.animateColor(this.JSON_A.BRANDING[1]);
			this.updateState();
		}
		
		Base.prototype.updatePomoCount = function()
		{
			this.pomoCount++;
			this.callToUpdateAnalytics(null,'v1_pomoCrushed');
			
			// for now, this singleton, until more features are added:
			if (this.pomoCount === 2)
			{
				this.callToUpdateAnalytics(null,'v1_doubleDip');
			}
		}
		
/////////////////////    GOOGLE ANALYTICS
		Base.prototype.createAnalyticsMachine = function()
		{
			this.analyticsMachine = new AnalyticsMachine();
			//this.container.appendChild(this.analyticsMachine.container);
		}
		
		Base.prototype.callToUpdateAnalytics = function(e,type)
		{
			_base.analyticsMachine.track(type);
		}
		
/////////////////////    BRANDING
		Base.prototype.createBranding = function()
		{
			this.branding = new Branding(this.JSON_A.BRANDING[0]);
			this.container.appendChild(this.branding.container);
		}
		
/////////////////////    SOUNDS
		Base.prototype.createSoundManager = function()
		{
			this.soundManager = new SoundManager(this.JSON_A.CYCLE_SCREENS.CLOCK_SOUNDS_A);
		}
		
		Base.prototype.callToPlaySound = function(e,soundNum)
		{
			if (soundNum === 3 && _base.cycleScreen.PHASE_NUM === 1)
			{
				soundNum = 4;
			}
			_base.soundManager.playSound(soundNum);
		}
		
/////////////////////    BACKGROUNDS
		Base.prototype.createBackground = function()
		{
			this.bkgnd = new Bkgnd(this.JSON_A.START_SCREEN.BKGND_COLOR);
			this.container.appendChild(this.bkgnd.container);
		}
		
		Base.prototype.updateState = function()
		{
			if (this.MACHINE_STATE === 0)
			{
				this.createStartScreen();
			}
			else if (this.MACHINE_STATE === 1)
			{
				this.enteredText = this.startScreen.enteredText;
				this.createCycleScreen();
			}
		}
		
/////////////////////    LISTENERS
		Base.prototype.addListeners = function()
		{
			$(this.container).on('analyticsRequest',this.callToUpdateAnalytics);
			$(this.container).on('soundRequest',this.callToPlaySound);
			$(this.container).on('startScreenRemoved',this.startScreenRemoved);
			$(this.container).on('cycleScreenRemoved',this.cycleScreenRemoved);
			$(this.container).on('changeState',this.changeState);
			$(this.container).on('advancePhase',this.advancePhase);
		}
		
/////////////////////    CHANGE MACHINE STATE
		Base.prototype.changeState = function(e)
		{
			_base.MACHINE_STATE++;
			_base.updateState();
		}
		
/////////////////////    START SCREEN
		Base.prototype.createStartScreen = function()
		{
			if (this.startScreen != null)
			{
				this.startScreenRemoved();
			}
			this.startScreen = new StartScreen(this.JSON_A.START_SCREEN);
			this.container.appendChild(this.startScreen.container);
		}
		
		Base.prototype.startScreenRemoved = function(e=null)
		{
			_base.container.removeChild(_base.startScreen.container);
			_base.startScreen = null;
		}
		
/////////////////////    CYCLE SCREEN
		Base.prototype.createCycleScreen = function()
		{
			if (this.enteredText === this.JSON_A.START_SCREEN.PROMPT_TEXT)
			{
				this.enteredText = this.JSON_A.START_SCREEN.DEFAULT_TASK_TEXT;
			}
			this.cycleScreen = new CycleScreen(this.JSON_A.CYCLE_SCREENS,this.enteredText);
			this.container.appendChild(this.cycleScreen.container);
			this.cycleScreen.clock.init(); // had to do this out here for some reason...? Closure, or some sh*t?
			
			this.bkgnd.animateColor(this.JSON_A.CYCLE_SCREENS.FOCUS.BKGND_COLOR);
			this.branding.animateColor(this.JSON_A.CYCLE_SCREENS.FOCUS.CLOCK_COLOR);
		}
		
		Base.prototype.cycleScreenRemoved = function(e=null)
		{
			_base.container.removeChild(_base.cycleScreen.container);
			_base.cycleScreen = null;
			_base.reinitialize();
		}
		
/////////////////////    ADVANCE PHASE
		Base.prototype.advancePhase = function(e)
		{
			var bkgndColor;
			var brandingColor;
			
			if (_base.cycleScreen.PHASE_NUM === 0)
			{
				bkgndColor = _base.JSON_A.CYCLE_SCREENS.FOCUS.BKGND_COLOR;
				brandingColor = _base.JSON_A.CYCLE_SCREENS.FOCUS.CLOCK_COLOR;
			}
			else if (_base.cycleScreen.PHASE_NUM === 1)
			{
				bkgndColor = _base.JSON_A.CYCLE_SCREENS.REST.BKGND_COLOR;
				brandingColor = _base.JSON_A.CYCLE_SCREENS.REST.CLOCK_COLOR;
			}
			else
			{
				bkgndColor = _base.JSON_A.CYCLE_SCREENS.CRUSHED.BKGND_COLOR;
				brandingColor = _base.JSON_A.CYCLE_SCREENS.CRUSHED.CLOCK_COLOR;
				
				_base.updatePomoCount(); 
			}
			
			_base.bkgnd.animateColor(bkgndColor);
			_base.branding.animateColor(brandingColor);
		}
		
		/*
		Base.prototype.callToEmpty = function(e)
		{
			_base.container.removeChild(_base.resetter.container);
			_base.resetter = null;
			$(this).off('resetRemoved',_base.callToEmpty);
			$(this).on('navRemoved',_base.reinitialize);
			_base.nav.callRemoval();
		}
		
		Base.prototype.reinitialize = function(e)
		{
			$(this).off('navRemoved',_base.reinitialize);
			_base.container.removeChild(_base.nav.container);
			_base.nav = null;
			_base.init();
		}
		*/
		return Base;
	}
)