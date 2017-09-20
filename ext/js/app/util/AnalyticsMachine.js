define(
	function()
	{
		var _analyticsMachine;
		
		function AnalyticsMachine()
		{
			_analyticsMachine = this;
			
			
			/*
			this.ga;
			this.gaq = this.gaq || [];
			
			this.init();
			*/
			
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;
				i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); //https://ssl.google-analytics.com/ga.js
			ga('create', 'UA-106361403-1', 'auto');
			ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
			
			//ga('send','pageview','/index.html');
			//ga('send','event','blah');
			
			ga('send','event','v1_newTab');
		}
		
		/*
		AnalyticsMachine.prototype.init = function()
		{
			this.connect();
			this.setAccount();
		}
		
		AnalyticsMachine.prototype.connect = function()
		{
			this.ga = document.createElement('script');
			this.ga.type = 'text/javascript';
			this.ga.async = true;
			this.ga.src = 'https://ssl.google-analytics.com/ga.js';
			//this.ga.src = 'https://www.google-analytics.com/analytics_debug.js';
			
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(this.ga,s);
			
			this.ga.appendChild(this.gaq);
			
			console.log(this.gaq);
		}
		
		AnalyticsMachine.prototype.setAccount = function()
		{
			this.gaq.push(['_setAccount', 'UA-106361403-1']);
		}
		*/
		
		AnalyticsMachine.prototype.track = function(type)
		{
			ga('send','event',type);
			
			
			/*
			this.gaq.push(['_trackEvent', null, 'test']);
			this.gaq.push(['_trackPageview']);
			console.log('k');
			*/
		}
		
		return AnalyticsMachine;
	}
)