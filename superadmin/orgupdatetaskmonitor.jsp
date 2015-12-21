<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page language="java" pageEncoding="UTF-8"%>

<%@ page import="user.SuperAdmin" %>
<%@page import="orgupdatetask.OrgUpdateTaskMonitor"%>
<%@page import="orgupdatetask.OrgUpdateTask"%>
<%@page import="java.util.ArrayList"%>
<%@page import="user.Organization"%>
<%@page import="orgupdatetask.sbjtupdater.SbjtUpdateTaskMonitor"%>
<%@page import="orgupdatetask.sbjtupdater.SbjtUpdateTask"%>
<%@page import="orgupdatetask.wbstupdater.WbstUpdateTaskMonitor"%>
<%@page import="orgupdatetask.wbstupdater.WbstUpdateTask"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	
	String username = (String)session.getAttribute("sausername");
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
	
	<script type="text/javascript" src="js/rssTree.js"></script>
	<script type="text/javascript" src="js/contact.js"></script>
	<script type="text/javascript" src="js/favorite.js"></script>
	<script type="text/javascript" src="js/common.js"></script>

	<script type="text/javascript" src="js/jquery/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="js/jquery/jquery.form.js"></script>

	<script type="text/javascript" src="js/ajaxobj.js"></script>

	<script type="text/javascript" src="js/supermanager.js"></script>
	
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
		response.sendRedirect("../login/login.jsp");
	}
	else
	{
		int userId = Integer.parseInt(session.getAttribute("said").toString().trim());
		SuperAdmin sa = SuperAdmin.getSuperAdmin(userId);
%>
	<div class="top">
		<div id="header"> 
			<p class="new"></p>
			<div class="topbanner">&nbsp;</div>  
			<div class="toplink">
				<%@include file="../syscommon/toplink.txt" %>
			</div>
			
			<ul class="nav">
				<li><a href="#"></a></li>
				<li><a href="superadmin/superadmin.jsp">超级管理员</a></li>
				<li><a class="hover" href="superadmin/orgupdatetaskmonitor.jsp">系统更新任务查看</a></li>
			</ul>
		</div>
	</div>
	
	<div class="leftside">
		<div>
			<div>
				<a id="a_1" href="javascript:void(0);"><b>超级管理员管理：</b></a>
			</div>
			<div>
				<div>
					<div id="load" style="display: none">
						<img src="images/loading.gif">Loading data..
					</div>
					<ul class="contentTree">
						<li id="li_mgnt_org">
							<img id="img_mgnt_org" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_mgnt_org', 'img_mgnt_org');">机构管理</a>
							<ul id="ul_mgnt_org">
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showAddOrgForm();">添加机构</a>
									<ul></ul>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showMgntOrgForm('<%=sa.getId() %>');">维护机构</a>
									<ul></ul>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showOrgListForm('<%=sa.getId() %>');">查看机构</a>
									<ul></ul>
								</li>
							</ul>
						</li>
						
						<li id="li_se_mgnt">
							<img id="img_se_mgnt" src="images/minus.gif">
							<img src="images/arrow_right.gif">
							<a href="javascript:showHide('ul_se_mgnt', 'img_se_mgnt');">搜索引擎管理</a>
							<ul id="ul_se_mgnt">
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showSeListForm('<%=sa.getId() %>');">查看搜索引擎</a>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showEnableSeForm('<%=sa.getId() %>');">启用搜索引擎</a>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showDisableSeForm('<%=sa.getId() %>');">停用搜索引擎</a>
								</li>
								<li>
									<img src="images/blank.gif">
									<img src="images/arrow_right.gif">
									<a href="javascript:showAddSeForm('<%=sa.getId() %>');">新增搜索引擎</a>
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
				<div style="font-size: 14px;font-weight: bold;">超级管理员管理</div>
			</div>
		</div>
	</div>
	
	<div class="main">
		<div  align="center" id="mainContent">
			<%
				OrgUpdateTaskMonitor outm = OrgUpdateTaskMonitor.getInstance();
				ArrayList<OrgUpdateTask> outList = outm.getOutList();
				if(null != outList)
				{
					for(int i=0; i<outList.size(); i++)
					{
						OrgUpdateTask ut = outList.get(i);
						Organization org = ut.getOrg();
						out.println("<br />");
						out.println("Org Id: " + org.getId());
						out.println("<br />");
						out.println("Org Title: " + org.getTitle());
						out.println("<br />");
						out.println("Org Sbjt Update Task: " + org.getSbjtUpdateTask());
						out.println("<br />");
						out.println("Org Wbst Update Task: " + org.getWbstUpdateTask());
						out.println("<br />");
						WbstUpdateTaskMonitor wutm = ut.getWutm();
						ArrayList<WbstUpdateTask> wutList = wutm.getWutList();
						out.println("Wutm StartDt: " + wutm.getStartDt());
						out.println("<br />");
						out.println("Wbst Update Task: ");
						out.println("<br />");
						for(int j=0; j<wutList.size(); j++)
						{
							WbstUpdateTask wut = wutList.get(j);
							out.println("<b>Wut Index: </b>" + j);
							out.println("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							out.println("<b>Wut StartDt: </b>" + wut.getStartDt());
							out.println("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							out.println("<b>Wut User Id: </b>" + wut.getUserId());
							out.println("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							out.println("<b>Wut Grade: </b>" + wut.getGrade());
							out.println("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							out.println("<b>Wut Status: </b>" + wut.getStatus());
							out.println("<br />");
						}
						SbjtUpdateTaskMonitor sutm = ut.getSutm();
						ArrayList<SbjtUpdateTask> sutList = sutm.getTaskList();
						out.println("Sutm StartDt: " + sutm.getStartDt());
						out.println("<br />");
						out.println("Sbjt Update Task: ");
						out.println("<br />");
						for(int j=0; j<sutList.size(); j++)
						{
							SbjtUpdateTask sut = sutList.get(j);
							out.println("<b>Sut Index: </b>" + j);
							out.println("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							out.println("<b>Sut StartDt: </b>" + sut.getStartDt());
							out.println("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							out.println("<b>Sut User Id: </b>" + sut.getUserId());
							out.println("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							out.println("<b>Sut Grade: </b>" + sut.getGrade());
							out.println("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
							out.println("<b>Sut Status: </b>" + sut.getStatus());
							out.println("<br />");
						}
						out.println("<br />");
					}
				}
			%>
		</div>
	</div>
	
	<div class="bottom"></div>
<%
	}
%>
</body>
</html>
