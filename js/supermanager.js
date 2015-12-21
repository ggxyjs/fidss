/**********Begin 引入JavaScript文件**********/
document.write("<script type=\"text/javascript\" src=\"js/ajaxobj.js\"></script>");
/***********End 引入JavaScript文件***********/

/**********Begin 全局变量**********/
var ajax = createAjaxObj();
/***********End 全局变量***********/

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

function clearMainContent()
{
	showMainContent("");
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

function showAddOrgForm()
{
	var formId = "add_org_form";
	var form = "<form id=\"" + formId + "\" action=\"AddOrgServlet\" method=\"post\">"
			+ "<table>"
				+ "<tr>"
					+ "<td>组织名称: </td>"
					+ "<td>"
						+ "<input style=\"border:1px solid #214A7B\" type=\"text\" name=\"title\" value=\"\" />"
						+ "<br />"
						+ "<p id=\"checkTitle\"></p>"
					+ "</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td>项目名称: </td>"
					+ "<td>"
						+ "<input style=\"border:1px solid #214A7B\" type=\"text\" name=\"prjtTitle\" value=\"\" />"
						+ "<br />"
						+ "<p id=\"checkPrjtTitle\"></p>"
					+ "</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td>目标网站更新任务: </td>"
					+ "<td>"
						+ "<select name=\"wbstUpdateTask\">";
							for(var i=0; i<24; i=i+1)
							{
								form += "<option value=\"" + i + "\">" + i + "</option>";
							}		
				form += "</select>时"
					+ "</td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td>专题情报更新任务: </td>"
					+ "<td>"
						+ "<select name=\"sbjtUpdateTask\">";
							for(var i=0; i<24; i=i+1)
							{
								form += "<option value=\"" + i + "\">" + i + "</option>";
							}		
				form += "</select>时"
					+ "</td>"
				+ "</tr>"
				+ "<tr><td colspan=\"2\"><hr style=\"width:320px; height:1px;border:none;border-top:1px solid #555555;\" /></td></tr>"
				+ "<tr><td colspan=\"2\"><hr style=\"width:320px; height:5px;border:none;border-top:5px solid #214A7B;\" /></td></tr>"
				+ "<tr><td colspan=\"2\"><br /></td></tr>"
				+ "<tr>"
					+ "<td colspan=\"2\">"
						+ "<table border=\"0\" align=\"right\">"
							+ "<tr>"
								+ "<td>"
									+ "<input type=\"button\" class=\"buttonstyle\" value=\"  确定  \" onclick=\"submitAddOrg('"
										+ formId + "');\" />"
								+ "</td>"
								+ "<td>"
									+ "<input type=\"button\" class=\"buttonstyle\" value=\"  取消  \" onclick=\"clearMainContent();\" />"
								+ "</td>"
							+ "</tr>"
						+ "</table>"
					+ "</td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";

	showContent("添加组织", form, false, "");
}

function submitAddOrg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddOrgRsps(message);
       	}
    });
}

function submitAddOrgRsps(msg)
{
	if("title_should_not_be_null" == msg)
	{
		alertMsg("请输入组织名称！");
	}
	else if("add_org_fail" == msg)
	{
		alertMsg("添加组织出错，请稍后再试！");
	}
	else if("get_update_task_fail" == msg)
	{
		alertMsg("获取更新任务失败，请稍后再试！");
	}
	else if("prjt_title_should_not_be_null" == msg)
	{
		alertMsg("项目名称已存在！");
	}
	else if("title_is_existed" == msg)
	{
		alertMsg("组织名称已存在！");
	}
	else if("prjt_title_is_existed" == msg)
	{
		alertMsg("请输入项目名称！");
	}
	else
	{
		showContent("组织信息", msg, false, "");
		alertMsg("添加组织成功！");
	}
}

function submitAddAthyToOrg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddAthyToOrgRsps(message);
       	}
    });
}

function submitAddAthyToOrgRsps(msg)
{
    if("get_athy_fail" == msg)
    {
    	alertMsg("获取权限信息出错，请稍后再试！");
    }
    else if("athy_id_should_not_be_null" == msg)
    {
    	alertMsg("请选择权限！");
    }
    else if("get_org_fail" == msg)
    {
    	alertMsg("获取组织信息出错，请稍后再试！");
    }
    else if("add_athy_success" == msg)
    {
    	alertMsg("添加权限成功，请查看！");
    	clearMainContent();
    }
    else if("add_athy_fail" == msg)
    {
    	alertMsg("添加权限出错，请稍后再试！");
    }
    else
    {
    	alertMsg("操作出现异常，请稍后再试！");
    }
}

function showMgntOrgForm(userId)
{
	var submitURL = "ShowMgntOrgFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showMgntOrgFormRsps;
	ajax.send();
}

function showMgntOrgFormRsps()
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
				showContent("管理组织", state, false, "");
			}
		}
	}
}

function showAddAthyToOrgForm(userId, orgId)
{
	var submitURL = "ShowAddAthyToOrgFormServlet?userId=" + userId
		+ "&orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddAthyToOrgFormRsps;
	ajax.send();
}

function showAddAthyToOrgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取组织信息出错，请稍后再试！");
			}
			else
			{
				showContent("添加权限", state, false, "");
			}
		}
	}
}

function showDelAthyFromOrgForm(userId, orgId)
{
	var submitURL = "ShowDelAthyFromOrgFormServlet?userId=" + userId
		+ "&orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDelAthyFromOrgFormRsps;
	ajax.send();
}

function showDelAthyFromOrgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取组织信息出错，请稍后再试！");
			}
			else
			{
				showContent("删除权限", state, false, "");
			}
		}
	}
}

function submitDelAthyFromOrg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitDelAthyFromOrgRsps(message);
       	}
    });
}

function submitDelAthyFromOrgRsps(msg)
{
    if("get_athy_fail" == msg)
    {
    	alertMsg("获取权限信息出错，请稍后再试！");
    }
    else if("athy_id_should_not_be_null" == msg)
    {
    	alertMsg("请选择权限！");
    }
    else if("get_org_fail" == msg)
    {
    	alertMsg("获取组织信息出错，请稍后再试！");
    }
    else if("del_athy_success" == msg)
    {
    	alertMsg("删除权限成功，请查看！");
    	clearMainContent();
    }
    else if("del_athy_fail" == msg)
    {
    	alertMsg("删除权限出错，请稍后再试！");
    }
    else
    {
    	alertMsg("操作出现异常，请稍后再试！");
    }
}

function showAddUserToOrgForm(userId, orgId)
{
	var submitURL = "ShowAddUserToOrgFormServlet?userId=" + userId
		+ "&orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddUserToOrgFormRsps;
	ajax.send();
}

function showAddUserToOrgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取组织信息出错，请稍后再试！");
			}
			else
			{
				showContent("添加用户", state, false, "");
			}
		}
	}
}

function submitAddUserToOrg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddUserToOrgRsps(message);
       	}
    });
}

function submitAddUserToOrgRsps(msg)
{
	if("get_org_fail" == msg)
	{
		alertMsg("获取组织信息出错，请稍后再试！");
	}
	else if("encrypt_pw_fail" == msg)
	{
		alertMsg("加密密码出错，请稍后再试！");
	}
	else if("add_user_success" == msg)
	{
		alertMsg("添加用户成功，请查看！");
		clearMainContent();
	}
	else if("add_user_fail" == msg)
	{
		alertMsg("添加用户出错，请稍后再试！");
	}
	else if("user_has_existed" == msg)
	{
		alertMsg("该用户已存在！");
	}
	else if("pw_should_not_be_null" == msg)
	{
		alertMsg("请输入密码！");
	}
	else if("realname_should_not_be_null" == msg)
	{
		alertMsg("请输入真实姓名！");
	}
	else if("username_should_not_be_null" == msg)
	{
		alertMsg("请输入用户名！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddRoleToOrgForm(userId, orgId)
{
	var submitURL = "ShowAddRoleToOrgFormServlet?userId=" + userId
		+ "&orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddRoleToOrgFormRsps;
	ajax.send();
}

function showAddRoleToOrgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取组织信息出错，请稍后再试！");
			}
			else
			{
				showContent("创建角色", state, false, "");
			}
		}
	}
}

function submitAddRoleToOrg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddRoleToOrgRsps(message);
       	}
    });
}

function submitAddRoleToOrgRsps(msg)
{
	if("add_role_fail" == msg)
	{
		alertMsg("添加角色出错，请稍后再试！");
	}
	else if("title_should_not_be_null" == msg)
	{
		alertMsg("角色名称不能为空！");
	}
	else if("athy_id_should_not_be_null" == msg)
	{
		alertMsg("请选择权限！");
	}
	else if("get_org_fail" == msg)
	{
		alertMsg("获取组织信息出错，请稍后再试！");
	}
	else if("role_title_existed" == msg)
	{
		alertMsg("角色已存在！");
	}
	else if("add_role_athy_fail" == msg)
	{
		alertMsg("添加角色权限出错，请稍后再试！");
	}
	else if("add_role_success" == msg)
	{
		alertMsg("添加角色成功，请查看！");
		clearMainContent();
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddUgToOrgForm(userId, orgId)
{
	var submitURL = "ShowAddUgToOrgFormServlet?userId=" + userId
		+ "&orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddUgToOrgFormRsps;
	ajax.send();
}

function showAddUgToOrgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取组织信息出错，请稍后再试！");
			}
			else
			{
				showContent("添加用户组", state, false, "");
			}
		}
	}
}

function submitAddUgToOrg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddUgToOrgRsps(message);
       	}
    });
}

function submitAddUgToOrgRsps(msg)
{
	if("get_org_fail" == msg)
	{
		alertMsg("获取机构信息出错，请稍后再试！");
	}
	else if("title_should_not_be_null" == msg)
	{
		alertMsg("请输入用户组的名称！");
	}
	else if("summary_should_not_be_null" == msg)
	{
		alertMsg("请输入用户组的描述！");
	}
	else if("add_ug_success" == msg)
	{
		alertMsg("添加用户组成功，请查看！");
		clearMainContent();
	}
	else if("add_ug_fail" == msg)
	{
		alertMsg("添加用户组出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAssignSeToOrgForm(userId, orgId)
{
	var submitURL = "ShowAssignSeToOrgFormServlet?userId=" + userId
		+ "&orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAssignSeToOrgFormRsps;
	ajax.send();
}

function showAssignSeToOrgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取组织信息出错，请稍后再试！");
			}
			else
			{
				showContent("分配搜索引擎", state, false, "");
			}
		}
	}
}

function submitAssignSeToOrg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAssignSeToOrgRsps(message);
       	}
    });
}

function submitAssignSeToOrgRsps(msg)
{
	if("se_should_not_be_null" == msg)
	{
		alertMsg("请选择搜索引擎！");
	}
	else if("get_org_fail" == msg)
	{
		alertMsg("获取组织信息出错，请稍后再试！");
	}
	else if("assign_se_success" == msg)
	{
		alertMsg("分配搜索引擎成功，请查看！");
		clearMainContent();
	}
	else if("assign_se_fail" == msg)
	{
		alertMsg("分配搜索引擎出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showOrgListForm(userId)
{
	var submitURL = "ShowOrgListFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showOrgListFormRsps;
	ajax.send();
}

function showOrgListFormRsps()
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
				showContent("机构信息", state, false, "");
			}
		}
	}
}

function showViewUserOfOrgForm(userId, orgId)
{
	var submitURL = "ShowViewUserOfOrgFormServlet?userId=" + userId
		+ "&orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showViewUserOfOrgFormRsps;
	ajax.send();
}

function showViewUserOfOrgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取机构信息出错，请稍后再试！");
			}
			else
			{
				showContent("查看用户", state, false, "");
			}
		}
	}
}

function showViewUgOfOrgForm(userId, orgId)
{
	var submitURL = "ShowViewUgOfOrgFormServlet?userId=" + userId
		+ "&orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showViewUgOfOrgFormRsps;
	ajax.send();
}

function showViewUgOfOrgFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取机构信息出错，请稍后再试！");
			}
			else
			{
				showContent("查看用户组", state, false, "");
			}
		}
	}
}

function showSeListForm(userId)
{
	var submitURL = "ShowSeListFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showSeListFormRsps;
	ajax.send();
}

function showSeListFormRsps()
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
				showContent("搜索引擎信息", state, false, "");
			}
		}
	}
}

function showEnableSeForm(userId)
{
	var submitURL = "ShowEnableSeFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showEnableSeFormRsps;
	ajax.send();
}

function showEnableSeFormRsps()
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
			else if("get_se_fail" == state)
			{
				alertMsg("获取搜索引擎信息出错，请稍后再试！");
			}
			else
			{
				showContent("启用搜索引擎", state, false, "");
			}
		}
	}
}

function submitEnableSe(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEnableSeRsps(message);
       	}
    });
}

function submitEnableSeRsps(msg)
{
	if("enable_se_success" == msg)
	{
		alertMsg("启用搜索引擎成功，请查看！");
		clearMainContent();
	}
	else if("enable_se_fail" == msg)
	{
		alertMsg("启用搜索引擎出错，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else if("se_id_should_not_be_null" == msg)
	{
		alertMsg("请选择搜索引擎！");
	}
	else if("get_se_fail" == msg)
	{
		alertMsg("获取搜索引擎信息出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showDisableSeForm(userId)
{
	var submitURL = "ShowDisableSeFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDisableSeFormRsps;
	ajax.send();
}

function showDisableSeFormRsps()
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
			else if("get_se_fail" == state)
			{
				alertMsg("获取搜索引擎信息出错，请稍后再试！");
			}
			else
			{
				showContent("停用搜索引擎", state, false, "");
			}
		}
	}
}

function submitDisableSe(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitDisableSeRsps(message);
       	}
    });
}

function submitDisableSeRsps(msg)
{
	if("disable_se_success" == msg)
	{
		alertMsg("停用搜索引擎成功，请查看！");
		clearMainContent();
	}
	else if("disable_se_fail" == msg)
	{
		alertMsg("停用搜索引擎出错，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else if("se_id_should_not_be_null" == msg)
	{
		alertMsg("请选择搜索引擎！");
	}
	else if("get_se_fail" == msg)
	{
		alertMsg("获取搜索引擎信息出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddSeForm(userId)
{
	var submitURL = "ShowAddSeFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddSeFormRsps;
	ajax.send();
}

function showAddSeFormRsps()
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
				showContent("添加搜索引擎", state, false, "");
			}
		}
	}
}

function submitAddSe(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddSeRsps(message);
       	}
    });
}

function submitAddSeRsps(msg)
{
	if("title_should_not_be_null" == msg)
	{
		alertMsg("请输入“搜索引擎名称”！");
	}
	else if("url_should_not_be_null" == msg)
	{
		alertMsg("请输入“搜索引擎地址”！");
	}
	else if("is_enable_should_not_be_null" == msg)
	{
		alertMsg("请选择“是否启用”搜索引擎！");
	}
	else if("add_se_success" == msg)
	{
		alertMsg("添加搜索引擎成功，请查看！");
		clearMainContent();
	}
	else if("add_se_fail" == msg)
	{
		alertMsg("添加搜索引擎出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}



function clear()
{
    
 var elem = document.getElementById("mainContent");
	        elem.innerHTML = "";

}
 function  showQuestionTable(id)
 {
 
 
   
    var submitURL = "ShowQuestionTableServlet?userId="+id;
	ajax.open('POST', submitURL, true); 
	ajax.onreadystatechange = showQuestionTableRsps;
	ajax.send(); 
   
   
 }
 
 function showQuestionTableRsps()
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

function showDescription(id,userId)
    
{  
	var submitURL= "ShowQuestionDescriptionServlet?questionID=" +id+"&userId="+userId ;
    ajax.open('POST',submitURL,true);
    ajax.onreadystatechange=ShowQuestionDescriptionRsps;
    ajax.send();
    
}


 function ShowQuestionDescriptionRsps()
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
 
 function addRow(id,userId)
 {  
   var submitURL= "AddRowServlet?questionID=" +id+"&userId="+userId;
    ajax.open('POST',submitURL,true);
    ajax.onreadystatechange=AddRowRsps;
    ajax.send();
    
 
 }
function AddRowRsps()
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

function submitAnswer(id,userId)
{
   
   var answer=document.getElementById("answer").value;
  
   if(""==answer||null==answer)
   
   {
     alert("请输入回复内容");
      return;
   }
   else
   {
    var submitURL= "SubmitAnswerServlet?questionId=" +id+"&userId="+userId+"&answer="+encodeURIComponent(encodeURIComponent(answer));
    ajax.open('POST',submitURL,true);
    ajax.onreadystatechange=SubmitAnswerRsps;
    ajax.send();
   
   
   }

}

function SubmitAnswerRsps()
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