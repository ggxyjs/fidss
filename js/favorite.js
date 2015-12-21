function addFavorite(aTitle, aUrl, aDesc)
{
    if(window.sidebar && "object"==typeof(window.sidebar) && "function"==typeof(window.sidebar.addPanel))
    {
        //Firefox
        window.sidebar.addPanel(aTitle, aUrl, aDesc);
    }
    else
    	if(document.all && "object"==typeof(window.external))//IE
    	{
    		window.external.addFavorite(aUrl, aTitle);
    	}
    	else
    		if(window.opera && window.print)
    		{
    			return true;
    		}
}