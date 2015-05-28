<?php
session_start();
if(isset($_SESSION['login'])){
	if($_SESSION["permisos"] == 1 || $_SESSION["permisos"] == 3 || $_SESSION["permisos"] == 5){

	}else{
		header("Location: ".$_SESSION['redirec_loc']."");exit;
	}
}else{
	header("Location: login.php?err=1");exit;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/xtheme-quizz.css" />
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/menulist.css" />
<script type='text/javascript' src='js/jquery-1.4.2.min.js'></script>
<script type='text/javascript' src='js/timer.js'></script>
<link href="css/jquery.notice.css" type="text/css" media="screen" rel="stylesheet" />
<script src="js/jquery.notice.js" type="text/javascript"></script>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<script type="text/javascript" src="js/ext/src/locale/ext-lang-es.js"></script>
<script type="text/javascript" src="js/formDev.js"></script>

<script type="text/javascript">

</script>
<script >
jQuery(document).ready(function(){
	Ext.BLANK_IMAGE_URL = 'js/ext/resources/images/default/s.gif';
	Ext.QuickTips.init();

<?php include 'men.php' ?>
var center1 = new Ext.Panel({
			xtype	:	"panel",
			region	:	"center",
			layout	:	"border",
			border	:	false,
			items	:	[{
			xtype: 'tabpanel',
			region: 'center',
			width: 1100,
			tabPosition: 'top',
			collapsible: false,
			activeTab: 0,
			items: [{
			  id:'tabInventario', title:'DEVOLUCIONES',layout: 'fit',
				items:centerb
			}
			]}]
		});


		var main = new Ext.Panel({
			renderTo	: 	"panel",
			layout		:	"border",
			height		:	1000,
			items		:	[center1,maina,north]
		});


});




</script>
<title>Protecno::Punto de venta</title>
</head>
<body >

<div id="panel" style="margin:0 auto 0 auto; width:100%;" >

</div>
<input type="hidden" name="hdntipoPer" id="hdntipoPer" value="1" />
<input type="hidden" name="hdnoper" id="hdnoper" value="1" />
<input type="hidden" name="hdncvepadre" id="hdncvepadre" value="" />
<input type="hidden" name="hdntabl" id="hdntabl" value="0" />
<input type="hidden" name="hdncont" id="hdncont" value="1" />

<div id="bardown"></div></body>
</html>