var s = document.getElementById('sub').style;
hideDd();
function toggleDd()
{
	if(s.display=='none' || s.display=='')
	{
		s.display='block';
	}
	else
		hideDd();
}
function hideDd()
{
	s.display = "none";
}