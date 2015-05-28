<?php
session_start();
include_once 'lib/mnpBD.class.php';
//echo $_POST['tipoP'].'dsf';;
function limpiarP($cad){
	$re= str_replace('$' , '' , $cad);
	$re= str_replace(',' , '' , $re);
	return  $re;
	}
switch ($_POST['tipoP']) {
	case 1:		$usr=new mnpBD('pedidos');
				$datos=array($_POST['idcot'],time());				
				$campos='cvecotz,fecha';
				if( $usr->insertar($campos,$datos)==true){

					$sql='SELECT max(idped) AS id FROM pedidos ';
					$misd=$bd->Execute($sql);
					
					$detalle=new mnpBD('detalleped');
					$camp='cveCotizacion,cveProducto,cantidad';
					$lim=$_POST['cunatpi'];
					$err=0;
					for($i=0;$i <$lim ;$i++)
					{//echo $_POST['cveprod'.$i];
						if($_POST['cveprod'.$i]!=''){
							
						//secho $precio;
						$dat=array($misd[0][0],$_POST['cveprod'.$i],$_POST['unidades'.$i]);				
						if($detalle->insertar($camp,$dat)!=true)
						{$err++;}
						}
						}
				}
					 echo $err;
					 
				$sql='SELECT cveProducto,cantidad,moneda,total,precioF,costo,descuento,tEntrega,comentario,porcentaje,cveDetalle from detallecotizacion WHERE cveCotizacion='.$_POST['idcot'].' ORDER BY cveDetalle ASC';
	$records=$bd->ExecuteE($sql);
	$i=1;
	$cont=0;
	foreach($records as $record){	
	$sqls='SELECT SUM(cantidad) as alf FROM detalleped WHERE cveProducto='.$record['cveDetalle'];
	$cant=$bd->ExecuteE($sqls);
		if($cant[0]['alf']!='')
		{$cantidad=$record['cantidad']-$cant[0]['alf'];}else{$cantidad=$record['cantidad'];}
		if($cantidad > 0){$cont++;}	 
	}
	if($cont==0)
	{
		$usr=new mnpBD('cotizacion');
	$where="cveCotizacion=".$_POST['idcot'];
				$datos=array(4);				
				$campos='estatus';
	
				if( $usr->actualizar($campos,$datos,$where)==true){ echo'{"success":true}';}
		}
	
	$sql="SELECT folio FROM cotizacion WHERE cveCotizacion=".$_POST['idcot'];
	//echo $sql;
	$records=$bd->ExecuteE($sql);
	
				$datoss=array('Se creo un pedido con folio '.$misd[0][0].' , ¡prepara para comprar!',3,mktime(0,0,0,date('m'),date('d'),date('Y')),1);				
				$camposs='mensaje,idUsuario,timer,actividad';
	$usrs=new mnpBD('avisos');
	$usrs->insertar($camposs,$datoss);
	/*$datoss=array('Lo cotización con folio '.$records[0]['folio'].' Fue aceptada por el cliente, ¡preparate para facturar!',19,mktime(0,0,0,date('m'),date('d'),date('Y')),1);
	$usrs->insertar($camposs,$datoss);
	$sql='SELECT cveUsuario FROM cotizacion WHERE cveCotizacion='.$_POST['cve'];
					$misd=$bd->Execute($sql);
	$datoss=array('Lo cotización con folio '.$records[0]['folio'].' Fue aceptada por el cliente, ¡Felicidades!',$misd[0][0],mktime(0,0,0,date('m'),date('d'),date('Y')),1);	
	$usrs->insertar($camposs,$datoss);*/
					
					
		break;
}




?>