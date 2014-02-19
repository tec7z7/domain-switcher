//Creates default environments if none are set
if(!localStorage.getItem('envs')) {
	var envs = {
		'Example': 'http://example.dev',
		'StagingExample': 'http://staging.example.dev'
	};
	localStorage.setItem('envs', JSON.stringify(envs));
}

//Retrieve stored environments
var envs = localStorage.getItem('envs');
envs = JSON.parse(envs);

//Get current tab url, remove http:// protocol to get domain
//remove domain, append path to the passed in new domain
function changeDomain(newEnv) {
	chrome.tabs.getSelected(null, function(tab){
		var m = tab.url.match(/^http:\/\/[^/]+/);
		var domain = m ? m[0] : '';
		var path = tab.url.replace(domain, '');
		chrome.tabs.update(tab.id, {url: newEnv+path});
	});
}

$(document).ready(function() {

	//Loop through stored environments and create div elements and append to #envsList div
	for (var key in envs) {
		(function(key) {
			var item = key.charAt(0).toUpperCase() + key.slice(1);
			$("#envsList").append("<div id='"+key+"'>"+item+"</div>");
		}(key));
	}

	//Bind click function to dynamically created divs
	for (var key in envs) {
		(function(key) {
			$('#'+key).click(function() {
				changeDomain(envs[key]);
			});
		}(key));
	}

	//Open options.html in new tab
	$("#options").click(function() {
		chrome.tabs.create({'url': chrome.extension.getURL('options.html')}, function(tab) {
			// Tab opened.
		});
	});

});