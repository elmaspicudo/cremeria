<?php
session_start();
if(isset($_SESSION['login'])){
	if($_SESSION["permisos"] == 1 || $_SESSION["permisos"] == 4){

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
<!--<script type="text/javascript" src="js/productos.js"></script>
<script type="text/javascript" src="js/lineaspb.js"></script>-->
<script type="text/javascript" src="js/contacto.js"></script>
<script type="text/javascript" src="js/direcciones.js"></script>
<script type="text/javascript" src="js/clientes.js"></script>
<script type="text/javascript" src="js/cotizacion.js"></script>
<script type="text/javascript" src="js/cotizador.php"></script>
<script type="text/javascript" src="js/formDev.js"></script>
<script type="text/javascript" src="js/jquery.tablesorter.js"></script>

<script type="text/javascript">

</script>
<script >
jQuery(document).ready(function(){
	Ext.BLANK_IMAGE_URL = 'js/ext/resources/images/default/s.gif';
	Ext.QuickTips.init();



<?php include 'men.php' ?>


		var main = new Ext.Panel({
			renderTo	: 	"panel",
			layout		:	"border",
			height		:	1000,
			items		:	[center1,maina,north]
		});
		 
var stateStore = creaEstores(0,1);
		
		var productos = new Ext.form.ComboBox({
			store: stateStore,
			 hiddenName: 'str_productos', 
			id: 'str_prod',
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione',
			fieldLabel: '',
			 anchor: '100%',
			editable: true ,renderTo	: 	"tdDes"
		});

	var porct=Ext.get('txtUnidades')
porct.on('change', function(token){
		ConsultaDatos()}
);

copiar(1);
var panel = Ext.getCmp('panelform'); 
panel.collapse();
function ConsultaDatos(){
	var cont=Ext.get('hdncont').getValue();
	var datosn=document.getElementById("txtCodigo").value;
	var cantsn=document.getElementById("txtUnidades").value;
	var elunid=document.getElementById("str_productos").value
	productos.clearValue();
	var unidades=3;
	document.getElementById("txtCodigo").value='';
	document.getElementById("txtUnidades").value='';
	
			$.ajax({
			url: 'tabla.php',
            cache: false,
			type: "GET",
			data: "can="+cantsn+"&data="+datosn+"&oper=2&cont="+cont+"&umd="+unidades+"&elunid="+elunid,
			dataType: "json",
			success: function(json){
				if(json.cuant >0){
				$("#bdPro").append(json.data);
				totales();}else{
				alert('El precio del producto no existe');}}});
			document.getElementById("hdncont").value=parseInt(cont)+1;
	}
	


	
			function sorter(){

			$("#tblDls").tablesorter();
			$("#tblPesos").tablesorter();

			}

});


function show_checked() {
	window.alert($('input[name=foo]').is(':checked'));
}
function set_checked(checked) {
	var prod=document.getElementById('hdncont').value;
		lista =parseInt(prod);
		for(i=0;i<lista;i++)
		{
			$('input[id=txtCheck'+i+']').attr('checked', checked);
		}
}


	function cambiardat(id,precio,cveprecio){
		document.getElementById("txtPrecio"+id).value=precio;
		document.getElementById("txtumd"+id).value='';   
		document.getElementById("spPrecio"+id).innerHTML=precio;
		switch(precio){
			case 1:document.getElementById("txtDestip"+id).value='Mayoreo';
			break;
			case 2:document.getElementById("txtDestip"+id).value='Medio Mayoreo';
			break;
			case 3:document.getElementById("txtDestip"+id).value='Menudeo';
			break;
			}
		var cantsn=document.getElementById("txtUnidades"+id).value;
		document.getElementById("txtSubtotal"+id).value=parseFloat(cantsn)*parseFloat(precio);
		
		totales();
		
				}
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
<div id="panel" style="margin:0 auto 0 auto; width:100%;" >

</div>  
<input type="hidden" name="hdntipoPer" id="hdntipoPer" value="1" />
<input type="hidden" name="hdnoper" id="hdnoper" value="1" />
<input type="hidden" name="hdncvepadre" id="hdncvepadre" value="" />
<input type="hidden" name="hdntabl" id="hdntabl" value="0" />
<input type="hidden" name="hdncont" id="hdncont" value="1" />

<div id="bardown"></div></body>
</html>