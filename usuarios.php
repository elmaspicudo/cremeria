<?php
session_start();
if(isset($_SESSION['login'])){
	if($_SESSION["permisos"] == 1){

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
<script type="text/javascript" src="js/usuarios.js"></script>


<script type="text/javascript">

</script>
<script >
jQuery(document).ready(function(){
	Ext.BLANK_IMAGE_URL = 'js/ext/resources/images/default/s.gif';
	Ext.QuickTips.init();
<?php include 'men.php' ?>
	/*
var displayPanel = new Ext.Panel({
		width    : 650,
		height   : 300,
		layout   : 'border',
		items    : [ miformulario,gridClientes],

	});

/*inv_paneles = new Ext.Panel({
	renderTo: 'panel',
	layout:'fit',
	width: 1100,
	height:500,
	bodyStyle  : 'padding: 10px; background-color: #DFE8F6',
	items:[{
        id: 'contenedor',
		layout:'border',
		region: 'center',
		height:500,
		border:false,
		defaults: {
			collapsible: true,
			split: true,
			bodyStyle: 'padding:0px; background-color:#862934; '
		},
		items: [

		{
			xtype: 'tabpanel',
			region: 'center',
			width: 1100,
			tabPosition: 'top',
			collapsible: false,
			activeTab: 0,
			items: [
			{
			  id:'Clientes', title:'Clientes',layout: 'fit',
				items:displayPanel
			}
			]

		}]
	}]
	});
 */
	var south =new Ext.Panel({
			xtype	:	"panel",
			region	:	"south",
			height	:	150,
			collapsible: true,
			title	:	"Mensages"
		});


		var main = new Ext.Panel({
			renderTo	: 	"panel",
			layout		:	"border",
			height		:	1000,
			items		:	[center,maina,north]
		});

});

</script>
<title>Grupo Net</title>
</head>
<body >
<!-- <div style="margin:10px auto 0 auto; width:1100px; height:105px" >
	<img src="imagenes/logoeffect.png" width="200" height="100" />

    <a href="index.php">Clientes</a>
    <a href="proveedrores.php">Proveedrores</a>
    <a href="productos.php">Productos</a>

 <div id="navicono">
    <div class="botones">
            <div id="menu1">
                <ul class="menu">
                <li><a href="#" class="parent"><span>Duelas y laminados</span></a>
					<div>
                        <ul>
                          <li>hola</li>
                          <li>hola</li>
                          <li>hola</li>
                        </ul>
                    </div>
                </li>
                </ul>
            </div>
        </div>
         </div>
    </div>-->
<div id="panel" style="margin:0 auto 0 auto; width:100%;" ></div>
<input type="hidden" name="hdntipoPer" id="hdntipoPer" value="1" />
<input type="hidden" name="hdnoper" id="hdnoper" value="1" />
<input type="hidden" name="hdncvepadre" id="hdncvepadre" value="" />
<div id="bardown"></div></body>
</html>