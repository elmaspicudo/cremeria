<?php
session_start();
if(isset($_POST['hdnAction'])&& $_POST['hdnAction']=='ins')
{
	include_once 'lib/mnpBD.class.php';
	$des=subeImagen('ordenes');
	switch ($des) {
       case 1:
        $mensg="el tipo de archivo no es de los permitidos";
        break;
  	  case 2:
       $mensg="El archivo supera el peso permitido.";
        break;
	}
		$cond='cveSalida ='.$_POST['token'];
			$usrUP=new mnpBD('salidaalmacen');
			$datosU=array(3,$des);
			 $usrUP->actualizar('estatus,archivo',$datosU,$cond);
	$alert="Ext.MessageBox.alert('Alert','Los Archivos se subieron correctamente');";	
	
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
<script type="text/javascript" src="js/invn.js"></script>
<script type="text/javascript" src="js/invns.js"></script>
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
<?php include 'men.php' ;

echo $alert;

function subeImagen($destino)
{
$str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
$cad = "";
for($i=0;$i<12;$i++) {
$cad .= substr($str,rand(0,62),1);
}
// Fin de la creacion de la cadena aletoria
$tamano = $_FILES [ 'file' ][ 'size' ]; // Leemos el tamaño del fichero
$tamaño_max="50000000000"; // Tamaño maximo permitido
		if( $tamano < $tamaño_max){ // Comprovamos el tamaño 
		//$destino = 'uploaded' ; // Carpeta donde se guardata
		$sep=explode('image/',$_FILES["file"]["type"]); // Separamos image/
		$tipo=$sep[1]; // Optenemos el tipo de imagen que es
			// Si el tipo de imagen a subir es el mismo de los permitidos, segimos. Puedes agregar mas tipos de imagen
			$des=$destino . '/' .$cad.'.'.$tipo;
			move_uploaded_file ( $_FILES [ 'file' ][ 'tmp_name' ],$des );  // Subimos el archivo
			return $cad.'.'.$tipo;
			
}
else return 2;// Si supera el tamaño de permitido lo desimos
}
?>






		var main = new Ext.Panel({
			renderTo	: 	"panel",
			layout		:	"border",
			height		:	1200,
			items		:	[center1,maina,north]
		});




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