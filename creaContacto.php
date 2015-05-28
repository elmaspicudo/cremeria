<?php
include_once 'lib/mnpBD.class.php';

switch ($_GET['tipoP']) {
	case 1:	$usr=new mnpBD('contacto');
			extract ($_REQUEST);
			$datos=array($txtNombre,$txtApaterno,$txtMaterno,$txtTelefono,$txtCorreo,$tipoCon,$cvepadre,$txtCelular,$txtFax,$txtTelefonob,$txtNextel);
				$campos='nombre,apellidoP,apellidoM,telefono,correo,tipoc,cvePadre,celular,fax,telb,nextel';
				switch ($CtipoO) {
					case 3:	$where="cveCliente=".$cve;
							if($usr->eliminar($where)==true){ $grid=array('success'=>true,'data'=>array('message'=>'El cliente se elimino correctamente'));	}
 							else{$grid=array('success'=>false,'data'=>array('message'=>'No se pudo eliminar al cliente seleccionado'));}
							echo  json_encode($grid); 
						break;
					case 2:$where="cveContacto=".$cveContacto;
							if( $usr->actualizar($campos,$datos,$where)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");}
						break;
					default: if( $usr->insertar($campos,$datos)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
					
						break;
						
					}
		break;
	case 2:$usr=new mnpBD('proveedores');
			extract ($_REQUEST);
				$datos=array($PrazonSocial,$Prfc);
				$campos='PrazonSocial,Prfc';
				switch ($operacionP) {
					case 1:if( $usr->insertar($campos,$datos)==true){ echo'{"success":true}';}
 							else{echo utf8_encode("{success:false, errors:{reason:'Ocurrió un error al guardar los datos...' }}");} 
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
				$datos=array($pa_cvePais,$edo_cveEstado,$mun_cveMunicipio,$calle,$colonia,$numeroInterior,$numeroExterior,$localidad,$codigoPostal,$cvePersona,$tipoPersona);
				$campos='pa_cvePais,edo_cveEstado,mun_cveMunicipio,calle,colonia,numeroInterior,numeroExterior,codigoPostal,cvePersona,tipoPersona';
				$datosU=array($pa_cvePais,$edo_cveEstado,$mun_cveMunicipio,$calle,$colonia,$numeroInterior,$numeroExterior,$codigoPostal);
				$camposU='pa_cvePais,edo_cveEstado,mun_cveMunicipio,calle,colonia,numeroInterior,numeroExterior,localidad,codigoPostal';
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
  	}




?>