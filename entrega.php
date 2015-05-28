<?php
session_start();
if(isset($_SESSION['login'])){
	if($_SESSION["permisos"] == 1 || $_SESSION["permisos"] == 3){

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
<script type="text/javascript" src="js/entrega.js"></script>
<script type="text/javascript" src="js/entregas.js"></script>
<script type="text/javascript" src="js/jquery.tablesorter.js"></script>

<script type="text/javascript">

</script>
<script >
jQuery(document).ready(function(){
	Ext.BLANK_IMAGE_URL = 'js/ext/resources/images/default/s.gif';
	Ext.QuickTips.init();


/*var unpanel = new Ext.Panel({
		width    : 650,
		height   : 300,
		layout   : 'border',
		region: 'center',
		applyTo: 'dvdImg'
	});*/
<?php include 'men.php' ?>






		var main = new Ext.Panel({
			renderTo	: 	"panel",
			layout		:	"border",
			height		:	1200,
			items		:	[center1,maina,north]
		});


//$('#cantidad').onChange( function(event){ alert('hola') } );
		var porct=Ext.get('cantidad')
porct.on('change', function(token){

		var producto = Ext.get('cveProducto').getValue();
		var prod=Ext.get('Productos').getValue();
		var id=Ext.get('hdncont').getValue();
		lista = prod.split("!");
		if(lista.length > 5 ){sorter();}
		var h=0;
		if(h==0)
		{

		var datos = Ext.get('Productos').getValue();
		document.getElementById('Productos').value=datos+'!'+id

		var canti = Ext.get('cantidad').getValue();
		var cants = Ext.get('cantidades').getValue();
		document.getElementById('cantidades').value=cants+'!'+canti

		var datosn= Ext.get('Productos').getValue();
		var cantsn = Ext.get('cantidades').getValue();
		var sitab=Ext.get('hdntabl').getValue();

		}
		document.getElementById('hdntabl').value=1;
	var cveclientes=Ext.get('producto')

	cveclientes.focus();
	document.getElementById("cantidad").value=0;
	document.getElementById("producto").value=0;
	ConsultaDatos(producto,canti)

		});
var porct=Ext.get('factura')
porct.on('change', function(token){
	traerDatos();
});

function ConsultaDatos(datosn,cantsn){
	var cont=Ext.get('hdncont').getValue();
	/*$.getJSON("tabla.php", { can: cantsn, data: datosn, oper: 2, cont: "cont" }, function(json){
  		$("#unt"+cont).after(json.datos);
});*/
			$.ajax({
			url: 'tablaN.php',
            cache: false,
			type: "GET",
			data: "can="+cantsn+"&data="+datosn+"&oper=2&cont="+cont,
			success: function(data){

				$("#btblPesos").append(data);
				$("#tblPesos").tablesorter();
				}

		});
			document.getElementById("hdncont").value=parseInt(cont)+1;
	}

	var divObj = Ext.get('contenIn');

			divObj.load({
				url: 'tablaN.php',
				method: 'GET',
				params: {oper:1}
			});
			function sorter(){

			$("#tblDls").tablesorter();
			$("#tblPesos").tablesorter();

			}

});




</script>
<title>Protecno::Punto de venta</title>
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
    </div> -->
<div id="panel" >

</div>
<input type="hidden" name="hdntipoPer" id="hdntipoPer" value="1" />
<input type="hidden" name="hdnoper" id="hdnoper" value="1" />
<input type="hidden" name="hdncvepadre" id="hdncvepadre" value="" />
<input type="hidden" name="hdntabl" id="hdntabl" value="0" />

<div id="bardown"></div></body>
</html>