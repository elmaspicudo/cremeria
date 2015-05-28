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
<script type="text/javascript" src="js/recepcio.js"></script>
<script type="text/javascript" src="js/recepcion.php"></script>
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
var prod = creaEstores(0,1);
var uns = creaEstores(0,11);
var Unidadesm = new Ext.form.ComboBox({
			store: uns,
			id: 'stt_umd',
			 hiddenName: 'stt_umds', 
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione',
			fieldLabel: '',
			  anchor: '50%',
			 editable: true	, renderTo	: 	"tdumd"		
		});
var productos = new Ext.form.ComboBox({
			store: prod,
			id: 'producto',
			hiddenName: 'cveProducto', 
			valueField: 'value',
			displayField: 'label',
			triggerAction: 'all',
			emptyText: 'Seleccione producto',
			fieldLabel: '',
			anchor: '90%',
			editable: true,
			renderTo: 'tdDes'	
		});

Unidadesm.on('select',function(cmb,record,index){
				ConsultaDatos();
		});
	/*var porct=Ext.get('stt_umd')
porct.on('change', function(token){
		ConsultaDatos()}
);*/
var caducidad = new Ext.form.DateField({			 name:'cad',
													 id: 'cad',
													renderTo:'tdCad'
													 });
function ConsultaDatos(){
	var cont=Ext.get('hdncont').getValue();
	var datosn=document.getElementById("txtCodigo").value;
	var cantsn=document.getElementById("txtUnidades").value;
	var unidades=document.getElementById('stt_umds').value;
	document.getElementById("txtCodigo").value='';
	document.getElementById("txtUnidades").value='';
	var cad=Ext.get('cad').getValue();
		document.getElementById("cad").value='';
	/*$.getJSON("tabla.php", { can: cantsn, data: datosn, oper: 2, cont: "cont" }, function(json){
  		$("#unt"+cont).after(json.datos);
});*/
			$.ajax({
			url: 'tablaN.php',
            cache: false,
			type: "GET",
			data: "can="+cantsn+"&data="+datosn+"&oper=2&cont="+cont+"&umd="+unidades+"&cad="+cad,
			dataType: "json",
			success: function(json){
				if(json.cuant >0){
				$("#bdPro").append(json.data);
				//$("#tblDls").tablesorter();
				}else{
				alert('El precio del producto no existe');}}});
			document.getElementById("hdncont").value=parseInt(cont)+1;
	}
			function sorter(){

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
<div id="panel" style="margin:0 auto 0 auto; width:100%;" >

</div>
<input type="hidden" name="hdntipoPer" id="hdntipoPer" value="1" />
<input type="hidden" name="hdnoper" id="hdnoper" value="1" />
<input type="hidden" name="hdncvepadre" id="hdncvepadre" value="" />
<input type="hidden" name="hdntabl" id="hdntabl" value="0" />
<input type="hidden" name="hdncont" id="hdncont" value="0" />

<div id="bardown"></div></body>
</html>