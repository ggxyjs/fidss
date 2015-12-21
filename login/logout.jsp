<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  	<base href="<%=basePath%>">
   
   	<title><%@include file="../syscommon/title.txt" %> - 登录注销</title>
   
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
</head>

<body>
 	<%
 		if(null != session)
 		{
			session.invalidate();
		}
	%>
	<script type="text/javascript">
		alert("注销成功！");
		document.writeln("注销成功，请重新登陆！");
		window.location.href = "index.jsp";
	</script>
</body>
</html>
