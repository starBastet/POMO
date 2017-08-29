define(
	[
		'app/views/CycleScreen/util/TimeDisplay'
	],
	function(TimeDisplay)
	{
		var _clock;
		
		function Clock(timeDur)
		{
			_clock = this;
			this.timeDur = timeDur;
			
			this.container;
			this.seconds = 0;
			this.minutes = 0;
			this.timeDisplay;
			this.timer;
			this.WINDUP_INTERVAL_DUR = 10;
			
			this.container = document.createElement('div');
			this.container.id = ('clockContainer');
			
			//this.init();
		}
		
		Clock.prototype.init = function()
		{
			this.createTimeDisplay();
			this.createTimer('windUp');
		}
		
		Clock.prototype.createTimeDisplay = function()
		{
			this.timeDisplay = new TimeDisplay(this.timeDur);
			this.container.appendChild(this.timeDisplay.container);
		}
		
		Clock.prototype.updateTimeDur = function(timeDur)
		{
			this.timeDur = timeDur;
			this.createTimer('windUp');
		}
		
		Clock.prototype.callToUpdateTimeDisplay = function()
		{
			var mins = this.minutes;
			var secs = this.seconds;
			
			if (mins < 10)
			{
				mins = String('0'+mins);
			}
			
			if (secs < 10)
			{
				secs = String('0'+secs);
			}
			
			this.timeDisplay.updateDisplay(mins+':'+secs);
		}
		
		Clock.prototype.createTimer = function(type)
		{
			if (this.timer != null)
			{
				this.stopTimer();
			}
			
			if (type === 'windUp')
			{
				var dur = this.WINDUP_INTERVAL_DUR;
				if (Number(this.timeDur) < 1)
				{
					dur = this.WINDUP_INTERVAL_DUR * 10;
				}
				else if (Number(this.timeDur) < 10)
				{
					dur = this.WINDUP_INTERVAL_DUR * 3;
				}
				
				if (Number(this.timeDur) < 10)
				{
					$(this.container).trigger('soundRequest',0);
				}
				else
				{
					$(this.container).trigger('soundRequest',1);
				}
				
				this.timer = setInterval(this.windUp,dur);
			}
			else if (type === 'countDown')
			{
				this.timer = setInterval(this.countDown,1000);
			}
			else if (type === 'hold')
			{
				this.timer = setInterval(this.hold,1000);
			}
		}
		
		Clock.prototype.stopTimer = function()
		{
			if (typeof this.timer != 'undefined')
			{
				clearInterval(this.timer);
				this.timer = undefined;
			}
		}
		
		Clock.prototype.windUp = function(e)
		{
			var startCountdown = false;
			
			if (_clock.timeDur < 1)
			{
				_clock.seconds++;
				if (Number(_clock.seconds) === Math.floor(60*_clock.timeDur))
				{
					startCountdown = true;
				}
			}
			else
			{
				_clock.seconds += 12;
				if (_clock.seconds >= 60)
				{
					_clock.seconds = 0;
					_clock.minutes++;
				}
				if (Number(_clock.minutes) === Number(_clock.timeDur))
				{
					startCountdown = true;
				}
			}
			
			_clock.callToUpdateTimeDisplay();
			
			if (startCountdown === true)
			{
				_clock.stopTimer();
				_clock.createTimer('countDown');
			}
		}
		
		Clock.prototype.countDown = function(e)
		{
			if (_clock.seconds > 0)
			{
				_clock.seconds -= 1;
			}
			else
			{
				_clock.seconds = 59;
				_clock.minutes--;
			}
			
			_clock.callToUpdateTimeDisplay();
			$(_clock.container).trigger('soundRequest',2);
			
			if (Number(_clock.minutes) === 0 && Number(_clock.seconds) === 0)
			{
				_clock.createTimer('hold');
				$(_clock.container).trigger('soundRequest',3);
			}
		}
		
		Clock.prototype.hold = function(e)
		{
			_clock.stopTimer();
			$(_clock.container).trigger('phaseChanged');
		}
		
		Clock.prototype.callRemoval = function()
		{
			this.stopTimer();
		}
		
		return Clock;
	}
)