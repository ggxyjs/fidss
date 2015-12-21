function setSelectedPage(id)
{
	var elem = document.getElementById(id);
	if(null != elem)
	{
		elem.className = "hover";
	}
}