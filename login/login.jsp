<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	
	Integer orgId = (Integer)request.getAttribute("orgId");
	if(null == orgId)
	{
		response.sendRedirect("index.jsp");
	}
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	
	<base href="<%=basePath%>">

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
	<meta HTTP-EQUIV="Expires" CONTENT="0">
	<meta http-equiv="Page-Exit" content="revealTrans(Duration=10,Transition=22)">
	<title><%@include file="../syscommon/title.txt" %> - 系统登录窗口</title>
	<link rel="Shortcut Icon" href="images/favicon.bmp">
	<style type="text/css">
td {
	font-size: 12;
}

.inputstyle {
	font-family: "Verdana";
	color: #FF6600;
	border: 1px solid #214A7B;
	height: 20px;
	background-image: url(../images/inputstyle.gif)
}

.loginbotton {
	font-family: "Verdana", "Arial", "Helvetica", "sans-serif";
	font-size: 15px;
	font-weight: bold;
	background-image: url(images/bottonbg.gif);
	background-repeat: no-repeat;
	height: 24px;
	width: 110px;
	border: 0px;
	cursor: pointer;
}
</style>
		<script Language="JavaScript" Type="text/javascript"> 
function check()
{   
	 var username=document.form.username.value;
	 var password=document.form.password.value;
	 var checkuser=document.form.checkuser.value;
	 if((username=="")||(password==""))
	 {
		 alert("请输入用户名或密码");
	 }
	 else if(checkuser=="")
	 {
        alert("请填写验证码");
        document.form.checkuser.focus();
	 }
	 else
	 { 
		 document.form.submit();
	 }
	 
}
function Form_Safety(theForm)
{
 
  if (theForm.username.value == "")
  {
    alert("请输入用户名称！");
    theForm.username.focus();
    return (false);
  }
 
  if (theForm.password.value == "")
  {
    alert("请输入密码！");
    theForm.password.focus();
    return (false);
  }
 
  if (theForm.validatecode.value == ""|isNaN(theForm.validatecode.value))
  {
    alert("请输入验证码(数字)！");
    theForm.validatecode.focus();
    return (false);
  }
  return (true);
}
</script>

</head>

<body leftmargin="0" text="#000000" topmargin="0" marginwidth="0"
	marginheight="0" bgcolor=#c5d8f0 >
	<form action="LoginServlet" method="post" name="form">
		<table  width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td>&nbsp;</td>
			</tr>
			<tr>
				<td height="571" align="center" valign="middle">
					<table width="806" height="498" border="0" cellpadding="0"
						cellspacing="0">
						<tr>
							<td width="806" height="498" valign="top">
								<object width="806" height="498">
  									<param name="movie" value="images/login.swf">
 										<embed width="806" height="498" src="images/login.swf">
  										</embed> 
								</object></td></tr>
											<tr><td>
											<table width="100%" border="0" cellspacing="0"
												cellpadding="4" height="110" class="9pv">
											   <tr>
													<td width="40%" align="right" nowrap><font style="font-size: 14px;font-weight: bold;"></font></td>
													<td width="30%" align="left">
														<input type="hidden" name="orgId" value="<%=orgId %>" class="inputstyle" maxlength="50">
													</td>
													<td width="30%"></td>
												</tr>
												<tr>
													<td width="40%" align="right" nowrap><font style="font-size: 14px;font-weight: bold;">用户名</font></td>
													<td width="30%" align="left">
														<input type="text" name="username" class="inputstyle" maxlength="50">
													</td>
													<td width="30%"></td>
												</tr>
												<tr>
													<td width="40%" align="right" nowrap>
														<font style="font-size: 14px;font-weight: bold;">密码</font>
													</td>
													<td width="30%" align="left">
														<input type="password" name="password" class="inputstyle" maxlength="20">
													</td>
													<td width="30%">
													</td>
												</tr>
												<tr>
													<td width="40%" align="right" nowrap>
														<font style="font-size: 14px;font-weight: bold;">验证码</font>
													</td>
													<td width="30%" valign="bottom" align="left">
														<input class="inputstyle" type="text" name="checkuser"
															maxlength="4" size="4" />
														&nbsp;
														<img alt="点击图片变换" name="image" border="1"
															src="login/image.jsp" onclick="this.src=this.src+'?'">
													</td>
													<td width="30%">
														&nbsp;
													</td>
												</tr>
												<tr><td width="40%"></td>
													<td width="60%" align="left">
														<input name="login" type="submit" class="loginbotton"
															value="  登  录" onclick="check();" />
													</td>
													
												</tr>
												<tr>	<td width="40%">
													</td>
													<td width="60%" align="left">
														<%
															String err = (String) request.getAttribute("err");
															if (!(err == null) && !("".equals(err))) {
																out.println("<font size='2' color='red'>" + err
																				+ "</font><br>");
															}
														%>
													</td>
												
												</tr>
											</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</form>

	<div style="display: none;"></div>

</body>
</html>