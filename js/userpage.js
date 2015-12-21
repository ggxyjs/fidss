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

function showEditUserInfoForm(userId)
{
	var submitURL = "ShowEditUserInfoFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showEditUserInfoFormRsps;
	ajax.send();
}

function showEditUserInfoFormRsps()
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
				showContent("基本信息设置", state, false, "");
			}
		}
	}
}

function submitEditUserInfo(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEditUserInfoRsps(message);
       	}
    });
}

function submitEditUserInfoRsps(msg)
{
	if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else if("edit_user_info_fail" == msg)
	{
		alertMsg("设置用户信息失败，请稍后再试！");
	}
	else if("edit_user_info_success" == msg)
	{
		clearMainContent();
		alertMsg("设置用户信息成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showEditPwForm(userId)
{	
	var formId = "edit_pw_form";
	var form = "<form id=\"" + formId + "\" action=\"EditPwServlet\" method=\"post\">"
			+ "<table>"
				+ "<tr>"
					+ "<td colspan=\"2\"><input type=\"hidden\" name=\"userId\" value=\"" + userId + "\" />"
				+ "</tr>"
				+ "<tr>"
					+ "<td align=\"right\">输入旧密码：</td>"
					+ "<td><input type=\"password\" name=\"pw\" id=\"password\" />"
				+ "</tr>"
				+ "<tr>"
					+ "<td></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td align=\"right\">输入新密码：</td>"
					+ "<td><input type=\"password\" name=\"newPw\" id=\"new_password\" />"
				+ "</tr>"
				+ "<tr>"
					+ "<td colspan=\"2\" align=\"center\" id=\"new_psw_check\"></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td align=\"right\">确认新密码：</td>"
					+ "<td><input type=\"password\" name=\"repeatNewPw\" id=\"repeat_new_password\" />"
				+ "</tr>"
				+ "<tr>"
					+ "<td colspan=\"2\" align=\"center\" id=\"repeat_new_psw_check\"></td>"
				+ "</tr>"
				+ "<tr>"
					+ "	<td colspan=\"2\"><hr style=\"height:1px;border:none;border-top:1px solid #555555;\" /></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td colspan=\"2\"><hr style=\"height:5px;border:none;border-top:5px solid #214A7B;\" /></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td colspan=\"3\">"
						+ "<table border=\"0\">"
							+ "<tr>"
								+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp;确认&nbsp;\"  style=\"font-size:14px\" onclick=\"submitEditPw('"
										+ formId + "');\" style=\"font-size:14px\" /></td>"
								+ "<td><input type=\"button\" class=\"buttonstyle\"   value=\"&nbsp;取消&nbsp;\" onclick=\"clearMainContent() style=\"font-size:14px\";\"/></td>"
							+ "</tr>"
						+ "</table>"
					"</td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("个人密码设置", form, false, "");
}

function submitEditPw(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEditPwRsps(message);
       	}
    });
}

function submitEditPwRsps(msg)
{
	if("pw_length_not_right" == msg)
	{
		alertMsg("新密码的长度应该在8~20位之间！");
	}
	else if("unmatched_pw" == msg)
	{
		alertMsg("两次输入的新密码不同，请重试！");
	}
	else if("edit_pw_success" == msg)
	{
		clearMainContent();
		alertMsg("设置密码成功！");
	}
	else if("edit_pw_failed" == msg)
	{
		alertMsg("设置密码失败，请稍后再试！");
	}
	else if("wrong_pw" == msg)
	{
		alertMsg("请输入正确的密码！");
	}
	else if("get_old_pw_failed" == msg)
	{
		alertMsg("获取旧密码出错，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showAddUgForm(userId, username)
{
	var formId = "add_ug_form";
	var form = "<form id=\"" + formId + "\" action=\"AddUgServlet\" method=\"post\">"
			+ "<table>"
				+ "<tr>"
					+ "<td colspan=\"2\"><input type=\"hidden\" name=\"userId\" value=\"" + userId + "\" />"
				+ "</tr>"
				+ "<tr>"
					+ "<td>任务组创建者：</td>"
					+ "<td><input type=\"text\" value="+ username+"  readonly /></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td>任务组的名称：</td>"
					+ "<td><input type=\"text\" name=\"ugName\" /></td>"
				+ "</tr>"
				+ "<tr>"
					+ "<td valign=\"top\">任务相关描述：</td>"
					+ "<td><textarea name=\"ugSummary\" cols=\"36\" rows=\"10\"></textarea></td>"
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
								+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp确认&nbsp\" onclick=\"submitAddUg('"
										+ formId + "')\" style=\"font-size:14px\" /></td>"
								+ "<td><input type=\"button\" class=\"buttonstyle\" value=\"&nbsp取消&nbsp\" onclick=\"clearMainContent()\" style=\"font-size:14px\"/></td>"
							+ "</tr>"
						+ "</table>"
					"</td>"
				+ "</tr>"
			+ "</table>"
		+ "</form>";
		
	showContent("创建任务组", form, false, "");
}

function submitAddUg(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddUgRsps(message);
       	}
    });
}

function submitAddUgRsps(msg)
{
	if("add_ug_fail" == msg)
	{
		alertMsg("添加用户组失败，请稍后再试！");
	}
	else if("ugName_should_not_be_null" == msg)
	{
		alertMsg("请输入用户组名称！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("ugName_has_existed" == msg)
	{
		alertMsg("该用户组名称已被占用，请重试！");
	}
	else if("add_ug_success" == msg)
	{
		clearMainContent();
		alertMsg("添加用户组成功，请查看！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showMgntUgForm(userId)
{
	var submitURL = "ShowMgntUgFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showMgntUgFormRsps;
	ajax.send();
}

function showMgntUgFormRsps()
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
				showContent("维护任务组", state, false, "");
			}
		}
	}
}

function showViewUgCreatedForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			showViewUgCreatedFormRsps(message);
       	}
    });
}

function showViewUgCreatedFormRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else
	{
		showContent("用户组信息", msg, false, "");
	}
}

function submitDelUg(formId, userId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitDelUgRsps(message, userId);
       	}
    });
}

function submitDelUgRsps(msg, userId)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组失败，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("could_not_del_ug" == msg)
	{
		alertMsg("无法删除该用户组！");
	}
	else if("has_no_del_athy" == msg)
	{
		alertMsg("您没有删除权限！");
	}
	else if("del_ug_success" == msg)
	{
		showMgntUgForm(userId);
		alertMsg("删除用户组成功，请查看！");
	}
	else if("del_ug_fail" == msg)
	{
		alertMsg("删除用户组出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showEditUgSummaryForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			showEditUgSummaryFormRsps(message);
       	}
    });
}

function showEditUgSummaryFormRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息出错，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else
	{
		showContent("修改组描述", msg, false, "");
	}
}

function submitEditUgSummary(formId, userId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitEditUgSummaryRsps(message, userId);
       	}
    });
}

function submitEditUgSummaryRsps(msg, userId)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("edit_ug_summary_success" == msg)
	{
		showMgntUgForm(userId);
		alertMsg("修改用户组描述成功，请查看！");
	}
	else if("edit_ug_summary_fail" == msg)
	{
		alertMsg("修改用户组描述出错，请稍后再试！");
	}
	else if("could_not_edit_ug" == msg)
	{
		alertMsg("无法修改该用户组！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showViewUgJoinedForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			showViewUgJoinedFormRsps(message);
       	}
    });
}

function showViewUgJoinedFormRsps(msg)
{
	if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息失败，请稍后再试！");
	}
	else if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息失败，请稍后再试！");
	}
	else
	{
		showContent("修改组描述", msg, false, "");
	}
}

function submitQuitUg(formId, userId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitQuitUgRsps(message, userId);
       	}
    });
}

function submitQuitUgRsps(msg, userId)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组失败，请稍后再试！");
	}
	else if("quit_ug_success" == msg)
	{
		showMgntUgForm(userId);
		alertMsg("退出任务组成功，请查看！");
	}
	else if("quit_ug_fail" == msg)
	{
		alertMsg("退出任务组失败，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showMgntUserOfUgForm(userId)
{  
	var submitURL = "ShowMgntUserOfUgFormServlet?userId=" + userId;
	ajax.open('POST', submitURL, true);
	ajax.onreadystatechange = showMgntUserOfUgFormRsps;
	ajax.send();
}

function showMgntUserOfUgFormDel(userId)
{   
	var submitURL = "ShowMgntUserOfUgFormDel?userId=" + userId;
	ajax.open('POST', submitURL, true); 
	ajax.onreadystatechange = showMgntUserOfUgFormRsps; 
	ajax.send(); 
}



function showMgntUserOfUgFormRsps()
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
				showContent("组用户分配", state, false, "");
			}
		}
	}
}

function showAddUserToUgForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			showAddUserToUgFormRsps(message);
       	}
    });
}

function showAddUserToUgFormRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息出错，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else
	{
		showContent("添加用户", msg, false, "");
	}
}

function submitAddUserToUg(formId, userId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitAddUserToUgRsps(message, userId);
       	}
    });
}

function submitAddUserToUgRsps(msg, userId)
{
	if("user_not_in_ug_should_be_null" == msg)
	{
		alertMsg("请选择用户！");
	}
	else if("add_user_to_ug_success" == msg)
	{
		showMgntUserOfUgForm(userId);
		alertMsg("添加用户成功，请查看！");
	}
	else if("add_user_to_ug_fail" == msg)
	{
		alertMsg("添加用户失败，请稍后再试！");
	}
	else if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}

function showDelUserFromUgForm(formId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			showDelUserFromUgFormRsps(message);
       	}
    });
}

function showDelUserFromUgFormRsps(msg)
{
	if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息出错，请稍后再试！");
	}
	else if("get_user_fail" == msg)
	{
		alertMsg("获取用户信息出错，请稍后再试！");
	}
	else
	{
		showContent("删除用户", msg, false, "");
	}
}

function submitDelUserFromUg(formId, userId)
{
	formId = "#" + formId;
    $(formId).ajaxSubmit({
    	success: function(message) 
    	{	
			submitDelUserFromUgRsps(message, userId);
       	}
    });
}

function submitDelUserFromUgRsps(msg, userId)
{
	if("user_in_ug_should_not_be_null" == msg)
	{
		alertMsg("请选择用户！");
	}
	else if("del_user_from_ug_success" == msg)
	{
		showMgntUserOfUgFormDel(userId);
		alertMsg("删除用户成功，请查看！");
	}
	else if("del_user_from_ug_fail" == msg)
	{
		alerMsg("删除用户出错，请稍后再试！");
	}
	else if("get_ug_fail" == msg)
	{
		alertMsg("获取用户组信息出错，请稍后再试！");
	}
	else
	{
		alertMsg("操作出现异常，请稍后再试！");
	}
}