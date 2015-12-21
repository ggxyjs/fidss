<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ page import="user.User" %>
<%@ page import="user.Authority" %>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

	<base href="<%=basePath%>">
	
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<meta HTTP-EQUIV="Expires" CONTENT="0">
	<meta http-equiv="Page-Exit" content="revealTrans(Duration=10,Transition=22)">
	
	<title><%@include file="../syscommon/title.txt" %> - 系统信息载入</title>
	
	<link rel="Shortcut Icon" href="images/favicon.bmp">
</head>
<body>
	<%
		try
		{
			int userId = Integer.parseInt(session.getAttribute("userid").toString());
			User user = User.getUser(userId);
			if(null != user)
			{
				Authority[] athys = user.getAthys();
				if((null!=athys) && (0<athys.length))
				{
					response.sendRedirect("../" + athys[0].getLink());
				}
				else
				{
					%>
						您没有操作该系统的权限！
					<%
				}
			}
			else
			{
				request.setAttribute("err", "登录出错，请重试！");
				request.getRequestDispatcher("login/login.jsp").forward(request, response);
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
			request.setAttribute("err", "登录出错，请重试！");
			request.getRequestDispatcher("login/login.jsp").forward(request, response);
		}
	%>
</body>
</html>