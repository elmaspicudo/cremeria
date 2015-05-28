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
	case 1:	$usr=new mnpBD('cotizacion');
/*	cveCliente=21&cveContacto=10& cveDireccion=22&fecha=16/11/2011&vigencia =15/11/2011&observacionesP=hola& observacionesD=&cunatpi=2unidades1=1&cveprod1=13&txtCosto1=23.00&txtPorcentaje1=.80&txtDesc1=&txtPrecio1=28.75&txtTotal1=28.75&txtTienpo1=&txtcom1=*/
				$v=explode('/',$_POST['fecha']);
				$vig=mktime(0,0,0,$v[1],$v[0],$v[2]);
				$datos=array($_POST['cveCliente'],$_POST['cveContacto'],$_POST['cveDireccion'],$vig,0,$_POST['observacionesP'],1,$_SESSION["usuario_valido"],$_POST['folio'],$_POST['observacionesD']);				
				$campos='cveCliente,cveContacto,cveDireccion,fecha,vigencia,observaciones,estatus,cveUsuario,folio,obsd';
				if( $usr->insertar($campos,$datos)==true){
					$detalle=new mnpBD('detallecotizacion');
					$sql='SELECT max(cveCotizacion) AS id FROM cotizacion ';
					$misd=$bd->Execute($sql);
					$camp='cveCotizacion,cveProducto,cantidad,unidadMedida,descuento,precioF,total,moneda,comentario,tEntrega,costo';
					$lim=$_POST['cunatpi'];
					for($i=0;$i <$lim ;$i++)
					{
						if($_POST['cveprod'.$i]!=''){
							
						//secho $precio;
						$dat=array($misd[0][0],$_POST['cveprod'.$i],$_POST['unidades'.$i],$_POST['txtumd'.$i],$_POST['txtDesc'.$i],limpiarP($_POST['txtPrecio'.$i]),limpiarP($_POST['txtTotal'.$i]),$_POST['txtmon'.$i],$_POST['txtcom'.$i],$_POST['txtTienpo'.$i],limpiarP($_POST['txtCosto'.$i]));				
						$detalle->insertar($camp,$dat);
						aumInv(0,$misd[0][0],$_POST['txtumd'.$i],$_POST['cveprod'.$i],$_POST['unidades'.$i],0);
						}
						}
					
					 echo $misd[0][0];
					 }
 				else{
						echo 0;
						
					} 
						
		break;
	case 2: 
				$usr=new mnpBD('cotizacion');
				//echo $_POST['vigencia'].'dasfghj';
				$f= explode('/',$_POST['vigencia']);
				$v=explode('/',$_POST['fecha']);
				$fecha=mktime(0,0,0,$f[1],$f[0],$f[2]);
				$vig=mktime(0,0,0,$v[1],$v[0],$v[2]);
				$datos=array($_POST['cveCliente'],$_POST['cveContacto'],$_POST['cveDireccion'],$fecha,$vig,$_POST['observacionesP'],1,$_POST['observacionesD']);				
				$campos='cveCliente,cveContacto,cveDireccion,fecha,vigencia,observaciones,estatus,obsd';
				$where="cveCotizacion=".$_POST['idcot'];
				if( $usr->actualizar($campos,$datos,$where)==true){
					$sqlx='DELETE FROM detallecotizacion WHERE cveCotizacion='.$_POST['idcot'];
					$misdx=$bd->ExecuteNonQuery($sqlx);
					$detalle=new mnpBD('detallecotizacion');
					$camp='cveCotizacion,cveProducto,cantidad,porcentaje,descuento,precioF,total,moneda,comentario,tEntrega,costo';
					$lim=$_POST['cunatpi'];
					for($i=0;$i <$lim ;$i++)
					{
						if($_POST['cveprod'.$i]!=''){	
						$precio= $_POST['txtPrecio'.$i];	
						$total=$_POST['txtTotal'.$i];	
						//echo $precio;	
						$dat=array($_POST['idcot'],$_POST['cveprod'.$i],$_POST['unidades'.$i],$_POST['txtPorcentaje'.$i],$_POST['txtDesc'.$i],limpiarP($precio),limpiarP($total),$_POST['txtmon'.$i],$_POST['txtcom'.$i],$_POST['txtTienpo'.$i],limpiarP($_POST['txtCosto'.$i]));				
						$detalle->insertar($camp,$dat);
						}
						}
					
					 echo $_POST['idcot'];
					 }
 				else{
						echo 0;
						
					} 
													
		break;
	case 4:$usr=new mnpBD('cotizacion');
	$where="cveCotizacion=".$_POST['cve'];
			extract ($_REQUEST);
				$datos=array($estatus);				
				$campos='estatus';
	
				if( $usr->actualizar($campos,$datos,$where)==true){ echo'{"success":true}';}
				
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