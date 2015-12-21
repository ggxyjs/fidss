<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<%@ page import="user.Organization" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	
	String username=(String)session.getAttribute("username");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<base href="<%=basePath%>">
	
	<title>专题信息采集与定向跟踪系统 - <%=username%></title>
	<link rel="Shortcut Icon" href="images/favicon.bmp">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
</head>
  
<body>
	
<%  
	if(username==null||username=="")
	{
		String prjtTitle = path.replace("/", "");
		Organization org = Organization.getOrg(prjtTitle);
		if(null != org)
		{
			request.setAttribute("orgId", Integer.valueOf(org.getId()));
			request.getRequestDispatcher("login/login.jsp").forward(request, response);
		}
		else
		{
			response.sendRedirect("errorpage/404.jsp");
		}
	}
	else
	{
		response.sendRedirect("login/welcome.jsp");
	}
%>
</body>
</html>
