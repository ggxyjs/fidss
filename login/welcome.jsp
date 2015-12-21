<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="syspagelayout.SysWelcomePage" %>
<%@page import="user.User"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

	String username = (String)session.getAttribute("username");
%>
<head>
	<base href="<%=basePath%>">

   <title><%@include file="../syscommon/title.txt" %> - <%=username%></title>
   
   <link rel="Shortcut Icon" href="images/favicon.ico">
   
	<!-- 3D云标签 begin -->
	<link rel="stylesheet" type="text/css" href="css/3DLable/miaov_style.css" />
	<script type="text/javascript" src="js/3DLable/miaov.js"></script>	
	<!-- 3D云标签 end -->
	
</head>
  
<body style="background-color:#000000;">
<%  
	if((null==username) || username.equals(""))
	{
		response.sendRedirect("../login/login.jsp");
	}
	else
	{
		int userId = Integer.parseInt(session.getAttribute("userid").toString());
		User user = User.getUser(userId);
%>
 		<div id="div1">
		<%
			SysWelcomePage sysWelcomePage = new SysWelcomePage(user.getOrgId(), 100);
			out.print(sysWelcomePage.get3DBall());					
		%>
		</div>
		<div style="text-align: right;margin: 0 auto;margin-top: 40px;font-weight: bold;">
		    <a href="login/loading.jsp" style="font-size: 25px;text-decoration: none;color: white;">
		        ENTER&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		    </a>
		</div>
<%
	}
%>
</body>
</html>
