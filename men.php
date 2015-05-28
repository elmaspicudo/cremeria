<?php
//echo
include_once "lib/mnpBD.class.php";

/*
 * sm 	- Catalogos
 * smb 	- Inventario
 * smc  - Cotizador
 */
$smb = "<div class=\"navi\"><ul><li class=\"icono11\"><a href=\"inventario.php\">Inventario</a></li><li class=\"icono12\"><a  href=\"invRec.php\">Recepción Mercancía</a></li></ul></div>";
$smc="";
switch($_SESSION['permisos']){
	case 1:
		$sm = " '<div class=\"navi\"><ul><li class=\"icono3\"><a href=\"clientes.php\">Clientes</a></li><li class=\"icono4\"><a href=\"proveedrores.php\">Proveedores</a></li><li class=\"icono5\"><a href=\"productos.php\">Productos</a></li><li class=\"icono8\"><a href=\"lineas.php\">Líneas</a></li></ul></div>'";
		$smc= "";
		
		$panel = "panel11,panel2,panel3,panel5,panel6";
		break;
	case 2:
		$sm = " '<div class=\"navi\"><ul><li class=\"icono3\"><a href=\"clientes.php\">Clientes</a></li><li class=\"icono4\"><a href=\"proveedrores.php\">Proveedores</a></li><li class=\"icono5\"><a href=\"productos.php\">Productos</a></li><li class=\"icono5\"><a href=\"lineas.php\">Líneas</a></li></ul></div>'";
		$panel = "panel6";
		break;
	case 3;
		$sm		= "'<div class=\"navi\"><ul><li class=\"icono11\"><a href=\"inventario.php\">Inventario</a></li></ul></div>'";
		//$smb	= "<div class=\"navi\"><ul><li class=\"icono6\"><a href=\"inventario.php\">Compras</a></li><li class=\"icono7\"><a  href=\"invRec.php\">Recepción Mercancía</a></li><li class=\"icono7\"><a  href=\"entrega.php\">Salida Mercancía</a></li></ul></div>";
		$smb	= "";
		$panel	= "panel2";
	break;
	case 4:
		$sm 	= " '<div class=\"navi\"><ul><li class=\"icono3\"><a  href=\"#\" onclick=\"winClientes();\">Clientes</a></li></ul></div>'";
		$panel	= "panel2,panel3";
		
	break;
	case 5;
		$sm		= " '<div class=\"navi\"><ul><li class=\"icono5\"><a href=\"productos.php\">Productos</a></li><li class=\"icono5\"></ul></div>'";
		//$panel	= "panel2,panel5,panel6";
		//$smb	= "<div class=\"navi\"><ul><li class=\"icono6\"><a href=\"inventario.php\">Compras</a></li><li class=\"icono6\"><a href=\"ordenesC.php\">Órdenes de compra</a></li><li class=\"icono7\"><a  href=\"invRec.php\">Recepción Mercancía</a></li><li class=\"icono7\"><a  href=\"entrega.php\">Salida Mercancía</a></li></ul></div>";
		$smb	= "<div class=\"navi\"><ul><li class=\"icono11\"><a href=\"inventario.php\">Inventario</a></li></ul></div>";
		$panel	= "panel2,panel5";
		
	break;
	case 6;
		$sm		= " '<div class=\"navi\"><ul><li class=\"icono5\"><a href=\"autorizar.php\">Autorizar pagos</a></li></ul></div>'";
		//$panel	= "panel2,panel5,panel6";
		//$smb	= "<div class=\"navi\"><ul><li class=\"icono6\"><a href=\"inventario.php\">Compras</a></li><li class=\"icono6\"><a href=\"ordenesC.php\">Órdenes de compra</a></li><li class=\"icono7\"><a  href=\"invRec.php\">Recepción Mercancía</a></li><li class=\"icono7\"><a  href=\"entrega.php\">Salida Mercancía</a></li></ul></div>";
		//$smb	= "<div class=\"navi\"><ul><li class=\"icono11\"><a href=\"inventario.php\">Compras</a></li></ul></div>";
		$panel	= "panelaut";
	break;
	default:
		$sm = " '<div class=\"navi\"><ul><li class=\"icono3\"><a href=\"clientes.php\">Clientes</a></li><li class=\"icono4\"><a href=\"proveedrores.php\">Proveedores</a></li><li class=\"icono5\"><a href=\"productos.php\">Productos</a></li><li class=\"icono5\"><a href=\"lineas.php\">Líneas</a></li><li class=\"icono5\"><a href=\"precios.php\">Precios</a></li></ul></div>'";
		$panel = "panel11,panel2,panel3,panel5,panel6";
	break;
	}
$men="
var panel11 = new Ext.Panel({
	title: 'Usuarios',
	bodyStyle: 'padding:0px; border:none; ',
    html: '<ul class=\"navi\"><li class=\"icono1\"><a href=\"usuarios.php\">Administrar</a></li></ul>',
    border: false,
    collapsible: true,
    titleCollapse: true,
    iconCls: 'users'
});

var panel2 = new Ext.Panel({
	title: 'Catálogos',
    html:".$sm.",
    bodyStyle: 'padding:10px;',
    border: false,
    collapsible: true,
    titleCollapse: true,
    iconCls: 'users'
});
var panelaut = new Ext.Panel({
	title: 'Cobranza',
    html:".$sm.",
    bodyStyle: 'padding:10px;',
    border: false,
    collapsible: true,
    titleCollapse: true,
    iconCls: 'users'
});
var panel3 = new Ext.Panel({
	title: 'Ventas',
    html: '<div class=\"navi\"><ul><li class=\"icono6\"><a href=\"cotizador.php\">Punto de venta</a></li>$smc</ul></div><div class=\"navi\"><ul><li class=\"icono6\"><a  href=\"#\" onclick=\"aler();\">Notificaciones:</a></li></ul></div>',
    bodyStyle: 'padding:10px;',
    border: false,
    collapsible: true,
    titleCollapse: true,
    iconCls: 'users'
});



var panel5= new Ext.Panel({
	title: 'Inventario',
    html: '".$smb."',
    bodyStyle: 'padding:10px;',
    border: false,
    collapsible: true,
    titleCollapse: true,
    iconCls: 'users'
});
var panel6= new Ext.Panel({
	title: 'Facturación',
	id: 'evots',
    html: '<div class=\"navi\"><ul><li class=\"icono7\"><a href=\"reportev.php\">Reportes</a></li></ul></div>',
    bodyStyle: 'padding:10px;',
    border: false,
    collapsible: true,
    titleCollapse: true,
    iconCls: 'users'
});
var maina = new Ext.Panel({
			region	:	\"west\",
			width	:	150,
			split	:	true,
			collapsible:true,
			title	:	\"Menú\",
			margins	:	\"0 0 0 0\",
	defaults: { // con esto evitamos...
		collapsible:true, //duplicar código...
		border: false, // y todas estas...
		bodyStyle: 'padding:0px;', // propiedades ...
		titleCollapse: true, // son agregadas a...
		//height:200 //todos los paneles internos
	},
	items: [".$panel."]

	});";

$divlg = "";
$height = "165";

		$divlg = "<div style='height:15px; background-color:#ffa20e;'></div><div style='float:left'><img src='img/logoConReflejo.png' /></div><div style='text-align:right; padding-right:10px; padding-top:5px; font:12px tahoma,arial,helvetica,sans-serif; float:right'>" .
								
								"Bienvenido, <span style='font-weight:bold;'>".$_SESSION['usuario_nombrecompleto']."</span> <a href='login.php?logaut=1'>, Cerrar Sesi&oacute;n</a>" .
							"</div>";
		$height = "190";
	


$men .= "var north = new Ext.Panel({
			xtype	:	\"panel\",
			region	:	\"north\",
			height	:	120,
			html	:	 \"".$divlg."\",
			margins	:	{top:3,bottom:3,left:3,right:3}
		});

		";

	echo $men;
?>