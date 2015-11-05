javascript:

var pages = [];
var stop  = false;

var url  = window.location.href;
var meta = { method: 'get', parameters: { page: 1 } };
for(var page = 1; page < 3; page++)
{
	meta.parameters.page = page;
	meta.onSuccess = function (xhr) { get_content(page, xhr.responseText); };
	new Ajax.Request(url + "?page=" + page, meta);
	
	if(stop)
	  break;
}

alert("Got " + pages.length + "pages");

function get_content(page, content)
{
	if(page - 1 > 0 && pages[(page - 1)] != content)
		pages[page] = content;
	else
		stop = true;
}
