<?php
session_start();

include_once 'lib/mnpBD.class.php';

switch ($_GET['tipoP']) {
	case 1:	$usr=new mnpBD('depositos');
			extract ($_REQUEST);	
				$f= explode('/',$_POST['fecha']);
				$fechas=mktime(0,0,0,$f[1],$f[0],$f[2]);	
				$datos=array($banco,$fechas,$cantidad,$cveCotizacion);				
				$campos='banco,fecha,monto,cveCotizacion';
				$datosU=array($banco,$fechas,$cantidad);				
				$camposU='banco,fecha,monto';
				switch ($operacion) {
					case 1: if( $usr->insertar($campos,$datos)==true){ $usrs=new mnpBD('cotizacion');
				$where="cveCotizacion=".$cveCotizacion;
				$datoss=array(5);				
				$camposs='estatus';
				
				$datoss=array('El pedido con folio '.$cveCotizacion.' Fue pagado por el cliente, ¡prepara para comprar!',3,mktime(0,0,0,date('m'),date('d'),date('Y')),1);				
				$camposs='mensaje,idUsuario,timer,actividad';
	$usrs=new mnpBD('avisos');
	$usrs->insertar($camposs,$datoss);
	$datoss=array('El pedido con folio '.$cveCotizacion.' Fue pagado por el cliente, ¡preparate para facturar!',19,mktime(0,0,0,date('m'),date('d'),date('Y')),1);
	$usrs->insertar($camposs,$datoss);
	$sql='SELECT cveUsuario FROM cotizacion WHERE cveCotizacion='.$cveCotizacion;
					$misd=$bd->Execute($sql);
	$datoss=array('Lo cotización con folio '.$cveCotizacion.' Fue pagada por el cliente, ¡Felicidades!',$misd[0][0],mktime(0,0,0,date('m'),date('d'),date('Y')),1);	
	$usrs->insertar($camposs,$datoss);
				
					 $usrsss=new mnpBD('pedidos');
						$wheress="idped=".$cveCotizacion;
						$datossss=array(2);				
						$campossss='estatus'; 
						$usrsss->actualizar($campossss,$datossss,$wheress);
					}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
					break;
					case 2:$where="idcobro=".$idcobro;
							if( $usr->actualizar($campos,$datos,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");}
						break;
					default: $where="cveCliente=".$cve;
							if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El cliente se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'No se pudo eliminar al cliente seleccionado'));}
							echo  json_encode($grid); 
						break;
						
					}
		break;
	case 2:$usr=new mnpBD('proveedores');
			extract ($_REQUEST);
				$datos=array($clave,$clcCalle,$clcExterior,$clcInterior,$clcPostal,$clccolonia,$cveEstado,$cveMunicipio,$razonSocial,$rfc,$nomCom);				
				$campos='clave,calle,noExterior,noInterior,cp,colonia,estado,mun,razonSocial,rfc,nomCom';
				switch ($operacionP) {
					case 1:if(!$usr->repetido('razonSocial',$razonSocial) && !$usr->repetido('rfc',$rfc)){
							if( $usr->insertar($campos,$datos)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
							}else{echo utf8_encode("{success:false, reason:'El registro ya existe...'}");}
						break;
					case 2:$where="cveProveedor=".$cveProveedor;
							if( $usr->actualizar($campos,$datos,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					default: $where="cveProveedor=".$cve;
							if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El proveedor se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'No se pudo eliminar al proveedor seleccionado'));}
							echo  json_encode($grid); 
						break;
						
					}
		break;
	case 4:$usr=new mnpBD('direccion');
			extract ($_REQUEST);
				$datos=array($pa_cvePais,$edo_cveEstado,$mun_cveMunicipio,$calle,$colonia,$numeroInterior,$numeroExterior,$codigoPostal,$cvePersona,$tipoPersona,$nombreDir);
				$campos='pa_cvePais,edo_cveEstado,mun_cveMunicipio,calle,colonia,numeroInterior,numeroExterior,codigoPostal,cvePersona,tipoPersona,nombre';
				$datosU=array($pa_cvePais,$edo_cveEstado,$mun_cveMunicipio,$calle,$colonia,$numeroInterior,$numeroExterior,$codigoPostal,$nombreDir);
				$camposU='pa_cvePais,edo_cveEstado,mun_cveMunicipio,calle,colonia,numeroInterior,numeroExterior,codigoPostal,nombre';
				switch ($operacion) {
					case 1:if( $usr->insertar($campos,$datos)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					case 2:$where="cveDireccion=".$cveDireccion;
							if( $usr->actualizar($camposU,$datosU,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					default: $where="cveDireccion=".$cveDireccion;
							if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El cliente se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'El no se pudo eliminar al cliente'));}
							echo  json_encode($grid); 
						break;
						
					}
		break;
	case 3: 
			extract ($_REQUEST);
			$usr=new mnpBD('producto');
			$where="cveProducto=".$cve;
			if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El producto se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'No se pudo eliminar al producto seleccionado'));}
							echo  json_encode($grid); 
		break;
		case 5: 
			extract ($_REQUEST);
			$usr=new mnpBD('precioprod');
			$datos=array($edo_cveEstado,$mun_cveMunicipio,$codigoPostal);
				$campos='cveProvedor,cveProducto,precio';
				$datosU=array($edo_cveEstado,$mun_cveMunicipio,$codigoPostal);
				$camposU='cveProvedor,cveProducto,precio';
				switch ($operacion) {
					case 1:
							if( $usr->insertar($campos,$datos)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
							
						break;
					case 2:$where="cvePrecio=".$cvePersona;
							if( $usr->actualizar($camposU,$datosU,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					default: $where="cveDireccion=".$cveDireccion;
							if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El cliente se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'El no se pudo eliminar al cliente'));}
							echo  json_encode($grid); 
						break;
						
					}
  		break;
		case 6: 
			extract ($_REQUEST);
			$usr=new mnpBD('producto');
			$where="cveProducto=".$cve;
			if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El producto se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'No se pudo eliminar al producto seleccionado'));}
							echo  json_encode($grid); 
  		break;
		case 7: 
			extract ($_REQUEST);
			$usr=new mnpBD('lineas');
			$datos=array($codigoPostal,$descripcion);
				$campos='clave,descripcion';
				$datosU=array($codigoPostal,$descripcion);
				$camposU='clave,descripcion';
				switch ($operacion) {
					case 1:if(!$usr->repetido('clave',$codigoPostal) && !$usr->repetido('descripcion',$descripcion)){
							if( $usr->insertar($campos,$datos)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
							}else{echo utf8_encode("{success:false, reason:'El registro ya existe...'}");}
						break;
					case 2:$where="cveLinea=".$cvePersona;
							if( $usr->actualizar($camposU,$datosU,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					default: $where="cveLinea=".$cveDireccion;
							if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El cliente se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'El no se pudo eliminar al cliente'));}
							echo  json_encode($grid); 
						break;
						
					}
  		break;
		case 8: 
			extract ($_REQUEST);
			$usr=new mnpBD('users');
				$datos=array($clcExterior,$clccolonia,$rfc,$clcCalle,$clave,$user,'admin');			
				$campos='username,PASSWORD,nombre,apellidom,apellidop,permisos,nivel';
				$datosU=array($clcExterior,$clccolonia,$rfc,$clcCalle,$clave,$user,'admin');	
				$camposU='username,PASSWORD,nombre,apellidom,apellidop,permisos,nivel';
				switch ($operacion) {
					case 1:if(!$usr->repetido('username',$clcExterior)){
							if( $usr->insertar($campos,$datos)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
							}else{echo utf8_encode("{success:false, reason:'El registro ya existe...'}");}
						break;
					case 2:$where="idUsers=".$cveCliente;
							if( $usr->actualizar($camposU,$datosU,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					default: $where="idUsers=".$cveCliente;
							if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El cliente se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'El no se pudo eliminar al cliente'));}
							echo  json_encode($grid); 
						break;
						
					}
  		break;
		case 9: 
		//echo 'dsf';
			extract ($_REQUEST);
			$usr=new mnpBD('tipocambio');
			$v=explode('/',$_POST['fecha']);
				$vig=mktime(0,0,0,$v[1],$v[0],$v[2]);
			$datos=array($vig,$descripcion);
				$campos='fecha,total';
				$datosU=array($vig,$descripcion);
				$camposU='fecha,total';
				switch ($operacion) {
					case 1:
							if( $usr->insertar($campos,$datos)==true){ echo '{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
							
						break;
					case 2:$where="cveLinea=".$cvePersona;
							if( $usr->actualizar($camposU,$datosU,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
						break;
					default: $where="cveLinea=".$cveDireccion;
							if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El cliente se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'El no se pudo eliminar al cliente'));}
							echo  json_encode($grid); 
						break;
						
					}
  		break;
  	}
	
?>