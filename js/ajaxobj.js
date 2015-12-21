function createAjaxObj() 
{
	var httprequest = false;
	if (window.XMLHttpRequest) 
	{
		httprequest = new XMLHttpRequest();
		if (httprequest.overrideMimeType) 
		{
			httprequest.overrideMimeType("text/xml");
		}
	} 
	else 
	{
		if (window.ActiveXObject) 
		{
			var ieArr = [ "Msxml2.XMLHTTP.8.0", "Msxml2.XMLHTTP.7.0",
					"Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0",
					"Msxml2.XMLHTTP", "Microsoft.XMLHTTP" ];
			for ( var i = 0; i < ieArr.length; i=i+1) 
			{
				try
				{
					httprequest = new ActiveXObject(ieArr[i]);
				}
				catch (e) 
				{
					window.alert("Sorry，您的浏览器不支持AJAX。请升级您的浏览器...");
					return false;
				}
			}
		}
	}
	return httprequest;
}