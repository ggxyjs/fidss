function alertMessager(title, content)
{
	$.messager.alert(title, content);
}

function alertMessagerError(title, content)
{
	$.messager.alert(title, content, 'error');
}

function alertMessagerInfo(title, content)
{
	$.messager.alert(title, content,'info');
}

function alertMessagerQuestion(title, content)
{
	$.messager.alert(title, content, 'question');
}

function alertMessagerWarning(title, content)
{
	$.messager.alert(title, content, 'warning');
}

function confirmMessager(title, content)
{
	$.messager.confirm(title, content, function(r){
		if (r){
			return true;
		}
	});
	
	return false;
}