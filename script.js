var envs = localStorage.getItem('envs');

//Creates default environments if none are set
if(!envs || envs == '{}') {
	envs = {
		'Example': 'http://example.dev',
		'Staging Example': 'http://staging.example.com'
	};
	localStorage.setItem('envs', JSON.stringify(envs));
	location.reload();
}

//Retrieve stored environments
envs = JSON.parse(envs);

//Get current tab url, remove http:// protocol to get domain
//remove domain, append path to the passed in new domain
function changeDomain(newEnv, newTab) {

	chrome.tabs.getSelected(null, function(tab){
		var tmp = document.createElement('a');
		tmp.href = tab.url; //hack to get the full url
		var path = tmp.href.replace(tmp.pathname+tmp.search, '')
		path = tab.url.replace(path, '');
		if(path == tmp.href) path = '';

		if (newTab) {
			chrome.tabs.create({'url': newEnv+path}, function(tab) {
			});
		} else {
			chrome.tabs.update(tab.id, {url: newEnv+path});
		}
	});
}

$(document).ready(function() {

	//Loop through stored environments and create div elements and append to #envsList div
	var item;
	for (var key in envs) {
		item = key.charAt(0).toUpperCase() + key.slice(1);
		$("#envsList").append("<div id='"+key+"' class='env'>"+item+"<span>+</span></div>");
	}

	//Bind click function to dynamically created divs
	$('#envsList').on('click', '.env', function(e) {
		var el = $(e.target),
			newTab = false;
		if (el.is("span")) {
			key = el.parent().attr('id');
			var newTab = true;
			console.log('New Tab');
		} else {
			key = el.attr('id');
			console.log('same');
		}
		changeDomain(envs[key], newTab);

	});

	//Open options.html in new tab
	$("#options").click(function() {
		chrome.tabs.create({'url': chrome.extension.getURL('options.html')}, function(tab) {
			// Tab opened.
		});
	});

});