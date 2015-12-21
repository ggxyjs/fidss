<%@ page language="java" pageEncoding="UTF-8"%>

<%@ page import="user.Authority" %>
<%@ page import="syspagelayout.SysPageLayout" %>
<%@ page import="user.User" %>
<%@ page import="table.TAthy" %>
<%@ page import="servlet.admin.ShowAssignRoleFormServlet" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	
	String username = (String)session.getAttribute("username");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <base href="<%=basePath%>">
    
    <title><%@include file="../syscommon/title.txt" %> - <%=username %></title>
    
	<link rel="Shortcut Icon" href="images/favicon.bmp" />
	<link rel="stylesheet" href="css/tree.css" type="text/css" />
	<link rel="stylesheet" href="css/rssItems.css" type="text/css" />
	<link rel="stylesheet" href="css/style.css" type="text/css" />
	
	<script type="text/javascript" src="js/contact.js"></script>
	<script type="text/javascript" src="js/favorite.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="js/jquery/jquery.form.js"></script>
	
	<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
	
	<script type="text/javascript" src="js/ajaxobj.js"></script>
	<script type="text/javascript" src="js/adminpage.js"></script>
	
	<style type="text/css">
	#info_table{
	    
		border:1px solid black;
		border-collapse:collapse;
	}
	#info_table tr th{
		border:1px solid black;
	}
	#info_table tr td{
		border:1px solid black;
		text-align:center;
	}
	</style>
	
	
	<style type="text/css">
	#del_table{
	   width:700px;
		border:1px solid black;
		border-collapse:collapse;
	}
	#del_table tr th{
		border:1px solid black;
	}
	#del_table tr td{
		border:1px solid black;
		text-align:left;
	}
	</style>
</head>

<body>
<%
	if((null==username) || username.equals(""))
	{
		response.sendRedirect("../index.jsp");
	}
	else
	{
		int userId = Integer.parseInt(session.getAttribute("userid").toString().trim());
%>
	<div class="top">
		<div id="header"> 
			<p class="new"></p>
			<div class="topbanner">&nbsp;</div>  
			<div class="toplink">
				<%@include file="../syscommon/toplink.txt" %>
			</div>
			
			<ul class="nav">
			<%
				User user = User.getUser(userId);
				if(null != user)
				{
					Authority[] athys = user.getAthys();
					String navBar = SysPageLayout.getNavBar(athys);
					if((null!=navBar) && !navBar.equals(""))
					{
						out.print(navBar);
					}
			%>
			</ul>
		</div>
	</div>
	
	<div class="leftside">
		<div>
			<div>
				<a id="a_1" href="javascript:rssSelected('1');"><b>系统信息管理：</b></a>
			</div>
			<div>
				<div>
					<div id="load" style="display: none">
						<img src="images/loading.gif">Loading data..
					</div>
					<ul class="contentTree">
						<li>
							<img id="img_sys_user_mgnt" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_sys_user_mgnt', 'img_sys_user_mgnt');">系统用户管理</a>
							<ul id="ul_sys_user_mgnt">
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showAddUserForm('<%=user.getOrgId() %>');">新建用户</a>
									<ul></ul>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showMgntUserForm('<%=user.getOrgId() %>');">维护用户</a>
									<ul></ul>
								</li>
							</ul>
						</li>
						<li id="li_rolemanagement">
							<img id="img_sys_role_mgnt" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_sys_role_mgnt', 'img_sys_role_mgnt');">系统角色管理</a>
							<ul id="ul_sys_role_mgnt">
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showAddRoleForm('<%=user.getOrgId() %>');">新建角色</a>
									<ul></ul>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showMgntRoleForm('<%=user.getOrgId() %>');">维护角色</a>
									<ul></ul>
								</li>
							</ul>
						</li>
						<li>
							<img id="img_sys_athy_mgnt" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_sys_athy_mgnt', 'img_sys_athy_mgnt');">权限分配管理</a>
							<ul id="ul_sys_athy_mgnt">
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showAssignRoleForm('<%=user.getOrgId() %>', '<%=ShowAssignRoleFormServlet.FORM_TYPE_USER_WITHOUT_ROLE %>');">权限分配</a>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showAssignRoleForm('<%=user.getOrgId() %>', '<%=ShowAssignRoleFormServlet.FORM_TYPE_USER_ALL %>');">权限回收</a>
								</li>
							</ul>
						</li>
						<li>
							<img id="img_sys_data_mgnt" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_sys_data_mgnt', 'img_sys_data_mgnt');">系统数据管理</a>
							<ul id="ul_sys_data_mgnt">
								<li>
									<img id="img_sys_data_import_mgnt" src="images/minus.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showHide('ul_sys_data_import_mgnt', 'img_sys_data_import_mgnt');">系统数据导入管理</a>
									<ul id="ul_sys_data_import_mgnt">
										<li>
											<img src="images/blank.gif">
											<img src="images/arrow_right.gif">
											<a href="javascript:showImportWbstRltdDataForm('<%=user.getOrgId() %>');">目标网站相关数据导入</a>
											<ul></ul>
										</li>
										<li>
											<img src="images/blank.gif">
											<img src="images/arrow_right.gif">
											<a href="javascript:showImportSbjtNewsDataForm('<%=user.getOrgId() %>');">专题情报新闻内容导入</a>
											<ul></ul>
										</li>
										<li>
											<img src="images/blank.gif">
											<img src="images/arrow_right.gif">
											<a href="javascript:showImportSbjtRltdDataForm('<%=user.getOrgId() %>');">专题情报相关数据导入</a>
											<ul></ul>
										</li>
										<li>
											<img src="images/blank.gif">
											<img src="images/arrow_right.gif">
											<a href="javascript:showImportUserRltdDataForm('<%=user.getOrgId() %>');">系统用户相关数据导入</a>
											<ul></ul>
										</li>
									</ul>
								</li>
								<li>
									<img id="img_sys_data_export_mgnt" src="images/minus.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showHide('ul_sys_data_export_mgnt', 'img_sys_data_export_mgnt');">系统数据导出管理</a>
									<ul id="ul_sys_data_export_mgnt">
										<li>
											<img src="images/blank.gif">
											<img src="images/arrow_right.gif">
											<a href="javascript:showExportWbstRltdDataForm('<%=user.getOrgId() %>');">目标网站相关数据导出</a>
											<ul></ul>
										</li>
										<li>
											<img src="images/blank.gif">
											<img src="images/arrow_right.gif">
											<a href="javascript:showExportSbjtNewsDataForm('<%=user.getOrgId() %>');">专题情报新闻内容导出</a>
											<ul></ul>
										</li>
										<li>
											<img src="images/blank.gif">
											<img src="images/arrow_right.gif">
											<a href="javascript:showExportSbjtRltdDataForm('<%=user.getOrgId() %>');">专题情报相关数据导出</a>
											<ul></ul>
										</li>
										<li>
											<img src="images/blank.gif">
											<img src="images/arrow_right.gif">
											<a href="javascript:showExportUserRltdDataForm('<%=user.getOrgId() %>');">系统用户相关数据导出</a>
											<ul></ul>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							<img id="img_sys_se_mgnt" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_sys_se_mgnt', 'img_sys_se_mgnt');">搜索引擎管理</a>
							<ul id="ul_sys_se_mgnt">
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showEnableSeForm('<%=user.getOrgId() %>');">启用搜索引擎</a>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showDisableSeForm('<%=user.getOrgId() %>');">停用搜索引擎</a>
								</li>
							</ul>
						</li>
						<li>
							<img id="img_vpn_mgnt" src="images/blank.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showMgntVpnForm('<%=user.getId() %>');">VPN管理</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="leftsidebottom">

	</div>
	<div class="topmain">
		<div>
			<div>
				<div style="font-size: 14px;font-weight: bold;">系统信息管理</div>
			</div>
		</div>
	</div>
	<div class="main">
		<div id="mainContent"><br /><I></I></div>
	</div>
	<div class="bottom"></div>
<%
		}
	}
%>

	<script type="text/javascript">
		setSelectedPage("nav_" + <%=TAthy.CV_ID_ADMINPAGE %>);
	</script>
</body>
</html>
