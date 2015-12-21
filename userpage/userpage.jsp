<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page language="java" pageEncoding="UTF-8"%>

<%@ page import="syspagelayout.SysPageLayout" %>
<%@ page import="user.Authority" %>
<%@ page import="user.User" %>
<%@ page import="table.TAthy" %>

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

	<script type="text/javascript" src="js/ajaxobj.js"></script>
	<script type="text/javascript" src="js/userpage.js"></script>
	<script type="text/javascript" src="js/wbst.js"></script>
	<script type="text/javascript" src="js/sbjt.js"></script>
	
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
		#info2_table{
			Margin-Right: auto;
		    Margin-Left: auto;
			border:1px solid black;
			border-collapse:collapse;
		}
		#info2_table tr th{
			border:1px solid black;
		}
		#info2_table tr td{
			border:1px solid black;
		}
		
	</style>	
				
	
	<style type="text/css">
		#info1_table{
		    width:600px;
			border:1px solid black;
			border-collapse:collapse;
		}
		#info1_table tr th{
			border:1px solid black;
		}
		#info1_table tr td{
			border:1px solid black;
			text-align:center;
		}#info1_table  td{
			width:40px;
			height:40px;
		}
	</style>
	<style type="text/css">
		#www_table{
			Margin-Right: auto;
		    Margin-Left: auto;
			border:1px solid black;
			border-collapse:collapse;
			width:600px;
		}
		#www_table tr th{
			border:1px solid black;
		}
		#www_table tr td{
			border:1px solid black;
		}
		#www_table td{
		width:40px; 
		}
	</style>	
	
	<style type="text/css">
		#del_table{
			width:600px;
			border:1px solid black;
			border-collapse:collapse;
		}
		#del_table tr th{
			border:1px solid black;
		}
		#del_table td{
			border:1px solid black;
		
		}
	</style>
	
	
		<style type="text/css">
		#del2_table{
		    width:600px;
			Margin-Right: auto;
		    Margin-Left: auto;
			border:1px solid black;
			border-collapse:collapse;
		}
		#del2_table tr th{
			border:1px solid black;
		}
		#del2_table tr td{
			border:1px solid black;
		}
		#del2_table  td{
			width:40px;
			height:40px;
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
					if(null != navBar)
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
				<a id="a_1" href="javascript:void(0);"><b>个人信息管理：</b></a>
			</div>
			<div>
				<div>
					<div id="load" style="display: none">
						<img src="images/loading.gif">Loading data..
					</div>
					<ul class="contentTree">
						<li id="li_userinfo">
							<img id="img_userinfo" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_userinfo', 'img_userinfo');">个人信息设置</a>
							<ul id="ul_userinfo">
								<li id="li_personalinfo">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showEditUserInfoForm('<%=user.getId() %>');">基本信息设置</a>
									<ul></ul>
								</li>
								<li id="li_password">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a id="10" href="javascript:showEditPwForm('<%=user.getId() %>');">个人密码修改</a>
									<ul></ul>
								</li>
								<!-- 
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a id="10" href="javascript:showEditUsernameForm('<%=user.getId() %>');">用户信息修改</a>
									<ul></ul>
								</li>
								-->
							</ul>
						</li>
						<li id="li_mgnt_ug">
							<img id="img_mgnt_ug" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_mgnt_ug', 'img_mgnt_ug');">任务组管理</a>
							<ul id="ul_mgnt_ug">
								<li id="li_add_ug">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a id="9" href="javascript:showAddUgForm('<%=user.getId() %>', '<%=user.getUsername() %>');">新建任务组</a>
									<ul></ul>
								</li>
								<li id="li_mgnt_user_of_ug">
									<img id="img_mgnt_user_of_ug" src="images/minus.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showHide('ul_mgnt_user_of_ug', 'img_mgnt_user_of_ug');">用户分配</a>
									<ul id="ul_mgnt_user_of_ug">
									    <li id="li_add_user_to_ug">
									      <img src="images/blank.gif">
									      <img src="images/arrow_right.gif">
									      <a href="javascript:showMgntUserOfUgForm('<%=user.getId() %>');">添加用户</a>
									      <ul></ul>
									   </li>
									   <li id="li_del_user_from_ug">
									      <img src="images/blank.gif">
									      <img src="images/arrow_right.gif">
									      <a href="javascript:showMgntUserOfUgFormDel('<%=user.getId() %>');">删除用户</a>
									      <ul></ul>
									   </li>
									</ul>
								</li>
								<li id="li_edit_ug">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showMgntUgForm('<%=user.getId() %>');">维护任务组</a>
									<ul></ul>
								</li>
							</ul>
						</li>
						<li id="li_mgnt_wbst">
						    <img id="img_mgnt_wbst" src="images/minus.gif">
						    <img src="images/arrow_right.gif">
						    <a href="javascript:showHide('ul_mgnt_wbst', 'img_mgnt_wbst');">目标网站跟踪设置</a>
						    <ul id="ul_mgnt_wbst">
						        <li id="li_add_wbst">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a  href="javascript:showChooseAddWbstMethodForm('<%=user.getId() %>');">添加站点</a>
									<ul></ul>
								</li>
								<li id="li_follow_wbst">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showListUgToFollowWbstForm('<%=user.getId() %>');">关注站点</a>
									<ul></ul>
								</li>
								<li id="li_edit_wbst">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showListWbstToEditForm('<%=user.getId() %>');">编辑网站</a>
									<ul></ul>
								</li>	
								<li id="li_edit_wbst_kw">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showListWbstToEditKwForm('<%=user.getId() %>');">修改关键词</a>
									<ul></ul>
								</li>
								<li id="li_rename_wbst">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showListWbstToRenameForm('<%=user.getId() %>');">修改名称</a>
									<ul></ul>
								</li>
								<li id="li_share_sbjt">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showListWbstToShareForm('<%=user.getId() %>');">共享站点</a>
									<ul></ul>
								</li>
								<li id="li_del_sbjt">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showListWbstToDelForm('<%=user.getId() %>');">删除站点</a>
									<ul></ul>
								</li>
								<!-- 
								<li id="li_updateRSS">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a  href="javascript:movetoupdate()">更新站点</a>
									<ul></ul>
								</li>
								-->
							</ul>
						</li>
						<li id="li_mgnt_sbjt">
						    <img id="img_mgnt_sbjt" src="images/minus.gif">
						    <img src="images/arrow_right.gif">
						    <a href="javascript:showHide('ul_mgnt_sbjt', 'img_mgnt_sbjt');">专题情报发现设置</a>
						    <ul id="ul_mgnt_sbjt">
								<li id="li_follow_sbjt">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a  href="javascript:showListUgToFollowSbjtForm('<%=user.getId() %>');">关注专题</a>
									<ul></ul>
								</li>
								<li id="li_share_sbjt">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a  href="javascript:showListSbjtToShareForm('<%=user.getId() %>');">共享专题</a>
									<ul></ul>
								</li>
								<li id="li_del_sbjt">
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a  href="javascript:showListSbjtToDelForm('<%=user.getId() %>');">删除专题</a>
									<ul></ul>
								</li>
							</ul>
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
				<div style="font-size: 14px;font-weight: bold;">个人信息管理</div>
			</div>
		</div>
	</div>
	<div class="main">
		<div id="mainContent">
		
		</div>
	</div>
	<div class="bottom"></div>
<%
		}
	}
%>

<script type="text/javascript">
	setSelectedPage("nav_" + <%=TAthy.CV_ID_USERPAGE %>);
</script>
</body>
</html>
