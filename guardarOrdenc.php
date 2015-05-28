<?php
include_once 'lib/mnpBD.class.php';
//echo $_POST['tipoP'].'dsf';;
function limpiarP($cad){
	$re= str_replace('$' , '' , $cad);
	$re= str_replace(',' , '' , $re);
	return  $re;
	}
switch ($_POST['tipoP']) {
	case 1:	$usr=new mnpBD('ordencompra');

				$f= explode('/',$_POST['fecD']);
				$v=explode('/',$_POST['entrega']);
				$fecha=mktime(0,0,0,$f[1],$f[0],$f[2]);
				$vig=mktime(0,0,0,$v[1],$v[0],$v[2]);
				$datos=array($_POST['cot'],$_POST['foliof'],$fecha,$_POST['hora'],$vig,$_POST['nombreCli'],$_POST['cveContactop'],$_POST['hdn_id_busqueda'],$_POST['hdn_id'],$_POST['obs'].' '.$_POST['obsb']);				
				$campos='cveCotizacion,folio,fechaC,hora,fechaExp,cveProvedor,cveContacto,formaEntrega,tipoEntrega,Observaciones';
				if( $usr->insertar($campos,$datos)==true){
					$detalle=new mnpBD('detordencompra');
					$inventario=new mnpBD('inventario');
					$campInv='referencia,unidadesC,fecha,cveProducto';
										
					$sql='SELECT MAX(cveOrden) AS id FROM ordencompra';
					$misd=$bd->Execute($sql);
					$camp='cveOrden,cveProducto,cantidad,precio,descuento,total,tiempoE,Observaciones';
					$lim=$_POST['cunatpi'];
					for($i=0;$i <$lim ;$i++)
					{
						//echo 'cvePrecio'.$i.'fg'.$_POST['cvePrecio'.$i];
						if($_POST['txtCant'.$i]!=''){
						//	echo 'dfghj';
						$dat=array($misd[0][0],$_POST['cvePrecio'.$i],$_POST['txtCant'.$i], limpiarP($_POST['Precio'.$i]),$_POST['txtDesc'.$i],limpiarP($_POST['txtTotal'.$i]),$_POST['txtTienpo'.$i],$_POST['txtcom'.$i]);				
						$detalle->insertar($camp,$dat);
						$datInv=array($misd[0][0],$_POST['txtCant'.$i],time(),$_POST['cvePrecio'.$i]);	
						$detinventario=$inventario->insertar($campInv,$datInv);
						}
						}
					
					 echo $misd[0][0];
					 $sqlo='SELECT cant,SUM(cantidad) AS cantidad,cveProducto
							FROM detallecotizacion 
							LEFT JOIN (SELECT SUM(cantidad)AS cant,cveProducto AS prod FROM detordencompra INNER JOIN ordencompra ON ordencompra.cveOrden=detordencompra.cveOrden
							WHERE ordencompra.cveCotizacion='.$_POST['cot'].' GROUP BY cveProducto)AS d ON d.prod=detallecotizacion.cveProducto
							WHERE detallecotizacion.cveCotizacion='.$_POST['cot'].'
							GROUP BY cveProducto';
							$noords=$bd->ExecuteE($sqlo);
							$res=0;
							foreach($noords as $noord){
							if($noAnuncio['cant'] > $noAnuncio['cantidad']){
								$res=$res=1;
							}							
							}
							if($res==0)
							{
								$usr=new mnpBD('cotizacion');
								$where="cveCotizacion=".$_POST['cot'];
											$datos=array(6);				
											$campos='estatus';											
											if( $usr->actualizar($campos,$datos,$where)==true){ echo'{"success":true}';}
								
								}
					 }
 				else{
						echo 0;
						
					} 
						
		break;
	case 2: 
				$usr=new mnpBD('cotizacion');
				echo $_POST['vigencia'].'dasfghj';
				$f= explode('/',$_POST['vigencia']);
				$v=explode('/',$_POST['fecha']);
				$fecha=mktime(0,0,0,$f[1],$f[0],$f[2]);
				$vig=mktime(0,0,0,$v[1],$v[0],$v[2]);
				$datos=array($_POST['cveCliente'],$_POST['cveContacto'],$_POST['cveDireccion'],$fecha,$vig,$_POST['observacionesP'].' '.$_POST['observacionesD'],1);				
				$campos='cveCliente,cveContacto,cveDireccion,fecha,vigencia,observaciones,estatus';
				$where="cveCotizacion=".$_POST['idcot'];
				if( $usr->actualizar($campos,$datos,$where)==true){
					$sqlx='DELETE FROM detallecotizacion WHERE cveCotizacion='.$_POST['idcot'];
					$misdx=$bd->ExecuteNonQuery($sqlx);
					$detalle=new mnpBD('detallecotizacion');
					$camp='cveCotizacion,cveProducto,cantidad,porcentaje,descuento,precioF,total,moneda,comentario,tEntrega';
					$lim=$_POST['cunatpi'];
					for($i=0;$i <$lim ;$i++)
					{
						if($_POST['cveprod'.$i]!=''){			
						$dat=array($_POST['idcot'],$_POST['cveprod'.$i],$_POST['unidades'.$i],$_POST['txtPorcentaje'.$i],$_POST['txtDesc'.$i],$_POST['txtPrecio'.$i],$_POST['txtTotal'.$i],$_POST['txtmon'.$i],$_POST['txtcom'.$i],$_POST['txtTienpo'.$i]);				
						$detalle->insertar($camp,$dat);
						}
						}
					
					 echo'{"success":true}';
					 }
 				else{
						echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");
						
					} 
													
		break;
	case 4:$usr=new mnpBD('ordencompra');
	$where="cveOrden=".$_POST['cve'];
			extract ($_REQUEST);
				$datos=array($estatus);				
				$campos='estatus';
				if( $usr->actualizar($campos,$datos,$where)==true){ echo'{"success":true}';}
				if($estatus==3)
				{aumInv(2,$_POST['cve'],2,$bd,'SELECT cveProducto,cantidad FROM detordencompra WHERE cveOrden='.$_POST['cve']);}
		break;
	case 3: 
			extract ($_REQUEST);
			$usr=new mnpBD('producto');
			$where="cveProducto=".$cve;
			if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El producto se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'No se pudo eliminar al producto seleccionado'));}
							echo  json_encode($grid); 
  	}




?>