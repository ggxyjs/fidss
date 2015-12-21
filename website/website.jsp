<%@ page language="java" pageEncoding="UTF-8"%>

<%@ page import="syspagelayout.SysPageLayout" %>
<%@ page import="user.Authority" %>
<%@ page import="user.User" %>
<%@ page import="user.UserGroup" %>
<%@ page import="website.Website" %>
<%@ page import="table.TAthy" %>
<%@ page import="table.TUg" %>
<%@ page import="table.TWbstOfUser" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	
	String username = (String)session.getAttribute("username");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

	<base href="<%=basePath%>">

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		
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
	<script type="text/javascript" src="js/wbst.js"></script>
	
	<style type="text/css">
		#info_table{
			Margin-Right: auto;
		    Margin-Left: auto;
			border:1px solid black;
			border-collapse:collapse;
			width:600px;
		}
		#info_table tr th{
			border:1px solid black;
		}
		#info_table tr td{
			border:1px solid black;
		}
		#info_table td{
		width:40px; 
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
			Margin-Right: auto;
		    Margin-Left: auto;
			border:1px solid black;
			border-collapse:collapse;
		}
		#del_table tr th{
			border:1px solid black;
		}
		#del_table tr td{
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
		#info9_table{
			Margin-Right: auto;
		    Margin-Left: auto;
			border:1px solid black;
			border-collapse:collapse;
			width:600px;
		}
		#info9_table tr th{
			border:1px solid black;
		}
		#info9_table tr td{
			border:1px solid black;
		}
		#info9_table td{
		  height:40px;
		  width:40px; 
		 text-align:center;
		}
	</style>	
	
	<style type="text/css">
		#a_table{
			width:600px;
			border:1px solid black;
			Margin-Right: auto;
		    Margin-Left: auto;
			border-collapse:collapse;
		}
		#a_table tr th {
		  border:0px;
		
		}
		#a_table td{
			border:0px ;
	
		}
	</style>
</head>

<body >
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
				<a id="top_wbst_ctgy" name="a_wbst_" href="javascript:selectElem('top_wbst_ctgy', 'a_wbst_');showBtnListForTopTitle('update_wbst_form');"><b>目标网站跟踪：</b></a>
			</div>
			<div>
				<div>
					<div id="load" style="display: none">
						<img src="images/loading.gif">Loading data..
					</div>
					<form id="update_wbst_form" action="UpdateWbstNewsServlet" method="post">
					<input type="hidden" name="userId" value="<%=userId %>" />
					<ul class="contentTree"  id="contentTree">
					<br />
					<%
						Website[] wbstsUser = user.getWbstsCreatedByUser();
						out.println(Website.getWbstListOfUg(Website.BTN_LIST_TYPE_USER, "个人创建的网站", TWbstOfUser.CV_UG_ID_DEFAULT, user.getId(), wbstsUser));
						
						out.println("<br />");
						
						out.println("<li><img id=\"img_ug_tg_list\" src=\"images/minus.gif\"><a href=\"javascript:showHide('ul_ug_tg_list', 'img_ug_tg_list');showBtnListForTgListTitle();\"><u>参与小组的网站</u></a><ul id=\"ul_ug_tg_list\">");
						UserGroup[] tgs = user.getUgsByUgKind(TUg.CV_KIND_TASK);
						if(null != tgs)
						{
							for(int i=0; i<tgs.length; i++)
							{
								Website[] wbsts = user.getWbsts(tgs[i].getId());
								out.println(Website.getWbstListOfUg(Website.BTN_LIST_TYPE_TG, tgs[i].getTitle(), tgs[i].getId(), user.getId(), wbsts));
							}
						}
						out.println("</ul></li>");
						
						out.println("<br />");
						
						UserGroup[] sgs = user.getUgsByUgKind(TUg.CV_KIND_SHARE);
						if(null != sgs)
						{
							for(int i=0; i<sgs.length; i++)
							{
								Website[] wbsts = user.getWbsts(sgs[i].getId());
								out.println(Website.getWbstListOfUg(Website.BTN_LIST_TYPE_SG, "机构共享的网站", sgs[i].getId(), user.getId(), wbsts));
							}
						}
						out.println("<br />");
						
						out.println("<br /><br />");
					}
					%>
						<br />
						<br />
						<br />
						<br />
					</ul>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div id="oper" class="leftsidebottom">
	</div>
	<div class="topmain">
		<div>
			<div>
				<div style="font-size: 16px;font-weight: bold">目标网站</div>
				<div style="position: absolute; right: 30px; top:3px;">
					<form id="search_wbst_news_form" action="SearchWbstNewsServlet" method="post" >
						<input type="hidden" name="userId" value="<%=user.getId() %>" />
						<input type="hidden" name="pageNo" value="1" />
						<input type="hidden" name="perPageItemNum" value="10" />
						<label style="font-size: 16px;font-weight: bold">时间：</label>
						<select style="font-size: 16px;" id="time" name="time">
							<option value="0" selected>全部</option>
							<option value="30">最近一月</option>
							<option value="7">最近一周</option>
							<option value="1">今天</option>
						</select>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<label style="font-size: 16px;font-weight: bold">关键词：</label>
						<input style="font-size: 16px;" type="text" name="kw" id="kw" value="" class="inputstyle" maxlength="50px" size="20px" width="15px"/> 
						<input type="button" name="go" id="go" value="&nbsp;&nbsp;搜一下&nbsp;&nbsp;" onclick="submitSearchWbstNews('search_wbst_news_form');" style="padding-top:1px;padding-bottom:0px; padding-left:3px;padding-right:3px ;font-size:15px;cursor: pointer; COLOR: black;"/>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="main">
		<div id="mainContent"><br /><I>你还未查看任何网站新闻...</I></div>
	</div>
	<div class="bottom"></div>
<%
	}   
%>

<script type="text/javascript">
	setSelectedPage("nav_" + <%=TAthy.CV_ID_WEBSITE %>);
</script>
</body>

</html>
