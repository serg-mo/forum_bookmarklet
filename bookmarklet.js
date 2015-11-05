// javascript bookmarklet that downloads all pages of a forum thread and sorts the posts by number of likes
// assumes the forum has already embedded prototype.js framework

var pages = [];
var stop  = false;

var url  = window.location;
var meta = { method: 'get', parameters: { page: 1 } };
for(var page = 1; page < 100; page++)
{
  meta.parameters.page = page;
  meta.onSuccess = function (xhr) { get_content(page, xhr.responseText); };
	new Ajax.Request(url, meta);
	
	if(stop)
	  break;
}

alert("Got " + pages.length + "pages");

function get_content(page, content)
{
  // as long as its different from the previous page (non-existent page = last page)
  if(page - 1 > 0 && pages[(page - 1)] != content)
    pages[page] = content;
  else
    stop = true;
}
