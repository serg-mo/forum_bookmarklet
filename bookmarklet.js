javascript:

var posts = [];
get_page(1);

function get_page(page)
{
    var url  = window.location.href + "?page=" + page;
    var meta = { method: 'get' };
    meta.onSuccess = function (xhr) { get_content(page, xhr.responseText); };

    new Ajax.Request(url, meta);
}

function get_content(page, content)
{
    var total = content.match(/Pages \((\d+)\)/i)[1];
    if(page < total)
    {
        var matches = content.split(/<!-- (start|end): postbit -->/i);
        matches = matches.filter(function(v){ return v.length > 5; });
        Array.prototype.push.apply(posts, matches);

        get_page(page + 1);
    }
    else
        process_content();
}

function process_content()
{
    var head = posts.shift();
    var tail = posts.pop();

    posts.sort(function(a, b){ return get_likes(b) - get_likes(a); });

    document.write("ALL POSTS SORTED BY DESCENDING LIKES");
    document.write(head);
    for(var i = 0; i < posts.length; i++)
        document.write(posts[i]);
    document.write(tail);
}

function get_likes(content)
{
    var matches = content.match(/The following (\d+) users Like/i);
    return (matches != null)?matches[1]:0;
}
