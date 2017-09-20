define(
	function()
	{
		var _soundManager;
		
		function SoundManager(soundPathsA)
		{
			_soundManager = this;
			this.soundPathsA = soundPathsA;
			
			this.soundA = [];
			
			this.init();
		}
		
		SoundManager.prototype.init = function()
		{
			this.createSounds();
			this.adjustVolume();
		}
		
		SoundManager.prototype.createSounds = function()
		{
			for (var i=0;i<this.soundPathsA.length;i++)
			{
				var snd = new Audio(this.soundPathsA[i]);
				this.soundA.push(snd);
			}
		}
		
		SoundManager.prototype.playSound = function(soundNum)
		{
			this.soundA[soundNum].pause();
			this.soundA[soundNum].currentTime = 0;
			this.soundA[soundNum].play();
		}
		
		SoundManager.prototype.adjustVolume = function()
		{
			this.soundA[2].volume = .13;
		}
		
		return SoundManager;
	}
)