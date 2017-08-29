requirejs.config({
	baseUrl:'ext/js/lib',
	paths:{
		app:'../app'
	}
});

define(
	[
		'jquery',
		'jquery-ui',
		'app/Base'
	],
	function($,ui,Base)
	{
		/////  Constants:
		const JSON_PATH = "ext/res/json.json"; //http://js.sb9.us/pomodoro/new/
		var JSON_A = [];
		var _httpReq;
		var _base;
		
		
		$(document).ready(function(evt)
		{
			//this.base = new Base(); //require(['app/base']);
			acquireJSON();
		});
		
		/*
		window.addEventListener('load',function()
		{
			acquireJSON();
		});
		*/
		///////////////////    JSON CALLS
		////////////////////////////////////////////////
		function acquireJSON()
		{
			prepareRequestAndGetData();
		}
		
		function prepareRequestAndGetData()
		{
			_httpReq = new XMLHttpRequest(); //{mozSystem:true}
			_httpReq.onreadystatechange = function()
			{
				if (_httpReq.readyState == 4 && _httpReq.status == 200)
				{
					var a = JSON.parse(_httpReq.responseText);
					updateData(a);
				}
			}
			
			_httpReq.open("GET",JSON_PATH,true);
			_httpReq.send();
		}
		
		function updateData(a)
		{
			JSON_A = a;
			
			run();
		}
		
		function run()
		{
			_base = new Base(JSON_A); //require(['app/base']);
		}
	}
)
