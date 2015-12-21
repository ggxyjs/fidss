/**********Begin 引入JavaScript文件**********/
document.write("<script type=\"text/javascript\" src=\"js/ajaxobj.js\"></script>");
/***********End 引入JavaScript文件***********/

/**********Begin 全局变量**********/
var ajax = createAjaxObj();
/***********End 全局变量***********/

function showImg(imgurl) 
{	
	 newWin = window.open("about:blank", "", "width=200, height=100");
	 var doc = "<body leftmargin=0 topmargin=0><img id=img1 src=\"" 
	 	+ imgurl + "\" onload=\"self.resizeTo(this.offsetWidth , this.offsetHeight+100);\">";
	 newWin.document.write(doc);
}

function refresh()
{
	window.location.reload();
}

function alertMsg(msg)
{
	window.alert(msg);
}

function encode(str)
{
	return encodeURIComponent(encodeURIComponent(str));
}

function showMainContent(content)
{
	var elem = document.getElementById("mainContent");
	elem.innerHTML = content;
}

function showContent(title, content, doShowMsg, msg)
{
	var mainContent = "<fieldset style=\"width: auto; height: auto\">"
		+ "<legend style=\"font-weight: bold\" align=\"center\">" + title + "</legend>"
		+ "<div align=\"center\"><br /></div>"
		+ "<div align=\"center\">"
		+ content
		+ "</div><br />" + "</fieldset>";
	
	if(doShowMsg)
	{
		mainContent = mainContent 
			+ "<div id=\"divCenter\" style=\"position: absolute; z-index: 3; display: none;width:400px; height: auto; background-color: #85b7f4;font-size: 16px;font-weight: bold;border:solid 5px #214A7B;\" ></div>"
			+ "<div>"
				+ "<fieldset style=\"width: auto; height: auto\">"
					+ "<legend align=\"center\">提示信息</legend>"
					+ "<div>" + msg + "</div>"
				+ "</fieldset>"
			+ "</div>";
	}

	showMainContent(mainContent);
}

function clearMainContent()
{
	showMainContent("");
}

function selectCheckbox(liId, cbId)
{
	var li = document.getElementById(liId);
	var cb = document.getElementById(cbId);
	if(null != li)
	{
		var subInputs = li.getElementsByTagName("input");
		if(null != subInputs)
		{
			var cbArr = new Array();
			for(var i=0; i<subInputs.length; i=i+1)
			{
				if("checkbox" == subInputs[i].type)
				{
					cbArr.push(subInputs[i]);
				}
			}
			
			for(var i=0; i<cbArr.length; i=i+1)
			{
				cbArr[i].checked = cb.checked;
			}
		}
	}
	
	selectParentCheckbox(li);
}

function selectParentCheckbox(liElem)
{
	var ul = liElem.parentNode;
	if((null!=ul) && ("ul_top"!=ul.getAttribute("is_top")))
	{
		var li = ul.parentNode;
		if(null != li)
		{
			var subInputs = li.getElementsByTagName("input");
			if(null != subInputs)
			{
				var cbArr = new Array();
				for(var i=0; i<subInputs.length; i=i+1)
				{
					if("checkbox" == subInputs[i].type)
					{
						cbArr.push(subInputs[i]);
					}
				}
				
				if(0 < cbArr.length)
				{
					for(var i=1; i<cbArr.length; i=i+1)
					{
						if(true != cbArr[i].checked)
						{
							cbArr[0].checked = cbArr[i].checked;
							break;
						}
					}
					
					if(i >= cbArr.length)
					{
						cbArr[0].checked = true;
					}
				}
			}
			selectParentCheckbox(li);
		}
	}
}

function showHide(elemId, imgId)
{
	var elem = document.getElementById(elemId);
	var img = document.getElementById(imgId);
	var isExpand = false;
	if(img.src.indexOf("minus.gif") >= 0)
	{
		isExpand = true;
		img.src = "images/plus.gif";
	}
	else
	{
		isExpand = false;
		img.src = "images/minus.gif";
	}
	
	elem.style.display = (isExpand) ? "none" : "block";
}

function selectElem(selectedElemId, elemName)
{
    var elems = document.getElementsByName(elemName);
    if(null != elems)
    {
    	for(var i=0; i<elems.length; i=i+1)
    	{
    		elems[i].style.background = "#E8F2FE";
    	}
    }
    
    var selectedElem = document.getElementById(selectedElemId);
    if(null != selectedElem)
    {
    	selectedElem.style.background = "#85b7f4";
    }
}


function getBtnAddSbjt(userId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;添加专题&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showAddSbjtForm('" + userId + "');\""
		+ " />";
		
	return btn;
}

function getBtnShareSbjtToUg(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;共享专题&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showShareSbjtToUgForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnUnshareSbjtFromUg(ugId, userId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;取消共享&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showUnshareSbjtFromUgForm('" + ugId + "', '" + userId + "');\""
		+ " />";
		
	return btn;
}

function getBtnAddSbjtCtgy(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;添加分类&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showAddSbjtCtgyForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnAddSbjtItem(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"添加专题项\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showAddSbjtItemForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnDelSbjt(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;删除专题&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showDelSbjtForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnEditSbjtKw(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"编辑关键词\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showEditSbjtKwForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnDelSbjtCtgy(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;删除分类&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showDelSbjtCtgyForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnRenameSbjtCtgy(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;修改名称&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showRenameSbjtCtgyForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}


function getBtnDelSbjtItem(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"删除专题项\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showDelSbjtItemForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnEditSbjtItemKw(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"编辑关键词\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showEditSbjtKwForm('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnAddSbjtToUg(ugId, userId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;添加专题&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showAddSbjtToUgForm('" + ugId + "', '" + userId + "');\""
		+ " />";
		
	return btn;
}

function getBtnDelSbjtFromUg(ugId, userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;删除专题&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showDelSbjtFromUgForm('" + ugId + "', '" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}




function getBtnFollowSbjtFromUg(ugId, userId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;关注专题&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showFollowSbjtFromUgForm('" + ugId + "', '" + userId + "');\""
		+ " />";
		
	return btn;
}

function getBtnUnfollowSbjt(ugId, userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;取消关注&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showUnfollowSbjtForm('" + ugId + "', '" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function getBtnUpdateSelectedSbjt(userId, cbName)
{
	var btn = "<input type=\"button\" "
		+ " value=\"&nbsp;更新选择的专题&nbsp;\" "
		+ " class=\"buttonstyle\""
		+ " onclick=\"submitUpdateSelectedSbjt('" + userId + "', '" + cbName + "');\""
		+ " />";
		
	return btn;
}

function getBtnUpdateSbjt(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;更新专题&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"submitUpdateSbjt('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}
function getBtnGetInfo(userId, sbjtId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;获得信息&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showInfo('" + userId + "', '" + sbjtId + "');\""
		+ " />";
		
	return btn;
}

function showBtnList(btnList)
{
	var oper = document.getElementById("oper");
	if(null != oper)
	{
		oper.innerHTML = btnList;
	}
	else
	{
		alert("获取按钮列表出错！");
	}
}



function showBtnListForTopTitle(userId, cbName)
{
	var btnUpdateSelectedSbjt = getBtnUpdateSelectedSbjt(userId, cbName);
	
	var btnList = btnUpdateSelectedSbjt;
	showBtnList(btnList);
}

function showBtnListForSbjtOfUserTitle(userId)
{
	var btnAddSbjt = getBtnAddSbjt(userId);
	
	var btnList = btnAddSbjt;
	
	showBtnList(btnList);
}




function showBtnListForSbjtOfUser(userId, sbjtId)
{
	var btnAddSbjtCtgy = getBtnAddSbjtCtgy(userId, sbjtId);
	var btnAddSbjtItem = getBtnAddSbjtItem(userId, sbjtId);
	var btnDelSbjt = getBtnDelSbjt(userId, sbjtId);
	var btnEditSbjtKw = getBtnEditSbjtKw(userId, sbjtId);
	var btnShareSbjtToUg = getBtnShareSbjtToUg(userId, sbjtId);
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	
	var btnList = btnAddSbjtCtgy +"&nbsp;&nbsp;"+ btnAddSbjtItem+"&nbsp;&nbsp;"
		+ btnDelSbjt+"&nbsp;&nbsp;" + btnEditSbjtKw+"&nbsp;&nbsp;" + btnShareSbjtToUg+"&nbsp;&nbsp;"
		+ btnUpdateSbjt;

	showBtnList(btnList);
}

function showBtnListForSbjtCtgyOfUser(userId, sbjtId)
{
	var btnAddSbjtCtgy = getBtnAddSbjtCtgy(userId, sbjtId);
	var btnAddSbjtItem = getBtnAddSbjtItem(userId, sbjtId);
	var btnDelSbjtCtgy = getBtnDelSbjtCtgy(userId, sbjtId);
	var btnRenameSbjtCtgy = getBtnRenameSbjtCtgy(userId, sbjtId);
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	
	var btnList = btnAddSbjtCtgy+"&nbsp;&nbsp;" + btnAddSbjtItem +"&nbsp;&nbsp;"
		+ btnDelSbjtCtgy+"&nbsp;&nbsp;" + btnRenameSbjtCtgy+"&nbsp;&nbsp;" + btnUpdateSbjt;
		
	showBtnList(btnList);
}

function showBtnListForSbjtItemOfUser(userId, sbjtId)
{
	var btnEditSbjtItemKw = getBtnEditSbjtItemKw(userId, sbjtId);
	var btnDelSbjtItem = getBtnDelSbjtItem(userId, sbjtId);
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	var btnGetInfo = "";//getBtnGetInfo(userId, sbjtId);
	
	var btnList = btnEditSbjtItemKw+"&nbsp;&nbsp;" + btnDelSbjtItem+"&nbsp;&nbsp;" + btnUpdateSbjt
	 + "&nbsp;&nbsp;" +  btnGetInfo
	showBtnList(btnList);
}

function showBtnListForTgListTitle()
{
	var btnList = "";
	
	showBtnList(btnList);
}

function showBtnListForSbjtOfTgTitle(ugId, userId)
{
	var btnAddSbjtToUg = getBtnAddSbjtToUg(ugId, userId);
	var btnUnshareSbjtFromUg = getBtnUnshareSbjtFromUg(ugId, userId);
	
	var btnList = btnAddSbjtToUg+"&nbsp;&nbsp;" + btnUnshareSbjtFromUg;
	
	showBtnList(btnList);
}

function showBtnListForSbjtOfTg(userId, ugId, sbjtId)
{
	var btnAddSbjtCtgy = getBtnAddSbjtCtgy(userId, sbjtId);
	var btnAddSbjtItem = getBtnAddSbjtItem(userId, sbjtId);
	var btnEditSbjtKw = getBtnEditSbjtKw(userId, sbjtId);
	var btnDelSbjtFromUg = getBtnDelSbjtFromUg(ugId, userId, sbjtId);
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	
	var btnList = btnAddSbjtCtgy +"&nbsp;&nbsp;"+ btnAddSbjtItem+"&nbsp;&nbsp;"
		+ btnEditSbjtKw+"&nbsp;&nbsp;" + btnDelSbjtFromUg+"&nbsp;&nbsp;"+ btnUpdateSbjt;

	showBtnList(btnList);
}

function showBtnListForSbjtCtgyOfTg(userId, ugId, sbjtId)
{
	var btnAddSbjtCtgy = getBtnAddSbjtCtgy(userId, sbjtId);
	var btnAddSbjtItem = getBtnAddSbjtItem(userId, sbjtId);
	var btnDelSbjtCtgy = getBtnDelSbjtCtgy(userId, sbjtId);
	var btnRenameSbjtCtgy = getBtnRenameSbjtCtgy(userId, sbjtId);
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	
	var btnList = btnAddSbjtCtgy +"&nbsp;&nbsp;"+ btnAddSbjtItem+"&nbsp;&nbsp;" 
		+ btnDelSbjtCtgy+"&nbsp;&nbsp;" + btnRenameSbjtCtgy+"&nbsp;&nbsp;" + btnUpdateSbjt;
		
	showBtnList(btnList);
}

function showBtnListForSbjtItemOfTg(userId, ugId, sbjtId)
{
	var btnEditSbjtItemKw = getBtnEditSbjtItemKw(userId, sbjtId);
	var btnDelSbjtItem = getBtnDelSbjtItem(userId, sbjtId);
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	
	var btnList = btnUpdateSbjt +"&nbsp;&nbsp;"+ btnEditSbjtItemKw+"&nbsp;&nbsp;" + btnDelSbjtItem;
	
	showBtnList(btnList);
}

function showBtnListForSbjtOfSgTitle(ugId, userId)
{
	var btnAddSbjtToUg = getBtnAddSbjtToUg(ugId, userId);
	var btnUnshareSbjtFromUg = getBtnUnshareSbjtFromUg(ugId, userId);
	var btnFollowSbjtFromUg = getBtnFollowSbjtFromUg(ugId, userId);
	
	var btnList = btnAddSbjtToUg+"&nbsp;&nbsp;" + btnUnshareSbjtFromUg+"&nbsp;&nbsp;" + btnFollowSbjtFromUg;
	
	showBtnList(btnList);
}

function showBtnListForSbjtOfSg(userId, ugId, sbjtId)
{
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	var btnUnfollowSbjt = getBtnUnfollowSbjt(ugId, userId, sbjtId);
	
	var btnList = btnUpdateSbjt+"&nbsp;&nbsp;" + btnUnfollowSbjt;
	
	showBtnList(btnList);
}

function showBtnListForSbjtCtgyOfSg(userId, ugId, sbjtId)
{
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	var btnList = btnUpdateSbjt;
	
	showBtnList(btnList);
}

function showBtnListForSbjtItemOfSg(userId, ugId, sbjtId)
{
	var btnUpdateSbjt = getBtnUpdateSbjt(userId, sbjtId);
	var btnList = btnUpdateSbjt;

	showBtnList(btnList);
}

function selectBtnList(listType, sbjtType, userId, ugId, sbjtId)
{
	if("0" == listType)
	{
		if("0" == sbjtType)
		{
			showBtnListForSbjtOfUser(userId, sbjtId);
		}
		else if("1" == sbjtType)
		{
			showBtnListForSbjtCtgyOfUser(userId, sbjtId);
		}
		else if("2" == sbjtType)
		{
			showBtnListForSbjtItemOfUser(userId, sbjtId);
		}
	}
	else if("1" == listType)
	{
		if("0" == sbjtType)
		{
			showBtnListForSbjtOfTg(userId, ugId, sbjtId);
		}
		else if("1" == sbjtType)
		{
			showBtnListForSbjtCtgyOfTg(userId, ugId, sbjtId);
		}
		else if("2" == sbjtType)
		{
			showBtnListForSbjtItemOfTg(userId, ugId, sbjtId);
		}
	}
	else if("2" == listType)
	{
		if("0" == sbjtType)
		{
			showBtnListForSbjtOfSg(userId, ugId, sbjtId);
		}
		else if("1" == sbjtType)
		{
			showBtnListForSbjtCtgyOfSg(userId, ugId, sbjtId);
		}
		else if("2" == sbjtType)
		{
			showBtnListForSbjtItemOfSg(userId, ugId, sbjtId);
		}
	}
}

function showSubSbjt(formId, liElemId, selectedElemId, elemName)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			showSubSbjtRsps(message, liElemId, selectedElemId, elemName);
       	}
    });
}

function showSubSbjtRsps(msg, liElemId, selectedElemId, elemName)
{
	if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题信息出错，请稍后再试！");
	}
	else
	{
		var liElem = document.getElementById(liElemId);
		var isChecked = false;
		if(null != liElem)
		{
			var subInputs = liElem.getElementsByTagName("input");
			if(null != subInputs)
			{
				var cbArr = new Array();
				for(var i=0; i<subInputs.length; i=i+1)
				{
					if("checkbox" == subInputs[i].type)
					{
						cbArr.push(subInputs[i]);
					}
				}
				
				if(0 < cbArr.length)
				{
					isChecked = cbArr[0].checked;
				}
			}
			
			liElem.outerHTML = msg;
			selectElem(selectedElemId, elemName);

			liElem = document.getElementById(liElemId);
			subInputs = liElem.getElementsByTagName("input");
			if(null != subInputs)
			{
				var cbArr = new Array();
				for(var i=0; i<subInputs.length; i=i+1)
				{
					if("checkbox" == subInputs[i].type)
					{
						cbArr.push(subInputs[i]);
					}
				}
				
				if(0 < cbArr.length)
				{
					cbArr[0].checked = isChecked;
					selectCheckbox(liElemId, cbArr[0].id);
				}
			}
		}
	}
}

function showSbjtNews(sbjtId, pageNo, perPageItemNum)
{
	var submitURL = "ShowSbjtNewsServlet?sbjtId=" + sbjtId
		+ "&pageNo=" + pageNo
		+ "&perPageItemNum=" + perPageItemNum;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showSbjtNewsRsps;
	ajax.send();
}

function showSbjtNewsRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_news_fail" == state)
			{
				alertMsg("获取新闻失败，请稍后再试！");
			}
			else if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息失败，请稍后再试！");
			}
			else
			{
				showMainContent(state);
			}
		}
	}
}

function unshowSbjtNews(formId, sbjtId, pageNo, perPageItemNum)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			unshowSbjtNewsRsps(message, sbjtId, pageNo, perPageItemNum);
       	}
    });
}

function unshowSbjtNewsRsps(msg, sbjtId, pageNo, perPageItemNum)
{
	if("unshow_sbjt_news_fail" == msg)
	{
		alertMsg("删除新闻出错，请稍后再试！");
	}
	else if("get_sbjt_news_fail" == msg)
	{
		alertMsg("获取新闻信息出错，请稍后再试！");
	}
	else if("unshow_sbjt_news_success" == msg)
	{
		showSbjtNews(sbjtId, pageNo, perPageItemNum);
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function submitSearchSbjtNews(formId)
{
	alertMsg("开始搜索，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitSearchSbjtNewsRsps(message);
       	}
    });
}

function submitSearchSbjtNewsRsps(msg)
{
	if("keyword_should_not_be_null" == msg)
	{
		alertMsg("请输入搜索关键词！");
	}
	else if("search_sbjt_news_fail" == msg)
	{
		alertMsg("搜索新闻出错，请稍后再试！");
	}
	else
	{
		showMainContent(msg);
	}
}

function showSearchedSbjtNews(userId, kw, time, pageNo, perPageItemNum)
{
	var submitURL = "SearchSbjtNewsServlet?userId=" + userId
		+ "&kw=" + encode(kw)
		+ "&time=" + time
		+ "&pageNo=" + pageNo
		+ "&perPageItemNum=" + perPageItemNum;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showSearchedSbjtNewsRsps;
	ajax.send();
}

function showSearchedSbjtNewsRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("keyword_should_not_be_null" == state)
			{
				alertMsg("请输入搜索关键词");
			}
			else if("search_sbjt_news_fail" == state)
			{
				alertMsg("搜索新闻出错，请稍后再试！");
			}
			else
			{
				showMainContent(state);
			}
		}
	}
}

function unshowSearchedSbjtNews(formId, userId, kw, time, pageNo, perPageItemNum)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			unshowSearchedSbjtNewsRsps(message, userId, kw, time, pageNo, perPageItemNum);
       	}
    });
}

function unshowSearchedSbjtNewsRsps(msg, userId, kw, time, pageNo, perPageItemNum)
{
	if("get_sbjt_news_fail" == msg)
	{
		alertMsg("获取新闻信息出错，请稍后再试！");
	}
	else if("unshow_sbjt_news_fail" == msg)
	{
		alertMsg("删除新闻出错，请稍后再试！");
	}
	else if("unshow_sbjt_news_success" == msg)
	{
		showSearchedSbjtNews(userId, kw, time, pageNo, perPageItemNum);
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddSbjtForm(userId)
{
	var submitURL = "ShowAddSbjtFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddSbjtFormRsps;
	ajax.send();
}

function showAddSbjtFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_user_fail" == state)
			{
				alertMsg("获取用户信息失败，请稍后再试！");
			}
			else
			{	
				var msg = "<div align=\"center\"><br />专题：它是知识体系的最高级别，在专题下可以添加“专题分类”和“专题项”，" 
					+ "<a style=\"text-decoration:underline; color:#214A7B;\" href=\"javascript:showImg('images/subject.png');\">查看示例</a><br/><br/>"
					+ "</div>";
				showContent("添加专题", state, true, msg);
			}
		}
	}
}

function submitAddSbjt(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddSbjtRsps(message);
       	}
    });
}

function submitAddSbjtRsps(msg)
{
	if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题信息出错，请稍后再试！");
	}
	else if("key_kw_should_not_be_null" == msg)
	{
		alertMsg("相似词所属的关键词不能为空！");
	}
	else if("sbjt_name_cn_should_not_be_null" == msg)
	{
		alertMsg("请输入专题名称！");
	}
	else if("add_sbjt_fail" == msg)
	{
		alertMsg("添加专题出错，请稍后再试！");
	}
	else if("add_sbjt_success" == msg)
	{
		clearMainContent();
		alertMsg("添加专题项成功，请查看！");
		refresh();
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showSbjtKwCmbn(elemId, elemNamePrefix)
{
	showAllSbjtKwCmbn();
/*
	var elem = document.getElementById(elemId);
	if(null != elem)
	{
		var arr = new Array();
		for(var i=0; i<3; i=i+1)
		{
			var elemName = elemNamePrefix + i;
			var kwElems = document.getElementsByName(elemName);
			if(null != kwElems)
			{
				var kwArray = new Array();
				for(var j=0; j<kwElems.length; j=j+1)
				{
					var kw = kwElems[j].value.trim();
					if((null!=kw) && (""!=kw))
					{
						kwArray.push("\"" + kw + "\"");
					}
				}
				if(0 < kwArray.length)
				{
					var kwCmbn = "";
					for(var k=0; k<kwArray.length; k=k+1)
					{
						kwCmbn = kwCmbn + kwArray[k];
						if(k < kwArray.length-1)
						{
							kwCmbn = kwCmbn + " OR ";
						}
					}
					arr.push(kwCmbn);
				}			
			}
		}
		var cmbn = "";
		if(0 < arr.length)
		{
			for(var m=0; m<arr.length; m=m+1)
			{
				cmbn = cmbn + "[ " + arr[m] + " ]";
				if(m < arr.length-1)
				{
					cmbn = cmbn + " AND ";
				}
			}
		}
		elem.value = cmbn;
	}
*/
}

function showDelSbjtForm(userId, sbjtId)
{
	var submitURL = "ShowDelSbjtFormServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDelSbjtFormRsps;
	ajax.send();
}

function showDelSbjtFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息失败，请稍后再试！");
			}
			else if("has_no_del_athy" == state)
			{
				alertMsg("您没有删除权限！");
			}
			else
			{
				showContent("删除专题", state, false, "");
			}
		}
	}
}

function submitDelSbjt(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitDelSbjtRsps(message);
       	}
    });
}

function submitDelSbjtRsps(msg)
{
	if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题信息出错，请稍后再试！");
	}
	else if("has_no_del_athy" == msg)
	{
		alertMsg("您没有删除权限！");
	}
	else if("del_sbjt_success" == msg)
	{
		clearMainContent();
		alertMsg("删除成功，请查看！");
		refresh();
	}
	else if("del_sbjt_fail" == msg)
	{
		alertMsg("删除出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showEditSbjtKwForm(userId, sbjtId)
{
	var submitURL = "ShowEditSbjtKwFormServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showEditSbjtKwFormRsps;
	ajax.send();
}

function showAllSbjtKwCmbn()
{
	var kwNamesEn = ["sbjt_kw_cn_", "sbjt_kw_en_", "sbjt_kw_else_"];
	var kwCmbnNames = ["sbjt_kw_cn_cmbn", "sbjt_kw_en_cmbn", "sbjt_kw_else_cmbn"];
	var kwTopKwId = ["top_sbjt_kw_cn", "top_sbjt_kw_en", "top_sbjt_kw_else"];
	for(var i=0; i<3; i=i+1)
	{
		showSbjtItemKwCmbn(kwCmbnNames[i], kwTopKwId[i], kwNamesEn[i]);
	}
}

function showEditSbjtKwFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息出错，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else
			{
				showContent("编辑关键词", state, false, "");
				showAllSbjtKwCmbn()
			}
		}
	}
}


function submitEditSbjtKw(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEditSbjtKwRsps(message);
       	}
    });
}

function submitEditSbjtKwRsps(msg)
{
	if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题信息出错，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("您没有编辑权限！");
	}
	else if("key_kw_should_not_be_null" == msg)
	{
		alertMsg("相似词所属的关键词不能为空！");
	}
	else if("edit_sbjt_kw_fail" == msg)
	{
		clearMainContent();
		alertMsg("编辑出错，请稍后再试！");
	}
	else if("edit_sbjt_kw_success" == msg)
	{
		clearMainContent();
		alertMsg("编辑成功，请查看！");
		refresh();
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showShareSbjtToUgForm(userId, sbjtId)
{
	var submitURL = "ShowShareSbjtToUgFormServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showShareSbjtToUgFormRsps;
	ajax.send();
}

function showShareSbjtToUgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息失败，请稍后再试！");
			}
			else if("get_user_fail" == state)
			{
				alertMsg("获取用户信息失败，请稍后再试！");
			}
			else if("has_no_share_athy" == state)
			{
				alertMsg("您没有共享权限！");
			}
			else 
			{
				showContent("共享专题", state, false, "");
			}
		}
	}
}

function submitShareSbjtToUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitShareSbjtToUgRsps(message);
       	}
    });
}

function submitShareSbjtToUgRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题失败，请稍后再试！");
	}
	else if("sbjt_id_should_not_be_null" == msg)
	{
		alertMsg("请选择专题！");
	}
	else if("share_sbjt_to_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("添加成功，请查看！");
		refresh();
	}
	else if("share_sbjt_to_ug_fail" == msg)
	{
		alertMsg("添加失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddSbjtCtgyForm(userId, sbjtId)
{
	var submitURL = "ShowAddSbjtCtgyFormServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddSbjtCtgyFormRsps;
	ajax.send();
}

function showAddSbjtCtgyFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息失败，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else
			{	
				var msg = "<div align=\"center\"><br />专题分类：它位于“专题”之下，在“专题”分类下可以添加“专题分类”和“专题项”，"
					+ "<a style=\"text-decoration:underline; color:#214A7B\" href=\"javascript:showImg('images/subject.png');\">查看示例</a><br/><br/>"
					+ "</div>";
				showContent("添加分类", state, true, msg);
			}
		}
	}
}

function submitAddSbjtCtgy(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddSbjtCtgyRsps(message);
       	}
    });
}

function submitAddSbjtCtgyRsps(msg)
{
	if("sbjt_name_cn_should_not_be_null" == msg)
	{
		alertMsg("请输入专题分类名称！");
	}
	else if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题信息失败，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("您没有编辑权限！");
	}
	else if("add_sbjt_ctgy_success" == msg)
	{
		clearMainContent();
		alertMsg("添加专题分类成功，请查看！");
		refresh();
	}
	else if("add_sbjt_ctgy_fail" == msg)
	{
		alertMsg("添加专题分类出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showDelSbjtCtgyForm(userId, sbjtId)
{
	var submitURL = "ShowDelSbjtCtgyFormServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDelSbjtCtgyFormRsps;
	ajax.send();
}

function showDelSbjtCtgyFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题分类信息失败，请稍后再试！");
			}
			else if("has_no_del_athy" == state)
			{
				alertMsg("您没有删除权限！");
			}
			else
			{
				showContent("删除专题分类", state, false, "");
			}
		}
	}
}

function showRenameSbjtCtgyForm(userId, sbjtId)
{
	var submitURL = "ShowRenameSbjtCtgyFormServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showRenameSbjtCtgyFormRsps;
	ajax.send();
}

function showRenameSbjtCtgyFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息失败，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else
			{	
				showContent("修改名称", state, false, "");
			}
		}
	}
}

function submitRenameSbjtCtgy(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitRenameSbjtCtgyRsps(message);
       	}
    });
}

function submitRenameSbjtCtgyRsps(msg)
{
	if("sbjt_name_cn_should_not_be_null" == msg)
	{
		alertMsg("请输入新的专题分类名称！");
	}
	else if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题信息失败，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("您没有编辑权限！");
	}
	else if("rename_sbjt_ctgy_success" == msg)
	{
		clearMainContent();
		alertMsg("修改名称成功，请查看！");
		refresh();
	}
	else if("rename_sbjt_ctgy_fail" == msg)
	{
		alertMsg("修改名称出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddSbjtItemForm(userId, sbjtId)
{
	var submitURL = "ShowAddSbjtItemFormServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddSbjtItemFormRsps;
	ajax.send();
}

function showAddSbjtItemFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息失败，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else
			{	
				var msg = "<div align=\"center\"><br />专题项：它位于专题知识体系中的最底层，不能在专题项下再添加内容，点击专题项后可查阅抓取到的相关新闻，"
					+ "<a style=\"text-decoration:underline; color:#214A7B\" href=\"javascript:showImg('images/subject.png');\">查看示例</a><br/><br/>"
					+ "</div>";
				showContent("添加专题项", state, true, msg);
			}
		}
	}
}

function submitAddSbjtItem(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddSbjtItemRsps(message);
       	}
    });
}

function submitAddSbjtItemRsps(msg)
{
	if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题信息出错，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("您没有编辑权限！");
	}
	else if("key_kw_should_not_be_null" == msg)
	{
		alertMsg("相似词所属的关键词不能为空！");
	}
	else if("sbjt_name_cn_should_not_be_null" == msg)
	{
		alertMsg("请输入专题项名称！");
	}
	else if("add_sbjt_item_fail" == msg)
	{
		alertMsg("添加专题项出错，请稍后再试！");
	}
	else if("add_sbjt_item_success" == msg)
	{
		clearMainContent();
		alertMsg("添加专题项成功，请查看！");
		refresh();
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showSbjtItemKwCmbn(elemId, topId, elemNamePrefix)
{
	var elem = document.getElementById(elemId);
	if(null != elem)
	{
		var arr = new Array();
		for(var i=0; i<3; i=i+1)
		{
			var elemName = elemNamePrefix + i;
			var kwElems = document.getElementsByName(elemName);
			if(null != kwElems)
			{
				var kwArray = new Array();
				for(var j=0; j<kwElems.length; j=j+1)
				{
					var kw = kwElems[j].value.trim();
					if((null!=kw) && (""!=kw))
					{
						kwArray.push("'" + kw + "'");
					}
				}
				if(0 < kwArray.length)
				{
					var kwCmbn = "";
					for(var k=0; k<kwArray.length; k=k+1)
					{
						kwCmbn = kwCmbn + kwArray[k];
						if(k < kwArray.length-1)
						{
							kwCmbn = kwCmbn + " OR ";
						}
					}
					arr.push(kwCmbn);
				}			
			}
		}
		var cmbn = "";
		if(0 < arr.length)
		{
			for(var m=0; m<arr.length; m=m+1)
			{
				cmbn = cmbn + "[ " + arr[m] + " ]";
				if(m < arr.length-1)
				{
					cmbn = cmbn + " AND ";
				}
			}
		}
		
		var topKw = "";
		var topKwElem = document.getElementById(topId);
		if(null != topKwElem)
		{
			topKw = topKwElem.value;
			if((null!=topKw) && (""!=topKw.trim()))
			{
				if((null!=cmbn) && (""!=cmbn))
				{
					cmbn = "[ " + topKw + " ]" + " AND " + cmbn;
				}
				else
				{
					cmbn = "[ " + topKw + " ]";
				}
			}
		}
		elem.value = cmbn;
	}
}

function showDelSbjtItemForm(userId, sbjtId)
{
	var submitURL = "ShowDelSbjtItemFormServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDelSbjtItemFormRsps;
	ajax.send();
}

function showDelSbjtItemFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题项信息失败，请稍后再试！");
			}
			else if("has_no_del_athy" == state)
			{
				alertMsg("您没有删除权限！");
			}
			else
			{
				showContent("删除专题项", state, false, "");
			}
		}
	}
}

function showAddSbjtToUgForm(ugId, userId)
{
	var submitURL = "ShowAddSbjtToUgFormServlet?ugId=" + ugId
		+ "&userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddSbjtToUgFormRsps;
	ajax.send();
}

function showAddSbjtToUgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_ug_fail" == state)
			{
				alertMsg("获取用户组信息出错，请稍后再试！");
			}
			else if("get_user_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else
			{
				showContent("添加专题至用户组", state, false, "");
			}
		}
	}
}

function submitAddSbjtToUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddSbjtToUgRsps(message);
       	}
    });
}

function submitAddSbjtToUgRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("get_sbjt_fail" == msg)
	{
		alertMsg("获取专题失败，请稍后再试！");
	}
	else if("sbjt_id_should_not_be_null" == msg)
	{
		alertMsg("请选择专题！");
	}
	else if("share_sbjt_to_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("添加成功，请查看！");
		refresh();
	}
	else if("share_sbjt_to_ug_fail" == msg)
	{
		alertMsg("添加失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showUnshareSbjtFromUgForm(ugId, userId)
{
	var submitURL = "ShowUnshareSbjtFromUgFormServlet?userId=" + userId
		+ "&ugId=" + ugId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showUnshareSbjtFromUgFormRsps;
	ajax.send();
}

function showUnshareSbjtFromUgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_ug_fail" == state)
			{
				alertMsg("获取用户组信息出错，请稍后再试！");
			}
			else if("get_user_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else
			{
				showContent("取消共享", state, false, "");
			}
		}
	}
}

function submitUnshareSbjtFromUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitUnshareSbjtFromUgRsps(message);
       	}
    });
}

function submitUnshareSbjtFromUgRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息出错，请稍后再试！");
	}
	else if("sbjt_id_should_not_be_null" == msg)
	{
		alertMsg("请选择专题！");
	}
	else if("unshare_sbjt_from_ug_success" == msg)
	{
	    clearMainContent();
		alertMsg("取消共享成功，请查看！");
		refresh();
	}
	else if("unshare_sbjt_from_ug_fail" == msg)
	{
		alertMsg("取消共享出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showFollowSbjtFromUgForm(ugId, userId)
{
	var submitURL = "ShowFollowSbjtFromUgFormServlet?userId=" + userId
		+ "&ugId=" + ugId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showFollowSbjtFromUgFormRsps;
	ajax.send();
}

function showFollowSbjtFromUgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_ug_fail" == state)
			{
				alertMsg("获取用户组信息失败，请稍后再试！");
			}
			else if("get_user_fail" == state)
			{
				alertMsg("获取用户信息失败，请稍后再试！");
			}
			else
			{
				showContent("关注专题", state, false, "");
			}
		}
	}
}

function submitFollowSbjtFromUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitFollowSbjtFromUgRsps(message);
       	}
    });
}

function submitFollowSbjtFromUgRsps(msg)
{
	if("sbjt_id_should_not_be_null" == msg)
	{
		alertMsg("请选择专题！");
	}
	else if("follow_sbjt_from_ug_fail" == msg)
	{
		alertMsg("关注专题失败，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("follow_sbjt_from_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("关注专题成功，请查看！");
		refresh();
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showUnfollowSbjtForm(ugId, userId, wbstId)
{
	var submitURL = "ShowUnfollowSbjtFormServlet?userId=" + userId
		+ "&ugId=" + ugId
		+ "&sbjtId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showUnfollowSbjtFormRsps;
	ajax.send();
}

function showUnfollowSbjtFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息出错，请稍后再试！");
			}
			else
			{   
				showContent("取消关注", state, false, "");
			}
		}
	}
}

function submitUnfollowSbjt(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitUnfollowSbjtRsps(message);
       	}
    });
}

function submitUnfollowSbjtRsps(msg)
{
	if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("unfollow_sbjt_success" == msg)
	{
		clearMainContent();
		alertMsg("取消关注成功，请查看！");
		refresh();
	}
	else if("unfollow_sbjt_fail" == msg)
	{
		alertMsg("取消关注失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showDelSbjtFromUgForm(ugId, userId, sbjtId)
{
	var submitURL = "ShowDelSbjtFromUgFormServlet?ugId=" + ugId
		+ "&userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDelSbjtFromUgFormRsps;
	ajax.send();
}

function showDelSbjtFromUgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_ug_fail" == state)
			{
				alertMsg("获取用户组失败，请稍后再试！");
			}
			else if("has_no_del_athy" == state)
			{
				alertMsg("您没有权限！");
			}
			else if("get_sbjt_fail" == state)
			{
				alertMsg("获取专题信息失败，请稍后再试！");
			}
			else
			{
				showContent("从用户组删除专题", state, false, "");
			}
		}
	}
}

function submitDelSbjtFromUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitDelSbjtFromUgRsps(message);
       	}
    });
}

function submitDelSbjtFromUgRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组失败，请稍后再试！");
	}
	else if("has_no_del_athy" == msg)
	{
		clearMainContent();
		alertMsg("您没有删除权限！");
	}
	else if("del_sbjt_from_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("删除成功，请查看！");
		refresh();
	}
	else if("del_sbjt_from_ug_fail" == msg)
	{
		alertMsg("删除失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function submitUpdateSelectedSbjt(userId, cbName)
{
	var str = "";
	var cbs = document.getElementsByName(cbName);
	if((null!=cbs) && (0<cbs.length))
	{
		for(var i=0; i<cbs.length; i=i+1)
		{
			if(cbs[i].checked)
			{
				str = str + cbs[i].value + ";";
			}
		}
		
		if("" == str)
		{
			alertMsg("请选择专题！");
		}
		else
		{
			alertMsg("开始进行专题新闻更新！");
			var submitURL = "UpdateSbjtNewsServlet?userId=" + userId
				+ "&selectedSbjtId=" + str;
			ajax.open('POST', submitURL, true);
			ajax.onreadystatechange = submitUpdateSelectedSbjtRsps;
			ajax.send();
		}
	}
	else
	{
		alertMsg("请选择专题！");
	}
}

function submitUpdateSelectedSbjtRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_Id_fail" == state)
			{
				alertMsg("获取专题信息失败，请稍后再试！");
			}
			else if("sbjt_id_should_not_be_null" == state)
			{
				alertMsg("请选择要更新的专题！");
			}
			else if("get_user_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else if("update_sbjt_news_success" == state)
			{
				alertMsg("更新专题新闻成功，请查看！");
			}
			else
			{
				alertMsg("操作出现异常，请稍后再试！");
			}
		}
	}
}



function showListUgToFollowSbjtForm(userId)
{
	var submitURL = "ShowListUgToFollowSbjtFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListUgToFollowSbjtFormRsps;
	ajax.send();
}

function showListUgToFollowSbjtFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_user_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else
			{
				showContent("关注专题", state, false, "");
			}
		}
	}
}

function showListSbjtToShareForm(userId)
{
	var submitURL = "ShowListSbjtToShareFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListSbjtToShareFormRsps;
	ajax.send();
}

function showListSbjtToShareFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_user_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else
			{
				showContent("共享专题", state, false, "");
			}
		}
	}
}

function showListWbstToDelForm(userId)
{
	var submitURL = "ShowListWbstToDelFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListWbstToDelFormRsps;
	ajax.send();
}

function showListWbstToDelFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_user_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else
			{
				showContent("删除网站", state, false, "");
			}
		}
	}
}




function submitUpdateSbjt(userId, sbjtId)
{
	var submitURL = "UpdateSingleSbjtServlet?userId=" + userId
		+ "&sbjtId=" + sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = submitUpdateSbjtRsps;
	ajax.send();
	
	alertMsg("开始进行专题新闻更新！");
}

function submitUpdateSbjtRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_sbjt_id_fail" == state)
			{
				alertMsg("获取专题信息出错，请稍后再试！");
			}
			else if("get_user_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else if("update_sbjt_news_success" == state)
			{
				alertMsg("更新专题新闻成功，请查看！");
			}
			else
			{
				alertMsg("操作出现异常，请稍后再试！");
			}
		}
	}
}

function showInfo(userId,sbjtId)
{
	alert("aa");
	var submitURL = "ShowSbjtInfoServlet?uerId="+userId+"&sbjtId="+sbjtId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showInfoRsps;
	ajax.send();
}

function showInfoRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;

				alertMsg(state);


		}
	}
}
