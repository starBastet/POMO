define(
	[
	'app/util/ResetBtn'
	],
	function(ResetBtn)
	{
		var _resetter;
		
		function Resetter()
		{
			_resetter = this;
			
			this.container;
			
			this.resetBtn;
			this.exitX;
			
			this.container = document.createElement('div');
			this.container.id = 'resetContainer';
			
			this.init();
		}
		
		Resetter.prototype.init = function()
		{
			this.createResetBtn();
			this.exitX = -($(this.container).width());
			this.addListeners();
			this.animateTo(0);
		}
		
		Resetter.prototype.createResetBtn = function()
		{
			this.resetBtn = new ResetBtn();
			this.container.appendChild(this.resetBtn.container);
		}
		
		Resetter.prototype.addListeners = function()
		{
			$(this.container).on('resetClicked',this.resetClicked);
		}
		
		Resetter.prototype.animateTo = function(toX)
		{
			$(this.container).animate({right:toX});
		}
		
		Resetter.prototype.resetClicked = function(e)
		{
			_resetter.resetBtn.removeItemFunc();
			$(_resetter.container).animate({right:_resetter.exitX},function(){
				this.removeChild(_resetter.resetBtn.container);
				$(this).trigger('resetRemoved');
			});
			
		}
		
		return Resetter;
	}
)