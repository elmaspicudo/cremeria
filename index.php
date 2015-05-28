<?php
 session_start();
include_once("lib/bd.php");
	// Si se ha enviado el formulario
   $usuario = $_REQUEST['txtNoAfil'];
   $clave = $_REQUEST['pwsPass'];
   $loc = "cotizador.php";

if (isset($usuario) && isset($clave)){
	$sql = "SELECT * FROM users WHERE password='".$clave."' and username='".$usuario."'";
	$noUsurs=$bd->ExecuteE($sql);
	if (count($noUsurs) > 0){
		$_SESSION['login']					= true;
		$_SESSION['usuario_valido'] 		= $noUsurs[0]['idUsers'];
		$_SESSION['usuario_username'] 		= $noUsurs[0]['username'];
		$_SESSION['usuario_nombrecompleto'] = $noUsurs[0]['nombre']." ".$noUsurs[0]['apellidop']." ".$noUsurs[0]['apellidom'];
		$_SESSION['ultimoAcceso'] 			= date("Y-n-j H:i:s");
		$_SESSION['permisos'] 				= $noUsurs[0]['permisos'];
$_SESSION['firma'] 				= $noUsurs[0]['firma'];
		switch ($_SESSION['permisos']) {
			case 1:
				$loc = "cotizador.php";
				break;
			case 2:
				$loc = "ordenesC.php";
				break;
			case 3:
				$loc = "inventario.php";
				break;
			case 4:
				$loc = "cotizador.php";
				break;
			case 5:
				$loc = "productos.php";
				break;
			case 6:
				$loc = "autorizar.php";
				break;
			default:
				$loc = "index.php";
				break;
		}

		$carpeta = "";
		/*if($noUsurs[0]['carpeta'] == 2){
			$carpeta = "valsas/";
		}else if($noUsurs[0]['carpeta'] == 1){
			$carpeta = "";
		}*/

		$loc = $carpeta.$loc;
		header("Location: ".$loc.'?per='.$_SESSION['permisos']);exit;
	}else{
		header("Location: login.php?fallo=1");
		exit;
	}
}
if(isset($_GET['logaut'])){
	cerrar_session();
}

function cerrar_session() {

	$_SESSION['login']			= false;
	unset($_SESSION['login']);
  	unset($_SESSION['usuario_valido']);
  	unset($_SESSION['usuario_username']);
  	unset($_SESSION['usuario_nombrecompleto']);
  	unset($_SESSION['permisos']);

  	session_unset();
  	session_destroy();
  	header("Location: login.php");
  	exit;

}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Protecno :: Cremeria</title>
<link rel="stylesheet" href="login/css/reset.css" type="text/css" media="screen" />
<link rel="stylesheet" href="login/css/estilop.css" type="text/css" media="screen" />
<script>
function enviar()
{
	document.getElementById('form1').submit();
	
	}
</script>
</head>

<body>
<div id="barratop"></div>
<div id="cajalog">
	<div id="logoimg">
    	<div id="logo">
        	<img src="login/img/log1.png" width="500" height="120" />
        </div>
       
        <div style="color:red"><?php echo $msg; ?></div>
    </div>
     
    <div id="form">
    	<form method="post" action="" name="form1" id="form1">
    	<div class="c1">Nombre de usuario:</div>
        <div id="cosa">
            <div class="c2"><input type="text" class="stilcaja" name="txtNoAfil"/></div>
            <div class="c1">Contraseña:</div>
            <div class="c2"><input type="password" class="stilcaja" name="pwsPass"/></div>
        </div>
        <div id="cajaext">
        	
        </div>
        
        <div id="btnacceso">
            <div class="btnmarcas1">
                <div class="botonx1">
               <a class="sinst1" onclick="enviar()" ></a>
                </div>
            </div>
        </div>
        
        </form>
    </div>
</div>
<div id="barradown"></div>
</body>
</html>
