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

function selectBtnList(listType, userId, ugId, wbstId)
{
	if("0" == listType)
	{
		showBtnListForWbstOfUser(userId, wbstId);
	}
	else if("1" == listType)
	{
		showBtnListForWbstOfTg(ugId, userId, wbstId);
	}
	else if("2" == listType)
	{
		showBtnListForWbstOfSg(ugId, userId, wbstId);
	}
}

function showBtnListForWbstOfUserTitle(userId)
{
	var btnAddWbst = getBtnAddWbst(userId);
	
	var btnList = btnAddWbst;
	showBtnList(btnList);
}

function showBtnListForWbstOfUser(userId, wbstId)
{
	var btnEditWbst = getBtnEditWbst(userId, wbstId);
	var btnRenameWbst = getBtnRenameWbst(userId, wbstId);
	var btnDelWbst = getBtnDelWbst(userId, wbstId);
	var btnEditWbstKw = getBtnEditWbstKw(userId, wbstId);
	var btnEditWbstUpdateMethod = getBtnEditWbstUpdateMethod(userId, wbstId);
	var btnShareWbstToUg = getBtnShareWbstToUg(userId, wbstId);
	var btnUpdateWbst = getBtnUpdateWbst(userId, wbstId);
	var btnQuestion=getBtnQusetion(userId);
	var btnEnableVPN = getBtnEnableVPN(userId, wbstId);
	var btCheckAnswer = "";//getBtnCheckAnswer(userId);
	var btnList = btnEditWbst +"&nbsp;&nbsp;" +btnRenameWbst+"&nbsp;&nbsp;" + btnDelWbst
		+"&nbsp;&nbsp;"+ btnEditWbstKw +"&nbsp;&nbsp;" 
		+ btnShareWbstToUg + "&nbsp;&nbsp;" + btnUpdateWbst+"&nbsp;&nbsp;" 
		+ btnEditWbstUpdateMethod + "&nbsp;&nbsp;" + btnQuestion+btCheckAnswer
		+ "&nbsp;&nbsp;" + btnEnableVPN;
	showBtnList(btnList);
}

function showBtnListForTgListTitle()
{
	var btnList = "";
	
	showBtnList(btnList);
}

function showBtnListForWbstOfTgTitle(ugId, userId)
{
	var btnAddWbstToUg = getBtnAddWbstToUg(ugId, userId);
	var btnUnshareWbstFromUg = getBtnUnshareWbstFromUg(ugId, userId);
	
	var btnList = btnAddWbstToUg +"&nbsp;&nbsp;"+ btnUnshareWbstFromUg;
	showBtnList(btnList);
}

function showBtnListForWbstOfTg(ugId, userId, wbstId)
{
	var btnEditWbst = getBtnEditWbst(userId, wbstId);
	var btnRenameWbst = getBtnRenameWbst(userId, wbstId);
	var btnEditWbstKw = getBtnEditWbstKw(userId, wbstId);
	var btnEditWbstUpdateMethod = getBtnEditWbstUpdateMethod(userId, wbstId);
	var btnDelWbstFromUg = getBtnDelWbstFromUg(ugId, userId, wbstId);
	var btnUpdateWbst = getBtnUpdateWbst(userId, wbstId);
	var btnEnableVPN = getBtnEnableVPN(userId, wbstId);
	
	var btnList = btnEditWbst+"&nbsp;&nbsp;" + btnRenameWbst +"&nbsp;&nbsp;"+ btnEditWbstKw 
		+"&nbsp;&nbsp;" + btnDelWbstFromUg +"&nbsp;&nbsp;"+ btnUpdateWbst+"&nbsp;&nbsp;"
		+ btnEditWbstUpdateMethod + "&nbsp;&nbsp" + btnEnableVPN;
	showBtnList(btnList);
}

function showBtnListForWbstOfSgTitle(ugId, userId)
{
	var btnAddWbstToUg = getBtnAddWbstToUg(ugId, userId);
	var btnUnshareWbstFromUg = getBtnUnshareWbstFromUg(ugId, userId);
	var btnFollowWbstFromUg = getBtnFollowWbstFromUg(ugId, userId);
	
	var btnList = btnAddWbstToUg+"&nbsp;&nbsp;" + btnUnshareWbstFromUg+"&nbsp;&nbsp;" + btnFollowWbstFromUg;
	
	showBtnList(btnList);
}

function showBtnListForWbstOfSg(ugId, userId, wbstId)
{
	var btnUnfollowWbst = getBtnUnfollowWbst(ugId, userId, wbstId);
	var btnUpdateWbst = getBtnUpdateWbst(userId, wbstId);
	
	var btnList = btnUnfollowWbst+"&nbsp;&nbsp;" + btnUpdateWbst;
	showBtnList(btnList);
}

function showBtnListForTopTitle(formId)
{
	var btnUpdateSelectedWbst = getBtnUpdateSelectedWbst(formId);
	
	var btnList = btnUpdateSelectedWbst;
	showBtnList(btnList);
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

function getBtnUpdateSelectedWbst(formId)
{
	var btn = "<input type=\"button\""
		+ "value=\"&nbsp;更新选择的网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ "onclick=\"submitUpdateSelectedWbst('" + formId + "');\""
		+ " />";
		
	return btn;
}

function getBtnUpdateWbst(userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;更新网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"submitUpdateWbst('" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function getBtnAddWbst(userId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;添加网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showChooseAddWbstMethodForm('" + userId + "');\""
		+ " />";

	return btn;
}

function getBtnEditWbst(userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;编辑网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showEditWbstForm('" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function getBtnRenameWbst(userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;修改名称&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showRenameWbstForm('" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function getBtnDelWbst(userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;删除网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showDelWbstForm('" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function getBtnEditWbstKw(userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"编辑关键词\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showEditWbstKwForm('" + userId + "', '" + wbstId +　"');\""
		+ " />";
	
	return btn;
}

function getBtnEditWbstUpdateMethod(userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;设置网站更新方式&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showEditWbstUpdateMethodForm('" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function getBtnShareWbstToUg(userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;共享网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showShareWbstToUgForm('" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function getBtnAddWbstToUg(ugId, userId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;添加网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showAddWbstToUgForm('" + ugId + "', '" + userId + "');\""
		+ " />";
		
	return btn;
}

function getBtnUnshareWbstFromUg(ugId, userId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;取消共享&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showUnshareWbstFromUgForm('" + ugId + "', '" + userId + "');\""
		+ " />";
		
	return btn;
}

function getBtnDelWbstFromUg(ugId, userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;删除网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showDelWbstFromUgForm('" + ugId + "', '" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function getBtnFollowWbstFromUg(ugId, userId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;关注网站&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showFollowWbstFromUgForm('" + ugId + "', '" + userId + "');\""
		+ " />";
		
	return btn;
}

function getBtnUnfollowWbst(ugId, userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;取消关注&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showUnfollowWbstForm('" + ugId + "', '" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function getBtnEnableVPN(userId, wbstId)
{
	var btn = "<input type=\"button\""
		+ " value=\"&nbsp;设置VPN接入&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showEnableSingleWbstVPNForm('" + userId + "', '" + wbstId + "');\""
		+ " />";
		
	return btn;
}

function submitUpdateSelectedWbst(formId)
{
	alertMsg("开始进行网站新闻更新！");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitUpdateSelectedWbstRsps(message);
       	}
    });
}

function submitUpdateSelectedWbstRsps(msg)
{
	if("get_wbst_Id_fail" == msg)
	{
		alertMsg("获取网站信息失败，请稍后再试！");
	}
	else if("wbst_id_should_not_be_null" == msg)
	{
		alertMsg("请选择要更新的网站！");
	}
	else if("get_user_fail" == state)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else if("update_wbst_news_success" == msg)
	{
		alertMsg("更新网站新闻成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function submitUpdateWbst(userId, wbstId)
{
	var submitURL = "UpdateWbstNewsServlet?userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = submitUpdateWbstRsps;
	ajax.send();
	alertMsg("开始进行网站新闻更新！");
}

function submitUpdateWbstRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_wbst_Id_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else if("wbst_id_should_not_be_null" == state)
			{
				alertMsg("请选择要更新的网站！");
			}
			else if("get_user_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else if("update_wbst_news_success" == state)
			{
				alertMsg("更新网站新闻成功，请查看！");
			}
			else
			{
				alertMsg("操作出现异常，请稍后再试！");
			}
		}
	}
}

function showAddWbstFormContent(title, formContent, msg)
{
	var content = "<table height=\"400\" valign=\"middle\" border=\"0\">"
			+ "<tr>"
				+ "<td valign=\"middle\" width=\"33%\">"
					+ "<img src=\"images/12.jpg\" width=\"350\">"
				+ "</td>"
				+ "<td valign=\"middle\" width=\"33%\" align=\"center\">"
				+ formContent
				+ "</td>"
				+ "<td valign=\"middle\" width=\"33%\">"
					+ "<img src=\"images/17.jpg\" width=\"350\">"
				+ "</td>"
			+ "</tr>"
		+ "</table>";
	showContent(title, content, true, msg);
}

function showChooseAddWbstMethodForm(userId)
{
	var content = "<form method=\"post\">"
			+ "<table border=\"0\">"
				+ "<tr><td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp选择拟跟踪网站的添加方式：</td></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr>"
					+ "<td>"
						+ "<input style=\"background-color: #2894ff; width:250px;height:30px\" type=\"button\" value=\"&nbsp;方式一：全网动态信息跟踪&nbsp;\" onclick=\"showAddWbstForm('0', '" + userId + "');\" />"
					+ "</td>"
					+ "<td align=center></td>"
				+ "</tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr>"
					+ "<td>"
						+ "<input style=\"background-color: #2894ff; width:250px;height:30px\" type=\"button\" value=\"&nbsp;方式二：指定版块内容跟踪&nbsp;\"onclick=\"showAddWbstForm('1', '" + userId + "');\" />"
					+ "</td>"
					+ "<td align=center></td>"
				+ "</tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr><td><td/></tr>"
				+ "<tr>"
					+ "<td>"
						+ "<input style=\"background-color: #2894ff; width:250px;height:30px\" type=\"button\" value=\"&nbsp;方式三：RSS&nbsp;种&nbsp;子&nbsp;跟&nbsp;踪&nbsp;\"onclick=\"showAddWbstForm('2', '" + userId + "');\" />"
					+ "</td>"
					+ "<td align=center></td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
	var msg = "<br />"
		+ "&nbsp1、以全网动态信息跟踪方式添加站点时，当用户提供的站点任一部分有变化，系统便默认站点有更新，而后进行信息的采集和关键词过滤呈现。"
		+ "<br /><br />"
		+ "&nbsp2、以指定版块内容跟踪方式添加站点时，系统将根据用户指定的网页内容版块进行信息采集，而后根据用户的关键词设定对采集的信息进行过滤呈现。"
		+ "<br/><br/>"
		+ "&nbsp3、以RSS种子跟踪方式添加站点时，系统将解析RSS种子，提取其中的文章标题、链接、摘要，而后进行信息的采集和关键词过滤呈现。"
		+ "<br /><br />";
	showAddWbstFormContent("添加新的目标网站", content, msg);
}

function showAddWbstForm(method, userId)
{
	var content = "";
	var msg = "";
	var title = "";
	if(0 == method)
	{
		var formId = "add_wbst_simply_form";
		title = "全网动态信息跟踪方式添加新的目标网站";
		content = "<form id=\"" + formId + "\" action=\"AddWbstSimplyServlet\" method=\"post\">"
			+ "<table>"
			+ "<tr><td><input type=\"hidden\" name=\"userId\" value=\"" + userId + "\" /></td></tr>"
			+ "<tr><td><input type=\"hidden\" name=\"urlType\" value=\"0\" /></td></tr>"
			+ "<tr><td>目标网站名称：</td></tr>"
			+ "<tr><td>"
				+ "<input name=\"title\" style=\"border:1px solid #214A7B;width:300px\" type=\"text\" />"
			+ "</td></tr>"
			+ "<tr><td>目标网站网址：</td></tr>"
			+ "<tr><td>"
				+ "<input name=\"url\" style=\"border:1px solid #214A7B;width:300px\" type=\"text\" value=\"http://\" />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<hr style=\"height:1px;border:none;border-top:1px solid #555555;\" />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<hr style=\"height:5px;border:none;border-top:5px solid #214A7B;\" />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<table border=\"0\">"
					+ "<tr>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;提交上述信息&nbsp;\" onclick=\"submitAddWbstSimply('" + formId + "');\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;取消&nbsp;\" onclick=\"clearMainContent();\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;方式二&nbsp;\" onclick=\"showAddWbstForm('1', '" + userId + "');\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;方式三&nbsp;\" onclick=\"showAddWbstForm('2', '" + userId + "');\" /></td>"
					+ "</tr>"
				+ "</table>"
			+ "</td></tr>"
			+ "</table>"
		+ "</form>";
		msg = "";
	}
	else if(1 == method)
	{
		var formId = "add_wbst_with_cfg_form";
		title = "指定版块内容跟踪方式添加新的目标网站";
		content = "<form id=\"" + formId + "\" action=\"AddWbstWithCfgServlet\" method=\"post\">"
			+ "<table>"
			+ "<tr><td><input type=\"hidden\" name=\"userId\" value=\"" + userId + "\" /></td></tr>"
			+ "<tr><td>目标网站名称：</td></tr>"
			+ "<tr><td>"
				+ "<input name=\"title\" style=\"border:1px solid #214A7B;width:300px\" type=\"text\" name=\"web_label\" id=\"web_label\" maxlength=\"80px\" />"
			+ "</td></tr>"
			+ "<tr><td>目标网站网址：</td></tr>"
			+ "<tr><td>"
				+ "<input name=\"url\" style=\"border:1px solid #214A7B;width:300px\" type=\"text\" name=\"web_site\" id=\"web_site\" value=\"http://\" maxlength=\"80px\" />"
			+ "</td></tr>"
			+ "<tr><td>目标新闻URL：</td></tr>"
			+ "<tr><td>"
				+ "<input name=\"sampleUrl\" style=\"border:1px solid #214A7B;width:300px\" type=\"text\" name=\"web_site1\" id=\"web_site1\" value=\"http://\" maxlength=\"80px\" />"
			+ "</td></tr>"
			+ "<tr><td>目标新闻条数：</td></tr>"
			+ "<tr><td>"
				+ "<input name=\"linkNum\" style=\"border:1px solid #214A7B ;width:300px\" type=\"text\" name=\"news_number\" id=\"news_number\" maxlength=\"80px\" />"
			+ "</td></tr>"
			+ "<tr><td>目标网站编码：</td></tr>"
			+ "<tr><td>"
				+ "<select name=\"charset\">"
					+ "<option value=\"UTF-8\">UTF-8</option>"
					+ "<option value=\"GB2312\">GB2312</option>"
					+ "<option value=\"GBK\">GBK</option>"
				+ "</select>"
				+ "<br />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<hr style=\"height:1px;border:none;border-top:1px solid #555555;\" />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<hr style=\"height:5px;border:none;border-top:5px solid #214A7B;\" />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<table border=\"0\">"
					+ "<tr>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;提交上述信息&nbsp;\" onclick=\"submitAddWbstWithCfg('" + formId + "');\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;取消&nbsp;\" onclick=\"clearMainContent();\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;方式一&nbsp;\" onclick=\"showAddWbstForm('0', '" + userId + "');\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;方式三&nbsp;\" onclick=\"showAddWbstForm('2', '" + userId + "');\" /></td>"
					+ "</tr>"
				+ "</table>"
			+ "</td></tr>"
			+ "</table>"
		+ "</form>";
		msg = "<br />"
			+ "&nbsp1、目标网站名称是用户根据需要为目标网站起的别名，方便查看和显示，如：新浪军事。" 
			+ "<br /><br />"
			+ "&nbsp2、目标网站网址是您要关注的网站的URL地址，必须是浏览器地址栏中的最终地址。"
			+ "<a style=\"text-decoration:underline; color:#214A7B\" href=\"javascript:showImg('images/web.png');\">查看示例</a>"
			+ "<br /><br />"
			+ "&nbsp3、目标新闻URL是目标网站中您要关注的某条新闻的URL地址，"
			+ "<a style=\"text-decoration:underline; color:#214A7B\" href=\"javascript:showImg('images/webUrl.png');\">查看示例</a>"
			+ "<br /><br />"
			+ "&nbsp4、目标新闻条数：此条数应略少于目标新闻在目标网站所属块中的新闻总条数，"
			+ "<a style=\"text-decoration:underline; color:#214A7B\" href=\"javascript:showImg('images/webNum.png');\">查看示例</a>"
			+ "<br /><br />"
			+ "&nbsp5、目标网站编码：在浏览器中，点击鼠标右键，选择“查看页面源代码”，可以在浏览器中查看网页源代码，在源代码中的<head></head>标签之间可以找到<meta>标签，根据标签中“charset”的值设置“目标网站编码”选项的值。<a style=\"text-decoration:underline; color:#214A7B\" href=\"javascript:showImg('images/webchar.png');\">查看示例</a>如果在HTML源代码中找不到上述标签，则英文站点一般选择“UTF-8”，中文站点一般选择“GBK”或“GB2312” 。"
			+ "<br/><br/>";
	}
	else if(2 == method)
	{
		var formId = "add_wbst_simply_form";
		title = "RSS种子跟踪方式添加新的目标网站";
		content = "<form id=\"" + formId + "\" action=\"AddWbstSimplyServlet\" method=\"post\">"
			+ "<table>"
			+ "<tr><td><input type=\"hidden\" name=\"userId\" value=\"" + userId + "\" /></td></tr>"
			+ "<tr><td><input type=\"hidden\" name=\"urlType\" value=\"1\" /></td></tr>"
			+ "<tr><td>目标网站名称：</td></tr>"
			+ "<tr><td>"
				+ "<input name=\"title\" style=\"border:1px solid #214A7B;width:300px\" type=\"text\" />"
			+ "</td></tr>"
			+ "<tr><td>RSS种子URL：</td></tr>"
			+ "<tr><td>"
				+ "<input name=\"url\" style=\"border:1px solid #214A7B;width:300px\" type=\"text\" value=\"http://\" />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<hr style=\"height:1px;border:none;border-top:1px solid #555555;\" />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<hr style=\"height:5px;border:none;border-top:5px solid #214A7B;\" />"
			+ "</td></tr>"
			+ "<tr><td>"
				+ "<table border=\"0\">"
					+ "<tr>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;提交上述信息&nbsp;\" onclick=\"submitAddWbstSimply('" + formId + "');\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;取消&nbsp;\" onclick=\"clearMainContent();\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;方式一&nbsp;\" onclick=\"showAddWbstForm('0', '" + userId + "');\" /></td>"
						+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;方式二&nbsp;\" onclick=\"showAddWbstForm('1', '" + userId + "');\" /></td>"
					+ "</tr>"
				+ "</table>"
			+ "</td></tr>"
			+ "</table>"
		+ "</form>";
		msg = "";
	}
	else
	{
		title = "操作异常";
		content = "操作出现异常，请稍后再试！";
		msg = "操作出现异常，请稍后再试！";
	}
	showAddWbstFormContent(title, content, msg);
}

function submitAddWbstSimply(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddWbstSimplyRsps(message);
       	}
    });
}

function submitAddWbstSimplyRsps(msg)
{
	if("url_should_not_be_null" == msg)
	{
		alertMsg("请输入网站地址！");
	}
	else if("title_should_not_be_null" == msg)
	{
		alertMsg("请输入网站名称！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("add_wbst_success" == msg)
	{
		clearMainContent();
		alertMsg("添加网站成功，请查看！");
		refresh();
	}
	else if("add_wbst_fail" == msg)
	{
		alertMsg("添加网站失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function submitAddWbstWithCfg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddWbstWithCfgRsps(message);
       	}
    });	
}

function submitAddWbstWithCfgRsps(msg)
{
	if("title_should_not_be_null" == msg)
	{
		alertMsg("请输入网站名称！");
	}
	else if("url_should_not_be_null" == msg)
	{
		alertMsg("请输入网站地址！");
	}
	else if("sample_url_should_not_be_null" == msg)
	{
		alertMsg("请输入目标新闻URL！");
	}
	else if("link_num_should_not_be_null" == msg)
	{
		alertMsg("请输入目标新闻条数！");
	}
	else if("charset_should_not_be_null" == msg)
	{
		alertMsg("请输入目标网站编码！");
	}
	else if("add_wbst_fail" == msg)
	{
		alertMsg("添加网站失败，请稍后再试！");
	}
	else if("add_wbst_success" == msg)
	{
		clearMainContent();
		alertMsg("添加网站成功，请查看！");
		refresh();
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("generate_wbst_cfg_fail" == msg)
	{
		alertMsg("定位板块信息失败，请稍后再试！");
	}
	else if("save_wbst_cfg_fail" == msg)
	{
		alertMsg("保存版块信息失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showEditWbstForm(userId, wbstId)
{
	var submitURL = "ShowEditWbstCfgFormServlet?userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showEditWbstFormRsps;
	ajax.send();
}

function showEditWbstFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else if("get_cfg_fail" == state)
			{
				alertMsg("获取配置文件信息失败！");
			}
			else if("wbst_is_rss_seed" == state)
			{
				alertMsg("网站URL为RSS，不可编辑！");
			}
			else
			{
				title = "编辑网站配置文件";
				msg = "友情提醒：编辑配置文件时各文本框的填写说明详见【添加站点】";
				showContent(title, state, true, msg);
			}
		}
	}
}

function submitEditWbstCfg(formId, userId, wbstId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEditWbstCfgRsps(message, userId, wbstId);
       	}
    });
}

function submitEditWbstCfgRsps(msg, userId, wbstId)
{
	if("url_should_not_be_null" == msg)
	{
		alertMsg("请输入目标网站网址！");
	}
	else if("sample_url_should_not_be_null" == msg)
	{
		alertMsg("请输入目标新闻URL！");
	}
	else if("link_num_should_not_be_null" == msg)
	{
		alertMsg("请输入目标新闻条数！");
	}
	else if("charset_should_not_be_null" == msg)
	{
		alertMsg("请选择网站编码！");
	}
	else if("update_wbst_url_fail" == msg)
	{
		alertMsg("更新网站地址失败，请稍后再试！");
	}
	else if("update_wbst_cfg_success" == msg)
	{
		clearMainContent();
		alertMsg("编辑网站信息成功，请重新设置网站更新方式！");
		showEditWbstUpdateMethodForm(userId, wbstId);
	}
	else if("update_wbst_cfg_fail" == msg)
	{
		alertMsg("编辑网站信息失败，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("您没有编辑权限！");
	}
	else if("get_wbst_fail" == msg)
	{
		alertMsg("获取网站信息出现异常，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showRenameWbstForm(userId, wbstId)
{
	var submitURL = "ShowRenameWbstFormServlet?userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showRenameWbstFormRsps;
	ajax.send();
}

function showRenameWbstFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else
			{
				showContent("修改网站名称", state, false, "");
			}
		}
	}
}

function submitRenameWbst(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitRenameWbstRsps(message);
       	}
    });
}

function submitRenameWbstRsps(msg)
{
	if("rename_wbst_fail" == msg)
	{
		alertMsg("网站名称修改失败，请稍后再试！");
	}
	else if("title_should_not_be_null" == msg)
	{
		alertMsg("请输入网站新名称！");
	}
	else if("get_wbst_fail" == msg)
	{
		alertMsg("获取网站信息失败，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("您没有编辑权限！");
	}
	else if("rename_wbst_success" == msg)
	{
		clearMainContent();
		alertMsg("网站名称修改成功，请查看！");
		refresh();
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showDelWbstForm(userId, wbstId)
{
	var submitURL = "ShowDelWbstFormServlet?userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDelWbstFormRsps;
	ajax.send();
}

function showDelWbstFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else if("get_athy_fail" == state)
			{
				alertMsg("获取权限信息失败，请稍后再试！");
			}
			else if("has_no_del_athy" == state)
			{
				alertMsg("您没有删除权限！");
			}
			else
			{
				showContent("删除网站", state, false, "");
			}
		}
	}
}

function submitDelWbst(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitDelWbstRsps(message);
       	}
    });
}

function submitDelWbstRsps(msg)
{
	if("get_wbst_fail" == msg)
	{
		alertMsg("获取网站信息失败，请稍后再试！");
	}
	else if("has_no_del_athy" == msg)
	{
		alertMsg("您没有删除权限！");
	}
	else if("del_wbst_success" == msg)
	{
		clearMainContent();
		alertMsg("删除网站成功，请查看！");
		refresh();
	}
	else if("del_wbst_fail" == msg)
	{
		alertMsg("删除网站失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showEditWbstKwForm(userId, wbstId)
{
	var submitURL = "ShowEditWbstKwFormServlet?userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showEditWbstKwFormRsps;
	ajax.send();
}

function showEditWbstKwFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else if("get_kw_fail" == state)
			{
				alertMsg("获取网站关键词失败，请稍后再试！");
			}
			else
			{
				showContent("修改目标网站新闻过滤关键词", state, false, "");
				showWbstKwCmbn();
			}
		}
	}
}

function showWbstKwCmbn()
{
	var elemId = "wbst_kw_cmbn";
	var elemNamePrefix = "wbst_kw_";
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
					var kw = kwElems[j].value.trim();;
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
}

function submitEditWbstKw(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEditWbstKwRsps(message);
       	}
    });
}

function submitEditWbstKwRsps(msg)
{
	if("get_wbst_fail" == msg)
	{
		alertMsg("获取网站信息失败，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("你没有编辑权限！");
	}
	else if("key_kw_should_not_be_null" == msg)
	{
		alertMsg("相似词所属的关键词不能为空！");
	}
	else if("update_wbst_kw_failed" == msg)
	{
		alertMsg("编辑网站关键词失败，请稍后再试！");
	}
	else if("update_wbst_kw_success" == msg)
	{
		clearMainContent();
		alertMsg("编辑网站关键词成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showEditWbstUpdateMethodForm(userId, wbstId)
{
	var submitURL = "ShowEditWbstUpdateMethodFormServlet?userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showEditWbstUpdateMethodFormRsps;
	ajax.send();
}

function showEditWbstUpdateMethodFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			state = ajax.responseText;
			if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else if("wbst_is_rss_seed" == state)
			{
				alertMsg("网站URL为RSS，不可编辑！");
			}
			else
			{
				showContent("设置网站更新方式", state, false, "");
			}
		}
	}
}

function submitEditWbstUpdateMethod(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEditWbstUpdateMethodRsps(message);
       	}
    });
}

function submitEditWbstUpdateMethodRsps(msg)
{
	if("get_wbst_fail" == msg)
	{
		alertMsg("获取网站信息出错，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("您没有编辑权限！");
	}
	else if("edit_update_method_success" == msg)
	{
		clearMainContent();
		alertMsg("设置网站更新方式成功，请查看！");
	}
	else if("edit_update_method_fail" == msg)
	{
		alertMsg("设置网站更新方式失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showEnableSingleWbstVPNForm(userId, wbstId)
{
	var submitURL = "ShowEnableSingleWbstVPNFormServlet?userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showEnableSingleWbstVPNFormRsps;
	ajax.send();
}

function showEnableSingleWbstVPNFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			state = ajax.responseText;
			if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else if("has_no_edit_athy" == state)
			{
				alertMsg("您没有编辑权限！");
			}
			else
			{
				showContent("是否启用VPN", state, false, "");
			}
		}
	}
}

function submitEnableSingleWbstVPN(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEnableSingleWbstVPNRsps(message);
       	}
    });
}

function submitEnableSingleWbstVPNRsps(msg)
{
	if("get_wbst_fail" == msg)
	{
		alertMsg("获取网站信息出错，请稍后再试！");
	}
	else if("has_no_edit_athy" == msg)
	{
		alertMsg("您没有编辑权限！");
	}
	else if("enable_vpn_success" == msg)
	{
		clearMainContent();
		alertMsg("设置VPN接入成功，请查看！");
	}
	else if("enable_vpn_fail" == msg)
	{
		alertMsg("设置VPN接入出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showShareWbstToUgForm(userId, wbstId)
{
	var submitURL = "ShowShareWbstToUgFormServlet?userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showShareWbstToUgFormRsps;
	ajax.send();
}

function showShareWbstToUgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
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
				showContent("共享网站", state, false, "");
			}
		}
	}
}

function submitShareWbstToUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitShareWbstToUgRsps(message);
       	}
    });
}

function submitShareWbstToUgRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("get_wbst_fail" == msg)
	{
		alertMsg("获取网站失败，请稍后再试！");
	}
	else if("wbst_id_should_not_be_null" == msg)
	{
		alertMsg("请选择网站！");
	}
	else if("share_wbst_to_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("添加成功，请查看！");
		refresh();
	}
	else if("share_wbst_to_ug_fail" == msg)
	{
		alertMsg("添加失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showFollowWbstFromUgForm(ugId, userId)
{
	var submitURL = "ShowFollowWbstFromUgFormServlet?userId=" + userId
		+ "&ugId=" + ugId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showFollowWbstFromUgFormRsps;
	ajax.send();
}

function showFollowWbstFromUgFormRsps()
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
				showContent("关注网站", state, false, "");
			}
		}
	}
}

function submitFollowWbstFromUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitFollowWbstFromUgRsps(message);
       	}
    });
}

function submitFollowWbstFromUgRsps(msg)
{
	if("wbst_id_should_not_be_null" == msg)
	{
		alertMsg("请选择网站！");
	}
	else if("follow_wbst_from_ug_fail" == msg)
	{
		alertMsg("关注网站失败，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("follow_wbst_from_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("关注网站成功，请查看！");
		refresh();
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddWbstToUgForm(ugId, userId)
{
	var submitURL = "ShowAddWbstToUgFormServlet?ugId=" + ugId
		+ "&userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddWbstToUgFormRsps;
	ajax.send();
}

function showAddWbstToUgFormRsps()
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
			else if("get_ug_fail" == state)
			{
				alertMsg("获取用户组信息失败，请稍后再试！");
			}
			else
			{
				showContent("添加网站至用户组", state, false, "");
			}
		}
	}
}

function submitAddWbstToUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddWbstToUgRsps(message);
       	}
    });
}

function submitAddWbstToUgRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("get_wbst_fail" == msg)
	{
		alertMsg("获取网站失败，请稍后再试！");
	}
	else if("wbst_id_should_not_be_null" == msg)
	{
		alertMsg("请选择网站！");
	}
	else if("share_wbst_to_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("添加成功，请查看！");
		refresh();
	}
	else if("share_wbst_to_ug_fail" == msg)
	{
		alertMsg("添加失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showUnshareWbstFromUgForm(ugId, userId)
{
	var submitURL = "ShowUnshareWbstFromUgFormServlet?ugId=" + ugId
		+ "&userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showUnshareWbstFromUgFormRsps;
	ajax.send();
}

function showUnshareWbstFromUgFormRsps()
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
				showContent("取消共享", state, false, "");
			}
		}
	}
}

function submitUnshareWbstFromUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitUnshareWbstFromUgRsps(message);
       	}
    });
}

function submitUnshareWbstFromUgRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("wbst_id_should_not_be_null" == msg)
	{
		alertMsg("请选择网站！");
	}
	else if("unshare_wbst_from_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("取消共享成功，请查看！");
		refresh();
	}
	else if("unshare_wbst_from_ug_fail" == msg)
	{
		alertMsg("取消共享出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showDelWbstFromUgForm(ugId, userId, wbstId)
{
	var submitURL = "ShowDelWbstFromUgFormServlet?ugId=" + ugId
		+ "&userId=" + userId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDelWbstFromUgFormRsps;
	ajax.send();
}

function showDelWbstFromUgFormRsps()
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
			else if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else
			{
				showContent("从用户组删除网站", state, false, "");
			}
		}
	}
}

function submitDelWbstFromUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitDelWbstFromUgRsps(message);
       	}
    });
}

function submitDelWbstFromUgRsps(msg)
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
	else if("del_wbst_from_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("删除成功，请查看！");
		refresh();
	}
	else if("del_wbst_from_ug_fail" == msg)
	{
		alertMsg("删除失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showUnfollowWbstForm(ugId, userId, wbstId)
{
	var submitURL = "ShowUnfollowWbstFormServlet?userId=" + userId
		+ "&ugId=" + ugId
		+ "&wbstId=" + wbstId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showUnfollowWbstFormRsps;
	ajax.send();
}

function showUnfollowWbstFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if( "get_wbst_fail" == state)
			{
				alertMsg("获取网站信息出错，请稍后再试！");
			}
			else
			{   
				showContent("取消关注", state, false, "");
			}
		}
	}
}

function submitUnfollowWbst(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitUnfollowWbstRsps(message);
       	}
    });
}

function submitUnfollowWbstRsps(msg)
{
	if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("unfollow_wbst_success" == msg)
	{
		clearMainContent();
		alertMsg("取消关注成功，请查看！");
		refresh();
	}
	else if("unfollow_wbst_fail" == msg)
	{
		alertMsg("取消关注失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showWbstNews(wbstId, pageNo, perPageItemNum)
{
	var submitURL = "ShowWbstNewsServlet?wbstId=" + wbstId
		+ "&pageNo=" + pageNo
		+ "&perPageItemNum=" + perPageItemNum;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showWbstNewsRsps;
	ajax.send();
}

function showWbstNewsRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_wbst_news_fail" == state)
			{
				alertMsg("获取新闻失败，请稍后再试！");
			}
			else if("get_wbst_fail" == state)
			{
				alertMsg("获取网站信息失败，请稍后再试！");
			}
			else
			{
				showMainContent(state);
			}
		}
	}
}


function unshowWbstNews(formId, wbstId, pageNo, perPageItemNum)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			unshowWbstNewsRsps(message, wbstId, pageNo, perPageItemNum);
       	}
    });
}

function unshowWbstNewsRsps(msg, wbstId, pageNo, perPageItemNum)
{
	if("get_wbst_news_fail" == msg)
	{
		alertMsg("获取新闻信息出错，请稍后再试！");
	}
	else if("unshow_wbst_news_fail" == msg)
	{
		alertMsg("删除新闻出错，请稍后再试！");
	}
	else if("unshow_wbst_news_success" == msg)
	{
		showWbstNews(wbstId, pageNo, perPageItemNum);
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function submitSearchWbstNews(formId)
{
	alertMsg("开始搜索，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitSearchWbstNewsRsps(message);
       	}
    });
}

function submitSearchWbstNewsRsps(msg)
{
	if("keyword_should_not_be_null" == msg)
	{
		alertMsg("请输入搜索关键词！");
	}
	else if("search_wbst_news_fail" == msg)
	{
		alertMsg("搜索新闻出错，请稍后再试！");
	}
	else
	{
		showMainContent(msg);
	}
}

function showSearchedWbstNews(userId, kw, time, pageNo, perPageItemNum)
{
	var submitURL = "SearchWbstNewsServlet?userId=" + userId
		+ "&kw=" + encode(kw)
		+ "&time=" + time
		+ "&pageNo=" + pageNo
		+ "&perPageItemNum=" + perPageItemNum;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showSearchedWbstNewsRsps;
	ajax.send();
}

function showSearchedWbstNewsRsps()
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
			else if("search_wbst_news_fail" == state)
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

function unshowSearchedWbstNews(formId, userId, kw, time, pageNo, perPageItemNum)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			unshowSearchedWbstNewsRsps(message, userId, kw, time, pageNo, perPageItemNum);
       	}
    });
}

function unshowSearchedWbstNewsRsps(msg, userId, kw, time, pageNo, perPageItemNum)
{
	if("get_wbst_news_fail" == msg)
	{
		alertMsg("获取新闻信息出错，请稍后再试！");
	}
	else if("unshow_wbst_news_fail" == msg)
	{
		alertMsg("删除新闻出错，请稍后再试！");
	}
	else if("unshow_wbst_news_success" == msg)
	{
		showSearchedWbstNews(userId, kw, time, pageNo, perPageItemNum);
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}



function showListUgToFollowWbstForm(userId)
{
	var submitURL = "ShowListUgToFollowWbstFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListUgToFollowWbstFormRsps;
	ajax.send();
}

function showListUgToFollowWbstFormRsps()
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
				showContent("关注网站", state, false, "");
			}
		}
	}
}

function showListWbstToEditForm(userId)
{
	var submitURL = "ShowListWbstToEditFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListWbstToEditFormRsps;
	ajax.send();
}

function showListWbstToEditFormRsps()
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
				showContent("编辑网站", state, false, "");
			}
		}
	}
}

function showListWbstToEditKwForm(userId)
{
	var submitURL = "ShowListWbstToEditKwFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListWbstToEditKwFormRsps;
	ajax.send();
}

function showListWbstToEditKwFormRsps()
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
				showContent("修改网站关键词", state, false, "");
			}
		}
	}
}

function showListWbstToRenameForm(userId)
{
	var submitURL = "ShowListWbstToRenameFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListWbstToRenameFormRsps;
	ajax.send();
}

function showListWbstToRenameFormRsps()
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
				showContent("修改网站名称", state, false, "");
			}
		}
	}
}

function showListWbstToShareForm(userId)
{
	var submitURL = "ShowListWbstToShareFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListWbstToShareFormRsps;
	ajax.send();
}

function showListWbstToShareFormRsps()
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
				showContent("共享网站", state, false, "");
			}
		}
	}
}

function showListSbjtToDelForm(userId)
{
	var submitURL = "ShowListSbjtToDelFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showListSbjtToDelFormRsps;
	ajax.send();
}

function showListSbjtToDelFormRsps()
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
				showContent("删除专题", state, false, "");
			}
		}
	}
}





function getBtnQusetion(userId)

{
var btn = "<input type=\"button\""
		+ " value=\"&nbsp;疑难问题提交&nbsp;\""
		+ " class=\"buttonstyle\""
		+ " onclick=\"showQuestionPage('" + userId + "');\""
		+ " />";
		
	return btn;



}

function getBtnCheckAnswer(userId)
{
	var btn = "<input type=\"button\""
			+ " value=\"&nbsp;查看问题回复&nbsp;\""
			+ " class=\"buttonstyle\""
			+ " onclick=\"showAnswerTable('" + userId + "');\""
			+ " />";
		
	return btn;
}






function showQuestionPage(userId)
{
	var formId = "question_form";
	var form = "<form id=\"" + formId + "\" action=\"QuestionServlet\" method=\"post\">"
			+ "<table>"
				+ "<tr>"
					+ "<td colspan=\"2\"><input type=\"hidden\" name=\"userId\" value=\"" + userId + "\" />"
				+ "</tr>"
	
				+ "<tr>"
					+ "<td>疑难问题标题：</td>"
					+ "<td><input type=\"text\" name=\"qtitle\" /></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td valign=\"top\">疑难问题详述：</td>"
					+ "<td><textarea name=\"qsummary\" cols=\"36\" rows=\"10\"></textarea></td>"
				+ "</tr>"
				+ "<tr>"
					+ "	<td colspan=\"2\"><hr style=\"height:1px;border:none;border-top:1px solid #555555;\" /></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td colspan=\"2\"><hr style=\"height:5px;border:none;border-top:5px solid #214A7B;\" /></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td colspan=\"2\">"
						+ "<table border=\"0\">"
							+ "<tr>"
								+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp确认&nbsp\" onclick=\"submitQuestion('"
										+ formId + "')\" style=\"font-size:14px\" /></td>"
								+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp取消&nbsp\" onclick=\"clearMainContent()\" style=\"font-size:14px\"/></td>"
							+ "</tr>"
						+ "</table>"
					"</td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("疑难问题提交", form, false, "");
}
	
	function submitQuestion(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitQuestionRsps(message);
       	}
    });
}

function submitQuestionRsps(msg)
{  
	if("submit_question_failed" == msg)
	{
		alertMsg("提交问题失败，请稍后再试！");
	}
	else if("qtitle_should_not_be_null" == msg)
	{
		alertMsg("请输入问题标题！");
	}
		else if("qsummary_should_not_be_null" == msg)
	{
		alertMsg("请输入问题详细描述，便于管理员解决！");
	}
	else if("submit_question_succeed" == msg)
	{
		clearMainContent();
		alertMsg("提交问题成功，请耐心等待管理员回复！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}
	



function  showAnswerTable(userId)
{
   
  var submitURL = "ShowAnswerTableServlet?userId="+userId;
	ajax.open('POST', submitURL, true); 
	ajax.onreadystatechange = ShowAnswerTableRsps;
	ajax.send(); 
   

}

function  ShowAnswerTableRsps()
{
  
	if(4 == ajax.readyState)
	{ 
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			
			var elem = document.getElementById("mainContent");
	        elem.innerHTML = state;
			
		}
	}


}

function showAnswerDescription(id,userId)
{
 var submitURL= "ShowAnswerDescriptionServlet?questionID=" +id+"&userId="+userId ;
    ajax.open('POST',submitURL,true);
    ajax.onreadystatechange=ShowAnswerDescriptionRsps;
    ajax.send();


}

function ShowAnswerDescriptionRsps()
 {
	if(4 == ajax.readyState)
	{ 
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			 
			var elem = document.getElementById("mainContent");
	        elem.innerHTML = state;
			
		}
	}
   
 
 }

function addWRow(id,userId)
 {  
   var submitURL= "AddWRowServlet?questionID=" +id+"&userId="+userId;
    ajax.open('POST',submitURL,true);
    ajax.onreadystatechange=AddWRowRsps;
    ajax.send();
    
 
 }
function AddWRowRsps()
 {
	if(4 == ajax.readyState)
	{ 
		if(200 == ajax.status)
		{  
			var state = ajax.responseText;
			
			var elem = document.getElementById("mainContent");
	        elem.innerHTML = state;
			
		}
	}
   
 
 }

 
function submitWAnswer(id,userId)
{
   
   var answer=document.getElementById("answer").value;
  
   if(""==answer||null==answer)
   
   {
     alert("请输入回复内容");
      return;
   }
   else
   {
    var submitURL= "SubmitWAnswerServlet?questionId=" +id+"&userId="+userId+"&answer="+encodeURIComponent(encodeURIComponent(answer));
    ajax.open('POST',submitURL,true);
    ajax.onreadystatechange=SubmitWAnswerRsps;
    ajax.send();
   
   
   }

}


function SubmitWAnswerRsps()
{if(4 == ajax.readyState)
	{ 
		if(200 == ajax.status)
		{  
			var state = ajax.responseText;
			if(state=="submit_answer_succeed")
			{
			   alert("回复提交成功");
			   clear();
			
			}
			else if(state=="submit_answer_failed")
			{
			     alert("回复提交失败请稍后再试");
			
			}
			
		}
	}


}


   
function clear()
{
    
 var elem = document.getElementById("mainContent");
	        elem.innerHTML = "";

}

function showInfo(url)
{
	var submitURL = "ShowInfoServlet?url=" + url;
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