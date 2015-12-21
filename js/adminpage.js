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

function showAddUserForm(orgId)
{
	var submitURL = "ShowAddUserFormServlet?orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddUserFormRsps;
	ajax.send();
}

function showAddUserFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_form_fail" == state)
			{
				alertMsg("获取添加用户表单出错，请稍后再试！");
			}
			else
			{
				showContent("添加用户", state, false , "");
			}
		}
	}
}

function checkUsername(elemId, orgId)
{
	var elem = document.getElementById(elemId);
	if(null != elem)
	{
		var username = elem.value;
		var submitURL = "CheckUsernameServlet?orgId=" + orgId
			+ "&username=" + encode(username);
		ajax.open('POST', submitURL, true);
		ajax.onreadystatechange = checkUsernameRsps;
		ajax.send();
	}
}

function checkUsernameRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			var msg = "";
			if("check_username_fail" == state)
			{
				msg = "";
			}
			else if("username_existed" == state)
			{
				msg = "<font color=\"red\">该用户已经存在！</font>";
			}
			else if("username_not_existed" == state)
			{
				msg = "<font color=\"green\">该用户名不存在，可以使用！</font>";
			}
			else if("username_should_not_be_null" == state)
			{
				msg = "<font color=\"red\">用户名不能为空！</font>";
			}
			else
			{
				msg = "";
			}
			
			var elem = document.getElementById("checkUsername");
			if(null != elem)
			{
				elem.innerHTML = msg;
			}
		}
	}
}

function submitAddUser(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddUserRsps(message);
       	}
    });
}

function submitAddUserRsps(msg)
{
	if("user_has_existed" == msg)
	{
		alertMsg("该用户名已被使用！");
	}
	else if("username_should_not_be_null" == msg)
	{
		alertMsg("请输入用户名！");
	}
	else if("realname_should_not_be_null" == msg)
	{
		alertMsg("请输入真实姓名！");
	}
	else if("pw_should_not_be_null" == msg)
	{
		alertMsg("请输入密码！");
	}
	else if("encrypt_pw_fail" == msg)
	{
		alertMsg("加密密码出错，请稍后再试！");
	}
	else if("add_user_fail" == msg)
	{
		alertMsg("添加用户出错，请稍后再试！");
	}
	else if("add_user_success" == msg)
	{
		clearMainContent();
		alertMsg("添加用户成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showMgntUserForm(orgId)
{
	var submitURL = "ShowMgntUserFormServlet?orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showMgntUserFormRsps;
	ajax.send();
}

function showMgntUserFormRsps()
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
				showContent("用户维护", state, false, "");
			}
		}
	}
}

function showDelUserForm(userId)
{
	var submitURL = "ShowDelUserFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showDelUserFormRsps;
	ajax.send();
}

function showDelUserFormRsps()
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
				showContent("删除用户", state, false, "");
			}
		}
	}
}

function submitDelUser(formId, orgId)
{
	if(confirm("确认删除该用户？"))
	{
		formId = "#" + formId;
	    $(formId).ajaxSubmit({
	    	success: function(message) 
	    	{	
				submitDelUserRsps(message, orgId);
	       	}
	    });
	}
}

function submitDelUserRsps(msg, orgId)
{
	if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else if("del_user_success" == msg)
	{
		alertMsg("删除用户成功，请查看！");
		showMgntUserForm(orgId);
	}
	else if("del_user_fail" == msg)
	{
		alertMsg("删除用户出错，请稍后再试！");
	}
	else if("user_should_not_be_del" == msg)
	{
		alertMsg("您没有删除该用户的权限！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddRoleForm(orgId)
{
	var submitURL = "ShowAddRoleFormServlet?orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAddRoleFormRsps;
	ajax.send();
}

function showAddRoleFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_form_fail" == state)
			{
				alertMsg("获取权限信息出错，请稍后再试！");
			}
			else
			{
				showContent("添加角色", state, false, "");
			}
		}
	}
}

function submitAddRole(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddRoleRsps(message);
       	}
    });
}

function submitAddRoleRsps(msg)
{
	if("add_role_fail" == msg)
	{
		alertMsg("添加角色出错，请稍后再试！");
	}
	else if("role_title_should_not_be_null" == msg)
	{
		alertMsg("请输入角色名称！");
	}
	else if("check_role_title_fail" == msg)
	{
		alertMsg("检查角色名称出错，请稍后再试！");
	}
	else if("role_title_existed" == msg)
	{
		alertMsg("该角色名称已存在！");
	}
	else if("could_not_get_role_athy" == msg)
	{
		alertMsg("请选择权限！");
	}
	else if("add_role_athy_fail" == msg)
	{
		alertMsg("添加角色权限出错，请查看！");
	}
	else if("add_role_success" == msg)
	{
		clearMainContent();
		alertMsg("添加角色成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function checkRoleTitle(elemId, orgId)
{
	var elem = document.getElementById(elemId);
	if(null != elem)
	{
		var roleTitle = elem.value;
		var submitURL = "CheckRoleTitleServlet?orgId=" + orgId
			+ "&roleTitle=" + encode(roleTitle);
		ajax.open('POST', submitURL, true);
		ajax.onreadystatechange = checkRoleTitleRsps;
		ajax.send();
	}
}

function checkRoleTitleRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			var msg = "";
			if("check_role_title_fail" == state)
			{
				msg = "";
			}
			else if("role_title_existed" == state)
			{
				msg = "<font color=\"red\">该角色已经存在！</font>";
			}
			else if("role_title_not_existed" == state)
			{
				msg = "<font color=\"green\">该角色名不存在，可以使用！</font>";
			}
			else if("role_title_should_not_be_null" == state)
			{
				msg = "<font color=\"red\">角色名不能为空！</font>";
			}
			else
			{
				msg = "";
			}
			
			var elem = document.getElementById("checkRoleTitle");
			if(null != elem)
			{
				elem.innerHTML = msg;
			}
		}
	}
}

function showMgntRoleForm(orgId)
{
	var submitURL = "ShowMgntRoleFormServlet?orgId=" + orgId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showMgntRoleFormRsps;
	ajax.send();
}

function showMgntRoleFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_role_fail" == state)
			{
				alertMsg("获取角色信息出错，请稍后再试！");
			}
			else
			{
				showContent("管理角色", state, false, "");
			}
		}
	}
}

function showViewRoleForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			showViewRoleFormRsps(message);
       	}
    });	
}

function showViewRoleFormRsps(msg)
{
	if("get_role_fail" == msg)
	{
		alertMsg("获取角色信息出错，请稍后再试！");
	}
	else
	{
		showContent("角色信息", msg, false, "");
	}
}

function submitDelRole(formId, orgId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitDelRoleRsps(message, orgId);
       	}
    });	
}

function submitDelRoleRsps(msg, orgId)
{
	if("get_role_fail" == msg)
	{
		alertMsg("获取角色信息失败，请稍后再试！");
	}
	else if("could_not_modify_role" == msg)
	{
		alertMsg("无法编辑该角色！");
	}
	else if("del_role_success" == msg)
	{
		showMgntRoleForm(orgId);
		alertMsg("删除角色成功，请查看！");
	}
	else if("del_role_fail" == msg)
	{
		alertMsg("删除角色失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddAthyToRoleForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			showAddAthyToRoleFormRsps(message);
       	}
    });	
}

function showAddAthyToRoleFormRsps(msg)
{
	if("get_role_fail" == msg)
	{
		alertMsg("获取角色信息出错，请稍后再试！");
	}
	else
	{
		showContent("添加权限", msg, false, "");
	}
}

function submitAddAthyToRole(formId, orgId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitAddAthyToRoleRsps(message, orgId);
       	}
    });
}

function submitAddAthyToRoleRsps(msg, orgId)
{
	if("could_not_get_athy_to_added" == msg)
	{
		alertMsg("请选择权限！");
	}
	else if("get_role_fail" == msg)
	{
		alertMsg("获取角色信息出错，请稍后再试！");
	}
	else if("could_not_modify_role" == msg)
	{
		alertMsg("无法修改该角色！");
	}
	else if("add_athy_to_role_success" == msg)
	{
		alertMsg("添加权限成功，请查看！");
		showMgntRoleForm(orgId);
	}
	else if("add_athy_to_role_failed" == msg)
	{
		alertMsg("添加权限失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showDelAthyFromRoleForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			showDelAthyFromRoleFormRsps(message);
       	}
    });
}

function showDelAthyFromRoleFormRsps(msg)
{
	if("get_role_fail" == msg)
	{
		alertMsg("获取角色信息出错，请稍后再试！");
	}
	else
	{
		showContent("删除权限", msg, false, "");
	}
}

function submitDelAthyFromRole(formId, orgId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitDelAthyFromRoleRsps(message, orgId);
       	}
    });
}

function submitDelAthyFromRoleRsps(msg, orgId)
{
	if("could_not_get_athy_to_delete" == msg)
	{
		alertMsg("请选择权限！");
	}
	else if("get_role_fail" == msg)
	{
		alertMsg("获取角色信息失败，请稍后再试！");
	}
	else if("could_not_modify_role" == msg)
	{
		alertMsg("无法修改该角色！");
	}
	else if("del_athy_from_role_success" == msg)
	{
		alertMsg("删除权限成功，请查看！");
		showMgntRoleForm(orgId);
	}
	else if("del_athy_from_role_failed" == msg)
	{
		alertMsg("删除权限失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAssignRoleForm(orgId, formType)
{
	var submitURL = "ShowAssignRoleFormServlet?orgId=" + orgId
		+ "&formType=" + formType;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showAssignRoleFormRsps;
	ajax.send();
}

function showAssignRoleFormRsps()
{
	if(4 == ajax.readyState)
	{
		if(200 == ajax.status)
		{
			var state = ajax.responseText;
			if("get_org_fail" == state)
			{
				alertMsg("获取用户信息出错，请稍后再试！");
			}
			else
			{
				showContent("权限管理", state, false, "");
			}
		}
	}
}

function showAssignRoleToUserForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			showAssignRoleToUserFormRsps(message);
       	}
    });
}

function showAssignRoleToUserFormRsps(msg)
{
	if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else
	{
		showContent("权限分配管理", msg, false, "");
	}
}

function submitAssignRoleToUser(formId, orgId, formType)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitAssignRoleToUserRsps(message, orgId, formType);
       	}
    });
}

function submitAssignRoleToUserRsps(msg, orgId, formType)
{
	if("assign_role_to_user_fail" == msg)
	{
		alertMsg("分配权限失败，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("could_not_edit_user" == msg)
	{
		alertMsg("无法编辑该用户！");
	}
	else if("assign_role_to_user_success" == msg)
	{
		alertMsg("分配权限成功，请查看！");
		showAssignRoleForm(orgId, formType);
	}
	else if("could_not_get_role" == msg)
	{
		alertMsg("请选择角色！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showEnableSeForm(orgId)
{
	var submitURL = "ShowEnableSeOfOrgFormServlet?orgId=" + orgId;
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
			if("get_se_fail" == state)
			{
				alertMsg("获取搜素引擎信息出错，请稍后再试！");
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
	if("get_se_fail" == msg)
	{
		alertMsg("获取搜索引擎信息出错，请稍后再试！");
	}
	else if("se_id_should_not_be_null" == msg)
	{
		alertMsg("请选择搜索引擎！");
	}
	else if("enable_se_of_org_fail" == msg)
	{
		alertMsg("启用搜索引擎出错，请稍后再试！");
	}
	else if("enable_se_of_org_success" == msg)
	{
		clearMainContent();
		alertMsg("启用搜索引擎成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showDisableSeForm(orgId)
{
	var submitURL = "ShowDisableSeOfOrgFormServlet?orgId=" + orgId;
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
			if("get_se_fail" == state)
			{
				alertMsg("获取搜素引擎信息出错，请稍后再试！");
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
	if("get_se_fail" == msg)
	{
		alertMsg("获取搜索引擎信息出错，请稍后再试！");
	}
	else if("se_id_should_not_be_null" == msg)
	{
		alertMsg("请选择搜索引擎！");
	}
	else if("disable_se_of_org_fail" == msg)
	{
		alertMsg("停用搜索引擎出错，请稍后再试！");
	}
	else if("disable_se_of_org_success" == msg)
	{
		clearMainContent();
		alertMsg("停用搜索引擎成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showExportWbstRltdDataForm(orgId)
{
	var formId = "export_wbst_rltd_data_form";
	var form = "<form id=\"" + formId + "\" action=\"ExportWbstRltdDataServlet\" method=\"post\" />"
			+ "<input type=\"hidden\" name=\"orgId\" value=\"" + orgId + "\" />"
			+ "<table>"
				+ "<tr>"
					+ "<td>"
						+ "开始日期：<input type=\"text\" name=\"startDate\" class=\"Wdate\" onClick=\"WdatePicker();\" readonly />"
					+ "</td>"
					+ "<td>"
						+ "截止日期：<input type=\"text\" name=\"endDate\" class=\"Wdate\" onClick=\"WdatePicker();\" readonly />"
					+ "</td>"
					+ "<td>"
						+ "<input type=\"button\" value=\"目标网站相关数据导出\" onclick=\"submitExportWbstRltdData('"
							+ formId + "', '" + orgId + "');\" />"
					+ "</td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("目标网站相关数据导出", form, false, "");
}

function submitExportWbstRltdData(formId, orgId)
{
	//alertMsg("提示：该功能将在系统部署至机构内部网络后开放！");
	alertMsg("开始导出数据，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitExportWbstRltdDataRsps(message, orgId);
       	}
    });
}

function submitExportWbstRltdDataRsps(msg, orgId)
{
	if("export_fail" == msg)
	{
		alertMsg("导出数据出错，请稍后再试！");
	}
	else if("start_date_should_not_be_null" == msg)
	{
		alertMsg("请选择开始日期！");
	}
	else if("end_date_should_not_be_null" == msg)
	{
		alertMsg("请选择截止日期！");
	}
	else if("date_format_error" == msg)
	{
		alertMsg("输入的日期格式有误！");
	}
	else if("start_date_should_be_earlier_than_end_date" == msg)
	{
		alertMsg("“开始日期”不能晚于“截止日期”！");
	}
	else
	{
		var form = "<table>"
				+ "<tr>"
					+ "<td><a href=\"" + msg + "\"><font color=\"blue\">点击下载</font></a></td>"
					+ "<td><input type=\"button\" value=\"返回\" onclick=\"showExportWbstRltdDataForm('" 
							+ orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>";

		showContent("目标网站相关数据导出", form, false, "");
		alertMsg("导出数据成功，请点击下载！");
	}
}

function showImportWbstRltdDataForm(orgId)
{
	var formId = "import_wbst_rltd_data_form";
	var form = "<form id=\"" + formId + "\" action=\"ImportWbstRltdDataServlet\" method=\"post\" enctype=\"multipart/form-data\">"
			+ "<table>"
				+ "<tr>"
					+ "<td><input type=\"file\" id=\"wbstRltdData\" name=\"wbstRltdData\" /></td>"
					+ "<td><input type=\"button\" value=\"目标网站相关数据导入\" onclick=\"submitImportWbstRltdData('" 
							+ formId + "', '" + orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("目标网站相关数据导入", form, false, "");
}

function submitImportWbstRltdData(formId, orgId)
{
	//alertMsg("提示：该功能将在系统部署至机构内部网络后开放！");
	alertMsg("开始上传文件，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitImportWbstRltdDataRsps(message, orgId);
       	}
    });
}

function submitImportWbstRltdDataRsps(msg, orgId)
{
	if("import_fail" == msg)
	{
		alertMsg("导入数据出错，请稍后再试！");
	}
	else if("upload_fail" == msg)
	{
		alertMsg("文件上传出错，请稍后再试！");
	}
	else if("file_should_not_be_null" == msg)
	{
		alertMsg("请选择数据文件！");
	}
	else if("file_type_error" == msg)
	{
		alertMsg("文件类型错误，请重新选择文件！");
	}
	else if("read_cfg_file_error" == msg)
	{
		alertMsg("读取配置文件出错，请稍后再试！");
	}
	else if("import_success" == msg)
	{
		alertMsg("数据导入成功，请查看！");
	}
	else if("get_org_fail" == msg)
	{
		alertMsg("获取机构信息出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showExportSbjtNewsDataForm(orgId)
{
	var formId = "export_sbjt_rltd_data_form";
	var form = "<form id=\"" + formId + "\" action=\"ExportSbjtNewsDataServlet\" method=\"post\" />"
			+ "<input type=\"hidden\" name=\"orgId\" value=\"" + orgId + "\" />"
			+ "<table>"
				+ "<tr>"
					+ "<td>"
						+ "开始日期：<input type=\"text\" name=\"startDate\" class=\"Wdate\" onClick=\"WdatePicker();\" readonly />"
					+ "</td>"
					+ "<td>"
						+ "截止日期：<input type=\"text\" name=\"endDate\" class=\"Wdate\" onClick=\"WdatePicker();\" readonly />"
					+ "</td>"
					+ "<td>"
						+ "<input type=\"button\" value=\"专题情报新闻内容导出\" onclick=\"submitExportSbjtNewsData('"
							+ formId + "', '" + orgId + "');\" />"
					+ "</td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("专题情报新闻内容导出", form, false, "");
}

function submitExportSbjtNewsData(formId, orgId)
{
	//alertMsg("提示：该功能将在系统部署至机构内部网络后开放！");
	alertMsg("开始导出数据，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitExportSbjtNewsDataRsps(message, orgId);
       	}
    });
}

function submitExportSbjtNewsDataRsps(msg, orgId)
{
	if("export_fail" == msg)
	{
		alertMsg("导出数据出错，请稍后再试！");
	}
	else if("start_date_should_not_be_null" == msg)
	{
		alertMsg("请选择开始日期！");
	}
	else if("end_date_should_not_be_null" == msg)
	{
		alertMsg("请选择截止日期！");
	}
	else if("date_format_error" == msg)
	{
		alertMsg("输入的日期格式有误！");
	}
	else if("start_date_should_be_earlier_than_end_date" == msg)
	{
		alertMsg("“开始日期”不能晚于“截止日期”！");
	}
	else
	{
		var form = "<table>"
				+ "<tr>"
					+ "<td><a href=\"" + msg + "\"><font color=\"blue\">点击下载</font></a></td>"
					+ "<td><input type=\"button\" value=\"返回\" onclick=\"showExportSbjtNewsDataForm('" 
							+ orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>";

		showContent("专题情报新闻内容导出", form, false, "");
		alertMsg("导出数据成功，请点击下载！");
	}
}

function showImportSbjtNewsDataForm(orgId)
{
	var formId = "import_sbjt_news_data_form";
	var form = "<form id=\"" + formId + "\" action=\"ImportSbjtNewsDataServlet\" method=\"post\" enctype=\"multipart/form-data\">"
			+ "<table>"
				+ "<tr>"
					+ "<td><input type=\"file\" id=\"sbjtNewsData\" name=\"sbjtNewsData\" /></td>"
					+ "<td><input type=\"button\" value=\"专题情报新闻内容导入\" onclick=\"submitImportSbjtNewsData('" 
							+ formId + "', '" + orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("专题情报新闻内容导入", form, false, "");
}

function submitImportSbjtNewsData(formId, orgId)
{
	//alertMsg("提示：该功能将在系统部署至机构内部网络后开放！");
	alertMsg("开始上传文件，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitImportSbjtNewsDataRsps(message, orgId);
       	}
    });	
}

function submitImportSbjtNewsDataRsps(msg, orgId)
{
	if("import_fail" == msg)
	{
		alertMsg("导入数据出错，请稍后再试！");
	}
	else if("upload_fail" == msg)
	{
		alertMsg("文件上传出错，请稍后再试！");
	}
	else if("file_should_not_be_null" == msg)
	{
		alertMsg("请选择数据文件！");
	}
	else if("file_type_error" == msg)
	{
		alertMsg("文件类型错误，请重新选择文件！");
	}
	else if("read_cfg_file_error" == msg)
	{
		alertMsg("读取配置文件出错，请稍后再试！");
	}
	else if("get_org_fail" == msg)
	{
		alertMsg("获取机构信息出错，请稍后再试！");
	}
	else if("import_success" == msg)
	{
		alertMsg("数据导入成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showExportSbjtRltdDataForm(orgId)
{
	var formId = "export_sbjt_rltd_data_form";
	var form = "<form id=\"" + formId + "\" action=\"ExportSbjtRltdDataServlet\" method=\"post\">"
			+ "<input type=\"hidden\" name=\"orgId\" value=\"" + orgId + "\" />"
			+ "<table>"
				+ "<tr>"
					+ "<td><input type=\"button\" value=\"专题情报相关数据导出\" onclick=\"submitExportSbjtRltdData('" 
							+ formId + "', '" + orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";

	showContent("专题情报相关数据导出", form, false, "");
}

function submitExportSbjtRltdData(formId, orgId)
{
	//alertMsg("提示：该功能将在系统部署至机构内部网络后开放！");
	alertMsg("开始导出数据，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitExportSbjtRltdDataRsps(message, orgId);
       	}
    });
}

function submitExportSbjtRltdDataRsps(msg, orgId)
{
	if("export_fail" == msg)
	{
		alertMsg("导出数据出错，请稍后再试！");
	}
	else
	{
		var form = "<table>"
				+ "<tr>"
					+ "<td><a href=\"" + msg + "\"><font color=\"blue\">点击下载</font></a></td>"
					+ "<td><input type=\"button\" value=\"返回\" onclick=\"showExportUserRltdDataForm('" 
							+ orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>";

		showContent("专题情报相关数据导出", form, false, "");
		alertMsg("导出数据成功，请点击下载！");
	}
}

function showImportSbjtRltdDataForm(orgId)
{
	var formId = "import_sbjt_rltd_data_form";
	var form = "<form id=\"" + formId + "\" action=\"ImportSbjtRltdDataServlet\" method=\"post\" enctype=\"multipart/form-data\">"
			+ "<table>"
				+ "<tr>"
					+ "<td><input type=\"file\" id=\"sbjtRltdData\" name=\"sbjtRltdData\" /></td>"
					+ "<td><input type=\"button\" value=\"专题情报相关数据导入\" onclick=\"submitImportSbjtRltdData('" 
							+ formId + "', '" + orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("专题情报相关数据导入", form, false, "");
}

function submitImportSbjtRltdData(formId, orgId)
{
	//alertMsg("提示：该功能将在系统部署至机构内部网络后开放！");
	alertMsg("开始上传文件，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitImportSbjtRltdDataRsps(message, orgId);
       	}
    });	
}

function submitImportSbjtRltdDataRsps(msg, orgId)
{
	if("import_fail" == msg)
	{
		alertMsg("导入数据出错，请稍后再试！");
	}
	else if("upload_fail" == msg)
	{
		alertMsg("文件上传出错，请稍后再试！");
	}
	else if("file_should_not_be_null" == msg)
	{
		alertMsg("请选择数据文件！");
	}
	else if("file_type_error" == msg)
	{
		alertMsg("文件类型错误，请重新选择文件！");
	}
	else if("read_cfg_file_error" == msg)
	{
		alertMsg("读取配置文件出错，请稍后再试！");
	}
	else if("import_success" == msg)
	{
		alertMsg("数据导入成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showExportUserRltdDataForm(orgId)
{
	var formId = "export_user_rltd_data_form";
	var form = "<form id=\"" + formId + "\" action=\"ExportUserRltdDataServlet\" method=\"post\">"
			+ "<input type=\"hidden\" name=\"orgId\" value=\"" + orgId + "\" />"
			+ "<table>"
				+ "<tr>"
					+ "<td><input type=\"button\" value=\"系统用户相关数据导出\" onclick=\"submitExportUserRltdData('" 
							+ formId + "', '" + orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";

	showContent("系统用户相关数据导出", form, false, "");
}

function submitExportUserRltdData(formId, orgId)
{
	//alertMsg("提示：该功能将在系统部署至机构内部网络后开放！");
	alertMsg("开始导出数据，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitExportUserRltdDataRsps(message, orgId);
       	}
    });
}

function submitExportUserRltdDataRsps(msg, orgId)
{
	if("export_fail" == msg)
	{
		alertMsg("导出数据出错，请稍后再试！");
	}
	else
	{
		var form = "<table>"
				+ "<tr>"
					+ "<td><a href=\"" + msg + "\"><font color=\"blue\">点击下载</font></a></td>"
					+ "<td><input type=\"button\" value=\"返回\" onclick=\"showExportUserRltdDataForm('" 
							+ orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>";

		showContent("系统用户相关数据导出", form, false, "");
		alertMsg("导出数据成功，请点击下载！");
	}
}

function showImportUserRltdDataForm(orgId)
{
	var formId = "import_user_rltd_data_form";
	var form = "<form id=\"" + formId + "\" action=\"ImportUserRltdDataServlet\" method=\"post\" enctype=\"multipart/form-data\">"
			+ "<table>"
				+ "<tr>"
					+ "<td><input type=\"file\" id=\"userRltdData\" name=\"userRltdData\" /></td>"
					+ "<td><input type=\"button\" value=\"系统用户相关数据导入\" onclick=\"submitImportUserRltdData('" 
							+ formId + "', '" + orgId + "');\" /></td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("系统用户相关数据导入", form, false, "");
}

function submitImportUserRltdData(formId, orgId)
{
	//alertMsg("提示：该功能将在系统部署至机构内部网络后开放！"); 
	alertMsg("开始上传文件，请稍等...");
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitImportUserRltdDataRsps(message, orgId);
       	}
    });
}

function submitImportUserRltdDataRsps(msg, orgId)
{
	if("import_fail" == msg)
	{
		alertMsg("导入数据出错，请稍后再试！");
	}
	else if("upload_fail" == msg)
	{
		alertMsg("文件上传出错，请稍后再试！");
	}
	else if("file_should_not_be_null" == msg)
	{
		alertMsg("请选择数据文件！");
	}
	else if("file_type_error" == msg)
	{
		alertMsg("文件类型错误，请重新选择文件！");
	}
	else if("read_cfg_file_error" == msg)
	{
		alertMsg("读取配置文件出错，请稍后再试！");
	}
	else if("import_success" == msg)
	{
		alertMsg("数据导入成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showMgntVpnForm(userId)
{
	var submitURL = "ShowMgntVpnFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showMgntVpnFormRsps;
	ajax.send();
}

function showMgntVpnFormRsps()
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
				showContent("管理VPN", state, false, "");
			}
		}
	}
}

function submitMgntVpn(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{
			submitMgntVpnRsps(message);
       	}
    });
}

function submitMgntVpnRsps(msg)
{
	if("mgnt_vpn_success" == msg)
	{
		clearMainContent();
		alertMsg("操作成功，请查看！");
	}
	else if("mgnt_vpn_fail" == msg)
	{
		clearMainContent();
		alertMsg("操作出现异常，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		clearMainContent();
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else
	{
		clearMainContent();
		alertMsg("操作出现异常，请稍后再试！");
	}
}