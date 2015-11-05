javascript:

var pages = [];
var stop  = false;

get_page(1);

function get_page(page)
{
	var url  = window.location.href + "?page = " + page;
	var meta = { method: 'get' };
	meta.onSuccess = function (xhr) { get_content(page, xhr.responseText); };

	new Ajax.Request(url, meta);
}

function get_content(page, content)
{
	if(pages.length < 5)
	{
		pages[page] = content;
		
		
		
		get_page(page + 1);
	}
	else
	{
		process_content();
	}
}

function process_content()
{
	alert("Got " + pages.length + "pages");
}
