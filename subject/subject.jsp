<%@ page language="java" pageEncoding="UTF-8"%>

<%@ page import="syspagelayout.SysPageLayout" %>
<%@ page import="user.Authority" %>
<%@ page import="user.User" %>
<%@ page import="user.UserGroup" %>
<%@ page import="subject.Subject" %>
<%@ page import="table.TAthy" %>
<%@ page import="table.TUg" %>
<%@ page import="table.TSbjtOfUser" %>

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
	<script type="text/javascript" src="js/sbjt.js"></script>
	
	<style type="text/css">
		#info_table{
			Margin-Right: auto;
		    Margin-Left: auto;
			border:1px solid black;
			border-collapse:collapse;
		}
		#info_table tr th{
			border:1px solid black;
		}
		#info_table tr td{
			border:1px solid black;
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
		#del_table{
		    width:600px;
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
		#del_table  td{
			width:40px;
			height:40px;
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

<body >
<%
	if((null==username) || username.equals(""))
	{
		response.sendRedirect("../index.jsp");
	}
	else
	{
		int userId = Integer.parseInt(session.getAttribute("userid").toString());

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
				<a id="top_sbjt_ctgy" name="a_sbjt_" href="javascript:selectElem('top_sbjt_ctgy', 'a_sbjt_');showBtnListForTopTitle('<%=user.getId() %>', 'selectedSbjtId');"><b>专题情报</b></a>
			</div>
			<div>
				<div>
					<div id="load" style="display: none">
						<img src="images/loading.gif">Loading data..
					</div>
					<ul class="contentTree" id="tree">
					<%
							out.println("<br />");
					
							Subject[] sbjtsUser = user.getSbjtsCreatedByUser();
							out.println(Subject.getSbjtListOfUg(Subject.BTN_LIST_TYPE_USER, "个人创建的专题", TSbjtOfUser.CV_UG_ID_DEFAULT, user.getId(), sbjtsUser));
							out.println("<br />");
							
							out.println("<li><img id=\"img_ug_tg_list\" src=\"images/minus.gif\"><a href=\"javascript:showHide('ul_ug_tg_list', 'img_ug_tg_list');showBtnListForTgListTitle();\"><u>参与小组的专题</u></a><ul id=\"ul_ug_tg_list\">");
							UserGroup[] tgs = user.getUgsByUgKind(TUg.CV_KIND_TASK);
							if(null != tgs)
							{
								for(int i=0; i<tgs.length; i++)
								{
									Subject[] sbjts = user.getSbjts(tgs[i].getId());
									out.println(Subject.getSbjtListOfUg(Subject.BTN_LIST_TYPE_TG, tgs[i].getTitle(), tgs[i].getId(), user.getId(), sbjts));
								}
							}
							out.println("</ul></li>");
							
							out.println("<br />");
							
							UserGroup[] sgs = user.getUgsByUgKind(TUg.CV_KIND_SHARE);
							if(null != sgs)
							{
								for(int i=0; i<sgs.length; i++)
								{
									Subject[] sbjts = user.getSbjts(sgs[i].getId());
									out.println(Subject.getSbjtListOfUg(Subject.BTN_LIST_TYPE_SG, "机构共享的专题", sgs[i].getId(), user.getId(), sbjts));
								}
							}
							
							out.println("<br />");
							
							out.println("<br /><br />");
						}
					%>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="leftsidebottom" id="oper">
	</div>
	<div class="topmain">
		<div>
			<div>
				<div style="font-size: 16px;font-weight: bold">专题情报</div>
				<div style="position: absolute; right: 30px; top:3px;">
					<form id="search_sbjt_news_form" action="SearchSbjtNewsServlet" method="post" >
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
						<input type="button" name="go"	id="go" value="&nbsp;&nbsp;搜一下&nbsp;&nbsp;" onclick="submitSearchSbjtNews('search_sbjt_news_form');" style="padding-top:1px;padding-bottom:0px; padding-left:3px;padding-right:3px ;font-size:15px;cursor: pointer; COLOR: black;"/>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="main">
		<div id="mainContent">
			<br />
			<I>你还未查看任何专题情报...</I>
		</div>
	</div>
	<div class="bottom"></div>
<%
	}
%>

<script type="text/javascript">
	setSelectedPage("nav_" + <%=TAthy.CV_ID_SUBJECT %>);
</script>
</body>

</html>
